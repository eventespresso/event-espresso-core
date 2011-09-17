<?php

//This is a template file for displaying a list of events on a page. These functions are used with the [ESPRESSO_EVENTS] shortcode.
//This is an group of functions for querying all of the events in your databse.
//This file should be stored in your "/wp-content/uploads/espresso/templates/" directory.
//Note: All of these functions can be overridden using the "Custom Files" addon. The custom files addon also contains sample code to display ongoing events

if (!function_exists('display_all_events')) {

    function display_all_events() {
        global $org_options;

        //If set to true, the event page will display recurring events.
        $display_recurrence_event = true; //If set to true, the event page will display recurring events.

        $sql = "SELECT e.*, ese.start_time, ese.end_time, p.event_cost ";
        isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
        $sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
        isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
        $sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
        $sql .= " LEFT JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
        $sql .= " WHERE is_active = 'Y' ";
        $sql .= $display_recurrence_event == false ? " AND e.recurrence_id = '0' " : '';
        $sql .= " AND e.event_status != 'D' ";
        $sql .= " GROUP BY e.id  ORDER BY date(start_date), id";
        event_espresso_get_event_details($sql); //This function is located below
    }

}

if (!function_exists('display_event_espresso_categories')) {

    function display_event_espresso_categories($event_category_id="null", $css_class=NULL) {
        global $wpdb;
        if ($event_category_id != "null") {

            $display_recurrence_event = true; //If set to true, the event page will display recurring events.

            $sql = "SELECT e.*, c.category_name, c.category_desc, c.display_desc, c.category_identifier, ese.start_time, ese.end_time, p.event_cost  ";
            isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
            $sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
            $sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
            $sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
            $sql .= " JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id= e.id ";
            $sql .= " JOIN " . EVENTS_PRICES_TABLE . " p ON p.event_id=e.id ";
            isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
            $sql .= " WHERE c.category_identifier = '" . $event_category_id . "' ";
            $sql .= $display_recurrence_event == false ? " AND e.recurrence_id = '0' " : '';
            $sql .= " AND e.event_status != 'D' ";
            $sql .= " GROUP BY e.id  ORDER BY date(start_date), id ASC";
            event_espresso_get_event_details($sql, $css_class); //This function is located below
        }
    }

}

