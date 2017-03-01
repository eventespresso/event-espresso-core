<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Event Espresso
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *                  ------------------------------------------------------------------------
 *                  EEH_DTT_Helper
 *                  This is a helper utility class containing a variety for date time formatting helpers for Event
 *                  Espresso.
 * @package         Event Espresso
 * @subpackage      /helpers/EEH_DTT_Helper.helper.php
 * @author          Darren Ethier
 *                  ------------------------------------------------------------------------
 */
class EEH_DTT_Helper
{


    /**
     * return the timezone set for the WP install
     *
     * @return string valid timezone string for PHP DateTimeZone() class
     */
    public static function get_timezone()
    {
        return EEH_DTT_Helper::get_valid_timezone_string();
    }


    /**
     * get_valid_timezone_string
     *    ensures that a valid timezone string is returned
     *
     * @access protected
     * @param string $timezone_string
     * @return string
     * @throws \EE_Error
     */
    public static function get_valid_timezone_string($timezone_string = '')
    {
        // if passed a value, then use that, else get WP option
        $timezone_string = ! empty($timezone_string) ? $timezone_string : get_option('timezone_string');
        // value from above exists, use that, else get timezone string from gmt_offset
        $timezone_string = ! empty($timezone_string) ? $timezone_string : EEH_DTT_Helper::get_timezone_string_from_gmt_offset();
        EEH_DTT_Helper::validate_timezone($timezone_string);
        return $timezone_string;
    }


    /**
     * This only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
     *
     * @static
     * @access public
     * @param  string $timezone_string Timezone string to check
     * @param bool    $throw_error
     * @return bool
     * @throws \EE_Error
     */
    public static function validate_timezone($timezone_string, $throw_error = true)
    {
        // easiest way to test a timezone string is just see if it throws an error when you try to create a DateTimeZone object with it
        try {
            new DateTimeZone($timezone_string);
        } catch (Exception $e) {
            // sometimes we take exception to exceptions
            if (! $throw_error) {
                return false;
            }
            throw new EE_Error(
                sprintf(
                    __('The timezone given (%1$s), is invalid, please check with %2$sthis list%3$s for what valid timezones can be used',
                        'event_espresso'),
                    $timezone_string,
                    '<a href="http://www.php.net/manual/en/timezones.php">',
                    '</a>'
                )
            );
        }
        return true;
    }


    /**
     * _create_timezone_object_from_timezone_name
     *
     * @access protected
     * @param string $gmt_offset
     * @return string
     */
    public static function get_timezone_string_from_gmt_offset($gmt_offset = '')
    {
        $timezone_string = 'UTC';
        $gmt_offset      = ! empty($gmt_offset) ? $gmt_offset : get_option('gmt_offset');
        if ($gmt_offset !== '') {
            // convert GMT offset to seconds
            $gmt_offset = $gmt_offset * HOUR_IN_SECONDS;
            // account for WP offsets that aren't valid UTC
            $gmt_offset = EEH_DTT_Helper::adjust_invalid_gmt_offsets($gmt_offset);
            // although we don't know the TZ abbreviation, we know the UTC offset
            $timezone_string = timezone_name_from_abbr(null, $gmt_offset);
        }
        // better have a valid timezone string by now, but if not, sigh... loop thru  the timezone_abbreviations_list()...
        $timezone_string = $timezone_string !== false
            ? $timezone_string
            : EEH_DTT_Helper::get_timezone_string_from_abbreviations_list($gmt_offset);
        return $timezone_string;
    }

    /**
     * Gets the site's GMT offset based on either the timezone string
     * (in which case teh gmt offset will vary depending on the location's
     * observance of daylight savings time) or the gmt_offset wp option
     *
     * @return int seconds offset
     */
    public static function get_site_timezone_gmt_offset()
    {
        $timezone_string = get_option('timezone_string');
        if ($timezone_string) {
            try {
                $timezone = new DateTimeZone($timezone_string);
                return $timezone->getOffset(new DateTime()); //in WordPress DateTime defaults to UTC
            } catch (Exception $e) {
            }
        }
        $offset = get_option('gmt_offset');
        return (int)($offset * HOUR_IN_SECONDS);
    }


