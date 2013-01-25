<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

//This is a template file for displaying a list of events on a page. These functions are used with the [ESPRESSO_EVENTS] shortcode.
//This is an group of functions for querying all of the events in your databse.
//This file should be stored in your "/wp-content/uploads/espresso/templates/" directory.
//Note: All of these functions can be overridden using the "Custom Files" addon. The custom files addon also contains sample code to display ongoing events
/**
 * method short descriptiom (req)
 *
 * method long descriptiom
 *
 * @access 		private		private protected public
 * @param 		int 			$var_name 		int float string array object mixed
 * @return 		void			var type
 */
function display_all_events($show_recurrence = TRUE) {

	global $org_options;
	// error logging
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$attributes = array( 'show_recurrence' => $show_recurrence );
	event_espresso_get_event_details($attributes); //This function is located below
}





/**
 * method short descriptiom (req)
 *
 * method long descriptiom
 *
 * @access 		private		private protected public
 * @param 		int 			$var_name 		int float string array object mixed
 * @return 		void			var type
 */
function display_event_espresso_categories($category_identifier = 'null', $css_class = NULL) {

	global $org_options;
	// error logging
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$attributes = array(
			'category_identifier' => $category_identifier,
			'css_class' => $css_class
	);
	event_espresso_get_event_details($attributes);
}





/**
 * displays a list of events and their details
 *
 * @param 		string 			$sql 					int float string array object mixed
 * @param 		string 			$css_class 			int float string array object mixed
 * @param 		boolean 		$allow_override 		int float string array object mixed
 * @return 		void
 */
