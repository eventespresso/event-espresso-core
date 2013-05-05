<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
require_once('fields/EE_Integer_Field.php');
class EE_Datetime_Field extends EE_Integer_Field{
	protected $_date_format;
	protected $_time_format;

	/**
	 * This is used for holding the date objects set internally when doing date calculations/changes
	 * @var object
	 */
	private $_date;


	
	public function __construct($table_column, $nicename, $nullable, $default_value, $date_format = 'F j, Y', $time_format ='g:i a'){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
		$this->_date_format = $date_format;
		$this->_time_format = $time_format;
	}
	

	/**
	 * this prepares any incoming date data and make sure its converted to a utc unix timestamp
	 * @param  string|int $value_inputted_for_field_on_model_object could be a string formatted date time or int unixtimestamp
	 * @param  string $timezone                                 optionally include a valid timezone string. If this isn't included then we will default to the website's set timezone_string option.  If that isn't set then we'll default to the server's default time.
	 * @return int                                           unix timestamp (utc)
	 */
	public function prepare_for_set($value_inputted_for_field_on_model_object, $timezone = NULL) {
		return $this->_convert_to_utc_unixtimestamp( $value_inputted_for_field_on_model_object, $timezone );
	}





	
	/**
	 * Only sets the time portion of the datetime. 
	 * @param string $time_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_time($time_to_set_string, $current_datetime_value, $timezone = 'UTC' ){
		//todo: This is WRONG and won't work because we are dealing with two unixtime strings and we want to make sure that we end up with just ONE.
		$this->_set_date_obj( date($this->_date_format, $current_datetime_value), 'UTC' );
		return $this->_prepare_for_set_new( $time_to_set_string, $timezone, TRUE );
	}
	
	/**
	 * Only sets the date portion of the datetime. 
	 * @param string $date_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	public function prepare_for_set_with_new_date($date_to_set_string, $current_datetime_value, $timezone = 'UTC' ){
		$this->_set_date_obj( date( $this->_date_format  . ' ' . $this->_time_format, $current_datetime_value ), 'UTC' );
		return $this->_prepare_for_set_new( $date_to_set_string, $timezone );
	}


	/**
	 * This returns the given datetimevalue.
	 * @param  int    $datetimevalue This will always be a unixtimestamp in UTC because that's what the internal datatype of the date time property is.	
	 * @param  string $format        Any accepted format string for date/times
	 * @param  string $timezone      any accepted formatted timezones as per http://www.php.net/manual/en/timezones.php  If this isn't present then we default to use whatever the current_websites set timezone is.
	 * @return string                formatted date time for given timezone
	 */
	public function prepare_for_get( $datetimevalue, $format = NULL, $timezone = NULL ) {
		$format_string = empty( $format ) ? $this->_date_format . " " . $this->_time_format : $format;
		//send this to our formatter to return localized time for the timezone
		return $this->_convert_to_timezone_from_utc_unix_timestamp( $datetimevalue, $format_string, $timezone );
	}


	public function prepare_for_prety_echoing( $datetimevalue, $format = NULL, $timezone = NULL ) {
		echo $this->prepare_for_get( $datetimevalue, $format, $timezone );
	}



	/**
	 * Takes an incoming unix timestamp which is assumed to be GMT, converts it to the timezone (or if null the given timezone saved in WordPress options), then uses the WordPress date_i18n() function to return the localized time if present.
	 * @param  int    $dtvalue  unixtimestamp in utc
	 * @param  string $format   format for final date/time string
	 * @param  string $timezone Timezone to convert to
	 * @return string           final converted date-time-zone.
	 */
	private function _convert_to_timezone_from_utc_unix_timestamp( $dtvalue, $format, $timezone ) {
		$dtvalue = (int) $dtvalue;
		$datetime = date( $format, $dtvalue );	
		$this->_set_date_obj( $datetime, 'UTC' );
		$timezone = empty( $timezone ) ? get_option( 'timezone_string' ) : $timezone;
		$this->_date->setTimezone( new DateTimeZone( $timezone ) );
		
		return $this->_date->format( $format );
	}







	/**
	 * This adjusts the current date object to whatever the new time or date should be
	 *
	 * @uses date_parse() to get the parsed date info from the incoming string
	 * @access private
	 * @param  string  $datetimeadjustment The time OR date string that is being adjusted within the current date_time_object
	 * @param  string  $timezone           The timezone of the incoming datetimeadjustment string
	 * @param  boolean $is_time            If this is a time adjustment set this boolean flag to true, otherwise it is a date adjustment
	 * @return int                         UTC UnixTimestamp
	 */
	private function _prepare_for_set_new( $datetimeadjustment, $timezone, $is_time = FALSE ) {
		//first let's parse the incoming string
		$parsed = date_parse( $datetimeadjustment );

		$timezone = empty( $timezone ) ? get_option( 'timezone_string' ) : $timezone;

		//set the timezone to the incoming timezone for the current date_object
		$this->_date->setTimezone( new DateTimeZone( $timezone ) );

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
	 * This simply takes an incoming timestamp and timezone and spits out the unix timestamp for the given timezone.  If timezone IS not included then we attempt to set the time via the websites set timezone (get_option('timezone_string']) ) If THAT isn't set then we just use the default timezone set fro the blog as the assumed base time.	
	 * @param  string|int $datetime This can be either an integer timestamp (in which case this method will convert from int to string first to make sure we get the right timezone setup )
	 * @param  string $timezone any accepted formatted timezones as per http://www.php.net/manual/en/timezones.php
	 * @return string 		unix timestampe for utc
	 */
	private function _convert_to_utc_unixtimestamp( $datetime, $timezone = NULL ) {

		//if timezone is still empty after this then whatever the current set php timezone is (date_default_timezone_set) is what is assumed as the timezone.
		$tz = !empty( $timezone ) ? $timezone : get_option( 'timezone_string' );

		$timestamp = is_numeric( $datetime ) ? $this->_convert_from_numeric_value_to_utc_unixtimestamp( $datetime, $tz ) : $this->_convert_from_string_value_to_utc_unixtimestamp( $datetime, $tz );
		return $timestamp;
	}


	private function _convert_from_numeric_value_to_utc_unixtimestamp( $datetime, $timezone ) {
		$datetime = (int) $datetime;

		date_default_timezone_set( $timezone );
		$datetime = date( 'Y-m-d H:i:s', $datetime );

		//if we don't have a datetime at this point then something has gone wrong 
		if ( !$datetime )
			throw new EE_Error( __('Something went wrong with setting the date/time.  Likely, either there is an invalid timezone string or invalid timestamp being used.', 'event_espresso' ) );

		//return to defautl for PHP
		date_default_timezone_set('UTC');

		//now that we have the string we can send this over to our string value conversion
		return $this->_convert_from_string_value_to_utc_unixtimestamp( $datetime, $timezone );
	}


	private function _convert_from_string_value_to_utc_unixtimestamp( $datetime, $timezone ) {
		//create a new datetime object using the given string and timezone
		$this->_set_date_obj( $datetime, $timezone );
		
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
