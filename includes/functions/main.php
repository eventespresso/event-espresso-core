<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );


function espresso_edit_attendee($registration_id, $attendee_id, $event_id = 0, $type = '', $text = '') {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $org_options;
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
			//$html .= '<a  href="' . home_url() . '?page_id=' . $org_options['event_page_id'] . '&registration_id=' . $registration_id . '&amp;id=' . $attendee_id . '&amp;e_reg=register&form_action=edit_attendee&single=true" target="_blank" id="espresso_edit_attendee_' . $attendee_id . '" class="espresso_edit_attendee" title="' . __('Edit Attendee Details', 'event_espresso') . '">' . $text . '</a>';
			break;
	}
	return $html;
}



function espresso_invoice_url($attendee_id, $registration_id, $extra = '') {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$extra = empty($extra) ? '' : '&amp;' . $extra;
	return home_url() . '/?invoice_launch=true&amp;id=' . $attendee_id . '&amp;r_id=' . $registration_id . '&amp;html=true' . $extra;
}



function espresso_get_reg_page_full_url() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $org_options;
	$reg_page_url = get_permalink($org_options['event_page_id']);
	return $reg_page_url;
}

function espresso_use_pretty_permalinks() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $org_options;
	// check if option exists
	if (isset($org_options['espresso_url_rewrite_activated'])) {
		$url_rewrite = $org_options['espresso_url_rewrite_activated'];
	} else {
		$url_rewrite = FALSE;
	}
	// check if permalinks are turned on and both in WP and EE
	if ($url_rewrite && get_option('permalink_structure') != '') {
		return TRUE;
	} else {
		return FALSE;
	}
}

function espresso_reg_url($event_id = FALSE, $event_slug = FALSE) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$registration_url = rtrim(get_permalink($org_options['event_page_id']), '/');
	$use_pretty_permalinks = espresso_use_pretty_permalinks();

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

	return $registration_url;
}

//Text formatting function.
//This should fix all of the formatting issues of text output from the database.
function espresso_format_content($content = '') {
	return wpautop(stripslashes_deep(html_entity_decode(do_shortcode($content), ENT_QUOTES, "UTF-8")));
}

//This function just returns the session id.
//function event_espresso_session_id() {
//	if (!isset($_SESSION['espresso_session']['id'])) {
//		$sessionid = (mt_rand(100, 999) . time());
//		$_SESSION['espresso_session']['id'] = $sessionid;
//	}
//	return $_SESSION['espresso_session']['id'];
//}

//Function to display additional attendee fields.
function event_espresso_get_event_meta($event_id) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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



/*
if (!function_exists('event_espresso_additional_attendees')) {

	function event_espresso_additional_attendees($event_id = 0, $additional_limit = 2, $available_spaces = 999, $label = '', $show_label = true, $event_meta = '') {
		$event_id = $event_id == 0 ? $_REQUEST['event_id'] : $event_id;

		if ($event_meta == '' && ($event_id != '' || $event_id != 0)) {
			$event_meta = event_espresso_get_event_meta($event_id);
		}

		//If the additional attednee questions are empty, then default to the first question group
		if (empty($event_meta['add_attendee_question_groups']))
			$event_meta['add_attendee_question_groups'] = array(1 => 1);

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
			
			
			// Added for seating chart addon			 
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
<script type="text/javascript">
	$jaer = jQuery.noConflict();
	jQuery(document).ready(function($jaer) { 
		$jaer(function(){
			var removeLink = '<a style="" class="remove" href="#" onclick="$jaer(this).parent().slideUp(function(){ $jaer(this).remove() }); return false"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL . "images/icons/remove.gif"; ?>" alt="<?php _e('Remove Attendee', 'event_espresso'); ?>" /></a>';
			$jaer('a.add').relCopy({
				limit: <?php echo $i; ?>, 
				append: removeLink
			});
			$jaer("#additional_attendees").hide();
			$jaer("#additional_header").click(function(){
				$jaer(this).next("#additional_attendees").slideToggle(500);
			});
		});
	});
</script>
			<?php
			$buffer = ob_get_contents();
			ob_end_clean();
		}
		return $html . $buffer;
	}

}
*/



