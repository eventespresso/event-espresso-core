<?php
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field{
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted,$schema = null){
		EE_Registry::instance()->load_helper( 'Template' );
		if($schema == 'schema_no_currency'){
//			echo "schema no currency!";
			$display_code = false;
		}else{
			$display_code = true;
		}
		$pretty_float = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);
		return EEH_Template::format_currency( $pretty_float, false, $display_code );
	}
	
	/**
	 * Rounds teh float to teh correct number of decimal places for this country's currency.
	 * @param type $value_inputted_for_field_on_model_object
	 * @return float
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		//round to the correctly number of decimal places for this 
		$rounded_value = round($value_inputted_for_field_on_model_object,  EE_Registry::instance()->CFG->currency->dec_plc);
		return parent::prepare_for_set($rounded_value);
	}
	
	function prepare_for_get($value_of_field_on_model_object) {
		$c = EE_Registry::instance()->CFG->currency;
		return round(parent::prepare_for_get($value_of_field_on_model_object), $c->dec_plc);
	}
}