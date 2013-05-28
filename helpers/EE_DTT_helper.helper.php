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
 * EE_DTT_Helper
 *
 * This is a helper utility class containging a variety for date time formatting helpers for Event Espresso.
 *
 * @package		Event Espresso
 * @subpackage	/helpers/EE_DTT_Helper.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_DTT_Helper {


	public static function ddtimezone($event_id = 0) {
		do_action('AHEE_log', __FILE__, __FUNCTION__, '' );
		global $wpdb;
		$tz_event = $wpdb->get_var($wpdb->prepare("SELECT timezone_string FROM " . EVENTS_DETAIL_TABLE . " WHERE id = %s", $event_id ));

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


}// end class EE_DTT_Helper