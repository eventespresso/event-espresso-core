<?php


/**
 * Serialized text field should basically: accept either an array or serialized text as input.
 * When initally set by client code (ie, not EEMerimental_Base or children), the value should remain an array.
 * However, when inserting into the DB, it should be serialized.
 * Upon retrieval from the DB, it should be unserialized back into an array.
 */
require_once('fields/EE_Text_Field_Base.php');
class EE_Serialized_Text_Field extends EE_Text_Field_Base{
	function __construct($table_column, $nicename, $nullable, $default_value){
		parent::__construct($table_column, $nicename, $nullable, $default_value);
	}
	/**
	 * Value SHOULD be an array, and we want to now convert it to a serialized string
	 * @param array $value_of_field_on_model_object
	 * @return string
	 */
	function prepare_for_use_in_db($value_of_field_on_model_object) {
		return maybe_serialize($value_of_field_on_model_object);
	}
	/**
	 * Value provided should definetely be a serialized string. We should unserialize into an array
	 * @param string $value_found_in_db_for_model_object
	 * @return array
	 */
	function prepare_for_set_from_db($value_found_in_db_for_model_object) {
		return maybe_unserialize($value_found_in_db_for_model_object);
	}
}
