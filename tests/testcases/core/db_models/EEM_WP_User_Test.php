<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_WP_User_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group EEM_WP_User_Test
 */
class EEM_WP_User_Test extends EE_UnitTestCase{
	/**
	 * just verify the model works
	 * @group 8069
	 */
	function test_get_all() {
		$this->assertEquals( 1, EEM_WP_User::instance()->count() );
	}
}

// End of file EEM_WP_User_Test.php