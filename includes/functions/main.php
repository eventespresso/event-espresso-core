<?php

//Function to check if an array is empty
function isEmptyArray($array) {
	$my_not_empty = create_function('$v', 'return strlen($v) > 0;');
	return (count(array_filter($array, $my_not_empty)) == 0) ? 1 : 0;
}

function espresso_edit_attendee($registration_id, $attendee_id, $event_id=0, $type='', $text='') {
	global $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	$html = '';
	if ($text == '')
		$text = __('Edit Attendee', 'event_espresso');
	switch ($type) {
		case'admin':
			$html .= '<a href="' . get_admin_url() . 'admin.php?page=attendees&event_admin_reports=edit_attendee_record&event_id=' . $event_id . '&form_action=edit_attendee&id=' . $attendee_id . '&registration_id=' . $registration_id . '">' . $text . '</a>';
			break;
		case'attendee':
		default:
			$array = array('r_id' => $registration_id, 'id' => $attendee_id, 'event_id' => $event_id, 'edit_attendee' => 'true', 'single' => 'true');
			$url = add_query_arg($array, get_permalink($org_options['event_page_id']));
			$html .= '<a  href="' . $url . '" target="_blank" id="espresso_edit_attendee_' . $attendee_id . '" class="espresso_edit_attendee" title="' . __('Edit Attendee Details', 'event_espresso') . '">' . $text . '</a>';
			//$html .= '<a  href="' . home_url() . '?page_id=' . $org_options['event_page_id'] . '&registration_id=' . $registration_id . '&amp;id=' . $attendee_id . '&amp;regevent_action=register&form_action=edit_attendee&single=true" target="_blank" id="espresso_edit_attendee_' . $attendee_id . '" class="espresso_edit_attendee" title="' . __('Edit Attendee Details', 'event_espresso') . '">' . $text . '</a>';
			break;
	}
	return $html;
}

function espresso_invoice_url($attendee_id, $registration_id, $extra = '') {
	$extra = empty($extra) ? '' : '&amp;' . $extra;
	return home_url() . '/?invoice_launch=true&amp;id=' . $attendee_id . '&amp;r_id=' . $registration_id . '&amp;html=true' . $extra;
}

function espresso_reg_url($event_slug=0) {
	global $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	if ( $event_slug!= '' ) {
		//return espresso_getTinyUrl(home_url().'/?page_id='.$org_options['event_page_id'].'&regevent_action=register&event_id='.$event_id);
		//$new_url = add_query_arg('ee', $event_id, get_permalink($org_options['event_page_id']));
		
		// check if permalinks are being used
		if ( get_option('permalink_structure') != '' ) {
			// create pretty permalink
			$new_url = get_permalink($org_options['event_page_id']) . $event_slug;	
		} else {
			// use fugly oldsckool link
			$new_url = add_query_arg( 'event_slug', $event_slug, get_permalink($org_options['event_page_id']) );	
		}
			
		return $new_url;
	}/* else {
	  echo 'No event id supplied'; */
	return;
	//}
}

function espresso_get_reg_page_url_slug() {
	global $wpdb, $org_options;		
	$reg_page_id = $org_options['event_page_id'];
	$SQL = 'SELECT post_name  FROM '.$wpdb->prefix .'posts WHERE ID = %d';
	$reg_page_url_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $reg_page_id ));
	return $reg_page_url_slug;
}

function espresso_get_reg_page_url() {
	global $org_options;
	$reg_page_url = get_permalink($org_options['event_page_id']);
	return $reg_page_url;
}



function espresso_getTinyUrl($url) {
	return file_get_contents("http://tinyurl.com/api-create.php?url=" . $url);
}

//Text formatting function.
//This should fix all of the formatting issues of text output from the database.
function espresso_format_content($content='') {
	return wpautop(stripslashes_deep(html_entity_decode(do_shortcode($content), ENT_QUOTES, "UTF-8")));
}

//This function pulls HTML entities back into HTML format first then strips it.
//Use it if you want to strip the HTML from the event_desc column in the daatabase.
//I have to store HTML as special chars in the database, because the html was breaking the sql queries.
//I tried doing add_slashes, then strip_slashes, but it kept adding to many slashes and not removing the extras. It was a nightmare so i decided to jsut make all HTML into special chars.
function event_espresso_strip_html_from_entity($html_entity) {
	$stripped_html_entity = strip_tags(html_entity_decode($html_entity));
	return $stripped_html_entity;
}

/* 	This function checks a registration id to see if their session is registered more than once, if so, it returns the session id	 */

function event_espresso_more_than_one($registration_id) {
	global $wpdb;
	$sql = "SELECT a.attendee_session FROM " . EVENTS_ATTENDEE_TABLE . " a JOIN " . EVENTS_ATTENDEE_TABLE . " b ON b.attendee_session = a.attendee_session WHERE b.registration_id='" . $registration_id . "' GROUP BY a.id";
	$res = $wpdb->get_results($sql);
	if ($wpdb->num_rows > 1) {
		$attendee_session = $wpdb->get_var($sql . " ORDER BY a.id LIMIT 1 ");
		return $attendee_session;
	}
	return null;
}

//This function is not currently used
function event_espresso_session_start() {
	/* if(!isset($_SESSION['event_espresso_sessionid'])){
	  $sessionid = (mt_rand(100,999).time());
	  $_SESSION['event_espresso_sessionid'] = $sessionid;
	  } */
	//print_r( $_SESSION['event_espresso_sessionid']); //See if the session already exists
}

//This function just returns the session id.
function event_espresso_session_id() {
	if (!isset($_SESSION['espresso_session']['id'])) {
		$sessionid = (mt_rand(100, 999) . time());
		$_SESSION['espresso_session']['id'] = $sessionid;
	}
	return $_SESSION['espresso_session']['id'];
}

//This function just returns the session id.
function espresso_reg_sessionid($registration_id) {
	/* if(empty($_SESSION['espresso_reg_sessionid'])){
	  $sessionid =  $registration_id;
	  //$sessionid = (mt_rand(100,999).time());
	  $_SESSION['espresso_reg_sessionid'] = $sessionid;
	  }
	  return $_SESSION['espresso_reg_sessionid']; */
}

//Function to display additional attendee fields.
function event_espresso_get_event_meta($event_id) {
	global $wpdb;
	$event_meta = array();
	$sql = "SELECT event_meta  FROM " . EVENTS_DETAIL_TABLE . " e WHERE e.id = '" . $event_id . "' LIMIT 0,1";
	if ($wpdb->get_results($sql)) {
		$events = $wpdb->get_results($sql);
		foreach ($events as $event) {
			$event_meta = $event->event_meta;
			$event_meta = unserialize($event_meta);
		}
	}
	return $event_meta;
}

function espresso_display_additional_attendees() {
	$html = '<p class="event_form_field additional_header" id="additional_header">';
	$html .= '<a onclick="return false;" href="#">' . __('Add More Attendees? (click to toggle, limit ', 'event_espresso');
}

