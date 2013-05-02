<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
	var $_store_in_db_as_int;
	/**
	 * 
	 * @param type $table_column
	 * @param type $nicename
	 * @param type $nullable
	 * @param type $default_value
	 * @param boolean $store_in_db_as_int. By default, enums are stored as STRINGS in the DB. However, if this var is set to true, it will be stored as an INT
	 * @param array $allowed_enum_values  keys are values to be used in the DB, values are how they should be displayed
	 */
	function __construct($table_column, $nicename, $nullable, $default_value, $allowed_enum_values, $store_in_db_as_int = false){
		$this->_allowed_enum_values = $allowed_enum_values;
		$this->_store_in_db_as_int = $store_in_db_as_int;
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
			$msg2 = sprintf(__("Allowed values for '%s' are %s",'event_espresso'),$fieldSettings->nicename(),$this->_allowed_enum_values);
			throw new EE_Error("$msg||$msg2");
			}else{
				return $this->get_default_value();
			}
		}
		return $value_inputted_for_field_on_model_object;
	}
	
	/**
	 * Gets the pretty version of the enum's value.
	 * @param int/string $value_on_field_to_be_outputted
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted) {
		return $this->_allowed_enum_values[$value_on_field_to_be_outputted];
	}
	
	function get_wpdb_data_type() {
		if( $this->_store_in_db_as_int ){
			return '%d';
		}else{
			return '%s';
		}
	}
}
