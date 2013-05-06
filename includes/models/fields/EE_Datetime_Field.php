<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
require_once('fields/EE_Integer_Field.php');
class EE_Datetime_Field extends EE_Integer_Field{
	
	/**
	 * These properties hold the default formats for date and time.  Defaults are set via the constructor and can be overridden on class instantiation.  However they can also be overridden later by the set_format() method (and corresponding set_date_format, set_time_format methods);
	 * @var
	 */
	private $_date_format = NULL;
	private $_time_format = NULL;
	private $_pretty_date_format = NULL;
	private $_pretty_time_format = NULL;

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


	
	public function __construct( $table_column, $nicename, $nullable, $default_value, $date_format = NULL, $time_format = NULL, $pretty_date_format = NULL, $pretty_time_format = NULL, $timezone = NULL ){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
		$this->_date_format = empty($date_format) ? 'Y-m-d' : $date_format;
		$this->_time_format = empty($time_format) ? 'H:i:s' : $time_format;
		$this->_pretty_date_format = empty($pretty_date_format) ? 'F j, Y' : $pretty_date_format;
		$this->_pretty_time_format = empty( $pretty_time_format ) ? 'g:i a' : $pretty_time_format;
		$this->_timezone = empty($timezone) ? get_option('timezone_string') : $timezone;
	}
	

	/**
	 * this prepares any incoming date data and make sure its converted to a utc unix timestamp
	 * @param  string|int $value_inputted_for_field_on_model_object could be a string formatted date time or int unixtimestamp
	 * @param  string $timezone                                 optionally include a valid timezone string. If this isn't included then we will default to the website's set timezone_string option.  If that isn't set then we'll default to the server's default time.
	 * @return int                                           unix timestamp (utc)
	 */
	public function prepare_for_set($value_inputted_for_field_on_model_object) {
		return $this->_convert_to_utc_unixtimestamp( $value_inputted_for_field_on_model_object);
	}





