<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_DTT_Helper
 *
 * This is a helper utility class containging a variety for date time formatting helpers for Event Espresso.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EEH_DTT_Helper.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */




class EEH_DTT_Helper {


	/**
	 * return the timezone set for the WP install
	 * @return string valid timezone string for PHP DateTimeZone() class
	 */
	public static function get_timezone() {
		$timezone = get_option('timezone_string');
		//if timezone is STILL empty then let's get the GMT offset and then set the timezone_string using our converter
		if ( empty( $timezone ) ) {
			//let's get a the WordPress UTC offset
			$offset = get_option('gmt_offset');
			$timezone = self::_timezone_convert_to_string_from_offset( $offset );
		}
		return $timezone;
	}





	/**
	 * all this method does is take an incoming GMT offset value ( e.g. "+1" or "-4" ) and returns a corresponding valid DateTimeZone() timezone_string.
	 * @param  string $offset GMT offset
	 * @return string         timezone_string (valid for DateTimeZone)
	 */
	private static function _timezone_convert_to_string_from_offset( $offset ) {
		//shamelessly taken from bottom comment at http://ca1.php.net/manual/en/function.timezone-name-from-abbr.php because timezone_name_from_abbr() did NOT work as expected - its not reliable
		$offset *= 3600; // convert hour offset to seconds
		$abbrarray = timezone_abbreviations_list();
		foreach ($abbrarray as $abbr) {
			foreach ($abbr as $city) {
				if ($city['offset'] === $offset && $city['dst'] === false) {
					return $city['timezone_id'];
				}
			}
		}

		return false;
	}



	public function prepare_dtt_from_db( $dttvalue, $format = 'U' ) {

		$timezone = self::get_timezone();

		$date_obj = new DateTime( $dttvalue, new DateTimeZone('UTC') );
		if ( !$date_obj )
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );
		$date_obj->setTimezone( new DateTimeZone($timezone) );

