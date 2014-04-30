<?php
/**
 * Parent field class for any fields which accept a parameter of a model name. 
Originally this was just foreign keys, but EE_Any_Foreign_Model_name_Field (which works
 * with the EE_Foreign_Key_Field to create a relation between any two models)
 * also required basically the exact same functionality, except NOT be a foreign key.
 */
abstract class EE_Field_With_Model_Name extends EE_Model_Field_Base{
	/**
	 * Usually the name of a single model. However, as in the case for custom post types,
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
	/**
	 * Returns the model's classname (eg EE_Event instead of just Event)
	 * @return array
	 */
	function get_model_class_names_pointed_to(){
		$model_names = array();
		if(is_array($this->_model_name)){
			foreach($this->_model_name as $model_name){
				$model_names[] = "EE_".$model_name;
			}
		}else{
			$model_names = array("EE_".$this->_model_name);
		}
		return $model_names;
	}
	
	function is_model_obj_of_type_pointed_to($model_obj_or_ID){
		foreach($this->get_model_class_names_pointed_to() as $model_obj_classname){
			if($model_obj_or_ID instanceof $model_obj_classname){
				return true;
			}
		}
		return false;
	}
}
