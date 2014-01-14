<?php

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Integer_Field extends EE_Model_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return intval($value_inputted_for_field_on_model_object);
	}
	function prepare_for_set_from_db($value_inputted_for_field_on_model_object) {
		return intval($value_inputted_for_field_on_model_object);
	}
}
