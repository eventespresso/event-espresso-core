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
 * * @since		 	   4.6.0
 *
 */
class EE_CPT_Where_Conditions extends EE_CPT_Minimum_Where_Conditions{
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
