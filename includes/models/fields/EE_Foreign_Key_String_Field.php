<?php
require_once( EE_MODELS . 'fields/EE_Foreign_Key_Field_Base.php');
class EE_Foreign_Key_String_Field extends EE_Foreign_Key_Field_Base{
	function get_wpdb_data_type(){
		return '%s';
	}
	/**
	 * removes all tags when setting
	 * @param string $value_inputted_for_field_on_model_object
	 * @return string
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		$model_classname = $this->get_model_class_name_pointed_to();
		if($value_inputted_for_field_on_model_object instanceof $model_classname){
			$value_inputted_for_field_on_model_object = $value_inputted_for_field_on_model_object->ID();
		}
		return strtoupper(wp_strip_all_tags($value_inputted_for_field_on_model_object));
	}
}