<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

//Time and date functions

/* -------------------------------------------------------------
  Name:	  espresso_countdown

  Purpose:   Calculates countdown times
  Receive:   $time_start, $time_end, $message
  Return:	$output_countdown
  ------------------------------------------------------------- */
function espresso_countdown($time_start, $time_end, $expired_message) {
	//If the timezome is set in the wordpress database, then lets use it as the default timezone.
	if (get_option('timezone_string') != '') {
		date_default_timezone_set(get_option('timezone_string'));
	}

	$present = current_time('timestamp');
	$difference = $time_start - $present;
	$daystart = floor($present / 86400) * 86400;
	$dayend = $daystart + 86400;

	if ($difference < 0)
		$difference = 0;

	$days_left = floor($difference / 60 / 60 / 24);
	$hours_left = floor(($difference - $days_left * 60 * 60 * 24) / 60 / 60);
	$minutes_left = floor(($difference - $days_left * 60 * 60 * 24 - $hours_left * 60 * 60) / 60);

	if ($minutes_left < "10")
		$minutes_left = "0" . $minutes_left;
	if ($hours_left < "10")
		$hours_left = "0" . $hours_left;

	$output_countdown = '';
	if ($days_left == 0 and $hours_left == 0 and $minutes_left == 0 and $present > $time_end) {
		$output_countdown .= $message;
	} else if ($days_left == 0) {
		$output_countdown .= __('in', 'event_espresso') . ' ' . $hours_left . ':' . $minutes_left . ' ' . __('hours', 'event_espresso') . '.';
	} else if ($time_end >= $daystart and $time_start <= $dayend) {
		$output_countdown .= __('today', 'event_espresso') . '. ' . __('in', 'event_espresso') . ' ' . $minutes_left . ' ' . __('minutes', 'event_espresso') . '.';
	} else {
		$output_countdown .= __('in', 'event_espresso') . ' ';
		if ($days_left == 1) {
			$output_countdown .= $days_left . ' ' . __('day', 'event_espresso') . ' ';
		} else {
			$output_countdown .= $days_left . ' ' . __('days', 'event_espresso') . ' ';
		}
		$output_countdown .= __('and', 'event_espresso') . ' ' . $hours_left . ':' . $minutes_left . ' ' . __('hours', 'event_espresso') . '.';
	}
	return $output_countdown;
}

/* -------------------------------------------------------------
  Name:	  espresso_countup

  Purpose:   Calculates the time since the event
  Receive:   $time_start, $time_end, $message
  Return:	$output_archive
  ------------------------------------------------------------- */

function espresso_countup($time_start, $time_end, $expired_message) {
	//If the timezome is set in the wordpress database, then lets use it as the default timezone.
	if (get_option('timezone_string') != '') {
		date_default_timezone_set(get_option('timezone_string'));
	}
	$present = current_time('timestamp');
	$difference = $present - $time_start;
	$daystart = floor($present / 86400) * 86400;
	$dayend = $daystart + 86400;

	if ($difference < 0)
		$difference = 0;

	$days_ago = floor($difference / 60 / 60 / 24);
	$hours_ago = floor(($difference - $days_ago * 60 * 60 * 24) / 60 / 60);
	$minutes_ago = floor(($difference - $days_ago * 60 * 60 * 24 - $hours_ago * 60 * 60) / 60);

	if ($minutes_ago < "10")
		$minutes_ago = "0" . $minutes_ago;
	if ($hours_ago < "10")
		$hours_ago = "0" . $hours_ago;

	$output_archive = '';
	if ($days_ago == 0 and $hours_ago == 0 and $minutes_ago == 0 and $present > $time_end) {
		$output_archive .= $message;
	} else if ($days_ago == 0) {
		$output_archive .= $hours_ago . ':' . $minutes_ago . ' ' . __('hours', 'event_espresso') . ' ' . __('ago', 'event_espresso') . '.';
	} else {
		if ($days_ago == 1) {
			$output_archive .= $days_ago . ' ' . __('day', 'event_espresso') . ' ';
		} else {
			$output_archive .= $days_ago . ' ' . __('days', 'event_espresso') . ' ';
		}
		$output_archive .=__('and', 'event_espresso') . ' ' . $hours_ago . ':' . $minutes_ago . ' ' . __('hours', 'event_espresso') . ' ' . __('ago', 'event_espresso') . '.';
	}
	return $output_archive;
}

