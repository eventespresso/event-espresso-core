<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
require_once('fields/EE_Integer_Field.php');
/**
 * EE_Datetime fields do quite a bit of type juggling. Client-code is assumed to be strings that
 * strtotime can understand (see http://www.php.net/manual/en/datetime.formats.php), they are then internally stored as 
 */
class EE_Datetime_Field extends EE_Integer_Field{
	protected $_date_format;
	protected $_time_format;
	function __construct($table_column, $nicename, $nullable, $default_value, $date_format = 'F j, Y', $time_format ='g:i a'){
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
	function prepare_for_get($value_of_field_on_model_object, $date_time_format = null) {
		if( ! $date_time_format){
			$date_time_format = '';
			if($this->_date_format){
				$date_time_format = $this->_date_format;
			}
			if($this->_time_format){
				$date_time_format.= " ".$this->_time_format;
			}
		}
		return date_i18n($date_time_format, $value_of_field_on_model_object);
	}
	
	function prepare_for_get_date_only($value_of_field_on_model_object, $date_format = null){
		if( ! $date_format ){
			$date_format = $this->_date_format;
		}
		return date_i18n($date_format, $value_of_field_on_model_object);
	}
	
	function prepare_for_get_time_only($value_of_field_on_model_object, $time_format = null){
		if( ! $time_format ){
			$time_format = $this->_time_format;
		}
		return date_i18n($time_format, $value_of_field_on_model_object);
	}
	
	
		return $this->_convert_to_utc_unixtimestamp( $value_inputted_for_field_on_model_object, $timezone );
	}



	
	/**
	 * Only sets the time portion of the datetime. 
	 * @param string $time_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	function prepare_for_set_with_new_time($time_to_set_string, $current_datetime_value, $timezone = 'UTC' ){
		$_to_set = array(
			'time' => $time_to_set_string,
			'date' => $current_date_time_value
			);

		return $this->_prepare_for_set_new( $_to_set, $timezone );
	}
	
	/**
	 * Only sets the date portion of the datetime. 
	 * @param string $date_to_set_string like 8am, 
	 * @param int $current_datetime_value current value of the datetime field (timestamp)
	 * @return int updated timestamp
	 */
	function prepare_for_set_with_new_date($date_to_set_string, $current_datetime_value, $timezone = 'UTC' ){
		$_to_set = array(
			'time' => $current_datetime_value,
			'date' => $date_to_set_string
			);
		return $this->_prepare_for_set_new( $_to_set, $timezone );
	}


	private function _prepare_for_set_new( $datetimearray, $timezone ) {
		foreach ( $datetimearray as $type => $value ) {
			$format = '_' . $type . '_format';
			$datetimearray[$type] = empty( $value ) ? date( $this->{$format} ) : date( $this->{$format}, $value );
		}
		return $this->prepare_for_set( $datetimearray['date']. " ".$datetimearray['time'], $timezone );
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

		$timestamp = is_numeric( $datetime ) ? $this->_convert_from_numeric_value_to_utc_unixtimestamp( $datetime, $tz ) : $this->_convert_from_string_value_to_utc_unixtimestamp( $datetime, $timezone );
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
		$date = new DateTime( $datetime, new DateTimeZone( $timezone ) );

		if ( !$date )
			throw new EE_Error( __('Something went wrong with setting the date/time. Likely, either there is an invalid datetime string or an invalid timezone string being used.', 'event_espresso' ) );

		$date->setTimezone( new DateTimeZone('UTC') );
		return $date->format('U');

	}

	//todo prepare_for_gets and make sure the prepare_for_db_set is done correctly.
}
