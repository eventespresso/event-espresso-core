<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once( EE_MODELS . 'fields/EE_Integer_Field.php' );
/**
 * Class EE_Enum_Integer_Field
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Mike Nelson
 *
 */
class EE_Enum_Integer_Field extends EE_Integer_Field{

	var $_allowed_enum_values;

	/**
	 *
	 * @param string $table_column
	 * @param string $nicename
	 * @param boolean $nullable
	 * @param int $default_value
	 * @param array $allowed_enum_values  keys are values to be used in the DB, values are how they should be displayed
	 */
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * When setting, just verify that the value being used matches what we've defined as allowable enum values.
	 * If not, throw an error (but if WP_DEBUG is false, just set the value to default)
	 * @param int $value_inputted_for_field_on_model_object
	 * @return int
	 * @throws EE_Error
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if( $value_inputted_for_field_on_model_object !== NULL && ! array_key_exists( $value_inputted_for_field_on_model_object, $this->_allowed_enum_values )){
			if( defined( 'WP_DEBUG' ) && WP_DEBUG ){
				$msg = sprintf(
					__('System is assigning incompatible value "%1$s" to field "%2$s"','event_espresso'),
					$value_inputted_for_field_on_model_object,
					$this->_name
				);
				$msg2 = sprintf(
					__('Allowed values for "%1$s" are "%2$s". You provided "%3$s"','event_espresso'),
					$this->_name,
					implode( ', ', array_keys( $this->_allowed_enum_values )),
					$value_inputted_for_field_on_model_object
				);
				 EE_Error::add_error("$msg||$msg2", __FILE__, __FUNCTION__, __LINE__ );
			}
			return $this->get_default_value();

		}
		return intval($value_inputted_for_field_on_model_object);
	}



	/**
	 * Gets the pretty version of the enum's value.
	 *
	 * @param int | string $value_on_field_to_be_outputted
	 * @param null         $schema
	 * @return string
	 */
	function prepare_for_pretty_echoing( $value_on_field_to_be_outputted, $schema = NULL ) {
		return $this->_allowed_enum_values[$value_on_field_to_be_outputted];
	}
}