/* -------------------------------------------------------------
  Name:	  espresso_duration

  Purpose:   Calculates the duration of the event
  Receive:   $event_start, $event_end, $allday
  Return:	$output_duration
  ------------------------------------------------------------- */

function espresso_duration($event_start, $event_end, $allday) {
	//If the timezome is set in the wordpress database, then lets use it as the default timezone.
	if (get_option('timezone_string') != '') {
		date_default_timezone_set(get_option('timezone_string'));
	}

	$difference = $event_end - $event_start;
	if ($difference < 0)
		$difference = 0;

	$days_duration = floor($difference / 60 / 60 / 24);
	$hours_duration = floor(($difference - $days_duration * 60 * 60 * 24) / 60 / 60);
	$minutes_duration = floor(($difference - $days_duration * 60 * 60 * 24 - $hours_duration * 60 * 60) / 60);

	if ($minutes_duration < "10")
		$minutes_duration = "0" . $minutes_duration;
	if ($hours_duration < "10")
		$hours_duration = "0" . $hours_duration;

	$output_duration = '';
	if ($allday) {
		$output_duration .= __('allday', 'event_espresso');
	} else if (($days_duration == 0 and $hours_duration == 0 and $minutes_duration == 0) or ($event_start == $event_end)) {
		$output_duration .= __('duration', 'event_espresso');
	} else if ($days_duration == 0) {
		$output_duration .= $hours_duration . ':' . $minutes_duration . ' ' . __('hours', 'event_espresso') . '.';
	} else if ($days_duration == 0 and $hours_duration == 0) {
		$output_duration .= $minutes_duration . ' ' . __('minutes', 'event_espresso') . '.';
	} else {
		if ($days_duration == 1) {
			$output_duration .= $days_duration . ' ' . __('day', 'event_espresso') . ' ';
		} else {
			$output_duration .= $days_duration . ' ' . __('days', 'event_espresso') . ' ';
		}
		$output_duration .= __('and', 'event_espresso') . ' ' . $hours_duration . ':' . $minutes_duration . ' ' . __('hours', 'event_espresso') . '.';
	}

	return $output_duration;
}

//This function returns the registration limit associated with a time for an event
if (!function_exists('espresso_get_time_reg_limit')) {

	function espresso_get_time_reg_limit($time_id=0) {
		if ($time_id == 0)
			return 0;
		global $wpdb;
		$sql = "SELECT reg_limit FROM " . EVENTS_START_END_TABLE . " WHERE id='" . $time_id . "'  LIMIT 0,1 ";
		$data = $wpdb->get_results($sql);
		if ($wpdb->num_rows > 0)
			return $wpdb->last_result[0]->reg_limit;
	}

}

