<?php

/**
 * For storing integers which can assume the value of INFINITY. They're stored in the DB as -1, 
 * but in the code they're delivered as INF (the constant representing Infinity).
 * Note: this field isn't a good choice if it can acquire the value of -1 through means
 * other than explicitly setting it to INF.
 * Makes use of constant EE_INF_IN_DB set in espresso.php, and INF, which is a PHP constant definedin the ether
 */
class EE_Infinite_Integer_Field extends EE_Model_Field_Base{
	function get_wpdb_data_type(){
		return '%d';
	}
	function prepare_for_use_in_db($value_of_field_on_model_object) {
		if($value_of_field_on_model_object === INF){
			return EE_INF_IN_DB;
		}else{
			return intval($value_of_field_on_model_object);
		}
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		if($value_inputted_for_field_on_model_object === EE_INF_IN_DB 
				||
				$value_inputted_for_field_on_model_object === INF){
			return INF;
		}else{
			return intval($value_inputted_for_field_on_model_object);
		}
	}
	function prepare_for_set_from_db($value_inputted_for_field_on_model_object) {
		$intval = intval($value_inputted_for_field_on_model_object);
		if($intval == EE_INF_IN_DB){
			return INF;
		}else{
			return $intval;
		}
	}
	
	/**
	 * For outputting this field's value. If you want to output it into an input or something,
	 * use $schema=='input', as it will replace INF with ''. If you want a readable version, use $schema=='text'
	 * as it will replace INF with i18n Infinite
	 * @param type $value_on_field_to_be_outputted
	 * @param string $schema input, symbol, text; or any string you want to show if the value equals INF
	 * @return string
	 */
	function prepare_for_pretty_echoing( $value_on_field_to_be_outputted, $schema = null ) {
		if( $value_on_field_to_be_outputted === INF ){
			switch($schema){
				case 'input':
					return '';
				case 'symbol':
					return "&infin;";
				case 'text':
				case null:
					return __("Unlimited", "event_espresso");
				default:
					return $schema;
			}			
		} else {
			return $value_on_field_to_be_outputted;
		}
	}
}
