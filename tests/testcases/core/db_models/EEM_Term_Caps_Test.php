<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Term_Relationship_Caps_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Term_Caps_Test
 *
 */
class EEM_Term_Caps_Test extends EE_UnitTestCase{
	/**
	 *
	 * @var EE_Term
	 */
	public $event_term;

	/**
	 *
	 * @var EE_Term
	 */
	public $venue_term;

	public function setUp(){
		parent::setUp();
        $this->loadFactories();
		$this->event_term = $this->new_model_obj_with_dependencies('Term' );
		$this->new_model_obj_with_dependencies( 'Term_Taxonomy', array(
			'term_id' => $this->event_term->ID(),
			'taxonomy' => 'espresso_event_categories' ));
		$this->venue_term = $this->new_model_obj_with_dependencies( 'Term' );
		$this->new_model_obj_with_dependencies( 'Term_Taxonomy', array(
			'term_id' => $this->venue_term->ID(),
			'taxonomy' => 'espresso_venue_categories' ));
	}

	/**
	 * anyone should be able to read term-taxonomies
	 */
	function test_get_all__caps__read__not_logged_in() {
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_read,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEEModelObjectsEquals($this->venue_term, next( $venue_and_event_cats ) );
		$this->assertEquals( 2, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__read_admin__not_logged_in() {
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_read_admin,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEquals( 0, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__read_admin__read_event_cats() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_manage_event_categories');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_read_admin,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEquals( 1, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__read_admin__read_venue_cats() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_manage_venue_categories');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_read_admin,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->venue_term, reset( $venue_and_event_cats ) );
		$this->assertEquals( 1, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__read_admin__read_event_and_venue_cats() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_manage_event_categories');
		$current_user->add_cap( 'ee_manage_venue_categories');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_read_admin,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEEModelObjectsEquals($this->venue_term, next( $venue_and_event_cats ) );
		$this->assertEquals( 2, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__edit__no_caps() {
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_edit,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEquals( 0, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__edit__event_caps() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_edit_event_category');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_edit,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEquals( 1, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__edit__venue__caps() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_edit_venue_category');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_edit,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->venue_term, reset( $venue_and_event_cats ) );
		$this->assertEquals( 1, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__delete__no_caps() {
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_delete,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEquals( 0, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__delete__event_caps() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_delete_event_category');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_delete,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEquals( 1, count( $venue_and_event_cats ) );
	}

	function test_get_all__caps__delete__venue_and_event_caps() {
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_cap( 'ee_delete_venue_category');
		$current_user->add_cap( 'ee_delete_event_category');
		$venue_and_event_cats = EEM_Term::instance()->get_all( array(
			'caps' => EEM_Base::caps_delete,
			'order_by' => array( 'term_id' => 'ASC' ),
			array( 'Term_Taxonomy.taxonomy' => array( 'IN', array( 'espresso_event_categories', 'espresso_venue_categories')))
		));
		$this->assertEEModelObjectsEquals( $this->event_term, reset( $venue_and_event_cats ) );
		$this->assertEEModelObjectsEquals( $this->venue_term, next( $venue_and_event_cats ) );
		$this->assertEquals( 2, count( $venue_and_event_cats ) );
	}




}

// End of file EE_Term_Relationship_Caps_Test.php