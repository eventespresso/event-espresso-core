<?php

/**
 * Model Relation classes are for defining relationships between models, and facilitating JOINs
 * between them during querying. They require knowing at least the model names of the two models
 * they join, and require each to have proper Private and Foreign key fields setup. (HABTM are different)
 * Once those two models are setup correctly, and the relation object has the names of each, it can
 * magically figure out what tables must be joined on what fields during querying.
 */
abstract class EE_Model_Relation_Base{
	/**
	 * The model name of which this relation is a component (ie, the model taht called new EE_Model_Relation_Base)
	 * @var string eg Event, Question_Group, Registration
	 */
	private $_this_model_name;
	/**
	 * The model name pointed to by this relation (ie, the model we want to establish a relationship to)
	 * @var string eg Event, Question_Group, Registration
	 */
	private $_other_model_name;
	/**
	 * Any extra SQL that we'd like to add when joining to the other model. Eg " AND Event.post_type = 'monkey'"
	 * @var string 
	 */
	protected $_extra_join_conditions;
	function __construct($extra_join_conditions){
		$this->_extra_join_conditions=$extra_join_conditions;
	}
	function _construct_finalize_set_models($this_model_name, $other_model_name){
		$this->_this_model_name = $this_model_name;
		$this->_other_model_name = $other_model_name;
	}
	/**
	 * 
	 * @return EEM_Base
	 */
	function get_this_model(){
		return $this->_get_model($this->_this_model_name);
	}
	/**
	 * 
	 * @return EEM_Base
	 */
	function get_other_model(){
		return $this->_get_model($this->_other_model_name);
	}
	/**
	 * 
	 * @param string $model_name like Event, Question_Group, etc. omit the EEM_
	 * @return EEMerimental_Base
	 */
	protected function _get_model($model_name){
		$modelInstance=call_user_func("EEM_".$model_name."::instance");
		return $modelInstance;
	}
	
	
	protected function _left_join($other_table,$other_table_alias,$other_table_column,$this_table_alias,$this_table_join_column, $extra_join_sql = ''){
		return " LEFT JOIN ".$other_table." AS ".$other_table_alias. " ON ".$other_table_alias.".".$other_table_column."=".$this_table_alias.".".$this_table_join_column." ".$extra_join_sql." ";
	}
	/**
	 * Gets the SQL string for performing the join between this model and the other model.
	 * @return string of SQL, eg "LEFT JOIN table_name AS table_alias ON this_model_primary_table.pk = other_model_primary_table.fk" etc
	 */
	abstract function get_join_statement();
	
	
	/**
	 * Adds a reltionships between the two model objects provided. Each type of relationship handles this differently (EE_Belongs_To is a 
	 * slight exception, it should more accurately be called set_relation_to(...), as this relationship only allows this model to be related
	 * to a signel other model of this type)
	 */
	abstract function add_relation_to($this_obj_or_id, $other_obj_or_id);
	/**
	 * Similar to 'add_relation_to(...)', performs the opposite action of removing the relationship between the two model objects
	 */
	abstract function remove_relation_to($this_obj_or_id, $other_obj_or_id);
}