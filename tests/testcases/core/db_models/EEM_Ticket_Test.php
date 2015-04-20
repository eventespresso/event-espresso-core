<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Ticket_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Ticket_Test extends EE_UnitTestCase{
	/**
	 * Make sure we are getting back the right things when we apply the read-context
	 * restrictions
	 */
	public function test_get_all__caps() {
		//let's make sure we start off with NO tickets in the DB
		EEM_Ticket::instance()->delete_permanently( EEM_Ticket::instance()->alter_query_params_so_deleted_and_undeleted_items_included(), false );
		$this->assertEquals( 0, EEM_Ticket::instance()->count( EEM_Ticket::instance()->alter_query_params_so_deleted_and_undeleted_items_included() ) );
		$user = $this->factory->user->create_and_get();
		$t_mine = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => false, 'TKT_wp_user' => $user->ID ) );
		$t_others = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => false, 'TKT_wp_user' => 9999 ) );
		$t_mine_default = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => true, 'TKT_wp_user' => $user->ID ) );
		$t_others_default = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_is_default' => true, 'TKT_wp_user' => 9999 ) );
		//when we have no caps we should find all the non-global ones
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_others, $next_result );
		$this->assertEquals( 2, count( $results ) );

		//now if we are a real user with read default tickets, we should also be able to see our own
		global $current_user;
		$current_user = $user;
		$user->add_cap( 'ee_read_default_tickets' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_others, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_mine_default, $next_result );
		$this->assertEquals( 3, count( $results ) );

		//and lastly, if we are a real user who can read others default tickets...
		$user->add_cap( 'ee_read_others_default_tickets' );
		$results = EEM_Ticket::instance()->get_all( array( 'caps' => EEM_Base::caps_read, 'order_by' => array( 'TKT_ID' => 'ASC' ) ) );
		$first_result = reset( $results );
		$this->assertEEModelObjectsEquals($t_mine, $first_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_others, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_mine_default, $next_result );
		$next_result = next( $results );
		$this->assertEEModelObjectsEquals( $t_others_default, $next_result );
		$this->assertEquals( 4, count( $results ) );

	}

}

// End of file EEM_Ticket_Test.php