<?php
/**
 * Contains test class for /core/EE_Capabilities.core.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Admin_Hooks class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Capabilities_Test extends EE_UnitTestCase {


	/**
	 * test the get_ee_capabilities method on EE_Capabilities class.
	 *
	 * @since 4.5.0
	 */
	public function test_get_ee_capabilities() {
		//test getting admin capabilities (default)
		$admin_capabilities = EE_Registry::instance()->CAP->get_ee_capabilities();
		$this->assertFalse( isset( $admin_capabilities['administrator'] ) );
		$this->assertTrue( is_array( $admin_capabilities ) && isset( $admin_capabilities[0] ) );
		$first_cap = $admin_capabilities[0];
		$this->assertEquals( 'ee_read_ee', $first_cap );

		//test getting all capabilities
		$all_caps = EE_Registry::instance()->CAP->get_ee_capabilities('');
		$this->assertArrayHasKey( 'administrator', $all_caps );

		//test getting invalid capability
		$caps = EE_Registry::instance()->CAP->get_ee_capabilities('no_exist');
		$this->assertEmpty( $caps );
	}

} //end EE_Capabilities_Test class
