<?php
require_once( EE_MODELS . 'fields/EE_Integer_Field.php');
class EE_Boolean_Field extends EE_Integer_Field{
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if ($value_inputted_for_field_on_model_object){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * Make sure we're returning booleans
	 * @param string $value_inputted_for_field_on_model_object
	 * @return boolean
	 */
	function prepare_for_set_from_db($value_inputted_for_field_on_model_object) {
		return intval( $value_inputted_for_field_on_model_object ) ? true : false;
	}
}
