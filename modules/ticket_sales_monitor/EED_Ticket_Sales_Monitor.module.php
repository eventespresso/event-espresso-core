<?php
use EventEspresso\core\exceptions\UnexpectedEntityException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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

    const debug = false;    //	true false

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
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks()
    {
        // release tickets for expired carts
        add_action('EED_Ticket_Selector__process_ticket_selections__before',
            array('EED_Ticket_Sales_Monitor', 'release_tickets_for_expired_carts'),
            1
        );
        // check ticket reserves AFTER MER does it's check (hence priority 20)
        add_filter('FHEE__EE_Ticket_Selector___add_ticket_to_cart__ticket_qty',
            array('EED_Ticket_Sales_Monitor', 'validate_ticket_sale'),
            20, 3
        );
        // add notices for sold out tickets
        add_action('AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
            array('EED_Ticket_Sales_Monitor', 'post_notices'),
            10
        );
        // handle ticket quantities adjusted in cart
        //add_action(
        //	'FHEE__EED_Multi_Event_Registration__adjust_line_item_quantity__line_item_quantity_updated',
        //	array( 'EED_Ticket_Sales_Monitor', 'ticket_quantity_updated' ),
        //	10, 2
        //);
        // handle tickets deleted from cart
        add_action(
            'FHEE__EED_Multi_Event_Registration__delete_ticket__ticket_removed_from_cart',
            array('EED_Ticket_Sales_Monitor', 'ticket_removed_from_cart'),
            10, 2
        );
        // handle emptied carts
        add_action(
            'AHEE__EE_Session__reset_cart__before_reset',
            array('EED_Ticket_Sales_Monitor', 'session_cart_reset'),
            10, 1
        );
        add_action(
            'AHEE__EED_Multi_Event_Registration__empty_event_cart__before_delete_cart',
            array('EED_Ticket_Sales_Monitor', 'session_cart_reset'),
            10, 1
        );
        // handle cancelled registrations
        add_action(
            'AHEE__EE_Session__reset_checkout__before_reset',
            array('EED_Ticket_Sales_Monitor', 'session_checkout_reset'),
            10, 1
        );
        // cron tasks
        add_action(
            'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions__abandoned_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_abandoned_transactions'),
            10, 1
        );
        add_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__incomplete_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_abandoned_transactions'),
            10, 1
        );
        add_action(
            'AHEE__EE_Cron_Tasks__process_expired_transactions__failed_transaction',
            array('EED_Ticket_Sales_Monitor', 'process_failed_transactions'),
            10, 1
        );
    }



    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
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
     *    run
     *
     * @access    public
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
     * @throws \EE_Error
     */
    public static function release_tickets_for_expired_carts()
    {
        $expired_ticket_IDs = array();
        $valid_ticket_line_items = array();
        $total_line_items = EEM_Line_Item::instance()->get_total_line_items_with_no_transaction();
        if(empty($total_line_items)){
            return;
        }
        $expired = current_time('timestamp') - EE_Registry::instance()->SSN->lifespan();
        foreach ($total_line_items as $total_line_item) {
            /** @var EE_Line_Item $total_line_item */
            $ticket_line_items = EED_Ticket_Sales_Monitor::get_ticket_line_items_for_grand_total($total_line_item);
            foreach ($ticket_line_items as $ticket_line_item) {
                if(! $ticket_line_item instanceof EE_Line_Item) {
                    continue;
                }
                if ($total_line_item->timestamp(true) <= $expired ) {
                    $expired_ticket_IDs[$ticket_line_item->OBJ_ID()] = $ticket_line_item->OBJ_ID();
                } else {
                    $valid_ticket_line_items[$ticket_line_item->OBJ_ID()] = $ticket_line_item;
                }
            }
        }
        if (! empty($expired_ticket_IDs)) {
            EED_Ticket_Sales_Monitor::release_reservations_for_tickets(
                \EEM_Ticket::instance()->get_tickets_with_IDs($expired_ticket_IDs),
                $valid_ticket_line_items
            );
            // let's get rid of expired line items so that they can't interfere with tracking
            add_action(
                'shutdown',
                array('EED_Ticket_Sales_Monitor', 'clear_expired_line_items_with_no_transaction'),
                999
            );
        }
    }



    /********************************** VALIDATE_TICKET_SALE  **********************************/



    /**
     *    validate_ticket_sales
     *    callback for 'FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data'
     *
     * @access    public
     * @param int $qty
     * @param \EE_Ticket $ticket
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
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '()';
            echo '<br /><br /><b> RETURNED QTY: ' . $qty . '</b>';
        }
        return $qty;
    }



    /**
     *    _validate_ticket_sale
     * checks whether an individual ticket is available for purchase based on datetime, and ticket details
     *
     * @access    protected
     * @param   \EE_Ticket $ticket
     * @param int          $qty
     * @return int
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _validate_ticket_sale(EE_Ticket $ticket, $qty = 1)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        if ( ! $ticket instanceof EE_Ticket) {
            return 0;
        }
        if (self::debug) {
            echo '<br /><b> . ticket->ID: ' . $ticket->ID() . '</b>';
            echo '<br /> . original ticket->reserved: ' . $ticket->reserved();
        }
        $ticket->refresh_from_db();
        // first let's determine the ticket availability based on sales
        $available = $ticket->qty('saleable');
        if (self::debug) {
            echo '<br /> . . . ticket->qty: ' . $ticket->qty();
            echo '<br /> . . . ticket->sold: ' . $ticket->sold();
            echo '<br /> . . . ticket->reserved: ' . $ticket->reserved();
            echo '<br /> . . . ticket->qty(saleable): ' . $ticket->qty('saleable');
            echo '<br /> . . . available: ' . $available;
        }
        if ($available < 1) {
            $this->_ticket_sold_out($ticket);
            return 0;
        }
        if (self::debug) {
            echo '<br /> . . . qty: ' . $qty;
        }
        if ($available < $qty) {
            $qty = $available;
            if (self::debug) {
                echo '<br /> . . . QTY ADJUSTED: ' . $qty;
            }
            $this->_ticket_quantity_decremented($ticket);
        }
        $this->_reserve_ticket($ticket, $qty);
        return $qty;
    }



    /**
     *  _reserve_ticket
     *    increments ticket reserved based on quantity passed
     *
     * @access    protected
     * @param    \EE_Ticket $ticket
     * @param int           $quantity
     * @return bool
     * @throws EE_Error
     */
    protected function _reserve_ticket(EE_Ticket $ticket, $quantity = 1)
    {
        if (self::debug) {
            echo '<br /><br /> . . . INCREASE RESERVED: ' . $quantity;
        }
        $ticket->increase_reserved($quantity);
        return $ticket->save();
    }



    /**
     * _release_reserved_ticket
     *
     * @access protected
     * @param  EE_Ticket $ticket
     * @param  int       $quantity
     * @return bool
     * @throws EE_Error
     */
    protected function _release_reserved_ticket(EE_Ticket $ticket, $quantity = 1)
    {
        if (self::debug) {
            echo '<br /> . . . ticket->ID: ' . $ticket->ID();
            echo '<br /> . . . ticket->reserved: ' . $ticket->reserved();
        }
        $ticket->decrease_reserved($quantity);
        if (self::debug) {
            echo '<br /> . . . ticket->reserved: ' . $ticket->reserved();
        }
        return $ticket->save() ? 1 : 0;
    }



    /**
     *    _ticket_sold_out
     *    removes quantities within the ticket selector based on zero ticket availability
     *
     * @access    protected
     * @param    \EE_Ticket $ticket
     * @return    void
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _ticket_sold_out(EE_Ticket $ticket)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
            echo '<br /> . . ticket->name: ' . $this->_get_ticket_and_event_name($ticket);
        }
        $this->sold_out_tickets[] = $this->_get_ticket_and_event_name($ticket);
    }



    /**
     *    _ticket_quantity_decremented
     *    adjusts quantities within the ticket selector based on decreased ticket availability
     *
     * @access    protected
     * @param    \EE_Ticket $ticket
     * @return void
     * @throws UnexpectedEntityException
     * @throws EE_Error
     */
    protected function _ticket_quantity_decremented(EE_Ticket $ticket)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
            echo '<br /> . . ticket->name: ' . $this->_get_ticket_and_event_name($ticket);
        }
        $this->decremented_tickets[] = $this->_get_ticket_and_event_name($ticket);
    }



    /**
     *    _get_ticket_and_event_name
     *    builds string out of ticket and event name
     *
     * @access    protected
     * @param    \EE_Ticket $ticket
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
     * ticket_quantity_updated
     * releases or reserves ticket(s) based on quantity passed
     *
     * @access public
     * @param  EE_Line_Item $line_item
     * @param  int          $quantity
     * @return void
     * @throws EE_Error
     */
    public static function ticket_quantity_updated(EE_Line_Item $line_item, $quantity = 1)
    {
        $ticket = EEM_Ticket::instance()->get_one_by_ID(absint($line_item->OBJ_ID()));
        if ($ticket instanceof EE_Ticket) {
            if ($quantity > 0) {
                EED_Ticket_Sales_Monitor::instance()->_reserve_ticket($ticket, $quantity);
            } else {
                EED_Ticket_Sales_Monitor::instance()->_release_reserved_ticket($ticket, $quantity);
            }
        }
    }



    /**
     * ticket_removed_from_cart
     * releases reserved ticket(s) based on quantity passed
     *
     * @access public
     * @param  EE_Ticket $ticket
     * @param  int       $quantity
     * @return void
     * @throws EE_Error
     */
    public static function ticket_removed_from_cart(EE_Ticket $ticket, $quantity = 1)
    {
        EED_Ticket_Sales_Monitor::instance()->_release_reserved_ticket($ticket, $quantity);
    }



    /********************************** POST_NOTICES  **********************************/



    /**
     *    post_notices
     *
     * @access    public
     * @return    void
     * @throws EE_Error
     */
    public static function post_notices()
    {
        EED_Ticket_Sales_Monitor::instance()->_post_notices();
    }



    /**
     *    _post_notices
     *
     * @access    protected
     * @return    void
     * @throws EE_Error
     */
    protected function _post_notices()
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        $refresh_msg = '';
        $none_added_msg = '';
        if (defined('DOING_AJAX') && DOING_AJAX) {
            $refresh_msg = __('Please refresh the page to view updated ticket quantities.',
                'event_espresso');
            $none_added_msg = __('No tickets were added for the event.', 'event_espresso');
        }
        if ( ! empty($this->sold_out_tickets)) {
            EE_Error::add_attention(
                sprintf(
                    apply_filters(
                        'FHEE__EED_Ticket_Sales_Monitor___post_notices__sold_out_tickets_notice',
                        __('We\'re sorry...%1$sThe following items have sold out since you first viewed this page, and can no longer be registered for:%1$s%1$s%2$s%1$s%1$sPlease note that availability can change at any time due to cancellations, so please check back again later if registration for this event(s) is important to you.%1$s%1$s%3$s%1$s%4$s%1$s',
                            'event_espresso')
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
        if ( ! empty($this->decremented_tickets)) {
            EE_Error::add_attention(
                sprintf(
                    apply_filters(
                        'FHEE__EED_Ticket_Sales_Monitor___ticket_quantity_decremented__notice',
                        __('We\'re sorry...%1$sDue to sales that have occurred since you first viewed the last page, the following items have had their quantities adjusted to match the current available amount:%1$s%1$s%2$s%1$s%1$sPlease note that availability can change at any time due to cancellations, so please check back again later if registration for this event(s) is important to you.%1$s%1$s%3$s%1$s%4$s%1$s',
                            'event_espresso')
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
     *    _release_all_reserved_tickets_for_transaction
     *    releases reserved tickets for all registrations of an EE_Transaction
     *    by default, will NOT release tickets for finalized transactions
     *
     * @access    protected
     * @param    EE_Transaction $transaction
     * @return int
     * @throws EE_Error
     */
    protected function _release_all_reserved_tickets_for_transaction(EE_Transaction $transaction)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
            echo '<br /> . transaction->ID: ' . $transaction->ID();
        }
        // check if 'finalize_registration' step has been completed...
        $finalized = $transaction->reg_step_completed('finalize_registration');
        if (self::debug) {
            // DEBUG LOG
            EEH_Debug_Tools::log(
                __CLASS__, __FUNCTION__, __LINE__,
                array('finalized' => $finalized),
                false, 'EE_Transaction: ' . $transaction->ID()
            );
        }
        // how many tickets were released
        $count = 0;
        if (self::debug) {
            echo '<br /> . . . finalized: ' . $finalized;
        }
        $release_tickets_with_TXN_status = array(
            EEM_Transaction::failed_status_code,
            EEM_Transaction::abandoned_status_code,
            EEM_Transaction::incomplete_status_code,
        );
        // if the session is getting cleared BEFORE the TXN has been finalized
        if ( ! $finalized || in_array($transaction->status_ID(), $release_tickets_with_TXN_status, true)) {
            // let's cancel any reserved tickets
            $registrations = $transaction->registrations();
            if ( ! empty($registrations)) {
                foreach ($registrations as $registration) {
                    if ($registration instanceof EE_Registration) {
                        $count += $this->_release_reserved_ticket_for_registration($registration, $transaction);
                    }
                }
            }
        }
        return $count;
    }



    /**
     *    _release_reserved_ticket_for_registration
     *    releases reserved tickets for an EE_Registration
     *    by default, will NOT release tickets for APPROVED registrations
     *
     * @access    protected
     * @param    EE_Registration $registration
     * @param    EE_Transaction  $transaction
     * @return    int
     * @throws    EE_Error
     */
    protected function _release_reserved_ticket_for_registration(
        EE_Registration $registration,
        EE_Transaction $transaction
    ) {
        $STS_ID = $transaction->status_ID();
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
            echo '<br /> . . registration->ID: ' . $registration->ID();
            echo '<br /> . . registration->status_ID: ' . $registration->status_ID();
            echo '<br /> . . transaction->status_ID(): ' . $STS_ID;
        }
        if (
            // release Tickets for Failed Transactions and Abandoned Transactions
            $STS_ID === EEM_Transaction::failed_status_code
            || $STS_ID === EEM_Transaction::abandoned_status_code
            || (
                // also release Tickets for Incomplete Transactions, but ONLY if the Registrations are NOT Approved
                $STS_ID === EEM_Transaction::incomplete_status_code
                && $registration->status_ID() !== EEM_Registration::status_id_approved
            )
        ) {
            $ticket = $registration->ticket();
            if ($ticket instanceof EE_Ticket) {
                return $this->_release_reserved_ticket($ticket);
            }
        }
        return 0;
    }



    /********************************** SESSION_CART_RESET  **********************************/



    /**
     *    session_cart_reset
     * callback hooked into 'AHEE__EE_Session__reset_cart__before_reset'
     *
     * @access    public
     * @param    EE_Session $session
     * @return    void
     * @throws EE_Error
     */
    public static function session_cart_reset(EE_Session $session)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        $cart = $session->cart();
        if ($cart instanceof EE_Cart) {
            if (self::debug) {
                echo '<br /><br /> cart instance of EE_Cart: ';
            }
            EED_Ticket_Sales_Monitor::instance()->_session_cart_reset($cart);
        } else {
            if (self::debug) {
                echo '<br /><br /> invalid EE_Cart: ';
                var_dump($cart);
            }
        }
    }



    /**
     *    _session_cart_reset
     * releases reserved tickets in the EE_Cart
     *
     * @access    protected
     * @param    EE_Cart $cart
     * @return    void
     * @throws EE_Error
     */
    protected function _session_cart_reset(EE_Cart $cart)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        EE_Registry::instance()->load_helper('Line_Item');
        $ticket_line_items = $cart->get_tickets();
        if (empty($ticket_line_items)) {
            return;
        }
        foreach ($ticket_line_items as $ticket_line_item) {
            if (self::debug) {
                echo '<br /> . ticket_line_item->ID(): ' . $ticket_line_item->ID();
            }
            if ($ticket_line_item instanceof EE_Line_Item && $ticket_line_item->OBJ_type() === 'Ticket') {
                if (self::debug) {
                    echo '<br /> . . ticket_line_item->OBJ_ID(): ' . $ticket_line_item->OBJ_ID();
                }
                $ticket = EEM_Ticket::instance()->get_one_by_ID($ticket_line_item->OBJ_ID());
                if ($ticket instanceof EE_Ticket) {
                    if (self::debug) {
                        echo '<br /> . . ticket->ID(): ' . $ticket->ID();
                        echo '<br /> . . ticket_line_item->quantity(): ' . $ticket_line_item->quantity();
                    }
                    $this->_release_reserved_ticket($ticket, $ticket_line_item->quantity());
                }
            }
        }
        if (self::debug) {
            echo '<br /><br /> RESET COMPLETED ';
        }
    }



    /********************************** SESSION_CHECKOUT_RESET  **********************************/



    /**
     *    session_checkout_reset
     * callback hooked into 'AHEE__EE_Session__reset_checkout__before_reset'
     *
     * @access    public
     * @param    EE_Session $session
     * @return    void
     * @throws EE_Error
     */
    public static function session_checkout_reset(EE_Session $session)
    {
        $checkout = $session->checkout();
        if ($checkout instanceof EE_Checkout) {
            EED_Ticket_Sales_Monitor::instance()->_session_checkout_reset($checkout);
        }
    }



    /**
     *    _session_checkout_reset
     * releases reserved tickets for the EE_Checkout->transaction
     *
     * @access    protected
     * @param    EE_Checkout $checkout
     * @return    void
     * @throws EE_Error
     */
    protected function _session_checkout_reset(EE_Checkout $checkout)
    {
        if (self::debug) {
            echo '<br /><br /> ' . __LINE__ . ') ' . __METHOD__ . '() ';
        }
        // we want to release the each registration's reserved tickets if the session was cleared, but not if this is a revisit
        if ($checkout->revisit || ! $checkout->transaction instanceof EE_Transaction) {
            return;
        }
        $this->_release_all_reserved_tickets_for_transaction($checkout->transaction);
    }



    /********************************** SESSION_EXPIRED_RESET  **********************************/



    /**
     *    session_expired_reset
     *
     * @access    public
     * @param    EE_Session $session
     * @return    void
     */
    public static function session_expired_reset(EE_Session $session)
    {
    }



    /********************************** PROCESS_ABANDONED_TRANSACTIONS  **********************************/



    /**
     *    process_abandoned_transactions
     *    releases reserved tickets for all registrations of an ABANDONED EE_Transaction
     *    by default, will NOT release tickets for free transactions, or any that have received a payment
     *
     * @access    public
     * @param    EE_Transaction $transaction
     * @return    void
     * @throws EE_Error
     */
    public static function process_abandoned_transactions(EE_Transaction $transaction)
    {
        // is this TXN free or has any money been paid towards this TXN? If so, then leave it alone
        if ($transaction->is_free() || $transaction->paid() > 0) {
            if (self::debug) {
                // DEBUG LOG
                EEH_Debug_Tools::log(
                    __CLASS__, __FUNCTION__, __LINE__,
                    array($transaction),
                    false, 'EE_Transaction: ' . $transaction->ID()
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
                        __CLASS__, __FUNCTION__, __LINE__,
                        array($payment),
                        false, 'EE_Transaction: ' . $transaction->ID()
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
     *    process_abandoned_transactions
     *    releases reserved tickets for absolutely ALL registrations of a FAILED EE_Transaction
     *
     * @access    public
     * @param    EE_Transaction $transaction
     * @return    void
     * @throws EE_Error
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
     * @throws \EE_Error
     * @throws \DomainException
     */
    public static function reset_reservation_counts()
    {
        /** @var EE_Line_Item[] $valid_reserved_tickets */
        $valid_reserved_tickets = array();
        $transactions_in_progress = EEM_Transaction::instance()->get_transactions_in_progress();
        foreach ($transactions_in_progress as $transaction_in_progress) {
            // if this TXN has been fully completed, then skip it
            if ($transaction_in_progress->reg_step_completed('finalize_registration')) {
                continue;
            }
            /** @var EE_Transaction $transaction_in_progress */
            $total_line_item = $transaction_in_progress->total_line_item();
            // $transaction_in_progress->line
            if (! $total_line_item instanceof EE_Line_Item) {
                throw new DomainException(
                    esc_html__('Transaction does not have a valid Total Line Item associated with it.', 'event_espresso')
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
        return EED_Ticket_Sales_Monitor::release_reservations_for_tickets(
            EEM_Ticket::instance()->get_tickets_with_reservations(),
            $valid_reserved_tickets
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
     * @param EE_Ticket[] $tickets_with_reservations
     * @param EE_Line_Item[] $valid_reserved_ticket_line_items
     * @return int
     * @throws \EE_Error
     */
    private static function release_reservations_for_tickets(
        array $tickets_with_reservations,
        $valid_reserved_ticket_line_items = array()
    ) {
        $total_tickets_released = 0;
        foreach ($tickets_with_reservations as $ticket_with_reservations) {
            if (! $ticket_with_reservations instanceof EE_Ticket) {
                continue;
            }
            $reserved_qty = $ticket_with_reservations->reserved();
            foreach ($valid_reserved_ticket_line_items as $valid_reserved_ticket_line_item) {
                if (
                    $valid_reserved_ticket_line_item instanceof EE_Line_Item
                    && $valid_reserved_ticket_line_item->OBJ_ID() === $ticket_with_reservations->ID()
                ) {
                    $reserved_qty -= $valid_reserved_ticket_line_item->quantity();
                }
            }
            if ($reserved_qty > 0) {
                $ticket_with_reservations->decrease_reserved($reserved_qty);
                $ticket_with_reservations->save();
                $total_tickets_released += $reserved_qty;
            }
        }
        return $total_tickets_released;
    }



    /********************************** SHUTDOWN  **********************************/



    /**
     * @return false|int
     * @throws \EE_Error
     */
    public static function clear_expired_line_items_with_no_transaction()
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        return $wpdb->query(
            $wpdb->prepare(
                'DELETE FROM ' . EEM_Line_Item::instance()->table() . '
                WHERE TXN_ID = 0 AND LIN_timestamp <= %s',
                // use GMT time because that's what LIN_timestamps are in
                date('Y-m-d H:i:s', time() - EE_Registry::instance()->SSN->lifespan())
            )
        );
    }

}
// End of file EED_Ticket_Sales_Monitor.module.php
// Location: /modules/ticket_sales_monitor/EED_Ticket_Sales_Monitor.module.php