<?php


/**
 * In this relation, the OTHER model ahs the foreign key pointing to this model
 */
require_once('relations/EE_Model_Relation_Base.php');
class EE_Has_Many_Relation extends EE_Model_Relation_Base{	
	function __construct($extra_join_conditions = null){
		parent::__construct($extra_join_conditions);
	}
	function get_join_statement(){
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_pk_field = $this->get_this_model()->get_primary_key_field();
		$other_table_fk_field = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$pk_table_alias = $this_table_pk_field->get_table_alias();
		$fk_table_alias = $other_table_fk_field->get_table_alias();
		$fk_table = $this->get_other_model()->get_table_for_alias($fk_table_alias);
		
		return $this->_left_join($fk_table, $fk_table_alias, $other_table_fk_field->get_table_column(), $pk_table_alias, $this_table_pk_field->get_table_column(), $this->_extra_join_conditions);
	}
	/**
	 * Sets the other model object's foreign key to this model object's primary key. Feel free to do this manually if you like.
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(), $this_model_obj->ID());
		 $other_model_obj->save();
	 }
	/**
	 * Sets the other model object's foreign key to its default, instead of pointing to this model object
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(),null, true);
		 $other_model_obj->save();
	 }
}