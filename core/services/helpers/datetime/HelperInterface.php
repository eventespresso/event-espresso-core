<?php

namespace EventEspresso\core\services\helpers\datetime;

use DateTimeZone;

/**
 * Interface HelperInterface
 * Interface for DateTime helpers.
 *
 * @package EventEspresso\core\domain\datetime
 * @subpackage
 * @author  Darren Ethier
 * @since   4.9.54.rc
 */
interface HelperInterface
{

    /**
     * Ensures that a valid timezone string is returned.
     *
     * @param string $timezone_string  When not provided then attempt to use the timezone_string set in the WP Time
     *                                 settings (or derive from set UTC offset).
     * @return string
     */
    public function getValidTimezoneString($timezone_string = '');


    /**
     * The only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
     *
     * @param string $timezone_string
     * @param bool   $throw_error
     * @return bool
     */
    public function validateTimezone($timezone_string, $throw_error = true);


    /**
     * Returns a timezone string for the provided gmt_offset.
     * @param float|string $gmt_offset
     * @return string
     */
    public function getTimezoneStringFromGmtOffset($gmt_offset = '');


    /**
     * Gets the site's GMT offset based on either the timezone string
     * (in which case the gmt offset will vary depending on the location's
     * observance of daylight savings time) or the gmt_offset wp option
     *
     * @return int  seconds offset
     */
    public function getSiteTimezoneGmtOffset();


    /**
     * Get timezone transitions
     * @param DateTimeZone $date_time_zone
     * @param int|null     $time
     * @param bool         $first_only
     * @return array
     */
    public function getTimezoneTransitions(DateTimeZone $date_time_zone, $time = null, $first_only = true);


    /**
     * Get Timezone offset for given timezone object
     * @param DateTimeZone $date_time_zone
     * @param null|int         $time
     * @return int
     */
    public function getTimezoneOffset(DateTimeZone $date_time_zone, $time = null);


    /**
     * Provide a timezone select input
     * @param string $timezone_string
     * @return string
     */
    public function timezoneSelectInput($timezone_string = '');


    /**
     * This method will take an incoming unix timestamp and add the offset to it for the given timezone_string.
     * If no unix timestamp is given then time() is used.  If no timezone is given then the set timezone string for
     * the site is used.
     * This is used typically when using a Unix timestamp any core WP functions that expect their specially
     * computed timestamp (i.e. date_i18n() )
     *
     * @param int    $unix_timestamp    if 0, then time() will be used.
     * @param string $timezone_string timezone_string. If empty, then the current set timezone for the
     *                                site will be used.
     * @return int      unix_timestamp value with the offset applied for the given timezone.
     */
    public function getTimestampWithOffset($unix_timestamp = 0, $timezone_string = '');


    /**
     * Depending on PHP version,
     * there might not be valid current timezone strings to match these gmt_offsets in its timezone tables.
     * To get around that, for these fringe timezones we bump them to a known valid offset.
     * This method should ONLY be called after first verifying an timezone_string cannot be retrieved for the offset.
     *
     * @param int $gmt_offset
     * @return int
     */
    public function adjustInvalidGmtOffsets($gmt_offset);
}
