<?php

/*
 * Strategy specifically for adding where conditions specific to CPT models.
 */
class EE_CPT_Where_Conditions extends EE_Default_Minimum_Where_Conditions{
	/**
	 * Gets the where default where conditions for a custom post type model
	 * @param string $model_relation_path. Eg, from Event to Payment, this should be "Registration.Transaction.Payment"
	 * @return array like EEM_Base::get_all's $query_params's index [0] (where conditions)
	 */
	protected function _get_default_where_conditions() {
		$status_field = $this->_get_field_on_column('post_status');
		return array_merge( 
			parent::_get_default_where_conditions(),
			array( 
				$status_field->get_name() => array('NOT IN',array('auto-draft','trash') )
			)
		);
	}
}