//Creates a dropdown if multiple times are associated with an event
if (!function_exists('event_espresso_time_dropdown')) {

	function event_espresso_time_dropdown($event_id = 'NULL', $label = 1, $multi_reg = 0, $value = '') {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$html = '';
		$cache = true;

		//Will make the name an array and put the event id as a key so we
		//know which event this belongs to
		$multi_name_adjust = $multi_reg == 1 ? "[$event_id]" : '';

		$time_reg_limit = $org_options['time_reg_limit'];
		//$time_reg_limit = true;
		//echo $num_attendees;

		$sql = "SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "' ";

		//Not sure if this is needed. Removed by Seth 2-10-11
		/*if (!empty($org_options['use_event_timezones'])) {
			$sql = "SELECT timezone_string FROM " . EVENTS_DETAIL_TABLE . " WHERE id='" . $event_id . "' ";
			$events = $wpdb->get_results($sql);

			foreach ($events as $event) {
				$timezone_string = empty($event->timezone_string) ? '' : $event->timezone_string;
			}
		}*/

		//This is the initial check to see if we time slot are controlled by registration limits.
		if ($time_reg_limit) {
			//$num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees');
			//$sql .= " AND (reg_limit = '0' OR reg_limit >= '" .$num_attendees."') ";

			$sql = "SELECT es.*, (es.reg_limit - count(ea.id)) as available_spaces FROM " . EVENTS_START_END_TABLE . " es
								left join  " . EVENTS_ATTENDEE_TABLE . " ea
								on
								es.event_id = ea.event_id
								and es.start_time = ea.event_time
								and es.end_time = ea.end_time
								where es.event_id= $event_id
								group by es.id";
			$cache = false;
		}

		if ($cache == true) {
			$html = get_transient( 'espresso_time_dropdown_'.$event_id );
		}else{
			$html = false;
		}

		if ( false === $html ) {
			// if transient not set, do this!

			// create the data that needs to be saved.
			$event_times = $wpdb->get_results($sql);
			if ($wpdb->num_rows == 1) {//If one result, then display the times.
				$html .= $label == 1 ? '<span class="span_event_time_label">' . __('Start Time:</span> ', 'event_espresso') . '</span>' : '';
				foreach ($event_times as $time) {
					$html .= '<span class="span_event_time_value">' . event_date_display($time->start_time, get_option('time_format')) . '</span>';
					$html .= $label == 1 ? '<br /><span class="span_event_time_label">' . __('End Time: ', 'event_espresso') . '</span>' : __(' to ', 'event_espresso');
					$html .= '<span class="span_event_time_value">' . event_date_display($time->end_time, get_option('time_format')) . '</span>';
					$html .= '<input type="hidden" name="start_time_id' . $multi_name_adjust . '" id="start_time_id_' . $time->id . '" value="' . $time->id . '">';
				}
			} else if ($wpdb->num_rows > 1) {//If more than one result, then display the dropdown
				//print_r($event_times);
				$html .= $label == 1 ? '<label class="start_time_id" for="start_time_id">' . __('Choose a Time: ', 'event_espresso') . '</label>' : '';
				$html .= '<select name="start_time_id' . $multi_name_adjust . '" id="start_time_id-' . $event_id . '">';
				//$html .= $label == 0 ?'<option  value="">' .__('Select a Time', 'event_espresso') . '</option>':'';
				foreach ($event_times as $time) {
					$selected = $value == $time->id ? ' selected="selected" ' : '';
					switch ($time_reg_limit) {//This checks to see if the time slots are controlled by registration limits.
						case true:
							//If the time slot is controlled by a registration limit.
							//Then we need to check if there are enough spaces available.
							//if (($time->reg_limit == 0)||($time->reg_limit > 0 && $time->reg_limit >=$num_attendees))
							//If enough spaces are available, then show this time slot
							if ($time->available_spaces > 0)
								$html .= '<option' . $selected . ' value="' . $time->id . '">' . event_date_display($time->start_time, get_option('time_format')) . ' - ' . event_date_display($time->end_time, get_option('time_format')) . " ($time->available_spaces " . __('available spaces', 'event_espresso') . ")" . '</option>';
							break;
						case false://If time slots are not controlled by registration limits, then we show the default dropdown list of times.
						default:
							$html .= '<option ' . $selected . ' value="' . $time->id . '">' . event_date_display($time->start_time, get_option('time_format')) . ' - ' . event_date_display($time->end_time, get_option('time_format')) . '</option>';
							break;
					}
				}
				$html .= '</select>';
			}

			if ($cache == true) {
				// save the newly created transient value
				// 60 seconds * 60 minutes * 24 hours * 365 = 1 year
				set_transient('espresso_time_dropdown_'.$event_id, $html, 60*60*24*365);

				//Debug:
				//Check if using the cache
				//echo 'Not using cache';
			}
		}

		return $html;
	}

}

function espresso_time_id_hidden_field($event_id, $multi_reg = 0) {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	//Will make the name an array and put the event id as a key so we
	//know which event this belongs to
	$multi_name_adjust = $multi_reg == 1 ? "[$event_id]" : '';

	$time_reg_limit = $org_options['time_reg_limit'];
	//$time_reg_limit = true;
	//echo $num_attendees;
	$sql = "SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ";


	//This is the initial check to see if we time slot are controlled by registration limits.
	if ($time_reg_limit) {
		//$num_attendees = get_number_of_attendees_reg_limit($event_id, 'num_attendees');
		//$sql .= " AND (reg_limit = '0' OR reg_limit >= '" .$num_attendees."') ";

		$sql = "SELECT es.*, (es.reg_limit - count(ea.id)) as available_spaces FROM " . EVENTS_START_END_TABLE . " es
								left join  " . EVENTS_ATTENDEE_TABLE . " ea
								on
								es.event_id = ea.event_id
								and es.start_time = ea.event_time
								and es.end_time = ea.end_time
								where es.event_id= $event_id
								group by es.id";
	}
	$event_times = $wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {//If one result, then display the times.
		$time_id = $wpdb->last_result[0]->id;
		return '<input type="hidden" name="start_time_id' . $multi_name_adjust . '" id="start_time_id_' . $time_id . '" value="' . $time_id . '">';
	}
}

