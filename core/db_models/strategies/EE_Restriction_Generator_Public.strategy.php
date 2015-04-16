<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Public
 * Generates cap restrictions array that essentially makes this model public
 * (however, if there's a status it IS still dependent on that),
 * entirely controlled by permissions,
 * or entirely private
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Public extends EE_Restriction_Generator_Base{
	public static function generate_restrictions( $model, $action ) {
		//if the model is a CPT,
		if( $model instanceof EE_CPT_Base ){
			//only allow them to see their own
			//or public and private ones
			//or ones their permissions grant access to

		}elseif( $model instanceof EEM_Soft_Delete_Base ) {
			//if the model is soft-deletable
			//only allow them to see their own
			//or non-trahsed items
			//or ones their permissions grant access to
		}else{
			//otherwise, allow them to see all


		}
	}
}

// End of file EE_Restriction_Generator_Public.strategy.php