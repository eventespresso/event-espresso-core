<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\InvalidSessionDataException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class EED_Ticket_Sales_Monitor
 * ensures that tickets can not be added to the cart if they have sold out
 * in the time since the page with the ticket selector was first viewed.
 * also considers tickets in the cart that are in the process of being registered for
 *
 * @package               Event Espresso
 * @subpackage            modules
 * @author                Brent Christensen
 * @since                 4.8.6
 */
class EED_Ticket_Sales_Monitor extends EED_Module
{

    const debug = false;

    private static $nl = '';

    /**
     * an array of raw ticket data from EED_Ticket_Selector
     *
     * @var array $ticket_selections
     */
    protected $ticket_selections = array();

    /**
     * the raw ticket data from EED_Ticket_Selector is organized in rows
     * according to how they are displayed in the actual Ticket_Selector
     * this tracks the current row being processed
     *
     * @var int $current_row
     */
    protected $current_row = 0;

    /**
     * an array for tracking names of tickets that have sold out
     *
     * @var array $sold_out_tickets
     */
    protected $sold_out_tickets = array();

    /**
     * an array for tracking names of tickets that have had their quantities reduced
     *
     * @var array $decremented_tickets
     */
    protected $decremented_tickets = array();


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks()
    {
        self::$nl = defined('EE_TESTS_DIR') ? "\n" : '<br />';
        // release tickets for expired carts
        add_action(
            'EED_Ticket_Selector__process_ticket_selections__before',
            array('EED_Ticket_Sales_Monitor', 'release_tickets_for_expired_carts'),
            1
        );
        // check ticket reserves AFTER MER does it's check (hence priority 20)
        add_filter(
            'FHEE__EE_Ticket_Selector___add_ticket_to_cart__ticket_qty',
            array('EED_Ticket_Sales_Monitor', 'validate_ticket_sale'),
            20,
            3
        );
        // add notices for sold out tickets
        add_action(
            'AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
            array('EED_Ticket_Sales_Monitor', 'post_notices'),
            10
        );

        // handle tickets deleted from cart
        add_action(
            'FHEE__EED_Multi_Event_Registration__delete_ticket__ticket_removed_from_cart',
            array('EED_Ticket_Sales_Monitor', 'ticket_removed_from_cart'),
            10,
            2
        );
        // handle emptied carts
        add_action(
            'AHEE__EE_Session__reset_cart__before_reset',
            array('EED_Ticket_Sales_Monitor', 'session_cart_reset'),
            10,
            1
        );
        add_action(
            'AHEE__EED_Multi_Event_Registration__empty_event_cart__before_delete_cart',
            array('EED_Ticket_Sales_Monitor', 'session_cart_reset'),
            10,
            1
        );
        // handle cancelled registrations
        add_action(
            'AHEE__EE_Session__reset_checkout__before_reset',
            array('EED_Ticket_Sales_Monitor', 'session_checkout_reset'),
            10,
            1
        );
        // cron tasks
        add_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__abandoned_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_abandoned_transactions'),
            10,
            1
        );
        add_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__incomplete_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_abandoned_transactions'),
            10,
            1
        );
        add_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__failed_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_failed_transactions'),
            10,
            1
        );
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        EED_Ticket_Sales_Monitor::set_hooks();
    }


    /**
     * @return EED_Ticket_Sales_Monitor|EED_Module
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * @param WP_Query $WP_Query
     * @return    void
     */
    public function run($WP_Query)
    {
    }



    /********************************** PRE_TICKET_SALES  **********************************/


    /**
     * Retrieves grand totals from the line items that have no TXN ID
     * and timestamps less than the current time minus the session lifespan.
     * These are carts that have been abandoned before the "registrant" even attempted to checkout.
     * We're going to release the tickets for these line items before attempting to add more to the cart.
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     */
    public static function release_tickets_for_expired_carts()
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '()';
        }
        do_action('AHEE__EED_Ticket_Sales_Monitor__release_tickets_for_expired_carts__begin');
        $expired_ticket_IDs = array();
        /** @var EventEspresso\core\domain\values\session\SessionLifespan $session_lifespan */
        $session_lifespan = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\values\session\SessionLifespan'
        );
        $timestamp = $session_lifespan->expiration();
        $expired_ticket_line_items = EEM_Line_Item::instance()->getTicketLineItemsForExpiredCarts($timestamp);
        if (self::debug) {
            echo self::$nl . ' . time(): ' . time();
            echo self::$nl . ' . time() as date: ' . date('Y-m-d H:i a');
            echo self::$nl . ' . session expiration: ' . $session_lifespan->expiration();
            echo self::$nl . ' . session expiration as date: ' . date('Y-m-d H:i a', $session_lifespan->expiration());
            echo self::$nl . ' . timestamp: ' . $timestamp;
            echo self::$nl . ' . $expired_ticket_line_items: ' . count($expired_ticket_line_items);
        }
        if (! empty($expired_ticket_line_items)) {
            foreach ($expired_ticket_line_items as $expired_ticket_line_item) {
                if (! $expired_ticket_line_item instanceof EE_Line_Item) {
                    continue;
                }
                $expired_ticket_IDs[ $expired_ticket_line_item->OBJ_ID() ] = $expired_ticket_line_item->OBJ_ID();
                if (self::debug) {
                    echo self::$nl . ' . $expired_ticket_line_item->OBJ_ID(): ' . $expired_ticket_line_item->OBJ_ID();
                    echo self::$nl . ' . $expired_ticket_line_item->timestamp(): '
                         . date(
                             'Y-m-d h:i a',
                             $expired_ticket_line_item->timestamp(true)
                         );
                }
            }
            if (! empty($expired_ticket_IDs)) {
                EED_Ticket_Sales_Monitor::release_reservations_for_tickets(
                    \EEM_Ticket::instance()->get_tickets_with_IDs($expired_ticket_IDs),
                    array(),
                    __FUNCTION__
                );
                // now  let's get rid of expired line items so that they can't interfere with tracking
                EED_Ticket_Sales_Monitor::clear_expired_line_items_with_no_transaction($timestamp);
            }
        }
        do_action(
            'AHEE__EED_Ticket_Sales_Monitor__release_tickets_for_expired_carts__end',
            $expired_ticket_IDs,
            $expired_ticket_line_items
        );
    }



    /********************************** VALIDATE_TICKET_SALE  **********************************/


    /**
     * callback for 'FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data'
     *
     * @param int       $qty
     * @param EE_Ticket $ticket
     * @return bool
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    public static function validate_ticket_sale($qty = 1, EE_Ticket $ticket)
    {
        $qty = absint($qty);
        if ($qty > 0) {
            $qty = EED_Ticket_Sales_Monitor::instance()->_validate_ticket_sale($ticket, $qty);
        }
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '()';
            echo self::$nl . self::$nl . '<b> RETURNED QTY: ' . $qty . '</b>';
        }
        return $qty;
    }


    /**
     * checks whether an individual ticket is available for purchase based on datetime, and ticket details
     *
     * @param   EE_Ticket $ticket
     * @param int         $qty
     * @return int
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _validate_ticket_sale(EE_Ticket $ticket, $qty = 1)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        if (! $ticket instanceof EE_Ticket) {
            return 0;
        }
        if (self::debug) {
            echo self::$nl . '<b> . ticket->ID: ' . $ticket->ID() . '</b>';
            echo self::$nl . ' . original ticket->reserved: ' . $ticket->reserved();
        }
        $ticket->refresh_from_db();
        // first let's determine the ticket availability based on sales
        $available = $ticket->qty('saleable');
        if (self::debug) {
            echo self::$nl . ' . . . ticket->qty: ' . $ticket->qty();
            echo self::$nl . ' . . . ticket->sold: ' . $ticket->sold();
            echo self::$nl . ' . . . ticket->reserved: ' . $ticket->reserved();
            echo self::$nl . ' . . . ticket->qty(saleable): ' . $ticket->qty('saleable');
            echo self::$nl . ' . . . available: ' . $available;
        }
        if ($available < 1) {
            $this->_ticket_sold_out($ticket);
            return 0;
        }
        if (self::debug) {
            echo self::$nl . ' . . . qty: ' . $qty;
        }
        if ($available < $qty) {
            $qty = $available;
            if (self::debug) {
                echo self::$nl . ' . . . QTY ADJUSTED: ' . $qty;
            }
            $this->_ticket_quantity_decremented($ticket);
        }
        $this->_reserve_ticket($ticket, $qty);
        return $qty;
    }


    /**
     * increments ticket reserved based on quantity passed
     *
     * @param    EE_Ticket $ticket
     * @param int          $quantity
     * @return bool
     * @throws EE_Error
     */
    protected function _reserve_ticket(EE_Ticket $ticket, $quantity = 1)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . ' . . . INCREASE RESERVED: ' . $quantity;
        }
        $ticket->increase_reserved($quantity, 'TicketSalesMonitor:' . __LINE__);
        return $ticket->save();
    }


    /**
     * @param  EE_Ticket $ticket
     * @param  int       $quantity
     * @return bool
     * @throws EE_Error
     */
    protected function _release_reserved_ticket(EE_Ticket $ticket, $quantity = 1)
    {
        if (self::debug) {
            echo self::$nl . ' . . . ticket->ID: ' . $ticket->ID();
            echo self::$nl . ' . . . ticket->reserved before: ' . $ticket->reserved();
        }
        $ticket->decrease_reserved($quantity, true, 'TicketSalesMonitor:' . __LINE__);
        if (self::debug) {
            echo self::$nl . ' . . . ticket->reserved after: ' . $ticket->reserved();
        }
        return $ticket->save() ? 1 : 0;
    }


    /**
     * removes quantities within the ticket selector based on zero ticket availability
     *
     * @param    EE_Ticket $ticket
     * @return    void
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _ticket_sold_out(EE_Ticket $ticket)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
            echo self::$nl . ' . . ticket->name: ' . $this->_get_ticket_and_event_name($ticket);
        }
        $this->sold_out_tickets[] = $this->_get_ticket_and_event_name($ticket);
    }


    /**
     * adjusts quantities within the ticket selector based on decreased ticket availability
     *
     * @param    EE_Ticket $ticket
     * @return void
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _ticket_quantity_decremented(EE_Ticket $ticket)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
            echo self::$nl . ' . . ticket->name: ' . $this->_get_ticket_and_event_name($ticket);
        }
        $this->decremented_tickets[] = $this->_get_ticket_and_event_name($ticket);
    }


    /**
     * builds string out of ticket and event name
     *
     * @param    EE_Ticket $ticket
     * @return string
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _get_ticket_and_event_name(EE_Ticket $ticket)
    {
        $event = $ticket->get_related_event();
        if ($event instanceof EE_Event) {
            $ticket_name = sprintf(
                _x('%1$s for %2$s', 'ticket name for event name', 'event_espresso'),
                $ticket->name(),
                $event->name()
            );
        } else {
            $ticket_name = $ticket->name();
        }
        return $ticket_name;
    }



    /********************************** EVENT CART  **********************************/


    /**
     * releases or reserves ticket(s) based on quantity passed
     *
     * @param  EE_Line_Item $line_item
     * @param  int          $quantity
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function ticket_quantity_updated(EE_Line_Item $line_item, $quantity = 1)
    {
        $ticket = EEM_Ticket::instance()->get_one_by_ID(absint($line_item->OBJ_ID()));
        if ($ticket instanceof EE_Ticket) {
            $ticket->add_extra_meta(
                EE_Ticket::META_KEY_TICKET_RESERVATIONS,
                __LINE__ . ') ' . __METHOD__ . '()'
            );
            if ($quantity > 0) {
                EED_Ticket_Sales_Monitor::instance()->_reserve_ticket($ticket, $quantity);
            } else {
                EED_Ticket_Sales_Monitor::instance()->_release_reserved_ticket($ticket, $quantity);
            }
        }
    }


    /**
     * releases reserved ticket(s) based on quantity passed
     *
     * @param  EE_Ticket $ticket
     * @param  int       $quantity
     * @return void
     * @throws EE_Error
     */
    public static function ticket_removed_from_cart(EE_Ticket $ticket, $quantity = 1)
    {
        $ticket->add_extra_meta(
            EE_Ticket::META_KEY_TICKET_RESERVATIONS,
            __LINE__ . ') ' . __METHOD__ . '()'
        );
        EED_Ticket_Sales_Monitor::instance()->_release_reserved_ticket($ticket, $quantity);
    }



    /********************************** POST_NOTICES  **********************************/


    /**
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function post_notices()
    {
        EED_Ticket_Sales_Monitor::instance()->_post_notices();
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _post_notices()
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        $refresh_msg = '';
        $none_added_msg = '';
        if (defined('DOING_AJAX') && DOING_AJAX) {
            $refresh_msg = __(
                'Please refresh the page to view updated ticket quantities.',
                'event_espresso'
            );
            $none_added_msg = __('No tickets were added for the event.', 'event_espresso');
        }
        if (! empty($this->sold_out_tickets)) {
            EE_Error::add_attention(
                sprintf(
                    apply_filters(
                        'FHEE__EED_Ticket_Sales_Monitor___post_notices__sold_out_tickets_notice',
                        __(
                            'We\'re sorry...%1$sThe following items have sold out since you first viewed this page, and can no longer be registered for:%1$s%1$s%2$s%1$s%1$sPlease note that availability can change at any time due to cancellations, so please check back again later if registration for this event(s) is important to you.%1$s%1$s%3$s%1$s%4$s%1$s',
                            'event_espresso'
                        )
                    ),
                    '<br />',
                    implode('<br />', $this->sold_out_tickets),
                    $none_added_msg,
                    $refresh_msg
                )
            );
            // alter code flow in the Ticket Selector for better UX
            add_filter('FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', '__return_true');
            add_filter('FHEE__EED_Ticket_Selector__process_ticket_selections__success', '__return_false');
            $this->sold_out_tickets = array();
            // and reset the cart
            EED_Ticket_Sales_Monitor::session_cart_reset(EE_Registry::instance()->SSN);
        }
        if (! empty($this->decremented_tickets)) {
            EE_Error::add_attention(
                sprintf(
                    apply_filters(
                        'FHEE__EED_Ticket_Sales_Monitor___ticket_quantity_decremented__notice',
                        __(
                            'We\'re sorry...%1$sDue to sales that have occurred since you first viewed the last page, the following items have had their quantities adjusted to match the current available amount:%1$s%1$s%2$s%1$s%1$sPlease note that availability can change at any time due to cancellations, so please check back again later if registration for this event(s) is important to you.%1$s%1$s%3$s%1$s%4$s%1$s',
                            'event_espresso'
                        )
                    ),
                    '<br />',
                    implode('<br />', $this->decremented_tickets),
                    $none_added_msg,
                    $refresh_msg
                )
            );
            $this->decremented_tickets = array();
        }
    }



    /********************************** RELEASE_ALL_RESERVED_TICKETS_FOR_TRANSACTION  **********************************/


    /**
     * releases reserved tickets for all registrations of an EE_Transaction
     * by default, will NOT release tickets for finalized transactions
     *
     * @param    EE_Transaction $transaction
     * @return int
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
    protected function _release_all_reserved_tickets_for_transaction(EE_Transaction $transaction)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
            echo self::$nl . ' . transaction->ID: ' . $transaction->ID();
            echo self::$nl . ' . TXN status_ID: ' . $transaction->status_ID();
        }
        // check if 'finalize_registration' step has been completed...
        $finalized = $transaction->reg_step_completed('finalize_registration');
        if (self::debug) {
            // DEBUG LOG
            EEH_Debug_Tools::log(
                __CLASS__,
                __FUNCTION__,
                __LINE__,
                array('finalized' => $finalized),
                false,
                'EE_Transaction: ' . $transaction->ID()
            );
        }
        // how many tickets were released
        $count = 0;
        if (self::debug) {
            echo self::$nl . ' . . . TXN finalized: ' . $finalized;
        }
        $release_tickets_with_TXN_status = array(
            EEM_Transaction::failed_status_code,
            EEM_Transaction::abandoned_status_code,
            EEM_Transaction::incomplete_status_code,
        );
        $events = array();
        // if the session is getting cleared BEFORE the TXN has been finalized or the transaction is not completed
        if (! $finalized || in_array($transaction->status_ID(), $release_tickets_with_TXN_status, true)) {
            // cancel any reserved tickets for registrations that were not approved
            $registrations = $transaction->registrations();
            if (self::debug) {
                echo self::$nl . ' . . . # registrations: ' . count($registrations);
                $reg = reset($registrations);
                $ticket = $reg->ticket();
                if ($ticket instanceof EE_Ticket) {
                    $ticket->add_extra_meta(
                        EE_Ticket::META_KEY_TICKET_RESERVATIONS,
                        __LINE__ . ') Release All Tickets TXN:' . $transaction->ID()
                    );
                }
            }
            if (! empty($registrations)) {
                foreach ($registrations as $registration) {
                    if ($registration instanceof EE_Registration
                        && $this->_release_reserved_ticket_for_registration($registration, $transaction)
                    ) {
                        $count++;
                        $events[ $registration->event_ID() ] = $registration->event();
                    }
                }
            }
        }
        if ($events !== array()) {
            foreach ($events as $event) {
                /** @var EE_Event $event */
                $event->perform_sold_out_status_check();
            }
        }
        return $count;
    }


    /**
     * releases reserved tickets for an EE_Registration
     * by default, will NOT release tickets for APPROVED registrations
     *
     * @param EE_Registration $registration
     * @param EE_Transaction  $transaction
     * @return int
     * @throws EE_Error
     */
    protected function _release_reserved_ticket_for_registration(
        EE_Registration $registration,
        EE_Transaction $transaction
    ) {
        $STS_ID = $transaction->status_ID();
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
            echo self::$nl . ' . . registration->ID: ' . $registration->ID();
            echo self::$nl . ' . . registration->status_ID: ' . $registration->status_ID();
            echo self::$nl . ' . . transaction->status_ID(): ' . $STS_ID;
        }
        if (// release Tickets for Failed Transactions and Abandoned Transactions
            $STS_ID === EEM_Transaction::failed_status_code
            || $STS_ID === EEM_Transaction::abandoned_status_code
            || (
                // also release Tickets for Incomplete Transactions, but ONLY if the Registrations are NOT Approved
                $STS_ID === EEM_Transaction::incomplete_status_code
                && $registration->status_ID() !== EEM_Registration::status_id_approved
            )
        ) {
            if (self::debug) {
                echo self::$nl . self::$nl . ' . . RELEASE RESERVED TICKET';
                $rsrvd = $registration->get_extra_meta(EE_Registration::HAS_RESERVED_TICKET_KEY, true);
                echo self::$nl . ' . . . registration HAS_RESERVED_TICKET_KEY: ';
                var_dump($rsrvd);
            }
            $registration->release_reserved_ticket(true, 'TicketSalesMonitor:' . __LINE__);
            return 1;
        }
        return 0;
    }



    /********************************** SESSION_CART_RESET  **********************************/


    /**
     * callback hooked into 'AHEE__EE_Session__reset_cart__before_reset'
     *
     * @param EE_Session $session
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function session_cart_reset(EE_Session $session)
    {
        // don't release tickets if checkout was already reset
        if (did_action('AHEE__EE_Session__reset_checkout__before_reset')) {
            return;
        }
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        // first check of the session has a valid Checkout object
        $checkout = $session->checkout();
        if ($checkout instanceof EE_Checkout) {
            // and use that to clear ticket reservations because it will update the associated registration meta data
            EED_Ticket_Sales_Monitor::instance()->_session_checkout_reset($checkout);
            return;
        }
        $cart = $session->cart();
        if ($cart instanceof EE_Cart) {
            if (self::debug) {
                echo self::$nl . self::$nl . ' cart instance of EE_Cart: ';
            }
            EED_Ticket_Sales_Monitor::instance()->_session_cart_reset($cart, $session);
        } else {
            if (self::debug) {
                echo self::$nl . self::$nl . ' invalid EE_Cart: ';
                var_export($cart, true);
            }
        }
    }


    /**
     * releases reserved tickets in the EE_Cart
     *
     * @param EE_Cart $cart
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _session_cart_reset(EE_Cart $cart, EE_Session $session)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        $ticket_line_items = $cart->get_tickets();
        if (empty($ticket_line_items)) {
            return;
        }
        if (self::debug) {
            echo '<br /> . ticket_line_item count: ' . count($ticket_line_items);
        }
        foreach ($ticket_line_items as $ticket_line_item) {
            if (self::debug) {
                echo self::$nl . ' . ticket_line_item->ID(): ' . $ticket_line_item->ID();
            }
            if ($ticket_line_item instanceof EE_Line_Item && $ticket_line_item->OBJ_type() === 'Ticket') {
                if (self::debug) {
                    echo self::$nl . ' . . ticket_line_item->OBJ_ID(): ' . $ticket_line_item->OBJ_ID();
                }
                $ticket = EEM_Ticket::instance()->get_one_by_ID($ticket_line_item->OBJ_ID());
                if ($ticket instanceof EE_Ticket) {
                    if (self::debug) {
                        echo self::$nl . ' . . ticket->ID(): ' . $ticket->ID();
                        echo self::$nl . ' . . ticket_line_item->quantity(): ' . $ticket_line_item->quantity();
                    }
                    $ticket->add_extra_meta(
                        EE_Ticket::META_KEY_TICKET_RESERVATIONS,
                        __LINE__ . ') ' . __METHOD__ . '() SID = ' . $session->id()
                    );
                    $this->_release_reserved_ticket($ticket, $ticket_line_item->quantity());
                }
            }
        }
        if (self::debug) {
            echo self::$nl . self::$nl . ' RESET COMPLETED ';
        }
    }



    /********************************** SESSION_CHECKOUT_RESET  **********************************/


    /**
     * callback hooked into 'AHEE__EE_Session__reset_checkout__before_reset'
     *
     * @param EE_Session $session
     * @return void
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
    public static function session_checkout_reset(EE_Session $session)
    {
        // don't release tickets if cart was already reset
        if (did_action('AHEE__EE_Session__reset_cart__before_reset')) {
            return;
        }
        $checkout = $session->checkout();
        if ($checkout instanceof EE_Checkout) {
            EED_Ticket_Sales_Monitor::instance()->_session_checkout_reset($checkout);
        }
    }


    /**
     * releases reserved tickets for the EE_Checkout->transaction
     *
     * @param EE_Checkout $checkout
     * @return void
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
    protected function _session_checkout_reset(EE_Checkout $checkout)
    {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        // we want to release the each registration's reserved tickets if the session was cleared, but not if this is a revisit
        if ($checkout->revisit || ! $checkout->transaction instanceof EE_Transaction) {
            return;
        }
        $this->_release_all_reserved_tickets_for_transaction($checkout->transaction);
    }



    /********************************** SESSION_EXPIRED_RESET  **********************************/


    /**
     * @param    EE_Session $session
     * @return    void
     */
    public static function session_expired_reset(EE_Session $session)
    {
    }



    /********************************** PROCESS_ABANDONED_TRANSACTIONS  **********************************/


    /**
     * releases reserved tickets for all registrations of an ABANDONED EE_Transaction
     * by default, will NOT release tickets for free transactions, or any that have received a payment
     *
     * @param EE_Transaction $transaction
     * @return void
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
    public static function process_abandoned_transactions(EE_Transaction $transaction)
    {
        // is this TXN free or has any money been paid towards this TXN? If so, then leave it alone
        if ($transaction->is_free() || $transaction->paid() > 0) {
            if (self::debug) {
                // DEBUG LOG
                EEH_Debug_Tools::log(
                    __CLASS__,
                    __FUNCTION__,
                    __LINE__,
                    array($transaction),
                    false,
                    'EE_Transaction: ' . $transaction->ID()
                );
            }
            return;
        }
        // have their been any successful payments made ?
        $payments = $transaction->payments();
        foreach ($payments as $payment) {
            if ($payment instanceof EE_Payment && $payment->status() === EEM_Payment::status_id_approved) {
                if (self::debug) {
                    // DEBUG LOG
                    EEH_Debug_Tools::log(
                        __CLASS__,
                        __FUNCTION__,
                        __LINE__,
                        array($payment),
                        false,
                        'EE_Transaction: ' . $transaction->ID()
                    );
                }
                return;
            }
        }
        // since you haven't even attempted to pay for your ticket...
        EED_Ticket_Sales_Monitor::instance()->_release_all_reserved_tickets_for_transaction($transaction);
    }



    /********************************** PROCESS_FAILED_TRANSACTIONS  **********************************/


    /**
     * releases reserved tickets for absolutely ALL registrations of a FAILED EE_Transaction
     *
     * @param EE_Transaction $transaction
     * @return void
     * @throws EE_Error
     * @throws InvalidSessionDataException
     */
    public static function process_failed_transactions(EE_Transaction $transaction)
    {
        // since you haven't even attempted to pay for your ticket...
        EED_Ticket_Sales_Monitor::instance()->_release_all_reserved_tickets_for_transaction($transaction);
    }



    /********************************** RESET RESERVATION COUNTS  *********************************/


    /**
     * Resets all ticket and datetime reserved counts to zero
     * Tickets that are currently associated with a Transaction that is in progress
     *
     * @throws EE_Error
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws UnexpectedEntityException
     */
    public static function reset_reservation_counts()
    {
        /** @var EE_Line_Item[] $valid_reserved_tickets */
        $valid_reserved_tickets = array();
        /** @var EE_Transaction[] $transactions_not_in_progress */
        $transactions_not_in_progress = EEM_Transaction::instance()->get_transactions_not_in_progress();
        foreach ($transactions_not_in_progress as $transaction) {
            // if this TXN has been fully completed, then skip it
            if ($transaction->reg_step_completed('finalize_registration')) {
                continue;
            }
            $total_line_item = $transaction->total_line_item();
            // $transaction_in_progress->line
            if (! $total_line_item instanceof EE_Line_Item) {
                throw new DomainException(
                    esc_html__(
                        'Transaction does not have a valid Total Line Item associated with it.',
                        'event_espresso'
                    )
                );
            }
            $valid_reserved_tickets += EED_Ticket_Sales_Monitor::get_ticket_line_items_for_grand_total(
                $total_line_item
            );
        }
        $total_line_items = EEM_Line_Item::instance()->get_total_line_items_for_active_carts();
        foreach ($total_line_items as $total_line_item) {
            $valid_reserved_tickets += EED_Ticket_Sales_Monitor::get_ticket_line_items_for_grand_total(
                $total_line_item
            );
        }
        $tickets_with_reservations = EEM_Ticket::instance()->get_tickets_with_reservations();
        return EED_Ticket_Sales_Monitor::release_reservations_for_tickets(
            $tickets_with_reservations,
            $valid_reserved_tickets,
            __FUNCTION__
        );
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @return EE_Line_Item[]
     */
    private static function get_ticket_line_items_for_grand_total(EE_Line_Item $total_line_item)
    {
        /** @var EE_Line_Item[] $valid_reserved_tickets */
        $valid_reserved_tickets = array();
        $ticket_line_items = EEH_Line_Item::get_ticket_line_items($total_line_item);
        foreach ($ticket_line_items as $ticket_line_item) {
            if ($ticket_line_item instanceof EE_Line_Item) {
                $valid_reserved_tickets[] = $ticket_line_item;
            }
        }
        return $valid_reserved_tickets;
    }


    /**
     * @param EE_Ticket[]    $tickets_with_reservations
     * @param EE_Line_Item[] $valid_reserved_ticket_line_items
     * @return int
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @throws EE_Error
     */
    private static function release_reservations_for_tickets(
        array $tickets_with_reservations,
        array $valid_reserved_ticket_line_items = array(),
        $source
    ) {
        if (self::debug) {
            echo self::$nl . self::$nl . __LINE__ . ') ' . __METHOD__ . '()';
        }
        $total_tickets_released = 0;
        $sold_out_events = array();
        foreach ($tickets_with_reservations as $ticket_with_reservations) {
            if (! $ticket_with_reservations instanceof EE_Ticket) {
                continue;
            }
            $reserved_qty = $ticket_with_reservations->reserved();
            if (self::debug) {
                echo self::$nl . ' . $ticket_with_reservations->ID(): ' . $ticket_with_reservations->ID();
                echo self::$nl . ' . $reserved_qty: ' . $reserved_qty;
            }
            foreach ($valid_reserved_ticket_line_items as $valid_reserved_ticket_line_item) {
                if ($valid_reserved_ticket_line_item instanceof EE_Line_Item
                    && $valid_reserved_ticket_line_item->OBJ_ID() === $ticket_with_reservations->ID()
                ) {
                    if (self::debug) {
                        echo self::$nl . ' . $valid_reserved_ticket_line_item->quantity(): '
                             . $valid_reserved_ticket_line_item->quantity();
                    }
                    $reserved_qty -= $valid_reserved_ticket_line_item->quantity();
                }
            }
            if ($reserved_qty > 0) {
                $ticket_with_reservations->add_extra_meta(
                    EE_Ticket::META_KEY_TICKET_RESERVATIONS,
                    __LINE__ . ') ' . $source . '()'
                );
                $ticket_with_reservations->decrease_reserved($reserved_qty, true, 'TicketSalesMonitor:' . __LINE__);
                $ticket_with_reservations->save();
                $total_tickets_released += $reserved_qty;
                $event = $ticket_with_reservations->get_related_event();
                // track sold out events
                if ($event instanceof EE_Event && $event->is_sold_out()) {
                    $sold_out_events[] = $event;
                }
            }
        }
        if (self::debug) {
            echo self::$nl . ' . $total_tickets_released: ' . $total_tickets_released;
        }
        // double check whether sold out events should remain sold out after releasing tickets
        if ($sold_out_events !== array()) {
            foreach ($sold_out_events as $sold_out_event) {
                /** @var EE_Event $sold_out_event */
                $sold_out_event->perform_sold_out_status_check();
            }
        }
        return $total_tickets_released;
    }



    /********************************** SHUTDOWN  **********************************/


    /**
     * @param int $timestamp
     * @return false|int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function clear_expired_line_items_with_no_transaction($timestamp = 0)
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        if (! absint($timestamp)) {
            /** @var EventEspresso\core\domain\values\session\SessionLifespan $session_lifespan */
            $session_lifespan = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\values\session\SessionLifespan'
            );
            $timestamp = $session_lifespan->expiration();
        }
        return $wpdb->query(
            $wpdb->prepare(
                'DELETE FROM ' . EEM_Line_Item::instance()->table() . '
                WHERE TXN_ID = 0 AND LIN_timestamp <= %s',
                // use GMT time because that's what LIN_timestamps are in
                date('Y-m-d H:i:s', $timestamp)
            )
        );
    }
}