//Get a single start or end time
// @params $event_id (required)
// @params $time (optional, start_time (default) | end_time)
if (!function_exists('event_espresso_get_time')) {

	function event_espresso_get_time($event_id, $format = 'start_time') {
		global $wpdb;
		$event_times = $wpdb->get_results("SELECT " . $format . " FROM " . EVENTS_START_END_TABLE . " WHERE event_id='" . $event_id . "' LIMIT 0,1 ");
		if ($wpdb->num_rows > 0) {
			foreach ($event_times as $time) {
				switch ($format) {
					case 'start_time' :
						return event_date_display($time->start_time, get_option('time_format'));
						break;
					case 'end_time' :
						return event_date_display($time->end_time, get_option('time_format'));
						break;
				}
			}
		}
	}

}


/*
 * Time display function
 * Shows an event time based on time_id
 * @params string $time_id
 * @params string $format - format for the time display
 * 	start - show the event start time only
 * 	end - show the event end time only
 * 	default - show the event end and start time
 */
if (!function_exists('event_espresso_display_selected_time')) {

	function event_espresso_display_selected_time($time_id = 0, $format = 'NULL') {
		global $wpdb;
		$html = '';
		$event_times = $wpdb->get_results("SELECT * FROM " . EVENTS_START_END_TABLE . " WHERE id='" . $time_id . "'");
		foreach ($event_times as $time) {
			switch ($format) {
				case 'start' :
					$html .= event_date_display($time->start_time, get_option('time_format'));
					break;

				case 'end' :
					$html .= event_date_display($time->end_time, get_option('time_format'));
					break;
				default :
					$html .= '<span class="section-title">' . __('Time:  ', 'event_espresso') . '</span>';
					$html .= event_date_display($time->start_time, get_option('time_format')) . ' - ' . event_date_display($time->end_time, get_option('time_format'));
					break;
			}
			$html .= '<input type="hidden" name="start_time_id" id="start_time_id-' . $time->id . '" value="' . $time->id . '"><input type="hidden" name="event_time" id="event_time-' . $time->start_time . '" value="' . $time->start_time . '">';
		}
		return $html;
	}

}

//Checks if a date is later than another date
if (!function_exists('event_espresso_firstdate_later')) {

	function event_espresso_firstdate_later($first_date, $second_date) {
		$start = strtotime($first_date);
		$end = strtotime($second_date);
		if ($start - $end > 0)
			return true;
		else
			return false;
	}

	;
};


/*
 * Date function without formatting
 * Formats a date
 * @params string $date
 * @params string $format - format for the date
 */
if (!function_exists('event_espresso_no_format_date')) {

	function event_espresso_no_format_date($date, $format = '') {
		$format = $format == '' ? get_option('date_format') : $format;
		if (empty($date)) {
			return NULL;
		} else {
			$event_date_display = date_i18n($format, strtotime($date)); //Fixed for international use
		}
		return $event_date_display;
	}

}

/*
 * Date formatting function
 * Formats a date
 * @params string $date
 * @params string $format - format for the date
 */
if (!function_exists('event_date_display')) {

	function event_date_display($date, $format = '') {
		$format = $format == '' ? get_option('date_format') : $format;
		if (empty($date)) {
			$event_date_display = '';
			//echo '<span style="color:red;">'.__('NO DATE SUPPLIED','event_espresso').'</span>';
		} else {
			$event_date_display = date_i18n($format, strtotime($date)); //Fixed for international use
		}
		return $event_date_display;
	}

}


