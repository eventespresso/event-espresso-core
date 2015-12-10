<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EED_REST_API_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EED_REST_API_Test extends EE_UnitTestCase{
	function test_core_version(){
		$this->assertEquals( '4.8', EED_REST_API::core_version() );
	}
}

// End of file EED_REST_API_Test.php