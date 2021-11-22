<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Cart;
use EE_Core_Config;
use EE_Error;
use EE_Session;
use EE_Ticket;
use EEH_Event_View;
use EEM_Ticket;
use EventEspresso\core\domain\services\factories\CartFactory;
use EEH_URL;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;
use ReflectionException;

// phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersSingle
// phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersPlural

/**
 * Class ProcessTicketSelector
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProcessTicketSelector
{

    /**
     * @var EE_Cart $cart
     */
    private $cart;

    /**
     * @var EE_Core_Config $core_config
     */
    private $core_config;

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var EE_Session $session
     */
    private $session;

    /**
     * @var EEM_Ticket $ticket_model
     */
    private $ticket_model;

    /**
     * @var TicketDatetimeAvailabilityTracker $tracker
     */
    private $tracker;


    /**
     * ProcessTicketSelector constructor.
     * NOTE: PLZ use the Loader to instantiate this class if need be
     * so that all dependencies get injected correctly (which will happen automatically)
     * Null values for parameters are only for backwards compatibility but will be removed later on.
     *
     * @param EE_Core_Config                    $core_config
     * @param RequestInterface                           $request
     * @param EE_Session                        $session
     * @param EEM_Ticket                        $ticket_model
     * @param TicketDatetimeAvailabilityTracker $tracker
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct(
        EE_Core_Config $core_config = null,
        RequestInterface $request = null,
        EE_Session $session = null,
        EEM_Ticket $ticket_model = null,
        TicketDatetimeAvailabilityTracker $tracker = null
    ) {
        $loader = LoaderFactory::getLoader();
        $this->core_config = $core_config instanceof EE_Core_Config
            ? $core_config
            : $loader->getShared('EE_Core_Config');
        $this->request = $request instanceof RequestInterface
            ? $request
            : $loader->getShared('EventEspresso\core\services\request\Request');
        $this->session = $session instanceof EE_Session
            ? $session
            : $loader->getShared('EE_Session');
        $this->ticket_model = $ticket_model instanceof EEM_Ticket
            ? $ticket_model
            : $loader->getShared('EEM_Ticket');
        $this->tracker = $tracker instanceof TicketDatetimeAvailabilityTracker
            ? $tracker
            : $loader->getShared('EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker');
    }


    /**
     * cancelTicketSelections
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function cancelTicketSelections()
    {
        // check nonce
        if (! $this->processTicketSelectorNonce('cancel_ticket_selections')) {
            return false;
        }
        $this->session->clear_session(__CLASS__, __FUNCTION__);
        if ($this->request->requestParamIsSet('event_id')) {
            EEH_URL::safeRedirectAndExit(
                EEH_Event_View::event_link_url(
                    $this->request->getRequestParam('event_id', 0, 'int')
                )
            );
        }
        EEH_URL::safeRedirectAndExit(
            site_url('/' . $this->core_config->event_cpt_slug . '/')
        );
        return true;
    }


    /**
     * processTicketSelectorNonce
     *
     * @param  string $nonce_name
     * @param string  $id
     * @return bool
     */
    private function processTicketSelectorNonce($nonce_name, $id = '')
    {
        $nonce_name_with_id = ! empty($id) ? "{$nonce_name}_nonce_{$id}" : "{$nonce_name}_nonce";
        if (
            ! $this->request->isAdmin()
            && (
                ! $this->request->requestParamIsSet($nonce_name_with_id)
                || ! wp_verify_nonce(
                    $this->request->getRequestParam($nonce_name_with_id),
                    $nonce_name
                )
            )
        ) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'We\'re sorry but your request failed to pass a security check.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }


    /**
     * process_ticket_selections
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function processTicketSelections()
    {
        do_action('EED_Ticket_Selector__process_ticket_selections__before');
        if ($this->request->isBot()) {
            EEH_URL::safeRedirectAndExit(
                apply_filters(
                    'FHEE__EE_Ticket_Selector__process_ticket_selections__bot_redirect_url',
                    site_url()
                )
            );
        }
        // do we have an event id?
        $id = $this->getEventId();
        // we should really only have 1 registration in the works now
        // (ie, no MER) so unless otherwise requested, clear the session
        if (apply_filters('FHEE__EE_Ticket_Selector__process_ticket_selections__clear_session', true)) {
            $this->session->clear_session(__CLASS__, __FUNCTION__);
        }
        // validate/sanitize/filter data
        $post_data_validator = New ProcessTicketSelectorPostData($id, $this->request);
        $valid = apply_filters(
            'FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data',
            $post_data_validator->validatePostData()
        );
        // check total tickets ordered vs max number of attendees that can register
        if (! empty($valid) && $valid['total_tickets'] > $valid['max_atndz']) {
            $this->maxAttendeesViolation($valid);
        } else {
            // all data appears to be valid
            if ($this->processSuccessfulCart($this->addTicketsToCart($valid))) {
                return true;
            }
        }
        // die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL BEFORE REDIRECT
        // at this point, just return if registration is being made from admin
        if ($this->request->isAdmin() || $this->request->isFrontAjax()) {
            return false;
        }
        if ($valid['return_url']) {
            EEH_URL::safeRedirectAndExit($valid['return_url']);
        }
        if ($id) {
            EEH_URL::safeRedirectAndExit(get_permalink($id));
        }
        echo EE_Error::get_notices(); // already escaped
        return false;
    }


    /**
     * @return int
     */
    private function getEventId()
    {
        // do we have an event id?
        if (! $this->request->requestParamIsSet('tkt-slctr-event-id')) {
            // $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'An event id was not provided or was not received.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        // if event id is valid
        return $this->request->getRequestParam('tkt-slctr-event-id', 0, 'int');
    }


    // /**
    //  * validate_post_data ProcessTicketSelectorPostData
    //  *
    //  * @param int $id
    //  * @return array
    //  */
    // private function validatePostData($id = 0)
    // {
    //     if (! $id) {
    //         EE_Error::add_error(
    //             esc_html__('The event id provided was not valid.', 'event_espresso'),
    //             __FILE__,
    //             __FUNCTION__,
    //             __LINE__
    //         );
    //         return array();
    //     }
    //     // start with an empty array()
    //     $valid_data = array();
    //     // grab valid id
    //     $valid_data['id'] = $id;
    //     // array of other form names
    //     $inputs_to_clean = array(
    //         'max_atndz'  => 'tkt-slctr-max-atndz-',
    //         'rows'       => 'tkt-slctr-rows-',
    //         'qty'        => 'tkt-slctr-qty-',
    //         'ticket_id'  => 'tkt-slctr-ticket-id-',
    //         'return_url' => 'tkt-slctr-return-url-',
    //     );
    //     // let's track the total number of tickets ordered.'
    //     $valid_data['total_tickets'] = 0;
    //     // cycle through $inputs_to_clean array
    //     foreach ($inputs_to_clean as $what => $input_to_clean) {
    //         $input_key = "{$input_to_clean}{$id}";
    //         // check for POST data
    //         if ($this->request->requestParamIsSet($input_key)) {
    //             switch ($what) {
    //                 // integers
    //                 case 'event_id':
    //                 case 'rows':
    //                 case 'max_atndz':
    //                     $valid_data[ $what ] = $this->request->getRequestParam($input_key, 0, 'int');
    //                     break;
    //                 // arrays of integers
    //                 case 'qty':
    //                     $max_atndz = $valid_data['max_atndz'] ?? $this->request->getRequestParam($input_key, 0, 'int');
    //                     // explode integers by the dash if qty is a string
    //                     $delimiter = $max_atndz === 1 ? '-' : '';
    //                     /** @var array $row_qty */
    //                     $row_qty = $this->request->getRequestParam($input_key, [], 'int', true, $delimiter);
    //                     // if qty is coming from a radio button input, then we need to assemble an array of rows
    //                     if ($max_atndz === 1) {
    //                         // get number of rows
    //                         $rows = $this->request->getRequestParam('tkt-slctr-rows-' . $id, 1, 'int');
    //                         $row = isset($row_qty[0]) ? absint($row_qty[0]) : 1;
    //                         $qty = isset($row_qty[1]) ? absint($row_qty[1]) : 0;
    //                         // restructure the row qty array so that $row is now the key instead of the first value
    //                         $row_qty = array($row => $qty);
    //                         for ($x = 1; $x <= $rows; $x++) {
    //                             if (! isset($row_qty[ $x ])) {
    //                                 $row_qty[ $x ] = 0;
    //                             }
    //                         }
    //                     }
    //                     ksort($row_qty);
    //                     // cycle thru values
    //                     foreach ($row_qty as $qty) {
    //                         $qty = absint($qty);
    //                         // sanitize as integers
    //                         $valid_data[ $what ][] = $qty;
    //                         $valid_data['total_tickets'] += $qty;
    //                     }
    //                     break;
    //                 // array of integers
    //                 case 'ticket_id':
    //                     $ticket_ids = (array) $this->request->getRequestParam($input_key, [], 'int', true);
    //                     // cycle thru values
    //                     foreach ($ticket_ids as $key => $value) {
    //                         // allow only integers
    //                         $valid_data[ $what ][ $key ] = absint($value);
    //                     }
    //                     break;
    //                 case 'return_url':
    //                     // grab and sanitize return-url
    //                     $input_value = $this->request->getRequestParam($input_key, '', 'url');
    //                     // was the request coming from an iframe ? if so, then:
    //                     if (strpos($input_value, 'event_list=iframe')) {
    //                         // get anchor fragment
    //                         $input_value = explode('#', $input_value);
    //                         $input_value = end($input_value);
    //                         // use event list url instead, but append anchor
    //                         $input_value = EEH_Event_View::event_archive_url() . '#' . $input_value;
    //                     }
    //                     $valid_data[ $what ] = $input_value;
    //                     break;
    //             }    // end switch $what
    //         }
    //     }    // end foreach $inputs_to_clean
    //     return $valid_data;
    // }


    /**
     * @param array $valid
     */
    private function maxAttendeesViolation(array $valid)
    {
        // ordering too many tickets !!!
        $total_tickets_string = esc_html(
            _n(
                'You have attempted to purchase %s ticket.',
                'You have attempted to purchase %s tickets.',
                $valid['total_tickets'],
                'event_espresso'
            )
        );
        $limit_error_1 = sprintf($total_tickets_string, $valid['total_tickets']);
        // dev only message
        $max_attendees_string = esc_html(
            _n(
                'The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                $valid['max_atndz'],
                'event_espresso'
            )
        );
        $limit_error_2 = sprintf($max_attendees_string, $valid['max_atndz'], $valid['max_atndz']);
        EE_Error::add_error($limit_error_1 . '<br/>' . $limit_error_2, __FILE__, __FUNCTION__, __LINE__);
    }


    /**
     * @param array $valid
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function addTicketsToCart(array $valid)
    {
        $tickets_added = 0;
        $tickets_selected = false;
        if (! empty($valid) && $valid['total_tickets'] > 0) {
            // load cart using factory because we don't want to do so until actually needed
            $this->cart = CartFactory::getCart();
            // if the user is an admin that can edit registrations,
            // then we'll also allow them to add any tickets, even if they are expired
            $current_user_is_admin = current_user_can('ee_edit_registrations');
            // cycle thru the number of data rows sent from the event listing
            for ($x = 0; $x < $valid['rows']; $x++) {
                // does this row actually contain a ticket quantity?
                if (isset($valid['qty'][ $x ]) && $valid['qty'][ $x ] > 0) {
                    // YES we have a ticket quantity
                    $tickets_selected = true;
                    $valid_ticket = false;
                    if (isset($valid['ticket_id'][ $x ])) {
                        // get ticket via the ticket id we put in the form
                        $ticket = $this->ticket_model->get_one_by_ID($valid['ticket_id'][ $x ]);
                        if ($ticket instanceof EE_Ticket && ($ticket->is_on_sale() || $current_user_is_admin)) {
                            $valid_ticket = true;
                            $tickets_added += $this->addTicketToCart(
                                $ticket,
                                $valid['qty'][ $x ]
                            );
                        }
                    }
                    if ($valid_ticket !== true) {
                        // nothing added to cart retrieved
                        EE_Error::add_error(
                            sprintf(
                                esc_html__(
                                    'A valid ticket could not be retrieved for the event.%sPlease click the back button on your browser and try again.',
                                    'event_espresso'
                                ),
                                '<br/>'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                    if (EE_Error::has_error()) {
                        break;
                    }
                }
            }
        }
        do_action(
            'AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
            $this->cart,
            $this
        );
        if (! apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', $tickets_selected)) {
            // no ticket quantities were selected
            EE_Error::add_error(
                esc_html__('You need to select a ticket quantity before you can proceed.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return $tickets_added;
    }


    /**
     * adds a ticket to the cart
     *
     * @param EE_Ticket $ticket
     * @param int       $qty
     * @return bool TRUE on success, FALSE on fail
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    private function addTicketToCart(EE_Ticket $ticket, $qty = 1)
    {
        // get the number of spaces left for this datetime ticket
        $available_spaces = $this->tracker->ticketDatetimeAvailability($ticket);
        // compare available spaces against the number of tickets being purchased
        if ($available_spaces >= $qty) {
            // allow addons to prevent a ticket from being added to cart
            if (
                ! apply_filters(
                    'FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_add_to_cart',
                    true,
                    $ticket,
                    $qty,
                    $available_spaces
                )
            ) {
                return false;
            }
            $qty = absint(apply_filters('FHEE__EE_Ticket_Selector___add_ticket_to_cart__ticket_qty', $qty, $ticket));
            // add event to cart
            if ($this->cart->add_ticket_to_cart($ticket, $qty)) {
                $this->tracker->recalculateTicketDatetimeAvailability($ticket, $qty);
                return true;
            }
            return false;
        }
        $this->tracker->processAvailabilityError($ticket, $qty, $this->cart->all_ticket_quantity_count());
        return false;
    }


    /**
     * @param $tickets_added
     * @return bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    private function processSuccessfulCart($tickets_added)
    {
        // exit('KILL REDIRECT BEFORE CART UPDATE'); // <<<<<<<<<<<<<<<<< KILL REDIRECT HERE BEFORE CART UPDATE
        if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__success', $tickets_added)) {
            // make sure cart is loaded
            if (! $this->cart instanceof EE_Cart) {
                $this->cart = CartFactory::getCart();
            }
            do_action(
                'FHEE__EE_Ticket_Selector__process_ticket_selections__before_redirecting_to_checkout',
                $this->cart,
                $this
            );
            $this->cart->recalculate_all_cart_totals();
            $this->cart->save_cart(false);
            // exit('KILL REDIRECT AFTER CART UPDATE'); // <<<<<<<<  OR HERE TO KILL REDIRECT AFTER CART UPDATE
            // just return TRUE for registrations being made from admin
            if ($this->request->isAdmin() || $this->request->isFrontAjax()) {
                return true;
            }
            EEH_URL::safeRedirectAndExit(
                apply_filters(
                    'FHEE__EE_Ticket_Selector__process_ticket_selections__success_redirect_url',
                    $this->core_config->reg_page_url()
                )
            );
        }
        if (! EE_Error::has_error() && ! EE_Error::has_error(true, 'attention')) {
            // nothing added to cart
            EE_Error::add_attention(
                esc_html__('No tickets were added for the event', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return false;
    }
}
