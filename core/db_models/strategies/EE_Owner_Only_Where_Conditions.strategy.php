<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Owner_Only_Where_Conditions
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Owner_Only_Where_Conditions extends EE_Default_Where_Conditions{
	protected function _get_default_where_conditions(){
		$full_query_params = $this->_model->alter_query_params_to_only_include_mine();
		return $full_query_params[0];
	}

}

// End of file EE_Owner_Only_Where_Conditions.strategy.php