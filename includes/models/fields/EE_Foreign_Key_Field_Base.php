<?php
require_once( EE_MODELS . 'fields/EE_Model_Field_Base.php');
abstract class EE_Foreign_Key_Field_Base extends EE_Model_Field_Base{
	/**
	 * Usually the name of a single model. However, as in teh case for custom post types,
	 * it can actually be an array of models
	 * @var string or array
	 */
	protected $_model_name;
	/**
	 * 
	 * @param string $table_column name fo column for field
	 * @param string $nicename should eb internationalized with __('blah','event_espresso')
	 * @param boolean $nullable
	 * @param mixed $default_value if this is a integer field, it shoudl be an int. if it's a string field, it shoul dbe a string
	 * @param string $model_name eg 'Event','Answer','Term', etc. Basically its the model class's name without the "EEM_"
	 */
	function __construct($table_column, $nicename, $nullable, $default_value,$model_name){
		$this->_model_name = $model_name;
		parent::__construct($table_column, $nicename, $nullable, $default_value);	
	}
	/**
	 * Returns the name of the model(s) pointed to
	 * @return mixed string or array of strings 
	 */
	function get_model_name_pointed_to(){
		return $this->_model_name;
	}
}
