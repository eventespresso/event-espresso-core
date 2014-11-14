<?php


/*The OTHER model has the foreign key pointing to the THIS model, but the foreign key can point to ANY model object (roughly any table)
 * specified on the field. Note: Also requires the other model to have a field of type EE_Any_Foreign_Model_Name_Field,
 * in order to specify which model the foreign key points to (eg, the foreign key may have a value of 34, but is that Transaction with
 * ID 34 or Registration with ID 34? The EE_Any_Foreign_Model_name_Field specifies which of the two). 
 * 
 */
require_once( EE_MODELS . 'relations/EE_Model_Relation_Base.php');
class EE_Has_Many_Any_Relation extends EE_Has_Many_Relation{	
	
	function get_join_statement(){
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_pk_field = $this->get_this_model()->get_primary_key_field();
		$other_table_fk_field = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		$pk_table_alias = $this_table_pk_field->get_table_alias();
		$fk_table_alias = $other_table_fk_field->get_table_alias();
		$fk_table = $this->get_other_model()->get_table_for_alias($fk_table_alias);
		$field_with_model_name = $this->get_other_model()->get_field_containing_related_model_name();
		
		return $this->_left_join($fk_table, 
				$fk_table_alias, 
				$other_table_fk_field->get_table_column(), 
				$pk_table_alias, 
				$this_table_pk_field->get_table_column(),
				$field_with_model_name->get_qualified_column()."='".$this->get_this_model()->get_this_model_name()."'")
				.$this->get_other_model()->_construct_internal_join_to_table_with_alias($fk_table_alias);
	}
	/**
	 * Sets the other model object's foreign key to this model object's primary key. Feel free to do this manually if you like.
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return EE_Base_Class
	 */
	 function add_relation_to($this_obj_or_id, $other_obj_or_id ){
		 $this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(), $this_model_obj->ID());
		 $other_model_obj->set($this->get_other_model()->get_field_containing_related_model_name()->get_name(), $this->get_this_model()->get_this_model_name());
		 $other_model_obj->save();
		 return $other_model_obj;
	 }
	/**
	 * Sets the other model object's foreign key to its default, instead of pointing to this model object.
	 * If $other_obj_or_id doesn't have any other relations, this function is essentially orphaning it
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return EE_Base_Class
	 */
	 function remove_relation_to($this_obj_or_id, $other_obj_or_id){
		 $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		 //find the field on th eother model which is a foreign key to this model
		 $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
		 //set that field on the other model to this model's ID
		 $other_model_obj->set($fk_field_on_other_model->get_name(),null, true);
		 $other_model_obj->set($this->get_other_model()->get_field_containing_related_model_name()->get_name(), null, true);
		 $other_model_obj->save();
		 return $other_model_obj;
	 }
}
