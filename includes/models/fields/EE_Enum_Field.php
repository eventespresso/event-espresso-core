<?php
require_once('fields/EE_Text_Field_Base.php');
class EE_Enum_Field extends EE_Text_Field_Base{
	var $_allowed_enum_values;
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
		if($value_inputted_for_field_on_model_object!==null && !in_array($value_inputted_for_field_on_model_object,$this->_allowed_enum_values)){
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
}