	/**
	 * See $_timezone property for description of what the timezone property is for.  This SETS the timezone internally for being able to refernece what timezone we are running conversions on when converting TO the internal timezone (UTC Unix Timestamp) for the object OR when converting FROM the internal timezone (UTC Unix Timestamp).
	 *
	 * @access public
	 * @param string $timezone A valid timezone string as described by @link http://www.php.net/manual/en/timezones.php
	 * @return void
	 */
	public function set_timezone( $timezone ) {
		$timezone = empty( $timezone ) ? $this->_timezone : $timezone;
		self::validate_timezone( $timezone ); //just running validation on the timezone.
		$this->_timezone = $timezone;
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
	 * @param string $format a new date format (ccoresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_date_format( $format ) {
		$this->_date_format = $format;
	}




	/**
	 * set the $_time_format property
	 *
	 * @access public
	 * @param string $format a new time format (ccoresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_time_format( $format ) {
		$this->_time_format = $format;
	}





	/**
	 * set the $_pretty_date_format property
	 *
	 * @access public
	 * @param string $format a new pretty date format (ccoresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_pretty_date_format( $format ) {
		$this->_pretty_date_format = $format;
	}







	/**
	 * set the $_pretty_time_format property
	 *
	 * @access public
	 * @param string $format a new pretty time format (ccoresponding to formats accepted by PHP date() function)
	 * @return void
	 */
	public function set_pretty_time_format( $format ) {
		$this->_pretty_time_format = $format;
	}





	
	/**
	 * Only sets the time portion of the datetime. 
	 * @param string $time_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_time($time_to_set_string, $current_datetime_value ){
		$this->_set_date_obj( date($this->_date_format, $current_datetime_value), 'UTC' );
		return $this->_prepare_for_set_new( $time_to_set_string, TRUE );
	}
	




	/**
	 * Only sets the date portion of the datetime. 
	 * @param string $date_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_date($date_to_set_string, $current_datetime_value ){
		$this->_set_date_obj( date( $this->_date_format  . ' ' . $this->_time_format, $current_datetime_value ), 'UTC' );
		return $this->_prepare_for_set_new( $date_to_set_string );
	}






	/**
	 * This returns the given datetimevalue.
	 * @param  int    $datetimevalue This will always be a unixtimestamp in UTC because that's what the internal datatype of the date time property is.	
	 * @return string                formatted date time for given timezone
	 */
	public function prepare_for_get( $datetimevalue ) {
		$format_string = $this->_date_format . " " . $this->_time_format;
		//send this to our formatter to return localized time for the timezone
		return $this->_convert_to_timezone_from_utc_unix_timestamp( $datetimevalue, $format_string );
	}






	public function prepare_for_prety_echoing( $datetimevalue ) {
		$format_string = $this->_pretty_date_format . " " . $this->_pretty_time_format;
		echo $this->_convert_to_timezone_from_utc_unix_timestamp( $datetimevalue, $format_string );
	}







	/**
	 * Takes an incoming unix timestamp which is assumed to be GMT, converts it to the timezone as exists in the _timezone property and then returns.
	 * @param  int    $dtvalue  unixtimestamp in utc
	 * @param  string $format   format for final date/time string
	 * @return string           final converted date-time-zone.
	 */
	private function _convert_to_timezone_from_utc_unix_timestamp( $dtvalue, $format ) {
		$dtvalue = (int) $dtvalue;
		$datetime = date( $format, $dtvalue );	
		$this->_set_date_obj( $datetime, 'UTC' );
		$this->_date->setTimezone( new DateTimeZone( $this->_timezone ) );
		
		return $this->_date->format( $format );
	}







	/**
	 * This adjusts the current date object to whatever the new time or date should be
	 *
	 * @uses date_parse() to get the parsed date info from the incoming string
	 * @access private
	 * @param  string  $datetimeadjustment The time OR date string that is being adjusted within the current date_time_object
	 * @param  boolean $is_time            If this is a time adjustment set this boolean flag to true, otherwise it is a date adjustment
	 * @return int                         UTC UnixTimestamp
	 */
	private function _prepare_for_set_new( $datetimeadjustment, $is_time = FALSE ) {
		//first let's parse the incoming string
		$parsed = date_parse( $datetimeadjustment );

		//set the timezone to the incoming timezone for the current date_object
		$this->_date->setTimezone( new DateTimeZone( $this->_timezone ) );

		//let's adjust the time or date depending on our $is_time boolean
		if ( $is_time ) {
			$this->_date->setTime( $parsed['hour'], $parsed['minute'] );
		} else {
			$this->_date->setDate( $parsed['year'], $parsed['month'], $parsed['day'] );
		}

		//return to UTC time
		$this->_date->setTimezone( new DateTimeZone( 'UTC' ) );

		//return unix timestamp
		return $this->_date->format('U');
	}






	/**
	 * This simply takes an incoming timestamp and timezone and spits out the unix timestamp for the set timezone ($this->_timezone property).  
	 * @param  string|int $datetime This can be either an integer timestamp (in which case this method will convert from int to string first to make sure we get the right timezone setup )
	 * @return string 		unix timestampe for utc
	 */
	private function _convert_to_utc_unixtimestamp( $datetime ) {

		$timestamp = is_numeric( $datetime ) ? $this->_convert_from_numeric_value_to_utc_unixtimestamp( $datetime ) : $this->_convert_from_string_value_to_utc_unixtimestamp( $datetime );
		return $timestamp;
	}






	private function _convert_from_numeric_value_to_utc_unixtimestamp( $datetime ) {
		$datetime = (int) $datetime;

		date_default_timezone_set( $this->_timezone );
		$datetime = date( 'Y-m-d H:i:s', $datetime );

		//if we don't have a datetime at this point then something has gone wrong 
		if ( !$datetime )
			throw new EE_Error( __('Something went wrong with setting the date/time.  Likely, either there is an invalid timezone string or invalid timestamp being used.', 'event_espresso' ) );

		//return to defautl for PHP
		date_default_timezone_set('UTC');

		//now that we have the string we can send this over to our string value conversion
		return $this->_convert_from_string_value_to_utc_unixtimestamp( $datetime );
	}






	private function _convert_from_string_value_to_utc_unixtimestamp( $datetime ) {
		//create a new datetime object using the given string and timezone
		$this->_set_date_obj( $datetime, $this->_timezone );

		if ( !$this->_date )
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );

		$this->_date->setTimezone( new DateTimeZone('UTC') );
		return $this->_date->format('U');

	}







	/**
	 * This only purpose for this static method is to validate that the incoming timezone is a valid php timezone.
	 *
	 * @static
	 * @access public
	 * @param  string $timezone Timezone string to check
	 * @return bool             Return True if Valid, False if Invalid
	 */	
	public static function validate_timezone( $timezone ) {
		if ( in_array( $timezone, DateTimeZone::listIdentifiers() ) )
			return TRUE;

		else
			throw new EE_Error( sprintf( __('The timezone given (%s), is invalid, please check with %sthis list%s for what valid timezones can be used', 'event_espresso'), $timezone, '<a href="http://www.php.net/manual/en/timezones.php">', '</a>' ) );
	}






	/**
	 * This is used to set the $_date property using the PHP DateTime object for internal calcluations and timezone settings
	 * @param string $datestring Incoming date/time string in an acceptable format
	 * @param string $timezone   Valid Timezone for dates
	 */
	private function _set_date_obj( $datestring, $timezone ) {
		$this->_date = new DateTime( $datestring, new DateTimeZone( $timezone ) );
	}

	
}
