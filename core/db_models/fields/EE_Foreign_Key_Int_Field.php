<?php
require_once( EE_MODELS . 'fields/EE_Foreign_Key_Field_Base.php');
class EE_Foreign_Key_Int_Field extends EE_Foreign_Key_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	/**
	 * 
	 * @param int|EE_Base_Class $value_inputted_for_field_on_model_object
	 * @return int
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if($this->is_model_obj_of_type_pointed_to($value_inputted_for_field_on_model_object)){
			$value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
		}
		return absint($value_inputted_for_field_on_model_object);
	}
	function prepare_for_set_from_db($value_found_in_db_for_model_object) {
		return intval($value_found_in_db_for_model_object);
	}
}