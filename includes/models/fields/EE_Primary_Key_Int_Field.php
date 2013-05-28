<?php
require_once('fields/EE_Primary_Key_Field_Base.php');
class EE_Primary_Key_Int_Field extends EE_Primary_Key_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return absint($value_inputted_for_field_on_model_object);
	}
	function is_auto_increment() {
		return true;
	}
}