    /**
     * _create_timezone_object_from_timezone_name
     *
     * @access public
     * @param int $gmt_offset
     * @return int
     */
    public static function adjust_invalid_gmt_offsets($gmt_offset = 0)
    {
        //make sure $gmt_offset is int
        $gmt_offset = (int)$gmt_offset;
        switch ($gmt_offset) {

            //			case -30600 :
            //				$gmt_offset = -28800;
            //				break;

            case -27000 :
                $gmt_offset = -25200;
                break;

            case -23400 :
                $gmt_offset = -21600;
                break;

            case -19800 :
                $gmt_offset = -18000;
                break;

            case -9000 :
                $gmt_offset = -7200;
                break;

            case -5400 :
                $gmt_offset = -3600;
                break;

            case -1800 :
                $gmt_offset = 0;
                break;

            case 1800 :
                $gmt_offset = 3600;
                break;

            case 49500 :
                $gmt_offset = 50400;
                break;

        }
        return $gmt_offset;
    }


    /**
     * get_timezone_string_from_abbreviations_list
     *
     * @access public
     * @param int $gmt_offset
     * @return string
     * @throws \EE_Error
     */
    public static function get_timezone_string_from_abbreviations_list($gmt_offset = 0)
    {
        $abbreviations = timezone_abbreviations_list();
        foreach ($abbreviations as $abbreviation) {
            foreach ($abbreviation as $city) {
                if ($city['offset'] === $gmt_offset && $city['dst'] === false) {
                    // check if the timezone is valid but don't throw any errors if it isn't
                    if (EEH_DTT_Helper::validate_timezone($city['timezone_id'], false)) {
                        return $city['timezone_id'];
                    }
                }
            }
        }
        throw new EE_Error(
            sprintf(
                __('The provided GMT offset (%1$s), is invalid, please check with %2$sthis list%3$s for what valid timezones can be used',
                    'event_espresso'),
                $gmt_offset,
                '<a href="http://www.php.net/manual/en/timezones.php">',
                '</a>'
            )
        );
    }


