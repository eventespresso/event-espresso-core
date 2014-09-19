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

	public function test_add_new_capabilities() {
		global $wp_roles;
		new WP_User();
		//check the current user is an admin
		$user = $this->factory->user->create_and_get();
		$this->assertInstanceOf( 'WP_User', $user );
		$user->add_role( 'administrator' );
		$this->assertFalse( EE_Registry::instance()->CAP->user_can($user, 'ee_new_cap', 'test' ) );

		//ok now add another cap, and re-init stuff and verify it got added correctly
		//add a new cap
		add_filter( 'FHEE__EE_Capabilities__init_caps_map__caps', array( $this, 'add_new_caps' ) );
		EE_Registry::instance()->CAP->init_caps();
		//check it got added
		$this->assertArrayContains( 'ee_new_cap', EE_Registry::instance()->CAP->get_ee_capabilities( 'administrator' ) );
		//then check newly-created users get that new role
		//refresh teh roles' caps and the user object
		$wp_roles->reinit();
		$user_refreshed = get_user_by('id', $user->ID );
		$this->assertTrue( EE_Registry::instance()->CAP->user_can($user_refreshed, 'ee_new_cap', 'test' ) );
	}

	public function add_new_caps( $existing_caps ){
		$existing_caps['administrator'][] = 'ee_new_cap';
		return $existing_caps;
	}

} //end EE_Capabilities_Test class
