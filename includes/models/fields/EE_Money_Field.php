<?php
require_once('EE_Float_Field_Base.php');
/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	function get_wpdb_data_type(){
		return '%f';
	}
	function prepare_for_pretty_echoing($value_on_field_to_be_outputted){
		return "$".parent::prepare_for_get($value_on_field_to_be_outputted);
	}
}