		return $date_obj->format($format);
	}





	public static function ddtimezone($tz_event = '') {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

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
				$tzstring = 'UTC';
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



	public static function date_time_for_timezone( $timestamp, $format, $timezone ) {
		$timezone = empty( $timezone ) ? self::get_timezone() : $timezone;

		//set timezone
		date_default_timezone_set( $timezone );

		$date = date( $format, $timestamp );

		//setback
		date_default_timezone_set( 'UTC' );
		return $date;
	}


	/**
	 * helper for doing simple datetime calculations on a given datetime from EE_Base_Class and modifying it IN the EE_Base_Class so you don't have to do anything else.
	 * @param  EE_Base_Class $obj      EE_Base_Class object
	 * @param  string        $dttfield What field in the class has the date to manipulate
	 * @param  string        $what     what you are adding. The options are (years, months, days, hours, minutes, seconds) defaults to years
	 * @param  integer       $value    what you want to increment the time by
	 * @return EE_Base_Class		   return the EE_Base_Class object so right away you can do something with it (chaining)
	 */
	public static function date_time_add( EE_Base_Class $obj, $dttfield, $what = 'years', $value = 1 ) {
		//get the raw UTC date.
		$dtt = $obj->get_raw($dttfield);
		$new_date = self::calc_date($dtt, $what, $value);
		//set the new date value!
		$obj->set($dttfield, $dtt);
		return $obj;
	}

	//same as date_time_add except subtracting value instead of adding.
	public static function date_time_subtract( EE_Base_Class $obj, $dttfield, $what = 'years', $value = 1 ) {
		//get the raw UTC date
		$dtt = $obj->get_raw($dttfield);
		$new_date = self::calc_date($dtt, $what, $value, '-');
		$obj->set($dttfield, $dtt);
		return $obj;
	}




	/**
	 * Simply takes an incoming UTC timestamp and does calcs on it based on the incoming parameters and returns the new timestamp.
	 * @param  string  $utcdtt UTC timestamp
	 * @param  string  $what   a value to indicate what interval is being used in the calculation. The options are 'years', 'months', 'days', 'hours', 'minutes', 'seconds'. Defaults to years.
	 * @param  integer $value  What you want to increment the date by
	 * @param  string  $operand What operand you wish to use for the calculation
	 * @return string          new UTC timestamp
	 */
	public static function calc_date( $utcdtt, $what = 'years', $value = 1, $operand = '+' ) {
		$newdtt = '';

		switch ( $what ) {
			case 'years' :
				$value = (60*60*24*364.5) * $value;
				break;
			case 'months' :
				$value = (60*60*24*30.375) * $value;
				break;
			case 'days' :
				$value = (60*60*24) * $value;
				break;
			case 'hours' :
				$value = (60*60) * $value;
				break;
			case 'minutes' :
				$value = 60 * $value;
				break;
			case 'seconds' :
				$value;
				break;
		}

		switch ( $operand ) {
			case '+':
				$newdtt = $utcdtt + $value;
				break;
			case '-':
				$newdtt = $utcdtt - $value;
				break;
		}

		return $newdtt;
	}






	/**
	 * The purpose of this helper method is to receive an incoming format string in php date/time format
	 * and spit out the js and moment.js equivalent formats.
	 * Note, if no format string is given, then it is assumed the user wants what is set for WP.
	 * Note, js date and time formats are those used by the jquery-ui datepicker and the jquery-ui date-
	 * time picker.
	 *
	 * @see http://stackoverflow.com/posts/16725290/ for the code inspiration.
	 *
	 * @param string $format_string Incoming valid php date format string.
	 *
	 * @return array array(
	 *         'js' => array (
	 *         		'date' => //date format
	 *         		'time' => //time format
	 *         ),
	 *         'moment' => //date and time format.
	 * )
	 */
	public static function convert_php_to_js_and_moment_date_formats( $date_format_string = null, $time_format_string = null ) {
		if ( $date_format_string === null ) {
			$date_format_string = get_option( 'date_format' );
		}

		if ( $time_format_string === null ) {
			$time_format_string = get_option( 'time_format' );
		}

		$date_format = self::_php_to_js_moment_converter( $date_format_string );
		$time_format = self::_php_to_js_moment_converter( $time_format_string );

		return array(
			'js' => array(
				'date' => $date_format['js'],
				'time' => $time_format['js']
				),
			'moment' => $date_format['moment'] . ' ' . $time_format['moment' ]
			);
	}




	/**
	 * This converts incoming format string into js and moment variations.
	 *
	 * @param string $format_string incoming php format string
	 *
	 * @return array js and moment formats.
	 */
	protected static function _php_to_js_moment_converter( $format_string ) {
		/**
		 * This is a map of symbols for formats.
		 * The index is the php symbol, the equivalent values are in the array.
		 *
		 * @var array
		 */
		$symbols_map = array(
		// Day
		//01
		'd' => array(
			'js' => 'dd',
			'moment' => 'DD'
			),
		//Mon
		'D' => array(
			'js' => 'D',
			'moment' => 'ddd'
			),
		//1,2,...31
		'j' => array(
			'js' => 'd',
			'moment' => 'D'
			),
		//Monday
		'l' => array(
			'js' => 'DD',
			'moment' => 'dddd'
			),
		//ISO numeric representation of the day of the week (1-6)
		'N' => array(
			'js' => '',
			'moment' => 'E'
			),
		//st,nd.rd
		'S' => array(
			'js' => '',
			'moment' => 'o'
			),
		//numeric representation of day of week (0-6)
		'w' => array(
			'js' => '',
			'moment' => 'd'
			),
		//day of year starting from 0 (0-365)
		'z' => array(
			'js' => 'o',
			'moment' => 'DDD' //note moment does not start with 0 so will need to modify by subtracting 1
			),
		// Week
		//ISO-8601 week number of year (weeks starting on mond)
		'W' => array(
			'js' => '',
			'moment' => 'w'
			),
		// Month
		// January...December
		'F' => array(
			'js' => 'MM',
			'moment' => 'MMMM'
			),
		//01...12
		'm' => array(
			'js' => 'mm',
			'moment' => 'MM'
			),
		//Jan...Dec
		'M' => array(
			'js' => 'M',
			'moment' => 'MMM'
			),
		//1-12
		'n' => array(
			'js' => 'm',
			'moment' => 'M'
			),
		//number of days in given month
		't' => array(
			'js' => '',
			'moment' => ''
			),
		// Year
		//whether leap year or not 1/0
		'L' => array(
			'js' => '',
			'moment' => ''
			),
		//ISO-8601 year number
		'o' => array(
			'js' => '',
			'moment' => 'GGGG'
			),
		//1999...2003
		'Y' => array(
			'js' => 'yy',
			'moment' => 'YYYY'
			),
		//99...03
		'y' => array(
			'js' => 'y',
			'moment' => 'YY'
			),
		// Time
		// am/pm
		'a' => array(
			'js' => 'tt',
			'moment' => 'a'
			),
		// AM/PM
		'A' => array(
			'js' => 'TT',
			'moment' => 'A'
			),
		// Swatch Internet Time?!?
		'B' => array(
			'js' => '',
			'moment' => ''
			),
		//1...12
		'g' => array(
			'js' => 'h',
			'moment' => 'h'
			),
		//0...23
		'G' => array(
			'js' => 'H',
			'moment' => 'H'
			),
		//01...12
		'h' => array(
			'js' => 'hh',
			'moment' => 'hh'
			),
		//00...23
		'H' => array(
			'js' => 'HH',
			'moment' => 'HH'
			),
		//00..59
		'i' => array(
			'js' => 'mm',
			'moment' => 'mm'
			),
		//seconds... 00...59
		's' => array(
			'js' => 'ss',
			'moment' => 'ss'
			),
		//microseconds
		'u' => array(
			'js' => '',
			'moment' => ''
			)
		);
		$jqueryui_format = "";
		$moment_format = "";
		$escaping = false;
		for ( $i = 0; $i < strlen($format_string); $i++ ) {
			$char = $format_string[$i];
			if ( $char === '\\' )  { // PHP date format escaping character
				$i++;
				if ( $escaping ) {
					$jqueryui_format .= $format_string[$i];
					$moment_format .= $format_string[$i];
				} else {
					$jqueryui_format .= '\'' . $format_string[$i];
					$moment_format .= $format_string[$i];
				}
				$escaping = true;
			} else {
				if ($escaping) {
					$jqueryui_format .= "'";
					$mment_format .= "'";
					 $escaping = false;
				}
				if (isset($symbols_map[$char])) {
					$jqueryui_format .= $symbols_map[$char]['js'];
					$moment_format .= $symbols_map[$char]['moment'];
				} else {
					$jqueryui_format .= $char;
					$moment_format .= $char;
				}
			}
		}
		return array( 'js' => $jqueryui_format, 'moment' => $moment_format );
	}




	/**
	 * This takes an incoming format string and validates it to ensure it will work fine with PHP.
	 *
	 * @param string $format_string Incoming format string for php date().
	 *
	 * @return mixed bool|array  If all is okay then TRUE is returned.  Otherwise an array of validation
	 *                           		errors is returned.  So for client code calling, check for is_array() to
	 *                           		indicate failed validations.
	 */
	public static function validate_format_string( $format_string ) {
		$error_msg = array();
		//time format checks
		switch ( true ) {
			case   strpos( $format_string, 'h' )  !== false  :
			case   strpos( $format_string, 'g' ) !== false :
				/**
				 * if the time string has a lowercase 'h' which == 12 hour time format and there
				 * is not any antimeridiam format ('a' or 'A').  Then throw an error because its
				 * too ambiguous and PHP won't be able to figure out whether 1 = 1pm or 1am.
				 */
				if ( strpos( strtoupper( $format_string ), 'A' )  === false ) {
					$error_msg[] = __('There is a  time format for 12 hour time but no  "a" or "A" to indicate am/pm.  Without this distinction, PHP is unable to determine if a "1" for the hour value equals "1pm" or "1am".', 'event_espresso' );
				}
				break;

		}

		return empty( $error_msg ) ? true : $error_msg;
	}


}// end class EEH_DTT_Helper
