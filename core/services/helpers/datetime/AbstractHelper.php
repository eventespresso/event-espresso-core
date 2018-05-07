<?php
namespace EventEspresso\core\services\helpers\datetime;

use DateTime;
use DateTimeZone;
use DomainException;
use EE_Datetime_Field;
use EE_Error;
use Exception;

abstract class AbstractHelper implements HelperInterface
{


    /**
     * Ensures that a valid timezone string is returned.
     *
     * @param string $timezone_string  When not provided then attempt to use the timezone_string set in the WP Time
     *                                 settings (or derive from set UTC offset).
     * @return string
     * @throws EE_Error
     */
    public function getValidTimezoneString($timezone_string = '')
    {
        $timezone_string = ! empty($timezone_string) ? $timezone_string : (string) get_option('timezone_string');
        $timezone_string = ! empty($timezone_string)
            ? $timezone_string
            : $this->getTimezoneStringFromGmtOffset();
        $this->validateTimezone($timezone_string);
        return $timezone_string;
    }



    /**
     * The only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
     *
     * @param string $timezone_string
     * @param bool   $throw_error
     * @return bool
     * @throws EE_Error
     */
    public function validateTimezone($timezone_string, $throw_error = true)
    {
        // easiest way to test a timezone string is just see if it throws an error when you try to create a
        // DateTimeZone object with it
        try {
            new DateTimeZone($timezone_string);
        } catch (Exception $e) {
            // sometimes we take exception to exceptions
            if (! $throw_error) {
                return false;
            }
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'The timezone given (%1$s), is invalid, please check with %2$sthis list%3$s for what valid timezones can be used',
                        'event_espresso'
                    ),
                    $timezone_string,
                    '<a href="http://www.php.net/manual/en/timezones.php">',
                    '</a>'
                )
            );
        }
        return true;
    }


    /**
     * Gets the site's GMT offset based on either the timezone string
     * (in which case the gmt offset will vary depending on the location's
     * observance of daylight savings time) or the gmt_offset wp option
     *
     * @return int  seconds offset
     */
    public function getSiteTimezoneGmtOffset()
    {
        $timezone_string = (string) get_option('timezone_string');
        if ($timezone_string) {
            try {
                $timezone = new DateTimeZone($timezone_string);
                return $timezone->getOffset(new DateTime()); // in WordPress DateTime defaults to UTC
            } catch (Exception $e) {
            }
        }
        $offset = get_option('gmt_offset');
        return (int) ($offset * HOUR_IN_SECONDS);
    }


    /**
     * Get Timezone offset for given timezone object
     *
     * @param DateTimeZone $date_time_zone
     * @param null|int     $time
     * @return int
     * @throws DomainException
     */
    public function getTimezoneOffset(DateTimeZone $date_time_zone, $time = null)
    {
        $transition = $this->getTimezoneTransitions($date_time_zone, $time);
        if (! isset($transition['offset'])) {
            throw new DomainException(
                sprintf(
                    esc_html__('An invalid timezone transition was received %1$s', 'event_espresso'),
                    print_r($transition, true)
                )
            );
        }
        return $transition['offset'];
    }


    /**
     * Provide a timezone select input
     *
     * @param string $timezone_string
     * @return string
     * @throws EE_Error
     */
    public function timezoneSelectInput($timezone_string = '')
    {
        // get WP date time format
        $datetime_format = get_option('date_format') . ' ' . get_option('time_format');
        // if passed a value, then use that, else get WP option
        $timezone_string = ! empty($timezone_string) ? $timezone_string : (string) get_option('timezone_string');
        // check if the timezone is valid but don't throw any errors if it isn't
        $timezone_string = $this->validateTimezone($timezone_string, false)
            ? $timezone_string
            : '';
        $gmt_offset      = get_option('gmt_offset');
        $check_zone_info = true;
        if (empty($timezone_string)) {
            // Create a UTC+- zone if no timezone string exists
            $timezone_string = 'UTC';
            $check_zone_info = false;
            if ($gmt_offset > 0) {
                $timezone_string = 'UTC+' . $gmt_offset;
            } elseif ($gmt_offset < 0) {
                $timezone_string = 'UTC' . $gmt_offset;
            }
        }
        ?>
        <p>
            <label for="timezone_string"><?php _e('timezone', 'event_espresso'); ?></label>
            <select id="timezone_string" name="timezone_string">
                <?php echo wp_timezone_choice($timezone_string); ?>
            </select>
            <br/>
            <span class="description"><?php _e('Choose a city in the same timezone as the event.', 'event_espresso'); ?></span>
        </p>

        <p>
        <span>
            <?php
            printf(
                __('%1$sUTC%2$s time is %3$s', 'event_espresso'),
                '<abbr title="Coordinated Universal Time">',
                '</abbr>',
                '<code>' . date_i18n($datetime_format, false, true) . '</code>'
            );
            ?></span>
        <?php
        if (! empty($timezone_string) || ! empty($gmt_offset)) : ?>
        <br/><span><?php printf(__('Local time is %1$s', 'event_espresso'), '<code>' . date_i18n($datetime_format) . '</code>'); ?></span>
    <?php
        endif; ?>

        <?php
        if ($check_zone_info && $timezone_string) : ?>
        <br/>
        <span>
                <?php
                // Set TZ so localtime works.
                date_default_timezone_set($timezone_string);
                $now = localtime(time(), true);
                if ($now['tm_isdst']) {
                    _e('This timezone is currently in daylight saving time.', 'event_espresso');
                } else {
                    _e('This timezone is currently in standard time.', 'event_espresso');
                }
                ?>
            <br/>
            <?php
            if (function_exists('timezone_transitions_get')) {
                $found                   = false;
                $date_time_zone_selected = new DateTimeZone($timezone_string);
                $tz_offset               = timezone_offset_get($date_time_zone_selected, date_create());
                $right_now               = time();
                $tr['isdst']             = false;
                foreach (timezone_transitions_get($date_time_zone_selected) as $tr) {
                    if ($tr['ts'] > $right_now) {
                        $found = true;
                        break;
                    }
                }
                if ($found) {
                    $message = $tr['isdst']
                        ? __(' Daylight saving time begins on: %s.', 'event_espresso')
                        : __(' Standard time begins  on: %s.', 'event_espresso');
                    // Add the difference between the current offset and the new offset to ts to get the correct
                    // transition time from date_i18n().
                    printf(
                        $message,
                        '<code >' . date_i18n($datetime_format, $tr['ts'] + ($tz_offset - $tr['offset'])) . '</code >'
                    );
                } else {
                    _e('This timezone does not observe daylight saving time.', 'event_espresso');
                }
            }
            // Set back to UTC.
            date_default_timezone_set('UTC');
            ?>
        </span></p>
        <?php
        endif;
    }


    /**
     * This method will take an incoming unix timestamp and add the offset to it for the given timezone_string.
     * If no unix timestamp is given then time() is used.  If no timezone is given then the set timezone string for
     * the site is used.
     * This is used typically when using a Unix timestamp any core WP functions that expect their specially
     * computed timestamp (i.e. date_i18n() )
     *
     * @param int    $unix_timestamp  if 0, then time() will be used.
     * @param string $timezone_string timezone_string. If empty, then the current set timezone for the
     *                                site will be used.
     * @return int      unix_timestamp value with the offset applied for the given timezone.
     * @throws EE_Error
     */
    public function getTimestampWithOffset($unix_timestamp = 0, $timezone_string = '')
    {
        $unix_timestamp  = $unix_timestamp === 0 ? time() : (int) $unix_timestamp;
        $timezone_string = $this->getValidTimezoneString($timezone_string);
        $TimeZone        = new DateTimeZone($timezone_string);
        $DateTime        = new DateTime('@' . $unix_timestamp, $TimeZone);
        $offset          = timezone_offset_get($TimeZone, $DateTime);
        return (int) $DateTime->format('U') + (int) $offset;
    }


    /**
     * Get Timezone Transitions
     *
     * @param DateTimeZone $date_time_zone
     * @param int|null     $time
     * @param bool         $first_only
     * @return array|mixed
     */
    public function getTimezoneTransitions(DateTimeZone $date_time_zone, $time = null, $first_only = true)
    {
        $time        = is_int($time) || $time === null ? $time : (int) strtotime($time);
        $time        = preg_match(EE_Datetime_Field::unix_timestamp_regex, $time) ? $time : time();
        $transitions = $date_time_zone->getTransitions($time);
        return $first_only && ! isset($transitions['ts']) ? reset($transitions) : $transitions;
    }



    /**
     * Default to just returning the provided $gmt_offset.  Children can override if adjustment needed.
     *
     * @param int $gmt_offset
     * @return int
     */
    public function adjustInvalidGmtOffsets($gmt_offset = 0)
    {
        return $gmt_offset;
    }



    /**
     * This receives an incoming gmt_offset and santizes it.  If the provide value is an empty string, then this will
     * attempt to get the offset from the timezone string.  If this returns a string, then a timezone string was
     * successfully derived from existing timezone_string in the db.  If not, then a float is returned for the provided
     * offset.
     * @param  float|string $gmt_offset
     * @return float|string
     */
    protected function sanitizeInitialIncomingGmtOffsetForGettingTimezoneString($gmt_offset)
    {
        // if there is no incoming gmt_offset, then because WP hooks in on timezone_string, we need to see if that is
        // set because it will override `gmt_offset` via `pre_get_option` filter.  If that's set, then let's just use
        // that!  Otherwise we'll leave timezone_string at the default of 'UTC' before doing other logic.
        if ($gmt_offset === '') {
            // autoloaded so no need to set to a variable.  There will not be multiple hits to the db.
            if (get_option('timezone_string')) {
                return (string) get_option('timezone_string');
            }
        }
        $gmt_offset = $gmt_offset !== '' ? $gmt_offset : (string) get_option('gmt_offset');
        $gmt_offset = (float) $gmt_offset;
        // if $gmt_offset is 0 or is still an empty string, then just return UTC
        if ($gmt_offset === (float) 0) {
            return 'UTC';
        }
        return $gmt_offset;
    }
}
