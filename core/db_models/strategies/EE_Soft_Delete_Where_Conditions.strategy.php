<?php

/*
 * Strategy specifically for adding where conditions specific to CPT models.
 */
class EE_Soft_Delete_Where_Conditions extends EE_Default_Where_Conditions{
	/**
	 * Strategy for setting default soft delete where conditions. This strategy will find
	 * the field of type 'EE_Trashed_Flag_Field', and add a condition that it be FALSE on all queries involving
	 * the model. 
	 * If you want to override these default where conditions, you may explicitly in the query you send to the model.
	 * Eg, 
	 * 
	 */
	function __construct(){}
	/**
	 * Gets the where default where conditions for a custom post type model
	 * @param string $model_relation_path. Eg, from Event to Payment, this should be "Registration.Transaction.Payment"
	 * @return array like EEM_Base::get_all's $query_params's index [0] (where conditions)
	 */
	function get_default_where_conditions($model_relation_chain = null){
		//make sure there's a period at the end of $model_relation_chain
		if($model_relation_chain != '' && $model_relation_chain[strlen($model_relation_chain)-1] !='.'){
			$model_relation_chain=$model_relation_chain.".";
		}
		
		$trashed_field_name = $this->deleted_field_name();
		return array(
			$model_relation_chain.$trashed_field_name => false,
		);
	}
	/**
	 * Searches for field on the model of type 'deleted_flag'. if it is found,
	 * returns it's name.
	 * @return string
	 * @throws EE_Error
	 */
	private function deleted_field_name(){
		$field = $this->_model->get_a_field_of_type('EE_Trashed_Flag_Field');
		if($field){
			return $field->get_name();
		}else{
			throw new EE_Error(sprintf(__('We are trying to find the deleted flag field on %s, but none was found. Are you sure there is a field of type EE_Trashed_Flag_Field in %s constructor?','event_espresso'),get_class($this),get_class($this)));
		}
	}
}