//Events Listing - Shows the events on your page.
if (!function_exists('event_espresso_get_event_details')) {

    function event_espresso_get_event_details($sql, $css_class=NULL, $allow_override=0) {
        //echo $sql;
        global $wpdb, $org_options, $events_in_session;
        $multi_reg = false;
        if (function_exists('event_espresso_multi_reg_init')) {
            $multi_reg = true;
        }
        //echo 'This page is located in ' . get_option( 'upload_path' );
        $event_page_id = $org_options['event_page_id'];
        $currency_symbol = isset($org_options['currency_symbol']) ? $org_options['currency_symbol'] : '';
        $events = $wpdb->get_results($sql);
        $category_id = isset($wpdb->last_result[0]->id) ? $wpdb->last_result[0]->id : '';
        $category_name = isset($wpdb->last_result[0]->category_name) ? $wpdb->last_result[0]->category_name : '';
        $category_identifier = isset($wpdb->last_result[0]->category_identifier) ? $wpdb->last_result[0]->category_identifier : '';
        $category_desc = isset($wpdb->last_result[0]->category_desc) ? html_entity_decode(wpautop($wpdb->last_result[0]->category_desc)) : '';
        $display_desc = isset($wpdb->last_result[0]->display_desc) ? $wpdb->last_result[0]->display_desc : '';

        if ($display_desc == 'Y') {
            echo '<p id="events_category_name-' . $category_id . '" class="events_category_name">' . stripslashes_deep($category_name) . '</p>';
            echo espresso_format_content($category_desc);
        }

        //Debug
        //var_dump($events);

        foreach ($events as $event) {
            $event_id = $event->id;
            $event_name = $event->event_name;
            $event_desc = stripslashes_deep($event->event_desc);
            $event_identifier = $event->event_identifier;
            $active = $event->is_active;
            $registration_start = $event->registration_start;
            $registration_end = $event->registration_end;
            $start_date = $event->start_date;
            $end_date = $event->end_date;
            $reg_limit = $event->reg_limit;
            $event_address = $event->address;
            $event_address2 = $event->address2;
            $event_city = $event->city;
            $event_state = $event->state;
            $event_zip = $event->zip;
            $event_country = $event->country;
            $member_only = $event->member_only;
            $externalURL = $event->externalURL;
            $recurrence_id = $event->recurrence_id;
            $display_reg_form = $event->display_reg_form;
            $allow_overflow = $event->allow_overflow;
            $overflow_event_id = $event->overflow_event_id;
            $event_desc = array_shift(explode('<!--more-->', $event_desc));
            global $event_meta;
            $event_meta = unserialize($event->event_meta);
            $event_meta['is_active'] = $event->is_active;
            $event_meta['event_status'] = $event->event_status;
            $event_meta['start_time'] = empty($event->start_time) ? '' : $event->start_time;
            $event_meta['start_date'] = $event->start_date;
            $event_meta['registration_start'] = $event->registration_start;
            $event_meta['registration_startT'] = $event->registration_startT;
            $event_meta['registration_end'] = $event->registration_end;
            $event_meta['registration_endT'] = $event->registration_endT;

            //Venue information
            if ($org_options['use_venue_manager'] == 'Y') {
                $event_address = $event->venue_address;
                $event_address2 = $event->venue_address2;
                $event_city = $event->venue_city;
                $event_state = $event->venue_state;
                $event_zip = $event->venue_zip;
                $event_country = $event->venue_country;

                //Leaving these variables intact, just in case people want to use them
                $venue_title = $event->venue_name;
                $venue_address = $event->venue_address;
                $venue_address2 = $event->venue_address2;
                $venue_city = $event->venue_city;
                $venue_state = $event->venue_state;
                $venue_zip = $event->venue_zip;
                $venue_country = $event->venue_country;
                global $venue_meta;
                $add_venue_meta = array(
                    'venue_title' => $event->venue_name,
                    'venue_address' => $event->event_address,
                    'venue_address2' => $event->venue_address2,
                    'venue_city' => $event->venue_city,
                    'venue_state' => $event->venue_state,
                    'venue_country' => $event->venue_country,
                );
                $venue_meta = (isset($event->venue_meta) && $event->venue_meta != '') && (isset($add_venue_meta) && $add_venue_meta != '') ? array_merge(unserialize($event->venue_meta), $add_venue_meta) : '';
                //print_r($venue_meta);
            }

            //Address formatting
            $location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');

            //Google map link creation
            $google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country, 'text' => 'Map and Directions', 'type' => 'text'));
            global $all_meta;
            $all_meta = array(
                'event_name' => stripslashes_deep($event_name),
                'event_desc' => stripslashes_deep($event_desc),
                'event_address' => $event_address,
                'event_address2' => $event_address2,
                'event_city' => $event_city,
                'event_state' => $event_state,
                'event_zip' => $event_zip,
                'is_active' => $event->is_active,
                'event_status' => $event->event_status,
                'start_time' => empty($event->start_time) ? '' : $event->start_time,
                'registration_startT' => $event->registration_startT,
                'registration_start' => $registration_start,
                'registration_endT' => $event->registration_endT,
                'registration_end' => $registration_end,
                'is_active' => empty($is_active) ? '' : $is_active,
                'event_country' => $event_country,
                'start_date' => event_date_display($start_date, get_option('date_format')),
                'end_date' => event_date_display($end_date, get_option('date_format')),
                'time' => empty($event->start_time) ? '' : $event->start_time,
                'google_map_link' => $google_map_link,
                'price' => empty($event->event_cost) ? '' : $event->event_cost,
                'event_cost' => empty($event->event_cost) ? '' : $event->event_cost,
            );
            //Debug
            //echo '<p>'.print_r($all_meta).'</p>';
            //These variables can be used with other the espresso_countdown, espresso_countup, and espresso_duration functions and/or any javascript based functions.
			//Warning: May cause additional database queries an should only be used for sites with a small amount of events.
			// $start_timestamp = espresso_event_time($event_id, 'start_timestamp');
			//$end_timestamp = espresso_event_time($event_id, 'end_timestamp');

            //This can be used in place of the registration link if you are usign the external URL feature
            $registration_url = $externalURL != '' ? $externalURL : espresso_reg_url($event_id);
            if (!is_user_logged_in() && get_option('events_members_active') == 'true' && $member_only == 'Y') {
                //Display a message if the user is not logged in.
                //_e('Member Only Event. Please ','event_espresso') . event_espresso_user_login_link() . '.';
            } else {
                //Serve up the event list
                //As of version 3.0.17 the event list details have been moved to event_list_display.php

                if ($allow_override == 1) {
                    //Uncomment to show active status array
                    //print_r( event_espresso_get_is_active($event_id));
                    include('event_list_display.php');
                } else {
                    switch (event_espresso_get_status($event_id)) {
                        case 'NOT_ACTIVE':
                            //Don't show the event
                            //Uncomment the following two lines to show events that are not active and the active status array
                            //print_r( event_espresso_get_is_active($event_id));
                            //include('event_list_display.php');
                            break;

                        case 'PENDING':
                            if (current_user_can('administrator') || function_exists('espresso_member_data') && espresso_can_view_event($event_id) == true) {
                                //Uncomment to show active status array
                                //print_r( event_espresso_get_is_active($event_id));

                                echo '<div class="pending_event">';
                                include('event_list_display.php');
                                echo '</div>';
                            }
                            break;

                        default:

                            //Uncomment to show active status array
                            //print_r( event_espresso_get_is_active($event_id));

                            include('event_list_display.php');
                            break;
                    }
                }
            }
        }
        //Check to see how many database queries were performed
        //echo '<p>Database Queries: ' . get_num_queries() .'</p>';
        espresso_registration_footer();
    }

}