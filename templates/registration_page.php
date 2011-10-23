<?php
//As of version 3.0.17
//This is a logic file for displaying a registration form for an event on a page. This file will do all of the backend data retrieval functions.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
//Note: This entire function can be overridden using the "Custom Files" addon
if (!function_exists('register_attendees')) {

    function register_attendees($single_event_id = NULL, $event_id_sc =0) {
        if ((isset($_REQUEST['form_action']) && $_REQUEST['form_action'] == 'edit_attendee') || (isset($_REQUEST['edit_attendee']) && $_REQUEST['edit_attendee'] == 'true')) {
            require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
            attendee_edit_record();
            return;
        }
        global $wpdb, $org_options;

        if (isset($_REQUEST['ee']) && $_REQUEST['ee'] != '') {
            $_REQUEST['event_id'] = $_REQUEST['ee'];
        }

        $event_id = $event_id_sc != '0' ? $event_id_sc : ($_REQUEST['event_id']);

        if (!empty($_REQUEST['event_id_time'])) {
            $pieces = explode('|', $_REQUEST['event_id_time'], 3);
            $event_id = $pieces[0];
            $start_time = $pieces[1];
            $time_id = $pieces[2];
            $time_selected = true;
        }

        //The following variables are used to get information about your organization
        $event_page_id = $org_options['event_page_id'];
        $Organization = stripslashes_deep($org_options['organization']);
        $Organization_street1 = $org_options['organization_street1'];
        $Organization_street2 = $org_options['organization_street2'];
        $Organization_city = $org_options['organization_city'];
        $Organization_state = $org_options['organization_state'];
        $Organization_zip = $org_options['organization_zip'];
        $contact = $org_options['contact_email'];
        $registrar = $org_options['contact_email'];
        $currency_format = isset($org_options['currency_format']) ? $org_options['currency_format'] : '';

        $message = $org_options['message'];
        global $ee_gmaps_opts;
					   // EE gmaps needs it's own org_options array populated on a per page basis to enable common queries in gmaps api function
								$ee_gmaps_opts = array(
								'ee_map_width' => empty($org_options['ee_map_width_single']) ? '' : $org_options['ee_map_width_single'],
								'ee_map_height' => empty($org_options['ee_map_height_single']) ? '' : $org_options['ee_map_height_single'],
								'ee_map_zoom' => empty($org_options['ee_map_zoom_single']) ? '' : $org_options['ee_map_zoom_single'],
								'ee_map_nav_display' => empty($org_options['ee_map_nav_display_single']) ? '' : $org_options['ee_map_nav_display_single'],
								'ee_map_nav_size' => empty($org_options['ee_map_nav_size_single']) ? '' : $org_options['ee_map_nav_size_single'],
								'ee_map_type_control' => empty($org_options['ee_map_type_control_single']) ? '' : $org_options['ee_map_type_control_single'],
								'ee_map_align' => empty($org_options['ee_map_align_single']) ? '' : $org_options['ee_map_align_single']
								);
					   //var_dump($ee_gmaps_opts);

        //Build event queries
        $sql = "SELECT e.*, ese.start_time, ese.end_time ";
        isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= ", v.name venue_name, v.address venue_address, v.address2 venue_address2, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
        $sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";

        isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] == 'Y' ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
		$sql.= " WHERE e.is_active='Y' ";
		$sql.= " AND e.event_status != 'D' ";

		if ($single_event_id != NULL) {//Get the ID of a single event
			//If a single event needs to be displayed, get its ID
            $sql .= " AND event_identifier = '" . $single_event_id . "' ";
        } else {
			$sql.= " AND e.id = '" . $event_id . "' LIMIT 0,1";
        }

        //Support for diarise
        if (!empty($_REQUEST['post_event_id'])) {
            $sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . ' e';
            $sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";
            $sql .= " WHERE post_id = '" . $_REQUEST['post_event_id'] . "' ";
            $sql .= " LIMIT 0,1";
        }

        $data->event = $wpdb->get_row($sql, OBJECT);
        //print_r($data->event);

        $num_rows = $wpdb->num_rows;

        //Build the registration page
        if ($num_rows > 0) {
            //Create a log file
            //espresso_log::singleton()->log( array ( 'file' => __FILE__, 'function' => __FUNCTION__, 'status' => " $sql] [ sqldump = " . var_export($events, true) ) );
            //These are the variables that can be used throughout the registration page
            //foreach ($events as $event) {
            global $this_event_id;
            $event_id = $data->event->id;
            $this_event_id = $event_id;

            $event_name = stripslashes_deep($data->event->event_name);
            $event_desc = stripslashes_deep($data->event->event_desc);
            $display_desc = $data->event->display_desc;
            $display_reg_form = $data->event->display_reg_form;
            $event_address = $data->event->address;
            $event_address2 = $data->event->address2;
            $event_city = $data->event->city;
            $event_state = $data->event->state;
            $event_zip = $data->event->zip;
            $event_country = $data->event->country;


            $event_description = stripslashes_deep($data->event->event_desc);
            $event_identifier = $data->event->event_identifier;
            $event_cost = isset($data->event->event_cost) ? $data->event->event_cost : "0.00";
            $member_only = $data->event->member_only;
            $reg_limit = $data->event->reg_limit;
            $allow_multiple = $data->event->allow_multiple;
            $start_date = $data->event->start_date;
            $end_date = $data->event->end_date;
            $allow_overflow = $data->event->allow_overflow;
            $overflow_event_id = $data->event->overflow_event_id;

            //Venue details
            $venue_title = $data->event->venue_title;
            $venue_url = $data->event->venue_url;
            $venue_image = $data->event->venue_image;
            $venue_phone = $data->event->venue_phone;
            $venue_address = '';
            $venue_address2 = '';
            $venue_city = '';
            $venue_state = '';
            $venue_zip = '';
            $venue_country = '';

            global $event_meta;
            $event_meta = unserialize($data->event->event_meta);

            //Venue information
            if ($org_options['use_venue_manager'] == 'Y') {
                $event_address = $data->event->venue_address;
                $event_address2 = $data->event->venue_address2;
                $event_city = $data->event->venue_city;
                $event_state = $data->event->venue_state;
                $event_zip = $data->event->venue_zip;
                $event_country = $data->event->venue_country;

                //Leaving these variables intact, just in case people wnat to use them
                $venue_title = $data->event->venue_name;
                $venue_address = $data->event->venue_address;
                $venue_address2 = $data->event->venue_address2;
                $venue_city = $data->event->venue_city;
                $venue_state = $data->event->venue_state;
                $venue_zip = $data->event->venue_zip;
                $venue_country = $data->event->venue_country;
                global $venue_meta;
                $add_venue_meta = array(
                    'venue_title' => $data->event->venue_name,
                    'venue_address' => $data->event->venue_address,
                    'venue_address2' => $data->event->venue_address2,
                    'venue_city' => $data->event->venue_city,
                    'venue_state' => $data->event->venue_state,
                    'venue_country' => $data->event->venue_country,
                );
                $venue_meta = (isset($data->event->venue_meta) && $data->event->venue_meta != '') && (isset($add_venue_meta) && $add_venue_meta != '') ? array_merge(unserialize($data->event->venue_meta), $add_venue_meta) : '';
                //print_r($venue_meta);
            }

            $virtual_url = stripslashes_deep($data->event->virtual_url);
            $virtual_phone = stripslashes_deep($data->event->virtual_phone);

            //Address formatting
												// Plain format for gmap geocoding
												$venue_address_elements = ($event_address != '' ? $event_address . ',' : '') . ($event_address2 != '' ? $event_address2 . ',' : '') . ($event_city != '' ?  $event_city . ',' : '') . ($event_state != '' ? $event_state . ',' : '') . ($event_zip != '' ? $event_zip . ',' : '') . ($event_country != '' ? $event_country . ',' : '');
            $ee_gmap_location =  $venue_address_elements;
												// display formatting
												$location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');

            //Google map link creation
            $google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country, 'text' => 'Map and Directions', 'type' => 'text'));

            $question_groups = unserialize($data->event->question_groups);
            $reg_start_date = $data->event->registration_start;
            $reg_end_date = $data->event->registration_end;
            $today = date("Y-m-d");
            if (isset($data->event->timezone_string) && $data->event->timezone_string != '') {
                $timezone_string = $data->event->timezone_string;
            } else {
                $timezone_string = get_option('timezone_string');
                if (!isset($timezone_string) || $timezone_string == '') {
                    $timezone_string = 'America/New_York';
                }
            }

            $t = time();
            $today = date_at_timezone("Y-m-d H:i A", $timezone_string, $t);
            //echo event_date_display($today, get_option('date_format'). ' ' .get_option('time_format')) . ' ' . $timezone_string;
            //echo espresso_ddtimezone_simple();
            $reg_limit = $data->event->reg_limit;
            $additional_limit = $data->event->additional_limit;



            //If the coupon code system is intalled then use it
            if (function_exists('event_espresso_coupon_registration_page')) {
                $use_coupon_code = $data->event->use_coupon_code;
            }

            //If the groupon code addon is installed, then use it
            if (function_exists('event_espresso_groupon_payment_page')) {
                $use_groupon_code = $data->event->use_groupon_code;
            }

            //Set a default value for additional limit
            if ($additional_limit == '') {
                $additional_limit = '5';
            }

            $num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); //Get the number of attendees
            $available_spaces = get_number_of_attendees_reg_limit($event_id, 'available_spaces'); //Gets a count of the available spaces
            $number_available_spaces = get_number_of_attendees_reg_limit($event_id, 'number_available_spaces'); //Gets the number of available spaces
            //echo $number_available_spaces;


            global $all_meta;
            $all_meta = array(
                'event_name' => '<p class="section-title">' . stripslashes_deep($event_name) . '</span>',
                'event_desc' => stripslashes_deep($event_desc),
                'event_address' => $event_address,
                'event_address2' => $event_address2,
                'event_city' => $event_city,
                'event_state' => $event_state,
                'event_zip' => $event_zip,
                'event_country' => $event_country,
                'venue_title' => '<span class="section-title">' . $venue_title . '</span>',
                'venue_address' => $venue_address,
                'venue_address2' => $venue_address2,
                'venue_city' => $venue_city,
                'venue_state' => $venue_state,
                'venue_country' => $venue_country,

				'is_active' => $data->event->is_active,
				'event_status' => $data->event->event_status,
				'start_time' => $data->event->start_time,
				'start_time' => empty($data->event->start_time) ? '' : $data->event->start_time,

				'registration_startT' => $data->event->registration_startT,
				'registration_start' => $data->event->registration_start,

				'registration_endT' => $data->event->registration_endT,
				'registration_end' => $data->event->registration_end,
'event_address' => empty($data->event->event_address) ? '' : $data->event->event_address,

				'start_date' => '<span class="section-title">' . event_espresso_no_format_date($start_date, get_option('date_format')) . '</span>',
                'end_date' => '<span class="section-title">' . event_date_display($end_date, get_option('date_format')) . '</span>',
                //'time' => event_espresso_time_dropdown($event_id, 0),
                'google_map_link' => $google_map_link,
                //'price' => event_espresso_price_dropdown($event_id, 0),
                //'registration' => event_espresso_add_question_groups($question_groups),
                //'additional_attendees' => $allow_multiple == "Y" && $number_available_spaces > 1 ? event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces, '', false, $event_meta) : '<input type="hidden" name="num_people" id="num_people-' . $event_id . '" value="1">',
            );
            //print_r($all_meta);
