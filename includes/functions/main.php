<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );



function espresso_parse_site_url_for_ssl() {
	return is_ssl() ? str_replace( 'https://', '', site_url() ) :  str_replace( 'http://', '', site_url() );
}



function espresso_get_reg_page_full_url() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	global $org_options;
	$reg_page_url = get_permalink($org_options['event_page_id']);
	return $reg_page_url;
}



function espresso_get_event_reg_slug() {

	static $event_reg_slug;
	
	if ( $event_reg_slug === NULL ) {
		global $org_options;
		if ( $event_reg_page = get_post( $org_options['event_page_id'] )) {
			$event_reg_slug = $event_reg_page->post_name;
		}	
	}	
	return $event_reg_slug;
}



function espresso_events_on_frontpage() {
	// first check if a page is being used for the frontpage
	if ( get_option('show_on_front') == 'page' ) {
		global $org_options;
		if ( empty($org_options) )
			return; //get  out this is likely a fresh EE activation
		// grab that page's id
		$frontpage = get_option('page_on_front');
		// compare to event_page_id
		return $frontpage == $org_options['event_page_id'] ? TRUE : FALSE;
	}
	return FALSE;
}


function espresso_reg_url($event_id = FALSE, $event_slug = FALSE) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	global $wpdb, $org_options, $events_on_frontpage;

	$registration_url = rtrim(get_permalink($org_options['event_page_id']), '/');
	$registration_url .= espresso_events_on_frontpage() ? '/' . espresso_get_event_reg_slug() : '';
	$use_pretty_permalinks = get_option('permalink_structure') != '' ? TRUE : FALSE;

	if (is_int($event_slug)) {
		$event_id = $event_slug;
		$event_slug = FALSE;
	}
	// if an event slug was supplied
	if ($event_slug && $event_slug != '') {
		// check if permalinks are being used
		if ($use_pretty_permalinks) {
			// create pretty permalink
			$registration_url .= '/' . $event_slug;
		} else {
			// use fugly oldsckool link
			$registration_url = add_query_arg(array('event_slug' => $event_slug), $registration_url);
		}
	} elseif ($event_id && absint($event_id) && $event_id != '' && $event_id > 0) {
		// no event slug, so use  event_id
		// check if permalinks are being used
		if ($use_pretty_permalinks) {
			// check for cached event slug
			if (!$event_slug = get_transient('espresso_event_slug_' . $event_id)) {
				// create the data that needs to be saved.
				$SQL = 'SELECT slug  FROM ' . EVENTS_DETAIL_TABLE . ' WHERE id = %d';
				$event_slug = $wpdb->get_var($wpdb->prepare($SQL, $event_id));

				// save the newly created transient value
				// 60 seconds * 60 minutes * 24 hours * 365 = 1 year
				set_transient('espresso_event_slug_' . $event_id, $event_slug, 60 * 60 * 24 * 365);
			}
			// check if slug exists for that event
			if (!empty($event_slug)) {
				// create pretty permalink
				$registration_url .= '/' . $event_slug;
			} else {
				// couldn't find a slug, so use really fugly oldsckool link
				$registration_url = add_query_arg(array('ee' => $event_id), $registration_url);
			}
		} else {
			// use really fugly oldsckool link
			$registration_url = add_query_arg(array('ee' => $event_id), $registration_url);
		}
	} else
		$registration_url = '';

	return stripslashes_deep($registration_url);
}





//Text formatting function.
//This should fix all of the formatting issues of text output from the database.
function espresso_format_content($content = '') {
	return wpautop(stripslashes_deep(html_entity_decode(do_shortcode($content), ENT_QUOTES, "UTF-8")));
}





