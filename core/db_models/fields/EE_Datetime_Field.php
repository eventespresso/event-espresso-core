<?php
use EventEspresso\core\domain\entities\DbSafeDateTime;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * EE_Datetime_Field
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 *
 * @package               Event Espresso
 * @subpackage            /core/db_models/fields/EE_Datetime_Field.php
 * @author                Darren Ethier
 */
class EE_Datetime_Field extends EE_Model_Field_Base
{

    /**
     * The pattern we're looking for is if only the characters 0-9 are found and there are only
     * 10 or more numbers (because 9 numbers even with all 9's would be sometime in 2001 )
     *
     * @type string unix_timestamp_regex
     */
    const unix_timestamp_regex = '/[0-9]{10,}/';

    /**
     * @type string mysql_timestamp_format
     */
    const mysql_timestamp_format = 'Y-m-d H:i:s';

    /**
     * @type string mysql_date_format
     */
    const mysql_date_format = 'Y-m-d';

    /**
     * @type string mysql_time_format
     */
    const mysql_time_format = 'H:i:s';

    /**
     * Const for using in the default value. If the field's default is set to this,
     * then we will return the time of calling `get_default_value()`, not
     * just the current time at construction
     */
    const now = 'now';

    /**
     * The following properties hold the default formats for date and time.
     * Defaults are set via the constructor and can be overridden on class instantiation.
     * However they can also be overridden later by the set_format() method
     * (and corresponding set_date_format, set_time_format methods);
     */
    /**
     * @type string $_date_format
     */
    protected $_date_format = '';

    /**
     * @type string $_time_format
     */
    protected $_time_format = '';

    /**
     * @type string $_pretty_date_format
     */
    protected $_pretty_date_format = '';

    /**
     * @type string $_pretty_time_format
     */
    protected $_pretty_time_format = '';

    /**
     * @type DateTimeZone $_DateTimeZone
     */
    protected $_DateTimeZone;

    /**
     * @type DateTimeZone $_UTC_DateTimeZone
     */
    protected $_UTC_DateTimeZone;

    /**
     * @type DateTimeZone $_blog_DateTimeZone
     */
    protected $_blog_DateTimeZone;


    /**
     * This property holds how we want the output returned when getting a datetime string.  It is set for the
     * set_date_time_output() method.  By default this is empty.  When empty, we are assuming that we want both date
     * and time returned via getters.
     *
     * @var mixed (null|string)
     */
    protected $_date_time_output;


    /**
     * timezone string
     * This gets set by the constructor and can be changed by the "set_timezone()" method so that we know what timezone
     * incoming strings|timestamps are in.  This can also be used before a get to set what timezone you want strings
     * coming out of the object to be in.  Default timezone is the current WP timezone option setting
     *
     * @var string
     */
    protected $_timezone_string;


    /**
     * This holds whatever UTC offset for the blog (we automatically convert timezone strings into their related
     * offsets for comparison purposes).
     *
     * @var int
     */
    protected $_blog_offset;


    /**
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param string $default_value
     * @param string $timezone_string
     * @param string $date_format
     * @param string $time_format
     * @param string $pretty_date_format
     * @param string $pretty_time_format
     * @throws \EE_Error
     */
    public function __construct(
        $table_column,
        $nice_name,
        $nullable,
        $default_value,
        $timezone_string = '',
        $date_format = '',
        $time_format = '',
        $pretty_date_format = '',
        $pretty_time_format = ''
    ) {

        $this->_date_format        = ! empty($date_format) ? $date_format : get_option('date_format');
        $this->_time_format        = ! empty($time_format) ? $time_format : get_option('time_format');
        $this->_pretty_date_format = ! empty($pretty_date_format) ? $pretty_date_format : get_option('date_format');
        $this->_pretty_time_format = ! empty($pretty_time_format) ? $pretty_time_format : get_option('time_format');

        parent::__construct($table_column, $nice_name, $nullable, $default_value);
        $this->set_timezone($timezone_string);
        $this->setSchemaFormat('date-time');
    }


    /**
     * @return DateTimeZone
     * @throws \EE_Error
     */
    public function get_UTC_DateTimeZone()
    {
        return $this->_UTC_DateTimeZone instanceof DateTimeZone
            ? $this->_UTC_DateTimeZone
            : $this->_create_timezone_object_from_timezone_string('UTC');
    }


    /**
     * @return DateTimeZone
     * @throws \EE_Error
     */
    public function get_blog_DateTimeZone()
    {
        return $this->_blog_DateTimeZone instanceof DateTimeZone
            ? $this->_blog_DateTimeZone
            : $this->_create_timezone_object_from_timezone_string('');
    }


