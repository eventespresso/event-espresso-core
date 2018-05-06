<?php
namespace EventEspresso\core\services\helpers\datetime;

use DateTime;
use DateTimeZone;
use DomainException;
use EE_Datetime_Field;

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
                    'EventEspresso\core\services\helpers\datetime\PhpCompatLessFiveSixHelper'
                )
            );
        }
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
        $gmt_offset_or_timezone_string = $this->sanitizeInitialIncomingGmtOffsetForGettingTimezoneString($gmt_offset);
        return is_float($gmt_offset_or_timezone_string)
            ? $this->convertWpGmtOffsetForDateTimeZone($gmt_offset_or_timezone_string)
            : $gmt_offset_or_timezone_string;
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
        // negative and need zero padding?
        if (strlen($gmt_offset) < 4) {
            $gmt_offset = str_pad($gmt_offset, 4, '0', STR_PAD_LEFT);
        }
        $gmt_offset = $this->convertToTimeFraction($gmt_offset);
        // return something like -1300, -0200 or +1300, +0200
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
     * Get Timezone offset for given timezone object
     *
     * @param DateTimeZone $date_time_zone
     * @param null|int     $time
     * @return int
     */
    public function getTimezoneOffset(DateTimezone $date_time_zone, $time = null)
    {
        $time = is_int($time) || $time === null ? $time : (int) strtotime($time);
        $time = preg_match(EE_Datetime_Field::unix_timestamp_regex, $time) ? $time : time();
        return $date_time_zone->getOffset(new DateTime('@' . $time));
    }
}
