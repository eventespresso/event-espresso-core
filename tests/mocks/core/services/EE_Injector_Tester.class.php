<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Injector_Tester
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Injector_Tester {


	/**
	 * injector_tester constructor.
	 *
	 * @param array      $numerically_indexed_array
	 * @param EE_Session $session
	 */
	public function __construct( $numerically_indexed_array = array(), EE_Session $session ) {
		EEH_Debug_Tools::printr( $numerically_indexed_array, '$numerically_indexed_array', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $session, '$session', __FILE__, __LINE__ );
	}

}



// End of file EE_Injector_Tester.class.php
// Location: /EE_Injector_Tester.class.php