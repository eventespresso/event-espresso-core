<?php
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field{
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted){
		$EE = EE_Registry::instance();
		$pretty_float = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);
		
		if($EE->CFG->currency->sign_b4){
			$pretty_money = $EE->CFG->currency->sign.$pretty_float." (".$EE->CFG->currency->code.")";
		}else{
			$pretty_money = $pretty_float.$EE->CFG->currency->sign." (".$EE->CFG->currency->code.")";
		}
		return $pretty_money;
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
}