    /**
     * this prepares any incoming date data and make sure its converted to a utc unix timestamp
     *
     * @param  string|int $value_inputted_for_field_on_model_object could be a string formatted date time or int unix
     *                                                              timestamp
     * @return DateTime
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        return $this->_get_date_object($value_inputted_for_field_on_model_object);
    }


    /**
     * This returns the format string to be used by getters depending on what the $_date_time_output property is set at.
     * getters need to know whether we're just returning the date or the time or both.  By default we return both.
     *
     * @param bool $pretty If we're returning the pretty formats or standard format string.
     * @return string    The final assembled format string.
     */
    protected function _get_date_time_output($pretty = false)
    {

        switch ($this->_date_time_output) {
            case 'time' :
                return $pretty ? $this->_pretty_time_format : $this->_time_format;
                break;

            case 'date' :
                return $pretty ? $this->_pretty_date_format : $this->_date_format;
                break;

            default :
                return $pretty
                    ? $this->_pretty_date_format . ' ' . $this->_pretty_time_format
                    : $this->_date_format . ' ' . $this->_time_format;
        }
    }


    /**
     * This just sets the $_date_time_output property so we can flag how date and times are formatted before being
     * returned (using the format properties)
     *
     * @param string $what acceptable values are 'time' or 'date'.
     *                     Any other value will be set but will always result
     *                     in both 'date' and 'time' being returned.
     * @return void
     */
    public function set_date_time_output($what = null)
    {
        $this->_date_time_output = $what;
    }


    /**
     * See $_timezone property for description of what the timezone property is for.  This SETS the timezone internally
     * for being able to reference what timezone we are running conversions on when converting TO the internal timezone
     * (UTC Unix Timestamp) for the object OR when converting FROM the internal timezone (UTC Unix Timestamp).
     * We also set some other properties in this method.
     *
     * @param string $timezone_string A valid timezone string as described by @link
     *                                http://www.php.net/manual/en/timezones.php
     * @return void
     * @throws \EE_Error
     */
    public function set_timezone($timezone_string)
    {
        if (empty($timezone_string) && $this->_timezone_string !== null) {
            // leave the timezone AS-IS if we already have one and
            // the function arg didn't provide one
            return;
        }
        $timezone_string        = EEH_DTT_Helper::get_valid_timezone_string($timezone_string);
        $this->_timezone_string = ! empty($timezone_string) ? $timezone_string : 'UTC';
        $this->_DateTimeZone    = $this->_create_timezone_object_from_timezone_string($this->_timezone_string);
    }


    /**
     * _create_timezone_object_from_timezone_name
     *
     * @access protected
     * @param string $timezone_string
     * @return \DateTimeZone
     * @throws \EE_Error
     */
    protected function _create_timezone_object_from_timezone_string($timezone_string = '')
    {
        return new DateTimeZone(EEH_DTT_Helper::get_valid_timezone_string($timezone_string));
    }


    /**
     * This just returns whatever is set for the current timezone.
     *
     * @access public
     * @return string timezone string
     */
    public function get_timezone()
    {
        return $this->_timezone_string;
    }


    /**
     * set the $_date_format property
     *
     * @access public
     * @param string $format a new date format (corresponding to formats accepted by PHP date() function)
     * @param bool   $pretty Whether to set pretty format or not.
     * @return void
     */
    public function set_date_format($format, $pretty = false)
    {
        if ($pretty) {
            $this->_pretty_date_format = $format;
        } else {
            $this->_date_format = $format;
        }
    }


    /**
     * return the $_date_format property value.
     *
     * @param bool $pretty Whether to get pretty format or not.
     * @return string
     */
    public function get_date_format($pretty = false)
    {
        return $pretty ? $this->_pretty_date_format : $this->_date_format;
    }


    /**
     * set the $_time_format property
     *
     * @access public
     * @param string $format a new time format (corresponding to formats accepted by PHP date() function)
     * @param bool   $pretty Whether to set pretty format or not.
     * @return void
     */
    public function set_time_format($format, $pretty = false)
    {
        if ($pretty) {
            $this->_pretty_time_format = $format;
        } else {
            $this->_time_format = $format;
        }
    }


    /**
     * return the $_time_format property value.
     *
     * @param bool $pretty Whether to get pretty format or not.
     * @return string
     */
    public function get_time_format($pretty = false)
    {
        return $pretty ? $this->_pretty_time_format : $this->_time_format;
    }