if (!function_exists('event_espresso_additional_attendees')) {

	function event_espresso_additional_attendees($event_id=0, $additional_limit=2, $available_spaces=999, $label='', $show_label = true, $event_meta = '') {
		$event_id = $event_id == 0 ? $_REQUEST['event_id'] : $event_id;

		if ($event_meta == '' && ($event_id != '' || $event_id != 0)) {
			$event_meta = event_espresso_get_event_meta($event_id);
		}
		$i = 0;
		if ($event_meta['additional_attendee_reg_info'] == 1) {
			$label = $label == '' ? __('Number of Tickets', 'event_espresso') : $label;
			$html = '<span class="espresso_additional_limit">';
			$html .= $show_label == true ? '<label for="num_people">' . $label . '</label>' : '';
			$html .= '<select name="num_people" id="num_people-' . $event_id . '" style="width:70px;">';
			while (($i <= $additional_limit) && ($i < $available_spaces)) {
				$i++;
				$html .= '<option value="' . $i . '">' . $i . '</option>';
			}
			$html .= '</select>';
			//$html .= '<br />';
			$html .= '<input type="hidden" name="espresso_addtl_limit_dd" value="true">';
			$html .= '</span>';
			$buffer = '';
		} else {
			while (($i <= $additional_limit) && ($i < $available_spaces)) {
				$i++;
			}
			$i = $i - 1;
			$html = '<p class="event_form_field additional_header" id="additional_header">';
			// fixed for translation string, previous string untranslatable - http://events.codebasehq.com/projects/event-espresso/tickets/11
			//$html .= '<a onclick="return false;" href="#">' . __('Add More Attendees? (click to toggle, limit ' . $i . ')', 'event_espresso') . '</a>';
			$html .= '<a onclick="return false;" href="#">' . __('Add More Attendees? (click to toggle, limit ', 'event_espresso');
			$html .= $i . ')</a>';
			$html .= '</p>';
			$html .= '<div id="additional_attendees">';
			$html .= '<div class="clone espresso_add_attendee">';
			/*
			 * Added for seating chart addon
			 */
			if (defined('ESPRESSO_SEATING_CHART')) {
				if (seating_chart::check_event_has_seating_chart($_REQUEST['event_id']) !== false) {
					$html .= '<p>';
					$html .= '<label>' . __('Select a Seat:', 'event_espresso') . '</label>';
					$html .= '<input type="text" name="x_seat_id[]" value="" class="ee_s_select_seat" event_id="' . $_REQUEST['event_id'] . '" readonly="readonly" />';
					$html .= '<br/>[' . __('If you do not select a seat this attendee will not be added', 'event_espresso') . ']';
					$html .= '</p>';
				}
			}
			if ($event_meta['additional_attendee_reg_info'] == 2) {
				$html .= '<p>';
				$html .= '<label for="x_attendee_fname">' . __('First Name:', 'event_espresso') . '</label>';
				$html .= '<input type="text" name="x_attendee_fname[]" class="input"/>';
				$html .= '</p>';
				$html .= '<p>';
				$html .= '<label for="x_attendee_lname">' . __('Last Name:', 'event_espresso') . '</label>';
				$html .= '<input type="text" name="x_attendee_lname[]" class="input"/>';
				$html .= '</p>';
				$html .= '<p>';
				$html .= '<label for="x_attendee_email">' . __('Email:', 'event_espresso') . '</label>';
				$html .= '<input type="text" name="x_attendee_email[]" class="input"/>';
				$html .= '</p>';
			} else {
				$html .= event_espresso_add_question_groups($event_meta['add_attendee_question_groups'], '', null, 0, array("x_attendee" => true));
			}
			$html .= '<a href="#" class="add" rel=".clone" title="' . __('Add an Additonal Attendee', 'event_espresso') . '"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/add.png" alt="' . __('Add an Additonal Attendee', 'event_espresso') . '" /></a>';
			$html .= '</div>';
			$html .= '<hr />';
			$html .= '</div>';
			ob_start();
			?>
			<script type="text/javascript">$jaer = jQuery.noConflict();jQuery(document).ready(function($jaer) { $jaer(function(){var removeLink = '<a style="" class="remove" href="#" onclick="$jaer(this).parent().slideUp(function(){ $jaer(this).remove() }); return false"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL . "images/icons/remove.gif"; ?>" alt="<?php _e('Remove Attendee', 'event_espresso'); ?>" /></a>';$jaer('a.add').relCopy({limit: <?php echo $i; ?>, append: removeLink});$jaer("#additional_attendees").hide();/*toggle the componenet with class msg_body*/$jaer("#additional_header").click(function(){$jaer(this).next("#additional_attendees").slideToggle(500);});});});</script>
			<?php
			$buffer = ob_get_contents();
			ob_end_clean();
		}
		return $html . $buffer;
	}

}

