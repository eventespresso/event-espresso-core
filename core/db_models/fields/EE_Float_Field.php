<?php
require_once('EE_Model_Field_Base.php');
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Float_Field extends EE_Model_Field_Base{
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		return floatval( preg_replace( "/^[^0-9\.]-/", "", preg_replace( "/,/", ".", $value_inputted_for_field_on_model_object ) ));
	}
	/**
	 * Returns the number formatted according to local custom (set by teh country of the blog).
	 * @param float $value_on_field_to_be_outputted
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted,$schema = null){
		$EE = EE_Registry::instance();
		return number_format( $value_on_field_to_be_outputted, max(array(2, $EE->CFG->currency->dec_plc)), $EE->CFG->currency->dec_mrk, $EE->CFG->currency->thsnds) ;
	
	}
	
}