//This function just returns an event start date
//@param the event id
if (!function_exists('event_espresso_event_start_date')) {

	function event_espresso_event_start_date($event_id) {
		global $wpdb;
		$sql = "SELECT e.start_date FROM " . EVENTS_DETAIL_TABLE . " e
		WHERE e.id = '" . $event_id . "'";
		$events = $wpdb->get_results($sql);
		return event_date_display($wpdb->last_result[0]->start_date);
	}

}

function event_espresso_datetime2mysqldatetime($datetime) {// "25.12.2010 12:10:00" -> "2010-12-25 12:10:00"
	return date('Y-m-d H:i:s', strtotime($datetime));	// "25.12.2010" -> "2010-12-25 00:00:00"
}

function event_espresso_mysqldatetime2datetime($mysql_datetime) {// "2010-12-25 12:10:00" -> "25.12.2010 12:10:00"
	$d = split(' ', $mysql_datetime); // "2010-12-25" -> "25.12.2010"
	if ($d && count($d) > 1) {
		list($year, $month, $day) = split("-", $d[0]);
		list($hour, $minute, $second) = split(":", $d[1]);
		$d = date('d.m.Y H:i:s', mktime($hour, $minute, $second, $month, $day, $year));
	} else if ($d && count($d) == 1) {
		list($year, $month, $day) = split("-", $d[0]);
		$d = date('d.m.Y', mktime(0, 0, 0, $month, $day, $year));
	} else {
		$d = NULL;
	}
	return $d;
}

//Returns the times and dates of individual events
// @params $event_id (required)
// @params $format ( start_date_time (default) | end_date_time | start_time | end_time | start_date | end_date | start_timestamp | end_timestamp )
if (!function_exists('espresso_event_time')) {

	function espresso_event_time($event_id, $type, $format = '') {
		global $wpdb;

		$sql = "SELECT e.id, e.start_date start_date, e.end_date end_date, ese.start_time start_time, ese.end_time end_time ";
		$sql .= "FROM " . EVENTS_DETAIL_TABLE . " e ";
		$sql .= "LEFT JOIN " . EVENTS_START_END_TABLE . " ese ON ese.event_id = e.id ";
		$sql .= "WHERE e.id = '" . $event_id . "' LIMIT 0,1";

		$date_format = $format == '' ? get_option('date_format') : $format;
		$time_format = $format == '' ? get_option('time_format') : $format;

		$wpdb->get_results($sql);
		//event_date_display($date, $format = 'M d, Y');
		switch ($type) {
			case 'start_time':
				return event_date_display($wpdb->last_result[0]->start_time, $time_format);
				break;
			case 'end_time':
				return event_date_display($wpdb->last_result[0]->end_time, $time_format);
				break;
			case 'start_date':
				return event_date_display($wpdb->last_result[0]->start_date, $date_format);
				break;
			case 'end_date':
				return event_date_display($wpdb->last_result[0]->end_date, $date_format);
				break;
			case 'start_timestamp':
				return strtotime($wpdb->last_result[0]->start_date . ' ' . $wpdb->last_result[0]->start_time);
				break;
			case 'end_timestamp':
				return strtotime($wpdb->last_result[0]->end_date . ' ' . $wpdb->last_result[0]->end_time);
				break;
			case 'end_date_time':
				return event_date_display($wpdb->last_result[0]->end_date, $date_format) . ' ' . event_date_display($wpdb->last_result[0]->end_time, $time_format);
				break;
			case 'start_date_time':
			default:
				return event_date_display($wpdb->last_result[0]->start_date, $date_format) . ' ' . event_date_display($wpdb->last_result[0]->start_time, $time_format);
				break;
		}
	}

}