//This function returns the condition of an event
if (!function_exists('event_espresso_get_is_active')) {

	function event_espresso_get_is_active($event_id, $event_meta='') {
		global $wpdb, $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		//If the timezome is set in the wordpress database, then lets use it as the default timezone.
		if (get_option('timezone_string') != '') {
			date_default_timezone_set(get_option('timezone_string'));
		}

		if (!empty($event_meta)) {

			$is_active = empty($event_meta['is_active']) ? '' : $event_meta['is_active'];
			$event_status = empty($event_meta['event_status']) ? '' : $event_meta['event_status'];

			$start_time = empty($event_meta['start_time']) ? '' : $event_meta['start_time'];
			$start_date = empty($event_meta['start_date']) ? '' : $event_meta['start_date'];

			$registration_start = empty($event_meta['registration_start']) ? '' : $event_meta['registration_start'];
			$registration_startT = empty($event_meta['registration_startT']) ? '' : $event_meta['registration_startT'];

			$registration_end = empty($event_meta['registration_end']) ? '' : $event_meta['registration_end'];
			$registration_endT = empty($event_meta['registration_endT']) ? '' : $event_meta['registration_endT'];

			$registration_start = $registration_start . " " . $registration_startT;
			$registration_end = $registration_end . " " . $registration_endT;
		} else {
			$sql = "SELECT e.id, e.start_date start_date, e.is_active is_active, e.event_status event_status, e.registration_start, e.registration_startT, e.registration_end, e.registration_endT, ese.start_time start_time ";
			$sql .= "FROM " . EVENTS_DETAIL_TABLE . " e ";
			$sql .= "LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";
			$sql .= "WHERE e.id = '" . $event_id . "' LIMIT 0,1";
			$events = $wpdb->get_results($sql);
			$start_date = $wpdb->last_result[0]->start_date;
			$is_active = $wpdb->last_result[0]->is_active;
			$event_status = $wpdb->last_result[0]->event_status;
			$start_time = $wpdb->last_result[0]->start_time;

			$registration_start = $wpdb->last_result[0]->registration_start . " " . $wpdb->last_result[0]->registration_startT;
			$registration_end = $wpdb->last_result[0]->registration_end . " " . $wpdb->last_result[0]->registration_endT;
		}

		$timestamp = strtotime($start_date . ' ' . $start_time); //Creates a timestamp from the event start date and start time
		$registration_start_timestamp = strtotime($registration_start); //Creates a timestamp from the event registration start date
		$registration_end_timestamp = strtotime($registration_end); //Creates a timestamp from the event registration start date

		if ($is_active == "Y" && $event_status == "O") {
			$event_status = array('status' => 'ONGOING', 'display' => '<span style="color: #090; font-weight:bold;">' . __('ONGOING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_ongoing">' . __('Ongoing', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a secondary event, show as waitlist
		elseif ($is_active == "Y" && $event_status == "S") {
			$event_status = array('status' => 'SECONDARY', 'display' => '<span style="color: #090; font-weight:bold;">' . __('WAITLIST', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_secondary">' . __('Waitlist', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a waitlist/secondary event, show as waitlist
		elseif ($is_active == "Y" && $event_status == "R") {
			$event_status = array('status' => 'DRAFT', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('DRAFT', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_draft">' . __('Draft', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a pending event, show as pending
		elseif ($is_active == "Y" && $event_status == "P") {
			$event_status = array('status' => 'PENDING', 'display' => '<span style="color: #ff8400; font-weight:bold;">' . __('PENDING', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_pending">' . __('Pending', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is a denied event, show as denied
		elseif ($is_active == "Y" && $event_status == "X") {
			$event_status = array('status' => 'DENIED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('DENIED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_denied">' . __('Denied', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		/*		 * * Check registration dates ** */

		//If the registration end date is greater than the current date
		elseif ($is_active == "Y" && date($registration_end_timestamp) <= date(time()) && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_CLOSED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('CLOSED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_closed">' . __('Closed', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the registration start date is less than the current date
		elseif ($is_active == "Y" && date($registration_start_timestamp) >= date(time()) && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_NOT_OPEN', 'display' => '<span style="color: #090; font-weight:bold;">' . __('NOT_OPEN', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_not_open">' . __('Not Open', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the registration start date is less than the current date
		elseif ($is_active == "Y" && date($registration_start_timestamp) <= date(time()) && $event_status != "D") {
			$event_status = array('status' => 'REGISTRATION_OPEN', 'display' => '<span style="color: #090; font-weight:bold;">' . __('OPEN', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_open">' . __('Open', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		/*		 * * End Check registration dates ** */

		//If the start date and time has passed, show as expired.
		elseif ($is_active == "Y" && date($timestamp) <= date(time()) && $event_status != "D") {
			$event_status = array('status' => 'EXPIRED', 'display' => '<span style="color: #F00; font-weight:bold;">' . __('EXPIRED', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_expired">' . __('Expired', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//If the start date and time has not passed, show as active.
		elseif ($is_active == "Y" && date($timestamp) >= date(time()) && $event_status != "D") {
			$event_status = array('status' => 'ACTIVE', 'display' => '<span style="color: #090; font-weight:bold;">' . __('ACTIVE', 'event_espresso') . '</span>', 'display_custom' => '<span class="espresso_active">' . __('Active', 'event_espresso') . '</span>');
			//print_r( $event_status);
			return $event_status;
		}

		//IF the event is not active, show as Not Active
		elseif ($is_active == "N" && $event_status != "D") {
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

	function event_espresso_get_status($event_id, $event_meta='') {
		$event_status = event_espresso_get_is_active($event_id, $event_meta);
		switch ($event_status['status']) {
			case 'EXPIRED':
			case 'NOT_ACTIVE':
			case 'DELETED':
			case 'REGISTRATION_CLOSED':
			case 'DENIED':
				//case 'REGISTRATION_NOT_OPEN':
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

if (!function_exists('espresso_status_detail')) {

	function espresso_status_detail($event_id) {

	}

}
/* Formats the event address */
if (!function_exists('event_espresso_format_address')) {

	function event_espresso_format_address($event_address) {
		$event_address = str_replace(array("\r\n", "\n", "\r"), "<br>", $event_address);
		return $event_address;
	}

}

//Function for merging arrrays
function event_espresso_array_merge($array1, $array2) {
	$result = array_merge($array1, $array2);
	return $result;
}

// Append associative array elements
function event_espresso_array_push_associative(&$arr) {
	$args = func_get_args();
	foreach ($args as $arg) {
		if (is_array($arg)) {
			foreach ($arg as $key => $value) {
				$arr[$key] = $value;
			}
		} else {
			$arr[$arg] = "";
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

	function get_number_of_attendees_reg_limit($event_id, $type = 'NULL', $full_text = 'EVENT FULL') {
		global $wpdb;

		switch ($type) {

			case 'available_spaces' :
			case 'num_attendees' :
			case 'number_available_spaces' :
			case 'num_completed_slash_incomplete' :
			case 'num_attendees_slash_reg_limit' :
			case 'avail_spaces_slash_reg_limit' :
				$num_attendees = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND (payment_status='Completed' OR payment_status='Pending') ";
				$wpdb->get_results($a_sql, ARRAY_A);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_attendees = $wpdb->last_result[0]->quantity;
				}
			//break;

			case 'reg_limit' :
			case 'available_spaces' :
			case 'number_available_spaces' :
			case 'avail_spaces_slash_reg_limit' :
			case 'num_attendees_slash_reg_limit' :
				$number_available_spaces = 0;
				$sql_reg_limit = "SELECT reg_limit FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "'";
				$reg_limit = $wpdb->get_var($sql_reg_limit);
				if (empty($num_attendees))
					$num_attendees = 0;
				if ($reg_limit > $num_attendees) {
					$number_available_spaces = $reg_limit - $num_attendees;
				}
			//break;

			case 'num_incomplete' :
			case 'num_completed_slash_incomplete' :
				$num_incomplete = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND payment_status='Incomplete'";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_incomplete = $wpdb->last_result[0]->quantity;
				}
			//break;
		}

		switch ($type) {
			case 'number_available_spaces' :
				return $number_available_spaces;
				break;
			case 'available_spaces' :
				if ($reg_limit >= 999) {
					$number_available_spaces = "Unlimited";
				}
				return $number_available_spaces;
				break;
			case 'num_attendees' :
				return $num_attendees;
				break;
			case 'all_attendees' :
				$a_sql = "SELECT SUM(quantity) quantity  FROM " . EVENTS_ATTENDEE_TABLE . " WHERE quantity >= 1 ";
				$attendees = $wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_attendees = $wpdb->last_result[0]->quantity;
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

function event_espresso_update_alert($url='') {
	return wp_remote_retrieve_body(wp_remote_get($url));
}

function espresso_registration_footer() {
	global $espresso_premium, $org_options;
	$url = (!isset($org_options['affiliate_id']) || $org_options['affiliate_id'] == '' || $org_options['affiliate_id'] == 0) ? 'http://eventespresso.com/' : 'https://www.e-junkie.com/ecom/gb.php?cl=113214&c=ib&aff=' . $org_options['affiliate_id'];
	if ($espresso_premium != true || (isset($org_options['show_reg_footer']) && $org_options['show_reg_footer'] == 'Y')) {
		return '<p style="font-size: 12px;"><a href="' . $url . '" title="Event Registration Powered by Event Espresso" target="_blank">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress" target="_blank">Event Espresso</a></p>';
	}
}

//Gets the current page url. Used for redirecting back to a page
function event_espresso_cur_pageURL() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . $_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}

//This function simply returns a custom capability, nothing else. Can be used to change admin capability of the Event Manager menu without the admin losing rights to certain menus. Should be used with the custom files addon. Credit goes to Justin Tadlock (http://justintadlock.com/archives/2009/09/18/custom-capabilities-in-plugins-and-themes)
if (!function_exists('event_espresso_management_capability')) {

	function event_espresso_management_capability($default, $custom) {
		return $custom;
	}

	add_filter('event_espresso_management_capability', 'event_espresso_management_capability', 10, 3);
}

function espresso_display_questions($questions, $attendee) {
	if (get_option('events_members_active') == 'true') {
		global $current_user;
		global $user_email;
		require_once(EVENT_ESPRESSO_MEMBERS_DIR . "user_vars.php"); //Load Members functions
		$userid = $current_user->ID;
		$member_options = get_option('events_member_settings');
	}
	$html = '';
	foreach ($questions[$attendee] as $group) {
		$html .= '<div class="event_questions" id="' . $group['group_identifier'] . '">';
		if ($group['show_group_name'] != 0) {
			$html .= "<h4 class=\"reg-quest-title section-title\">" . $group['group_name'] . "</h4>";
		}
		if ($group['show_group_description'] != 0 && !empty($group['group_description'])) {
			$html .= "<p class='quest-group-descript'>" . $group['group_description'] . "</p>";
		}
		foreach ($group['question'] as $question) {
			if ($question['required'] == "Y") {
				if (!empty($question['required_text'])) {
					$required_text = $question['required_text'];
				} else {
					$required_text = '';
				}
				$email_validate = $question['system_name'] == 'email' ? 'email' : '';
				$required = ' title="' . $required_text . '" class="required ' . $email_validate;
				$required .= ' myclass';
				$required_label = "<em>*</em>";
			} else {
				$required = ' class="my_class';
				$required_label = '';
			}
			if ($question['question_type'] == 'DATE') {
				$required .= ' datepicker" ';
			} else {
				$required .= '" ';
			}
			$field_name = 'question|' . $attendee . '|' . $question['id'];
			if ($attendee == 'additional') {
				$field_name .= '[]';
			}
			$label = '<label for="' . $field_name . '">' . $question['question'] . $required_label . '</label> ';
			switch ($question['question_type']) {
				case "TEXT" :
					$disabled = '';
					$answer = '';
					if (get_option('events_members_active') == 'true'
									&& !empty($question['system_name'])
									&& $attendee == 'primary') {
						switch ($question['system_name']) {
							case $question['system_name'] == 'fname':
								$answer = $current_user->first_name;
								break;
							case $question['system_name'] == 'lname':
								$answer = $current_user->last_name;
								break;
							case $question['system_name'] == 'email':
								$answer = $user_email;
								break;
							case $question['system_name'] == 'address':
								$answer = esc_attr(get_user_meta($userid, 'event_espresso_address', true));
								break;
							case $question['system_name'] == 'city':
								$answer = esc_attr(get_user_meta($userid, 'event_espresso_city', true));
								break;
							case $question['system_name'] == 'state':
								$answer = esc_attr(get_user_meta($userid, 'event_espresso_state', true));
								break;
							case $question['system_name'] == 'zip':
								$answer = esc_attr(get_user_meta($userid, 'event_espresso_zip', true));
								break;
							case $question['system_name'] == 'phone':
								$answer = esc_attr(get_user_meta($userid, 'event_espresso_phone', true));
								break;
						}
						if (!empty($answer) && $member_options['autofilled_editable'] != 'Y') {
							$disabled = 'disabled="disabled"';
						}
					}
					$html .= '<p class="event_form_field">' . $label;
					$html .= '<input type="text" ' . $required . ' id="' . $field_name;
					$html .= '-' . $attendee . '"  name="' . $field_name;
					$html .= '" size="40" value="' . $answer . '" ';
					$html .= $disabled . ' /></p>';
					break;
				case "DATE" :
					//Load scripts and styles
					wp_register_style('jquery-ui-style-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css');
					wp_print_styles('jquery-ui-style-datepicker');
					wp_register_script('jquery-ui-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.ui.datepicker.min.js', array('jquery', 'jquery-ui-core'));
					wp_print_scripts('jquery-ui-datepicker');

					$html .= '<p class="event_form_field">' . $label;
					$html .= '<input type="text" ' . $required . ' id="' . $field_name . '-' . $attendee . '"  name="' . $field_name . '" size="40" /></p>';
					$html .= '<script type="text/javascript" charset="utf-8">jQuery(".datepicker" ).datepicker({yearRange: "c-100:c+10", changeMonth: true,changeYear: true,dateFormat: "yy-mm-dd",showButtonPanel: true});</script>';
					break;
				case "TEXTAREA" :
					$html .= '<p class="event_form_field event-quest-group-textarea">' . $label;
					$html .= '<textarea id=""' . $required . ' name="' . $field_name . '"  cols="30" rows="5"></textarea></p>';
					break;
				case "SINGLE" :
					$values = explode(",", $question['response']);
					$html .= '<fieldset class="single-radio">';
					$html .= '<legend class="event_form_field">' . $question['question'] . '</legend>';
					$html .= '<ul class="event_form_field">';
					foreach ($values as $value) {
						$value = trim($value);
						$html .= '<li><label for="SINGLE_' . $question['id'] . '" class="my_class"><input id="SINGLE_' . $question['id'] . '" ' . $required . ' name="' . $field_name . '"  type="radio" value="' . $value . '" /> ' . $value . '</label></li>';
						//echo $label;
					}
					$html .= '</ul>';
					$html .= '</fieldset>';
					break;
				case "MULTIPLE" :
					$values = explode(",", $question['response']);
					$html .= '<fieldset class="multi-checkbox">';
					$html .= '<legend class="event_form_field">' . $question['question'] . '</legend>';
					//$html .= '</p>';
					$html .= '<ul class="event_form_field">';
					foreach ($values as $key => $value) {
						$value = trim($value);
						$html .= '<li><label for="' . str_replace(' ', '', $value);
						$html .= '" class="my_class"><input id="' . str_replace(' ', '', $value);
						$html .= '" ' . $required . ' name="' . $field_name . '[]"  type="checkbox" value="';
						$html .= $value . '" /> ' . $value . '</label></li>';
					}
					$html .= '</ul>';
					$html .= '</fieldset>';
					break;
				case "DROPDOWN" :
					$values = explode(",", $question['response']);
					$html .= '<p class="event_form_field" class="my_class">' . $label;
					$html .= '<select name="' . $field_name . '" ' . $required . ' id="DROPDOWN_' . $question['id'] . '-' . $attendee . '">';
					$html .= "<option value=''>" . __('Select One', 'event_espresso') . "</option>";
					foreach ($values as $value) {
						$value = trim($value);
						$html .= '<option value="' . $value . '"> ' . $value . '</option>';
					}
					$html .= "</select>";
					$html .= '</p>';
					break;
			}
		}
		$html .= '</div>';
	}
	return $html;
}

//Build the form questions. This function can be overridden using the custom files addon
if (!function_exists('event_espresso_add_question_groups')) {

	function event_espresso_add_question_groups($question_groups, $answer= '', $event_id = null, $multi_reg = 0, $meta = array()) {
		global $wpdb;
		$event_id = empty($_REQUEST['event_id']) ? $event_id : $_REQUEST['event_id'];
		if (count($question_groups) > 0) {
			$questions_in = '';

			$FILTER = '';
			if (isset($_REQUEST['regevent_action']))
				$FILTER = " AND q.admin_only = 'N' ";

			//echo 'additional_attendee_reg_info = '.$meta['additional_attendee_reg_info'].'<br />';
			//Only personal inforamation for the additional attendees in each group
			if (isset($meta['additional_attendee_reg_info']) && $meta['additional_attendee_reg_info'] == '2' && isset($meta['attendee_number']) && $meta['attendee_number'] > 1)
				$FILTER .= " AND qg.system_group = 1 ";

			if (!is_array($question_groups) && !empty($question_groups)) {
				$question_groups = unserialize($question_groups);
			}

			foreach ($question_groups as $g_id) {
				$questions_in .= $g_id . ',';
			}

			$questions_in = substr($questions_in, 0, -1);
			$group_name = '';
			$counter = 0;

			$sql = "SELECT q.*, qg.group_name, qg.group_description, qg.show_group_name, qg.show_group_description, qg.group_identifier
					FROM " . EVENTS_QUESTION_TABLE . " q
					JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON q.id = qgr.question_id
					JOIN " . EVENTS_QST_GROUP_TABLE . " qg ON qg.id = qgr.group_id
					WHERE qgr.group_id in ( " . $questions_in . ")
					" . $FILTER . "
					ORDER BY qg.group_order ASC, qg.id, q.sequence, q.id ASC";
			//echo $sql;

			$questions = $wpdb->get_results($sql);

			$num_rows = $wpdb->num_rows;
			$html = '';

			if ($num_rows > 0) {
				$questions_displayed = array();
				foreach ($questions as $question) {
					$counter++;
					if (!in_array($question->id, $questions_displayed)) {
						$questions_displayed[] = $question->id;

						//if new group, close fieldset
						$html .= ($group_name != '' && $group_name != $question->group_name) ? '</div>' : '';

						if ($group_name != $question->group_name) {
							$html .= '<div class="event_questions" id="' . $question->group_identifier . '">';
							$html .= $question->show_group_name != 0 ? "<h4 class=\"reg-quest-title section-title\">$question->group_name</h4>" : '';
							$html .= $question->show_group_description != 0 && true == $question->group_description ? "<p class='quest-group-descript'>$question->group_description</p>" : '';
							$group_name = $question->group_name;
						}

						$html .= event_form_build($question, $answer, $event_id, $multi_reg, $meta);
					}
					$html .= $counter == $num_rows ? '</div>' : '';
				}
			}//end questions display
		} else {
			$html = '';
		}
		return $html;
	}

}

//Simple function to return the meta an event, venue, staff etc.
function ee_show_meta($meta, $name) {
	if ($meta == '')
		return;
	foreach ($meta as $key => $value) {
		switch ($key) {
			case $name:
				return $value;
				break;
		}
	}
}

//This function returns an array of category data based on an event id
if (!function_exists('espresso_event_category_data')) {

	function espresso_event_category_data($event_id, $all_cats=FALSE) {
		global $wpdb;
		$sql = "SELECT c.category_identifier, c.category_name, c.category_desc, c.display_desc FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
		$sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
		$sql .= " WHERE e.id = '" . $event_id . "' ";

		$wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0 && $all_cats = FALSE) {
			$category_data = array('category_identifier' => $wpdb->last_result[0]->category_identifier, 'category_name' => $wpdb->last_result[0]->category_name, 'category_desc' => $wpdb->last_result[0]->category_desc, 'display_desc' => $wpdb->last_result[0]->display_desc);
			return $category_data;
		} elseif ($num_rows > 0) {
			$category_data = array('category_identifier' => '', 'category_name' => '', 'category_desc' => '', 'display_desc' => '');
			foreach ($wpdb->last_result as $result) {
				$category_data['category_identifier'] .= $result->category_identifier . ' ';
				$category_data['category_name'] .= $result->category_name . ' ';
				$category_data['category_desc'] .= $result->category_desc . ' ';
				$category_data['display_desc'] .= $result->display_desc . ' ';
			}
			return $category_data;
		} else {
			//echo 'No Categories';
			return;
		}
	}

}

if (!function_exists('espresso_registration_id')) {

	function espresso_registration_id($attendee_id) {
		global $wpdb;
		$sql = $wpdb->get_results("SELECT registration_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='" . $wpdb->escape($attendee_id) . "'");
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			return $wpdb->last_result[0]->registration_id;
		} else {
			return 0;
		}
	}

}

if (!function_exists('espresso_attendee_id')) {

	function espresso_attendee_id($registration_id) {
		global $wpdb;
		$sql = $wpdb->get_results("SELECT id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $wpdb->escape($registration_id) . "'");
		$num_rows = $wpdb->num_rows;

		if ($num_rows > 0) {
			return $wpdb->last_result[0]->id;
		} else {
			return 0;
		}
	}

}

if (!function_exists('espresso_ticket_information')) {

	function espresso_ticket_information($atts) {
		global $wpdb;
		extract($atts);
		if (!empty($registration_id))
			$registration_id = "{$registration_id}";
		$price_option = "{$price_option}";

		$type = "{$type}";

		switch ($type) {
			case 'ticket':
				$sql = $wpdb->get_results("SELECT * FROM " . EVENTS_PRICES_TABLE . " WHERE id ='" . $price_option . "'");
				$num_rows = $wpdb->num_rows;
				if ($num_rows > 0) {
					if (function_exists('espresso_members_installed') && is_user_logged_in() == true) {
						return $wpdb->last_result[0]->member_price_type;
					} else {
						return $wpdb->last_result[0]->price_type;
					}
				}
				break;
		}
	}

}

//Creates a Google Map Link
if (!function_exists('espresso_google_map_link')) {

	function espresso_google_map_link($atts) {
		extract($atts);

		$address = "{$address}";
		$city = "{$city}";
		$state = "{$state}";
		$zip = "{$zip}";
		$country = "{$country}";
		$text = isset($text) ? "{$text}" : "";
		$type = isset($type) ? "{$type}" : "";
		$map_w = isset($map_w) ? "{$map_w}" : 400;
		$map_h = isset($map_h) ? "{$map_h}" : 400;

		$gaddress = ($address != '' ? $address : '') . ($city != '' ? ',' . $city : '') . ($state != '' ? ',' . $state : '') . ($zip != '' ? ',' . $zip : '') . ($country != '' ? ',' . $country : '');

		$google_map = htmlentities2('http://maps.google.com/maps?q=' . urlencode($gaddress));

		switch ($type) {
			case 'text':
			default:
				$text = $text == '' ? __('Map and Directions', 'event_espresso') : $text;
				break;

			case 'url':
				$text = $google_map;
				break;

			case 'map':
				$google_map_link = '<a class="a_map_image_link" href="' . $google_map . '" target="_blank">' . '<img class="map_image_link" id="venue_map_' . $id . '" ' . $map_image_class . ' src="' . htmlentities2('http://maps.googleapis.com/maps/api/staticmap?center=' . urlencode($gaddress) . '&amp;zoom=14&amp;size=' . $map_w . 'x' . $map_h . '&amp;markers=color:green|label:|' . urlencode($gaddress) . '&amp;sensor=false') . '" /></a>';
				return $google_map_link;
		}

		$google_map_link = '<a href="' . $google_map . '" target="_blank">' . $text . '</a>';
		return $google_map_link;
	}

}

//Returns a string of keys and values
if (!function_exists("unkeyvaluepair")) {

	function unkeyvaluepair($string) {
		$array = array();
		$pairs = explode("&", $string);
		foreach ($pairs as $pair) {
			list($key, $value) = explode("=", $pair, 2);
			$array[$key] = urldecode($value);
		}
		return $array;
	}

}





function espresso_serialize($data) {


	if (!is_serialized($data)) {
		return maybe_serialize($data);
	}

	return $data;
}

function espresso_unserialize($data, $return_format = '') {


	if (is_serialized($data)) {
		return maybe_unserialize($data);
	}

	return $data;
}

//Checks to see if the array is multidimensional
function is_multi($array) {
	return (count($array) != count($array, 1));
}

//escape the commas in csv file export
function escape_csv_val($val) {

	$type = ($_REQUEST['type']) ? $_REQUEST['type'] : '';
	if (preg_match('/,/', $val) && $type == 'csv') {
		return '"' . $val . '"';
	}

	return $val;
}

//return field(s) from a table
function get_event_field($field, $table, $where) {
	global $wpdb;

	$r = $wpdb->get_row('SELECT ' . $field . ' FROM ' . $table . $where, ARRAY_A);

	return $r[$field];
}

/*
  Shows the personnel that are assigned to an event

  Example usage in a template file
  espresso_show_personnel($event_id , array('wrapper_start'=>'<ul style="event_staff">','wrapper_end'=>'</ul>','before'=>'<li>','after'=>'</li>', 'limit'=>1,'show_info'=>true) );

  Parameters:
  event_id - id of event
  wrapper_start - adds html to the beginning of the output block
  wrapper_end - adds html the end of the output block
  before - adds html to the beginning of each persons details
  after - adds html to the end of each persons details
  staff_id - show a single person by id (useful for showing people not assigned to an event)
  limit - how many people to show
  show_info - shows the persons role and organization (if available) */

if (!function_exists('espresso_show_personnel')) {

	function espresso_show_personnel($event_id=0, $atts) {
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		global $wpdb;
		extract($atts, EXTR_PREFIX_ALL, "v");
		if ($event_id == 0 && ($v_staff_id == 0 || $v_staff_id == ''))
			return;
		$v_limit = $v_limit > 0 ? " LIMIT 0," . $v_limit . " " : '';
		$sql = "SELECT s.id, s.name, s.role, s.meta ";
		$sql .= " FROM " . EVENTS_PERSONNEL_TABLE . ' s ';
		if ($v_staff_id > 0) {
			$sql .= " WHERE s.id ='" . $v_staff_id . "' ";
		} else {
			$sql .= " JOIN " . EVENTS_PERSONNEL_REL_TABLE . " r ON r.person_id = s.id ";
			$sql .= " WHERE r.event_id ='" . $event_id . "' ";
		}
		$sql .= $v_limit;
		//echo $sql;
		$event_personnel = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {
			$html = '';
			foreach ($event_personnel as $person) {
				$person_id = $person->id;
				$person_name = $person->name;
				$person_role = $person->role;

				$meta = unserialize($person->meta);
				$person_organization = $meta['organization'] != '' ? $meta['organization'] : '';
				//$person_title = $meta['title']!=''? $meta['title']:'';
				$add_dash = ($person_role != '' && $person_organization != '') ? ' - ' : '';
				if ($v_show_info == true)
					$person_info = ($person_role != '' || $person_organization != '') ? ' [' . $person_role . $add_dash . $person_organization . ']' : '';

				$html .= $v_before . $person_name . $person_info . $v_after;
			}
		}
		return $v_wrapper_start . $html . $v_wrapper_end;
	}

}

//Function to include a template file. Checks user templates folder first, then default template.
if (!function_exists('event_espresso_require_template')) {

	/**
	 * event_espresso_require_template()
	 *
	 * @param mixed $template_file_name // Name of template file.
	 * @param bool $must_exist		  // Error if neither file exist.
	 * @param bool $as_require_once	 // True for require_once(), False for require()
	 * @return void	// No return value. File already included.
	 *
	 * Usage: event_espresso_require_template('shopping_cart.php')
	 */
	function event_espresso_require_template($template_file_name, $must_exist = true, $as_require_once = true) {
		event_espresso_require_file($template_file_name, EVENT_ESPRESSO_TEMPLATE_DIR, EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/', $must_exist, $as_require_once);
	}

}

//Function to include a gateway file. Checks user gateway folder first, then default template.
if (!function_exists('event_espresso_require_gateway')) {

	/**
	 * event_espresso_require_gateway()
	 *
	 * @param mixed $template_file_name // Name of template file.
	 * @param bool $must_exist		  // Error if neither file exist.
	 * @param bool $as_require_once	 // True for require_once(), False for require()
	 * @return void	// No return value. File already included.
	 *
	 * Usage: event_espresso_require_gateway('PaymentGateway.php')
	 */
	function event_espresso_require_gateway($template_file_name, $must_exist = true, $as_require_once = true) {
		event_espresso_require_file($template_file_name, EVENT_ESPRESSO_GATEWAY_DIR . '/', EVENT_ESPRESSO_PLUGINFULLPATH . '/gateways/', $must_exist, $as_require_once);
	}

}

//Function to include a template file. Checks user templates folder first, then default template.
if (!function_exists('event_espresso_require_file')) {

	/**
	 * event_espresso_require_file()
	 *
	 * @param mixed $template_file_name // Name of template file.
	 * @param mixed $path_first		 // First choice for file location.
	 * @param mixed $path_first		 // Fallback location for file.
	 * @param bool $must_exist		  // Error if neither file exist.
	 * @param bool $as_require_once	 // True for require_once(), False for require()
	 * @return void	// No return value. File already included.
	 *
	 * Usage: event_espresso_require_file('shopping_cart.php',EVENT_ESPRESSO_TEMPLATE_DIR,EVENT_ESPRESSO_PLUGINFULLPATH.'templates/')
	 */
	function event_espresso_require_file($template_file_name, $path_first, $path_else, $must_exist = true, $as_require_once = true) {
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

//Added by Imon
//Function to clean up left out data from multi event registration id group table
if (!function_exists('event_espresso_cleanup_multi_event_registration_id_group_data')) {

	/**
	 * event_espresso_cleanup_multi_event_registration_id_group_data()
	 *
	 * Usage: event_espresso_cleanup_multi_event_registration_id_group_data()
	 */
	function event_espresso_cleanup_multi_event_registration_id_group_data() {
		global $wpdb;
		$wpdb->query(" delete emerig from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " emerig left join " . EVENTS_ATTENDEE_TABLE . "  ea on emerig.registration_id = ea.registration_id where ea.registration_id is null ");
	}

}

//Function to clean up left out data from attendee cost table
if (!function_exists('event_espresso_cleanup_attendee_cost_data')) {

	/**
	 * event_espresso_cleanup_attendee_cost_data()
	 *
	 * Usage: event_espresso_cleanup_attendee_cost_data()
	 */
	function event_espresso_cleanup_attendee_cost_data() {
		global $wpdb;
		$wpdb->query(" delete eac from " . EVENTS_ATTENDEE_COST_TABLE . " eac left join " . EVENTS_ATTENDEE_TABLE . "  ea on eac.attendee_id = ea.id where ea.id is null ");
	}

}

function espresso_check_scripts() {
	if (function_exists('wp_script_is')) {
		if (!wp_script_is('jquery')) {
			echo '<div class="event_espresso_error"><p><em>' . __('Jquery is not loaded!', 'event_espresso') . '</em><br />' . __('Event Espresso is unable to load Jquery do to a conflict with your theme or another plugin.', 'event_espresso') . '</p></div>';
		}
	}
	if (!function_exists('wp_head')) {
		echo '<div class="event_espresso_error"><p><em>' . __('Missing wp_head() Function', 'event_espresso') . '</em><br />' . __('The WordPress function wp_head() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso') . '</p></div>';
	}
	if (!function_exists('wp_footer')) {
		echo '<div class="event_espresso_error"><p><em>' . __('Missing wp_footer() Function', 'event_espresso') . '</em><br />' . __('The WordPress function wp_footer() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso') . '</p></div>';
	}
}

//These functions were moved here from admin.php on 08-30-2011 by Seth
function espresso_edit_this($event_id) {
	global $espresso_premium;
	if ($espresso_premium != true)
		return;
	global $current_user;
	wp_get_current_user();
	$curauth = wp_get_current_user();
	$user_id = $curauth->ID;
	$user = new WP_User($user_id);
	foreach ($user->roles as $role) {
		//echo $role;
		//Build the edit event link
		$edit_link = '<a class="post-edit-link ui-priority-secondary ui-corner-all ui-state-default ui-state-hover ui-state-focus ui-state-active " href="' . site_url() . '/wp-admin/admin.php?page=events&action=edit&event_id=' . $event_id . '">' . __('Edit Event') . '</a>';
		switch ($role) {
			case 'administrator':
			case 'espresso_event_admin':
			case 'espresso_event_manager':
			case 'espresso_group_admin':
				//If user is an event manager, then show the edit link for their events
				if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_eventmanager' && espresso_member_data('id') != espresso_is_my_event($event_id))
					return;
				return $edit_link;
				break;
		}
	}
}

//Retrives the attendee count based on an attendee ids
function espresso_count_attendees_for_registration($attendee_id) {
	global $wpdb;
	$cnt = $wpdb->get_var("SELECT COUNT(1) as cnt FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
	if ($cnt == 1) {
		$cnt = $wpdb->get_var("SELECT quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
		if ($cnt == 0) {
			return 1;
		} elseif ($cnt > 0) {
			return $cnt;
		}
	}
	return $cnt;
}

function espresso_quantity_for_registration($attendee_id) {
	global $wpdb;
	$cnt = $wpdb->get_var("SELECT quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
	return $cnt;
}

function espresso_is_primary_attendee($attendee_id) {
	global $wpdb;
	$sql = "SELECT am.meta_value FROM " . EVENTS_ATTENDEE_META_TABLE . " am ";
	$sql .= " WHERE am.attendee_id = '" . $attendee_id . "' AND am.meta_key='primary_attendee' AND am.meta_value='1' ";
	//echo $sql;
	$wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {
		return true;
	}
}

function espresso_get_primary_attendee_id($registration_id) {
	global $wpdb;
	$sql = "SELECT am.attendee_id FROM " . EVENTS_ATTENDEE_META_TABLE . " am ";
	$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.id = am.attendee_id ";
	$sql .= " WHERE ea.registration_id = '" . $registration_id . "' AND am.meta_key='primary_attendee' AND am.meta_value='1' ";
	//echo $sql;
	$wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {
		return $wpdb->last_result[0]->attendee_id;
	}
}

function espresso_ticket_links($registration_id, $attendee_id) {
	global $wpdb;
	$sql = "SELECT id, registration_id, fname, lname  FROM " . EVENTS_ATTENDEE_TABLE;
	if (espresso_is_primary_attendee($attendee_id) != true) {
		$sql .= " WHERE id = '" . $attendee_id . "' ";
	} else {
		$sql .= " WHERE registration_id = '" . $registration_id . "' ";
	}
	//echo $sql;
	$attendees = $wpdb->get_results($sql);
	$ticket_link = '';
	if ($wpdb->num_rows > 0) {
		$group = $wpdb->num_rows > 1 ? '<strong>' . sprintf(__('Tickets Purchased (%s):', 'event_espresso'), $wpdb->num_rows) . '</strong><br />' : '';
		$break = '<br />';
		foreach ($attendees as $attendee) {
			$ticket_url = get_option('siteurl') . "/?download_ticket=true&amp;id=" . $attendee->id . "&amp;registration_id=" . $attendee->registration_id;
			if (function_exists('espresso_ticket_launch')) {
				$ticket_url = espresso_ticket_url($attendee->id, $attendee->registration_id);
			}
			$ticket_link .= '<a href="' . $ticket_url . '">' . __('Download/Print Ticket') . ' (' . $attendee->fname . ' ' . $attendee->lname . ')' . '</a>' . $break;
		}
		return '<p>' . $group . $ticket_link . '</p>';
	}
}

/**
 * Get either a Gravatar URL or complete image tag for a specified email address.
 *
 * @param string $email The email address
 * @param string $s Size in pixels, defaults to 80px [ 1 - 512 ]
 * @param string $d Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
 * @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
 * @param boole $img True to return a complete IMG tag False for just the URL
 * @param array $atts Optional, additional key/value attributes to include in the IMG tag
 * @return String containing either just a URL or a complete image tag
 * @source http://gravatar.com/site/implement/images/php/
 */
if (!function_exists('espresso_get_gravatar')) {

	function espresso_get_gravatar($email, $s = 80, $d = 'mm', $r = 'g', $img = true, $atts = array()) {
		$url = 'http://www.gravatar.com/avatar/';
		$url .= md5(strtolower(trim($email)));
		$url .= "?s=$s&d=$d&r=$r";
		if ($img) {
			$url = '<img src="' . $url . '"';
			foreach ($atts as $key => $val)
				$url .= ' ' . $key . '="' . $val . '"';
			$url .= ' />';
		}
		return $url;
	}

}

/**
 * Function espresso_get_attendee_coupon_discount
 * Get discount amount for a given attendee id and cost
 *
 * @global wpdb $wpdb
 * @param int $attendee_id
 * @param double $cost
 */
function espresso_get_attendee_coupon_discount($attendee_id, $cost) {
	global $wpdb;
	$coupon_code = "";

	$row = $wpdb->get_row($wpdb->prepare("select * from " . EVENTS_ATTENDEE_TABLE . " where id = %d", $attendee_id), ARRAY_A);
	if (!is_null($row['coupon_code']) && !empty($row['coupon_code'])) {
		$coupon_code = $row['coupon_code'];
		$event_id = $row['event_id'];
		//$results = $wpdb->get_results("SELECT * FROM ". EVENTS_DISCOUNT_CODES_TABLE ." WHERE coupon_code = '".$_REQUEST['coupon_code']."'");
		$discounts = $wpdb->get_results("SELECT d.* FROM " . EVENTS_DISCOUNT_CODES_TABLE . " d JOIN " . EVENTS_DISCOUNT_REL_TABLE . " r ON r.discount_id  = d.id WHERE d.coupon_code = '" . $coupon_code . "'  AND r.event_id = '" . $event_id . "' ");
		if ($wpdb->num_rows > 0) {
			$valid_discount = true;
			foreach ($discounts as $discount) {
				$discount_id = $discount->id;
				$coupon_code = $discount->coupon_code;
				$coupon_code_price = $discount->coupon_code_price;
				$coupon_code_description = $discount->coupon_code_description;
				$use_percentage = $discount->use_percentage;
			}
			$discount_type_price = $use_percentage == 'Y' ? $coupon_code_price . '%' : $org_options['currency_symbol'] . $coupon_code_price;

			if ($use_percentage == 'Y') {
				$pdisc = $coupon_code_price / 100;
				$cost = $cost - ($cost * $pdisc);
			} else {
				$cost = $cost - $coupon_code_price;
			}
		}
	}
	return $cost;
}

//This function returns the user id of the current user, if the permissions pro addon is installed.
//IF the permissions pro addon is installed and the admin has loaded a different manager id, then the system will return that users id.
//Otherwise it returns the id of the primary admin.
function espresso_get_user_id() {
	global $notices, $current_user;

	$wp_user_id = 0;

	if (function_exists('espresso_manager_pro_version') && $_SESSION['espresso_use_selected_manager'] == true) {
		$wp_user_id = $current_user->ID;

		//If an event manager is selected, then we need to load that persons id
		$selected_user = espresso_get_selected_manager();
		if (!empty($selected_user)) {
			$wp_user_id = $selected_user;
		}
	} elseif (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
		$wp_user_id = espresso_member_data('id');
	} else {
		$wp_user_id = 1;
	}

	//Make sure the final user id is not 0
	if ($wp_user_id == 0) {
		$wp_user_id = 1;
	}

	//define it as a global
	global $espresso_wp_user;
	$espresso_wp_user = $wp_user_id;

	//Debug
	//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';

	return $wp_user_id;
}

function getCountriesArray($lang="en") {
	//first code, country_id
	//seconde code, country name
	//third code, ISO country id with two chars
	//fourth code, ISO country id with three chars
	//last code is for political zones, 2 is for european union, 1 for the rest of the world (by the moment)
	switch ($lang) {
		default: return array(
				array(0, __('No country selected', 'event_espresso'), '', '', 0),
				array(64, 'United States', 'US', 'USA', 1),
				array(15, 'Australia', 'AU', 'AUS', 1),
				array(39, 'Canada', 'CA', 'CAN', 1),
				array(171, 'United Kingdom', 'GB', 'GBR', 1),
				array(70, 'France', 'FR', 'FRA', 2),
				array(111, 'Italy', 'IT', 'ITA', 2),
				array(63, 'Spain', 'ES', 'ESP', 2),
				array(1, 'Afghanistan', 'AF', 'AFG', 1),
				array(2, 'Albania', 'AL', 'ALB', 1),
				array(3, 'Germany', 'DE', 'DEU', 2),
				array(198, 'Switzerland', 'CH', 'CHE', 1),
				array(87, 'The Netherlands', 'NL', 'NLD', 2),
				array(197, 'Sweden', 'SE', 'SWE', 1),
				array(230, 'Akrotiri and Dhekelia', 'CY', 'CYP', 2),
				array(4, 'Andorra', 'AD', 'AND', 2),
				array(5, 'Angola', 'AO', 'AGO', 1),
				array(6, 'Anguilla', 'AI', 'AIA', 1),
				array(7, 'Antarctica', 'AQ', 'ATA', 1),
				array(8, 'Antigua and Barbuda', 'AG', 'ATG', 1),
				array(10, 'Saudi Arabia', 'SA', 'SAU', 1),
				array(11, 'Argelia', 'DZ', 'DZA', 1),
				array(12, 'Argentina', 'AR', 'ARG', 1),
				array(13, 'Armenia', 'AM', 'ARM', 1),
				array(14, 'Aruba', 'AW', 'ABW', 1),
				array(16, 'Austria', 'AT', 'AUT', 2),
				array(17, 'Azerbaijan', 'AZ', 'AZE', 1),
				array(18, 'Bahamas', 'BS', 'BHS', 1),
				array(19, 'Bahrein', 'BH', 'BHR', 1),
				array(20, 'Bangladesh', 'BD', 'BGD', 1),
				array(21, 'Barbados', 'BB', 'BRB', 1),
				array(22, 'Belgium ', 'BE', 'BEL', 2),
				array(23, 'Belize', 'BZ', 'BLZ', 1),
				array(24, 'Benin', 'BJ', 'BEN', 1),
				array(25, 'Bermudas', 'BM', 'BMU', 1),
				array(26, 'Belarus', 'BY', 'BLR', 1),
				array(27, 'Bolivia', 'BO', 'BOL', 1),
				array(28, 'Bosnia and Herzegovina', 'BA', 'BIH', 1),
				array(29, 'Botswana', 'BW', 'BWA', 1),
				array(96, 'Bouvet Island', 'BV', 'BVT', 1),
				array(30, 'Brazil', 'BR', 'BRA', 1),
				array(31, 'Brunei', 'BN', 'BRN', 1),
				array(32, 'Bulgaria', 'BG', 'BGR', 1),
				array(33, 'Burkina Faso', 'BF', 'BFA', 1),
				array(34, 'Burundi', 'BI', 'BDI', 1),
				array(35, 'Bhutan', 'BT', 'BTN', 1),
				array(36, 'Cape Verde', 'CV', 'CPV', 1),
				array(37, 'Cambodia', 'KH', 'KHM', 1),
				array(38, 'Cameroon', 'CM', 'CMR', 1),
				array(98, 'Cayman Islands', 'KY', 'CYM', 1),
				array(172, 'Central African Republic', 'CF', 'CAF', 1),
				array(40, 'Chad', 'TD', 'TCD', 1),
				array(41, 'Chile', 'CL', 'CHL', 1),
				array(42, 'China', 'CN', 'CHN', 1),
				array(105, 'Christmas Island', 'CX', 'CXR', 1),
				array(43, 'Cyprus', 'CY', 'CYP', 2),
				array(99, 'Cocos Island', 'CC', 'CCK', 1),
				array(100, 'Cook Islands', 'CK', 'COK', 1),
				array(44, 'Colombia', 'CO', 'COL', 1),
				array(45, 'Comoros', 'KM', 'COM', 1),
				array(46, 'Congo', 'CG', 'COG', 1),
				array(47, 'Corea del Norte', 'KP', 'PRK', 1),
				array(50, 'Costa Rica', 'CR', 'CRI', 1),
				array(51, 'Croatia', 'HR', 'HRV', 1),
				array(52, 'Cuba', 'CU', 'CUB', 1),
				array(173, 'Czech Republic', 'CZ', 'CZE', 1),
				array(53, 'Danmark', 'DK', 'DNK', 1),
				array(54, 'Djibouti', 'DJ', 'DJI', 1),
				array(55, 'Dominica', 'DM', 'DMA', 1),
				array(174, 'Dominican Republic', 'DO', 'DOM', 1),
				array(56, 'Ecuador', 'EC', 'ECU', 1),
				array(57, 'Egypt', 'EG', 'EGY', 1),
				array(58, 'El Salvador', 'SV', 'SLV', 1),
				array(60, 'Eritrea', 'ER', 'ERI', 1),
				array(61, 'Eslovakia', 'SK', 'SVK', 2),
				array(62, 'Eslovenia', 'SI', 'SVN', 2),
				array(65, 'Estonia', 'EE', 'EST', 2),
				array(66, 'Ethiopia', 'ET', 'ETH', 1),
				array(102, 'Faroe islands', 'FO', 'FRO', 1),
				array(103, 'Falkland Islands', 'FK', 'FLK', 1),
				array(67, 'Fiji', 'FJ', 'FJI', 1),
				array(69, 'Finland', 'FI', 'FIN', 2),
				array(71, 'Gabon', 'GA', 'GAB', 1),
				array(72, 'Gambia', 'GM', 'GMB', 1),
				array(73, 'Georgia', 'GE', 'GEO', 1),
				array(74, 'Ghana', 'GH', 'GHA', 1),
				array(75, 'Gibraltar', 'GI', 'GIB', 1),
				array(76, 'Greece', 'GR', 'GRC', 2),
				array(77, 'Grenada', 'GD', 'GRD', 1),
				array(78, 'Greenland', 'GL', 'GRL', 1),
				array(79, 'Guadeloupe', 'GP', 'GLP', 1),
				array(80, 'Guam', 'GU', 'GUM', 1),
				array(81, 'Guatemala', 'GT', 'GTM', 1),
				array(82, 'Guinea', 'GN', 'GIN', 1),
				array(83, 'Equatorial Guinea', 'GQ', 'GNQ', 1),
				array(84, 'Guinea-Bissau', 'GW', 'GNB', 1),
				array(85, 'Guyana', 'GY', 'GUY', 1),
				array(86, 'Haiti', 'HT', 'HTI', 1),
				array(88, 'Honduras', 'HN', 'HND', 1),
				array(89, 'Hong Kong', 'HK', 'HKG', 1),
				array(90, 'Hungary', 'HU', 'HUN', 1),
				array(91, 'India', 'IN', 'IND', 1),
				array(205, 'British Indian Ocean Territory', 'IO', 'IOT', 1),
				array(92, 'Indonesia', 'ID', 'IDN', 1),
				array(93, 'Iraq', 'IQ', 'IRQ', 1),
				array(94, 'Iran', 'IR', 'IRN', 1),
				array(95, 'Ireland', 'IE', 'IRL', 2),
				array(97, 'Iceland', 'IS', 'ISL', 1),
				array(110, 'Israel', 'IL', 'ISR', 1),
				array(49, 'Ivory Coast ', 'CI', 'CIV', 1),
				array(112, 'Jamaica', 'JM', 'JAM', 1),
				array(113, 'Japan', 'JP', 'JPN', 1),
				array(114, 'Jordan', 'JO', 'JOR', 1),
				array(115, 'Kazakhstan', 'KZ', 'KAZ', 1),
				array(116, 'Kenya', 'KE', 'KEN', 1),
				array(117, 'Kirguistan', 'KG', 'KGZ', 1),
				array(118, 'Kiribati', 'KI', 'KIR', 1),
				array(48, 'South Korea', 'KR', 'KOR', 1),
				array(228, 'Kosovo', 'XK', 'XKV', 2), // there is no official ISO code for Kosovo yet (http://geonames.wordpress.com/2010/03/08/xk-country-code-for-kosovo/) so using a temporary country code and a modified 3 character code for ISO code -- this should be updated if/when Kosovo gets its own ISO code
				array(119, 'Kuwait', 'KW', 'KWT', 1),
				array(120, 'Laos', 'LA', 'LAO', 1),
				array(121, 'Latvia', 'LV', 'LVA', 2),
				array(122, 'Lesotho', 'LS', 'LSO', 1),
				array(123, 'Lebanon', 'LB', 'LBN', 1),
				array(124, 'Liberia', 'LR', 'LBR', 1),
				array(125, 'Libya', 'LY', 'LBY', 1),
				array(126, 'Liechtenstein', 'LI', 'LIE', 1),
				array(127, 'Lithuania', 'LT', 'LTU', 2),
				array(128, 'Luxemburg', 'LU', 'LUX', 2),
				array(129, 'Macao', 'MO', 'MAC', 1),
				array(130, 'Macedonia', 'MK', 'MKD', 1),
				array(131, 'Madagascar', 'MG', 'MDG', 1),
				array(132, 'Malaysia', 'MY', 'MYS', 1),
				array(133, 'Malawi', 'MW', 'MWI', 1),
				array(134, 'Maldivas', 'MV', 'MDV', 1),
				array(135, 'Mali', 'ML', 'MLI', 1),
				array(136, 'Malta', 'MT', 'MLT', 2),
				array(101, 'Northern Marianas', 'MP', 'MNP', 1),
				array(137, 'Marruecos', 'MA', 'MAR', 1),
				array(104, 'Marshall islands', 'MH', 'MHL', 1),
				array(138, 'Martinica', 'MQ', 'MTQ', 1),
				array(139, 'Mauricio', 'MU', 'MUS', 1),
				array(140, 'Mauritania', 'MR', 'MRT', 1),
				array(141, 'Mayote', 'YT', 'MYT', 2),
				array(142, 'Mexico', 'MX', 'MEX', 1),
				array(143, 'Micronesia', 'FM', 'FSM', 1),
				array(144, 'Moldova', 'MD', 'MDA', 1),
				array(145, 'Monaco', 'MC', 'MCO', 2),
				array(146, 'Mongolia', 'MN', 'MNG', 1),
				array(147, 'Montserrat', 'MS', 'MSR', 1),
				array(227, 'Montenegro', 'ME', 'MNE', 2),
				array(148, 'Mozambique', 'MZ', 'MOZ', 1),
				array(149, 'Myanmar', 'MM', 'MMR', 1),
				array(150, 'Namibia', 'NA', 'NAM', 1),
				array(151, 'Nauru', 'NR', 'NRU', 1),
				array(152, 'Nepal', 'NP', 'NPL', 1),
				array(9, 'Netherlands Antilles', 'AN', 'ANT', 1),
				array(153, 'Nicaragua', 'NI', 'NIC', 1),
				array(154, 'Niger', 'NE', 'NER', 1),
				array(155, 'Nigeria', 'NG', 'NGA', 1),
				array(156, 'Niue', 'NU', 'NIU', 1),
				array(157, 'Norway', 'NO', 'NOR', 1),
				array(158, 'New Caledonia', 'NC', 'NCL', 1),
				array(159, 'New Zealand', 'NZ', 'NZL', 1),
				array(160, 'Oman', 'OM', 'OMN', 1),
				array(161, 'Pakistan', 'PK', 'PAK', 1),
				array(162, 'Palau', 'PW', 'PLW', 1),
				array(163, 'Panama', 'PA', 'PAN', 1),
				array(164, 'Papua New Guinea', 'PG', 'PNG', 1),
				array(165, 'Paraguay', 'PY', 'PRY', 1),
				array(166, 'Peru', 'PE', 'PER', 1),
				array(68, 'Philippines', 'PH', 'PHL', 1),
				array(167, 'Poland', 'PL', 'POL', 1),
				array(168, 'Portugal', 'PT', 'PRT', 2),
				array(169, 'Puerto Rico', 'PR', 'PRI', 1),
				array(170, 'Qatar', 'QA', 'QAT', 1),
				array(176, 'Rowanda', 'RW', 'RWA', 1),
				array(177, 'Romania', 'RO', 'ROM', 2),
				array(178, 'Russia', 'RU', 'RUS', 1),
				array(229, 'Saint Pierre and Miquelon', 'PM', 'SPM', 2),
				array(180, 'Samoa', 'WS', 'WSM', 1),
				array(181, 'American Samoa', 'AS', 'ASM', 1),
				array(183, 'San Marino', 'SM', 'SMR', 2),
				array(184, 'San Vincente y las Granadinas', 'VC', 'VCT', 1),
				array(185, 'Santa Helena', 'SH', 'SHN', 1),
				array(186, 'Santa Lucia', 'LC', 'LCA', 1),
				array(188, 'Senegal', 'SN', 'SEN', 1),
				array(189, 'Seychelles', 'SC', 'SYC', 1),
				array(190, 'Sierra Leona', 'SL', 'SLE', 1),
				array(191, 'Singapore', 'SG', 'SGP', 1),
				array(192, 'Syria', 'SY', 'SYR', 1),
				array(193, 'Somalia', 'SO', 'SOM', 1),
				array(194, 'Sri Lanka', 'LK', 'LKA', 1),
				array(195, 'South Africa', 'ZA', 'ZAF', 1),
				array(196, 'Sudan', 'SD', 'SDN', 1),
				array(199, 'Suriname', 'SR', 'SUR', 1),
				array(200, 'Swaziland', 'SZ', 'SWZ', 1),
				array(201, 'Thailand', 'TH', 'THA', 1),
				array(202, 'Taiwan', 'TW', 'TWN', 1),
				array(203, 'Tanzania', 'TZ', 'TZA', 1),
				array(204, 'Tajikistan', 'TJ', 'TJK', 1),
				array(206, 'Timor Oriental', 'TP', 'TMP', 1),
				array(207, 'Togo', 'TG', 'TGO', 1),
				array(208, 'Tokelau', 'TK', 'TKL', 1),
				array(209, 'Tonga', 'TO', 'TON', 1),
				array(210, 'Trinidad and Tobago', 'TT', 'TTO', 1),
				array(211, 'Tunisia', 'TN', 'TUN', 1),
				array(212, 'Turkmenistan', 'TM', 'TKM', 1),
				array(213, 'Turkey', 'TR', 'TUR', 1),
				array(214, 'Tuvalu', 'TV', 'TUV', 1),
				array(215, 'Ukraine', 'UA', 'UKR', 1),
				array(216, 'Uganda', 'UG', 'UGA', 1),
				array(59, 'United Arab Emirates', 'AE', 'ARE', 1),
				array(217, 'Uruguay', 'UY', 'URY', 1),
				array(218, 'Uzbekistan', 'UZ', 'UZB', 1),
				array(219, 'Vanuatu', 'VU', 'VUT', 1),
				array(220, 'Vatican City', 'VA', 'VAT', 2),
				array(221, 'Venezuela', 'VE', 'VEN', 1),
				array(222, 'Vietnam', 'VN', 'VNM', 1),
				array(108, 'Virgin Islands', 'VI', 'VIR', 1),
				array(223, 'Yemen', 'YE', 'YEM', 1),
				array(224, 'Yugoslavia', 'YU', 'YUG', 1),
				array(225, 'Zambia', 'ZM', 'ZMB', 1),
				array(226, 'Zimbabwe', 'ZW', 'ZWE', 1));
	}
}

function getCountryZoneId($country_id) {
	//1 for the rest of the world
	//2 is for european union
	$countries = getCountriesArray();
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($country_id == $countries[$t][0])
			return $countries[$t][4];
	return 0;
}

function getCountryBelongsZone($country_id, $zone_id=1 /* USA by default */) {
	//2 is for european union
	$countries = getCountriesArray();
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($country_id == $countries[$t][0])
			if ($zone_id == $countries[$t][4])
				return true;
	return false;
}

function getCountryName($id, $lang="en") {
	$countries = getCountriesArray($lang);
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($id == $countries[$t][0])
			return $countries[$t][1];
	return __('No country selected', 'event_espresso');
}

function getCountryFullData($id, $lang="en") {
	$countries = getCountriesArray($lang);
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($id == $countries[$t][0])
			return array('id' => $countries[$t][0],
					'title' => $countries[$t][1],
					'iso_code_2' => $countries[$t][2],
					'iso_code_3' => $countries[$t][3]);

	return array('id' => '0',
			'title' => __('No country selected', 'event_espresso'),
			'iso_code_2' => '',
			'iso_code_3' => '');
}

function printCountriesSelector($name, $selected) {
	$selected = intval($selected);
	$countries = getCountriesArray("es");

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
 *		@ print_r an array
 *		@ access public
 *		@ return void
 */	
 function printr( $var, $var_name = 'ARRAY' ) {

	echo '<pre style="display:block; width:100%; height:50%; overflow:scroll; border:2px solid light-blue;">';
	echo '<h3>'.$var_name.'</h3>';
	echo print_r($var);
	echo '</pre>';
		
}
