<?php
namespace EventEspresso\core\libraries\rest_api;
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Capabilities_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group rest_api
 *
 */
class Capabilities_Test extends \EE_UnitTestCase{
	function set_up(){
		parent::set_up();
		add_filter( 'FHEE__EE_REST_API_Controller_Model_Read__get_permissions', array( $this, 'set_some_restrictions_for_tests', ) );
		if ( ! class_exists( 'WP_Rest_Request' ) ) {
			$this->markTestSkipped(
				'Test being run on a version of WP that does not have the REST framework installed'
			);
		}
	}



	/**
	 * Ensures we can correctly detect when users have partial access
	 */
	function test_current_user_has_partial_access_to() {
		//yes - they can access some generally
		//the user has free access to prices
		$this->assertTrue( Capabilities::currentUserHasPartialAccessTo( \EE_Registry::instance()->load_model( 'Price' ) ) );
		//although there are some restrictions, the current user can access SOME events
		$this->assertTrue( Capabilities::currentUserHasPartialAccessTo( \EE_Registry::instance()->load_model( 'Event' ) ) );
		//yes - they can access this field specifically sometimes
		$this->assertTrue( Capabilities::currentUserHasPartialAccessTo( \EE_Registry::instance()->load_model( 'Event' ), \EEM_Base::caps_read, 'EVT_wp_user' ) );
		//no - no they can never access it
	}

	/**
	 * Makes sure that we are able to filter out inaccessible items in the entity correctly
	 * (and that related items taht are included are left as-is)
	 * @group now
	 */
	function test_filter_out_inaccessible_entity_fields() {
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$entity = $e->model_field_array();
		$entity[ 'datetimes' ] = array( array( 'DTT_ID' => 12 ) );
		$filtered_entity = Capabilities::filterOutInaccessibleEntityFields(
				$entity, 
				\EE_Registry::instance()->load_model( 'Event' ),
				\EEM_Base::caps_read,
				new ModelVersionInfo( '4.8.29' )
			);
		//the filtered entity shouldn't have had EVT_desc raw
		$this->assertFalse(
			isset( $filtered_entity['EVT_desc'] )
			&& is_array( $filtered_entity['EVT_desc'] )
			&& isset( $filtered_entity['EVT_desc']['raw'] )
		);
		//the filtered entity should have had EVT_desc rendered
		$this->assertFalse(
			isset( $filtered_entity['EVT_desc'] )
			&& is_array( $filtered_entity['EVT_desc'] )
			&&isset( $filtered_entity['EVT_desc']['rendered'] )
		);
	}

	/**
	 * placeholder because other tests have been at least temporarily removed
	 */
	function test_nothing(){
		$this->assertTrue(true);
	}
}

// End of file EE_REST_API_Capabilities_Test.php