//This function returns the condition of an event
if (!function_exists('event_espresso_get_is_active')) {

	function event_espresso_get_is_active( $event_id, $event_meta = '', $is_active = FALSE, $event_status = FALSE ) {
		global $wpdb;
		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		
		if ( $is_active === FALSE || $event_status === FALSE ) {
			$sql = "SELECT is_active, event_status ";
			$sql .= "FROM " . EVENTS_DETAIL_TABLE;
			$sql .= " WHERE id = '" . $event_id . "'";
			$event = $wpdb->get_row($sql, ARRAY_A);
			$is_active = $event['is_active'];
			$event_status = $event['event_status'];
		}
		
		require_once(EE_MODELS . 'EEM_Datetime.model.php');
		$DTM = EEM_Datetime::instance();
		$datetimes = $DTM->get_all_event_dates($event_id);
		$start = 10000000000;
		$regstart = 10000000000;
		$end = 0;
		$regend = 0;
		
		$datetimes = is_array( $datetimes ) ? $datetimes : array( $datetimes );
		foreach ($datetimes as $datetime) {
			$start = min(array($start, $datetime->start()));
			$end = max(array($end, $datetime->end()));
			$regstart = min(array($regstart, $datetime->reg_start()));
			$regend = max(array($regend, $datetime->reg_end()));
		}
		$now = time();

		if ($is_active && $event_status == "O") {
			$event_status = array('status' => 'ONGOING', 'display' => "<span style='color: #090; font-weight:bold;'>" . __('ONGOING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_ongoing">' . __('Ongoing', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a secondary event, show as waitlist
		elseif ($is_active && $event_status == "S") {
			$event_status = array('status' => 'SECONDARY', 'display' => '<span style="color: #090; font-weight:bold;">' . __('WAITLIST', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_secondary">' . __('Waitlist', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a waitlist/secondary event, show as waitlist
		elseif ($is_active && $event_status == "R") {
			$event_status = array('status' => 'DRAFT', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('DRAFT', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_draft">' . __('Draft', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a pending event, show as pending
		elseif ($is_active && $event_status == "P") {
			$event_status = array('status' => 'PENDING', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_pending">' . __('Pending', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a denied event, show as denied
		elseif ($is_active && $event_status == "X") {
			$event_status = array('status' => 'DENIED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('DENIED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_denied">' . __('Denied', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		/*		 * * Check registration dates ** */

		//If the registration end date is greater than the current date
		elseif ($is_active && $regend <= $now && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_CLOSED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('CLOSED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_closed">' . __('Closed', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the registration start date is less than the current date
		elseif ($is_active && $regstart >= $now && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_NOT_OPEN', 'display' => '<span style="color: #090; font-weight:bold;">' . __('NOT_OPEN', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_not_open">' . __('Not Open', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the registration start date is less than the current date
		elseif ($is_active && $regstart <= $now && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_OPEN', 'display' => __('OPEN', 'event_espresso'), 'display_custom' => '<span class="espresso_open">' . __('Registration Open', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		/*		 * * End Check registration dates ** */

		//If the start date and time has passed, show as expired.
		elseif ($is_active && $start <= $now && $event_status != "D") {
			$event_status = array('status' => 'EXPIRED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('EXPIRED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_expired">' . __('Expired', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the start date and time has not passed, show as active.
		elseif ($is_active && $start >= $now && $event_status != "D") {
			$event_status = array('status' => 'ACTIVE', 'display' => '<span style="color: #090; font-weight:bold;">' . __('ACTIVE', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_active">' . __('Active', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is not active, show as Not Active
		elseif (!$is_active && $event_status != "D") {
			$event_status = array('status' => 'NOT_ACTIVE', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('NOT_ACTIVE', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_not_active">' . __('Not Active', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event was deleted, show as deleted
		elseif ($event_status == "D") {
			$event_status = array('status' => 'DELETED', 'display' => '<span style="color: #000; font-weight:bold;">' . __('DELETED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_deleted">' . __('Deleted', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}
	}

}

//This function returns the overall status of an event
if (!function_exists('event_espresso_get_status')) {

	function event_espresso_get_status($event_id, $event_meta = '') {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$event_status = event_espresso_get_is_active($event_id, $event_meta);
		switch ($event_status['status']) {
			case 'EXPIRED':
			case 'NOT_ACTIVE':
			case 'DELETED':
			case 'REGISTRATION_CLOSED':
			case 'DENIED':
				return 'NOT_ACTIVE';
				break;

			case 'PENDING':
			case 'DRAFT':
				return 'PENDING';
				break;

			case 'ACTIVE':
			case 'ONGOING':
			case 'SECONDARY':
			case 'REGISTRATION_OPEN':
				return 'ACTIVE';
				break;

			default:
				break;
		}
	}

}

/*
 * Display the amount of attendees and/or registration limit
 * Available parameters for the get_number_of_attendees_reg_limit() function
 *  @ $event_id - required
 *  @ $type -
 * 		available_spaces = returns the number of available spaces
 * 		num_attendees = returns the number of attendees
 * 		all_attendees = returns the number of all paid attendees
 * 		reg_limit = returns the total number of spaces
 * 		num_incomplete = returns the number of incomplete (non paid) registrations
 * 		num_completed = returns the number of completed (paid) registrations
 * 		num_completed_slash_incomplete = returns the number of completed and incomplete registrations separated by a slash (eg. 3/1)
 * 		num_attendees_slash_reg_limit = returns the number of attendees and the registration limit separated by a slash (eg. 4/30)
 * 	@ $full_text - the text to display when the event is full
 */
if (!function_exists('get_number_of_attendees_reg_limit')) {

	function get_number_of_attendees_reg_limit( $event_id, $type = 'NULL', $reg_limit = 999 ) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		global $wpdb;

		switch ($type) {

			case 'available_spaces' :
			case 'num_attendees' :
			case 'number_available_spaces' :
			case 'num_completed_slash_incomplete' :
			case 'num_attendees_slash_reg_limit' :
			case 'avail_spaces_slash_reg_limit' :		
				$num_attendees = EEM_Registration::instance()->get_event_registration_count( $event_id );
			//break;

			case 'reg_limit' :
			case 'available_spaces' :
			case 'number_available_spaces' :
			case 'avail_spaces_slash_reg_limit' :
			case 'num_attendees_slash_reg_limit' :
				$number_available_spaces = $reg_limit;
				if ($reg_limit > $num_attendees) {
					$number_available_spaces = $reg_limit - $num_attendees;
				}
			//break;

			case 'num_incomplete' :
			case 'num_completed_slash_incomplete' :
				$num_incomplete = EEM_Registration::instance()->get_event_registration_count( $event_id, TRUE );
			//break;
		}

		switch ($type) {
			case 'number_available_spaces' :
				return $number_available_spaces;
				break;
			case 'available_spaces' :
				if ($reg_limit >= 999) {
					$number_available_spaces = __('Unlimited', 'event_espresso');
				}
				return $number_available_spaces;
				break;
			case 'num_attendees' :
				return $num_attendees;
				break;
			case 'all_attendees' :
				$a_sql = "SELECT SUM(quantity) quantity  FROM " . EVENTS_ATTENDEE_TABLE . " WHERE quantity >= 1 ";
				$attendees = $wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $attendees[0]->quantity != NULL) {
					$num_attendees = $attendees[0]->quantity;
				}
				return $num_attendees;
				break;
			case 'reg_limit' :
				return $reg_limit;
				break;
			case 'num_incomplete' :
				return $num_incomplete;
				break;
			case 'num_completed' :
				$num_completed = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND (payment_status='Completed' OR payment_status='Pending')  ";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_completed = $wpdb->last_result[0]->quantity;
				}
				return $num_completed;
				break;
			case 'num_pending' :
				$num_pending = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND  payment_status='Pending'";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_pending = $wpdb->last_result[0]->quantity;
				}
				return $num_pending;
				break;
			case 'num_declined' :
				$num_declined = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND  payment_status='Payment Declined'";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_declined = $wpdb->last_result[0]->quantity;
				}
				return $num_declined;
				break;
			case 'num_completed_slash_incomplete' :
				return '<font color="green">' . $num_attendees . '</font>/<font color="red">' . $num_incomplete . '</font>';
				break;

			case 'avail_spaces_slash_reg_limit' :
				return $number_available_spaces . '/' . $reg_limit;
				break;
			case 'num_attendees_slash_reg_limit' :
			default:
				return $num_attendees . '/' . $reg_limit;
				break;
		}
	}

}





function espresso_registration_footer() {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');	
	$url = apply_filters( 'FHEE__registration_footer__url', 'http://eventespresso.com/' );
	$show_reg_footer = isset( $org_options['show_reg_footer'] ) ? $org_options['show_reg_footer'] : TRUE;
	$show_reg_footer = apply_filters( 'FHEE__registration_footer__show_reg_footer', $show_reg_footer );
	if ( $show_reg_footer ) {
		return '<p style="font-size: 12px;"><a href="' . $url . '" title="Event Registration Powered by Event Espresso" target="_blank">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress" target="_blank">Event Espresso</a></p>';
	}
}





//Function to include a template file. Checks user templates folder first, then default template.
if (!function_exists('event_espresso_require_file')) {

	/**
	 * event_espresso_require_file()
	 *
	 * @param mixed $template_file_name // Name of template file.
	 * @param mixed $path_first		 // First choice for file location.
	 * @param mixed $path_else		 // Fallback location for file.
	 * @param bool $must_exist		  // Error if neither file exist.
	 * @param bool $as_require_once	 // True for require_once(), False for require()
	 * @return void	// No return value. File already included.
	 *
	 * Usage: event_espresso_require_file('shopping_cart.php',EVENT_ESPRESSO_TEMPLATE_DIR,EVENT_ESPRESSO_PLUGINFULLPATH.'templates/')
	 */
	function event_espresso_require_file($template_file_name, $path_first, $path_else, $must_exist = true, $as_require_once = true) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, ' $template_file_name = ' . $template_file_name );
		if (file_exists($path_first . $template_file_name)) {
			// Use the template file in the user's upload folder
			$full_path = $path_first . $template_file_name;
		} else {
			// Use the system file path
			$full_path = $path_else . $template_file_name;
		}
		if (file_exists($full_path) || $must_exist) {
			($as_require_once == true) ? require_once($full_path) : require($full_path);
		}
	}

}






/**
 * 		load and display a template
 * 		This is a wrapper for the EE_Template::display_template helper.
 * 		@return 		void
 */
function espresso_display_template($path_to_file = FALSE, $template_args = FALSE, $return_string = FALSE) {
	//require the template helper 
	require_once(EE_HELPERS . 'EE_Template.helper.php');
	if ( $return_string )
		return EE_Template::display_template( $path_to_file, $template_args, $return_string );
	else
		EE_Template::display_template( $path_to_file, $template_args, $return_string );
}		

