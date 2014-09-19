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



	/**
	 * @since 4.5.0
	 */
	public function test_current_user_can_and_user_can() {
		global $current_user;
		$orig_user = $current_user;
		//setup our user and set as current user.
		$user = $this->factory->user->create_and_get();
		$this->assertInstanceOf( 'WP_User', $user );
		$user->add_role( 'administrator' );
		$current_user = $user;

		//check what should be a valid  cap
		$this->assertTrue( EE_Registry::instance()->CAP->current_user_can( 'ee_read_ee', 'tests' ) );
		$this->assertTrue( EE_Registry::instance()->CAP->user_can( $user, 'ee_read_ee', 'tests' ) );

		//check what should be an invalid cap
		$this->assertFalse( EE_Registry::instance()->CAP->current_user_can( 'invalid_cap', 'tests' ) );
		$this->assertFalse( EE_Registry::instance()->CAP->user_can( $user, 'invalid_cap', 'tests' ) );

		//test context filter
		function test_custom_filter($cap, $id) {
			if ( $cap == 'ee_read_ee' ) {
				return 'need_this_instead';
			}
			return $cap;
		}
		add_filter( 'FHEE__EE_Capabilities__current_user_can__cap__tests', 'test_custom_filter', 10, 2 );
		add_filter( 'FHEE__EE_Capabilities__user_can__cap__tests', 'test_custom_filter', 10, 2 );

		$this->assertFalse( EE_Registry::instance()->CAP->current_user_can( 'ee_read_ee', 'tests' ) );
		$this->assertFalse( EE_Registry::instance()->CAP->user_can( $user, 'ee_read_ee', 'tests' ) );

		//test global filter
		function test_global_filter( $filtered_cap, $context, $cap, $id ) {
			if ( $cap == 'ee_read_ee' && $context == 'tests' ) {
				return 'ee_read_ee'; //override what was set by custom filter
			}
			return $cap;
		}
		add_filter( 'FHEE__EE_Capabilities__current_user_can__cap', 'test_global_filter', 10, 4 );
		add_filter( 'FHEE__EE_Capabilities__user_can__cap', 'test_global_filter', 10, 4 );

		$this->assertTrue( EE_Registry::instance()->CAP->current_user_can( 'ee_read_ee', 'tests' ) );
		$this->assertTrue( EE_Registry::instance()->CAP->user_can( $user, 'ee_read_ee', 'tests' ) );
		$currrent_user = $orig_user;
	}

} //end EE_Capabilities_Test class