function eventespresso_ddtimezone($event_id = 0) {
	global $wpdb;
	$tz_event = $wpdb->get_var($wpdb->prepare("SELECT timezone_string FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'"));

	$timezone_format = _x('Y-m-d G:i:s', 'timezone date format');

	$current_offset = get_option('gmt_offset');
	$tzstring = $tz_event != '' ? $tz_event : get_option('timezone_string');
	//echo $tzstring;
	$check_zone_info = true;

	// Remove old Etc mappings.  Fallback to gmt_offset.
	if (false !== strpos($tzstring, 'Etc/GMT'))
		$tzstring = '';

	if (empty($tzstring)) { // Create a UTC+- zone if no timezone string exists
		$check_zone_info = false;
		if (0 == $current_offset)
			$tzstring = 'UTC+0';
		elseif ($current_offset < 0)
			$tzstring = 'UTC' . $current_offset;
		else
			$tzstring = 'UTC+' . $current_offset;
	}
	?>

	<p><select id="timezone_string" name="timezone_string">
	<?php echo wp_timezone_choice($tzstring); ?>
		</select>
		<br />
		<span class="description"><?php _e('Choose a city in the same timezone as the event.'); ?></span>
	</p>

	<p><span><?php printf(__('<abbr title="Coordinated Universal Time">UTC</abbr> time is <code>%s</code>'), date_i18n($timezone_format, false, 'gmt')); ?></span>
		<?php if (get_option('timezone_string') || !empty($current_offset)) : ?>
			<br /><span><?php printf(__('Local time is <code>%1$s</code>'), date_i18n($timezone_format)); ?></span>
	<?php endif; ?>

			<?php if ($check_zone_info && $tzstring) : ?>
			<br />
			<span>
				<?php
				// Set TZ so localtime works.
				date_default_timezone_set($tzstring);
				$now = localtime(time(), true);
				if ($now['tm_isdst'])
					_e('This timezone is currently in daylight saving time.');
				else
					_e('This timezone is currently in standard time.');
				?>
				<br />
				<?php
				if (function_exists('timezone_transitions_get')) {
					$found = false;
					$date_time_zone_selected = new DateTimeZone($tzstring);
					$tz_offset = timezone_offset_get($date_time_zone_selected, date_create());
					$right_now = time();
					foreach (timezone_transitions_get($date_time_zone_selected) as $tr) {
						if ($tr['ts'] > $right_now) {
							$found = true;
							break;
						}
					}

					if ($found) {
						echo ' ';
						$message = $tr['isdst'] ?
										__('Daylight saving time begins on: <code>%s</code>.') :
										__('Standard time begins  on: <code>%s</code>.');
						// Add the difference between the current offset and the new offset to ts to get the correct transition time from date_i18n().
						printf($message, date_i18n(get_option('date_format') . ' ' . get_option('time_format'), $tr['ts'] + ($tz_offset - $tr['offset'])));
					} else {
						_e('This timezone does not observe daylight saving time.');
					}
				}
				// Set back to UTC.
				date_default_timezone_set('UTC');
				?>
			</span></p>
		<?php
	endif;
}

function espresso_ddtimezone_simple($event_id = 0) {
	global $wpdb;
	$tz_event = $wpdb->get_var($wpdb->prepare("SELECT timezone_string FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'"));

	$timezone_format = _x('Y-m-d G:i:s', 'timezone date format');

	$current_offset = get_option('gmt_offset');
	$tzstring = $tz_event != '' ? $tz_event : get_option('timezone_string');
	//echo $tzstring;
	$check_zone_info = true;

	// Remove old Etc mappings.  Fallback to gmt_offset.
	if (false !== strpos($tzstring, 'Etc/GMT'))
		$tzstring = '';

	if (empty($tzstring)) { // Create a UTC+- zone if no timezone string exists
		$check_zone_info = false;
		if (0 == $current_offset)
			$tzstring = 'UTC+0';
		elseif ($current_offset < 0)
			$tzstring = 'UTC' . $current_offset;
		else
			$tzstring = 'UTC+' . $current_offset;
	}
	?>

	<p><select id="timezone_string" name="timezone_string">
	<?php echo wp_timezone_choice($tzstring); ?>
		</select></p>
	<?php
}

