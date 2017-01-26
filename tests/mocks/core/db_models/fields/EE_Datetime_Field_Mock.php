<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Datetime_Field_Mock
 *
 * A mock class for the EE_Datetime_Field to help with tests.
 *
 * @package		Event Espresso
 * @subpackage	mocks
 * @author		Darren Ethier
 * @since 4.6
 * @group core/db_fields
 */
class EE_Datetime_Field_Mock extends EE_Datetime_Field {

	public function __construct( $table_column, $nice_name, $nullable, $default_value, $timezone = NULL, $date_format = NULL, $time_format = NULL, $pretty_date_format = NULL, $pretty_time_format = NULL ) {
		parent::__construct( $table_column, $nice_name, $nullable, $default_value, $timezone, $date_format, $time_format, $pretty_date_format, $pretty_time_format );
	}



	public function get_property( $field ) {
		return $this->{$field};
	}


	public function set_nullable() {
		$this->_nullable = true;
	}


	public function prepare_for_display( $DateTime, $schema = false ) {
		return $this->_prepare_for_display( $DateTime, $schema );
	}



	public function get_date_object( $date_string ) {
		return parent::_get_date_object( $date_string );
	}



}
