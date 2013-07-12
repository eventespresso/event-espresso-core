<?php
require_once('EE_Float_Field_Base.php');
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field_Base{
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted){
		$EE = EE_Registry::instance();
		$pretty_float = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);
		
		if($EE->CFG->currency_sign_b4){
			$pretty_money = $EE->CFG->currency_sign.$pretty_float." (".$EE->CFG->currency_code.")";
		}else{
			$pretty_money = $pretty_float.$EE->CFG->currency_sign." (".$EE->CFG->currency_code.")";
		}
		return $pretty_money;
	}
}