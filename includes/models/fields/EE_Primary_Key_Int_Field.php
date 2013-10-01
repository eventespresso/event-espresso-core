<?php
require_once( EE_MODELS . 'fields/EE_Primary_Key_Field_Base.php');
class EE_Primary_Key_Int_Field extends EE_Primary_Key_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		$model_classname = $this->get_model_class_name_pointed_to();
		if($value_inputted_for_field_on_model_object instanceof $model_classname){
			$value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
		}
		return absint($value_inputted_for_field_on_model_object);
	}
	function prepare_for_set_from_db($value_found_in_db_for_model_object) {
		return intval($value_found_in_db_for_model_object);
	}
	function is_auto_increment() {
		return true;
	}
}