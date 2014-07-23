<?php
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field{
	function get_wpdb_data_type(){
		return '%f';
	}
	/**
	 * Schemas: 
	 *	'localized_float': "3,023.00"
	 *	'no_currency_code': "$3,023.00"
	 *	null: "$3,023.00<span>USD</span>"
	 * @param type $value_on_field_to_be_outputted
	 * @param type $schema
	 * @return string
	 */
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted,$schema = null){
		$pretty_float = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);

		if($schema == 'localized_float'){
			return $pretty_float;
		}
		EE_Registry::instance()->load_helper( 'Template' );
		if($schema == 'no_currency_code'){
//			echo "schema no currency!";
			$display_code = false;
		}else{
			$display_code = true;
		}
		//we don't use the $pretty_float because format_currency will take care of it.
		return EEH_Template::format_currency( $value_on_field_to_be_outputted, false, $display_code );
	}
	
	/**
	 * If provided witha string, strips out money-related formatting to turn it into a proper float.
	 * Rounds the float to the correct number of decimal places for this country's currency.
	 * @param type $value_inputted_for_field_on_model_object
	 * @return float
	 */
	function prepare_for_set($value_inputted_for_field_on_model_object) {
		//remove any currencies etc.
//		if(is_string($value_inputted_for_field_on_model_object)){
//			$value_inputted_for_field_on_model_object = preg_replace("/[^0-9,.]/", "", $value_inputted_for_field_on_model_object);
//		}
		//now it's a float-style string or number
		$float_val = parent::prepare_for_set($value_inputted_for_field_on_model_object);
		//round to the correctly number of decimal places for this  currency
		$rounded_value = round($float_val,  EE_Registry::instance()->CFG->currency->dec_plc);
		return $rounded_value;
	}
	
	function prepare_for_get($value_of_field_on_model_object) {
		$c = EE_Registry::instance()->CFG->currency;
		return round(parent::prepare_for_get($value_of_field_on_model_object), $c->dec_plc);
	}
}