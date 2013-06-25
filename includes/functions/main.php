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
 * 		Clear EE_Session data
 *
 * 		@access public
 * 		@return void
 */
function espresso_clear_session( $class = '', $func = '' ) {
	//echo '<h3>'. $class . ' -> ' . $func . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	global $EE_Session;
	$EE_Session->reset_data( 
			array(
						'cart',
						'gateway_data', 
						'transaction', 
						'registration',
						'primary_attendee',
						'tax_totals',
						'taxes',
						'billing_info',
						'txn_results',
						'grand_total_price_object'
					));
																
	$EE_Session->set_session_data(
			array(
						'_events_in_cart' => array(),
						'_cart_grand_total_qty' => 0,
						'_cart_grand_total_amount' => 0
					),
					'session_data'
	);

}
add_action( 'AHEE_before_event_list', 'espresso_clear_session', 10, 2 );





function getCountriesArray($lang = "en") {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	//first code, country_id
	//seconde code, country name
	//third code, ISO country id with two chars
	//fourth code, ISO country id with three chars
	//fifth code is for political zones, 2 is for european union, 1 for the rest of the world (for the moment)
	//sixth code is for currency symbol
	switch ($lang) {
		default: return array(
					array(0, __('No country selected', 'event_espresso'), '', '', 0),
					array(64, 'United States', 'US', 'USA', 1, '$'),
					array(15, 'Australia', 'AU', 'AUS', 1, 'A$'),
					array(39, 'Canada', 'CA', 'CAN', 1, 'C$'),
					array(171, 'United Kingdom', 'GB', 'GBR', 1, '&pound;'),
					array(70, 'France', 'FR', 'FRA', 2, '&euro;'),
					array(111, 'Italy', 'IT', 'ITA', 2, '&euro;'),
					array(63, 'Spain', 'ES', 'ESP', 2, '&euro;'),
					array(1, 'Afghanistan', 'AF', 'AFG', 1, '$'),
					array(2, 'Albania', 'AL', 'ALB', 1, '$'),
					array(3, 'Germany', 'DE', 'DEU', 2, '&euro;'),
					array(198, 'Switzerland', 'CH', 'CHE', 1, 'Fr.'),
					array(87, 'The Netherlands', 'NL', 'NLD', 2, '&euro;'),
					array(197, 'Sweden', 'SE', 'SWE', 1, 'kr'),
					array(230, 'Akrotiri and Dhekelia', 'CY', 'CYP', 2, '$'),
					array(4, 'Andorra', 'AD', 'AND', 2, '&euro;'),
					array(5, 'Angola', 'AO', 'AGO', 1, '$'),
					array(6, 'Anguilla', 'AI', 'AIA', 1, '$'),
					array(7, 'Antarctica', 'AQ', 'ATA', 1, '$'),
					array(8, 'Antigua and Barbuda', 'AG', 'ATG', 1, '$'),
					array(10, 'Saudi Arabia', 'SA', 'SAU', 1, '$'),
					array(11, 'Argelia', 'DZ', 'DZA', 1, '$'),
					array(12, 'Argentina', 'AR', 'ARG', 1, '$'),
					array(13, 'Armenia', 'AM', 'ARM', 1, '$'),
					array(14, 'Aruba', 'AW', 'ABW', 1, '$'),
					array(16, 'Austria', 'AT', 'AUT', 2, '&euro;'),
					array(17, 'Azerbaijan', 'AZ', 'AZE', 1, '$'),
					array(18, 'Bahamas', 'BS', 'BHS', 1, '$'),
					array(19, 'Bahrein', 'BH', 'BHR', 1, '$'),
					array(20, 'Bangladesh', 'BD', 'BGD', 1, '$'),
					array(21, 'Barbados', 'BB', 'BRB', 1, '$'),
					array(22, 'Belgium ', 'BE', 'BEL', 2, '&euro;'),
					array(23, 'Belize', 'BZ', 'BLZ', 1, '$'),
					array(24, 'Benin', 'BJ', 'BEN', 1, '$'),
					array(25, 'Bermudas', 'BM', 'BMU', 1, '$'),
					array(26, 'Belarus', 'BY', 'BLR', 1, '$'),
					array(27, 'Bolivia', 'BO', 'BOL', 1, '$'),
					array(28, 'Bosnia and Herzegovina', 'BA', 'BIH', 1, '$'),
					array(29, 'Botswana', 'BW', 'BWA', 1, '$'),
					array(96, 'Bouvet Island', 'BV', 'BVT', 1, '$'),
					array(30, 'Brazil', 'BR', 'BRA', 1, 'R$'),
					array(31, 'Brunei', 'BN', 'BRN', 1, '$'),
					array(32, 'Bulgaria', 'BG', 'BGR', 1, '$'),
					array(33, 'Burkina Faso', 'BF', 'BFA', 1, '$'),
					array(34, 'Burundi', 'BI', 'BDI', 1, '$'),
					array(35, 'Bhutan', 'BT', 'BTN', 1, '$'),
					array(36, 'Cape Verde', 'CV', 'CPV', 1, '$'),
					array(37, 'Cambodia', 'KH', 'KHM', 1, '$'),
					array(38, 'Cameroon', 'CM', 'CMR', 1, '$'),
					array(98, 'Cayman Islands', 'KY', 'CYM', 1, '$'),
					array(172, 'Central African Republic', 'CF', 'CAF', 1, '$'),
					array(40, 'Chad', 'TD', 'TCD', 1, '$'),
					array(41, 'Chile', 'CL', 'CHL', 1, '$'),
					array(42, 'China', 'CN', 'CHN', 1, '$'),
					array(105, 'Christmas Island', 'CX', 'CXR', 1, '$'),
					array(43, 'Cyprus', 'CY', 'CYP', 2, '&euro;'),
					array(99, 'Cocos Island', 'CC', 'CCK', 1, '$'),
					array(100, 'Cook Islands', 'CK', 'COK', 1, '$'),
					array(44, 'Colombia', 'CO', 'COL', 1, '$'),
					array(45, 'Comoros', 'KM', 'COM', 1, '$'),
					array(46, 'Congo', 'CG', 'COG', 1, '$'),
					array(47, 'Corea del Norte', 'KP', 'PRK', 1, '$'),
					array(50, 'Costa Rica', 'CR', 'CRI', 1, '$'),
					array(51, 'Croatia', 'HR', 'HRV', 1, '$'),
					array(52, 'Cuba', 'CU', 'CUB', 1, '$'),
					array(173, 'Czech Republic', 'CZ', 'CZE', 1, 'K&#x10D;'),
					array(53, 'Danmark', 'DK', 'DNK', 1, 'kr'),
					array(54, 'Djibouti', 'DJ', 'DJI', 1, '$'),
					array(55, 'Dominica', 'DM', 'DMA', 1, '$'),
					array(174, 'Dominican Republic', 'DO', 'DOM', 1, '$'),
					array(56, 'Ecuador', 'EC', 'ECU', 1, '$'),
					array(57, 'Egypt', 'EG', 'EGY', 1, '$'),
					array(58, 'El Salvador', 'SV', 'SLV', 1, '$'),
					array(60, 'Eritrea', 'ER', 'ERI', 1, '$'),
					array(61, 'Eslovakia', 'SK', 'SVK', 2, '&euro;'),
					array(62, 'Eslovenia', 'SI', 'SVN', 2, '&euro;'),
					array(65, 'Estonia', 'EE', 'EST', 2, '&euro;'),
					array(66, 'Ethiopia', 'ET', 'ETH', 1, '$'),
					array(102, 'Faroe islands', 'FO', 'FRO', 1, '$'),
					array(103, 'Falkland Islands', 'FK', 'FLK', 1, '$'),
					array(67, 'Fiji', 'FJ', 'FJI', 1, '$'),
					array(69, 'Finland', 'FI', 'FIN', 2, '&euro;'),
					array(71, 'Gabon', 'GA', 'GAB', 1, '$'),
					array(72, 'Gambia', 'GM', 'GMB', 1, '$'),
					array(73, 'Georgia', 'GE', 'GEO', 1, '$'),
					array(74, 'Ghana', 'GH', 'GHA', 1, '$'),
					array(75, 'Gibraltar', 'GI', 'GIB', 1, '$'),
					array(76, 'Greece', 'GR', 'GRC', 2, '&euro;'),
					array(77, 'Grenada', 'GD', 'GRD', 1, '$'),
					array(78, 'Greenland', 'GL', 'GRL', 1, '$'),
					array(79, 'Guadeloupe', 'GP', 'GLP', 1, '$'),
					array(80, 'Guam', 'GU', 'GUM', 1, '$'),
					array(81, 'Guatemala', 'GT', 'GTM', 1, '$'),
					array(82, 'Guinea', 'GN', 'GIN', 1, '$'),
					array(83, 'Equatorial Guinea', 'GQ', 'GNQ', 1, '$'),
					array(84, 'Guinea-Bissau', 'GW', 'GNB', 1, '$'),
					array(85, 'Guyana', 'GY', 'GUY', 1, '$'),
					array(86, 'Haiti', 'HT', 'HTI', 1, '$'),
					array(88, 'Honduras', 'HN', 'HND', 1, '$'),
					array(89, 'Hong Kong', 'HK', 'HKG', 1, 'HK$'),
					array(90, 'Hungary', 'HU', 'HUN', 1, 'Ft'),
					array(91, 'India', 'IN', 'IND', 1, '&#x20b9;'),
					array(205, 'British Indian Ocean Territory', 'IO', 'IOT', 1, '$'),
					array(92, 'Indonesia', 'ID', 'IDN', 1, '$'),
					array(93, 'Iraq', 'IQ', 'IRQ', 1, '$'),
					array(94, 'Iran', 'IR', 'IRN', 1, '$'),
					array(95, 'Ireland', 'IE', 'IRL', 2, '&euro;'),
					array(97, 'Iceland', 'IS', 'ISL', 1, '$'),
					array(110, 'Israel', 'IL', 'ISR', 1, '&#8362;'),
					array(49, 'Ivory Coast ', 'CI', 'CIV', 1, '$'),
					array(112, 'Jamaica', 'JM', 'JAM', 1, '$'),
					array(113, 'Japan', 'JP', 'JPN', 1, '&yen;'),
					array(114, 'Jordan', 'JO', 'JOR', 1, '$'),
					array(115, 'Kazakhstan', 'KZ', 'KAZ', 1, '$'),
					array(116, 'Kenya', 'KE', 'KEN', 1, '$'),
					array(117, 'Kirguistan', 'KG', 'KGZ', 1, '$'),
					array(118, 'Kiribati', 'KI', 'KIR', 1, '$'),
					array(48, 'South Korea', 'KR', 'KOR', 1, '$'),
					array(228, 'Kosovo', 'XK', 'XKV', 2, '&euro;'), // there is no official ISO code for Kosovo yet (http://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) so using a temporary country code and a modified 3 character code for ISO code -- this should be updated if/when Kosovo gets its own ISO code
					array(119, 'Kuwait', 'KW', 'KWT', 1, '$'),
					array(120, 'Laos', 'LA', 'LAO', 1, '$'),
					array(121, 'Latvia', 'LV', 'LVA', 2, '$'),
					array(122, 'Lesotho', 'LS', 'LSO', 1, '$'),
					array(123, 'Lebanon', 'LB', 'LBN', 1, '$'),
					array(124, 'Liberia', 'LR', 'LBR', 1, '$'),
					array(125, 'Libya', 'LY', 'LBY', 1, '$'),
					array(126, 'Liechtenstein', 'LI', 'LIE', 1, '$'),
					array(127, 'Lithuania', 'LT', 'LTU', 2, '$'),
					array(128, 'Luxemburg', 'LU', 'LUX', 2, '&euro;'),
					array(129, 'Macao', 'MO', 'MAC', 1, '$'),
					array(130, 'Macedonia', 'MK', 'MKD', 1, '$'),
					array(131, 'Madagascar', 'MG', 'MDG', 1, '$'),
					array(132, 'Malaysia', 'MY', 'MYS', 1, 'RM'),
					array(133, 'Malawi', 'MW', 'MWI', 1, '$'),
					array(134, 'Maldivas', 'MV', 'MDV', 1, '$'),
					array(135, 'Mali', 'ML', 'MLI', 1, '$'),
					array(136, 'Malta', 'MT', 'MLT', 2, '&euro;'),
					array(101, 'Northern Marianas', 'MP', 'MNP', 1, '$'),
					array(137, 'Marruecos', 'MA', 'MAR', 1, '$'),
					array(104, 'Marshall islands', 'MH', 'MHL', 1, '$'),
					array(138, 'Martinica', 'MQ', 'MTQ', 1, '$'),
					array(139, 'Mauricio', 'MU', 'MUS', 1, '$'),
					array(140, 'Mauritania', 'MR', 'MRT', 1, '$'),
					array(141, 'Mayote', 'YT', 'MYT', 2, '&euro;'),
					array(142, 'Mexico', 'MX', 'MEX', 1, 'Mex$'),
					array(143, 'Micronesia', 'FM', 'FSM', 1, '$'),
					array(144, 'Moldova', 'MD', 'MDA', 1, '$'),
					array(145, 'Monaco', 'MC', 'MCO', 2, '&euro;'),
					array(146, 'Mongolia', 'MN', 'MNG', 1, '$'),
					array(147, 'Montserrat', 'MS', 'MSR', 1, '$'),
					array(227, 'Montenegro', 'ME', 'MNE', 2, '&euro;'),
					array(148, 'Mozambique', 'MZ', 'MOZ', 1, '$'),
					array(149, 'Myanmar', 'MM', 'MMR', 1, '$'),
					array(150, 'Namibia', 'NA', 'NAM', 1, '$'),
					array(151, 'Nauru', 'NR', 'NRU', 1, '$'),
					array(152, 'Nepal', 'NP', 'NPL', 1, '$'),
					array(9, 'Netherlands Antilles', 'AN', 'ANT', 1, '$'),
					array(153, 'Nicaragua', 'NI', 'NIC', 1, '$'),
					array(154, 'Niger', 'NE', 'NER', 1, '$'),
					array(155, 'Nigeria', 'NG', 'NGA', 1, '$'),
					array(156, 'Niue', 'NU', 'NIU', 1, '$'),
					array(157, 'Norway', 'NO', 'NOR', 1, 'kr'),
					array(158, 'New Caledonia', 'NC', 'NCL', 1, '$'),
					array(159, 'New Zealand', 'NZ', 'NZL', 1, 'NZ$'),
					array(160, 'Oman', 'OM', 'OMN', 1, '$'),
					array(161, 'Pakistan', 'PK', 'PAK', 1, '$'),
					array(162, 'Palau', 'PW', 'PLW', 1, '$'),
					array(163, 'Panama', 'PA', 'PAN', 1, '$'),
					array(164, 'Papua New Guinea', 'PG', 'PNG', 1, '$'),
					array(165, 'Paraguay', 'PY', 'PRY', 1, '$'),
					array(166, 'Peru', 'PE', 'PER', 1, '$'),
					array(68, 'Philippines', 'PH', 'PHL', 1, '&#x20b1;'),
					array(167, 'Poland', 'PL', 'POL', 1, 'z&#x0142;'),
					array(168, 'Portugal', 'PT', 'PRT', 2, '&euro;'),
					array(169, 'Puerto Rico', 'PR', 'PRI', 1, '$'),
					array(170, 'Qatar', 'QA', 'QAT', 1, '$'),
					array(176, 'Rowanda', 'RW', 'RWA', 1, '$'),
					array(177, 'Romania', 'RO', 'ROM', 2, '$'),
					array(178, 'Russia', 'RU', 'RUS', 1, '$'),
					array(229, 'Saint Pierre and Miquelon', 'PM', 'SPM', 2, '&euro;'),
					array(180, 'Samoa', 'WS', 'WSM', 1, '$'),
					array(181, 'American Samoa', 'AS', 'ASM', 1, '$'),
					array(183, 'San Marino', 'SM', 'SMR', 2, '&euro;'),
					array(184, 'San Vincente y las Granadinas', 'VC', 'VCT', 1, '$'),
					array(185, 'Santa Helena', 'SH', 'SHN', 1, '$'),
					array(186, 'Santa Lucia', 'LC', 'LCA', 1, '$'),
					array(188, 'Senegal', 'SN', 'SEN', 1, '$'),
					array(189, 'Seychelles', 'SC', 'SYC', 1, '$'),
					array(190, 'Sierra Leona', 'SL', 'SLE', 1, '$'),
					array(191, 'Singapore', 'SG', 'SGP', 1, 'S$'),
					array(192, 'Syria', 'SY', 'SYR', 1, '$'),
					array(193, 'Somalia', 'SO', 'SOM', 1, '$'),
					array(194, 'Sri Lanka', 'LK', 'LKA', 1, '$'),
					array(195, 'South Africa', 'ZA', 'ZAF', 1, 'R'),
					array(196, 'Sudan', 'SD', 'SDN', 1, '$'),
					array(199, 'Suriname', 'SR', 'SUR', 1, '$'),
					array(200, 'Swaziland', 'SZ', 'SWZ', 1, '$'),
					array(201, 'Thailand', 'TH', 'THA', 1, '&#xe3f;'),
					array(202, 'Taiwan', 'TW', 'TWN', 1, 'NT$'),
					array(203, 'Tanzania', 'TZ', 'TZA', 1, '$'),
					array(204, 'Tajikistan', 'TJ', 'TJK', 1, '$'),
					array(206, 'Timor Oriental', 'TP', 'TMP', 1, '$'),
					array(207, 'Togo', 'TG', 'TGO', 1, '$'),
					array(208, 'Tokelau', 'TK', 'TKL', 1, '$'),
					array(209, 'Tonga', 'TO', 'TON', 1, '$'),
					array(210, 'Trinidad and Tobago', 'TT', 'TTO', 1, '$'),
					array(211, 'Tunisia', 'TN', 'TUN', 1, '$'),
					array(212, 'Turkmenistan', 'TM', 'TKM', 1, '$'),
					array(213, 'Turkey', 'TR', 'TUR', 1, 'TL'),
					array(214, 'Tuvalu', 'TV', 'TUV', 1, '$'),
					array(215, 'Ukraine', 'UA', 'UKR', 1, '$'),
					array(216, 'Uganda', 'UG', 'UGA', 1, '$'),
					array(59, 'United Arab Emirates', 'AE', 'ARE', 1, '$'),
					array(217, 'Uruguay', 'UY', 'URY', 1, '$'),
					array(218, 'Uzbekistan', 'UZ', 'UZB', 1, '$'),
					array(219, 'Vanuatu', 'VU', 'VUT', 1, '$'),
					array(220, 'Vatican City', 'VA', 'VAT', 2, '&euro;'),
					array(221, 'Venezuela', 'VE', 'VEN', 1, '$'),
					array(222, 'Vietnam', 'VN', 'VNM', 1, '$'),
					array(108, 'Virgin Islands', 'VI', 'VIR', 1, '$'),
					array(223, 'Yemen', 'YE', 'YEM', 1, '$'),
					array(224, 'Yugoslavia', 'YU', 'YUG', 1, '$'),
					array(225, 'Zambia', 'ZM', 'ZMB', 1, '$'),
					array(226, 'Zimbabwe', 'ZW', 'ZWE', 1, '$'));
	}
}

