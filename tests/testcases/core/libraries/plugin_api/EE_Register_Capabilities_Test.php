<?php
/**
 * Contains test class for /core/libraries/plugin_api/EE_Register_Capabilities.lib.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the EE_Register_Capabilities class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Register_Capabilities_Test extends EE_UnitTestCase {

	private $_valid_capabilities = array();
	private $_user;

	function __construct() {
		$this->_valid_capabilities = array(
			'capabilities' => array(
				'administrator' => array( 'test_read', 'test_write', 'test_others_read', 'test_others_write', 'test_private_read', 'test_private_write' )
				),
			'capability_maps' => array(
				'EE_Meta_Capability_Map_Read' => array( 'test_read', array( 'Event', 'test_read', 'test_others_read', 'test_private_read' ) ),
				'EE_Meta_Capability_Map_Edit' => array( 'test_write', array( 'Event', 'test_write', 'test_others_write', 'test_private_write' ) )
				)
			);
	}


	/**
	 * Utility function to just ensure and admin user is setup for tests in this suite
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	private function setupUser() {
		//create a user for checking caps on.
		$user_id = $this->factory->user->create();
		$this->_user = $this->factory->user->get_object_by_id( $user_id );
		//give user administrator role for test!
		$this->_user->add_role('administrator');

		//verify administrator role set
		$this->assertTrue( user_can( $this->_user, 'administrator' ) );
	}



	/**
	 * Utility function to just setup valid capabilities for tests in this suite.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function _pretend_capabilities_registered() {
		//pretend correct hookpoint set.
		global $wp_actions;
		unset( $wp_actions['AHEE__EE_System__core_loaded_and_ready'] );

		//register capabilities
		EE_Register_Capabilities::register( 'Test_Capabilities', $this->_valid_capabilities );

		EE_Registry::instance()->load_core( 'Capabilities' );
		do_action( 'AHEE__EE_System__core_loaded_and_ready' );

		//validate caps were registered and init saved.
		$caps_init = get_option( 'ee_caps_init', array() );
		$this->assertTrue( isset( $caps_init['Test_Capabilities'] ) );

		//verify new caps are in the role
		$role = get_role( 'administrator' );
		$this->assertContains( $this->_valid_capabilities['capabilities']['administrator'], $role->capabilities );

		//setup user
		$this->setupUser();
	}



	function test_registering_capabilities_too_early() {

		//test activating in the wrong spot.
		try{
			EE_Register_Capabilities::register('Test_Capabilities', $this->_valid_capabilities);
			$this->fail('We should have had a warning saying that we are registering capabilities at the wrong time');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertTrue(True);
		}
	}


	function test_registering_capabilities_and_they_are_assigned() {
		$this->_pretend_capabilities_registered();

		//now capabilities *SHOULD* be set on the user.  Let's verify.
		$this->assertTrue( user_can( $this->_user, 'test_read' ) );
		$this->assertTrue( user_can( $this->_user, 'test_write' ) );
		$this->assertTrue( user_can( $this->_user, 'test_others_read' ) );
		$this->assertTrue( user_can( $this->_user, 'test_others_write' ) );
		$this->assertTrue( user_can( $this->_user, 'test_private_read' ) );
		$this->assertTrue( user_can( $this->_user, 'test_private_write' ) );
	}




	function test_capability_maps_registered() {
		$this->_pretend_capabilities_registered();
		//the best way to test this is to ensure the registered maps work.  So let's author an event by the user.

		//main users event.
		$event = $this->factory->event->create( array( 'EVT_wp_user' => $this->_user->ID ) );

		//other users event (checking others event caps).
		$user_id = $this->factory->user->create();
		$other_user = $this->factory->user->get_object_by_id( $user_id );
		$other_event = $this->factory->event->create( array( 'EVT_wp_user' => $other_user->ID) );

		//make sure we have an event
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Event', $other_event );

		//check map items for event.
		$this->assertTrue( EE_Capabilities::instance()->user_can( $this->_user, 'test_read', 'testing_read', $event->ID() ) );
		$this->assertTrue( EE_Capabilities::instance()->user_can( $this->_user, 'test_write', 'testing_edit', $event->ID() ) );
		$this->assertTrue( EE_Capabilities::instance()->user_can( $this->_user, 'test_read', 'testing_read', $other_event->ID() ) );
		$this->assertTrue( EE_Capabilities::instance()->user_can( $this->_user, 'test_write', 'testing_edit', $other_event->ID() ) );
	}
}
