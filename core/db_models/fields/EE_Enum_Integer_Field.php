<?php
require_once( EE_MODELS . 'fields/EE_Integer_Field.php' );
class EE_Enum_Integer_Field extends EE_Integer_Field{
	var $_allowed_enum_values;
	
	/**
	 * 
	 * @param type $table_column
	 * @param type $nicename
	 * @param type $nullable
	 * @param type $default_value
	 * @param array $allowed_enum_values  keys are values to be used in the DB, values are how they should be displayed
	 */
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values){
		$this->_allowed_enum_values = $allowed_enum_values;
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * When setting, just verify that the value being used matches what we've defined as allowable enum values.
	 * If not, throw an error (but if WP_DEBUG is false, just set the value to default)
	 * @param type $value_inputted_for_field_on_model_object
	 * @return type
	 * @throws EE_Error
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if($value_inputted_for_field_on_model_object!==null && !array_key_exists($value_inputted_for_field_on_model_object,$this->_allowed_enum_values)){
			if(WP_DEBUG){
				$msg = sprintf(__("System is assigning imcompatible value '%s' to field '%s'",'event_espresso'),$value_inputted_for_field_on_model_object,$this->_name);
				$msg2 = sprintf(__("Allowed values for '%s' are %s. You provided %s",'event_espresso'),$this->_name,implode(", ",array_keys($this->_allowed_enum_values)),$value_inputted_for_field_on_model_object);
				throw new EE_Error("$msg||$msg2");
			}else{
				return $this->get_default_value();
			}
		}
		return intval($value_inputted_for_field_on_model_object);
	}
	
	/**
	 * Gets the pretty version of the enum's value.
	 * @param int/string $value_on_field_to_be_outputted
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null) {
		return $this->_allowed_enum_values[$value_on_field_to_be_outputted];
	}
}
