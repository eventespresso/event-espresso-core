<?php

use EventEspresso\core\services\helpers\datetime\HelperInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EEH_DTT_Helper
 * This is a helper utility class containing a variety for date time formatting helpers for Event Espresso.
 *
 * @package         Event Espresso
 * @subpackage      /helpers/EEH_DTT_Helper.helper.php
 * @author          Darren Ethier
 */
class EEH_DTT_Helper
{


    /**
     * return the timezone set for the WP install
     *
     * @return string valid timezone string for PHP DateTimeZone() class
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timezone()
    {
        return EEH_DTT_Helper::get_valid_timezone_string();
    }


    /**
     * get_valid_timezone_string
     *    ensures that a valid timezone string is returned
     *
     * @param string $timezone_string
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_valid_timezone_string($timezone_string = '')
    {
        return self::getHelperAdapter()->getValidTimezoneString($timezone_string);
    }


    /**
     * This only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
     *
     * @static
     * @param  string $timezone_string Timezone string to check
     * @param bool    $throw_error
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function validate_timezone($timezone_string, $throw_error = true)
    {
        return self::getHelperAdapter()->validateTimezone($timezone_string, $throw_error);
    }


    /**
     * This returns a string that can represent the provided gmt offset in format that can be passed into
     * DateTimeZone.  This is NOT a string that can be passed as a value on the WordPress timezone_string option.
     *
     * @param float|string $gmt_offset
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timezone_string_from_gmt_offset($gmt_offset = '')
    {
        return self::getHelperAdapter()->getTimezoneStringFromGmtOffset($gmt_offset);
    }


    /**
     * Gets the site's GMT offset based on either the timezone string
     * (in which case teh gmt offset will vary depending on the location's
     * observance of daylight savings time) or the gmt_offset wp option
     *
     * @return int seconds offset
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_site_timezone_gmt_offset()
    {
        return self::getHelperAdapter()->getSiteTimezoneGmtOffset();
    }


    /**
     * Depending on PHP version,
     * there might not be valid current timezone strings to match these gmt_offsets in its timezone tables.
     * To get around that, for these fringe timezones we bump them to a known valid offset.
     * This method should ONLY be called after first verifying an timezone_string cannot be retrieved for the offset.
     *
     * @deprecated 4.9.54.rc    Developers this was always meant to only be an internally used method.  This will be
     *                          removed in a future version of EE.
     * @param int $gmt_offset
     * @return int
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function adjust_invalid_gmt_offsets($gmt_offset = 0)
    {
        return self::getHelperAdapter()->adjustInvalidGmtOffsets($gmt_offset);
    }


    /**
     * get_timezone_string_from_abbreviations_list
     *
     * @deprecated 4.9.54.rc  Developers, this was never intended to be public.  This is a soft deprecation for now.
     *                        If you are using this, you'll want to work out an alternate way of getting the value.
     * @param int  $gmt_offset
     * @param bool $coerce If true, we attempt to coerce with our adjustment table @see self::adjust_invalid_gmt_offset.
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timezone_string_from_abbreviations_list($gmt_offset = 0, $coerce = true)
    {
        $gmt_offset =  (int) $gmt_offset;
        /** @var array[] $abbreviations */
        $abbreviations = DateTimeZone::listAbbreviations();
        foreach ($abbreviations as $abbreviation) {
            foreach ($abbreviation as $timezone) {
                if ((int) $timezone['offset'] === $gmt_offset && (bool) $timezone['dst'] === false) {
                    try {
                        $offset = self::get_timezone_offset(new DateTimeZone($timezone['timezone_id']));
                        if ($offset !== $gmt_offset) {
                            continue;
                        }
                        return $timezone['timezone_id'];
                    } catch (Exception $e) {
                        continue;
                    }
                }
            }
        }
        // if $coerce is true, let's see if we can get a timezone string after the offset is adjusted
        if ($coerce === true) {
            $timezone_string = self::get_timezone_string_from_abbreviations_list(
                self::adjust_invalid_gmt_offsets($gmt_offset),
                false
            );
            if ($timezone_string) {
                return $timezone_string;
            }
        }
        throw new EE_Error(
            sprintf(
                esc_html__(
                    'The provided GMT offset (%1$s), is invalid, please check with %2$sthis list%3$s for what valid timezones can be used',
                    'event_espresso'
                ),
                $gmt_offset / HOUR_IN_SECONDS,
                '<a href="http://www.php.net/manual/en/timezones.php">',
                '</a>'
            )
        );
    }


    /**
     * Get Timezone Transitions
     *
     * @param DateTimeZone $date_time_zone
     * @param int|null     $time
     * @param bool         $first_only
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timezone_transitions(DateTimeZone $date_time_zone, $time = null, $first_only = true)
    {
        return self::getHelperAdapter()->getTimezoneTransitions($date_time_zone, $time, $first_only);
    }


    /**
     * Get Timezone Offset for given timezone object.
     *
     * @param DateTimeZone $date_time_zone
     * @param null         $time
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timezone_offset(DateTimeZone $date_time_zone, $time = null)
    {
        return self::getHelperAdapter()->getTimezoneOffset($date_time_zone, $time);
    }


    /**
     * Prints a select input for the given timezone string.
     * @param string $timezone_string
     * @deprecatd 4.9.54.rc   Soft deprecation.  Consider using \EEH_DTT_Helper::wp_timezone_choice instead.
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function timezone_select_input($timezone_string = '')
    {
        self::getHelperAdapter()->timezoneSelectInput($timezone_string);
    }


    /**
     * This method will take an incoming unix timestamp and add the offset to it for the given timezone_string.
     * If no unix timestamp is given then time() is used.  If no timezone is given then the set timezone string for
     * the site is used.
     * This is used typically when using a Unix timestamp any core WP functions that expect their specially
     * computed timestamp (i.e. date_i18n() )
     *
     * @param int    $unix_timestamp                  if 0, then time() will be used.
     * @param string $timezone_string                 timezone_string. If empty, then the current set timezone for the
     *                                                site will be used.
     * @return int $unix_timestamp with the offset applied for the given timezone.
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function get_timestamp_with_offset($unix_timestamp = 0, $timezone_string = '')
    {
        return self::getHelperAdapter()->getTimestampWithOffset($unix_timestamp, $timezone_string);
    }


    /**
     *    _set_date_time_field
     *    modifies EE_Base_Class EE_Datetime_Field objects
     *
     * @param  EE_Base_Class $obj                 EE_Base_Class object
     * @param    DateTime    $DateTime            PHP DateTime object
     * @param  string        $datetime_field_name the datetime fieldname to be manipulated
     * @return EE_Base_Class
     * @throws EE_Error
     */
    protected static function _set_date_time_field(EE_Base_Class $obj, DateTime $DateTime, $datetime_field_name)
    {
        // grab current datetime format
        $current_format = $obj->get_format();
        // set new full timestamp format
        $obj->set_date_format(EE_Datetime_Field::mysql_date_format);
        $obj->set_time_format(EE_Datetime_Field::mysql_time_format);
        // set the new date value using a full timestamp format so that no data is lost
        $obj->set($datetime_field_name, $DateTime->format(EE_Datetime_Field::mysql_timestamp_format));
        // reset datetime formats
        $obj->set_date_format($current_format[0]);
        $obj->set_time_format($current_format[1]);
        return $obj;
    }


    /**
     *    date_time_add
     *    helper for doing simple datetime calculations on a given datetime from EE_Base_Class
     *    and modifying it IN the EE_Base_Class so you don't have to do anything else.
     *
     * @param  EE_Base_Class $obj                 EE_Base_Class object
     * @param  string        $datetime_field_name name of the EE_Datetime_Filed datatype db column to be manipulated
     * @param  string        $period              what you are adding. The options are (years, months, days, hours,
     *                                            minutes, seconds) defaults to years
     * @param  integer       $value               what you want to increment the time by
     * @return EE_Base_Class return the EE_Base_Class object so right away you can do something with it
     *                                            (chaining)
     * @throws EE_Error
     * @throws Exception
     */
    public static function date_time_add(EE_Base_Class $obj, $datetime_field_name, $period = 'years', $value = 1)
    {
        // get the raw UTC date.
        $DateTime = $obj->get_DateTime_object($datetime_field_name);
        $DateTime = EEH_DTT_Helper::calc_date($DateTime, $period, $value);
        return EEH_DTT_Helper::_set_date_time_field($obj, $DateTime, $datetime_field_name);
    }


    /**
     *    date_time_subtract
     *    same as date_time_add except subtracting value instead of adding.
     *
     * @param EE_Base_Class $obj
     * @param  string       $datetime_field_name name of the EE_Datetime_Filed datatype db column to be manipulated
     * @param string        $period
     * @param int           $value
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws Exception
     */
    public static function date_time_subtract(EE_Base_Class $obj, $datetime_field_name, $period = 'years', $value = 1)
    {
        // get the raw UTC date
        $DateTime = $obj->get_DateTime_object($datetime_field_name);
        $DateTime = EEH_DTT_Helper::calc_date($DateTime, $period, $value, '-');
        return EEH_DTT_Helper::_set_date_time_field($obj, $DateTime, $datetime_field_name);
    }


    /**
     * Simply takes an incoming DateTime object and does calculations on it based on the incoming parameters
     *
     * @param  DateTime   $DateTime DateTime object
     * @param  string     $period   a value to indicate what interval is being used in the calculation. The options are
     *                              'years', 'months', 'days', 'hours', 'minutes', 'seconds'. Defaults to years.
     * @param  int|string $value    What you want to increment the date by
     * @param  string     $operand  What operand you wish to use for the calculation
     * @return DateTime return whatever type came in.
     * @throws Exception
     * @throws EE_Error
     */
    protected static function _modify_datetime_object(DateTime $DateTime, $period = 'years', $value = 1, $operand = '+')
    {
        if (! $DateTime instanceof DateTime) {
            throw new EE_Error(
                sprintf(
                    esc_html__('Expected a PHP DateTime object, but instead received %1$s', 'event_espresso'),
                    print_r($DateTime, true)
                )
            );
        }
        switch ($period) {
            case 'years':
                $value = 'P' . $value . 'Y';
                break;
            case 'months':
                $value = 'P' . $value . 'M';
                break;
            case 'weeks':
                $value = 'P' . $value . 'W';
                break;
            case 'days':
                $value = 'P' . $value . 'D';
                break;
            case 'hours':
                $value = 'PT' . $value . 'H';
                break;
            case 'minutes':
                $value = 'PT' . $value . 'M';
                break;
            case 'seconds':
                $value = 'PT' . $value . 'S';
                break;
        }
        switch ($operand) {
            case '+':
                $DateTime->add(new DateInterval($value));
                break;
            case '-':
                $DateTime->sub(new DateInterval($value));
                break;
        }
        return $DateTime;
    }


    /**
     * Simply takes an incoming Unix timestamp and does calculations on it based on the incoming parameters
     *
     * @param  int     $timestamp Unix timestamp
     * @param  string  $period    a value to indicate what interval is being used in the calculation. The options are
     *                            'years', 'months', 'days', 'hours', 'minutes', 'seconds'. Defaults to years.
     * @param  integer $value     What you want to increment the date by
     * @param  string  $operand   What operand you wish to use for the calculation
     * @return int
     * @throws EE_Error
     */
    protected static function _modify_timestamp($timestamp, $period = 'years', $value = 1, $operand = '+')
    {
        if (! preg_match(EE_Datetime_Field::unix_timestamp_regex, $timestamp)) {
            throw new EE_Error(
                sprintf(
                    esc_html__('Expected a Unix timestamp, but instead received %1$s', 'event_espresso'),
                    print_r($timestamp, true)
                )
            );
        }
        switch ($period) {
            case 'years':
                $value = YEAR_IN_SECONDS * $value;
                break;
            case 'months':
                $value = YEAR_IN_SECONDS / 12 * $value;
                break;
            case 'weeks':
                $value = WEEK_IN_SECONDS * $value;
                break;
            case 'days':
                $value = DAY_IN_SECONDS * $value;
                break;
            case 'hours':
                $value = HOUR_IN_SECONDS * $value;
                break;
            case 'minutes':
                $value = MINUTE_IN_SECONDS * $value;
                break;
        }
        switch ($operand) {
            case '+':
                $timestamp += $value;
                break;
            case '-':
                $timestamp -= $value;
                break;
        }
        return $timestamp;
    }


    /**
     * Simply takes an incoming UTC timestamp or DateTime object and does calculations on it based on the incoming
     * parameters and returns the new timestamp or DateTime.
     *
     * @param  int | DateTime $DateTime_or_timestamp DateTime object or Unix timestamp
     * @param  string         $period                a value to indicate what interval is being used in the
     *                                               calculation. The options are 'years', 'months', 'days', 'hours',
     *                                               'minutes', 'seconds'. Defaults to years.
     * @param  integer        $value                 What you want to increment the date by
     * @param  string         $operand               What operand you wish to use for the calculation
     * @return mixed string|DateTime          return whatever type came in.
     * @throws Exception
     * @throws EE_Error
     */
    public static function calc_date($DateTime_or_timestamp, $period = 'years', $value = 1, $operand = '+')
    {
        if ($DateTime_or_timestamp instanceof DateTime) {
            return EEH_DTT_Helper::_modify_datetime_object(
                $DateTime_or_timestamp,
                $period,
                $value,
                $operand
            );
        }
        if (preg_match(EE_Datetime_Field::unix_timestamp_regex, $DateTime_or_timestamp)) {
            return EEH_DTT_Helper::_modify_timestamp(
                $DateTime_or_timestamp,
                $period,
                $value,
                $operand
            );
        }
        // error
        return $DateTime_or_timestamp;
    }


    /**
     * The purpose of this helper method is to receive an incoming format string in php date/time format
     * and spit out the js and moment.js equivalent formats.
     * Note, if no format string is given, then it is assumed the user wants what is set for WP.
     * Note, js date and time formats are those used by the jquery-ui datepicker and the jquery-ui date-
     * time picker.
     *
     * @see http://stackoverflow.com/posts/16725290/ for the code inspiration.
     * @param string $date_format_string
     * @param string $time_format_string
     * @return array
     *              array(
     *              'js' => array (
     *              'date' => //date format
     *              'time' => //time format
     *              ),
     *              'moment' => //date and time format.
     *              )
     */
    public static function convert_php_to_js_and_moment_date_formats(
        $date_format_string = null,
        $time_format_string = null
    ) {
        if ($date_format_string === null) {
            $date_format_string = (string) get_option('date_format');
        }
        if ($time_format_string === null) {
            $time_format_string = (string) get_option('time_format');
        }
        $date_format = self::_php_to_js_moment_converter($date_format_string);
        $time_format = self::_php_to_js_moment_converter($time_format_string);
        return array(
            'js'     => array(
                'date' => $date_format['js'],
                'time' => $time_format['js'],
            ),
            'moment' => $date_format['moment'] . ' ' . $time_format['moment'],
            'moment_split' => array(
                'date' => $date_format['moment'],
                'time' => $time_format['moment']
            )
        );
    }


    /**
     * This converts incoming format string into js and moment variations.
     *
     * @param string $format_string incoming php format string
     * @return array js and moment formats.
     */
    protected static function _php_to_js_moment_converter($format_string)
    {
        /**
         * This is a map of symbols for formats.
         * The index is the php symbol, the equivalent values are in the array.
         *
         * @var array
         */
        $symbols_map          = array(
            // Day
            // 01
            'd' => array(
                'js'     => 'dd',
                'moment' => 'DD',
            ),
            // Mon
            'D' => array(
                'js'     => 'D',
                'moment' => 'ddd',
            ),
            // 1,2,...31
            'j' => array(
                'js'     => 'd',
                'moment' => 'D',
            ),
            // Monday
            'l' => array(
                'js'     => 'DD',
                'moment' => 'dddd',
            ),
            // ISO numeric representation of the day of the week (1-6)
            'N' => array(
                'js'     => '',
                'moment' => 'E',
            ),
            // st,nd.rd
            'S' => array(
                'js'     => '',
                'moment' => 'o',
            ),
            // numeric representation of day of week (0-6)
            'w' => array(
                'js'     => '',
                'moment' => 'd',
            ),
            // day of year starting from 0 (0-365)
            'z' => array(
                'js'     => 'o',
                'moment' => 'DDD' // note moment does not start with 0 so will need to modify by subtracting 1
            ),
            // Week
            // ISO-8601 week number of year (weeks starting on monday)
            'W' => array(
                'js'     => '',
                'moment' => 'w',
            ),
            // Month
            // January...December
            'F' => array(
                'js'     => 'MM',
                'moment' => 'MMMM',
            ),
            // 01...12
            'm' => array(
                'js'     => 'mm',
                'moment' => 'MM',
            ),
            // Jan...Dec
            'M' => array(
                'js'     => 'M',
                'moment' => 'MMM',
            ),
            // 1-12
            'n' => array(
                'js'     => 'm',
                'moment' => 'M',
            ),
            // number of days in given month
            't' => array(
                'js'     => '',
                'moment' => '',
            ),
            // Year
            // whether leap year or not 1/0
            'L' => array(
                'js'     => '',
                'moment' => '',
            ),
            // ISO-8601 year number
            'o' => array(
                'js'     => '',
                'moment' => 'GGGG',
            ),
            // 1999...2003
            'Y' => array(
                'js'     => 'yy',
                'moment' => 'YYYY',
            ),
            // 99...03
            'y' => array(
                'js'     => 'y',
                'moment' => 'YY',
            ),
            // Time
            // am/pm
            'a' => array(
                'js'     => 'tt',
                'moment' => 'a',
            ),
            // AM/PM
            'A' => array(
                'js'     => 'TT',
                'moment' => 'A',
            ),
            // Swatch Internet Time?!?
            'B' => array(
                'js'     => '',
                'moment' => '',
            ),
            // 1...12
            'g' => array(
                'js'     => 'h',
                'moment' => 'h',
            ),
            // 0...23
            'G' => array(
                'js'     => 'H',
                'moment' => 'H',
            ),
            // 01...12
            'h' => array(
                'js'     => 'hh',
                'moment' => 'hh',
            ),
            // 00...23
            'H' => array(
                'js'     => 'HH',
                'moment' => 'HH',
            ),
            // 00..59
            'i' => array(
                'js'     => 'mm',
                'moment' => 'mm',
            ),
            // seconds... 00...59
            's' => array(
                'js'     => 'ss',
                'moment' => 'ss',
            ),
            // microseconds
            'u' => array(
                'js'     => '',
                'moment' => '',
            ),
        );
        $jquery_ui_format     = '';
        $moment_format        = '';
        $escaping             = false;
        $format_string_length = strlen($format_string);
        for ($i = 0; $i < $format_string_length; $i++) {
            $char = $format_string[ $i ];
            if ($char === '\\') { // PHP date format escaping character
                $i++;
                if ($escaping) {
                    $jquery_ui_format .= $format_string[ $i ];
                    $moment_format    .= $format_string[ $i ];
                } else {
                    $jquery_ui_format .= '\'' . $format_string[ $i ];
                    $moment_format    .= $format_string[ $i ];
                }
                $escaping = true;
            } else {
                if ($escaping) {
                    $jquery_ui_format .= "'";
                    $moment_format    .= "'";
                    $escaping         = false;
                }
                if (isset($symbols_map[ $char ])) {
                    $jquery_ui_format .= $symbols_map[ $char ]['js'];
                    $moment_format    .= $symbols_map[ $char ]['moment'];
                } else {
                    $jquery_ui_format .= $char;
                    $moment_format    .= $char;
                }
            }
        }
        return array('js' => $jquery_ui_format, 'moment' => $moment_format);
    }


    /**
     * This takes an incoming format string and validates it to ensure it will work fine with PHP.
     *
     * @param string $format_string   Incoming format string for php date().
     * @return mixed bool|array  If all is okay then TRUE is returned.  Otherwise an array of validation
     *                                errors is returned.  So for client code calling, check for is_array() to
     *                                indicate failed validations.
     */
    public static function validate_format_string($format_string)
    {
        $error_msg = array();
        // time format checks
        switch (true) {
            case strpos($format_string, 'h') !== false:
            case strpos($format_string, 'g') !== false:
                /**
                 * if the time string has a lowercase 'h' which == 12 hour time format and there
                 * is not any ante meridiem format ('a' or 'A').  Then throw an error because its
                 * too ambiguous and PHP won't be able to figure out whether 1 = 1pm or 1am.
                 */
                if (stripos($format_string, 'A') === false) {
                    $error_msg[] = esc_html__(
                        'There is a  time format for 12 hour time but no  "a" or "A" to indicate am/pm.  Without this distinction, PHP is unable to determine if a "1" for the hour value equals "1pm" or "1am".',
                        'event_espresso'
                    );
                }
                break;
        }
        return empty($error_msg) ? true : $error_msg;
    }


    /**
     *     If the the first date starts at midnight on one day, and the next date ends at midnight on the
     *     very next day then this method will return true.
     *    If $date_1 = 2015-12-15 00:00:00 and $date_2 = 2015-12-16 00:00:00 then this function will return true.
     *    If $date_1 = 2015-12-15 03:00:00 and $date_2 = 2015-12_16 03:00:00 then this function will return false.
     *    If $date_1 = 2015-12-15 00:00:00 and $date_2 = 2015-12-15 00:00:00 then this function will return true.
     *
     * @param mixed $date_1
     * @param mixed $date_2
     * @return bool
     */
    public static function dates_represent_one_24_hour_date($date_1, $date_2)
    {

        if ((! $date_1 instanceof DateTime || ! $date_2 instanceof DateTime)
            || ($date_1->format(EE_Datetime_Field::mysql_time_format) !== '00:00:00'
                || $date_2->format(
                    EE_Datetime_Field::mysql_time_format
                ) !== '00:00:00')
        ) {
            return false;
        }
        return $date_2->format('U') - $date_1->format('U') === 86400;
    }


    /**
     * This returns the appropriate query interval string that can be used in sql queries involving mysql Date
     * Functions.
     *
     * @param string $timezone_string    A timezone string in a valid format to instantiate a DateTimeZone object.
     * @param string $field_for_interval The Database field that is the interval is applied to in the query.
     * @return string
     */
    public static function get_sql_query_interval_for_offset($timezone_string, $field_for_interval)
    {
        try {
            /** need to account for timezone offset on the selects */
            $DateTimeZone = new DateTimeZone($timezone_string);
        } catch (Exception $e) {
            $DateTimeZone = null;
        }
        /**
         * Note get_option( 'gmt_offset') returns a value in hours, whereas DateTimeZone::getOffset returns values in seconds.
         * Hence we do the calc for DateTimeZone::getOffset.
         */
        $offset         = $DateTimeZone instanceof DateTimeZone
            ? $DateTimeZone->getOffset(new DateTime('now')) / HOUR_IN_SECONDS
            : (float) get_option('gmt_offset');
        $query_interval = $offset < 0
            ? 'DATE_SUB(' . $field_for_interval . ', INTERVAL ' . $offset * -1 . ' HOUR)'
            : 'DATE_ADD(' . $field_for_interval . ', INTERVAL ' . $offset . ' HOUR)';
        return $query_interval;
    }


    /**
     * Retrieves the site's default timezone and returns it formatted so it's ready for display
     * to users. If you want to customize how its displayed feel free to fetch the 'timezone_string'
     * and 'gmt_offset' WordPress options directly; or use the filter
     * FHEE__EEH_DTT_Helper__get_timezone_string_for_display
     * (although note that we remove any HTML that may be added)
     *
     * @return string
     */
    public static function get_timezone_string_for_display()
    {
        $pretty_timezone = apply_filters('FHEE__EEH_DTT_Helper__get_timezone_string_for_display', '');
        if (! empty($pretty_timezone)) {
            return esc_html($pretty_timezone);
        }
        $timezone_string = get_option('timezone_string');
        if ($timezone_string) {
            static $mo_loaded = false;
            // Load translations for continents and cities just like wp_timezone_choice does
            if (! $mo_loaded) {
                $locale = get_locale();
                $mofile = WP_LANG_DIR . '/continents-cities-' . $locale . '.mo';
                load_textdomain('continents-cities', $mofile);
                $mo_loaded = true;
            }
            // well that was easy.
            $parts = explode('/', $timezone_string);
            // remove the continent
            unset($parts[0]);
            $t_parts = array();
            // phpcs:disable WordPress.WP.I18n.NonSingularStringLiteralText
            // phpcs:disable WordPress.WP.I18n.TextDomainMismatch
            // disabled because this code is copied from WordPress and is a WordPress domain
            foreach ($parts as $part) {
                $t_parts[] = translate(str_replace('_', ' ', $part), 'continents-cities');
            }
            return implode(' - ', $t_parts);
            // phpcs:enable
        }
        // they haven't set the timezone string, so let's return a string like "UTC+1"
        $gmt_offset = get_option('gmt_offset');
        $prefix     = (int) $gmt_offset >= 0 ? '+' : '';
        $parts      = explode('.', (string) $gmt_offset);
        if (count($parts) === 1) {
            $parts[1] = '00';
        } else {
            // convert the part after the decimal, eg "5" (from x.5) or "25" (from x.25)
            // to minutes, eg 30 or 15, respectively
            $hour_fraction = (float) ('0.' . $parts[1]);
            $parts[1]      = (string) $hour_fraction * 60;
        }
        return sprintf(__('UTC%1$s', 'event_espresso'), $prefix . implode(':', $parts));
    }



    /**
     * So PHP does this awesome thing where if you are trying to get a timestamp
     * for a month using a string like "February" or "February 2017",
     * and you don't specify a day as part of your string,
     * then PHP will use whatever the current day of the month is.
     * IF the current day of the month happens to be the 30th or 31st,
     * then PHP gets really confused by a date like February 30,
     * so instead of saying
     *      "Hey February only has 28 days (this year)...
     *      ...you must have meant the last day of the month!"
     * PHP does the next most logical thing, and bumps the date up to March 2nd,
     * because someone requesting February 30th obviously meant March 1st!
     * The way around this is to always set the day to the first,
     * so that the month will stay on the month you wanted.
     * this method will add that "1" into your date regardless of the format.
     *
     * @param string $month
     * @return string
     */
    public static function first_of_month_timestamp($month = '')
    {
        $month = (string) $month;
        $year  = '';
        // check if the incoming string has a year in it or not
        if (preg_match('/\b\d{4}\b/', $month, $matches)) {
            $year = $matches[0];
            // ten remove that from the month string as well as any spaces
            $month = trim(str_replace($year, '', $month));
            // add a space before the year
            $year = " {$year}";
        }
        // return timestamp for something like "February 1 2017"
        return strtotime("{$month} 1{$year}");
    }


    /**
     * This simply returns the timestamp for tomorrow (midnight next day) in this sites timezone.  So it may be midnight
     * for this sites timezone, but the timestamp could be some other time GMT.
     */
    public static function tomorrow()
    {
        // The multiplication of -1 ensures that we switch positive offsets to negative and negative offsets to positive
        // before adding to the timestamp.  Why? Because we want tomorrow to be for midnight the next day in THIS timezone
        // not an offset from midnight in UTC.  So if we're starting with UTC 00:00:00, then we want to make sure the
        // final timestamp is equivalent to midnight in this timezone as represented in GMT.
        return strtotime('tomorrow') + (self::get_site_timezone_gmt_offset() * -1);
    }


    /**
     * **
     * Gives a nicely-formatted list of timezone strings.
     * Copied from the core wp function by the same name so we could customize to remove UTC offsets.
     *
     * @since     4.9.40.rc.008
     * @staticvar bool $mo_loaded
     * @staticvar string $locale_loaded
     * @param string $selected_zone Selected timezone.
     * @param string $locale        Optional. Locale to load the timezones in. Default current site locale.
     * @return string
     */
    public static function wp_timezone_choice($selected_zone, $locale = null)
    {
        static $mo_loaded = false, $locale_loaded = null;
        $continents = array(
            'Africa',
            'America',
            'Antarctica',
            'Arctic',
            'Asia',
            'Atlantic',
            'Australia',
            'Europe',
            'Indian',
            'Pacific',
        );
        // Load translations for continents and cities.
        if (! $mo_loaded || $locale !== $locale_loaded) {
            $locale_loaded = $locale ? $locale : get_locale();
            $mofile        = WP_LANG_DIR . '/continents-cities-' . $locale_loaded . '.mo';
            unload_textdomain('continents-cities');
            load_textdomain('continents-cities', $mofile);
            $mo_loaded = true;
        }
        $zone_data = array();
        foreach (timezone_identifiers_list() as $zone) {
            $zone = explode('/', $zone);
            if (! in_array($zone[0], $continents, true)) {
                continue;
            }
            // This determines what gets set and translated - we don't translate Etc/* strings here, they are done later
            $exists      = array(
                0 => isset($zone[0]) && $zone[0],
                1 => isset($zone[1]) && $zone[1],
                2 => isset($zone[2]) && $zone[2],
            );
            $exists[3]   = $exists[0] && $zone[0] !== 'Etc';
            $exists[4]   = $exists[1] && $exists[3];
            $exists[5]   = $exists[2] && $exists[3];
            // phpcs:disable WordPress.WP.I18n.NonSingularStringLiteralText
            // phpcs:disable WordPress.WP.I18n.TextDomainMismatch
            // disabled because this code is copied from WordPress and is a WordPress domain
            $zone_data[] = array(
                'continent'   => $exists[0] ? $zone[0] : '',
                'city'        => $exists[1] ? $zone[1] : '',
                'subcity'     => $exists[2] ? $zone[2] : '',
                't_continent' => $exists[3]
                    ? translate(str_replace('_', ' ', $zone[0]), 'continents-cities')
                    : '',
                't_city'      => $exists[4]
                    ? translate(str_replace('_', ' ', $zone[1]), 'continents-cities')
                    : '',
                't_subcity'   => $exists[5]
                    ? translate(str_replace('_', ' ', $zone[2]), 'continents-cities')
                    : '',
            );
            // phpcs:enable
        }
        usort($zone_data, '_wp_timezone_choice_usort_callback');
        $structure = array();
        if (empty($selected_zone)) {
            $structure[] = '<option selected="selected" value="">' . __('Select a city', 'event_espresso') . '</option>';
        }
        foreach ($zone_data as $key => $zone) {
            // Build value in an array to join later
            $value = array($zone['continent']);
            if (empty($zone['city'])) {
                // It's at the continent level (generally won't happen)
                $display = $zone['t_continent'];
            } else {
                // It's inside a continent group
                // Continent optgroup
                if (! isset($zone_data[ $key - 1 ]) || $zone_data[ $key - 1 ]['continent'] !== $zone['continent']) {
                    $label       = $zone['t_continent'];
                    $structure[] = '<optgroup label="' . esc_attr($label) . '">';
                }
                // Add the city to the value
                $value[] = $zone['city'];
                $display = $zone['t_city'];
                if (! empty($zone['subcity'])) {
                    // Add the subcity to the value
                    $value[] = $zone['subcity'];
                    $display .= ' - ' . $zone['t_subcity'];
                }
            }
            // Build the value
            $value       = implode('/', $value);
            $selected    = $value === $selected_zone ? ' selected="selected"' : '';
            $structure[] = '<option value="' . esc_attr($value) . '"' . $selected . '>'
                           . esc_html($display)
                           . '</option>';
            // Close continent optgroup
            if (! empty($zone['city'])
                && (
                    ! isset($zone_data[ $key + 1 ])
                    || (isset($zone_data[ $key + 1 ]) && $zone_data[ $key + 1 ]['continent'] !== $zone['continent'])
                )
            ) {
                $structure[] = '</optgroup>';
            }
        }
        return implode("\n", $structure);
    }


    /**
     * Shim for the WP function `get_user_locale` that was added in WordPress 4.7.0
     *
     * @param int|WP_User $user_id
     * @return string
     */
    public static function get_user_locale($user_id = 0)
    {
        if (function_exists('get_user_locale')) {
            return get_user_locale($user_id);
        }
        return get_locale();
    }


    /**
     * Return the appropriate helper adapter for DTT related things.
     *
     * @return HelperInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function getHelperAdapter()
    {
        $dtt_helper_fqcn = PHP_VERSION_ID < 50600
            ? 'EventEspresso\core\services\helpers\datetime\PhpCompatLessFiveSixHelper'
            : 'EventEspresso\core\services\helpers\datetime\PhpCompatGreaterFiveSixHelper';
        return LoaderFactory::getLoader()->getShared($dtt_helper_fqcn);
    }


    /**
     * Helper function for setting the timezone on a DateTime object.
     * This is implemented to standardize a workaround for a PHP bug outlined in
     * https://events.codebasehq.com/projects/event-espresso/tickets/11407 and
     * https://events.codebasehq.com/projects/event-espresso/tickets/11233
     *
     * @param DateTime     $datetime
     * @param DateTimeZone $timezone
     */
    public static function setTimezone(DateTime $datetime, DateTimeZone $timezone)
    {
        $datetime->setTimezone($timezone);
        $datetime->getTimestamp();
    }
}
