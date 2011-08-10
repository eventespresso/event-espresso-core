<?php

//Function to check if an array is empty
function isEmptyArray($array) {
    $my_not_empty = create_function('$v', 'return strlen($v) > 0;');
    return (count(array_filter($array, $my_not_empty)) == 0) ? 1 : 0;
}

//Text formatting function.
//This should fix all of the formatting issues of text output from the database.
function espresso_format_content($content='') {
    return wpautop(utf8_encode(html_entity_decode(stripslashes_deep(do_shortcode($content)))));
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

//Returns the price paid for an event by attendee id or the registration id
function espresso_attendee_price($atts) {
	global $wpdb;
	isset($atts)?extract($atts):'';
	
	//If the registration_id is empty, then retrieve it
	if(!isset($registration_id)){
		$registration_id = espresso_registration_id($attendee_id);
	}
	//echo $registration_id;
	
	//Return the total amount paid for this registration
	if(isset($reg_total) && $reg_total = true){
		$sql ='';
		$sql = "SELECT sum(cost) amount_pd, eac.quantity FROM " . EVENTS_ATTENDEE_COST_TABLE ." eac ";
		$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.id = eac.attendee_id ";
		$sql .= " WHERE ea.registration_id ='" . $registration_id . "' LIMIT 0,1";
		//echo $sql;
		$res = $wpdb->get_results($sql);
		if ($wpdb->num_rows >= 1 && $wpdb->last_result[0]->amount_pd != NULL) {
			$total_cost = $wpdb->last_result[0]->amount_pd * $wpdb->last_result[0]->quantity;
			return number_format($total_cost, 2, '.', '');
		}
	}
	
	//Return the total amount paid for a session id
	if(isset($session_total) && $session_total = true){
		$sql ='';
		$sql = "SELECT sum(cost) amount_pd FROM " . EVENTS_ATTENDEE_COST_TABLE ." eac ";
		$sql .= " JOIN " . EVENTS_ATTENDEE_TABLE . " ea ON ea.id = eac.attendee_id ";
		$sql .= " WHERE attendee_session = (SELECT attendee_session FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $registration_id . "' LIMIT 0,1) LIMIT 0,1";
		echo $sql;
		$res = $wpdb->get_results($sql);
		if ($wpdb->num_rows >= 1 && $wpdb->last_result[0]->amount_pd != NULL) {
			$total_cost = $wpdb->last_result[0]->amount_pd;
			return number_format($total_cost, 2, '.', '');
		}
	}

	//Returnt the amount paid for an individual attendee
	if(isset($attendee_id) && $attendee_id > 0){
		$sql ='';
		$sql = "SELECT cost amount_pd, quantity FROM " . EVENTS_ATTENDEE_COST_TABLE . " WHERE attendee_id ='" . $attendee_id . "' ORDER BY attendee_id  LIMIT 0,1";
		//echo $sql;
		$res = $wpdb->get_results($sql);
		if ($wpdb->num_rows >= 1 && $wpdb->last_result[0]->amount_pd != NULL) {
			$total_cost = $wpdb->last_result[0]->amount_pd * $wpdb->last_result[0]->quantity;
			return number_format($total_cost, 2, '.', '');
		}
	}
	
	//If no results are returned above or the registration id was passed, then get the price by looking in EVENTS_ATTENDEE_TABLE
	$sql ='';
	$sql = "SELECT amount_pd FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='" . $registration_id . "' ORDER BY id LIMIT 0,1";
	//echo $sql;
	$res = $wpdb->get_results($sql);
	if ($wpdb->num_rows >= 1) {
        return  number_format($wpdb->last_result[0]->amount_pd, 2, '.', '');;
    }
}

//For testing email functions
function event_espresso_test_email($optional_message = 'None') {
    global $org_options;

    $to = $org_options['contact_email'];
    $subject = 'Event Espresso Test Message from' . $org_options['organization'];
    $message = 'Event Espresso email is working properly. Optional message: ' . $optional_message;
    $headers = 'From: ' . $org_options['contact_email'] . "\r\n" .
            'Reply-To: ' . $org_options['contact_email'] . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
    wp_mail($to, $subject, $message, $headers);
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
    if (!isset($_SESSION['espresso_session_id'])) {
        $sessionid = (mt_rand(100, 999) . time());
        $_SESSION['espresso_session_id'] = $sessionid;
    }
    return $_SESSION['espresso_session_id'];
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

if (!function_exists('event_espresso_additional_attendees')) {

    function event_espresso_additional_attendees($event_id=0, $additional_limit=2, $available_spaces=999, $label='') {
        $event_id = $event_id == 0 ? $_REQUEST['event_id'] : $event_id;
        if ($event_id != '' || $event_id != 0)
            $event_meta = event_espresso_get_event_meta($event_id);

        if ($event_meta['additional_attendee_reg_info'] == 1) {
            $label == '' ? _e('Number of Attendees', 'event_regis') : $label;
            ?>
            <p class="espresso_additional_limit">

                <label for="num_people"><?php echo $label; ?></label>
                <select name="num_people" id="num_people-<?php echo $event_id; ?>" style="width:70px;margin-top:4px">
                    <?php
                    while (($i <= $additional_limit) && ($i < $available_spaces)) {
                        $i++;
                        ?>
                        <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                        <?php
                    }
                    ?>
                </select>
                <br />
                <input type="hidden" name="espresso_addtl_limit_dd" value="true">
            </p>
            <?php
        } else {
            while (($i <= $additional_limit) && ($i < $available_spaces)) {
                $i++;
            }
            $i = $i - 1;
            ?>
            <p class="event_form_field additional_header" id="additional_header"><a onclick="return false;" href="#"><?php _e('Add More Attendees? (click to toggle, limit ' . $i . ')', 'event_espresso'); ?></a> </p><div id="additional_attendees"><div class="clone espresso_add_attendee"><p><label for="x_attendee_fname"><?php _e('First Name', 'event_espresso'); ?>:</label> <input type="text" name="x_attendee_fname[]" class='input'/></p><p><label for="x_attendee_lname"><?php _e('Last Name', 'event_espresso'); ?>:</label> <input type="text" name="x_attendee_lname[]" class='input'/></p><p><label for="x_attendee_email"><?php _e('Email', 'event_espresso'); ?>:</label> <input type="text" name="x_attendee_email[]" class='input'/></p><a href="#" class="add" rel=".clone" title="<?php _e('Add an Additonal Attendee', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL . "images/icons/add.png"; ?>" alt="<?php _e('Add an Additonal Attendee', 'event_espresso'); ?>" /></a></div><hr /></div><script type="text/javascript">$jaer = jQuery.noConflict();jQuery(document).ready(function($jaer) { $jaer(function(){var removeLink = '<a style="" class="remove" href="#" onclick="$jaer(this).parent().slideUp(function(){ $jaer(this).remove() }); return false"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL . "images/icons/remove.gif"; ?>" alt="<?php _e('Remove Attendee', 'event_espresso'); ?>" /></a>';$jaer('a.add').relCopy({limit: <?php echo $i; ?>, append: removeLink});$jaer("#additional_attendees").hide();/*toggle the componenet with class msg_body*/$jaer("#additional_header").click(function(){$jaer(this).next("#additional_attendees").slideToggle(500);});});});</script>
            <?php
        }
    }

}



//This function returns the condition of an event
if (!function_exists('event_espresso_get_is_active')) {

    function event_espresso_get_is_active($event_id) {
        global $wpdb, $org_options;
        //If the timezome is set in the wordpress database, then lets use it as the default timezone.
        if (get_option('timezone_string') != '') {
            date_default_timezone_set(get_option('timezone_string'));
        }

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

        //$timezone_string =  $wpdb->last_result[0]->timezone_string;
        //$t = time();
        //$today = date_at_timezone("Y-m-d H:i", $timezone_string, $t);
        //Build the timestamps
        $timestamp = strtotime($start_date . ' ' . $start_time); //Creates a timestamp from the event start date and start time
        $registration_start_timestamp = strtotime($registration_start); //Creates a timestamp from the event registration start date
        $registration_end_timestamp = strtotime($registration_end); //Creates a timestamp from the event registration start date
        //echo $timestamp;
        //echo date('Y-m-d h:i:s A', time());
        //echo time('', $timestamp);
        //echo date(time());
        //echo ' event date = '.date( $timestamp);
        //$org_options['expire_on_registration_end'] = 'Y';
        //IF the event is ongoing, then display ongoing
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

        /*         * * Check registration dates ** */

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

        /*         * * End Check registration dates ** */

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

    function event_espresso_get_status($event_id) {
        $event_status = event_espresso_get_is_active($event_id);
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
                $a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND quantity >= 1 AND (payment_status='Completed' OR payment_status='Pending') ";
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
                $a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND payment_status='Completed' ";
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

function event_espresso_paid_status_icon($payment_status ='') {
    switch ($payment_status) {
        case 'Checkedin':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/accept.png" width="16" height="16" alt="' . __('Checked-in', 'event_espresso') . '" title="' . __('Checked-in', 'event_espresso') . '" />';
            break;
        case 'NotCheckedin':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Not Checked-in', 'event_espresso') . '" title="' . __('Not Checked-in', 'event_espresso') . '" />';
            break;
        case 'Completed':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/accept.png" width="16" height="16" alt="' . __('Completed', 'event_espresso') . '" title="' . __('Completed', 'event_espresso') . '" />';
            break;

        case 'Pending':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/error.png" width="16" height="16" alt="' . __('Pending', 'event_espresso') . '" title="' . __('Pending', 'event_espresso') . '" />';
            break;
        case 'Payment Declined':
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Payment Declined', 'event_espresso') . '" title="' . __('Payment Declined', 'event_espresso') . '" />';
            break;
        default:
            echo '<img align="absmiddle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/exclamation.png" width="16" height="16" alt="' . __('Incomplete', 'event_espresso') . '" title="' . __('Incomplete', 'event_espresso') . '" />';
            break;
    }
}

//Retturns the first price assocaited with an event. If an event has more that one price, you can pass the number of the second price.
if (!function_exists('espresso_return_price')) {

    function espresso_return_single_price($event_id, $number=0) {
        global $wpdb, $org_options;
        $number = $number == 0 ? '0,1' : $number . ',' . $number;

        $results = $wpdb->get_results("SELECT id, event_cost, surcharge FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC LIMIT " . $number);
        if ($wpdb->num_rows > 0) {
            foreach ($results as $result) {
                if ($result->event_cost > 0.00) {
                    $event_cost = $result->surcharge > 0.00 && $result->event_cost > 0.00 ? $result->event_cost + number_format($result->event_cost * $result->surcharge / 100, 2, '.', '') : $result->event_cost;

                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $event_cost);
                        $event_cost = $early_price_data['event_price'];
                    }
                } else {
                    $event_cost = '0.00';
                }
            }
        } else {
            $event_cost = '0.00';
        }

        return $event_cost;
    }

}

/*
  Returns the price of an event
 */
if (!function_exists('event_espresso_get_price')) {

    function event_espresso_get_price($event_id) {
        global $wpdb, $org_options;
        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type, price_type FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC LIMIT 1");
        $surcharge = '';
        $surcharge_text = isset($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso');
        foreach ($results as $result) {
            if ($wpdb->num_rows == 1) {
                if ($result->event_cost > 0.00) {
                    $event_cost = $org_options['currency_symbol'] . $result->event_cost;
                    if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                        $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                        if ($result->surcharge_type == 'pct') {
                            $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                        }
                    }
                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $result->event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $result->event_cost);
                        $result->event_cost = $early_price_data['event_price'];
                        $message = sprintf(__(' (including %s early discount) ', 'event_espresso'), $early_price_data['early_disc']);
                        //$surcharge = ($result->surcharge > 0.00 && $result->event_cost > 0.00)?" +{$result->surcharge}% " . __('Surcharge','event_espresso'):'';
                        $event_cost = '<span class="event_price_value">' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . '</span>';
                    }

                    $event_cost .= '<input type="hidden"name="event_cost" value="' . $result->event_cost . '">';
                } else {
                    $event_cost = __('Free Event', 'event_espresso');
                }
            } else if ($wpdb->num_rows == 0) {
                $event_cost = __('Free Event', 'event_espresso');
            }
        }
        return $event_cost . $surcharge;
    }

}

/*
  Returns the final price of an event
 *
 * @params int $price_id
 * @params int $event_id
 */
if (!function_exists('event_espresso_get_final_price')) {

    function event_espresso_get_final_price($price_id, $event_id = 0) {
        global $wpdb, $org_options;
        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type FROM " . EVENTS_PRICES_TABLE . " WHERE id='" . $price_id . "' ORDER BY id ASC LIMIT 1");
        foreach ($results as $result) {
            if ($wpdb->num_rows >= 1) {
                if ($result->event_cost > 0.00) {

                    $surcharge = number_format($result->surcharge, 2, '.', ''); //by default it's 0.  if flat rate, will just be formatted and atted to the total
                    if ($result->surcharge > 0 && $result->surcharge_type == 'pct') { //if >0 and is percent, calculate surcharg amount to be added to total
                        $surcharge = number_format($result->event_cost * $result->surcharge / 100, 2, '.', '');
                    }

                    $event_cost = $result->event_cost;

                    // Addition for Early Registration discount
                    if (early_discount_amount($event_id, $event_cost) != false) {
                        $early_price_data = array();
                        $early_price_data = early_discount_amount($event_id, $event_cost);
                        $event_cost = $early_price_data['event_price'];
                    }
                } else {
                    $event_cost = __('0.00', 'event_espresso');
                }
            } else if ($wpdb->num_rows == 0) {
                $event_cost = __('0.00', 'event_espresso');
            }
        }
        if(empty($surcharge)) $surcharge = 0;
        $event_cost = $event_cost + $surcharge;
        return empty($event_cost) ? 0 : $event_cost;
    }

}


//Get the early bird pricing
if (!function_exists('early_discount_amount')) {

    function early_discount_amount($event_id, $event_cost, $message='') {
        global $wpdb, $org_options;

        //$message = ' ' . __('Early Pricing','event_espresso');
        $eventdata = $wpdb->get_results("SELECT early_disc, early_disc_date, early_disc_percentage FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "' LIMIT 1");
        if ((strlen($eventdata[0]->early_disc) > 0) && (strtotime($eventdata[0]->early_disc_date) > strtotime(date("Y-m-d")))) {
            $early_price_display = $eventdata[0]->early_disc_percentage == 'Y' ? $eventdata[0]->early_disc . '%' : $org_options['currency_symbol'] . $eventdata[0]->early_disc;
            if ($eventdata[0]->early_disc_percentage == 'Y') {
                $pdisc = $eventdata[0]->early_disc / 100;
                $event_cost = $event_cost - ($event_cost * $pdisc);
            } else {
                // Use max function to prevent negative cost when discount exceeds price.
                $event_cost = max(0, $event_cost - $eventdata[0]->early_disc);
            }
            //$extra = " " . $message;
            $early_price_data = array('event_price' => $event_cost, 'early_disc' => $early_price_display);
            return $early_price_data;
        } else {
            return false;
        }
    }

}

//Creates dropdowns if multiple prices are associated with an event
if (!function_exists('event_espresso_price_dropdown')) {

    function event_espresso_price_dropdown($event_id, $label = 1, $multi_reg = 0, $value = '') {
        global $wpdb, $org_options;

        //Will make the name an array and put the time id as a key so we
        //know which event this belongs to
        $multi_name_adjust = $multi_reg == 1 ? "[$event_id]" : '';
        $surcharge_text = isset($org_options['surcharge_text']) ? $org_options['surcharge_text'] : __('Surcharge', 'event_espresso');

        $results = $wpdb->get_results("SELECT id, event_cost, surcharge, surcharge_type, price_type FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' ORDER BY id ASC");
        if ($wpdb->num_rows > 1) {
            echo $label == 1 ? '<label for="event_cost">' . __('Choose an Option: ', 'event_espresso') . '</label>' : '';
            echo '<select name="price_option' . $multi_name_adjust . '" id="price_option-' . $event_id . '">';
            foreach ($results as $result) {

                $selected = $value == $result->id ? ' selected="selected" ' : '';

                // Addition for Early Registration discount
                if (early_discount_amount($event_id, $result->event_cost) != false) {
                    $early_price_data = array();
                    $early_price_data = early_discount_amount($event_id, $result->event_cost);
                    $result->event_cost = $early_price_data['event_price'];
                    $message = __(' Early Pricing', 'event_espresso');
                }

                $surcharge = '';

                if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                    $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                    if ($result->surcharge_type == 'pct') {
                        $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                    }
                }

                //Using price ID
                echo '<option' . $selected . ' value="' . $result->id . '|' . $result->price_type . '">' . $result->price_type . ' (' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . ') ' . $surcharge . ' </option>';
            }
            echo '</select><input type="hidden" name="price_select" id="price_select-' . $event_id . '" value="true">';
        } else if ($wpdb->num_rows == 1) {
            foreach ($results as $result) {

                // Addition for Early Registration discount
                if (early_discount_amount($event_id, $result->event_cost) != false) {
                    $early_price_data = array();
                    $early_price_data = early_discount_amount($event_id, $result->event_cost);
                    $result->event_cost = $early_price_data['event_price'];
                    $message = sprintf(__(' (including %s early discount) ', 'event_espresso'), $early_price_data['early_disc']);
                }

                $surcharge = '';

                if ($result->surcharge > 0 && $result->event_cost > 0.00) {
                    $surcharge = " + {$org_options['currency_symbol']}{$result->surcharge} " . $surcharge_text;
                    if ($result->surcharge_type == 'pct') {
                        $surcharge = " + {$result->surcharge}% " . $surcharge_text;
                    }
                }
                $message = isset($message) ? $message : '';
                echo '<span class="event_price_label">' . __('Price:', 'event_espresso') . '</span> <span class="event_price_value">' . $org_options['currency_symbol'] . number_format($result->event_cost, 2) . $message . $surcharge . '</span>';
                echo '<input type="hidden" name="price_id' . $multi_name_adjust . '" id="price_id-' . $result->id . '" value="' . $result->id . '">';
            }
        } else if ($wpdb->num_rows == 0) {
            echo '<span class="free_event">' . __('Free Event', 'event_espresso') . '</span>';
            echo '<input type="hidden" name="payment' . $multi_name_adjust . '" id="payment-' . $event_id . '" value="' . __('free event', 'event_espresso') . '">';
        }
    }

}

//This function gets the first price id associated with an event and displays a hidden field.
function espresso_hidden_price_id($event_id) {
    global $wpdb, $org_options;
    $wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
    $num_rows = $wpdb->num_rows;
    if ($num_rows > 0) {
        return '<input type="hidden" name="price_id" id="price_id-' . $wpdb->last_result[0]->id . '" value="' . $wpdb->last_result[0]->id . '">';
    } else {
        return '<div style="display:none">' . __('No prices id results.', 'event_espresso') . '</div>';
    }
}

//This function returns the first price id associated with an event
function espresso_get_price_id($event_id) {
    global $wpdb, $org_options;
    $wpdb->get_results("SELECT id FROM " . EVENTS_PRICES_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
    $num_rows = $wpdb->num_rows;
    if ($num_rows > 0) {
        return $wpdb->last_result[0]->id;
    } else {
        return 0;
    }
}

function event_espresso_update_alert($url='') {
    return wp_remote_retrieve_body(wp_remote_get($url));
}

function espresso_registration_footer() {
    global $espresso_premium, $org_options;
    $url = (!isset($org_options['affiliate_id']) || $org_options['affiliate_id'] == '' || $org_options['affiliate_id'] == 0) ? 'http://eventespresso.com/' : 'https://www.e-junkie.com/ecom/gb.php?cl=113214&c=ib&aff=' . $org_options['affiliate_id'];
    if ($espresso_premium != true || (isset($org_options['show_reg_footer']) && $org_options['show_reg_footer'] == 'Y')) {
        echo '<p style="font-size: 12px;"><a href="' . $url . '" title="Event Registration Powered by Event Espresso" target="_blank">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress" target="_blank">Event Espresso</a></p>';
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

//Build the form questions. This function can be overridden using the custom files addon
if (!function_exists('event_espresso_add_question_groups')) {

    function event_espresso_add_question_groups($question_groups, $answer= '', $event_id = null, $multi_reg = 0, $meta = array()) {
        global $wpdb;
        $event_id = $event_id != '' ? $event_id : $_REQUEST['event_id'];
        if (count($question_groups) > 0) {
            $questions_in = '';

            $FILTER = '';
            if (isset($_REQUEST['regevent_action']))
                $FILTER = " AND q.admin_only = 'N' ";

            //echo 'additional_attendee_reg_info = '.$meta['additional_attendee_reg_info'].'<br />';
            //Only personal inforamation for the additional attendees in each group
            if (isset($meta['additional_attendee_reg_info']) && $meta['additional_attendee_reg_info'] == '2' && isset($meta['attendee_number']) && $meta['attendee_number'] > 1)
                $FILTER .= " AND qg.system_group = 1 ";

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

            if ($num_rows > 0) {
                $questions_displayed = array();
                foreach ($questions as $question) {
                    if (!in_array($question->id, $questions_displayed)) {
                        $questions_displayed[] = $question->id;

                        //if new group, close fieldset
                        echo ($group_name != '' && $group_name != $question->group_name) ? '</div>' : '';

                        if ($group_name != $question->group_name) {
                            echo '<div class="event_questions" id="' . $question->group_identifier . '">';
                            echo $question->show_group_name != 0 ? "<h4 class=\"reg-quest-title section-title\">$question->group_name</h4>" : '';
                            echo $question->show_group_description != 0 && true == $question->group_description ? "<p class='quest-group-descript'>$question->group_description</p>" : '';
                            $group_name = $question->group_name;
                        }

                        event_form_build($question, $answer, $event_id, $multi_reg, $meta);
                        $counter++;
                        echo $counter == $num_rows ? '</div>' : '';
                    }
                }
            }//end questions display
        }
    }

}

//Social media buttons
if (!function_exists('espresso_show_social_media')) {

    function espresso_show_social_media($event_id, $type = 'twitter') {
        switch ($type) {
            case 'twitter':
                if (function_exists('espresso_twitter_button')) {
                    return espresso_twitter_button($event_id);
                }
                break;
            case 'facebook':
                if (function_exists('espresso_facebook_button')) {
                    return espresso_facebook_button($event_id);
                }
                break;
            default:
                break;
        }
    }

}

//This function returns an array of category data based on an event id
if (!function_exists('espresso_event_category_data')) {

    function espresso_event_category_data($event_id) {
        global $wpdb;
        $sql = "SELECT c.category_identifier, c.category_name, c.category_desc, c.display_desc FROM " . EVENTS_DETAIL_TABLE . " e ";
        $sql .= " JOIN " . EVENTS_CATEGORY_REL_TABLE . " r ON r.event_id = e.id ";
        $sql .= " JOIN " . EVENTS_CATEGORY_TABLE . " c ON  c.id = r.cat_id ";
        $sql .= " WHERE e.id = '" . $event_id . "' ";

        $wpdb->get_results($sql);
        $num_rows = $wpdb->num_rows;

        if ($num_rows > 0) {
            $category_data = array('category_identifier' => $wpdb->last_result[0]->category_identifier, 'category_name' => $wpdb->last_result[0]->category_name, 'category_desc' => $wpdb->last_result[0]->category_desc, 'display_desc' => $wpdb->last_result[0]->display_desc);
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
                    return $wpdb->last_result[0]->price_type;
                }
                break;
        }
    }

}

if (!function_exists('espresso_payment_type')) {

    function espresso_payment_type($type) {
        switch ($type) {
            case 'web_accept':
                return __('PayPal', 'event_espresso');
                break;
            case 'EW':
                return __('eWay', 'event_espresso');
                break;
            case 'CC':
            case 'PPP':
            case 'auth_capture':
            case 'FD':
                return __('CC', 'event_espresso');
                break;
            case 'INV':
                return __('Invoice', 'event_espresso');
                break;
            case 'OFFLINE':
                return __('Offline payment', 'event_espresso');
                break;
            default:
                return __($type, 'event_espresso');
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

        $gaddress = ($address != '' ? $address : '') . ($city != '' ? ',' . $city : '') . ($state != '' ? ',' . $state : '') . ($zip != '' ? ',' . $zip : '') .
                ($country != '' ? ',' . $country : '');

        $google_map = htmlentities2('http://maps.google.com/maps?q=' . $gaddress);

        switch ($type) {
            case 'text':
            default:
                $text = $text == '' ? __('Map and Directions', 'event_espresso') : $text;
                break;

            case 'url':
                $text = $google_map;
                break;
				
			 case 'map':
			 	$google_map_link = '<a href="' . $google_map . '" target="_blank">' . '<image id="venue_map_'.$id.'" '.$map_image_class.' src="'.htmlentities2('http://maps.googleapis.com/maps/api/staticmap?center=' . $gaddress.'&amp;zoom=14&amp;size='.$map_w.'x'.$map_h.'&amp;markers=color:green|label:|'.$gaddress.'&amp;sensor=false') .'" /></a>';
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

function espresso_getTinyUrl($url) {
    return file_get_contents("http://tinyurl.com/api-create.php?url=" . $url);
}

function espresso_redirect($event_id) {
    global $org_options;
    if ($event_id != '') {
        if (file_exists(getcwd() . '/wp-includes/pluggable.php')) {
            require_once( getcwd() . '/wp-includes/pluggable.php' );
            $event_url = home_url() . "/?page_id=" . $org_options['event_page_id'] . "&regevent_action=register&event_id=" . $event_id;
            wp_redirect($event_url, '301');
            exit;
        } else {
            exit;
        }
    }
}

function espresso_add_query_vars($aVars) {
    $aVars[] = "searchdate";    // represents the name of the date as shown in the URL
    return $aVars;
}

// hook add_query_vars function into query_vars
add_filter('query_vars', 'espresso_add_query_vars');

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
     * @param bool $must_exist          // Error if neither file exist.
     * @param bool $as_require_once     // True for require_once(), False for require()
     * @return void    // No return value. File already included.
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
     * @param bool $must_exist          // Error if neither file exist.
     * @param bool $as_require_once     // True for require_once(), False for require()
     * @return void    // No return value. File already included.
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
     * @param mixed $path_first         // First choice for file location.
     * @param mixed $path_first         // Fallback location for file.
     * @param bool $must_exist          // Error if neither file exist.
     * @param bool $as_require_once     // True for require_once(), False for require()
     * @return void    // No return value. File already included.
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