<?php

/**
 * The current model has the foreign key pointing to the other model. Eg, Registration belongs to Transaction 
 * (because Registration's TXN_ID field is on Registration, and points to teh Transaction's PK) 
 */
require_once('relations/EE_Model_Relation_Base.php');

class EE_Belongs_To_Relation extends EE_Model_Relation_Base {

	function __construct($extra_join_conditions = null) {
		parent::__construct($extra_join_conditions);
	}

	function get_join_statement() {
		//create the sql string like
		// LEFT JOIN other_table AS table_alias ON this_table_alias.pk = other_table_alias.fk extra_join_conditions
		$this_table_fk_field = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		$other_table_pk_field = $this->get_other_model()->get_primary_key_field();
		$this_table_alias = $this_table_fk_field->get_table_alias();
		$other_table_alias = $other_table_pk_field->get_table_alias();
		$other_table = $this->get_other_model()->get_table_for_alias($other_table_alias);
		return $this->_left_join($other_table, $other_table_alias, $other_table_pk_field->get_table_column(), $this_table_alias, $this_table_fk_field->get_table_column(), $this->_extra_join_conditions) . $this->get_other_model()->_construct_internal_join_to_table_with_alias($other_table_alias);
	}

	/**
	 * Sets this model object's foreign key to the other model object's primary key. Feel free to do this manually if you like.
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return EE_Base_Class
	 */
	function add_relation_to($this_obj_or_id, $other_obj_or_id) {
		$this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		$other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id, true);
		//find the field on th eother model which is a foreign key to this model
		$fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		//set that field on the other model to this model's ID
		$this_model_obj->set($fk_on_this_model->get_name(), $other_model_obj->ID());
		$this_model_obj->save();
		return $other_model_obj;
	}

	/**
	 * Sets the this model object's foreign key to its default, instead of pointing to the other model object
	 * @param EE_Base_Class/int $this_obj_or_id
	 * @param EE_Base_Class/int $other_obj_or_id
	 * @return void
	 */
	function remove_relation_to($this_obj_or_id, $other_obj_or_id) {
		$this_model_obj = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
		//find the field on th eother model which is a foreign key to this model
		$fk_on_this_model = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		//set that field on the other model to this model's ID
		$this_model_obj->set($fk_on_this_model->get_name(), null, true);
		$this_model_obj->save();
		
	}

	/**
	 * Overrides parent so that we don't NEED to save teh $model_object before getting the related objcets.
	 * @param EE_Base_Class $model_object
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @param boolean $values_already_prepared_by_model_object
	 * @return EE_Base_Class[]
	 */
	public function get_all_related($model_object, $query_params = array(), $values_already_prepared_by_model_object = false) {
		//get column on this model object which is a foreign key to the other model
		$fk_field_obj = $this->get_this_model()->get_foreign_key_to($this->get_other_model()->get_this_model_name());
		//get its value
		$ID_value_on_other_model = $model_object->get($fk_field_obj->get_name());
		//get all where their PK matches that value
		$query_params[0][$this->get_other_model()->get_primary_key_field()->get_name()] = $ID_value_on_other_model;
//		echo '$query_params';
//		var_dump($query_params);
		return $this->get_other_model()->get_all($query_params, $values_already_prepared_by_model_object);
	}

}
