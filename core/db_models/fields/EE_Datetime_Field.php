<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Datetime_Field extends EE_Model_Field_Base {

	/**
	 * These properties hold the default formats for date and time.  Defaults are set via the constructor and can be overridden on class instantiation.  However they can also be overridden later by the set_format() method (and corresponding set_date_format, set_time_format methods);
	 * @var
	 */
	protected $_date_format = NULL;
	protected $_time_format = NULL;
	protected $_pretty_date_format = NULL;
	protected $_pretty_time_format = NULL;
	protected static $_UTC_DateTimeZone = NULL;


	/**
	 * This property holds how we want the output returned when getting a datetime string.  It is set for the set_date_time_output() method.  By default this is empty.  When empty, we are assuming that we want both date and time returned via getters.
	 * @var mixed (null|string)
	 */
	protected $_date_time_output = NULL;


	/**
	 * Timezone
	 * This gets set by the constructor and can be changed by the "set_timezone()" method so that we know what timezone incoming strings|timestamps are in.  This can also be used before a get to set what timezone you want strings coming out of the object to be in.  Default timezone is the current WP timezone option setting
	 * @var string
	 */
	protected $_timezone = NULL;



	/**
	 * This holds whatever UTC offset for the blog (we automatically convert timezone strings into their related offsets for comparison purposes).
	 * @var int
	 */
	protected $_blog_offset = NULL;



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
		$this->_time_format = empty($time_format) ? get_option('time_format') : $time_format;

		$this->set_timezone( $timezone );


		$this->_pretty_date_format = empty($pretty_date_format) ? get_option('date_format') : $pretty_date_format;
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
		return $this->_get_date_object( $value_inputted_for_field_on_model_object );
	}





	/**
	 * This returns the format string to be used by getters depending on what the $_date_time_output property is set at.
	 *
	 * getters need to know whether we're just returning the date or the time or both.  By default we return both.
	 *
	 * @access protected
	 * @param bool $pretty If we're returning the pretty formats or standard format string.
	 * @return string    The final assembled format string.
	 */
	protected function _get_date_time_output( $pretty = FALSE ) {

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
	 * return the $_date_format property value.
	 *
	 * @return string
	 */
	public function get_date_format() {
		return $this->_date_format;
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
	 * return the $_time_format property value.
	 *
	 * @return string
	 */
	public function get_time_format() {
		return $this->_time_format;
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
	 * @param DateTime    $current_datetime_value current value of the datetime field
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_time($time_to_set_string, DateTime $current ){
		//parse incoming string
		$parsed = date_parse_from_format( $this->_time_format, $time_to_set_string );
		//make sure $current is in the correct timezone.
		$current->setTimeZone( new DateTimeZone( $this->_timezone ) );
		return $current->setTime( $parsed['hour'], $parsed['minute'], $parsed['second'] );
	}



	/**
	 * Only sets the date portion of the datetime.
	 * @param string $date_to_set_string     like Friday, January 8th,
	 * @param int    $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_date($date_to_set_string, DateTime $current ){
		//parse incoming string
		$parsed = date_parse_from_format( $this->_date_format, $date_to_set_string );
		//make sure $current is in the correct timezone
		return $current->setDate( $parsed['year'], $parsed['month'], $parsed['day'] );
	}






	/**
	 * This returns the given datetime value.
	 * @param  Date_Time    $datetime_value
	 * @return   string             formatted date time for given timezone
	 */
	public function prepare_for_get( $datetime_value ) {
		if ( ! $datetime_value instanceof DateTime ) {
			throw new EE_Error( __('EE_Datetime_Field::prepare_for_get requires a DateTime value to be the value for the $datetime_value argument.', 'event_espresso' ) );
		}
		$format_string = $this->_get_date_time_output();
		//make sure datetime_value is in the correct timezone (in case that's been updated).
		$datetime_value->setTimeZone( new DateTimeZone( $this->_timezone ) );
		//send this to our formatter to return localized time for the timezone
		return $datetime_value->format( $format_string );
	}



	/**
	 * This differs from prepare_for_get in that it considers whether the internal $_timezone differs
	 * from the set wp timezone.  If so, then it returns the datestring formatted via
	 * _pretty_date_format, and _pretty_time_format.  However, it also appends a timezone
	 * abbreviation to the date_string.
	 * @param DateTime $datetime_value
	 * @param null  $schema
	 * @return string
	 */
	public function prepare_for_pretty_echoing( $datetime_value, $schema = null ) {
		if ( ! $datetime_value instanceof DateTime ) {
			throw new EE_Error( __('EE_Datetime_Field::prepare_for_pretty_echoing requires a DateTime value to be the value for the $datetime_value argument.', 'event_espresso' ) );
		}
		$timezone_string = $this->_display_timezone() ? '<span class="ee_dtt_timezone_string">(' . self::get_timezone_abbrev($this->_timezone) . ')</span>' : '';
		$format_string = $this->_get_date_time_output( TRUE );
		//make sure $datetime_value is in any update timezone.
		$datetime_value->setTimeZone( new DateTimeZone( $this->_timezone ) );
		return $datetime_value->format( $format_string ) . $timezone_string;
	}





	/**
	 * This prepares the EE_DateTime value to be saved to the db as mysql timestamp (UTC +0
	 * timezone).
	 * @param  null | DateTime $datetime_value u
	 * @return   string        mysql timestamp in UTC
	 */
	public function prepare_for_use_in_db( $datetime_value ) {
		//we allow an empty value or DateTime object, but nothing else.
		if ( ! empty( $datetime_value ) && ! $datetime_value instanceof DateTime ) {
			throw new EE_Error( __('The incoming value being prepared for setting in the database must either be empty or a php DateTime object', 'event_espresso' ) );
		}

		if ( $datetime_value instanceof DateTime ) {
			return $datetime_value->setTimeZone( new DateTimeZone( 'UTC'  ) )->format( 'Y-m-d H:i:s' );
		}

		//if $datetime_value is empty, and ! $this->_nullable, use time();
		return ! $this->_nullable && empty( $datetime_value ) ? date( 'Y-m-d H:i:s', time() ) : null;
	}





	/**
	 * This prepares the datetime for internal usage as a PHP DateTime object OR null (if nullable is
	 * allowed)
	 * @param string $datetime_value mysql timestamp in UTC
	 * @return  mixed null | DateTime
	 */
	public function prepare_for_set_from_db( $datetime_value ) {
		//if $datetime_value is empty, and ! $this->_nullable, just use time()
		if ( empty( $datetime_value) && $this->_nullable ) {
			return null;
		}

		$date =  empty( $datetime_value ) ? new DateTime("now", new DateTimeZone( 'UTC' ) ) : DateTime::createFromFormat( 'Y-m-d H:i:s', $datetime_value, new DateTimeZone( 'UTC' ) );

		return $date->setTimeZone( new DateTimeZone( $this->_timezone ) );
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
	protected function _display_timezone() {

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
	 * This method returns a php DateTime object for setting on the EE_Base_Class model.
	 * EE passes around DateTime objects because they are MUCH easier to manipulate and deal
	 * with.
	 *
	 * @param int|string $date_string This should be the incoming date string.  It's assumed to be in
	 *                                		      the format that is set on the date_field!
	 *
	 * @return DateTime
	 */
	protected function _get_date_object( $date_string ) {
		//first if this is an empty date_string and nullable is allowed, just return null.
		if ( $this->_nullable && empty( $date_string ) ) {
			return null;
		}

		//if empty date_string and made it here.  Return a datetime object for now in the given
		//timezone.
		if ( empty( $date_string ) ) {
			return new DateTime( "now", new DateTimeZone( $this->_timezone ) );
		}


		/**
		 * if $date_string is matches something that looks like a unixtimestamp let's just use it.
		 * The pattern we're looking for is if only the characters 0-9 are found and there are only
		 * 10 or more numbers (because 9 numbers even with all 9's would be sometime in 2001 );
		 */
		if ( preg_match( '/[0-9]{10,}/', $date_string ) ) {
			try {
				/**
				 * php DateTime() ignores incoming timezone when the value is a unix
				 * timestamp.  In other words it does not consider the incoming timestamp
				 * as having an offset.  So, for backward compat, we need to first set the
				 * time to a non-unix format and then include the timezone.
				 *
				 */
				return new DateTime( date( 'Y-m-d H:i:s', $date_string), new DateTimeZone( $this->_timezone ) );
			 } catch ( Exception $e )  {
			 	// should be rare, but if things got fooled then let's just continue
			 }
		}

		//not a unix timestamp.  So we will use the set format on this object and set timezone to
		//create the DateTime object.
		$format = $this->_date_format . ' ' . $this->_time_format;
		try {
			return DateTime::createFromFormat( $format, $date_string, new DateTimeZone( $this->_timezone ) );
		} catch ( Exception $e ) {
			// if we made it here then likely then something went really wrong.  Instead of throwing an exception, let's just return a DateTime object for now, in the set timezone.
			return new DateTime( "now", new DateTimeZone( $this->_timezone ) );
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
