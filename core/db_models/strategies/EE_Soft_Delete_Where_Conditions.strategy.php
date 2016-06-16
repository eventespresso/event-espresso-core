<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 *
 * Class EE_Default_Where_Conditions
 * 
 * Strategy specifically for adding where conditions specific to CPT models.
 *
 * @package         Event Espresso
 * @subpackage    core/db_models
 * @author				Mike Nelson
 * @since		 	   4.6.0
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
	 * @return array like EEM_Base::get_all's $query_params's index [0] (where conditions)
	 */
	protected function _get_default_where_conditions(){
		$trashed_field_name = $this->deleted_field_name();
		return array(
			$trashed_field_name => false
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