    /**
     * set the $_pretty_date_format property
     *
     * @access public
     * @param string $format a new pretty date format (corresponding to formats accepted by PHP date() function)
     * @return void
     */
    public function set_pretty_date_format($format)
    {
        $this->_pretty_date_format = $format;
    }


    /**
     * set the $_pretty_time_format property
     *
     * @access public
     * @param string $format a new pretty time format (corresponding to formats accepted by PHP date() function)
     * @return void
     */
    public function set_pretty_time_format($format)
    {
        $this->_pretty_time_format = $format;
    }


    /**
     * Only sets the time portion of the datetime.
     *
     * @param string|DateTime $time_to_set_string like 8am OR a DateTime object.
     * @param DateTime        $current            current DateTime object for the datetime field
     * @return DateTime
     */
    public function prepare_for_set_with_new_time($time_to_set_string, DateTime $current)
    {
        // if $time_to_set_string is datetime object, then let's use it to set the parse array.
        // Otherwise parse the string.
        if ($time_to_set_string instanceof DateTime) {
            $parsed = array(
                'hour'   => $time_to_set_string->format('H'),
                'minute' => $time_to_set_string->format('i'),
                'second' => $time_to_set_string->format('s'),
            );
        } else {
            //parse incoming string
            $parsed = date_parse_from_format($this->_time_format, $time_to_set_string);
        }

        //make sure $current is in the correct timezone.
        $current->setTimezone($this->_DateTimeZone);

        return $current->setTime($parsed['hour'], $parsed['minute'], $parsed['second']);
    }


    /**
     * Only sets the date portion of the datetime.
     *
     * @param string|DateTime $date_to_set_string like Friday, January 8th or a DateTime object.
     * @param DateTime        $current            current DateTime object for the datetime field
     * @return DateTime
     */
    public function prepare_for_set_with_new_date($date_to_set_string, DateTime $current)
    {
        // if $time_to_set_string is datetime object, then let's use it to set the parse array.
        // Otherwise parse the string.
        if ($date_to_set_string instanceof DateTime) {
            $parsed = array(
                'year'  => $date_to_set_string->format('Y'),
                'month' => $date_to_set_string->format('m'),
                'day'   => $date_to_set_string->format('d'),
            );
        } else {
            //parse incoming string
            $parsed = date_parse_from_format($this->_date_format, $date_to_set_string);
        }

        //make sure $current is in the correct timezone
        $current->setTimezone($this->_DateTimeZone);

        return $current->setDate($parsed['year'], $parsed['month'], $parsed['day']);
    }


    /**
     * This prepares the EE_DateTime value to be saved to the db as mysql timestamp (UTC +0 timezone).  When the
     * datetime gets to this stage it should ALREADY be in UTC time
     *
     * @param  DateTime $DateTime
     * @return string formatted date time for given timezone
     * @throws \EE_Error
     */
    public function prepare_for_get($DateTime)
    {
        return $this->_prepare_for_display($DateTime);
    }


    /**
     * This differs from prepare_for_get in that it considers whether the internal $_timezone differs
     * from the set wp timezone.  If so, then it returns the datetime string formatted via
     * _pretty_date_format, and _pretty_time_format.  However, it also appends a timezone
     * abbreviation to the date_string.
     *
     * @param mixed $DateTime
     * @param null  $schema
     * @return string
     * @throws \EE_Error
     */
    public function prepare_for_pretty_echoing($DateTime, $schema = null)
    {
        return $this->_prepare_for_display($DateTime, $schema ? $schema : true);
    }


