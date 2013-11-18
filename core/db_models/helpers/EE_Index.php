<?php

/**
 * Parent class for indicating indexes on models. As of writing this, it is only used
 * when deleting model objects that have no primary key, but clearly this can be expanded
 */
class EE_Index{
	protected $_name;
	protected $_field_names;
	protected $_model_name;
	public function __construct($fields){
		$this->_field_names = $fields;
	}
	public function _construct_finalize($name,$model_name){
		$this->_name = $name;
		$this->_model_name = $model_name;
	}
	public function field_names(){
		return $this->_field_names;
	}
	/**
	 * Internally used by get_this_model() and get_other_model()
	 * @param string $model_name like Event, Question_Group, etc. omit the EEM_
	 * @return EEM_Base
	 */
	protected function _get_model($model_name){
		$modelInstance=call_user_func("EEM_".$model_name."::instance");
		return $modelInstance;
	}
	/**
	 * Gets all the fields for this index
	 * @return EE_Model_Field_Base[]
	 */
	public function fields(){
		$fields = array();
		$model = $this->_get_model($this->_model_name);
		foreach($model->field_settings() as $field_name => $field_obj){
			if(in_array($field_name,$this->field_names())){
				$fields[$field_name] = $field_obj;
			}
		}
		return $fields;
	}
	
}
