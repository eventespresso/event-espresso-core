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
        foreach ($abbrarray as $abbr)
        {
                foreach ($abbr as $city)
                {
                        if ($city['offset'] === $offset && $city['dst'] === FALSE)
                        {
                                return $city['timezone_id'];
                        }
                }
        }

        return FALSE;
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


}// end class EEH_DTT_Helper
