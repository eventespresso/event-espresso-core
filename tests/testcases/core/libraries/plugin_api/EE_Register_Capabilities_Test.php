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
	/**
	 * The results of EE_Capabilities::_init_caps_map() before any filters applied to it
	 * @var array
	 */
	protected $_caps_before_registering_new_ones = array();

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
		unset( $wp_actions['AHEE__EE_Capabilities__init_role_caps__complete'] );
		//register capabilities
		EE_Register_Capabilities::register( 'Test_Capabilities', $this->_valid_capabilities );

		//use filters to access some of the data normally private to EE_Capabilities because we want to verify it
		add_filter( 'FHEE__EE_Capabilities__init_caps_map__caps', array( $this, '_remember_what_caps_were_beforehand' ), 1 );
		add_filter( 'FHEE__EE_Capabilities__init_caps_map__caps', array( $this, '_verify_new_cap_map_ok' ), 100 );

		EE_Registry::instance()->load_core( 'Capabilities' );
		EE_Capabilities::instance()->init_caps();

		//validate caps were registered and init saved.
		$admin_caps_init = EE_Capabilities::instance()->get_ee_capabilities('administrator');
		$this->assertArrayContains( 'test_read', $admin_caps_init );

		//verify new caps are in the role
		$role = get_role( 'administrator' );
		$this->assertContains( $this->_valid_capabilities['capabilities']['administrator'], $role->capabilities );

		//make sure we didn't erase the existing capabilities (@see https://events.codebasehq.com/projects/event-espresso/tickets/6700)
		$this->assertContains( array( 'ee_read_ee', 'ee_read_event' ), $role->capabilities, 'Looks like registering capabilities is overwriting default capabilites, that will cause problems' );

		//setup user
		$this->setupUser();
	}

	/**
	 * Verify that the $incoming_cap_map looks normal after EE_REgister_Capabilities has played with it
	 * @param array $incoming_caps
	 */
	public function _verify_new_cap_map_ok( $incoming_cap_map ){
		foreach( $this->_caps_before_registering_new_ones as $role => $caps ){
			$this->assertArrayHasKey( $role, $incoming_cap_map );
			foreach( $caps as $cap ){
				$this->assertArrayContains( $cap, $incoming_cap_map[ $role ] );
			}
		}
		return $incoming_cap_map;
	}


	/**
	 * Gets all the caps BEFORE the registered caps get added to make sure none get
	 * removed.
	 * @param type $incoming_cap_map
	 */
	public function _remember_what_caps_were_beforehand( $incoming_cap_map ){
		$this->_caps_before_registering_new_ones = $incoming_cap_map;
		return $incoming_cap_map;
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

	public function tearDown(){
		EE_Register_Capabilities::deregister('Test_Capabilities');
	}
}