function getCountryZoneId($country_id) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	//1 for the rest of the world
	//2 is for european union
	$countries = getCountriesArray();
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($country_id == $countries[$t][0])
			return $countries[$t][4];
	return 0;
}

function getCountryName($id, $lang = "en") {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$countries = getCountriesArray($lang);
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($id == $countries[$t][0])
			return $countries[$t][1];
	return __('No country selected', 'event_espresso');
}

function getCountryFullData($id, $lang = "en") {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$countries = getCountriesArray($lang);
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($id == $countries[$t][0])
			return array('id' => $countries[$t][0],
					'title' => $countries[$t][1],
					'iso_code_2' => $countries[$t][2],
					'iso_code_3' => $countries[$t][3],
					'currency_symbol' => $countries[$t][5]);

	return array('id' => '0',
			'title' => __('No country selected', 'event_espresso'),
			'iso_code_2' => '',
			'iso_code_3' => '');
}

function printCountriesSelector($name, $selected) {
	do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	$selected = intval($selected);
	$countries = getCountriesArray("en");

	echo "<select name='" . $name . "'>";
	for ($t = 0; $t < sizeof($countries); $t++) {
		echo "<option ";
		if ($selected == $countries[$t][0])
			echo " selected='selected' ";
		echo "value='" . $countries[$t][0] . "'>" . $countries[$t][1] . "</option>";
	}
	echo "</select>";
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

