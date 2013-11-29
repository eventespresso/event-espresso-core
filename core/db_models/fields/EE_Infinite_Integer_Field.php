<?php
require_once( EE_MODELS . 'fields/EE_Model_Field_Base.php');

/**
 * For storing integers which can assume the value of INFINITY. They're stored in the DB as -1, 
 * but in teh code they're delivered as INF (the constant representing Infinity).
 * Note: this field isn't a good choice if it can acquire the value of -1 through means
 * other than explicitly setting it to INF.
 */
class EE_Infinite_Integer_Field extends EE_Model_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if($value_inputted_for_field_on_model_object == INF){
			return -1;
		}else{
			return intval($value_inputted_for_field_on_model_object);
		}
	}
	function prepare_for_set_from_db($value_inputted_for_field_on_model_object) {
		$intval = intval($value_inputted_for_field_on_model_object);
		if($intval == -1){
			return INF;
		}else{
			return $intval;
		}
	}
}
