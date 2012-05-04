<?php
//As of version 3.0.17
//This is a logic file for displaying a registration form for an event on a page. This file will do all of the backend data retrieval functions.
//There should be a copy of this file in your wp-content/uploads/espresso/ folder.
//Note: This entire function can be overridden using the "Custom Files" addon
if (!function_exists('event_registration')) {

	function event_details_page( $single_event_id = NULL, $event_id_sc =0 ) {

/*		if ((isset($_REQUEST['form_action']) && $_REQUEST['form_action'] == 'edit_attendee') || (isset($_REQUEST['edit_attendee']) && $_REQUEST['edit_attendee'] == 'true')) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/process-registration/attendee_edit_record.php');
			attendee_edit_record();
			return;
		}*/

		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$event_slug = (get_query_var('event_slug')) ? get_query_var('event_slug') : FALSE;


		if ( $event_id_sc != 0 ) {
			$SQL = 'SELECT slug  FROM '.EVENTS_DETAIL_TABLE.' WHERE id = %d';
			$event_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $event_id_sc ));
		}


		if (!empty($_REQUEST['event_id_time'])) {
			$pieces = explode('|', $_REQUEST['event_id_time'], 3);
			//$event_id = $pieces[0];
			$start_time = $pieces[1];
			$time_id = $pieces[2];
			$time_selected = true;

			if ( isset( $pieces[0] ) && $pieces[0] != '' ) {
				$SQL = 'SELECT slug  FROM '.EVENTS_DETAIL_TABLE.' WHERE id = %d';
				$event_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $event_id_sc ));
			}
		}

		if ( isset( $_REQUEST['ee'] ) && $_REQUEST['ee'] != '' ) {
			$ee_event_id = $_REQUEST['ee'];
		} else {
			$ee_event_id = FALSE;
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

		if ( isset($org_options['map_settings']['ee_display_map_no_shortcodes']) && $org_options['map_settings']['ee_display_map_no_shortcodes'] ) {
			$show_ee_gmap_no_shortcode = true;
		} else {
			$show_ee_gmap_no_shortcode = false;
		}
		//Build event queries
		$sql = "SELECT e.*, ese.start_time, ese.end_time ";
		$org_options['use_venue_manager'] ? $sql .= ", v.name venue_name, v.address venue_address, v.address2 venue_address2, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
		$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";

		isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
		$sql.= " WHERE e.is_active=1 ";
		$sql.= " AND e.event_status != 'D' ";

		if ($single_event_id != NULL) {
			//Get the ID of a single event
			//If a single event needs to be displayed, get its ID
			$sql .= " AND event_identifier = '" . $single_event_id . "' ";
		} elseif ( $ee_event_id ) {
			$sql.= " AND e.id = '" . $ee_event_id . "' LIMIT 0,1";
		} else {
			$sql.= " AND e.slug = '" . $event_slug . "' LIMIT 0,1";
		}





		//Support for diarise
		if (!empty($_REQUEST['post_event_id'])) {
			$sql = "SELECT e.* FROM " . EVENTS_DETAIL_TABLE . ' e';
			$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";
			$sql .= " WHERE post_id = '" . $_REQUEST['post_event_id'] . "' ";
			$sql .= " LIMIT 0,1";
		}



//		$event = $wpdb->get_row( $sql );
//		printr($event, 'event' );
		$event = $wpdb->get_row( $sql );
//		printr($event, 'event' );
//		die();

		$num_rows = $wpdb->num_rows;

		//Build the registration page
		if ($num_rows > 0) {
			//Create a log file
			//espresso_log::singleton()->log( array ( 'file' => __FILE__, 'function' => __FUNCTION__, 'status' => " $sql] [ sqldump = " . var_export($events, true) ) );
			//These are the variables that can be used throughout the registration page
			//foreach ($events as $event) {
			global $this_event_id;
			$event_id = $event->id;
			$this_event_id = $event_id;

			$event_name = stripslashes_deep($event->event_name);
			$event_desc = stripslashes_deep($event->event_desc);
			$display_desc = $event->display_desc;
			$display_reg_form = $event->display_reg_form;
			$event_address = $event->address;
			$event_address2 = $event->address2;
			$event_city = $event->city;
			$event_state = $event->state;
			$event_zip = $event->zip;
			$event_country = $event->country;


			$event_description = stripslashes_deep($event->event_desc);
			$event_identifier = $event->event_identifier;
			$event_cost = isset($event->event_cost) ? $event->event_cost : "0.00";
			$member_only = $event->member_only;
			$reg_limit = $event->reg_limit;
			$allow_multiple = $event->allow_multiple;
			$start_date = $event->start_date;
			$end_date = $event->end_date;
			$allow_overflow = $event->allow_overflow;
			$overflow_event_id = $event->overflow_event_id;

			//Venue details
			$venue_title = $event->venue_title;
			$venue_url = $event->venue_url;
			$venue_image = $event->venue_image;
			$venue_phone = $event->venue_phone;
			$venue_address = '';
			$venue_address2 = '';
			$venue_city = '';
			$venue_state = '';
			$venue_zip = '';
			$venue_country = '';

			global $event_meta;
			$event_meta = unserialize($event->event_meta);

			//Venue information
			if ($org_options['use_venue_manager']) {
				$event_address = $event->venue_address;
				$event_address2 = $event->venue_address2;
				$event_city = $event->venue_city;
				$event_state = $event->venue_state;
				$event_zip = $event->venue_zip;
				$event_country = $event->venue_country;

				//Leaving these variables intact, just in case people wnat to use them
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
						'venue_address' => $event->venue_address,
						'venue_address2' => $event->venue_address2,
						'venue_city' => $event->venue_city,
						'venue_state' => $event->venue_state,
						'venue_country' => $event->venue_country,
				);
				$venue_meta = (isset($event->venue_meta) && $event->venue_meta != '') && (isset($add_venue_meta) && $add_venue_meta != '') ? array_merge(unserialize($event->venue_meta), $add_venue_meta) : '';
				//print_r($venue_meta);
			}

			$virtual_url = stripslashes_deep($event->virtual_url);
			$virtual_phone = stripslashes_deep($event->virtual_phone);

			global $ee_gmaps_opts;
			// EE gmaps needs it's own org_options array populated on a per page basis to enable common queries in gmaps api function
			$ee_gmaps_opts = array(
					'ee_map_width' => empty($org_options['map_settings']['ee_map_width_single']) ? '' : $org_options['map_settings']['ee_map_width_single'],
					'ee_map_height' => empty($org_options['map_settings']['ee_map_height_single']) ? '' : $org_options['map_settings']['ee_map_height_single'],
					'ee_map_zoom' => empty($org_options['map_settings']['ee_map_zoom_single']) ? '' : $org_options['map_settings']['ee_map_zoom_single'],
					'ee_map_nav_display' => empty($org_options['map_settings']['ee_map_nav_display_single']) ? '' : $org_options['map_settings']['ee_map_nav_display_single'],
					'ee_map_nav_size' => empty($org_options['map_settings']['ee_map_nav_size_single']) ? '' : $org_options['map_settings']['ee_map_nav_size_single'],
					'ee_map_type_control' => empty($org_options['map_settings']['ee_map_type_control_single']) ? '' : $org_options['map_settings']['ee_map_type_control_single'],
					'ee_map_align' => empty($org_options['map_settings']['ee_map_align_single']) ? '' : $org_options['map_settings']['ee_map_align_single'],
					'ee_static_url' => empty($venue_meta['gmap_static']) ? '' : $venue_meta['gmap_static'],
					'ee_enable_for_gmap' => empty($event_meta['enable_for_gmap']) ? '' : $event_meta['enable_for_gmap']
			);


			//Address formatting
			// Plain format for gmap geocoding
			$venue_address_elements = ($event_address != '' ? $event_address . ',' : '') . ($event_address2 != '' ? $event_address2 . ',' : '') . ($event_city != '' ? $event_city . ',' : '') . ($event_state != '' ? $event_state . ',' : '') . ($event_zip != '' ? $event_zip . ',' : '') . ($event_country != '' ? $event_country . ',' : '');
			$ee_gmap_location = $venue_address_elements;
			// display formatting
			$location = ($event_address != '' ? $event_address : '') . ($event_address2 != '' ? '<br />' . $event_address2 : '') . ($event_city != '' ? '<br />' . $event_city : '') . ($event_state != '' ? ', ' . $event_state : '') . ($event_zip != '' ? '<br />' . $event_zip : '') . ($event_country != '' ? '<br />' . $event_country : '');

			//Google map link creation
			$google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country, 'text' => 'Map and Directions', 'type' => 'text'));

			$question_groups = unserialize($event->question_groups);
			$reg_start_date = $event->registration_start;
			$reg_end_date = $event->registration_end;
			$today = date("Y-m-d");
			if (isset($event->timezone_string) && $event->timezone_string != '') {
				$timezone_string = $event->timezone_string;
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
			$reg_limit = $event->reg_limit;
			$additional_limit = $event->additional_limit;

			$event->recurring_events = FALSE;

			//If the coupon code system is intalled then use it
			if (function_exists('event_espresso_coupon_registration_page')) {
				$use_coupon_code = $event->use_coupon_code;
			}

			//If the groupon code addon is installed, then use it
			if (function_exists('event_espresso_groupon_payment_page')) {
				$use_groupon_code = $event->use_groupon_code;
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
					'is_active' => $event->is_active,
					'event_status' => $event->event_status,
					'start_time' => $event->start_time,
					'start_time' => empty($event->start_time) ? '' : $event->start_time,
					'registration_startT' => $event->registration_startT,
					'registration_start' => $event->registration_start,
					'registration_endT' => $event->registration_endT,
					'registration_end' => $event->registration_end,
					'event_address' => empty($event->event_address) ? '' : $event->event_address,
					'start_date' => '<span class="section-title">' . event_espresso_no_format_date($start_date, get_option('date_format')) . '</span>',
					'end_date' => '<span class="section-title">' . event_date_display($end_date, get_option('date_format')) . '</span>',
					//'time' => event_espresso_time_dropdown($event_id, 0),
					'google_map_link' => $google_map_link,
							//'price' => event_espresso_price_dropdown($event_id, 0),
							//'registration' => event_espresso_add_question_groups($question_groups),
							//'additional_attendees' => $allow_multiple && $number_available_spaces > 1 ? event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces, '', false, $event_meta) : '<input type="hidden" name="num_people" id="num_people-' . $event_id . '" value="1">',
			);
			//print_r($all_meta);
//This function gets the status of the event.
			$is_active = array();
			$is_active = event_espresso_get_is_active($event_id);



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
				$num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees'); 
				if (($num_attendees >= $reg_limit) && ($allow_overflow && $overflow_event_id != 0)) {
					?>
						<p id="register_link-<?php echo $overflow_event_id ?>" class="register-link-footer"><a class="a_register_link" id="a_register_link-<?php echo $overflow_event_id ?>" href="<?php echo espresso_reg_url($overflow_event_id); ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Join Waiting List', 'event_espresso'); ?></a></p>
					<?php } ?>
				</div>

					<?php
				} else {
					//If enough spaces exist then show the form
					//Check to see if the Members plugin is installed.
					if (!is_user_logged_in() && get_option('events_members_active') == 'true' && $member_only) {
						event_espresso_user_login();
					} else {

						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/event_details.helper.php');

						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
						$DTM = EEM_Datetime::instance();
						$event->times = $DTM->get_all_datetimes_for_event($event_id);

//						$event->prices = array();
//						if ($event_prices = espresso_event_list_get_event_prices($event_id, $event->early_disc, $event->early_disc_date, $event->early_disc_percentage)) {
//							$event->prices = espresso_event_list_process_event_prices($event_prices);
//						}

						require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Event_Price.class.php' );
						$EVT_Prices = new EE_Event_Prices( $event->id );
						$event->prices = $EVT_Prices->get_final_event_prices();
						//echo printr($event->prices, 'EVENT PRICES <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );						


						$event->currency_symbol = $org_options['currency_symbol'];

						$event->display_available_spaces = ( $event->display_reg_form && $event->externalURL == '' ) ? TRUE : FALSE;
						$event->available_spaces = get_number_of_attendees_reg_limit($event_id, 'available_spaces');

						// ticket selector
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'process-registration/ticket_selector.php');
						add_action('action_hook_espresso_ticket_selector', 'espresso_ticket_selector', 10, 1);

						$registration_url = add_query_arg( array( 'e_reg'=>'process_ticket_selections' ), espresso_get_reg_page_full_url() );

						//Serve up the registration form
						require(espresso_get_registration_display_template());
					}
				}//End if ($num_attendees >= $reg_limit) (Shows the regsitration form if enough spaces exist)

			} else {//If there are no results from the query, display this message
				echo '<h3>' . __('This event has expired or is no longer available.', 'event_espresso') . '</h3>';
			}

			echo espresso_registration_footer();

			//Check to see how many database queries were performed
			//echo '<p>Database Queries: ' . get_num_queries() .'</p>';
		}

	}
