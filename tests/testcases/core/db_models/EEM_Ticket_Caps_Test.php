<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Ticket_Test_Caps
 * Test capability-related stuff on this model
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group models
 * @group core/db_models
 * @group capabilities
 * @group EEM_Ticket_Caps_Test
 */
class EEM_Ticket_Caps_Test extends EE_UnitTestCase{
	/**
	 *
	 * @var WP_User
	 */
	public $user;
	/**
	 * Non-default ticket owned by the $this->user
	 * @var EE_Ticket
	 */
	public $t_mine;

	/**
	 * Non-default ticket owned by another user
	 * @var EE_Ticket
	 */
	public $t_others;

	/**
	 * Event though tickets can't be "private", the event they are for can be
	 * @var EE_Ticket
	 */
	public $t_private;

	/**
	 * Default ticket owned by $this->user
	 * @var EE_Ticket
	 */
	public $t_mine_default;

	/**
	 * Default ticket owned by another user
	 * @var EE_Ticket
	 */
	public $t_others_default;

	/**
	 * My Event
	 * @var EE_Event
	 */
	public $e_mine;

	/**
	 * Another users event
	 * @var EE_Event
	 */
	public $e_others;

	/**
	 * Another users private event
	 * @var EE_Event
	 */
	public $e_private;
	public function setUp(){
		parent::setUp();
        $this->loadFactories();
		//let's make sure we start off with NO tickets in the DB
		EEM_Ticket::instance()->delete_permanently( EEM_Ticket::instance()->alter_query_params_so_deleted_and_undeleted_items_included(), false );
		$this->assertEquals( 0, EEM_Ticket::instance()->count( EEM_Ticket::instance()->alter_query_params_so_deleted_and_undeleted_items_included() ) );

		$this->user = $this->factory->user->create_and_get();
		$this->e_mine = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $this->user->ID, 'status' => 'publish' ) );
		$this->e_others =  $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => 99999, 'status' => 'publish' ) );
		$this->e_private = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => 99999, 'status' => 'private' ) );
		$this->t_mine = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => false, 'TKT_wp_user' => $this->user->ID ) );
		$this->t_others = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => false, 'TKT_wp_user' => 9999 ) );
		$this->t_private = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => false, 'TKT_wp_user' => 9999 ) );
		$this->t_mine_default = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => true, 'TKT_wp_user' => $this->user->ID ) );
		$this->t_others_default = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => true, 'TKT_wp_user' => 9999 ) );
		$dtt_to_mine = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $this->e_mine->ID() ) );
		$dtt_to_mine->_add_relation_to( $this->t_mine, 'Ticket' );
		$dtt_to_others = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $this->e_others->ID() ) );
		$dtt_to_others->_add_relation_to( $this->t_others, 'Ticket' );
		$dtt_to_private = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $this->e_private->ID() ) );
		$dtt_to_private->_add_relation_to( $this->t_private, 'Ticket');
	}

	/**
	 * Make sure we are getting back the right things when we apply the read-context
	 * restrictions
	 */
	public function test_get_all__caps__read__not_logged_in() {
		//when we have no caps we should find all the non-global ones
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );

		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($this->t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_others, $next_result );
		$this->assertEquals( 2, count( $results ) );
	}

	public function test_get_all__caps__read__logged_in_with_read_default_tickets_cap(){
		//now if we are a real user with read default tickets, we should also be able to see our own
		global $current_user;
		$current_user = $this->user;
		$this->user->add_cap( 'ee_read_default_tickets' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($this->t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_others, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_mine_default, $next_result );
		$this->assertEquals( 3, count( $results ) );
	}

	public function test_get_all__caps__read__logged_in_with_read_others_default_tickets_cap(){//now if we are a real user with read default tickets, we should also be able to see our own
		//and lastly, if we are a real user who can read others default tickets...
		global $current_user;
		$current_user = $this->user;
		$this->user->add_cap( 'ee_read_default_tickets' );
		$this->user->add_cap( 'ee_read_others_default_tickets' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($this->t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_others, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_mine_default, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $this->t_others_default, $next_result );
		$this->assertEquals( 4, count( $results ) );
	}


	public function test_get_all__caps__read_admin__not_logged_in(){
		//when we have no caps we should none
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$this->assertEquals( 0, count( $results ) );
	}

	/**
	 * If a user can read events, they should be able to read their own tickets
	 */
	public function test_get_all__caps__read_admin__logged_in_with_read_events(){
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_read_events' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		//I should be able to read tickets for my own events
		$this->assertEEModelObjectsEquals( $this->t_mine, reset( $results ) );
		$this->assertEquals( 1, count( $results ) );
	}

	/**
	 * If a user can read others' events, they should be able to read tickets for others' events
	 */
	public function test_get_all__caps__read_admin__logged_in_with_read_others_events(){
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_read_events' );
		$current_user->add_cap( 'ee_read_others_events' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		//I should be able to read tickets for my own events, and for others' that aren't private
		$this->assertEEModelObjectsEquals( $this->t_mine, reset( $results ) );
		$this->assertEEModelObjectsEquals($this->t_others, next( $results ) );
		$this->assertEquals( 2, count( $results ) );
	}

	/**
	 * If a user can read private events, they should be able to read others private events' tickets
	 */
	public function test_get_all__caps__read_admin__logged_in_with_read_private_events(){
		global $current_user;
		$current_user = $this->user;
		$current_user->add_cap( 'ee_read_events' );
		$current_user->add_cap( 'ee_read_others_events' );
		$current_user->add_cap( 'ee_read_private_events' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read_admin, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		//I should be able to read tickets for my own events, and for others' that aren't private
		$this->assertEEModelObjectsEquals( $this->t_mine, reset( $results ) );
		$this->assertEEModelObjectsEquals($this->t_others, next( $results ) );
		$this->assertEEModelObjectsEquals($this->t_private, next( $results ) );
		$this->assertEquals( 3, count( $results ) );
	}


}

// End of file EEM_Ticket_Test.php