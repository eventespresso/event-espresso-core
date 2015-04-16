<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Private
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Private extends EE_Restriction_Generator_Base{
	public static function generate_restrictions( $model, $action ) {
		//dont allow any access
	}
}

// End of file EE_Restriction_Generator_Private.strategy.php