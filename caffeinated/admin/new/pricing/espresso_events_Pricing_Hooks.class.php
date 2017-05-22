<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Pricing_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package         espresso_events_Pricing_Hooks
 * @subpackage      caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Pricing_Hooks extends EE_Admin_Hooks
{

    /**
     * This property is just used to hold the status of whether an event is currently being
     * created (true) or edited (false)
     * @access protected
     * @var bool
     */
    protected $_is_creating_event;


    /**
     * Used to contain the format strings for date and time that will be used for php date and
     * time.
     *
     * Is set in the _set_hooks_properties() method.
     *
     * @var array
     */
    protected $_date_format_strings;


    protected function _set_hooks_properties()
    {
        $this->_name = 'pricing';

        //capability check
        if ( ! EE_Registry::instance()->CAP->current_user_can('ee_read_default_prices',
            'advanced_ticket_datetime_metabox')
        ) {
            return;
        }


        //if we were going to add our own metaboxes we'd use the below.
        $this->_metaboxes = array(
            0 => array(
                'page_route' => array('edit', 'create_new'),
                'func'       => 'pricing_metabox',
                'label'      => __('Event Tickets & Datetimes', 'event_espresso'),
                'priority'   => 'high',
                'context'    => 'normal'
            ),

        );/**/

        $this->_remove_metaboxes = array(
            0 => array(
                'page_route' => array('edit', 'create_new'),
                'id'         => 'espresso_event_editor_tickets',
                'context'    => 'normal'
            )
        );

        /**
         * Format strings for date and time.  Defaults are existing behaviour from 4.1.
         * Note, that if you return null as the value for 'date', and 'time' in the array, then
         * EE will automatically use the set wp_options, 'date_format', and 'time_format'.
         *
         * @since 4.6.7
         *
         * @var array  Expected an array returned with 'date' and 'time' keys.
         */
        $this->_date_format_strings = apply_filters('FHEE__espresso_events_Pricing_Hooks___set_hooks_properties__date_format_strings',
            array(
                'date' => 'Y-m-d',
                'time' => 'h:i a'
            ));

        //validate
        $this->_date_format_strings['date'] = isset($this->_date_format_strings['date']) ? $this->_date_format_strings['date'] : null;
        $this->_date_format_strings['time'] = isset($this->_date_format_strings['time']) ? $this->_date_format_strings['time'] : null;

        //validate format strings
        $format_validation = EEH_DTT_Helper::validate_format_string($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']);
        if (is_array($format_validation)) {
            $msg = '<p>' . sprintf(__('The format "%s" was likely added via a filter and is invalid for the following reasons:',
                    'event_espresso'),
                    $this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']) . '</p><ul>';
            foreach ($format_validation as $error) {
                $msg .= '<li>' . $error . '</li>';
            }
            $msg .= '</ul></p><p>' . sprintf(__('%sPlease note that your date and time formats have been reset to "Y-m-d" and "h:i a" respectively.%s',
                    'event_espresso'), '<span style="color:#D54E21;">', '</span>') . '</p>';
            EE_Error::add_attention($msg, __FILE__, __FUNCTION__, __LINE__);
            $this->_date_format_strings = array(
                'date' => 'Y-m-d',
                'time' => 'h:i a'
            );
        }


        $this->_scripts_styles = array(
            'registers'   => array(
                'ee-tickets-datetimes-css' => array(
                    'url'  => PRICING_ASSETS_URL . 'event-tickets-datetimes.css',
                    'type' => 'css'
                ),
                'ee-dtt-ticket-metabox'    => array(
                    'url'     => PRICING_ASSETS_URL . 'ee-datetime-ticket-metabox.js',
                    'depends' => array('ee-datepicker', 'ee-dialog', 'underscore')
                )
            ),
            'deregisters' => array(
                'event-editor-css'       => array('type' => 'css'),
                'event-datetime-metabox' => array('type' => 'js')
            ),
            'enqueues'    => array(
                'ee-tickets-datetimes-css' => array('edit', 'create_new'),
                'ee-dtt-ticket-metabox'    => array('edit', 'create_new')
            ),
            'localize'    => array(
                'ee-dtt-ticket-metabox' => array(
                    'DTT_TRASH_BLOCK'       => array(
                        'main_warning'            => __('The Datetime you are attempting to trash is the only datetime selected for the following ticket(s):',
                            'event_espresso'),
                        'after_warning'           => __('In order to trash this datetime you must first make sure the above ticket(s) are assigned to other datetimes.',
                            'event_espresso'),
                        'cancel_button'           => '<button class="button-secondary ee-modal-cancel">' . __('Cancel',
                                'event_espresso') . '</button>',
                        'close_button'            => '<button class="button-secondary ee-modal-cancel">' . __('Close',
                                'event_espresso') . '</button>',
                        'single_warning_from_tkt' => __('The Datetime you are attempting to unassign from this ticket is the only remaining datetime for this ticket. Tickets must always have at least one datetime assigned to them.',
                            'event_espresso'),
                        'single_warning_from_dtt' => __('The ticket you are attempting to unassign from this datetime cannot be unassigned because the datetime is the only remaining datetime for the ticket.  Tickets must always have at least one datetime assigned to them.',
                            'event_espresso'),
                        'dismiss_button'          => '<button class="button-secondary ee-modal-cancel">' . __('Dismiss',
                                'event_espresso') . '</button>'
                    ),
                    'DTT_ERROR_MSG'         => array(
                        'no_ticket_name' => __('General Admission', 'event_espresso'),
                        'dismiss_button' => '<div class="save-cancel-button-container"><button class="button-secondary ee-modal-cancel">' . __('Dismiss',
                                'event_espresso') . '</button></div>'
                    ),
                    'DTT_OVERSELL_WARNING'  => array(
                        'datetime_ticket' => __('You cannot add this ticket to this datetime because it has a sold amount that is greater than the amount of spots remaining for this datetime.',
                            'event_espresso'),
                        'ticket_datetime' => __('You cannot add this datetime to this ticket because the ticket has a sold amount that is greater than the amount of spots remaining on the datetime.',
                            'event_espresso')
                    ),
                    'DTT_CONVERTED_FORMATS' => EEH_DTT_Helper::convert_php_to_js_and_moment_date_formats($this->_date_format_strings['date'],
                        $this->_date_format_strings['time']),
                    'DTT_START_OF_WEEK'     => array('dayValue' => (int)get_option('start_of_week'))
                )
            )
        );


        add_action('AHEE__EE_Admin_Page_CPT__do_extra_autosave_stuff__after_Extend_Events_Admin_Page',
            array($this, 'autosave_handling'), 10);
        add_filter('FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            array($this, 'caf_updates'), 10);
    }


    public function caf_updates($update_callbacks)
    {
        foreach ($update_callbacks as $key => $callback) {
            if ($callback[1] == '_default_tickets_update') {
                unset($update_callbacks[$key]);
            }
        }

        $update_callbacks[] = array($this, 'dtt_and_tickets_caf_update');

        return $update_callbacks;
    }


    /**
     * Handles saving everything related to Tickets (datetimes, tickets, prices)
     *
     * @param  EE_Event $evtobj The Event object we're attaching data to
     * @param  array    $data   The request data from the form
     *
     * @return bool             success or fail
     */
    public function dtt_and_tickets_caf_update($evtobj, $data)
    {
        //first we need to start with datetimes cause they are the "root" items attached to events.
        $saved_dtts = $this->_update_dtts($evtobj, $data);
        //next tackle the tickets (and prices?)
        $this->_update_tkts($evtobj, $saved_dtts, $data);
    }


    /**
     * update event_datetimes
     *
     * @param  EE_Event $evt_obj Event being updated
     * @param  array    $data    the request data from the form
     *
     * @return EE_Datetime[]
     */
    protected function _update_dtts($evt_obj, $data)
    {
        $timezone       = isset($data['timezone_string']) ? $data['timezone_string'] : null;
        $saved_dtt_ids  = array();
        $saved_dtt_objs = array();

        foreach ($data['edit_event_datetimes'] as $row => $dtt) {
            //trim all values to ensure any excess whitespace is removed.
            $dtt                = array_map(
                function ($datetime_data) {
                    return is_array($datetime_data) ? $datetime_data : trim($datetime_data);
                },
                $dtt
            );
            $dtt['DTT_EVT_end'] = isset($dtt['DTT_EVT_end']) && ! empty($dtt['DTT_EVT_end']) ? $dtt['DTT_EVT_end'] : $dtt['DTT_EVT_start'];
            $datetime_values    = array(
                'DTT_ID'          => ! empty($dtt['DTT_ID']) ? $dtt['DTT_ID'] : null,
                'DTT_name'        => ! empty($dtt['DTT_name']) ? $dtt['DTT_name'] : '',
                'DTT_description' => ! empty($dtt['DTT_description']) ? $dtt['DTT_description'] : '',
                'DTT_EVT_start'   => $dtt['DTT_EVT_start'],
                'DTT_EVT_end'     => $dtt['DTT_EVT_end'],
                'DTT_reg_limit'   => empty($dtt['DTT_reg_limit']) ? EE_INF : $dtt['DTT_reg_limit'],
                'DTT_order'       => ! isset($dtt['DTT_order']) ? $row : $dtt['DTT_order'],
            );

            //if we have an id then let's get existing object first and then set the new values.  Otherwise we instantiate a new object for save.

            if ( ! empty($dtt['DTT_ID'])) {
                $DTM = EE_Registry::instance()->load_model('Datetime', array($timezone))->get_one_by_ID($dtt['DTT_ID']);

                //set date and time format according to what is set in this class.
                $DTM->set_date_format($this->_date_format_strings['date']);
                $DTM->set_time_format($this->_date_format_strings['time']);

                foreach ($datetime_values as $field => $value) {
                    $DTM->set($field, $value);
                }

                // make sure the $dtt_id here is saved just in case after the add_relation_to() the autosave replaces it.
                // We need to do this so we dont' TRASH the parent DTT.(save the ID for both key and value to avoid duplications)
                $saved_dtt_ids[$DTM->ID()] = $DTM->ID();

            } else {
                $DTM = EE_Registry::instance()->load_class(
                    'Datetime',
                    array(
                        $datetime_values,
                        $timezone,
                        array($this->_date_format_strings['date'], $this->_date_format_strings['time'])
                    ),
                    false,
                    false
                );

                foreach ($datetime_values as $field => $value) {
                    $DTM->set($field, $value);
                }
            }


            $DTM->save();
            $DTM = $evt_obj->_add_relation_to($DTM, 'Datetime');
            $evt_obj->save();

            //before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
            if ($DTM->get_raw('DTT_EVT_start') > $DTM->get_raw('DTT_EVT_end')) {
                $DTM->set('DTT_EVT_end', $DTM->get('DTT_EVT_start'));
                $DTM = EEH_DTT_Helper::date_time_add($DTM, 'DTT_EVT_end', 'days');
                $DTM->save();
            }

            //	now we have to make sure we add the new DTT_ID to the $saved_dtt_ids array
            // because it is possible there was a new one created for the autosave.
            // (save the ID for both key and value to avoid duplications)
            $saved_dtt_ids[$DTM->ID()] = $DTM->ID();
            $saved_dtt_objs[$row]      = $DTM;

            //todo if ANY of these updates fail then we want the appropriate global error message.
        }

        //now we need to REMOVE any dtts that got deleted.  Keep in mind that this process will only kick in for DTT's that don't have any DTT_sold on them. So its safe to permanently delete at this point.
        $old_datetimes = explode(',', $data['datetime_IDs']);
        $old_datetimes = $old_datetimes[0] == '' ? array() : $old_datetimes;

        if (is_array($old_datetimes)) {
            $dtts_to_delete = array_diff($old_datetimes, $saved_dtt_ids);
            foreach ($dtts_to_delete as $id) {
                $id = absint($id);
                if (empty($id)) {
                    continue;
                }

                $dtt_to_remove = EE_Registry::instance()->load_model('Datetime')->get_one_by_ID($id);

                //remove tkt relationships.
                $related_tickets = $dtt_to_remove->get_many_related('Ticket');
                foreach ($related_tickets as $tkt) {
                    $dtt_to_remove->_remove_relation_to($tkt, 'Ticket');
                }

                $evt_obj->_remove_relation_to($id, 'Datetime');
                $dtt_to_remove->refresh_cache_of_related_objects();

            }
        }

        return $saved_dtt_objs;
    }


    /**
     * update tickets
     *
     * @param  EE_Event      $evtobj     Event object being updated
     * @param  EE_Datetime[] $saved_dtts an array of datetime ids being updated
     * @param  array         $data       incoming request data
     *
     * @return EE_Ticket[]
     */
    protected function _update_tkts($evtobj, $saved_dtts, $data)
    {

        $new_tkt     = null;
        $new_default = null;
        //stripslashes because WP filtered the $_POST ($data) array to add slashes
        $data          = stripslashes_deep($data);
        $timezone      = isset($data['timezone_string']) ? $data['timezone_string'] : null;
        $saved_tickets = $dtts_on_existing = array();
        $old_tickets   = isset($data['ticket_IDs']) ? explode(',', $data['ticket_IDs']) : array();

        //load money helper

        foreach ($data['edit_tickets'] as $row => $tkt) {

            $update_prices = $create_new_TKT = false;

            //figure out what dtts were added to the ticket and what dtts were removed from the ticket in the session.

            $starting_tkt_dtt_rows = explode(',', $data['starting_ticket_datetime_rows'][$row]);
            $tkt_dtt_rows          = explode(',', $data['ticket_datetime_rows'][$row]);
            $dtts_added            = array_diff($tkt_dtt_rows, $starting_tkt_dtt_rows);
            $dtts_removed          = array_diff($starting_tkt_dtt_rows, $tkt_dtt_rows);

            // trim inputs to ensure any excess whitespace is removed.
            $tkt = array_map(
                function ($ticket_data) {
                    return is_array($ticket_data) ? $ticket_data : trim($ticket_data);
                },
                $tkt
            );

            //note we are doing conversions to floats here instead of allowing EE_Money_Field to handle because we're doing calcs prior to using the models.
            //note incoming ['TKT_price'] value is already in standard notation (via js).
            $ticket_price = isset($tkt['TKT_price']) ? round((float)$tkt['TKT_price'], 3) : 0;

            //note incoming base price needs converted from localized value.
            $base_price = isset($tkt['TKT_base_price']) ? EEH_Money::convert_to_float_from_localized_money($tkt['TKT_base_price']) : 0;
            //if ticket price == 0 and $base_price != 0 then ticket price == base_price
            $ticket_price  = $ticket_price === 0 && $base_price !== 0 ? $base_price : $ticket_price;
            $base_price_id = isset($tkt['TKT_base_price_ID']) ? $tkt['TKT_base_price_ID'] : 0;

            $price_rows = is_array($data['edit_prices']) && isset($data['edit_prices'][$row]) ? $data['edit_prices'][$row] : array();

            $now = null;
            if (empty($tkt['TKT_start_date'])) {
                //lets' use now in the set timezone.
                $now                   = new DateTime('now', new DateTimeZone($evtobj->get_timezone()));
                $tkt['TKT_start_date'] = $now->format($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']);
            }

            if (empty($tkt['TKT_end_date'])) {
                /**
                 * set the TKT_end_date to the first datetime attached to the ticket.
                 */
                $first_dtt           = $saved_dtts[reset($tkt_dtt_rows)];
                $tkt['TKT_end_date'] = $first_dtt->start_date_and_time($this->_date_format_strings['date'] . ' ' . $this->_date_format_string['time']);
            }

            $TKT_values = array(
                'TKT_ID'          => ! empty($tkt['TKT_ID']) ? $tkt['TKT_ID'] : null,
                'TTM_ID'          => ! empty($tkt['TTM_ID']) ? $tkt['TTM_ID'] : 0,
                'TKT_name'        => ! empty($tkt['TKT_name']) ? $tkt['TKT_name'] : '',
                'TKT_description' => ! empty($tkt['TKT_description']) && $tkt['TKT_description'] != __('You can modify this description',
                    'event_espresso') ? $tkt['TKT_description'] : '',
                'TKT_start_date'  => $tkt['TKT_start_date'],
                'TKT_end_date'    => $tkt['TKT_end_date'],
                'TKT_qty'         => ! isset($tkt['TKT_qty']) || $tkt['TKT_qty'] === '' ? EE_INF : $tkt['TKT_qty'],
                'TKT_uses'        => ! isset($tkt['TKT_uses']) || $tkt['TKT_uses'] === '' ? EE_INF : $tkt['TKT_uses'],
                'TKT_min'         => empty($tkt['TKT_min']) ? 0 : $tkt['TKT_min'],
                'TKT_max'         => empty($tkt['TKT_max']) ? EE_INF : $tkt['TKT_max'],
                'TKT_row'         => $row,
                'TKT_order'       => isset($tkt['TKT_order']) ? $tkt['TKT_order'] : 0,
                'TKT_taxable'     => ! empty($tkt['TKT_taxable']) ? 1 : 0,
                'TKT_required'    => ! empty($tkt['TKT_required']) ? 1 : 0,
                'TKT_price'       => $ticket_price
            );


            //if this is a default TKT, then we need to set the TKT_ID to 0 and update accordingly, which means in turn that the prices will become new prices as well.
            if (isset($tkt['TKT_is_default']) && $tkt['TKT_is_default']) {
                $TKT_values['TKT_ID']         = 0;
                $TKT_values['TKT_is_default'] = 0;
                $update_prices                = true;
            }

            // if we have a TKT_ID then we need to get that existing TKT_obj and update it
            // we actually do our saves ahead of doing any add_relations to
            // because its entirely possible that this ticket wasn't removed or added to any datetime in the session
            // but DID have it's items modified.
            // keep in mind that if the TKT has been sold (and we have changed pricing information),
            // then we won't be updating the tkt but instead a new tkt will be created and the old one archived.
            if (absint($TKT_values['TKT_ID'])) {
                $TKT = EE_Registry::instance()->load_model('Ticket', array($timezone))->get_one_by_ID($tkt['TKT_ID']);
                if ($TKT instanceof EE_Ticket) {

                    $TKT = $this->_update_ticket_datetimes($TKT, $saved_dtts, $dtts_added, $dtts_removed);
                    // are there any registrations using this ticket ?
                    $tickets_sold = $TKT->count_related(
                        'Registration',
                        array(
                            array(
                                'STS_ID' => array('NOT IN', array(EEM_Registration::status_id_incomplete))
                            )
                        )
                    );
                    //set ticket formats
                    $TKT->set_date_format($this->_date_format_strings['date']);
                    $TKT->set_time_format($this->_date_format_strings['time']);

                    // let's just check the total price for the existing ticket
                    // and determine if it matches the new total price.
                    // if they are different then we create a new ticket (if tkts sold)
                    // if they aren't different then we go ahead and modify existing ticket.
                    $create_new_TKT = $tickets_sold > 0 && $ticket_price != $TKT->price() && ! $TKT->deleted()
                        ? true : false;

                    //set new values
                    foreach ($TKT_values as $field => $value) {
                        if ($field === 'TKT_qty') {
                            $TKT->set_qty($value);
                        } else {
                            $TKT->set($field, $value);
                        }
                    }

                    //if $create_new_TKT is false then we can safely update the existing ticket.  Otherwise we have to create a new ticket.
                    if ($create_new_TKT) {
                        $new_tkt = $this->_duplicate_ticket($TKT, $price_rows, $ticket_price, $base_price,
                            $base_price_id);
                    }
                }

            } else {
                // no TKT_id so a new TKT
                $TKT = EE_Ticket::new_instance(
                    $TKT_values,
                    $timezone,
                    array($this->_date_format_strings['date'], $this->_date_format_strings['time'])
                );
                if ($TKT instanceof EE_Ticket) {
                    // make sure ticket has an ID of setting relations won't work
                    $TKT->save();
                    $TKT           = $this->_update_ticket_datetimes($TKT, $saved_dtts, $dtts_added, $dtts_removed);
                    $update_prices = true;
                }
            }
            //make sure any current values have been saved.
            //$TKT->save();

            //before going any further make sure our dates are setup correctly so that the end date is always equal or greater than the start date.
            if ($TKT->get_raw('TKT_start_date') > $TKT->get_raw('TKT_end_date')) {
                $TKT->set('TKT_end_date', $TKT->get('TKT_start_date'));
                $TKT = EEH_DTT_Helper::date_time_add($TKT, 'TKT_end_date', 'days');
            }

            //let's make sure the base price is handled
            $TKT = ! $create_new_TKT ? $this->_add_prices_to_ticket(array(), $TKT, $update_prices, $base_price,
                $base_price_id) : $TKT;

            //add/update price_modifiers
            $TKT = ! $create_new_TKT ? $this->_add_prices_to_ticket($price_rows, $TKT, $update_prices) : $TKT;

            //need to make sue that the TKT_price is accurate after saving the prices.
            $TKT->ensure_TKT_Price_correct();

            //handle CREATING a default tkt from the incoming tkt but ONLY if this isn't an autosave.
            if ( ! defined('DOING_AUTOSAVE')) {
                if ( ! empty($tkt['TKT_is_default_selector'])) {
                    $update_prices = true;
                    $new_default   = clone $TKT;
                    $new_default->set('TKT_ID', 0);
                    $new_default->set('TKT_is_default', 1);
                    $new_default->set('TKT_row', 1);
                    $new_default->set('TKT_price', $ticket_price);
                    //remove any dtt relations cause we DON'T want dtt relations attached (note this is just removing the cached relations in the object)
                    $new_default->_remove_relations('Datetime');
                    //todo we need to add the current attached prices as new prices to the new default ticket.
                    $new_default = $this->_add_prices_to_ticket($price_rows, $new_default, $update_prices);
                    //don't forget the base price!
                    $new_default = $this->_add_prices_to_ticket(array(), $new_default, $update_prices, $base_price,
                        $base_price_id);
                    $new_default->save();
                    do_action('AHEE__espresso_events_Pricing_Hooks___update_tkts_new_default_ticket', $new_default,
                        $row, $TKT, $data);
                }
            }


            //DO ALL dtt relationships for both current tickets and any archived tickets for the given dtt that are related to the current ticket. TODO... not sure exactly how we're going to do this considering we don't know what current ticket the archived tickets are related to (and TKT_parent is used for autosaves so that's not a field we can reliably use).


            //let's assign any tickets that have been setup to the saved_tickets tracker
            //save existing TKT
            $TKT->save();
            if ($create_new_TKT && $new_tkt instanceof EE_Ticket) {
                //save new TKT
                $new_tkt->save();
                //add new ticket to array
                $saved_tickets[$new_tkt->ID()] = $new_tkt;

                do_action('AHEE__espresso_events_Pricing_Hooks___update_tkts_new_ticket', $new_tkt, $row, $tkt, $data);

            } else {
                //add tkt to saved tkts
                $saved_tickets[$TKT->ID()] = $TKT;

                do_action('AHEE__espresso_events_Pricing_Hooks___update_tkts_update_ticket', $TKT, $row, $tkt, $data);
            }

        }

        // now we need to handle tickets actually "deleted permanently".
        // There are cases where we'd want this to happen
        // (i.e. autosaves are happening and then in between autosaves the user trashes a ticket).
        // Or a draft event was saved and in the process of editing a ticket is trashed.
        // No sense in keeping all the related data in the db!
        $old_tickets     = isset($old_tickets[0]) && $old_tickets[0] == '' ? array() : $old_tickets;
        $tickets_removed = array_diff($old_tickets, array_keys($saved_tickets));

        foreach ($tickets_removed as $id) {
            $id = absint($id);

            //get the ticket for this id
            $tkt_to_remove = EE_Registry::instance()->load_model('Ticket')->get_one_by_ID($id);

            //if this tkt is a default tkt we leave it alone cause it won't be attached to the datetime
            if ($tkt_to_remove->get('TKT_is_default')) {
                continue;
            }

            // if this tkt has any registrations attached so then we just ARCHIVE
            // because we don't actually permanently delete these tickets.
            if ($tkt_to_remove->count_related('Registration') > 0) {
                $tkt_to_remove->delete();
                continue;
            }

            // need to get all the related datetimes on this ticket and remove from every single one of them
            // (remember this process can ONLY kick off if there are NO tkts_sold)
            $dtts = $tkt_to_remove->get_many_related('Datetime');

            foreach ($dtts as $dtt) {
                $tkt_to_remove->_remove_relation_to($dtt, 'Datetime');
            }

            // need to do the same for prices (except these prices can also be deleted because again,
            // tickets can only be trashed if they don't have any TKTs sold (otherwise they are just archived))
            $tkt_to_remove->delete_related_permanently('Price');

            do_action('AHEE__espresso_events_Pricing_Hooks___update_tkts_delete_ticket', $tkt_to_remove);

            // finally let's delete this ticket
            // (which should not be blocked at this point b/c we've removed all our relationships)
            $tkt_to_remove->delete_permanently();
        }

        return $saved_tickets;
    }


    /**
     *
     * @access  protected
     *
     * @param \EE_Ticket     $ticket
     * @param \EE_Datetime[] $saved_datetimes
     * @param \EE_Datetime[] $added_datetimes
     * @param \EE_Datetime[] $removed_datetimes
     *
     * @return \EE_Ticket
     * @throws \EE_Error
     */
    protected function _update_ticket_datetimes(
        EE_Ticket $ticket,
        $saved_datetimes = array(),
        $added_datetimes = array(),
        $removed_datetimes = array()
    ) {

        // to start we have to add the ticket to all the datetimes its supposed to be with,
        // and removing the ticket from datetimes it got removed from.

        // first let's add datetimes
        if ( ! empty($added_datetimes) && is_array($added_datetimes)) {
            foreach ($added_datetimes as $row_id) {
                $row_id = (int)$row_id;
                if (isset($saved_datetimes[$row_id]) && $saved_datetimes[$row_id] instanceof EE_Datetime) {
                    $ticket->_add_relation_to($saved_datetimes[$row_id], 'Datetime');
                    // Is this an existing ticket (has an ID) and does it have any sold?
                    // If so, then we need to add that to the DTT sold because this DTT is getting added.
                    if ($ticket->ID() && $ticket->sold() > 0) {
                        $saved_datetimes[$row_id]->increase_sold($ticket->sold());
                        $saved_datetimes[$row_id]->save();
                    }
                }
            }
        }
        // then remove datetimes
        if ( ! empty($removed_datetimes) && is_array($removed_datetimes)) {
            foreach ($removed_datetimes as $row_id) {
                $row_id = (int)$row_id;
                // its entirely possible that a datetime got deleted (instead of just removed from relationship.
                // So make sure we skip over this if the dtt isn't in the $saved_datetimes array)
                if (isset($saved_datetimes[$row_id]) && $saved_datetimes[$row_id] instanceof EE_Datetime) {
                    $ticket->_remove_relation_to($saved_datetimes[$row_id], 'Datetime');
                    // Is this an existing ticket (has an ID) and does it have any sold?
                    // If so, then we need to remove it's sold from the DTT_sold.
                    if ($ticket->ID() && $ticket->sold() > 0) {
                        $saved_datetimes[$row_id]->decrease_sold($ticket->sold());
                        $saved_datetimes[$row_id]->save();
                    }
                }
            }
        }
        // cap ticket qty by datetime reg limits
        $ticket->set_qty(min($ticket->qty(), $ticket->qty('reg_limit')));

        return $ticket;
    }


    /**
     *
     * @access  protected
     *
     * @param \EE_Ticket $ticket
     * @param array      $price_rows
     * @param int        $ticket_price
     * @param int        $base_price
     * @param int        $base_price_id
     *
     * @return \EE_Ticket
     * @throws \EE_Error
     */
    protected function _duplicate_ticket(
        EE_Ticket $ticket,
        $price_rows = array(),
        $ticket_price = 0,
        $base_price = 0,
        $base_price_id = 0
    ) {

        // create new ticket that's a copy of the existing
        // except a new id of course (and not archived)
        // AND has the new TKT_price associated with it.
        $new_ticket = clone $ticket;
        $new_ticket->set('TKT_ID', 0);
        $new_ticket->set('TKT_deleted', 0);
        $new_ticket->set('TKT_price', $ticket_price);
        $new_ticket->set('TKT_sold', 0);
        // let's get a new ID for this ticket
        $new_ticket->save();
        // we also need to make sure this new ticket gets the same datetime attachments as the archived ticket
        $datetimes_on_existing = $ticket->get_many_related('Datetime');
        $new_ticket            = $this->_update_ticket_datetimes(
            $new_ticket,
            $datetimes_on_existing,
            array_keys($datetimes_on_existing)
        );

        // $ticket will get archived later b/c we are NOT adding it to the saved_tickets array.
        // if existing $ticket has sold amount, then we need to adjust the qty for the new TKT to = the remaining
        // available.
        if ($ticket->sold() > 0) {
            $new_qty = $ticket->qty() - $ticket->sold();
            $new_ticket->set_qty($new_qty);
        }
        //now we update the prices just for this ticket
        $new_ticket = $this->_add_prices_to_ticket($price_rows, $new_ticket, true);
        //and we update the base price
        $new_ticket = $this->_add_prices_to_ticket(array(), $new_ticket, true, $base_price, $base_price_id);

        return $new_ticket;
    }


    /**
     * This attaches a list of given prices to a ticket.
     * Note we dont' have to worry about ever removing relationships (or archiving prices) because if there is a change
     * in price information on a ticket, a new ticket is created anyways so the archived ticket will retain the old
     * price info and prices are automatically "archived" via the ticket.
     *
     * @access  private
     *
     * @param array     $prices        Array of prices from the form.
     * @param EE_Ticket $ticket        EE_Ticket object that prices are being attached to.
     * @param bool      $new_prices    Whether attach existing incoming prices or create new ones.
     * @param int|bool  $base_price    if FALSE then NOT doing a base price add.
     * @param int|bool  $base_price_id if present then this is the base_price_id being updated.
     *
     * @return EE_Ticket
     */
    protected function _add_prices_to_ticket(
        $prices = array(),
        EE_Ticket $ticket,
        $new_prices = false,
        $base_price = false,
        $base_price_id = false
    ) {

        //let's just get any current prices that may exist on the given ticket so we can remove any prices that got trashed in this session.
        $current_prices_on_ticket = $base_price !== false ? $ticket->base_price(true) : $ticket->price_modifiers();

        $updated_prices = array();

        // if $base_price ! FALSE then updating a base price.
        if ($base_price !== false) {
            $prices[1] = array(
                'PRC_ID'     => $new_prices || $base_price_id === 1 ? null : $base_price_id,
                'PRT_ID'     => 1,
                'PRC_amount' => $base_price,
                'PRC_name'   => $ticket->get('TKT_name'),
                'PRC_desc'   => $ticket->get('TKT_description')
            );
        }

        //possibly need to save tkt
        if ( ! $ticket->ID()) {
            $ticket->save();
        }

        foreach ($prices as $row => $prc) {
            $prt_id = ! empty($prc['PRT_ID']) ? $prc['PRT_ID'] : null;
            if (empty($prt_id)) {
                continue;
            } //prices MUST have a price type id.
            $PRC_values = array(
                'PRC_ID'         => ! empty($prc['PRC_ID']) ? $prc['PRC_ID'] : null,
                'PRT_ID'         => $prt_id,
                'PRC_amount'     => ! empty($prc['PRC_amount']) ? $prc['PRC_amount'] : 0,
                'PRC_name'       => ! empty($prc['PRC_name']) ? $prc['PRC_name'] : '',
                'PRC_desc'       => ! empty($prc['PRC_desc']) ? $prc['PRC_desc'] : '',
                'PRC_is_default' => false,
                //make sure we set PRC_is_default to false for all ticket saves from event_editor
                'PRC_order'      => $row
            );
            if ($new_prices || empty($PRC_values['PRC_ID'])) {
                $PRC_values['PRC_ID'] = 0;
                $PRC                  = EE_Registry::instance()->load_class('Price', array($PRC_values), false, false);
            } else {
                $PRC = EE_Registry::instance()->load_model('Price')->get_one_by_ID($prc['PRC_ID']);
                //update this price with new values
                foreach ($PRC_values as $field => $newprc) {
                    $PRC->set($field, $newprc);
                }
            }
            $PRC->save();
            $prcid                  = $PRC->ID();
            $updated_prices[$prcid] = $PRC;
            $ticket->_add_relation_to($PRC, 'Price');
        }

        //now let's remove any prices that got removed from the ticket
        if ( ! empty ($current_prices_on_ticket)) {
            $current          = array_keys($current_prices_on_ticket);
            $updated          = array_keys($updated_prices);
            $prices_to_remove = array_diff($current, $updated);
            if ( ! empty($prices_to_remove)) {
                foreach ($prices_to_remove as $prc_id) {
                    $p = $current_prices_on_ticket[$prc_id];
                    $ticket->_remove_relation_to($p, 'Price');

                    //delete permanently the price
                    $p->delete_permanently();
                }
            }
        }

        return $ticket;
    }


    public function autosave_handling($event_admin_obj)
    {
        return $event_admin_obj; //doing nothing for the moment.
        //todo when I get to this remember that I need to set the template args on the $event_admin_obj (use the set_template_args() method)

        /**
         * need to remember to handle TICKET DEFAULT saves correctly:  I've got two input fields in the dom:
         *
         * 1. TKT_is_default_selector (visible)
         * 2. TKT_is_default (hidden)
         *
         * I think we'll use the TKT_is_default for recording whether the ticket displayed IS a default ticket (on new event creations). Whereas the TKT_is_default_selector is for the user to indicate they want this ticket to be saved as a default.
         *
         * The tricky part is, on an initial display on create or edit (or after manually updating), the TKT_is_default_selector will always be unselected and the TKT_is_default will only be true if this is a create.  However, after an autosave, users will want some sort of indicator that the TKT HAS been saved as a default.. in other words we don't want to remove the check on TKT_is_default_selector. So here's what I'm thinking.
         * On Autosave:
         * 1. If TKT_is_default is true: we create a new TKT, send back the new id and add id to related elements, then set the TKT_is_default to false.
         * 2. If TKT_is_default_selector is true: we create/edit existing ticket (following conditions above as well).  We do NOT create a new default ticket.  The checkbox stays selected after autosave.
         * 3. only on MANUAL update do we check for the selection and if selected create the new default ticket.
         */
    }


    public function pricing_metabox()
    {
        $existing_datetime_ids = $existing_ticket_ids = $datetime_tickets = $ticket_datetimes = array();

        $evtobj = $this->_adminpage_obj->get_cpt_model_obj();

        //set is_creating_event property.
        $evtID                    = $evtobj->ID();
        $this->_is_creating_event = absint($evtID) != 0 ? false : true;

        //default main template args
        $main_template_args = array(
            'event_datetime_help_link' => EEH_Template::get_help_tab_link('event_editor_event_datetimes_help_tab',
                $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), false, false),
            //todo need to add a filter to the template for the help text in the Events_Admin_Page core file so we can add further help
            'existing_datetime_ids'    => '',
            'total_dtt_rows'           => 1,
            'add_new_dtt_help_link'    => EEH_Template::get_help_tab_link('add_new_dtt_info',
                $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), false, false),
            //todo need to add this help info id to the Events_Admin_Page core file so we can access it here.
            'datetime_rows'            => '',
            'show_tickets_container'   => '',
            //$this->_adminpage_obj->get_cpt_model_obj()->ID() > 1 ? ' style="display:none;"' : '',
            'ticket_rows'              => '',
            'existing_ticket_ids'      => '',
            'total_ticket_rows'        => 1,
            'ticket_js_structure'      => '',
            'ee_collapsible_status'    => ' ee-collapsible-open'
            //$this->_adminpage_obj->get_cpt_model_obj()->ID() > 0 ? ' ee-collapsible-closed' : ' ee-collapsible-open'
        );

        $timezone = $evtobj instanceof EE_Event ? $evtobj->timezone_string() : null;

        do_action('AHEE_log', __FILE__, __FUNCTION__, '');

        /**
         * 1. Start with retrieving Datetimes
         * 2. For each datetime get related tickets
         * 3. For each ticket get related prices
         */

        $DTM   = EE_Registry::instance()->load_model('Datetime', array($timezone));
        $times = $DTM->get_all_event_dates($evtID);


        $main_template_args['total_dtt_rows'] = count($times);

        /** @see https://events.codebasehq.com/projects/event-espresso/tickets/9486 for why we are counting $dttrow and then setting that on the Datetime object */
        $dttrow = 1;
        foreach ($times as $time) {
            $dttid = $time->get('DTT_ID');
            $time->set('DTT_order', $dttrow);
            $existing_datetime_ids[] = $dttid;

            //tickets attached
            $related_tickets = $time->ID() > 0 ? $time->get_many_related('Ticket', array(
                array('OR' => array('TKT_deleted' => 1, 'TKT_deleted*' => 0)),
                'default_where_conditions' => 'none',
                'order_by'                 => array('TKT_order' => 'ASC')
            )) : array();

            //if there are no related tickets this is likely a new event OR autodraft
            // event so we need to generate the default tickets because dtts
            // ALWAYS have at least one related ticket!!.  EXCEPT, we dont' do this if there is already more than one
            // datetime on the event.
            if (empty ($related_tickets) && count($times) < 2) {
                $related_tickets = EE_Registry::instance()->load_model('Ticket')->get_all_default_tickets();

                //this should be ordered by TKT_ID, so let's grab the first default ticket (which will be the main default) and ensure it has any default prices added to it (but do NOT save).
                $default_prices = EEM_Price::instance()->get_all_default_prices();

                $main_default_ticket = reset($related_tickets);
                if ($main_default_ticket instanceof EE_Ticket) {
                    foreach ($default_prices as $default_price) {
                        if ($default_price->is_base_price()) {
                            continue;
                        }
                        $main_default_ticket->cache('Price', $default_price);
                    }
                }
            }


            //we can't actually setup rows in this loop yet cause we don't know all the unique tickets for this event yet (tickets are linked through all datetimes). So we're going to temporarily cache some of that information.

            //loop through and setup the ticket rows and make sure the order is set.
            foreach ($related_tickets as $ticket) {
                $tktid  = $ticket->get('TKT_ID');
                $tktrow = $ticket->get('TKT_row');
                //we only want unique tickets in our final display!!
                if ( ! in_array($tktid, $existing_ticket_ids)) {
                    $existing_ticket_ids[] = $tktid;
                    $all_tickets[]         = $ticket;
                }

                //temporary cache of this ticket info for this datetime for later processing of datetime rows.
                $datetime_tickets[$dttid][] = $tktrow;

                //temporary cache of this datetime info for this ticket for later processing of ticket rows.
                if ( ! isset($ticket_datetimes[$tktid]) || ! in_array($dttrow, $ticket_datetimes[$tktid])) {
                    $ticket_datetimes[$tktid][] = $dttrow;
                }
            }
            $dttrow++;
        }

        $main_template_args['total_ticket_rows']     = count($existing_ticket_ids);
        $main_template_args['existing_ticket_ids']   = implode(',', $existing_ticket_ids);
        $main_template_args['existing_datetime_ids'] = implode(',', $existing_datetime_ids);

        //sort $all_tickets by order
        usort($all_tickets, function ($a, $b) {
            $a_order = (int)$a->get('TKT_order');
            $b_order = (int)$b->get('TKT_order');
            if ($a_order == $b_order) {
                return 0;
            }

            return ($a_order < $b_order) ? -1 : 1;
        });

        //k NOW we have all the data we need for setting up the dtt rows and ticket rows so we start our dtt loop again.
        $dttrow = 1;
        foreach ($times as $time) {
            $main_template_args['datetime_rows'] .= $this->_get_datetime_row($dttrow, $time, $datetime_tickets,
                $all_tickets, false, $times);
            $dttrow++;
        }

        //then loop through all tickets for the ticket rows.
        $tktrow = 1;
        foreach ($all_tickets as $ticket) {
            $main_template_args['ticket_rows'] .= $this->_get_ticket_row($tktrow, $ticket, $ticket_datetimes, $times,
                false, $all_tickets);
            $tktrow++;
        }

        $main_template_args['ticket_js_structure'] = $this->_get_ticket_js_structure($times, $all_tickets);
        $template                                  = PRICING_TEMPLATE_PATH . 'event_tickets_metabox_main.template.php';
        EEH_Template::display_template($template, $main_template_args);

        return;
    }


    protected function _get_datetime_row(
        $dttrow,
        EE_Datetime $dtt,
        $datetime_tickets,
        $all_tickets,
        $default = false,
        $all_dtts = array()
    ) {

        $dtt_display_template_args = array(
            'dtt_edit_row'             => $this->_get_dtt_edit_row($dttrow, $dtt, $default, $all_dtts),
            'dtt_attached_tickets_row' => $this->_get_dtt_attached_tickets_row($dttrow, $dtt, $datetime_tickets,
                $all_tickets, $default),
            'dtt_row'                  => $default ? 'DTTNUM' : $dttrow
        );
        $template                  = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_row_wrapper.template.php';

        return EEH_Template::display_template($template, $dtt_display_template_args, true);
    }


    /**
     * This method is used to generate a dtt fields  edit row.
     * The same row is used to generate a row with valid DTT objects and the default row that is used as the
     * skeleton by the js.
     *
     * @param int           $dttrow                         The row number for the row being generated.
     * @param               mixed                           EE_Datetime|null $dtt      If not default row being
     *                                                                       generated, this must be a EE_Datetime
     *                                                                       object.
     * @param bool          $default                        Whether a default row is being generated or not.
     * @param EE_Datetime[] $all_dtts                       This is the array of all datetimes used in the editor.
     *
     * @return string Generated edit row.
     */
    protected function _get_dtt_edit_row($dttrow, $dtt, $default, $all_dtts)
    {

        // if the incoming $dtt object is NOT an instance of EE_Datetime then force default to true.
        $default = ! $dtt instanceof EE_Datetime ? true : false;

        $template_args = array(
            'dtt_row'              => $default ? 'DTTNUM' : $dttrow,
            'event_datetimes_name' => $default ? 'DTTNAMEATTR' : 'edit_event_datetimes',
            'edit_dtt_expanded'    => '',
            //$this->_adminpage_obj->get_cpt_model_obj()->ID() > 0 ? '' : ' ee-edit-editing',
            'DTT_ID'               => $default ? '' : $dtt->ID(),
            'DTT_name'             => $default ? '' : $dtt->name(),
            'DTT_description'      => $default ? '' : $dtt->description(),
            'DTT_EVT_start'        => $default ? '' : $dtt->start_date($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']),
            'DTT_EVT_end'          => $default ? '' : $dtt->end_date($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']),
            'DTT_reg_limit'        => $default ? '' : $dtt->get_pretty('DTT_reg_limit', 'input'),
            'DTT_order'            => $default ? 'DTTNUM' : $dttrow,
            'dtt_sold'             => $default ? '0' : $dtt->get('DTT_sold'),
            'dtt_reserved'         => $default ? '0' : $dtt->reserved(),
            'clone_icon'           => ! empty($dtt) && $dtt->get('DTT_sold') > 0 ? '' : 'clone-icon ee-icon ee-icon-clone clickable',
            'trash_icon'           => ! empty($dtt) && $dtt->get('DTT_sold') > 0 ? 'ee-lock-icon' : 'trash-icon dashicons dashicons-post-trash clickable',
            'reg_list_url'         => $default || ! $dtt->event() instanceof \EE_Event
                ? ''
                : EE_Admin_Page::add_query_args_and_nonce(
                    array('event_id' => $dtt->event()->ID(), 'datetime_id' => $dtt->ID()),
                    REG_ADMIN_URL
                )
        );

        $template_args['show_trash'] = count($all_dtts) === 1 && $template_args['trash_icon'] !== 'ee-lock-icon' ? ' style="display:none"' : '';

        //allow filtering of template args at this point.
        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_dtt_edit_row__template_args',
            $template_args, $dttrow, $dtt, $default, $all_dtts, $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_edit_row.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_dtt_attached_tickets_row($dttrow, $dtt, $datetime_tickets, $all_tickets, $default)
    {

        $template_args = array(
            'dtt_row'                           => $default ? 'DTTNUM' : $dttrow,
            'event_datetimes_name'              => $default ? 'DTTNAMEATTR' : 'edit_event_datetimes',
            'DTT_description'                   => $default ? '' : $dtt->description(),
            'datetime_tickets_list'             => $default ? '<li class="hidden"></li>' : '',
            'show_tickets_row'                  => ' style="display:none;"',
            //$default || $this->_adminpage_obj->get_cpt_model_obj()->ID() > 0 ? ' style="display:none;"' : '',
            'add_new_datetime_ticket_help_link' => EEH_Template::get_help_tab_link('add_new_ticket_via_datetime',
                $this->_adminpage_obj->page_slug, $this->_adminpage_obj->get_req_action(), false, false),
            //todo need to add this help info id to the Events_Admin_Page core file so we can access it here.
            'DTT_ID'                            => $default ? '' : $dtt->ID()
        );

        //need to setup the list items (but only if this isnt' a default skeleton setup)
        if ( ! $default) {
            $tktrow = 1;
            foreach ($all_tickets as $ticket) {
                $template_args['datetime_tickets_list'] .= $this->_get_datetime_tickets_list_item($dttrow, $tktrow,
                    $dtt, $ticket, $datetime_tickets, $default);
                $tktrow++;
            }
        }

        //filter template args at this point
        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_dtt_attached_ticket_row__template_args',
            $template_args, $dttrow, $dtt, $datetime_tickets, $all_tickets, $default, $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_attached_tickets_row.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_datetime_tickets_list_item($dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default)
    {
        $tktid    = ! empty($ticket) ? $ticket->ID() : 0;
        $dtt_tkts = $dtt instanceof EE_Datetime && isset($datetime_tickets[$dtt->ID()]) ? $datetime_tickets[$dtt->ID()] : array();

        $displayrow    = ! empty($ticket) ? $ticket->get('TKT_row') : 0;
        $template_args = array(
            'dtt_row'                 => $default ? 'DTTNUM' : $dttrow,
            'tkt_row'                 => $default && empty($ticket) ? 'TICKETNUM' : $tktrow,
            'datetime_ticket_checked' => in_array($displayrow, $dtt_tkts) ? ' checked="checked"' : '',
            'ticket_selected'         => in_array($displayrow, $dtt_tkts) ? ' ticket-selected' : '',
            'TKT_name'                => $default && empty($ticket) ? 'TKTNAME' : $ticket->get('TKT_name'),
            'tkt_status_class'        => ($default && empty($ticket)) || $this->_is_creating_event ? ' tkt-status-' . EE_Ticket::onsale : ' tkt-status-' . $ticket->ticket_status(),
        );

        //filter template args
        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_datetime_tickets_list_item__template_args',
            $template_args, $dttrow, $tktrow, $dtt, $ticket, $datetime_tickets, $default, $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_dtt_tickets_list.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    /**
     * This generates the ticket row for tickets.
     * This same method is used to generate both the actual rows and the js skeleton row (when default ==
     * true)
     *
     * @param int           $tktrow                          Represents the row number being generated.
     * @param               mixed                            null|EE_Ticket $ticket           If default then this will
     *                                                                      be null.
     * @param EE_Datetime[] $ticket_datetimes                Either an array of all datetimes on all tickets indexed by
     *                                                       each ticket or empty for  default
     * @param EE_Datetime[] $all_dtts                        All Datetimes on the event or empty for default.
     * @param bool          $default                         Whether default row being generated or not.
     * @param EE_Ticket[]   $all_tickets                     This is an array of all tickets attached to the event (or
     *                                                       empty in the case of defaults)
     *
     * @return [type] [description]
     */
    protected function _get_ticket_row(
        $tktrow,
        $ticket,
        $ticket_datetimes,
        $all_dtts,
        $default = false,
        $all_tickets = array()
    ) {

        //if $ticket is not an instance of EE_Ticket then force default to true.
        $default = ! $ticket instanceof EE_Ticket ? true : false;

        $prices = ! empty($ticket) && ! $default ? $ticket->get_many_related('Price',
            array('default_where_conditions' => 'none', 'order_by' => array('PRC_order' => 'ASC'))) : array();

        //if there is only one price (which would be the base price) or NO prices and this ticket is a default ticket, let's just make sure there are no cached default prices on
        //the object.  This is done by not including any query_params.
        if ($ticket instanceof EE_Ticket && $ticket->is_default() && (count($prices) === 1 || empty($prices))) {
            $prices = $ticket->get_many_related('Price');
        }

        // check if we're dealing with a default ticket in which case we don't want any starting_ticket_datetime_row values set (otherwise there won't be any new relationships created for tickets based off of the default ticket).  This will future proof in case there is ever any behaviour change between what the primary_key defaults to.
        $default_dtt = $default || ($ticket instanceof EE_Ticket && $ticket->get('TKT_is_default')) ? true : false;

        $tkt_dtts = $ticket instanceof EE_Ticket && isset($ticket_datetimes[$ticket->ID()]) ? $ticket_datetimes[$ticket->ID()] : array();

        $ticket_subtotal  = $default ? 0 : $ticket->get_ticket_subtotal();
        $base_price       = $default ? null : $ticket->base_price();
        $count_price_mods = EEM_Price::instance()->get_all_default_prices(true);

        //breaking out complicated condition for ticket_status
        if ($default) {
            $ticket_status_class = ' tkt-status-' . EE_Ticket::onsale;
        } else {
            $ticket_status_class = $ticket->is_default() ? ' tkt-status-' . EE_Ticket::onsale : ' tkt-status-' . $ticket->ticket_status();
        }

        //breaking out complicated condition for TKT_taxable
        if ($default) {
            $TKT_taxable = '';
        } else {
            $TKT_taxable = $ticket->get('TKT_taxable') ? ' checked="checked"' : '';
        }


        $template_args = array(
            'tkt_row'                       => $default ? 'TICKETNUM' : $tktrow,
            'TKT_order'                     => $default ? 'TICKETNUM' : $tktrow,
            //on initial page load this will always be the correct order.
            'tkt_status_class'              => $ticket_status_class,
            'display_edit_tkt_row'          => ' style="display:none;"',
            'edit_tkt_expanded'             => '',
            'edit_tickets_name'             => $default ? 'TICKETNAMEATTR' : 'edit_tickets',
            'TKT_name'                      => $default ? '' : $ticket->get('TKT_name'),
            'TKT_start_date'                => $default ? '' : $ticket->get_date('TKT_start_date',
                $this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']),
            'TKT_end_date'                  => $default ? '' : $ticket->get_date('TKT_end_date',
                $this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']),
            'TKT_status'                    => $default ? EEH_Template::pretty_status(EE_Ticket::onsale, false,
                'sentence') : $ticket->is_default() ? EEH_Template::pretty_status(EE_Ticket::onsale, false,
                'sentence') : $ticket->ticket_status(true),
            'TKT_price'                     => $default ? '' : EEH_Template::format_currency($ticket->get_ticket_total_with_taxes(),
                false, false),
            'TKT_price_code'                => EE_Registry::instance()->CFG->currency->code,
            'TKT_price_amount'              => $default ? 0 : $ticket_subtotal,
            'TKT_qty'                       => $default ? '' : $ticket->get_pretty('TKT_qty', 'symbol'),
            'TKT_qty_for_input'             => $default ? '' : $ticket->get_pretty('TKT_qty', 'input'),
            'TKT_uses'                      => $default ? '' : $ticket->get_pretty('TKT_uses', 'input'),
            'TKT_min'                       => $default ? '' : ($ticket->get('TKT_min') === -1 || $ticket->get('TKT_min') === 0 ? '' : $ticket->get('TKT_min')),
            'TKT_max'                       => $default ? '' : $ticket->get_pretty('TKT_max', 'input'),
            'TKT_sold'                      => $default ? 0 : $ticket->tickets_sold('ticket'),
            'TKT_reserved'                      => $default ? 0 : $ticket->reserved(),
            'TKT_registrations'             => $default ? 0 : $ticket->count_registrations(array(
                array(
                    'STS_ID' => array(
                        '!=',
                        EEM_Registration::status_id_incomplete
                    )
                )
            )),
            'TKT_ID'                        => $default ? 0 : $ticket->get('TKT_ID'),
            'TKT_description'               => $default ? '' : $ticket->get('TKT_description'),
            'TKT_is_default'                => $default ? 0 : $ticket->get('TKT_is_default'),
            'TKT_required'                  => $default ? 0 : $ticket->required(),
            'TKT_is_default_selector'       => '',
            'ticket_price_rows'             => '',
            'TKT_base_price'                => $default || ! $base_price instanceof EE_Price ? '' : $base_price->get_pretty('PRC_amount',
                'localized_float'),
            'TKT_base_price_ID'             => $default || ! $base_price instanceof EE_Price ? 0 : $base_price->ID(),
            'show_price_modifier'           => count($prices) > 1 || ($default && $count_price_mods > 0) ? '' : ' style="display:none;"',
            'show_price_mod_button'         => count($prices) > 1 || ($default && $count_price_mods > 0) || ( ! $default && $ticket->get('TKT_deleted')) ? ' style="display:none;"' : '',
            'total_price_rows'              => count($prices) > 1 ? count($prices) : 1,
            'ticket_datetimes_list'         => $default ? '<li class="hidden"></li>' : '',
            'starting_ticket_datetime_rows' => $default || $default_dtt ? '' : implode(',', $tkt_dtts),
            'ticket_datetime_rows'          => $default ? '' : implode(',', $tkt_dtts),
            'existing_ticket_price_ids'     => $default ? '' : implode(',', array_keys($prices)),
            'ticket_template_id'            => $default ? 0 : $ticket->get('TTM_ID'),
            'TKT_taxable'                   => $TKT_taxable,
            'display_subtotal'              => $ticket instanceof EE_Ticket && $ticket->get('TKT_taxable') ? '' : ' style="display:none"',
            'price_currency_symbol'         => EE_Registry::instance()->CFG->currency->sign,
            'TKT_subtotal_amount_display'   => EEH_Template::format_currency($ticket_subtotal, false, false),
            'TKT_subtotal_amount'           => $ticket_subtotal,
            'tax_rows'                      => $this->_get_tax_rows($tktrow, $ticket),
            'disabled'                      => $ticket instanceof EE_Ticket && $ticket->get('TKT_deleted') ? true : false,
            'ticket_archive_class'          => $ticket instanceof EE_Ticket && $ticket->get('TKT_deleted') ? ' ticket-archived' : '',
            'trash_icon'                    => $ticket instanceof EE_Ticket && $ticket->get('TKT_deleted') ? 'ee-lock-icon ' : 'trash-icon dashicons dashicons-post-trash clickable',
            'clone_icon'                    => $ticket instanceof EE_Ticket && $ticket->get('TKT_deleted') ? '' : 'clone-icon ee-icon ee-icon-clone clickable'
        );

        $template_args['trash_hidden'] = count($all_tickets) === 1 && $template_args['trash_icon'] != 'ee-lock-icon' ? ' style="display:none"' : '';

        //handle rows that should NOT be empty
        if (empty($template_args['TKT_start_date'])) {
            //if empty then the start date will be now.
            $template_args['TKT_start_date']   = date($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time'],
                current_time('timestamp'));
            $template_args['tkt_status_class'] = ' tkt-status-' . EE_Ticket::onsale;
        }

        if (empty($template_args['TKT_end_date'])) {

            //get the earliest datetime (if present);
            $earliest_dtt = $this->_adminpage_obj->get_cpt_model_obj()->ID() > 0 ? $this->_adminpage_obj->get_cpt_model_obj()->get_first_related('Datetime',
                array('order_by' => array('DTT_EVT_start' => 'ASC'))) : null;

            if ( ! empty($earliest_dtt)) {
                $template_args['TKT_end_date'] = $earliest_dtt->get_datetime('DTT_EVT_start',
                    $this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time']);
            } else {
                //default so let's just use what's been set for the default date-time which is 30 days from now.
                $template_args['TKT_end_date'] = date($this->_date_format_strings['date'] . ' ' . $this->_date_format_strings['time'],
                    mktime(24, 0, 0, date("m"), date("d") + 29, date("Y")));
            }
            $template_args['tkt_status_class'] = ' tkt-status-' . EE_Ticket::onsale;
        }

        //generate ticket_datetime items
        if ( ! $default) {
            $dttrow = 1;
            foreach ($all_dtts as $dtt) {
                $template_args['ticket_datetimes_list'] .= $this->_get_ticket_datetime_list_item($dttrow, $tktrow, $dtt,
                    $ticket, $ticket_datetimes, $default);
                $dttrow++;
            }
        }

        $prcrow = 1;
        foreach ($prices as $price) {
            if ($price->is_base_price()) {
                $prcrow++;
                continue;
            }
            $show_trash  = (count($prices) > 1 && $prcrow === 1) || count($prices) === 1 ? false : true;
            $show_create = count($prices) > 1 && count($prices) !== $prcrow ? false : true;
            $template_args['ticket_price_rows'] .= $this->_get_ticket_price_row($tktrow, $prcrow, $price, $default,
                $ticket, $show_trash, $show_create);
            $prcrow++;
        }

        //filter $template_args
        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_ticket_row__template_args',
            $template_args, $tktrow, $ticket, $ticket_datetimes, $all_dtts, $default, $all_tickets,
            $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_row.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_tax_rows($tktrow, $ticket)
    {
        $tax_rows      = '';
        $template      = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_tax_row.template.php';
        $template_args = array();
        $taxes         = empty($ticket) ? EE_Taxes::get_taxes_for_admin() : $ticket->get_ticket_taxes_for_admin();
        foreach ($taxes as $tax) {
            $tax_added     = $this->_get_tax_added($tax, $ticket);
            $template_args = array(
                'display_tax'       => ! empty($ticket) && $ticket->get('TKT_taxable') ? '' : ' style="display:none;"',
                'tax_id'            => $tax->ID(),
                'tkt_row'           => $tktrow,
                'tax_label'         => $tax->get('PRC_name'),
                'tax_added'         => $tax_added,
                'tax_added_display' => EEH_Template::format_currency($tax_added, false, false),
                'tax_amount'        => $tax->get('PRC_amount')
            );
            $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_tax_rows__template_args',
                $template_args, $tktrow, $ticket, $this->_is_creating_event);
            $tax_rows .= EEH_Template::display_template($template, $template_args, true);
        }


        return $tax_rows;
    }


    protected function _get_tax_added(EE_Price $tax, $ticket)
    {
        $subtotal = empty($ticket) ? 0 : $ticket->get_ticket_subtotal();

        return $subtotal * $tax->get('PRC_amount') / 100;
    }


    protected function _get_ticket_price_row(
        $tktrow,
        $prcrow,
        $price,
        $default,
        $ticket,
        $show_trash = true,
        $show_create = true
    ) {
        $send_disabled = ! empty($ticket) && $ticket->get('TKT_deleted') ? true : false;
        $template_args = array(
            'tkt_row'               => $default && empty($ticket) ? 'TICKETNUM' : $tktrow,
            'PRC_order'             => $default && empty($price) ? 'PRICENUM' : $prcrow,
            'edit_prices_name'      => $default && empty($price) ? 'PRICENAMEATTR' : 'edit_prices',
            'price_type_selector'   => $default && empty($price) ? $this->_get_base_price_template($tktrow, $prcrow,
                $price, $default) : $this->_get_price_type_selector($tktrow, $prcrow, $price, $default, $send_disabled),
            'PRC_ID'                => $default && empty($price) ? 0 : $price->ID(),
            'PRC_is_default'        => $default && empty($price) ? 0 : $price->get('PRC_is_default'),
            'PRC_name'              => $default && empty($price) ? '' : $price->get('PRC_name'),
            'price_currency_symbol' => EE_Registry::instance()->CFG->currency->sign,
            'show_plus_or_minus'    => $default && empty($price) ? '' : ' style="display:none;"',
            'show_plus'             => $default && empty($price) ? ' style="display:none;"' : ($price->is_discount() || $price->is_base_price() ? ' style="display:none;"' : ''),
            'show_minus'            => $default && empty($price) ? ' style="display:none;"' : ($price->is_discount() ? '' : ' style="display:none;"'),
            'show_currency_symbol'  => $default && empty($price) ? ' style="display:none"' : ($price->is_percent() ? ' style="display:none"' : ''),
            'PRC_amount'            => $default && empty($price) ? 0 : $price->get_pretty('PRC_amount',
                'localized_float'),
            'show_percentage'       => $default && empty($price) ? ' style="display:none;"' : ($price->is_percent() ? '' : ' style="display:none;"'),
            'show_trash_icon'       => $show_trash ? '' : ' style="display:none;"',
            'show_create_button'    => $show_create ? '' : ' style="display:none;"',
            'PRC_desc'              => $default && empty($price) ? '' : $price->get('PRC_desc'),
            'disabled'              => ! empty($ticket) && $ticket->get('TKT_deleted') ? true : false
        );

        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_ticket_price_row__template_args',
            $template_args, $tktrow, $prcrow, $price, $default, $ticket, $show_trash, $show_create,
            $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_price_row.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_price_type_selector($tktrow, $prcrow, $price, $default, $disabled = false)
    {
        if ($price->is_base_price()) {
            return $this->_get_base_price_template($tktrow, $prcrow, $price, $default);
        } else {
            return $this->_get_price_modifier_template($tktrow, $prcrow, $price, $default, $disabled);
        }

    }


    protected function _get_base_price_template($tktrow, $prcrow, $price, $default)
    {
        $template_args = array(
            'tkt_row'                   => $default ? 'TICKETNUM' : $tktrow,
            'PRC_order'                 => $default && empty($price) ? 'PRICENUM' : $prcrow,
            'PRT_ID'                    => $default && empty($price) ? 1 : $price->get('PRT_ID'),
            'PRT_name'                  => __('Price', 'event_espresso'),
            'price_selected_operator'   => '+',
            'price_selected_is_percent' => 0
        );
        $template      = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_type_base.template.php';

        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_base_price_template__template_args',
            $template_args, $tktrow, $prcrow, $price, $default, $this->_is_creating_event);

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_price_modifier_template($tktrow, $prcrow, $price, $default, $disabled = false)
    {
        $select_name                = $default && empty($price) ? 'edit_prices[TICKETNUM][PRICENUM][PRT_ID]' : 'edit_prices[' . $tktrow . '][' . $prcrow . '][PRT_ID]';
        $price_types                = EE_Registry::instance()->load_model('Price_Type')->get_all(array(
            array(
                'OR' => array(
                    'PBT_ID'  => '2',
                    'PBT_ID*' => '3'
                )
            )
        ));
        $price_option_span_template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_option_span.template.php';
        $all_price_types            = $default && empty($price) ? array(
            array(
                'id'   => 0,
                'text' => __('Select Modifier', 'event_espresso')
            )
        ) : array();
        $selected_price_type_id     = $default && empty($price) ? 0 : $price->type();
        $price_option_spans         = '';
        //setup pricetypes for selector
        foreach ($price_types as $price_type) {
            $all_price_types[] = array(
                'id'   => $price_type->ID(),
                'text' => $price_type->get('PRT_name'),
            );

            //while we're in the loop let's setup the option spans used by js
            $spanargs = array(
                'PRT_ID'         => $price_type->ID(),
                'PRT_operator'   => $price_type->is_discount() ? '-' : '+',
                'PRT_is_percent' => $price_type->get('PRT_is_percent') ? 1 : 0
            );
            $price_option_spans .= EEH_Template::display_template($price_option_span_template, $spanargs, true);
        }

        $select_params = $disabled ? 'style="width:auto;" disabled' : 'style="width:auto;"';
        $main_name     = $select_name;
        $select_name   = $disabled ? 'archive_price[' . $tktrow . '][' . $prcrow . '][PRT_ID]' : $main_name;

        $template_args = array(
            'tkt_row'                   => $default ? 'TICKETNUM' : $tktrow,
            'PRC_order'                 => $default && empty($price) ? 'PRICENUM' : $prcrow,
            'price_modifier_selector'   => EEH_Form_Fields::select_input($select_name, $all_price_types,
                $selected_price_type_id, $select_params, 'edit-price-PRT_ID'),
            'main_name'                 => $main_name,
            'selected_price_type_id'    => $selected_price_type_id,
            'price_option_spans'        => $price_option_spans,
            'price_selected_operator'   => $default && empty($price) ? '' : ($price->is_discount() ? '-' : '+'),
            'price_selected_is_percent' => $default && empty($price) ? '' : ($price->is_percent() ? 1 : 0),
            'disabled'                  => $disabled
        );

        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_price_modifier_template__template_args',
            $template_args, $tktrow, $prcrow, $price, $default, $disabled, $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_price_modifier_selector.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_ticket_datetime_list_item($dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default)
    {
        $tkt_dtts      = $ticket instanceof EE_Ticket && isset($ticket_datetimes[$ticket->ID()]) ? $ticket_datetimes[$ticket->ID()] : array();
        $template_args = array(
            'dtt_row'                  => $default && ! $dtt instanceof EE_Datetime ? 'DTTNUM' : $dttrow,
            'tkt_row'                  => $default ? 'TICKETNUM' : $tktrow,
            'ticket_datetime_selected' => in_array($dttrow, $tkt_dtts) ? ' ticket-selected' : '',
            'ticket_datetime_checked'  => in_array($dttrow, $tkt_dtts) ? ' checked="checked"' : '',
            'DTT_name'                 => $default && empty($dtt) ? 'DTTNAME' : $dtt->get_dtt_display_name(true),
            'tkt_status_class'         => '',
        );

        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_ticket_datetime_list_item__template_args',
            $template_args, $dttrow, $tktrow, $dtt, $ticket, $ticket_datetimes, $default, $this->_is_creating_event);
        $template      = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_datetimes_list_item.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


    protected function _get_ticket_js_structure($all_dtts, $all_tickets)
    {
        $template_args = array(
            'default_datetime_edit_row'                => $this->_get_dtt_edit_row('DTTNUM', null, true, $all_dtts),
            'default_ticket_row'                       => $this->_get_ticket_row('TICKETNUM', null, array(), array(),
                true),
            'default_price_row'                        => $this->_get_ticket_price_row('TICKETNUM', 'PRICENUM', null,
                true, null),
            'default_price_rows'                       => '',
            'default_base_price_amount'                => 0,
            'default_base_price_name'                  => '',
            'default_base_price_description'           => '',
            'default_price_modifier_selector_row'      => $this->_get_price_modifier_template('TICKETNUM', 'PRICENUM',
                null, true),
            'default_available_tickets_for_datetime'   => $this->_get_dtt_attached_tickets_row('DTTNUM', null, array(),
                array(), true),
            'existing_available_datetime_tickets_list' => '',
            'existing_available_ticket_datetimes_list' => '',
            'new_available_datetime_ticket_list_item'  => $this->_get_datetime_tickets_list_item('DTTNUM', 'TICKETNUM',
                null, null, array(), true),
            'new_available_ticket_datetime_list_item'  => $this->_get_ticket_datetime_list_item('DTTNUM', 'TICKETNUM',
                null, null, array(), true)
        );

        $tktrow = 1;
        foreach ($all_tickets as $ticket) {
            $template_args['existing_available_datetime_tickets_list'] .= $this->_get_datetime_tickets_list_item('DTTNUM',
                $tktrow, null, $ticket, array(), true);
            $tktrow++;
        }


        $dttrow = 1;
        foreach ($all_dtts as $dtt) {
            $template_args['existing_available_ticket_datetimes_list'] .= $this->_get_ticket_datetime_list_item($dttrow,
                'TICKETNUM', $dtt, null, array(), true);
            $dttrow++;
        }

        $default_prices = EE_Registry::instance()->load_model('Price')->get_all_default_prices();
        $prcrow         = 1;
        foreach ($default_prices as $price) {
            if ($price->is_base_price()) {
                $template_args['default_base_price_amount']      = $price->get_pretty('PRC_amount', 'localized_float');
                $template_args['default_base_price_name']        = $price->get('PRC_name');
                $template_args['default_base_price_description'] = $price->get('PRC_desc');
                $prcrow++;
                continue;
            }
            $show_trash  = (count($default_prices) > 1 && $prcrow === 1) || count($default_prices) === 1 ? false : true;
            $show_create = count($default_prices) > 1 && count($default_prices) !== $prcrow ? false : true;
            $template_args['default_price_rows'] .= $this->_get_ticket_price_row('TICKETNUM', $prcrow, $price, true,
                null, $show_trash, $show_create);
            $prcrow++;
        }

        $template_args = apply_filters('FHEE__espresso_events_Pricing_Hooks___get_ticket_js_structure__template_args',
            $template_args, $all_dtts, $all_tickets, $this->_is_creating_event);

        $template = PRICING_TEMPLATE_PATH . 'event_tickets_datetime_ticket_js_structure.template.php';

        return EEH_Template::display_template($template, $template_args, true);
    }


} //end class espresso_events_Pricing_Hooks