/* function eventespresso_ddtimezone($event_id = 0)
  {
  global $wpdb;
  $list = DateTimeZone::listAbbreviations();
  $idents = DateTimeZone::listIdentifiers();

  $data = $offset = $added = array();
  foreach ($list as $abbr => $info) {
  foreach ($info as $zone) {
  if ( ! empty($zone['timezone_id'])
  AND
  ! in_array($zone['timezone_id'], $added)
  AND
  in_array($zone['timezone_id'], $idents)) {
  $z = new DateTimeZone($zone['timezone_id']);
  $c = new DateTime(null, $z);
  $zone['time'] = $c->format('h:i A');
  $data[] = $zone;
  $offset[] = $z->getOffset($c);
  $added[] = $zone['timezone_id'];
  }
  }
  }
  echo '<label for="time_zone">' . __('Choose Event Timezone:','event_espresso') . '</label><br>';
  echo '<select name="timezone_string" id="timezone_string-">';

  array_multisort($offset, SORT_ASC, $data);
  $options = array();

  if($event_id>0)
  {
  $tz_event = $wpdb->get_var($wpdb->prepare("SELECT timezone_string FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'"));

  foreach ($data as $key => $row) {

  if($tz_event==$row['timezone_id'])
  {
  echo '<option selected value="' . $row['timezone_id'] . '">' . $row['time'] . ' - ' . $row['timezone_id'] . '</option>';
  }
  else
  {
  echo '<option value="' . $row['timezone_id'] . '">' . $row['time'] . ' - ' . $row['timezone_id'] . '</option>';
  }
  }
  }
  else
  {
  foreach ($data as $key => $row) {

  echo '<option value="' . $row['timezone_id'] . '">' . $row['time'] . ' - ' . $row['timezone_id'] . '</option>';

  }
  }
  echo '</select>';

  // now you can use $options;
  } */

function formatOffset($offset) {
	$hours = $offset / 3600;
	$remainder = $offset % 3600;
	$sign = $hours > 0 ? '+' : '-';
	$hour = (int) abs($hours);
	$minutes = (int) abs($remainder / 60);

	if ($hour == 0 AND $minutes == 0) {
		$sign = ' ';
	}
	return 'GMT' . $sign . str_pad($hour, 2, '0', STR_PAD_LEFT)
					. ':' . str_pad($minutes, 2, '0');
}

function date_at_timezone($format, $locale, $timestamp=null) {
//http://php.net/manual/en/function.date.php
//Examples
//$t = time();
//print date("g:i A T", $t); //4:16 PM PDT
//print date_at_timezone("g:i A T", "America/New_York", $t); //7:16 PM EDT
//print date_at_timezone("g:i A T", "Pacific/Samoa", $t); //12:16 PM SST
//print date("g:i A T", $t); //4:16 PM PDT

	if (is_null($timestamp))
		$timestamp = time();

	//Prepare to calculate the time zone offset
	$current = time();

	//Switch to new time zone locale
	$tz = date_default_timezone_get();
	date_default_timezone_set($locale);

	//Calculate the offset
	$offset = time() - $current;

	//Get the date in the new locale
	$output = date($format, $timestamp - $offset);

	//Restore the previous time zone
	date_default_timezone_set($tz);

	return $output;
}

//Converts a time to 12 hour format
if (!function_exists('time_to_12hr')) {

	function time_to_12hr($time) {
		return date("g:i A", strtotime($time)); // 5:02
	}

}

//Converts a time to 24 hour format
if (!function_exists('time_to_24hr')) {

	function time_to_24hr($time) {
		return date("G:i", strtotime($time)); // 17:02
	}

}

function espresso_event_months_dropdown($current_value = 0) {
	global $wpdb;
	$current_value = empty($current_value) ? 0 : $current_value;
	$strQuery = "select id, start_date from " . EVENTS_DETAIL_TABLE . " WHERE event_status != 'D' group by YEAR(start_date), MONTH(start_date) ";
	//$rsrcResult = mysql_query($strQuery);
	$data = $wpdb->get_results($strQuery, ARRAY_A);
	//print_r($data);

	if ($wpdb->num_rows > 0) {
		echo '<select name="month_range" class="chzn-select" style="width:160px;">';
		echo '<option value="0">' . __('Select a Month/Year', 'event_espresso') . '</option>';

		/*		 * * loop over the results ** */
		foreach ($data as $row) {

			/*			 * * create the options ** */
			echo '<option value="' . event_espresso_no_format_date($row["start_date"], $format = 'Y-m-d') . '"';
			if ($row["start_date"] === $current_value) {
				echo ' selected';
			}
			echo '>' . event_espresso_no_format_date($row["start_date"], $format = 'F  Y') . '</option>' . "\n";
		}
		echo "</select>";
	} else {
		_e('No Results', 'event_espresso');
	}
}
