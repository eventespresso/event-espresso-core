<?php
global $wpdb, $org_options;

	if (isset($_REQUEST['id'])) {
	$id=$_REQUEST['id'];
	$event_id=$_REQUEST['id'];
	} else {
		if (isset($last_event_id)) {
	  $id=$last_event_id;
	  $event_id=$last_event_id;
		}
	}

  $event_page_id =$org_options['event_page_id'];
  $Organization =stripslashes_deep($org_options['organization']);
  $Organization_street1 =$org_options['organization_street1'];
  $Organization_street2=$org_options['organization_street2'];
  $Organization_city =$org_options['organization_city'];
  $Organization_state=$org_options['organization_state'];
  $Organization_zip =$org_options['organization_zip'];
  $contact =$org_options['contact_email'];
  $registrar = $org_options['contact_email'];
  $currency_format =$org_options['currency_format'];

		/**
		 * do database stuff
		 * @since 3.1.14.P
		 * this stuff was all copied from registration_page.php
		 * the original queries weren't calling in any of the venue data
		 * feel free to rip this apart if there are ways to optimize this for this template.
		 * as Thesis developers would say, this is all copy pasta.
		 */
		//Build event queries
		$sql = "SELECT e.*, ese.start_time, ese.end_time ";
		!empty($org_options['use_venue_manager']) ? $sql .= ", v.name venue_name, v.address venue_address, v.address2 venue_address2, v.city venue_city, v.state venue_state, v.zip venue_zip, v.country venue_country, v.meta venue_meta " : '';
		$sql .= " FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= " LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";

		!empty($org_options['use_venue_manager']) ? $sql .= " LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " r ON r.event_id = e.id LEFT JOIN " . EVENTS_VENUE_TABLE . " v ON v.id = r.venue_id " : '';
		$sql.= " WHERE e.is_active=true ";
		$sql.= " AND e.event_status != 'D' ";

		// Get the ID of a single event
		if ( isset( $single_event_id ) && $single_event_id != NULL ) {
			// If a single event needs to be displayed, get its ID
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
			if ($org_options['use_venue_manager']) {
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
				//'additional_attendees' => $allow_multiple && $number_available_spaces > 1 ? event_espresso_additional_attendees($event_id, $additional_limit, $number_available_spaces, '', false, $event_meta) : '<input type="hidden" name="num_people" id="num_people-' . $event_id . '" value="1">',
			);
			$registration_url = $externalURL != '' ? $externalURL : espresso_reg_url( $data->event->id, $data->event->slug );
			//print_r($all_meta);
//This function gets the status of the event.
				$is_active = array();
				$is_active = event_espresso_get_is_active(0, $all_meta); }

/**
 * this is the original database stuff
 */
/*
	$sql  = "SELECT * FROM " .EVENTS_DETAIL_TABLE. " WHERE event_status != 'D' AND id = " . $event_id;

	if ($wpdb->get_results($sql)){
			$events = $wpdb->get_results($sql);
			foreach ($events as $event){ //These are the variables that can be used throughout the regsitration page
					$event_id = $event->id;
					$event_name = stripslashes_deep($event->event_name);
					$event_desc = stripslashes_deep($event->event_desc);
					$display_desc = $event->display_desc;
					$event_address = $event->address;
					$event_address2 = $event->address2;
					$event_city = $event->city;
					$event_state = $event->state;
					$event_zip = $event->zip;
					$event_country = $event->country;
					$event_description = stripslashes_deep($event->event_desc);
					$event_identifier = $event->event_identifier;
					$event_cost = empty($event->event_cost) ? 0 : $event->event_cost;
					$member_only = $event->member_only;
					$active = $event->is_active;
					$reg_limit = $event->reg_limit;
					$allow_multiple = $event->allow_multiple;
					$start_date =  $event->start_date;
					$end_date =  $event->end_date;
					$reg_limit=$event->reg_limit;
					$additional_limit = $event->additional_limit;

					$regurl=espresso_reg_url( $event->id, $event->slug );

					$google_map_link = espresso_google_map_link(array('address' => $event_address, 'city' => $event_city, 'state' => $event_state, 'zip' => $event_zip, 'country' => $event_country, 'text' => 'Map and Directions', 'type' => 'text'));
			}//End foreach ($events as $event)
	} */
?>
<p><?php echo date('l F j, Y',strtotime($start_date)) . " - " . date('l F j, Y',strtotime($end_date)); ?></p>
<p><?php echo $event_address ?></p>
<p><img style="padding-right: 5px;" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>/images/map.png" border="0" alt="<?php _e('View Map', 'event_espresso'); ?>" /><?php echo $google_map_link; ?> | <a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Register', 'event_espresso'); ?></a></p>
<?php
if ($display_desc){ ?>
<?php /*?><!--more--><?php */ //Uncomment this part to show the Read More link?>
<?php _e('Description:','event_espresso'); ?>
<?php echo wpautop($event_desc); ?>
<p><a class="a_register_link" id="a_register_link-<?php echo $event_id ?>" href="<?php echo $registration_url; ?>" title="<?php echo stripslashes_deep($event_name) ?>"><?php _e('Register', 'event_espresso'); ?></a></p>
<?php }//End display description ?>