//This function returns the condition of an event
if (!function_exists('event_espresso_get_is_active')) {

	function event_espresso_get_is_active( $event_id, $event_meta = '', $is_active = FALSE, $event_status = FALSE ) {
		global $wpdb;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		if ( $is_active === FALSE || $event_status === FALSE ) {
			$sql = "SELECT is_active, event_status ";
			$sql .= "FROM " . EVENTS_DETAIL_TABLE;
			$sql .= " WHERE id = '" . $event_id . "'";
			$event = $wpdb->get_row($sql, ARRAY_A);
			$is_active = $event['is_active'];
			$event_status = $event['event_status'];
		}
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$DTM = EEM_Datetime::instance();
		$datetimes = $DTM->get_all_event_dates($event_id);
		$start = 10000000000;
		$regstart = 10000000000;
		$end = 0;
		$regend = 0;
		if ( ! is_array( $datetimes )) {
			$datetimes = array( $datetimes );
		}
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
			$event_status = array('status' => 'REGISTRATION_OPEN', 'display' => __('OPEN', 'event_espresso'), 'display_custom' => '<span class="espresso_open">' . __('Open', 'event_espresso') . '</span>');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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

	function get_number_of_attendees_reg_limit($event_id, $type = 'NULL') {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $espresso_premium, $org_options;
	$url = (!isset($org_options['affiliate_id']) || $org_options['affiliate_id'] == '' || $org_options['affiliate_id'] == 0) ? 'http://eventespresso.com/' : 'https://www.e-junkie.com/ecom/gb.php?cl=113214&c=ib&aff=' . $org_options['affiliate_id'];
	if (!$espresso_premium || !empty($org_options['show_reg_footer'])) {
		return '<p style="font-size: 12px;"><a href="' . $url . '" title="Event Registration Powered by Event Espresso" target="_blank">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress" target="_blank">Event Espresso</a></p>';
	}
}

function espresso_display_questions($questions, $attendee) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (defined( 'EVENT_ESPRESSO_MEMBERS_DIR' )) {
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
			if ($question['required']) {
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
					if (defined( 'EVENT_ESPRESSO_MEMBERS_DIR' )
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
						if (!empty($answer) && !$member_options['autofilled_editable']) {
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
					$html .= '<ul class="event_form_field">';
					/* @var $value type */
					foreach ($values as $value) {
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

	function event_espresso_add_question_groups($question_groups, $answer = '', $event_id = null, $multi_reg = 0, $meta = array()) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $wpdb;
		$event_id = empty($_REQUEST['event_id']) ? $event_id : $_REQUEST['event_id'];
		if (count($question_groups) > 0) {
			$questions_in = '';

			$FILTER = '';
			if (isset($_REQUEST['e_reg']))
				$FILTER = " AND q.admin_only = false ";

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
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/form_build.php');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (empty($meta)) {
		return FALSE;
	}
	if (array_key_exists($name, $meta)) {
		return $meta[$name];
	}
}

//This function returns an array of category data based on an event id
if (!function_exists('espresso_event_category_data')) {

	function espresso_event_category_data($event_id, $all_cats = FALSE) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $wpdb;
		return $wpdb->get_var($wpdb->prepare("SELECT registration_id FROM " . EVENTS_ATTENDEE_TABLE . " WHERE id ='" . $attendee_id . "'"));
	}

}

//Creates a Google Map Link
if (!function_exists('espresso_google_map_link')) {

	function espresso_google_map_link($atts) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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

//escape the commas in csv file export
function escape_csv_val($val) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$type = ($_REQUEST['type']) ? $_REQUEST['type'] : '';
	if (preg_match('/,/', $val) && $type == 'csv') {
		return '"' . $val . '"';
	}

	return $val;
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

	function espresso_show_personnel($event_id, $atts) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;
		if ($espresso_premium != true)
			return;
		global $wpdb;
		extract($atts, EXTR_PREFIX_ALL, "v");
		$v_staff_id = empty($v_staff_id) ? FALSE : $v_staff_id;
		if (!$event_id && !$v_staff_id)
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
		$event_personnel = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {
			$html = '';
			foreach ($event_personnel as $person) {
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
		$v_wrapper_start = empty($v_wrapper_start) ? '' : $v_wrapper_start;
		$v_wrapper_end = empty($v_wrapper_end) ? FALSE : $v_wrapper_end;
		return $v_wrapper_start . $html . $v_wrapper_end;
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		event_espresso_require_file($template_file_name, EVENT_ESPRESSO_GATEWAY_DIR . '/', EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/', $must_exist, $as_require_once);
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, ' $template_file_name = ' . $template_file_name );
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
//	function event_espresso_cleanup_multi_event_registration_id_group_data() {
//	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
//		global $wpdb;
//		$wpdb->query(" delete emerig from " . EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE . " emerig left join " . EVENTS_ATTENDEE_TABLE . "  ea on emerig.registration_id = ea.registration_id where ea.registration_id is null ");
//	}

}

//Function to clean up left out data from attendee cost table
if (!function_exists('event_espresso_cleanup_attendee_cost_data')) {

	/**
	 * event_espresso_cleanup_attendee_cost_data()
	 *
	 * Usage: event_espresso_cleanup_attendee_cost_data()
	 */
//	function event_espresso_cleanup_attendee_cost_data() {
//		global $wpdb;
//		$wpdb->query(" delete eac from " . EVENTS_ATTENDEE_COST_TABLE . " eac left join " . EVENTS_ATTENDEE_TABLE . "  ea on eac.attendee_id = ea.id where ea.id is null ");
//	}

}

function espresso_check_scripts() {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	global $espresso_premium;
	if ($espresso_premium != true)
		return;
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
//function espresso_count_attendees_for_registration($attendee_id) {
//	global $wpdb;
//	$cnt = $wpdb->get_var("SELECT COUNT(1) as cnt FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
//	if ($cnt == 1) {
//		$cnt = $wpdb->get_var("SELECT quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='" . espresso_registration_id($attendee_id) . "' ORDER BY id ");
//		if ($cnt == 0) {
//			return 1;
//		} elseif ($cnt > 0) {
//			return $cnt;
//		}
//	}
//	return $cnt;
//}

//function espresso_is_primary_attendee($attendee_id) {
//	global $wpdb;
//	$sql = "SELECT ea.id FROM " . EVENTS_ATTENDEE_TABLE . " ea ";
//	$sql .= " WHERE ea.id = '" . $attendee_id . "' AND ea.is_primary='1' ";
//	//echo $sql;
//	$wpdb->get_results($sql);
//	if ($wpdb->num_rows > 0) {
//		return true;
//	}
//}

function espresso_ticket_links($registration_id, $attendee_id) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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

function getCountriesArray($lang = "en") {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	//1 for the rest of the world
	//2 is for european union
	$countries = getCountriesArray();
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($country_id == $countries[$t][0])
			return $countries[$t][4];
	return 0;
}

function getCountryName($id, $lang = "en") {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	$countries = getCountriesArray($lang);
	for ($t = 0; $t < sizeof($countries); $t++)
		if ($id == $countries[$t][0])
			return $countries[$t][1];
	return __('No country selected', 'event_espresso');
}

function getCountryFullData($id, $lang = "en") {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
 * 		@ print_r an array
 * 		@ access public
 * 		@ return void
 */
function printr( $var, $var_name = FALSE, $height = 'auto', $die = FALSE ) {
	
	if( ! $var_name ) {
	
		if ( is_object( $var )) {
			$var_name = 'object';
		} else if ( is_array( $var )) {
			$var_name = 'array';
		} else if ( is_numeric( $var )) {
			$var_name = 'numeric';
		} else {
			$var_name = 'string';
		}  
		
	}
	$var_name = str_replace( array( '$', '_' ), array( '', ' ' ), $var_name );
	$var_name = ucwords( $var_name );
	
	echo '<pre style="display:block; width:100%; height:' . $height . '; overflow:scroll; border:2px solid light-blue;">';
	echo '<h3><b>' . $var_name . '</b></h3>';
	echo print_r($var);
	echo '</pre>';
	
	if( $die ) {
		die();
	}
}


/**
 * 		load and display a template
 *
 * 		@param 		string			$path_to_file		server path to the file to be loaded, including the file name and extension
 * 		@param 		array			$template_args	an array of arguments to be extracted for use in the template
 * 		@param 		boolean		$return_string	whether to send ouput immediately to screen, or capture and return as a string
 * 		@return 		void
 */
function espresso_display_template($path_to_file = FALSE, $template_args = FALSE, $return_string = FALSE) {

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	// you gimme nuttin - YOU GET NUTTIN !!
	if (!$path_to_file) {
		return FALSE;
	}
	// if $template_args are not in an array, then make it so
	if (!is_array($template_args)) {
		$template_args = array($template_args);
	}

	extract($template_args);

	if ($return_string) {
		// becuz we want to return a string, we are going to capture the output
		ob_start();
		include( $path_to_file );
		$output = ob_get_clean();
		return $output;
	} else {
		include( $path_to_file );
	}
}

