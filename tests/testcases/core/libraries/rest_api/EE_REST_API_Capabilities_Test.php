<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_REST_API_Capabilities_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_REST_API_Capabilities_Test extends EE_UnitTestCase{
	function setUp(){
		parent::setUp();
		EE_REST_API_Capabilities::reset();
		add_filter( 'FHEE__EE_REST_API_Controller_Model_Read__get_permissions', array( $this, 'set_some_restrictions_for_tests', ) );
	}
	/**
	 * Replaces the normal restrictions with a mock restrictions array
	 * to help make this unit testing more independent of outside code
	 * @param type $restrictions
	 * @return array
	 */
	function set_some_restrictions_for_tests( $restrictions ) {
		return array(
			'Event' => array(
				WP_JSON_Server::READABLE => array(
					'*' => array(),//anyone can see most event fields
					'EVT_wp_user' => array(
						'can_see_wp_user' => new EE_Default_Where_Conditions_Owner()//...except you need to be the owner to see the wp user, or have the 'can_see_wp_user' cap
					)
				)
			),
			'Registration' => array(
				WP_JSON_Server::READABLE => array(
					'*' => array(
						'mambo' => new EE_Default_Where_Conditions_Owner()
					),
					'REG_att_is_going' => array(
						'ee_read_checkins' => new EE_Return_None_Where_Conditions()
					)
				)
			),
			'Attendee' => array(
				WP_JSON_Server::READABLE => array(
					'*' => array(
						'foobar' => new EE_Default_Where_Conditions( array( 'ATT_fname' => 'foobar' ) )
					)
				)
			),
			'Question' => array(
				WP_JSON_Server::READABLE => array(
					//nothing in here. There should be the name of at least '*'
				)
			),
			'Price' => array(
				WP_JSON_Server::READABLE => array(
					'*' => array(
						//this is ok though, because it means no permissions are required
					)
				)
			),
			'Venue' => array(
				WP_JSON_Server::READABLE => array(
					'*' => array(
						'access_venues' => new EE_Return_None_Where_Conditions()
					)
				)
			)
		);
	}


//	/**
//	 * Check we correctly detect users can access fields which have dfeault restrictions
//	 * @global type $current_user
//	 */
//	function test_current_user_has_full_access_to__default_yes() {
//		global $current_user;
//		$current_user = $this->factory->user->create_and_get();
//		$this->assertInstanceOf( 'WP_User', $current_user );
//		$e = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $current_user->ID ) );
//		//ask if they can access default fields
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, '*', $e->ID() ) );
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, '*' ) );
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_name', $e->ID() ) );
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_name' ) );
//	}
//	/**
//	 * Test that we correctly detect users can access fields which have special restrictions
//	 * @global type $current_user
//	 */
//	function test_current_user_has_full_access_to__specific_yes_or_no() {
//		global $current_user;
//		$current_user = $this->factory->user->create_and_get();
//		$this->assertInstanceOf( 'WP_User', $current_user );
//		$e = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $current_user->ID ) );
//		$e2 = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => 9999 ) );
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_wp_user', $e->ID() ) );
//		//the current user needs to be the owner to access the user field
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_wp_user', $e2->ID() ) );
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_wp_user' ) );
//
//	}
//	/**
//	 * Venues have been setup so no one can access unless they have the 'access_venues' cap.
//	 * @global type $current_user
//	 */
//	function test_current_user_has_full_access_to__default_no() {
//		global $current_user;
//		$current_user = $this->factory->user->create_and_get();
//		$this->assertInstanceOf( 'WP_User', $current_user );
//		$v = $this->new_model_obj_with_dependencies( 'Venue', array( 'VNU_wp_user' => $current_user->ID ) );
//		//ask if they can access default fields
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Venue' ), WP_JSON_Server::READABLE, '*', $v->ID() ) );
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Venue' ), WP_JSON_Server::READABLE, '*' ) );
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Venue' ), WP_JSON_Server::READABLE, 'VNU_name', $v->ID() ) );
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Venue' ), WP_JSON_Server::READABLE, 'VNU_name' ) );
//		//and let's also check a model that specifically wasn't setup
//		//so it shouldn't allow any access
//		$this->assertFalse( EE_REST_API_Capabilities::current_user_has_full_access_to( EE_Registry::instance()->load_model( 'Question_Group' ), WP_JSON_Server::READABLE, '*' ) );
//	}

//	/**
//	 * Ensures we can correctly detect when users have partial access
//	 */
//	function test_current_user_has_partial_access_to() {
//		//yes - they can access some generally
//		//the user has free access to prices
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_partial_access_to( EE_Registry::instance()->load_model( 'Price' ) ) );
//		//although there are some restrictions, the current user can access SOME events
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_partial_access_to( EE_Registry::instance()->load_model( 'Event' ) ) );
//		//yes - they can access this field specifically sometimes
//		$this->assertTrue( EE_REST_API_Capabilities::current_user_has_partial_access_to( EE_Registry::instance()->load_model( 'Event' ), WP_JSON_Server::READABLE, 'EVT_wp_user' ) );
//		//no - no they can never access it
//	}
//
//	/**
//	 * Makes sure that we are able to filter out inaccessible items in the entity correctly
//	 * (and that related items taht are included are left as-is)
//	 * @group now
//	 */
//	function test_filter_out_inaccessible_entity_fields() {
//		$e = $this->new_model_obj_with_dependencies( 'Event' );
//		$entity = $e->model_field_array();
//		$entity[ 'datetimes' ] = array( array( 'DTT_ID' => 12 ) );
//		$filtered_entity = EE_REST_API_Capabilities::filter_out_inaccessible_entity_fields( $entity, EE_Registry::instance()->load_model( 'Event' ) );
//		//the filtered entity should have had EVT_wp_user removed
//		$this->assertArrayNotHasKey( 'EVT_wp_user', $filtered_entity );
//		//but has othe rkeys, like datetimes
//		$this->assertArrayHasKey( 'EVT_name', $filtered_entity );
//		$this->assertArrayHasKey( 'datetimes', $filtered_entity );
//	}

	/**
	 * placeholder because other tests have been at least temporarily removed
	 */
	function test_nothing(){
		$this->assertTrue(true);
	}
}

// End of file EE_REST_API_Capabilities_Test.php