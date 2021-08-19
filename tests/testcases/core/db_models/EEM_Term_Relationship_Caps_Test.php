<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Term_Relationship_Caps_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Term_Relationship_Caps_Test extends EE_UnitTestCase {
	/**
	 *
	 * @var EE_Term_Relationship
	 */
	public $term_r_for_my_event = null;
	/**
	 *
	 * @var EE_Term_Relationship
	 */
	public $term_r_for_others_event = null;
	/**
	 *
	 * @var EE_Event
	 */
	public $my_event = null;

	/**
	 * @var EE_Event
	 */
	public $others_event = null;
	/**
	 *
	 * @var WP_User
	 */
	public $user = null;
	//don't bother with a private term relationship.
	public function setUp(){
		parent::setUp();
        $this->loadFactories();
		$this->user = $this->factory->user->create_and_get();
		$this->my_event = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $this->user->ID ) );
		$term_id_and_taxonomy_id = wp_insert_term('term_r_for_my_event', 'espresso_event_categories' );
		$result = wp_set_object_terms( $this->my_event->ID(), $term_id_and_taxonomy_id['term_id'], 'espresso_event_categories' );
		$this->term_r_for_my_event = EEM_Term_Relationship::instance()->get_one(
				array(
					array(
						'object_id' => $this->my_event->ID(),
						'term_taxonomy_id' => reset( $result )
						)
					)
				);

		$this->others_event = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $this->user->ID + 1 ) );
		$term_id_and_taxonomy_id = wp_insert_term('term_r_for_others_event', 'espresso_event_categories' );
		$result = wp_set_object_terms( $this->others_event->ID(), $term_id_and_taxonomy_id['term_id'], 'espresso_event_categories' );
		$this->term_r_for_others_event = EEM_Term_Relationship::instance()->get_one(
				array(
					array(
						'object_id' => $this->others_event->ID(),
						'term_taxonomy_id' => reset( $result )
						)
					)
				);


	}

	public function test_get_all__caps__read(){
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					)
				);
		$this->assertEEModelObjectsEquals( $this->term_r_for_my_event, reset( $term_rs ) );
		$this->assertEEModelObjectsEquals( $this->term_r_for_others_event, next( $term_rs ) );
		$this->assertEquals( 2, count( $term_rs ) );
	}

	/**
	 * if you're not logged in, you shouldn't be able to see any of this in the admin context
	 */
	public function test_get_all_read_admin__no_caps() {
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_read_admin
					)
				);
		$this->assertEquals( 0, count( $term_rs ) );
	}

	/**
	 * currently, you don't need "ee_assign_event_categories" to READ term relationships in the admin
	 */
	public function test_get_all__caps__read_admin__my_own(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_read_events' );

		//now check they can only see the term relationship for their own event
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_read_admin
					)
				);
		$this->assertEEModelObjectsEquals( $this->term_r_for_my_event, reset( $term_rs ) );
		$this->assertEquals( 1, count( $term_rs ) );
	}

	public function test_get_all__caps__read_admin__others(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_read_events' );
		$current_user->add_cap( 'ee_read_others_events' );

		//now check they can only see the term relationship for their own event
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_read_admin
					)
				);
		$this->assertEEModelObjectsEquals( $this->term_r_for_my_event, reset( $term_rs ) );
		$this->assertEEModelObjectsEquals( $this->term_r_for_others_event, next( $term_rs ) );
		$this->assertEquals( 2, count( $term_rs ) );
	}

	/**
	 * you need the "ee_assign_event_categories" too, in order to edit any event categories
	 */
	public function test_get_all__caps__edit__no_assign_event_category(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_edit_events' );

		//now check they can only see the term relationship for their own event
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_edit
					)
				);
		$this->assertEquals( 0, count( $term_rs ) );
	}

	public function test_get_all__caps__edit__with_assign_event_category(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_edit_events' );
		$current_user->add_cap( 'ee_assign_event_category' );
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_edit
					)
				);
		$this->assertEEModelObjectsEquals( $this->term_r_for_my_event, reset( $term_rs ) );
		$this->assertEquals( 1, count( $term_rs ) );
	}



	/**
	 * you need the "ee_assign_event_categories" too, in order to edit any event categories
	 */
	public function test_get_all__caps__delete__no_assign_event_category(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_edit_events' );

		//now check they can only see the term relationship for their own event
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_delete
					)
				);
		$this->assertEquals( 0, count( $term_rs ) );
	}

	public function test_get_all__caps__delete__with_assign_event_category(){
		//log the user in
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_edit_events' );
		$current_user->add_cap( 'ee_assign_event_category' );

		//now check they can only see the term relationship for their own event
		$term_rs = EEM_Term_Relationship::instance()->get_all(
				array(
					array(
						'object_id' => array( 'IN', array( $this->my_event->ID(), $this->others_event->ID() ) )
						),
					'order_by' => array( 'object_id' => 'ASC' ),
					'caps' => EEM_Base::caps_delete
					)
				);
		$this->assertEEModelObjectsEquals( $this->term_r_for_my_event, reset( $term_rs ) );
		$this->assertEquals( 1, count( $term_rs ) );
	}




}

// End of file EEM_Term_Relationship_Caps_Test.php