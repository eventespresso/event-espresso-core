<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Datetime_Field extends EE_Model_Field_Base {

	/**
	 * These properties hold the default formats for date and time.  Defaults are set via the constructor and can be overridden on class instantiation.  However they can also be overridden later by the set_format() method (and corresponding set_date_format, set_time_format methods);
	 * @var
	 */
	private $_date_format = NULL;
	private $_time_format = NULL;
	private $_pretty_date_format = NULL;
	private $_pretty_time_format = NULL;
	private static $_UTC_DateTimeZone = NULL;


	/**
	 * This property holds how we want the output returned when getting a datetime string.  It is set for the set_date_time_output() method.  By default this is empty.  When empty, we are assuming that we want both date and time returned via getters.
	 * @var mixed (null|string)
	 */
	private $_date_time_output = NULL;



	/**
	 * This is used for holding the date objects set internally when doing date calculations/changes
	 * @var object
	 */
	private $_date;


	/**
	 * Timezone
	 * This gets set by the constructor and can be changed by the "set_timezone()" method so that we know what timezone incoming strings|timestamps are in.  This can also be used before a get to set what timezone you want strings coming out of the object to be in.  Default timezone is the current WP timezone option setting
	 * @var string
	 */
	private $_timezone = NULL;



	/**
	 * This holds whatever UTC offset for the blog (we automatically convert timezone strings into their related offsets for comparison purposes).
	 * @var int
	 */
	private $_blog_offset = NULL;



	/**
	 * @param      $table_column
	 * @param      $nice_name
	 * @param      $nullable
	 * @param null $default_value
	 * @param null $timezone
	 * @param null $date_format
	 * @param null $time_format
	 * @param null $pretty_date_format
	 * @param null $pretty_time_format
	 */
	public function __construct( $table_column, $nice_name, $nullable, $default_value, $timezone = NULL, $date_format = NULL, $time_format = NULL, $pretty_date_format = NULL, $pretty_time_format = NULL ){

		parent::__construct($table_column, $nice_name, $nullable, $default_value);
		$this->_date_format = empty($date_format) ? get_option('date_format') : $date_format;
		$this->_date_format = EE_Base_Class::fix_date_format_for_use_with_strtotime( $this->_date_format );
		$this->_time_format = empty($time_format) ? get_option('time_format') : $time_format;

		$this->set_timezone( $timezone );


		$this->_pretty_date_format = empty($pretty_date_format) ? get_option('date_format') : $pretty_date_format;
		$this->_pretty_date_format = EE_Base_Class::fix_date_format_for_use_with_strtotime( $this->_pretty_date_format );
		$this->_pretty_time_format = empty( $pretty_time_format ) ? get_option('time_format') : $pretty_time_format;
	}



	/**
	 * @return string
	 */
	public function get_wpdb_data_type() {
		return '%s';
	}



	/**
	 * @return DateTimeZone|null
	 */
	public static function get_UTC_DateTimeZone() {
		return EE_Datetime_Field::$_UTC_DateTimeZone instanceof DateTimeZone ? EE_Datetime_Field::$_UTC_DateTimeZone : new DateTimeZone( 'UTC' );
	}



	/**
	 * this prepares any incoming date data and make sure its converted to a utc unix timestamp
	 * @param  string|int $value_inputted_for_field_on_model_object could be a string formatted date time or int unix timestamp
	 * @return int                                           unix timestamp (utc)
	 */
	public function prepare_for_set($value_inputted_for_field_on_model_object) {
		return $this->_convert_to_utc_unix_timestamp( $value_inputted_for_field_on_model_object);
	}





	/**
	 * This returns the format string to be used by getters depending on what the $_date_time_output property is set at.
	 *
	 * getters need to know whether we're just returning the date or the time or both.  By default we return both.
	 *
	 * @access private
	 * @param bool $pretty If we're returning the pretty formats or standard format string.
	 * @return string    The final assembled format string.
	 */
	private function _get_date_time_output( $pretty = FALSE ) {

		switch ( $this->_date_time_output ) {
			case 'time' :
				return $pretty ? $this->_pretty_time_format : $this->_time_format;
				break;

			case 'date' :
				return $pretty ? $this->_pretty_date_format : $this->_date_format;
				break;

			default :
				return $pretty ? $this->_pretty_date_format . ' ' . $this->_pretty_time_format : $this->_date_format . ' ' . $this->_time_format;
		}
	}




	/**
	 * This just sets the $_date_time_output property so we can flag how date and times are formatted before being returned (using the format properties)
	 *
	 * @access public
	 * @param string $what acceptable values are 'time' or 'date'.  Any other value will be set but will always result in both 'date' and 'time' being returned.
	 * @return void
	 */
	public function set_date_time_output( $what = NULL ) {
		$this->_date_time_output = $what;
	}




	/**
	 * See $_timezone property for description of what the timezone property is for.  This SETS the timezone internally for being able to reference what timezone we are running conversions on when converting TO the internal timezone (UTC Unix Timestamp) for the object OR when converting FROM the internal timezone (UTC Unix Timestamp).
	 *
	 * We also set some other properties in this method.
	 *
	 * @access public
	 * @param string $timezone A valid timezone string as described by @link http://www.php.net/manual/en/timezones.php
	 * @return void
	 */
	public function set_timezone( $timezone ) {
		if( $timezone === NULL && $this->_timezone != NULL){
			//leave the timezone AS-IS if we already have one and
			//the function arg didn't provide one
			return;
		}
		$this->_timezone = empty( $timezone ) ? get_option('timezone_string') : $timezone;

		//if timezone is STILL empty then let's get the GMT offset and then set the timezone_string using our converter
		if ( empty( $this->_timezone ) ) {
			//let's get a the WordPress UTC offset
			$offset = get_option('gmt_offset');
			$this->_blog_offset = $offset;
			$this->_timezone = self::timezone_convert_to_string_from_offset( $offset );
		}

		self::validate_timezone( $this->_timezone ); //just running validation on the timezone.
	}




	/**
	 * This just returns whatever is set for the current timezone.
	 *
	 * @access public
	 * @return string timezone string
	 */
	public function get_timezone() {
		return $this->_timezone;
	}


	/**
	 * set the $_date_format property
	 *
	 * @access public
	 * @param string $format a new date format (corresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_date_format( $format ) {
		$this->_date_format = $format;
	}




	/**
	 * set the $_time_format property
	 *
	 * @access public
	 * @param string $format a new time format (corresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_time_format( $format ) {
		$this->_time_format = $format;
	}





	/**
	 * set the $_pretty_date_format property
	 *
	 * @access public
	 * @param string $format a new pretty date format (corresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_pretty_date_format( $format ) {
		$this->_pretty_date_format = $format;
	}







	/**
	 * set the $_pretty_time_format property
	 *
	 * @access public
	 * @param string $format a new pretty time format (corresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_pretty_time_format( $format ) {
		$this->_pretty_time_format = $format;
	}



	/**
	 * Only sets the time portion of the datetime.
	 * @param string $time_to_set_string     like 8am,
	 * @param int    $current_datetime_value current value of the datetime field (timestamp)
	 * @throws EE_Error
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_time($time_to_set_string, $current_datetime_value ){
		$this->_set_date_obj( date( $this->_date_format . ' ' . $this->_time_format, $current_datetime_value), 'UTC' );
		if ( ! $this->_date instanceof DateTime  && ! $this->_nullable ) {
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );
		}
		return $this->_prepare_for_set_new( $time_to_set_string, TRUE );
	}



	/**
	 * Only sets the date portion of the datetime.
	 * @param string $date_to_set_string     like 8am,
	 * @param int    $current_datetime_value current value of the datetime field (timestamp)
	 * @throws EE_Error
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_date($date_to_set_string, $current_datetime_value ){
		$this->_set_date_obj( date( $this->_date_format  . ' ' . $this->_time_format, $current_datetime_value ), 'UTC' );
		if ( ! $this->_date instanceof DateTime && ! $this->_nullable ) {
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );
		}
		return $this->_prepare_for_set_new( $date_to_set_string );
	}






	/**
	 * This returns the given datetime value.
	 * @param  int    $datetime_value This will always be a unix timestamp in UTC because that's what the internal data type of the date time property is.
	 * @return string                formatted date time for given timezone
	 */
	public function prepare_for_get( $datetime_value ) {

		$format_string = $this->_get_date_time_output();
		//send this to our formatter to return localized time for the timezone
		return $this->_convert_to_timezone_from_utc_unix_timestamp( $datetime_value, $format_string );
	}



	/**
	 * When echoing a field's value on a model object, this function is run to prepare the value for presentation in a webpage.
	 * For example, we may want to output floats with 2 decimal places by default, dates as "Monday Jan 12, 2013, at 3:23pm" instead of
	 * "8765678632", or any other modifications to how the value should be displayed, but not modified itself.
	 * @param mixed $datetime_value
	 * @param null  $schema
	 * @internal param mixed $value_on_field_to_be_outputted
	 * @return mixed
	 */
	public function prepare_for_pretty_echoing( $datetime_value, $schema = null ) {
		$timezone_string = $this->_display_timezone() ? '<span class="ee_dtt_timezone_string">(' . self::get_timezone_abbrev($this->_timezone) . ')</span>' : '';
		$format_string = $this->_get_date_time_output( TRUE );
		return $this->_convert_to_timezone_from_utc_unix_timestamp( $datetime_value, $format_string ) . $timezone_string;
	}




	/**
	 * This prepares the EE_DateTime value to be saved to the db as mysql timestamp (UTC +0 timezone).  When the datetime gets to this stage it should ALREADY be in UTC time
	 * @param  int $datetime_value unix timestamp in UTC
	 * @return string                mysql timestamp in UTC
	 */
	public function prepare_for_use_in_db( $datetime_value ) {
		return $this->_nullable && empty( $datetime_value) ? NULL : date( "Y-m-d H:i:s", $datetime_value );
	}





	/**
	 * This prepares the datetime for internal usage as a unix timestamp
	 * @param  string $datetime_value mysql timestamp in UTC
	 * @return int                 UnixTime in UTC
	 */
	public function prepare_for_set_from_db( $datetime_value ) {
		return $this->_nullable && empty( $datetime_value ) ? NULL : strtotime( $datetime_value );
	}



	/**
	 * Takes an incoming unix timestamp which is assumed to be GMT, converts it to the timezone as exists in the _timezone property and then returns.
	 * @param  int    $datetime_value unix timestamp in utc
	 * @param  string $format         format for final date/time string
	 * @throws EE_Error
	 * @return string           final converted date-time-zone.
	 */
	private function _convert_to_timezone_from_utc_unix_timestamp( $datetime_value, $format ) {
		if ( $this->_nullable && empty( $datetime_value )) {
			return NULL;
		}
		$datetime = date( 'Y-m-d H:i:s', (int)$datetime_value );
		$this->_set_date_obj( $datetime, 'UTC' );
		if ( ! $this->_date instanceof DateTime ) {
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );
		}
		$this->_date->setTimezone( new DateTimeZone( $this->_timezone ) );
		return $this->_date->format( $format );

	}







	/**
	 * This adjusts the current date object to whatever the new time or date should be
	 *
	 * @uses date_parse() to get the parsed date info from the incoming string
	 * @access private
	 * @param  string  $datetime_adjustment The time OR date string that is being adjusted within the current date_time_object
	 * @param  boolean $is_time            If this is a time adjustment set this boolean flag to true, otherwise it is a date adjustment
	 * @return int                         UTC UnixTimestamp
	 */
	private function _prepare_for_set_new( $datetime_adjustment, $is_time = FALSE ) {
		if ( $this->_nullable && empty( $datetime_adjustment ) ) {
			return NULL;
		}
		//first let's parse the incoming string
		$parsed = date_parse( $datetime_adjustment );
		//set the timezone to the incoming timezone for the current date_object
		$this->_date->setTimezone( new DateTimeZone( $this->_timezone ) );
		//let's adjust the time or date depending on our $is_time boolean
		if ( $is_time ) {
			$this->_date->setTime( $parsed['hour'], $parsed['minute'] );
		} else {
			$this->_date->setDate( $parsed['year'], $parsed['month'], $parsed['day'] );
		}
		//return to UTC time
		$this->_date->setTimezone( EE_Datetime_Field::get_UTC_DateTimeZone() );
		//return unix timestamp
		return $this->_date->format('U');
	}






	/**
	 * This simply takes an incoming timestamp and timezone and spits out the unix timestamp for the set timezone ($this->_timezone property).
	 * @param  string|int $datetime This can be either an integer timestamp (in which case this method will convert from int to string first to make sure we get the right timezone setup )
	 * @return string 		unix timestamp for utc
	 */
	private function _convert_to_utc_unix_timestamp( $datetime ) {
		if ( $this->_nullable && empty( $datetime ) )
			return NULL;
		$timestamp = is_numeric( $datetime ) ? $this->_convert_from_numeric_value_to_utc_unix_timestamp( $datetime ) : $this->_convert_from_string_value_to_utc_unix_timestamp( $datetime );
		return $timestamp;
	}



	/**
	 * @param $datetime
	 * @return bool|int|string
	 * @throws EE_Error
	 */
	private function _convert_from_numeric_value_to_utc_unix_timestamp( $datetime ) {
		$datetime = date( 'Y-m-d H:i:s', (int) $datetime);

		date_default_timezone_set( $this->_timezone );
		$timestamp = strtotime($datetime);

		//if we don't have a datetime at this point then something has gone wrong
		if ( $timestamp === NULL || $timestamp === FALSE) {
			throw new EE_Error( sprintf( __('Something went wrong with setting the date/time.  Likely, either there is an invalid timezone string or invalid timestamp being used. Datetime passed in: %s producted timestamp: %s', 'event_espresso' ), $datetime, $timestamp )  );
		}

		//return to default for PHP
		date_default_timezone_set('UTC');

		//now that we have the string we can send this over to our string value conversion
		return $timestamp;
	}



	/**
	 * @param $datetime
	 * @return string
	 * @throws EE_Error
	 */
	private function _convert_from_string_value_to_utc_unix_timestamp( $datetime ) {
		//create a new datetime object using the given string and timezone
		$this->_set_date_obj( $datetime, $this->_timezone );

		if ( ! $this->_date instanceof DateTime && ! $this->_nullable ) {
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );
		}

		$this->_date->setTimezone( EE_Datetime_Field::get_UTC_DateTimeZone() );
		return $this->_date->format('U');

	}



	/**
	 * This only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
	 *
	 * @static
	 * @access public
	 * @param  string $timezone_string Timezone string to check
	 * @throws EE_Error
	 * @return boolean    Return True if Valid, False if Invalid
	 */
	public static function validate_timezone( $timezone_string ) {
		// easiest way to test a timezone string is just see if it throws an error when you try to create a DateTimeZone object with it
		try {
			new DateTimeZone( $timezone_string );
		} catch ( Exception $e ) {
			throw new EE_Error( sprintf(
				__( 'The timezone given (%s), is invalid, please check with %sthis list%s for what valid timezones can be used', 'event_espresso' ),
				$timezone_string,
				'<a href="http://www.php.net/manual/en/timezones.php">',
				'</a>'
			));
		}
		return TRUE;
	}





	/**
	 * all this method does is take an incoming GMT offset value ( e.g. "+1" or "-4" ) and returns a corresponding valid DateTimeZone() timezone_string.
	 * graciously taken from bottom comment at http://ca1.php.net/manual/en/function.timezone-name-from-abbr.php because timezone_name_from_abbr() did NOT work as expected - its not reliable
	 * @param  string $offset GMT offset
	 * @return string         timezone_string (valid for DateTimeZone)
	 */
	public static function timezone_convert_to_string_from_offset( $offset ) {
		$offset *= 3600; // convert hour offset to seconds
		//make sure $offset is int (cause if incoming was int then converted to float);
		$offset = (int) $offset;

		//account for WP offsets that aren't valid UTC
		switch ( $offset ) {
			case -1800 :
				$offset = -3600;
				break;

			case 1800 :
				$offset = 3600;
				break;

			case -23400 :
				$offset = -21600;
				break;

			case -27000 :
				$offset = -25200;
				break;

			case -30600 :
				$offset = -28800;
				break;

			case 49500 :
				$offset = 50400;
				break;

			default :
				$offset = $offset;
				break;
		}

		$abbreviations = timezone_abbreviations_list();
		foreach ( $abbreviations as $abbreviation ) {
			foreach ( $abbreviation as $city ) {
				if ( $city['offset'] === $offset && $city['dst'] === FALSE ) {
					return $city['timezone_id'];
				}
			}
		}
        		return FALSE;
	}




	/**
	 * This method simply gets the offset for the given valid timezone string and returns it.
	 * @param  string $tz valid timezone string
	 * @return int     if conversion can happen then we return the offset, if not then we return FALSE (or EE_Error)
	 */
	public static function timezone_convert_to_offset_from_string( $tz ) {
		$abbreviations = timezone_abbreviations_list();
		$offset = NULL;
		foreach ( $abbreviations as $abbreviation ) {
			foreach ( $abbreviation as $city ) {
				if ( $city['timezone_id'] == $tz ) {
					$offset = $city['offset'];
				}
			}
		}
		//$offset will be in seconds so let's convert to hours and make sure its an int
		return ! empty( $offset) ? (int)( $offset / 3600 ) : 0;
	}



	/**
	 * All this method does is determine if we're going to display the timezone string or not on any output.
	 *
	 * To determine this we check if the set timezone offset is different than the blog's set timezone offset.  If so, then true.
	 *
	 * @return bool true for yes false for no
	 */
	private function _display_timezone() {

		//first let's do a comparison of timezone strings.  If they match then we can get out without any further calculations
		$blog_string = get_option('timezone_string');
		if ( $blog_string == $this->_timezone )
			return FALSE;

		//now we need to calc the offset for the timezone string so we can compare with the blog offset.
		$this_offset = self::timezone_convert_to_offset_from_string( $this->_timezone );
		$blog_offset = !empty( $this->_blog_offset ) ? $this->_blog_offset : self::timezone_convert_to_offset_from_string( $blog_string );

		//now compare
		if ( $blog_offset === $this_offset )
			return FALSE;

		return TRUE;

	}



	/**
	 * This is used to set the $_date property using the PHP DateTime object for internal calculations and timezone settings
	 * @param string $date_string Incoming date/time string in an acceptable format
	 * @param string $timezone    Valid Timezone for dates
	 * @throws Exception
	 * @return void
	 */
	private function _set_date_obj( $date_string, $timezone ) {
		if ( $this->_nullable && empty( $date_string ) ) {
			$this->_date = NULL;
			return;
		}
		try {
			$this->_date = new DateTime( $date_string, new DateTimeZone( $timezone ));
		} catch( Exception $e ) {
			//probably a badly formatted date string
			try {
				if ( version_compare( PHP_VERSION, '5.3.0' ) >= 0 ) {
					// maybe it's the Microsoft excel format '16/08/2013 8:58' ?
					$this->_date = DateTime::createFromFormat( 'd/m/Y H:i', $date_string, new DateTimeZone( $timezone ));
				} else {
					//change 'd/m/Y H:i'  to 'd-m-Y H:i'  because of how strtotime() interprets date formats. see: http://www.php.net/manual/en/datetime.formats.date.php
					$this->_date = new DateTime( date( 'd-m-Y H:i', strtotime( $date_string )), new DateTimeZone( $timezone ));
				}
			} catch( Exception $e ) {
				// because DateTime chokes on some formats, check if strtotime fails, and throw error regarding bad format
				if ( strtotime( $date_string ) == 0 ) {
					throw new Exception( sprintf( __('The following date time \'%s\' can not be parsed by PHP due to it\'s formatting.%sYou may need to choose a more standard date time format. Please check your WordPress Settings.', 'event_espresso' ), $date_string, '<br />' ));
				} else {
					//ok give up, but don't throw an error
					$this->_date = new DateTime( NULL, new DateTimeZone( $timezone ));
				}
			}
		}
	}




	/**
	 * This will take an incoming timezone string and return the abbreviation for that timezone
	 * @param  string $timezone Valid timezone String
	 * @return string           abbreviation
	 */
	public static function get_timezone_abbrev( $timezone ) {
		$dateTime = new DateTime();
		$dateTime->setTimeZone( new DateTimeZone($timezone) );
		return $dateTime->format('T');
	}


}