//This function gets the status of the event.
                $is_active = array();
                $is_active = event_espresso_get_is_active(0, $all_meta);

				//echo '<p>'.print_r(event_espresso_get_is_active($event_id, $all_meta)).'</p>';;

            if ($org_options['use_captcha'] == 'Y'
										&& (empty($_REQUEST['edit_details']) || $_REQUEST['edit_details'] != 'true')
										&& !is_user_logged_in()) {
                ?>
                <script type="text/javascript">
                    var RecaptchaOptions = {
                        theme : '<?php echo $org_options['recaptcha_theme'] == '' ? 'red' : $org_options['recaptcha_theme']; ?>',
                        lang : '<?php echo $org_options['recaptcha_language'] == '' ? 'en' : $org_options['recaptcha_language']; ?>'
                    };
                </script>
                <?php
            }
            //This is the start of the registration form. This is where you can start editing your display.
            //(Shows the regsitration form if enough spaces exist)
            if ($num_attendees >= $reg_limit) {
                ?>
                <div class="espresso_event_full event-display-boxes" id="espresso_event_full-<?php echo $event_id; ?>">
                    <h3 class="event_title"><?php echo stripslashes_deep($event_name) ?></h3>
                    <div class="event-messages">
                        <p class="event_full"><strong><?php _e('We are sorry but this event has reached the maximum number of attendees!', 'event_espresso'); ?></strong></p>
                        <p class="event_full"><strong><?php _e('Please check back in the event someone cancels.', 'event_espresso'); ?></strong></p>
                        <p class="num_attendees"><?php _e('Current Number of Attendees:', 'event_espresso'); ?> <?php echo $num_attendees ?></p>
                    </div>
                <?php
                $num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); //Get the number of attendees. Please visit http://eventespresso.com/forums/?p=247 for available parameters for the get_number_of_attendees_reg_limit() function.
                if (($num_attendees >= $reg_limit) && ($allow_overflow == 'Y' && $overflow_event_id != 0)) {
                    ?>
                        <p id="register_link-<?php echo $overflow_event_id ?>" class="register-link-footer"><a class="a_register_link" id="a_register_link-<?php echo $overflow_event_id ?>" href="<?php echo espresso_reg_url($overflow_event_id); ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Join Waiting List', 'event_espresso'); ?></a></p>
                    <?php } ?>
                </div>

                    <?php
                } else {
                    //If enough spaces exist then show the form
                    //Check to see if the Members plugin is installed.
                    if (!is_user_logged_in() && get_option('events_members_active') == 'true' && $member_only == 'Y') {
                        event_espresso_user_login();
                    } else {
                        //Serve up the registration form
                        //As of version 3.0.17 the registration details have been moved to registration_form.php
                        require('registration_page_display.php');
                    }
                }//End if ($num_attendees >= $reg_limit) (Shows the regsitration form if enough spaces exist)
            } else {//If there are no results from the query, display this message
                _e('<h3>This event has expired or is no longer available.</h3>', 'event_espresso');
            }

            echo espresso_registration_footer();

            //Check to see how many database queries were performed
            //echo '<p>Database Queries: ' . get_num_queries() .'</p>';
        }

    }
