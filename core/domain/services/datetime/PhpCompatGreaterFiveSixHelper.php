<?php
namespace EventEspresso\core\domain\services\datetime;

use DateTime;
use DateTimeZone;
use DomainException;
use EE_Datetime_Field;
use EE_Error;

class PhpCompatGreaterFiveSixHelper extends AbstractHelper
{
    /**
     * PhpCompatLessFiveSixHelper constructor.
     *
     * @throws DomainException
     */
    public function __construct()
    {
        if (PHP_VERSION_ID < 50600) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The %1$s is only usable on php versions greater than 5.6.  You\'ll want to use %2$s instead.',
                        'event_espresso'
                    ),
                    __CLASS__,
                    'EventEspresso\core\domain\services\datetime\PhpCompatLessFiveSixHelper'
                )
            );
        }
    }

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
     * Returns a timezone string for the provided gmt_offset.
     * This is a valid timezone string that can be sent into DateTimeZone
     *
     * @param float|string $gmt_offset
     * @return string
     */
    public function getTimezoneStringFromGmtOffset($gmt_offset = '')
    {
        //if none provided then let's see of there's already a timezone_string set for WP, if there is we can just use
        //that.
        if ($gmt_offset === '') {
            //autoloaded so no need to set to a variable.  There will not be multiple hits to the db.
            if (get_option('timezone_string')) {
                return (string) get_option('timezone_string');
            }
        }
        $gmt_offset = $gmt_offset !== '' ? $gmt_offset : (string) get_option('gmt_offset');
        //convert to float
        $gmt_offset = (float) $gmt_offset;

        //if $gmt_offset is 0 or is still an empty string, then just return UTC
        if ($gmt_offset === (float) 0) {
            return 'UTC';
        }
        return $this->convertWpGmtOffsetForDateTimeZone($gmt_offset);
    }


    /**
     * Returns a formatted offset for use as an argument for constructing DateTimeZone
     * @param float $gmt_offset This should be a float representing the gmt_offset.
     * @return string
     */
    protected function convertWpGmtOffsetForDateTimeZone($gmt_offset)
    {
        $gmt_offset = (float) $gmt_offset;
        $is_negative = $gmt_offset < 0;
        $gmt_offset *= 100;
        $gmt_offset = absint($gmt_offset);
        //negative and need zero padding?
        if (strlen($gmt_offset) < 4) {
            $gmt_offset = str_pad($gmt_offset, 4, '0', STR_PAD_LEFT);
        }
        $gmt_offset = $this->convertToTimeFraction($gmt_offset);
        //return something like -1300, -0200 or +1300, +0200
        return $is_negative ? '-' . $gmt_offset : '+' . $gmt_offset;
    }


    /**
     * Converts something like `1550` to `1530` or `0275` to `0245`
     * Incoming offset should be a positive value, this will mutate negative values. Be aware!
     * @param int $offset
     * @return mixed
     */
    protected function convertToTimeFraction($offset)
    {
        $first_part = substr($offset, 0, 2);
        $second_part = substr($offset, 2, 2);
        $second_part = str_replace(array('25', '50', '75'), array('15', '30', '45'), $second_part);
        return $first_part . $second_part;
    }

    /**
     * This returns the given gmt offset as is because no adjustment is needed in a post PHP5.6 world.
     *
     * @deprecated 4.9.54.rc    Developers this was always meant to only be an internally used method.  This will be
     *                          removed in a future version of EE.
     * @param int $gmt_offset
     * @return int
     */
    public function adjustInvalidGmtOffsets($gmt_offset)
    {
        return $gmt_offset;
    }


    /**
     * Get Timezone offset for given timezone object
     *
     * @param DateTimeZone $date_time_zone
     * @param null|int     $time
     * @return int
     */
    public function getTimezoneOffset(DateTimezone $date_time_zone, $time = NULL)
    {
        $time = is_int($time) || $time === null ? $time : (int) strtotime($time);
        $time = preg_match(EE_Datetime_Field::unix_timestamp_regex, $time) ? $time : time();
        return $date_time_zone->getOffset(new DateTime('@' . $time));
    }
}
