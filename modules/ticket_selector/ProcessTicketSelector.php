<?php
namespace EventEspresso\modules\ticket_selector;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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
     * array of datetimes and the spaces available for them
     *
     * @access private
     * @var array
     */
    private static $_available_spaces = array();



    /**
     * cancelTicketSelections
     *
     * @return        string
     */
    public function cancelTicketSelections()
    {
        // check nonce
        if ( ! $this->processTicketSelectorNonce('cancel_ticket_selections')) {
            return false;
        }
        \EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        if (\EE_Registry::instance()->REQ->is_set('event_id')) {
            wp_safe_redirect(
                \EEH_Event_View::event_link_url(
                    \EE_Registry::instance()->REQ->get('event_id')
                )
            );
        } else {
            wp_safe_redirect(
                site_url('/' . \EE_Registry::instance()->CFG->core->event_cpt_slug . '/')
            );
        }
        exit();
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
            ! is_admin()
            && (
                ! \EE_Registry::instance()->REQ->is_set($nonce_name_with_id)
                || ! wp_verify_nonce(
                    \EE_Registry::instance()->REQ->get($nonce_name_with_id),
                    $nonce_name
                )
            )
        ) {
            \EE_Error::add_error(
                sprintf(
                    __(
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
     * @return array|bool
     * @throws \EE_Error
     */
    public function processTicketSelections()
    {
        do_action('EED_Ticket_Selector__process_ticket_selections__before');
        // do we have an event id?
        if ( ! \EE_Registry::instance()->REQ->is_set('tkt-slctr-event-id')) {
            // $_POST['tkt-slctr-event-id'] was not set ?!?!?!?
            \EE_Error::add_error(
                sprintf(
                    __(
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
        //if event id is valid
        $id = absint(\EE_Registry::instance()->REQ->get('tkt-slctr-event-id'));
        // check nonce
        if ( ! $this->processTicketSelectorNonce('process_ticket_selections', $id)) {
            return false;
        }
        //		d( \EE_Registry::instance()->REQ );
        self::$_available_spaces = array(
            'tickets'   => array(),
            'datetimes' => array(),
        );
        //we should really only have 1 registration in the works now (ie, no MER) so clear any previous items in the cart.
        // When MER happens this will probably need to be tweaked, possibly wrapped in a conditional checking for some constant defined in MER etc.
        \EE_Registry::instance()->load_core('Session');
        // unless otherwise requested, clear the session
        if (apply_filters('FHEE__EE_Ticket_Selector__process_ticket_selections__clear_session', true)) {
            \EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        }
        //d( \EE_Registry::instance()->SSN );
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // validate/sanitize data
        $valid = $this->validatePostData($id);
        //EEH_Debug_Tools::printr( $_REQUEST, '$_REQUEST', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid, '$valid', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid[ 'total_tickets' ], 'total_tickets', __FILE__, __LINE__ );
        //EEH_Debug_Tools::printr( $valid[ 'max_atndz' ], 'max_atndz', __FILE__, __LINE__ );
        //check total tickets ordered vs max number of attendees that can register
        if ($valid['total_tickets'] > $valid['max_atndz']) {
            // ordering too many tickets !!!
            $total_tickets_string = _n(
                'You have attempted to purchase %s ticket.',
                'You have attempted to purchase %s tickets.',
                $valid['total_tickets'],
                'event_espresso'
            );
            $limit_error_1 = sprintf($total_tickets_string, $valid['total_tickets']);
            // dev only message
            $max_atndz_string = _n(
                'The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                $valid['max_atndz'],
                'event_espresso'
            );
            $limit_error_2 = sprintf($max_atndz_string, $valid['max_atndz'], $valid['max_atndz']);
            \EE_Error::add_error($limit_error_1 . '<br/>' . $limit_error_2, __FILE__, __FUNCTION__, __LINE__);
        } else {
            // all data appears to be valid
            $tckts_slctd = false;
            $tickets_added = 0;
            $valid = apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data', $valid);
            if ($valid['total_tickets'] > 0) {
                // load cart
                \EE_Registry::instance()->load_core('Cart');
                // cycle thru the number of data rows sent from the event listing
                for ($x = 0; $x < $valid['rows']; $x++) {
                    // does this row actually contain a ticket quantity?
                    if (isset($valid['qty'][$x]) && $valid['qty'][$x] > 0) {
                        // YES we have a ticket quantity
                        $tckts_slctd = true;
                        //						d( $valid['ticket_obj'][$x] );
                        if ($valid['ticket_obj'][$x] instanceof \EE_Ticket) {
                            // then add ticket to cart
                            $tickets_added += $this->addTicketToCart(
                                $valid['ticket_obj'][$x],
                                $valid['qty'][$x]
                            );
                            if (\EE_Error::has_error()) {
                                break;
                            }
                        } else {
                            // nothing added to cart retrieved
                            \EE_Error::add_error(
                                sprintf(
                                    __(
                                        'A valid ticket could not be retrieved for the event.%sPlease click the back button on your browser and try again.',
                                        'event_espresso'
                                    ),
                                    '<br/>'
                                ),
                                __FILE__, __FUNCTION__, __LINE__
                            );
                        }
                    }
                }
            }
            do_action(
                'AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
                \EE_Registry::instance()->CART,
                $this
            );
            //d( \EE_Registry::instance()->CART );
            //die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL REDIRECT HERE BEFORE CART UPDATE
            if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', $tckts_slctd)) {
                if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__success', $tickets_added)) {
                    do_action(
                        'FHEE__EE_Ticket_Selector__process_ticket_selections__before_redirecting_to_checkout',
                        \EE_Registry::instance()->CART,
                        $this
                    );
                    \EE_Registry::instance()->CART->recalculate_all_cart_totals();
                    \EE_Registry::instance()->CART->save_cart(false);
                    // exit('KILL REDIRECT AFTER CART UPDATE'); // <<<<<<<<  OR HERE TO KILL REDIRECT AFTER CART UPDATE
                    // just return TRUE for registrations being made from admin
                    if (is_admin()) {
                        return true;
                    }
                    \EE_Error::get_notices(false, true);
                    wp_safe_redirect(
                        apply_filters(
                            'FHEE__EE_Ticket_Selector__process_ticket_selections__success_redirect_url',
                            \EE_Registry::instance()->CFG->core->reg_page_url()
                        )
                    );
                    exit();
                } else {
                    if ( ! \EE_Error::has_error() && ! \EE_Error::has_error(true, 'attention')) {
                        // nothing added to cart
                        \EE_Error::add_attention(__('No tickets were added for the event', 'event_espresso'),
                            __FILE__, __FUNCTION__, __LINE__);
                    }
                }
            } else {
                // no ticket quantities were selected
                \EE_Error::add_error(__('You need to select a ticket quantity before you can proceed.',
                    'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            }
        }
        //die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL BEFORE REDIRECT
        // at this point, just return if registration is being made from admin
        if (is_admin()) {
            return false;
        }
        if ($valid['return_url']) {
            \EE_Error::get_notices(false, true);
            wp_safe_redirect($valid['return_url']);
            exit();
        } elseif (isset($event_to_add['id'])) {
            \EE_Error::get_notices(false, true);
            wp_safe_redirect(get_permalink($event_to_add['id']));
            exit();
        } else {
            echo \EE_Error::get_notices();
        }
        return false;
    }



    /**
     * validate_post_data
     *
     * @param int $id
     * @return array|FALSE
     */
    private function validatePostData($id = 0)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if ( ! $id) {
            \EE_Error::add_error(
                __('The event id provided was not valid.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // start with an empty array()
        $valid_data = array();
        // grab valid id
        $valid_data['id'] = $id;
        // array of other form names
        $inputs_to_clean = array(
            'event_id'   => 'tkt-slctr-event-id',
            'max_atndz'  => 'tkt-slctr-max-atndz-',
            'rows'       => 'tkt-slctr-rows-',
            'qty'        => 'tkt-slctr-qty-',
            'ticket_id'  => 'tkt-slctr-ticket-id-',
            'return_url' => 'tkt-slctr-return-url-',
        );
        // let's track the total number of tickets ordered.'
        $valid_data['total_tickets'] = 0;
        // cycle through $inputs_to_clean array
        foreach ($inputs_to_clean as $what => $input_to_clean) {
            // check for POST data
            if (\EE_Registry::instance()->REQ->is_set($input_to_clean . $id)) {
                // grab value
                $input_value = \EE_Registry::instance()->REQ->get($input_to_clean . $id);
                switch ($what) {
                    // integers
                    case 'event_id':
                        $valid_data[$what] = absint($input_value);
                        // get event via the event id we put in the form
                        $valid_data['event'] = \EE_Registry::instance()
                                                           ->load_model('Event')
                                                           ->get_one_by_ID($valid_data['event_id']);
                        break;
                    case 'rows':
                    case 'max_atndz':
                        $valid_data[$what] = absint($input_value);
                        break;
                    // arrays of integers
                    case 'qty':
                        /** @var array $row_qty */
                        $row_qty = $input_value;
                        // if qty is coming from a radio button input, then we need to assemble an array of rows
                        if ( ! is_array($row_qty)) {
                            // get number of rows
                            $rows = \EE_Registry::instance()->REQ->is_set('tkt-slctr-rows-' . $id)
                                ? absint(\EE_Registry::instance()->REQ->get('tkt-slctr-rows-' . $id))
                                : 1;
                            // explode ints by the dash
                            $row_qty = explode('-', $row_qty);
                            $row = isset($row_qty[0]) ? absint($row_qty[0]) : 1;
                            $qty = isset($row_qty[1]) ? absint($row_qty[1]) : 0;
                            $row_qty = array($row => $qty);
                            for ($x = 1; $x <= $rows; $x++) {
                                if ( ! isset($row_qty[$x])) {
                                    $row_qty[$x] = 0;
                                }
                            }
                        }
                        ksort($row_qty);
                        // cycle thru values
                        foreach ($row_qty as $qty) {
                            $qty = absint($qty);
                            // sanitize as integers
                            $valid_data[$what][] = $qty;
                            $valid_data['total_tickets'] += $qty;
                        }
                        break;
                    // array of integers
                    case 'ticket_id':
                        $value_array = array();
                        // cycle thru values
                        foreach ((array)$input_value as $key => $value) {
                            // allow only numbers, letters,  spaces, commas and dashes
                            $value_array[$key] = wp_strip_all_tags($value);
                            // get ticket via the ticket id we put in the form
                            $ticket_obj = \EE_Registry::instance()->load_model('Ticket')->get_one_by_ID($value);
                            $valid_data['ticket_obj'][$key] = $ticket_obj;
                        }
                        $valid_data[$what] = $value_array;
                        break;
                    case 'return_url' :
                        // grab and sanitize return-url
                        $input_value = esc_url_raw($input_value);
                        // was the request coming from an iframe ? if so, then:
                        if (strpos($input_value, 'event_list=iframe')) {
                            // get anchor fragment
                            $input_value = explode('#', $input_value);
                            $input_value = end($input_value);
                            // use event list url instead, but append anchor
                            $input_value = \EEH_Event_View::event_archive_url() . '#' . $input_value;
                        }
                        $valid_data[$what] = $input_value;
                        break;
                }    // end switch $what
            }
        }    // end foreach $inputs_to_clean
        return $valid_data;
    }



    /**
     * adds a ticket to the cart
     *
     * @param \EE_Ticket $ticket
     * @param int        $qty
     * @return TRUE on success, FALSE on fail
     * @throws \EE_Error
     */
    private function addTicketToCart(\EE_Ticket $ticket = null, $qty = 1)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // get the number of spaces left for this datetime ticket
        $available_spaces = $this->ticketDatetimeAvailability($ticket);
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
            if (\EE_Registry::instance()->CART->add_ticket_to_cart($ticket, $qty)) {
                $this->recalculateTicketDatetimeAvailability($ticket, $qty);
                return true;
            }
            return false;
        }
        // tickets can not be purchased but let's find the exact number left
        // for the last ticket selected PRIOR to subtracting tickets
        $available_spaces = $this->ticketDatetimeAvailability($ticket, true);
        // greedy greedy greedy eh?
        if ($available_spaces > 0) {
            if (
            apply_filters(
                'FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_display_availability_error',
                true,
                $ticket,
                $qty,
                $available_spaces
            )
            ) {
                $this->displayAvailabilityError($available_spaces);
            }
        } else {
            \EE_Error::add_error(
                __(
                    'We\'re sorry, but there are no available spaces left for this event at this particular date and time.',
                    'event_espresso'
                ),
                __FILE__, __FUNCTION__, __LINE__
            );
        }
        return false;
    }



    /**
     * @param int $available_spaces
     * @throws \EE_Error
     */
    private function displayAvailabilityError($available_spaces = 1)
    {
        // add error messaging - we're using the _n function that will generate
        // the appropriate singular or plural message based on the number of $available_spaces
        if (\EE_Registry::instance()->CART->all_ticket_quantity_count()) {
            $msg = sprintf(
                _n(
                    'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                    'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets by cancelling the current selection and choosing again, or proceed to registration.',
                    $available_spaces,
                    'event_espresso'
                ),
                $available_spaces,
                '<br />'
            );
        } else {
            $msg = sprintf(
                _n(
                    'We\'re sorry, but there is only %1$s available space left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                    'We\'re sorry, but there are only %1$s available spaces left for this event at this particular date and time. Please select a different number (or different combination) of tickets.',
                    $available_spaces,
                    'event_espresso'
                ),
                $available_spaces,
                '<br />'
            );
        }
        \EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
    }



    /**
     * ticketDatetimeAvailability
     * creates an array of tickets plus all of the datetimes available to each ticket
     * and tracks the spaces remaining for each of those datetimes
     *
     * @param \EE_Ticket $ticket - selected ticket
     * @param bool       $get_original_ticket_spaces
     * @return int
     * @throws \EE_Error
     */
    private function ticketDatetimeAvailability(\EE_Ticket $ticket, $get_original_ticket_spaces = false)
    {
        // if the $_available_spaces array has not been set up yet...
        if ( ! isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            $this->setInitialTicketDatetimeAvailability($ticket);
        }
        $available_spaces = $ticket->qty() - $ticket->sold();
        if (isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach (self::$_available_spaces['tickets'][$ticket->ID()] as $DTD_ID => $spaces) {
                // if we want the original datetime availability BEFORE we started subtracting tickets ?
                if ($get_original_ticket_spaces) {
                    // then grab the available spaces from the "tickets" array
                    // and compare with the above to get the lowest number
                    $available_spaces = min(
                        $available_spaces,
                        self::$_available_spaces['tickets'][$ticket->ID()][$DTD_ID]
                    );
                } else {
                    // we want the updated ticket availability as stored in the "datetimes" array
                    $available_spaces = min($available_spaces, self::$_available_spaces['datetimes'][$DTD_ID]);
                }
            }
        }
        return $available_spaces;
    }



    /**
     * @param \EE_Ticket $ticket
     * @return void
     * @throws \EE_Error
     */
    private function setInitialTicketDatetimeAvailability(\EE_Ticket $ticket)
    {
        // first, get all of the datetimes that are available to this ticket
        $datetimes = $ticket->get_many_related(
            'Datetime',
            array(
                array(
                    'DTT_EVT_end' => array(
                        '>=',
                        \EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
                    ),
                ),
                'order_by' => array('DTT_EVT_start' => 'ASC'),
            )
        );
        if ( ! empty($datetimes)) {
            // now loop thru all of the datetimes
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof \EE_Datetime) {
                    // the number of spaces available for the datetime without considering individual ticket quantities
                    $spaces_remaining = $datetime->spaces_remaining();
                    // save the total available spaces ( the lesser of the ticket qty minus the number of tickets sold
                    // or the datetime spaces remaining) to this ticket using the datetime ID as the key
                    self::$_available_spaces['tickets'][$ticket->ID()][$datetime->ID()] = min(
                        $ticket->qty() - $ticket->sold(),
                        $spaces_remaining
                    );
                    // if the remaining spaces for this datetime is already set,
                    // then compare that against the datetime spaces remaining, and take the lowest number,
                    // else just take the datetime spaces remaining, and assign to the datetimes array
                    self::$_available_spaces['datetimes'][$datetime->ID()] = isset(
                        self::$_available_spaces['datetimes'][$datetime->ID()]
                    )
                        ? min(self::$_available_spaces['datetimes'][$datetime->ID()], $spaces_remaining)
                        : $spaces_remaining;
                }
            }
        }
    }



    /**
     * @param    \EE_Ticket $ticket
     * @param    int        $qty
     * @return    void
     */
    private function recalculateTicketDatetimeAvailability(\EE_Ticket $ticket, $qty = 0)
    {
        if (isset(self::$_available_spaces['tickets'][$ticket->ID()])) {
            // loop thru tickets, which will ALSO include individual ticket records AND a total
            foreach (self::$_available_spaces['tickets'][$ticket->ID()] as $DTD_ID => $spaces) {
                // subtract the qty of selected tickets from each datetime's available spaces this ticket has access to,
                self::$_available_spaces['datetimes'][$DTD_ID] -= $qty;
            }
        }
    }


}
// End of file ProcessTicketSelector.php
// Location: /ProcessTicketSelector.php