function event_espresso_get_event_details($attributes) {

	global $wpdb, $org_options, $events_in_session, $ee_gmaps_opts, $EE_Cart;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	do_action( 'action_hook_espresso_before_event_list' );

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/gmap_incl.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/event_details.helper.php');
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Prices.class.php' );
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
	$DTM_MDL = EEM_Datetime::instance();


	//echo 'This page is located in ' . get_option( 'upload_path' );
	$event_page_id = $org_options['event_page_id'];
	$currency_symbol = isset($org_options['currency_symbol']) ? $org_options['currency_symbol'] : '';

	$default_attributes = array(
			'category_identifier' => 'NULL',
			'show_expired' => 'false',
			'show_secondary' => 'false',
			'show_deleted' => 'false',
			'show_recurrence' => 'false',
			'limit' => '0',
			'order_by' => 'NULL',
			'css_class' => 'NULL',
			'allow_override' => 1,
			'use_venues' => FALSE,
			'venue_id' => FALSE
	);

	// loop thru default atts
/*	foreach ($default_attributes as $key => $default_attribute) {
		// check if att exists
		if (!isset($attributes[$key])) {
			$attributes[$key] = $default_attribute;
		}
	}*/
	
	// let's just merge the arrays ( cuz the second one will overwrite the first for any dulplicate keys )
	$attributes = array_merge( $default_attributes, $attributes );
	// now extract shortcode attributes
	extract($attributes);


	// get category
	$category = $category_identifier != 'NULL' ? espresso_event_list_get_category($category_identifier) : FALSE;

	// if $use_venues was not set in the attributes, then check $org_options
	if (!$use_venues) {
		$use_venues = ( isset($org_options['use_venue_manager']) && $org_options['use_venue_manager'] ) ? TRUE : FALSE;
	}

	if ($use_venues) {
		$all_venues = espresso_event_list_get_venues();
	}


	// generate SQL statement
	// this looks like a good place to start
	$SQL = 'SELECT ';
	// maybe get category info
	$SQL .= $category ? 'eventCat.cat_id, ' : '';
	// maybe get venue id
	$SQL .= ( $use_venues or $venue_id ) ? 'eventVenue.venue_id, ' : '';
	// we might even need some event details  ; )
	$SQL .= 'eventDetails.*';

	// maybe get category info
	if ($category) {
		// start with the category rel table since that's what's important here'
		$SQL .= ' FROM ' . EVENTS_CATEGORY_REL_TABLE . ' eventCat LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' eventDetails ON eventCat.event_id = eventDetails.id ';
	} elseif ($venue_id) {
		// start with the venue rel table since that's what's important here'
		$SQL .= ' FROM ' . EVENTS_VENUE_REL_TABLE . ' eventVenue LEFT JOIN ' . EVENTS_DETAIL_TABLE . ' eventDetails ON eventVenue.event_id = eventDetails.id ';
	} else {
		// just a regular ol' events list'
		$SQL .= ' FROM ' . EVENTS_DETAIL_TABLE . ' eventDetails ';
	}

	// display venue info but not for a specific venue
	if ($use_venues && !$venue_id) {
		// maybe get venue info
		$SQL .= $use_venues ? ' LEFT JOIN ' . EVENTS_VENUE_REL_TABLE . ' eventVenue ON eventVenue.event_id = eventDetails.id ' : '';
	}
	
	$SQL .= ' JOIN ' . ESP_DATETIME . ' dateTime ON dateTime.EVT_ID = eventDetails.id ';

	$SQL .= ' WHERE ';
	// maybe get category info
	$SQL .= $category ? 'eventCat.cat_id = %d AND ' : '';
	// maybe get venue info
	$SQL .= $venue_id ? 'eventVenue.venue_id = %d AND ' : '';

	$SQL .= " eventDetails.is_active = 1 ";

	//$SQL .= $show_expired == 'false' ? ' AND (eventDetails.start_date >= "' . date('Y-m-d') . '" OR eventDetails.event_status = "O" OR eventDetails.registration_end >= "' . date('Y-m-d') . '")' : '';
	
	$SQL .= $show_expired == 'false' ? ' AND (( dateTime.DTT_EVT_start >= "' . time() . '" ) OR ( eventDetails.event_status = "O" OR ( dateTime.DTT_REG_end >= "' . time() . '" )))' : '';
	
	
	$SQL .= $show_secondary == 'false' ? " AND eventDetails.event_status != 'S'" : '';
	$SQL .= $show_deleted == 'false' ? " AND eventDetails.event_status != 'D'" : '';
	$SQL .= $show_recurrence == 'false' ? " AND eventDetails.recurrence_id = '0'" : ' GROUP BY eventDetails.id';
	$SQL .= $order_by != NULL ? ' ORDER BY ' . $order_by . ' ASC' : ' ORDER BY date(dateTime.DTT_EVT_start), eventDetails.id ASC';
	$SQL .= $limit > 0 ? ' LIMIT 0,' . $limit . ' ' : '';


	// check for cached events list
	// we'll md5 the final SQL statement to create a string of consistent length
	// this also allows us to cache all of the different queries that can be produced via the SQL options
	$transient_key = 'ee_events_' . md5( $SQL );
	
	$transient_key = FALSE;  // disabled temporarily
	
	

	// check if transient exists
	if ( ! $events = get_transient( $transient_key )) {
		// no transient, so let's run the query
		if ($category) {
			// use the category id from the attributes
			$events = $wpdb->get_results( $wpdb->prepare( $SQL, $category->id ));
		} elseif ($venue_id) {
			// use the venue id  from the attributes
			$events = $wpdb->get_results( $wpdb->prepare( $SQL, $venue_id ));
		} else {
			$events = $wpdb->get_results( $SQL );
		}
			
		// save the newly created transient value

		// 60 seconds * 60 minutes * 24 hours * 365 = 1 year
		//set_transient( $transient_key, $events, 60*60*24*365 );

	} 

//		echo $wpdb->last_query;
//		printr($events, '$events' );


	echo '
<div id="mer-ajax-loading" style="display:none;">
	<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/ajax-loader-grey.gif" /><span>loading...</span>
</div>
' . EE_Error::get_notices() . '
<input id="event-queue-poll-server" type="hidden" value="1" name="event-queue-poll-server">

';

	if ($category) {
		if ($category->display_desc && $category->category_name != '') {
			echo '<h3 id="events_category_name-' . $category->id . '" class="events_category_name">' . stripslashes_deep($category->category_name) . '</h3>';
			echo espresso_format_content($category->category_desc);
		}
	}

	if ($venue_id) {
		$venue_hdr = isset($name_before) ? $name_before : '<h3 class="venue_name">';
		$venue_hdr .= stripslashes_deep($all_venues[$venue_id]->name);
		$venue_hdr .= isset($name_after) ? $name_after : '</h3>';
		echo $venue_hdr;
	}

	
	foreach ($events as $event) {
	
		$event_id = $event->id;
		// add event id to list of event ids to be used for the query cache transient key
		$event_name = stripslashes_deep($event->event_name);
		$event_desc = stripslashes_deep($event->event_desc);
		$event_desc = str_replace('<p></p>', '', $event_desc);
		$overflow_event_id = $event->overflow_event_id;


		$event->recurring_events = FALSE;
		// check for a valid recurrence id and that the recurring events table is set
		if ($show_recurrence && $event->recurrence_id && defined('EVENT_ESPRESSO_RECURRENCE_TABLE')) {
			//$event->recurring_events = espresso_event_list_get_recurring_events( $event->recurrence_id );
			//echo pre_arr($event->recurring_events);
		}


		global $event_meta;
		$event_meta = unserialize($event->event_meta);
		$event_meta['is_active'] = $event->is_active;
		$event_meta['event_status'] = $event->event_status;
//		$event_meta['start_time'] = empty($event->start_time) ? '' : $event->start_time;
//		$event_meta['start_date'] = $event->start_date;
//		$event_meta['registration_start'] = $event->registration_start;
//		$event_meta['registration_startT'] = $event->registration_startT;
//		$event_meta['registration_end'] = $event->registration_end;
//		$event_meta['registration_endT'] = $event->registration_endT;

		//$display_event_date = event_date_display( $event->start_date, get_option('date_format'));
		//$display_event_date = date_i18n( 'l F jS, Y', strtotime( $event->start_date ));
		//$event->single_date = date_i18n( 'D M jS', strtotime( $event->start_date ));
		//$event->single_date = date_i18n( 'l F jS, Y', strtotime( $event->start_date ));


		//Here we can create messages based on the event status. These variables can be echoed anywhere on the page to display your status message.
		$status = event_espresso_get_is_active( $event_id, $event_meta, $event->is_active, $event->event_status );

		$status_display = $status['display_custom'];
		$status_display_open = $status['status'] == 'REGISTRATION_OPEN' ? $status['display_custom'] : $status['status'];
		$status_display_ongoing = $status['status'] == 'ONGOING' ? $status['display_custom'] : $status['status'];
		$status_display_secondary = $status['status'] == 'SECONDARY' ? $status['display_custom'] : $status['status']; //Waitlist event
		$status_display_pending = $status['status'] == 'PENDING' ? $status['display_custom'] : $status['status'];
		$status_display_deleted = $status['status'] == 'DELETED' ? $status['display_custom'] : $status['status'];
		$status_display_draft = $status['status'] == 'DRAFT' ? $status['display_custom'] : $status['status'];
		$status_display_denied = $status['status'] == 'DENIED' ? $status['display_custom'] : $status['status'];
		$status_display_expired = $status['status'] == 'EXPIRED' ? $status['display_custom'] : $status['status'];
		$status_display_reg_closed = $status['status'] == 'REGISTRATION_CLOSED' ? $status['display_custom'] : $status['status'];
		$status_display_not_open = $status['status'] == 'REGISTRATION_NOT_OPEN' ? $status['display_custom'] : $status['status'];
		//You can also display a custom message. For example, this is a custom registration not open message:
		$status_display_custom_closed = $status['status'] == 'REGISTRATION_CLOSED' ? ' - <span class="espresso_closed">' . __('Regsitration is Closed', 'event_espresso') . '</span>' : $status['status'];
		$status['status'] = str_replace('_', ' ', $status['status']);


// EVENT TIMES
		if ( $event->datetimes = $edts = $DTM_MDL->get_all_event_dates($event->id) ) {
			//echo printr($event->datetimes, 'EVENT TIMES for '. $event_name.'  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );	
			$display_event_date = array_shift( $edts );
		} else {
			$display_event_date = FALSE;
		}
			

//		echo printr( $event->datetimes, 'event->datetimes <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );						
//echo '<h4>$display_event_date : ' . $display_event_date->start() . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';



		$event->event_cost = empty($event->event_cost) ? '' : $event->event_cost;

// EVENT PRICING
		// let's start with an empty array'
//		$EVT_Prices = new EE_Event_Prices( $event->id );
//		$event->prices = $EVT_Prices->get_final_event_prices();
		//echo printr($event->prices, 'EVENT PRICES <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );						
		$TKT_PRCs = new EE_Ticket_Prices( $event->id );
		$event->prices = $TKT_PRCs->get_all_final_event_prices();
//		echo printr($event->prices, 'EVENT PRICES <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );						

		$event->currency_symbol = $org_options['currency_symbol'];

		$display_available_spaces = ( $event->display_reg_form && $event->externalURL == '' ) ? TRUE : FALSE;
		$available_spaces = get_number_of_attendees_reg_limit($event_id, 'available_spaces');

		//Venue information
		if ($use_venues) {
			if (isset($all_venues[$event->venue_id])) {

				$event_address = $all_venues[$event->venue_id]->address;
				$event_address2 = $all_venues[$event->venue_id]->address2;
				$event_city = $all_venues[$event->venue_id]->city;
				$event_state = $all_venues[$event->venue_id]->state;
				$event_zip = $all_venues[$event->venue_id]->zip;
				$event_country = $all_venues[$event->venue_id]->country;

				//Leaving these variables intact, just in case people want to use them
				$venue_title = $all_venues[$event->venue_id]->name;
				$venue_address = $all_venues[$event->venue_id]->address;
				$venue_address2 = $all_venues[$event->venue_id]->address2;
				$venue_city = $all_venues[$event->venue_id]->city;
				$venue_state = $all_venues[$event->venue_id]->state;
				$venue_zip = $all_venues[$event->venue_id]->zip;
				$venue_country = $all_venues[$event->venue_id]->country;

				global $venue_meta;

				$add_venue_meta = array(
						'venue_title' => $all_venues[$event->venue_id]->name,
						'venue_address' => $all_venues[$event->venue_id]->address,
						'venue_address2' => $all_venues[$event->venue_id]->address2,
						'venue_city' => $all_venues[$event->venue_id]->city,
						'venue_state' => $all_venues[$event->venue_id]->state,
						'venue_country' => $all_venues[$event->venue_id]->country,
				);

				$event_venue_meta = unserialize($all_venues[$event->venue_id]->meta);
				$venue_meta = empty($event_venue_meta) ? '' : array_merge($event_venue_meta, $add_venue_meta);
			}
		}

		$event_address = empty($event_address) ? '' : $event_address;
		$event_address2 = empty($event_address2) ? '' : $event_address2;
		$event_city = empty($event_city) ? '' : $event_city;
		$event_state = empty($event_state) ? '' : $event_state;
		$event_zip = empty($event_zip) ? '' : $event_zip;
		$event_country = empty($event_country) ? '' : $event_country;
		//Address formatting
		$venue_address_elements = $event_address . ',';
		$venue_address_elements .= $event_address2 . ',';
		$venue_address_elements .= $event_city . ',';
		$venue_address_elements .= $event_state . ',';
		$venue_address_elements .= $event_zip . ',';
		$venue_address_elements .= $event_country . ',';

		$location = $event_address;
		$location .= '<br />' . $event_address2;
		$location .= '<br />' . $event_city;
		$location .= ', ' . $event_state;
		$location .= '<br />' . $event_zip;
		$location .= '<br />' . $event_country;


		//Google map link creation
		$google_map_link = espresso_google_map_link(array(
				'address' => $event_address,
				'city' => $event_city,
				'state' => $event_state,
				'zip' => $event_zip,
				'country' => $event_country,
				'text' => 'Map and Directions',
				'type' => 'text',
				'css_id' => 'google-map-link-btn-' . $event_id,
				'css_class' => 'google-map-link-btn ui-button ui-state-default ui-corner-all add-hover-fx',
				'icon' => '<span class="ui-icon ui-icon-extlink"></span>'
						));
		$ee_gmap_location = $venue_address_elements;

		//Create all meta vars
		$meta_keys = array(
				'event_name',
				'event_desc',
				'event_address',
				'event_address2',
				'event_city',
				'event_state',
				'event_zip',
				'event_status',
				'start_time', // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				'registration_startT',
				'registration_start',
				'registration_endT',
				'registration_end',
				'is_active',
				'event_country',
				'start_date',
				'end_date',
				'time', // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				'google_map_link',
				'price',
				'event_cost',
		);
		$meta_values = array(
				$event_name,
				$event_desc,
				$event_address,
				$event_address2,
				$event_city,
				$event_state,
				$event_zip,
				$event->event_status,
				empty($event->start_time) ? '' : $event->start_time, // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				$event->registration_startT,
				$event->registration_start,
				$event->registration_endT,
				$event->registration_end,
				empty($event->is_active) ? '' : $event->is_active,
				$event->country,
				event_date_display($event->start_date, get_option('date_format')),
				event_date_display($event->end_date, get_option('date_format')),
				empty($event->start_time) ? '' : $event->start_time, // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
				htmlentities($google_map_link),
				empty($event->event_cost) ? '' : $event->event_cost,
				empty($event->event_cost) ? '' : $event->event_cost,
		);
		$meta_key = array();
		foreach ($event_meta as $key => $value) {
			$meta_key[] = $key;
			$meta_value[] = $value;
		}
		foreach ($meta_keys as $key=>$meta_key) {
			$event->meta_keys[$key] = htmlspecialchars($meta_key);
		}
		foreach ($meta_values as $key=>$meta_value) {
			$event->meta_values[$key] = htmlspecialchars($meta_value);
		}


		// EE gmaps needs it's own org_options array populated on a per page basis to enable common queries in gmaps api function
		if (isset($org_options['map_settings']) && !empty($org_options['map_settings'])) {
			$ee_gmaps_opts = array(
					'ee_map_width' => $org_options['map_settings']['ee_map_width'],
					'ee_map_height' => $org_options['map_settings']['ee_map_height'],
					'ee_map_zoom' => $org_options['map_settings']['ee_map_zoom'],
					'ee_map_nav_display' => $org_options['map_settings']['ee_map_nav_display'],
					'ee_map_nav_size' => $org_options['map_settings']['ee_map_nav_size'],
					'ee_map_type_control' => $org_options['map_settings']['ee_map_type_control'],
					'ee_map_align' => $org_options['map_settings']['ee_map_align']
			);
		}

		//Google map
		$google_map = '';
		if (isset($event_meta['enable_for_gmap']) && $event_meta['enable_for_gmap']) {
			if (function_exists('ee_gmap_display') && isset( $org_options['map_settings']['ee_display_map_no_shortcodes'] ) && $org_options['map_settings']['ee_display_map_no_shortcodes']) {
				$google_map = ee_gmap_display($ee_gmap_location, $event_id);
			}
		}


		//This can be used in place of the registration link if you are usign the external URL feature
		$registration_url = $event->reg_url = $event->externalURL != '' ? $event->externalURL : espresso_reg_url($event_id);

		$display_thumb_in_list = ( isset($event_meta['display_thumb_in_lists']) && $event_meta['display_thumb_in_lists'] && !empty($event_meta['event_thumbnail_url']) ) ? TRUE : FALSE;


		$display_address = ( $location != '' && isset( $org_options['template_settings']['display_address_in_event_list'] ) && $org_options['template_settings']['display_address_in_event_list']) ? TRUE : FALSE;


		//Event description
		if (!empty($event_desc)) {
			if (isset($org_options['template_settings']['display_description_in_event_list']) && $org_options['template_settings']['display_description_in_event_list']) {
				//Show short descriptions
				if (isset($org_options['template_settings']['display_short_description_in_event_list']) && $org_options['template_settings']['display_short_description_in_event_list']) {
					$event_desc = explode('<!--more-->', $event_desc);
					$event_desc = array_shift($event_desc);
				}
				$event_desc = espresso_format_content($event_desc);
			}
		}

		if (!is_user_logged_in() && defined( 'EVENT_ESPRESSO_MEMBERS_DIR' ) && $event->member_only ) {
			//Display a message if the user is not logged in.
			_e('Member Only Event. Please ','event_espresso') . event_espresso_user_login_link() . '.';
		} else {
			//Serve up the event list
			//As of version 3.0.17 the event list details have been moved to event_list_display.php


			$event_status = event_espresso_get_status( $event->id, $event_meta );


			$open_event_status_list = array('ACTIVE', 'REGISTRATION_OPEN', 'ONGOING', 'SECONDARY', 'PENDING');

			if (in_array($event_status, $open_event_status_list)) {

				$can_register_for_event = TRUE;

				$num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees');
				$event_is_sold_out = ( $num_attendees >= $event->reg_limit ) ? TRUE : FALSE;
				$overflow_event = ($event->overflow_event_id != '0' && $event->allow_overflow) ? TRUE : FALSE;

				if ($overflow_event) {
					$overflow_reg_url = espresso_reg_url($event->overflow_event_id);
				}



				$event->reg_btn = array();
				$event->reg_btn['event_status'] = $status['status'];
				$event->reg_btn['event_id'] = $event_id;
				$event->reg_btn['reg_url'] = $event->reg_url;
				$event->reg_btn['external_url'] = $event->externalURL;
				$event->reg_btn['css_id'] = 'a_register_link-';
				$event->reg_btn['default_css_class'] = 'a_register_link ';
				$event->reg_btn['event_name'] = $event->event_name;
				$event->reg_btn['text'] = $event->display_reg_form ? 'Register for Event' : 'View Details';
				$event->reg_btn['extra_attributes'] = '';
				$event->reg_btn['reg_limit'] = $event->reg_limit;
				$event->reg_btn['additional_limit'] = $event->additional_limit;
				$event->reg_btn['event_cost'] = $event->event_cost;
				$event->reg_btn['prices'] = $event->prices;
				$event->reg_btn['require_pre_approval'] = $event->require_pre_approval;
				//$event->reg_btn['all_meta'] = $all_meta;

				$event->reg_btn = apply_filters( 'filter_hook_espresso_event_reg_btn', $event->reg_btn );

				$event_reg_link = '
			<p id="register_link-' . $event_id . '" class="">
				<a	id="a_register_link-' . $event_id . '"
						class="ui-button ui-button-big ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all float-right"
						href="' . $event->reg_url . '"
						title="' . $event->event_name . '"
					>
					' . __('Register Now', 'event_espresso') . '
				</a>
			</p>';
				
				$event_reg_link = apply_filters( 'filter_hook_espresso_event_reg_link', $event_reg_link, $event->reg_btn );

				// END OF if ( in_array( $event_status, $open_event_status_list ))
			} else {

				$can_register_for_event = FALSE;
				$registration_closed_msg = __('This Event is no longer open for registration.', 'event_espresso');
			}

			if ($allow_override == 1) {
				include('event_list_display.php');
			} else {

				switch ($event_status) {

					case 'NOT_ACTIVE':
						break;

					case 'PENDING':

						if (current_user_can('administrator') || function_exists('espresso_member_data') && espresso_can_view_event($event_id) == true) {
							echo '<div class="pending_event">';
							//include('event_list_display.php');
							include(espresso_get_event_list_display_template());
							echo '</div>';
						}

						break;

					case 'ACTIVE':
					default:

						include(espresso_get_event_list_display_template());

						break;
				}
			}
		}
	} // end foreach event
	//Check to see how many database queries were performed
	//echo '<p>Database Queries: ' . get_num_queries() .'</p>';
	espresso_registration_footer();
	
}