    /**
     * @access public
     * @param string $timezone_string
     */
    public static function timezone_select_input($timezone_string = '')
    {
        // get WP date time format
        $datetime_format = get_option('date_format') . ' ' . get_option('time_format');
        // if passed a value, then use that, else get WP option
        $timezone_string = ! empty($timezone_string) ? $timezone_string : get_option('timezone_string');
        // check if the timezone is valid but don't throw any errors if it isn't
        $timezone_string = EEH_DTT_Helper::validate_timezone($timezone_string, false);
        $gmt_offset      = get_option('gmt_offset');

        $check_zone_info = true;
        if (empty($timezone_string)) {
            // Create a UTC+- zone if no timezone string exists
            $check_zone_info = false;
            if ($gmt_offset > 0) {
                $timezone_string = 'UTC+' . $gmt_offset;
            } elseif ($gmt_offset < 0) {
                $timezone_string = 'UTC' . $gmt_offset;
            } else {
                $timezone_string = 'UTC';
            }
        }
        ?>

        <p>
            <label for="timezone_string"><?php _e('timezone'); ?></label>
            <select id="timezone_string" name="timezone_string">
                <?php echo wp_timezone_choice($timezone_string); ?>
            </select>
            <br/>
            <span class="description"><?php _e('Choose a city in the same timezone as the event.'); ?></span>
        </p>

        <p>
        <span><?php
            printf(
                __('%1$sUTC%2$s time is %3$s'),
                '<abbr title="Coordinated Universal Time">',
                '</abbr>',
                '<code>' . date_i18n($datetime_format, false, true) . '</code>'
            );
            ?></span>
        <?php if (! empty($timezone_string) || ! empty($gmt_offset)) : ?>
        <br/><span><?php printf(__('Local time is %1$s'), '<code>' . date_i18n($datetime_format) . '</code>'); ?></span>
    <?php endif; ?>

        <?php if ($check_zone_info && $timezone_string) : ?>
        <br/>
        <span>
					<?php
                    // Set TZ so localtime works.
                    date_default_timezone_set($timezone_string);
                    $now = localtime(time(), true);
                    if ($now['tm_isdst']) {
                        _e('This timezone is currently in daylight saving time.');
                    } else {
                        _e('This timezone is currently in standard time.');
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
                    $message = $tr['isdst'] ?
                        __(' Daylight saving time begins on: %s.') :
                        __(' Standard time begins  on: %s.');
                    // Add the difference between the current offset and the new offset to ts to get the correct transition time from date_i18n().
                    printf($message,
                        '<code >' . date_i18n($datetime_format, $tr['ts'] + ($tz_offset - $tr['offset'])) . '</code >');
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
     * @return int      $unix_timestamp with the offset applied for the given timezone.
     */
    public static function get_timestamp_with_offset($unix_timestamp = 0, $timezone_string = '')
    {
        $unix_timestamp  = $unix_timestamp === 0 ? time() : (int)$unix_timestamp;
        $timezone_string = self::get_valid_timezone_string($timezone_string);
        $TimeZone        = new DateTimeZone($timezone_string);

        $DateTime = new DateTime('@' . $unix_timestamp, $TimeZone);
        $offset   = timezone_offset_get($TimeZone, $DateTime);
        return (int)$DateTime->format('U') + (int)$offset;
    }


    /**
     *    _set_date_time_field
     *    modifies EE_Base_Class EE_Datetime_Field objects
     *
     * @param  EE_Base_Class $obj                 EE_Base_Class object
     * @param    DateTime    $DateTime            PHP DateTime object
     * @param  string        $datetime_field_name the datetime fieldname to be manipulated
     * @return    EE_Base_Class
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
     * @return EE_Base_Class           return the EE_Base_Class object so right away you can do something with it
     *                                 (chaining)
     */
    public static function date_time_add(EE_Base_Class $obj, $datetime_field_name, $period = 'years', $value = 1)
    {
        //get the raw UTC date.
        $DateTime = $obj->get_DateTime_object($datetime_field_name);
        $DateTime = EEH_DTT_Helper::calc_date($DateTime, $period, $value);
        return EEH_DTT_Helper::_set_date_time_field($obj, $DateTime, $datetime_field_name);
    }


    /**
     *    date_time_subtract
     *    same as date_time_add except subtracting value instead of adding.
     *
     * @param \EE_Base_Class $obj
     * @param  string        $datetime_field_name name of the EE_Datetime_Filed datatype db column to be manipulated
     * @param string         $period
     * @param int            $value
     * @return \EE_Base_Class
     */
    public static function date_time_subtract(EE_Base_Class $obj, $datetime_field_name, $period = 'years', $value = 1)
    {
        //get the raw UTC date
        $DateTime = $obj->get_DateTime_object($datetime_field_name);
        $DateTime = EEH_DTT_Helper::calc_date($DateTime, $period, $value, '-');
        return EEH_DTT_Helper::_set_date_time_field($obj, $DateTime, $datetime_field_name);
    }


    /**
     * Simply takes an incoming DateTime object and does calculations on it based on the incoming parameters
     *
     * @param  DateTime $DateTime DateTime object
     * @param  string   $period   a value to indicate what interval is being used in the calculation. The options are
     *                            'years', 'months', 'days', 'hours', 'minutes', 'seconds'. Defaults to years.
     * @param  integer  $value    What you want to increment the date by
     * @param  string   $operand  What operand you wish to use for the calculation
     * @return \DateTime return whatever type came in.
     * @throws \EE_Error
     */
    protected static function _modify_datetime_object(DateTime $DateTime, $period = 'years', $value = 1, $operand = '+')
    {
        if (! $DateTime instanceof DateTime) {
            throw new EE_Error(
                sprintf(
                    __('Expected a PHP DateTime object, but instead received %1$s', 'event_espresso'),
                    print_r($DateTime, true)
                )
            );
        }
        switch ($period) {
            case 'years' :
                $value = 'P' . $value . 'Y';
                break;
            case 'months' :
                $value = 'P' . $value . 'M';
                break;
            case 'weeks' :
                $value = 'P' . $value . 'W';
                break;
            case 'days' :
                $value = 'P' . $value . 'D';
                break;
            case 'hours' :
                $value = 'PT' . $value . 'H';
                break;
            case 'minutes' :
                $value = 'PT' . $value . 'M';
                break;
            case 'seconds' :
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
     * @return \DateTime return whatever type came in.
     * @throws \EE_Error
     */
    protected static function _modify_timestamp($timestamp, $period = 'years', $value = 1, $operand = '+')
    {
        if (! preg_match(EE_Datetime_Field::unix_timestamp_regex, $timestamp)) {
            throw new EE_Error(
                sprintf(
                    __('Expected a Unix timestamp, but instead received %1$s', 'event_espresso'),
                    print_r($timestamp, true)
                )
            );
        }
        switch ($period) {
            case 'years' :
                $value = YEAR_IN_SECONDS * $value;
                break;
            case 'months' :
                $value = YEAR_IN_SECONDS / 12 * $value;
                break;
            case 'weeks' :
                $value = WEEK_IN_SECONDS * $value;
                break;
            case 'days' :
                $value = DAY_IN_SECONDS * $value;
                break;
            case 'hours' :
                $value = HOUR_IN_SECONDS * $value;
                break;
            case 'minutes' :
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
     */
    public static function calc_date($DateTime_or_timestamp, $period = 'years', $value = 1, $operand = '+')
    {
        if ($DateTime_or_timestamp instanceof DateTime) {
            return EEH_DTT_Helper::_modify_datetime_object($DateTime_or_timestamp, $period, $value, $operand);
        } else if (preg_match(EE_Datetime_Field::unix_timestamp_regex, $DateTime_or_timestamp)) {
            return EEH_DTT_Helper::_modify_timestamp($DateTime_or_timestamp, $period, $value, $operand);
        } else {
            //error
            return $DateTime_or_timestamp;
        }
    }


    /**
     * The purpose of this helper method is to receive an incoming format string in php date/time format
     * and spit out the js and moment.js equivalent formats.
     * Note, if no format string is given, then it is assumed the user wants what is set for WP.
     * Note, js date and time formats are those used by the jquery-ui datepicker and the jquery-ui date-
     * time picker.
     *
     * @see http://stackoverflow.com/posts/16725290/ for the code inspiration.
     * @param null $date_format_string
     * @param null $time_format_string
     * @return array
     *                array(
     *                'js' => array (
     *                'date' => //date format
     *                'time' => //time format
     *                ),
     *                'moment' => //date and time format.
     *                )
     */
    public static function convert_php_to_js_and_moment_date_formats(
        $date_format_string = null,
        $time_format_string = null
    ) {
        if ($date_format_string === null) {
            $date_format_string = get_option('date_format');
        }

        if ($time_format_string === null) {
            $time_format_string = get_option('time_format');
        }

        $date_format = self::_php_to_js_moment_converter($date_format_string);
        $time_format = self::_php_to_js_moment_converter($time_format_string);

        return array(
            'js'     => array(
                'date' => $date_format['js'],
                'time' => $time_format['js'],
            ),
            'moment' => $date_format['moment'] . ' ' . $time_format['moment'],
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
        $symbols_map      = array(
            // Day
            //01
            'd' => array(
                'js'     => 'dd',
                'moment' => 'DD',
            ),
            //Mon
            'D' => array(
                'js'     => 'D',
                'moment' => 'ddd',
            ),
            //1,2,...31
            'j' => array(
                'js'     => 'd',
                'moment' => 'D',
            ),
            //Monday
            'l' => array(
                'js'     => 'DD',
                'moment' => 'dddd',
            ),
            //ISO numeric representation of the day of the week (1-6)
            'N' => array(
                'js'     => '',
                'moment' => 'E',
            ),
            //st,nd.rd
            'S' => array(
                'js'     => '',
                'moment' => 'o',
            ),
            //numeric representation of day of week (0-6)
            'w' => array(
                'js'     => '',
                'moment' => 'd',
            ),
            //day of year starting from 0 (0-365)
            'z' => array(
                'js'     => 'o',
                'moment' => 'DDD' //note moment does not start with 0 so will need to modify by subtracting 1
            ),
            // Week
            //ISO-8601 week number of year (weeks starting on monday)
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
            //01...12
            'm' => array(
                'js'     => 'mm',
                'moment' => 'MM',
            ),
            //Jan...Dec
            'M' => array(
                'js'     => 'M',
                'moment' => 'MMM',
            ),
            //1-12
            'n' => array(
                'js'     => 'm',
                'moment' => 'M',
            ),
            //number of days in given month
            't' => array(
                'js'     => '',
                'moment' => '',
            ),
            // Year
            //whether leap year or not 1/0
            'L' => array(
                'js'     => '',
                'moment' => '',
            ),
            //ISO-8601 year number
            'o' => array(
                'js'     => '',
                'moment' => 'GGGG',
            ),
            //1999...2003
            'Y' => array(
                'js'     => 'yy',
                'moment' => 'YYYY',
            ),
            //99...03
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
            //1...12
            'g' => array(
                'js'     => 'h',
                'moment' => 'h',
            ),
            //0...23
            'G' => array(
                'js'     => 'H',
                'moment' => 'H',
            ),
            //01...12
            'h' => array(
                'js'     => 'hh',
                'moment' => 'hh',
            ),
            //00...23
            'H' => array(
                'js'     => 'HH',
                'moment' => 'HH',
            ),
            //00..59
            'i' => array(
                'js'     => 'mm',
                'moment' => 'mm',
            ),
            //seconds... 00...59
            's' => array(
                'js'     => 'ss',
                'moment' => 'ss',
            ),
            //microseconds
            'u' => array(
                'js'     => '',
                'moment' => '',
            ),
        );
        $jquery_ui_format = "";
        $moment_format    = "";
        $escaping         = false;
        for ($i = 0; $i < strlen($format_string); $i++) {
            $char = $format_string[$i];
            if ($char === '\\') { // PHP date format escaping character
                $i++;
                if ($escaping) {
                    $jquery_ui_format .= $format_string[$i];
                    $moment_format .= $format_string[$i];
                } else {
                    $jquery_ui_format .= '\'' . $format_string[$i];
                    $moment_format .= $format_string[$i];
                }
                $escaping = true;
            } else {
                if ($escaping) {
                    $jquery_ui_format .= "'";
                    $moment_format .= "'";
                    $escaping = false;
                }
                if (isset($symbols_map[$char])) {
                    $jquery_ui_format .= $symbols_map[$char]['js'];
                    $moment_format .= $symbols_map[$char]['moment'];
                } else {
                    $jquery_ui_format .= $char;
                    $moment_format .= $char;
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
        //time format checks
        switch (true) {
            case   strpos($format_string, 'h') !== false  :
            case   strpos($format_string, 'g') !== false :
                /**
                 * if the time string has a lowercase 'h' which == 12 hour time format and there
                 * is not any ante meridiem format ('a' or 'A').  Then throw an error because its
                 * too ambiguous and PHP won't be able to figure out whether 1 = 1pm or 1am.
                 */
                if (strpos(strtoupper($format_string), 'A') === false) {
                    $error_msg[] = __('There is a  time format for 12 hour time but no  "a" or "A" to indicate am/pm.  Without this distinction, PHP is unable to determine if a "1" for the hour value equals "1pm" or "1am".',
                        'event_espresso');
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

        if (
            (! $date_1 instanceof DateTime || ! $date_2 instanceof DateTime) ||
            ($date_1->format(EE_Datetime_Field::mysql_time_format) != '00:00:00' || $date_2->format(EE_Datetime_Field::mysql_time_format) != '00:00:00')
        ) {
            return false;
        }
        return $date_2->format('U') - $date_1->format('U') == 86400 ? true : false;
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
        $offset         = $DateTimeZone instanceof DateTimeZone ? ($DateTimeZone->getOffset(new DateTime('now'))) / HOUR_IN_SECONDS : get_option('gmt_offset');
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
            //well that was easy.
            $parts = explode('/', $timezone_string);
            //remove the continent
            unset($parts[0]);
            $t_parts = array();
            foreach ($parts as $part) {
                $t_parts[] = translate(str_replace('_', ' ', $part), 'continents-cities');
            }
            return implode(' - ', $t_parts);
        }
        //they haven't set the timezone string, so let's return a string like "UTC+1"
        $gmt_offset = get_option('gmt_offset');
        if (intval($gmt_offset) >= 0) {
            $prefix = '+';
        } else {
            $prefix = '';
        }
        $parts = explode('.', (string)$gmt_offset);
        if (count($parts) === 1) {
            $parts[1] = '00';
        } else {
            //convert the part after the decimal, eg "5" (from x.5) or "25" (from x.25)
            //to minutes, eg 30 or 15, respectively
            $hour_fraction = (float)('0.' . $parts[1]);
            $parts[1]      = (string)$hour_fraction * 60;
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
        $month = (string)$month;
        $year = '';
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
		//The multiplication of -1 ensures that we switch positive offsets to negative and negative offsets to positive
		//before adding to the timestamp.  Why? Because we want tomorrow to be for midnight the next day in THIS timezone
		//not an offset from midnight in UTC.  So if we're starting with UTC 00:00:00, then we want to make sure the
		//final timestamp is equivalent to midnight in this timezone as represented in GMT.
		return strtotime('tomorrow') + (self::get_site_timezone_gmt_offset()*-1);
	}

}// end class EEH_DTT_Helper