    /**
     * This prepares the EE_DateTime value to be saved to the db as mysql timestamp (UTC +0
     * timezone).
     *
     * @param DateTime    $DateTime
     * @param bool|string $schema
     * @return string
     * @throws \EE_Error
     */
    protected function _prepare_for_display($DateTime, $schema = false)
    {
        if (! $DateTime instanceof DateTime) {
            if ($this->_nullable) {
                return '';
            } else {
                if (WP_DEBUG) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                'EE_Datetime_Field::_prepare_for_display requires a DateTime class to be the value for the $DateTime argument because the %s field is not nullable.',
                                'event_espresso'
                            ),
                            $this->_nicename
                        )
                    );
                } else {
                    $DateTime = new DbSafeDateTime(\EE_Datetime_Field::now);
                    EE_Error::add_error(
                        sprintf(
                            __(
                                'EE_Datetime_Field::_prepare_for_display requires a DateTime class to be the value for the $DateTime argument because the %s field is not nullable.  When WP_DEBUG is false, the value is set to "now" instead of throwing an exception.',
                                'event_espresso'
                            ),
                            $this->_nicename
                        )
                    );
                }
            }
        }
        $format_string = $this->_get_date_time_output($schema);
        //make sure datetime_value is in the correct timezone (in case that's been updated).
        $DateTime->setTimezone($this->_DateTimeZone);
        if ($schema) {
            if ($this->_display_timezone()) {
                //must be explicit because schema could equal true.
                if ($schema === 'no_html') {
                    $timezone_string = ' (' . $DateTime->format('T') . ')';
                } else {
                    $timezone_string = ' <span class="ee_dtt_timezone_string">(' . $DateTime->format('T') . ')</span>';
                }
            } else {
                $timezone_string = '';
            }

            return $DateTime->format($format_string) . $timezone_string;
        } else {
            return $DateTime->format($format_string);
        }
    }


    /**
     * This prepares the EE_DateTime value to be saved to the db as mysql timestamp (UTC +0
     * timezone).
     *
     * @param  mixed $datetime_value u
     * @return string mysql timestamp in UTC
     * @throws \EE_Error
     */
    public function prepare_for_use_in_db($datetime_value)
    {
        //we allow an empty value or DateTime object, but nothing else.
        if (! empty($datetime_value) && ! $datetime_value instanceof DateTime) {
            throw new EE_Error(
                __(
                    'The incoming value being prepared for setting in the database must either be empty or a php DateTime object',
                    'event_espresso'
                )
            );
        }

        if ($datetime_value instanceof DateTime) {
            if ( ! $datetime_value instanceof DbSafeDateTime) {
                $datetime_value = DbSafeDateTime::createFromDateTime($datetime_value);
            }

            return $datetime_value->setTimezone($this->get_UTC_DateTimeZone())->format(
                EE_Datetime_Field::mysql_timestamp_format
            );
        }

        // if $datetime_value is empty, and ! $this->_nullable, use current_time() but set the GMT flag to true
        return ! $this->_nullable && empty($datetime_value) ? current_time('mysql', true) : null;
    }


    /**
     * This prepares the datetime for internal usage as a PHP DateTime object OR null (if nullable is
     * allowed)
     *
     * @param string $datetime_string mysql timestamp in UTC
     * @return  mixed null | DateTime
     * @throws \EE_Error
     */
    public function prepare_for_set_from_db($datetime_string)
    {
        //if $datetime_value is empty, and ! $this->_nullable, just use time()
        if (empty($datetime_string) && $this->_nullable) {
            return null;
        }
        // datetime strings from the db should ALWAYS be in UTC+0, so use UTC_DateTimeZone when creating
        if (empty($datetime_string)) {
            $DateTime = new DbSafeDateTime(\EE_Datetime_Field::now, $this->get_UTC_DateTimeZone());
        } else {
            $DateTime = DateTime::createFromFormat(
                EE_Datetime_Field::mysql_timestamp_format,
                $datetime_string,
                $this->get_UTC_DateTimeZone()
            );
            if ($DateTime instanceof \DateTime) {
                $DateTime = new DbSafeDateTime(
                    $DateTime->format(\EE_Datetime_Field::mysql_timestamp_format),
                    $this->get_UTC_DateTimeZone()
                );
            }
        }

        if (! $DateTime instanceof DbSafeDateTime) {
            // if still no datetime object, then let's just use now
            $DateTime = new DbSafeDateTime(\EE_Datetime_Field::now, $this->get_UTC_DateTimeZone());
        }
        // THEN apply the field's set DateTimeZone
        $DateTime->setTimezone($this->_DateTimeZone);

        return $DateTime;
    }


    /**
     * All this method does is determine if we're going to display the timezone string or not on any output.
     * To determine this we check if the set timezone offset is different than the blog's set timezone offset.
     * If so, then true.
     *
     * @return bool true for yes false for no
     * @throws \EE_Error
     */
    protected function _display_timezone()
    {

        // first let's do a comparison of timezone strings.
        // If they match then we can get out without any further calculations
        $blog_string = get_option('timezone_string');
        if ($blog_string === $this->_timezone_string) {
            return false;
        }
        // now we need to calc the offset for the timezone string so we can compare with the blog offset.
        $this_offset = $this->get_timezone_offset($this->_DateTimeZone);
        $blog_offset = $this->get_timezone_offset($this->get_blog_DateTimeZone());
        // now compare
        return $blog_offset !== $this_offset;
    }


    /**
     * This method returns a php DateTime object for setting on the EE_Base_Class model.
     * EE passes around DateTime objects because they are MUCH easier to manipulate and deal
     * with.
     *
     * @param int|string|DateTime $date_string            This should be the incoming date string.  It's assumed to be
     *                                                    in the format that is set on the date_field (or DateTime
     *                                                    object)!
     * @return DateTime
     */
    protected function _get_date_object($date_string)
    {
        //first if this is an empty date_string and nullable is allowed, just return null.
        if ($this->_nullable && empty($date_string)) {
            return null;
        }

        // if incoming date
        if ($date_string instanceof DateTime) {
            $date_string->setTimezone($this->_DateTimeZone);

            return $date_string;
        }
        // if empty date_string and made it here.
        // Return a datetime object for now in the given timezone.
        if (empty($date_string)) {
            return new DbSafeDateTime(\EE_Datetime_Field::now, $this->_DateTimeZone);
        }
        // if $date_string is matches something that looks like a Unix timestamp let's just use it.
        if (preg_match(EE_Datetime_Field::unix_timestamp_regex, $date_string)) {
            try {
                // This is operating under the assumption that the incoming Unix timestamp
                // is an ACTUAL Unix timestamp and not the calculated one output by current_time('timestamp');
                $DateTime = new DbSafeDateTime(\EE_Datetime_Field::now, $this->_DateTimeZone);
                $DateTime->setTimestamp($date_string);

                return $DateTime;
            } catch (Exception $e) {
                // should be rare, but if things got fooled then let's just continue
            }
        }
        //not a unix timestamp.  So we will use the set format on this object and set timezone to
        //create the DateTime object.
        $format = $this->_date_format . ' ' . $this->_time_format;
        try {
            $DateTime = DateTime::createFromFormat($format, $date_string, $this->_DateTimeZone);
            if ($DateTime instanceof DateTime) {
                $DateTime = new DbSafeDateTime(
                    $DateTime->format(\EE_Datetime_Field::mysql_timestamp_format),
                    $this->_DateTimeZone
                );
            }
            if (! $DateTime instanceof DbSafeDateTime) {
                throw new EE_Error(
                    sprintf(
                        __('"%1$s" does not represent a valid Date Time in the format "%2$s".', 'event_espresso'),
                        $date_string,
                        $format
                    )
                );
            }
        } catch (Exception $e) {
            // if we made it here then likely then something went really wrong.
            // Instead of throwing an exception, let's just return a DateTime object for now, in the set timezone.
            $DateTime = new DbSafeDateTime(\EE_Datetime_Field::now, $this->_DateTimeZone);
        }

        return $DateTime;
    }



    /**
     * get_timezone_transitions
     *
     * @param \DateTimeZone $DateTimeZone
     * @param int           $time
     * @param bool          $first_only
     * @return mixed
     */
    public function get_timezone_transitions(DateTimeZone $DateTimeZone, $time = null, $first_only = true)
    {
        $time = is_int($time) || $time === null ? $time : strtotime($time);
        $time = preg_match(EE_Datetime_Field::unix_timestamp_regex, $time) ? $time : time();
        $transitions = $DateTimeZone->getTransitions($time);
        return $first_only && ! isset($transitions['ts']) ? reset($transitions) : $transitions;
    }



    /**
     * get_timezone_offset
     *
     * @param \DateTimeZone $DateTimeZone
     * @param int           $time
     * @return mixed
     * @throws \DomainException
     */
    public function get_timezone_offset(DateTimeZone $DateTimeZone, $time = null)
    {
        $transitions = $this->get_timezone_transitions($DateTimeZone, $time);
        if ( ! isset($transitions['offset'])) {
            throw new DomainException();
        }
        return $transitions['offset'];
    }


    /**
     * This will take an incoming timezone string and return the abbreviation for that timezone
     *
     * @param  string $timezone_string
     * @return string           abbreviation
     * @throws \EE_Error
     */
    public function get_timezone_abbrev($timezone_string)
    {
        $timezone_string = EEH_DTT_Helper::get_valid_timezone_string($timezone_string);
        $dateTime        = new DateTime(\EE_Datetime_Field::now, new DateTimeZone($timezone_string));

        return $dateTime->format('T');
    }

    /**
     * Overrides the parent to allow for having a dynamic "now" value
     *
     * @return mixed
     */
    public function get_default_value()
    {
        if ($this->_default_value === EE_Datetime_Field::now) {
            return time();
        } else {
            return parent::get_default_value();
        }
    }


    public function getSchemaDescription()
    {
        return sprintf(
            esc_html__('%s - the value for this field is in the timezone of the site.', 'event_espresso'),
            $this->get_nicename()
        );
    }
}
