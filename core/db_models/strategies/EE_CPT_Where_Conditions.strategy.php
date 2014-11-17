<?php

/*
 * Strategy specifically for adding where conditions specific to CPT models.
 */
class EE_CPT_Where_Conditions extends EE_Default_Where_Conditions{
	
	protected $_post_type;
	protected $_meta_field;
	function __construct($post_type, $meta_field_to_chk){
		$this->_post_type = $post_type;
		$this->_meta_field = $meta_field_to_chk;
	}
	/**
	 * Gets the field with the specified column. Note, this function might not work
	 * properly if two fields refer to columns with the same name on different tables
	 * @param string $column column name
	 * @return EE_Model_Field_Base
	 */
	protected function _get_field_on_column($column){
		$all_fields = $this->_model->field_settings(true);
		foreach($all_fields as $field_name => $field_obj){
			if($column == $field_obj->get_table_column()){
				return $field_obj;
			}
		}
	}
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
		
		//find post_type field
		$post_type_field = $this->_get_field_on_column('post_type');
		$status_field = $this->_get_field_on_column('post_status');
		$post_type_field_name = $model_relation_chain.$post_type_field->get_name();
		$status_field_name = $model_relation_chain.$status_field->get_name();
//		$or_param_name = 'OR*'.get_class($this->_model);
//		$and_param_name = 'AND';
//		$default_where_conditions = array(
//			$or_param_name=>array(
//				$and_param_name=>array( 
//					$model_relation_chain.$this->_meta_field => array( 'IS NOT NULL')
//				),
//				$model_relation_chain.$this->_model->primary_key_name()=>array('IS NULL')
//			)
//		);
//		if( ! isset($provided_where_query_params[$post_type_field_name])){
//			$default_where_conditions[$or_param_name][$and_param_name][$post_type_field_name] =$this->_post_type;	
//		}
//		if( ! isset($provided_where_query_params[$status_field_name])){
//			$default_where_conditions[$or_param_name][$and_param_name][$status_field_name] = array('NOT IN',array('auto-draft','trash'));
//		}
//		return $default_where_conditions;
		return array(
				$post_type_field_name => $this->_post_type,
				$status_field_name => array('NOT IN',array('auto-draft','trash'))
		);
	}
}