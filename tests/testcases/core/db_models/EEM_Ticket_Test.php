<?php
/**
 * Contains test class for /core/db_models/EEM_Ticket.model.php
 *
 * @since  		4.8.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Ticket class.
 *
 * @since 		4.8.x
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Ticket_Test extends EE_UnitTestCase {

	/**
	 * @group 8861
	 */
	public function test_sum_tickets_currently_available_at_datetime() {
		//echo "\n\n test_sum_tickets_currently_available_at_datetime: ";
        $this->loadTestScenarios();
        $scenarios = $this->scenarios->get_scenarios_by_type( 'datetime' );
		foreach ( $scenarios as $scenario ) {
			//echo "\n\nTesting" . $scenario->name;
			if ( $scenario->get_expected( 'sum_tickets_currently_available_at_datetime' ) !== false ) {
				//echo "\n scenario->get_scenario_object()->ID(): " . $scenario->get_scenario_object()->ID();
				$actual = EEM_Ticket::instance()->sum_tickets_currently_available_at_datetime( $scenario->get_scenario_object()->ID() );
				$this->assertEquals( $scenario->get_expected( 'sum_tickets_currently_available_at_datetime' ), $actual );
			}
		}
	}

    /**
     * @since $VID:$
     * @group private-1
     */
    public function testGetAllExcludeProtected()
    {
        // create two events, one is password-protected
        $e_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => 'foobar'
            )
        );
        $e_no_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => ''
            )
        );

        // create related data
        $d_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_password->ID()
            )
        );
        $d_no_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_no_password->ID()
            )
        );

        $t_password = $this->new_model_obj_with_dependencies('Ticket');
        $t_password->_add_relation_to($d_password->ID(),'Datetime');

        $t_no_password = $this->new_model_obj_with_dependencies('Ticket');
        $t_no_password->_add_relation_to($d_no_password->ID(),'Datetime');

        // and a general ticket too!

        $t_default = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_is_default' => true
            )
        );

        // fetch related data. Those for password-protected events should be excluded
        $ticket_ids = EEM_Ticket::instance()->get_col(array('exclude_protected'=>true));
        $this->assertArrayContains((string) $t_no_password->ID(),$ticket_ids);
        $this->assertArrayContains((string) $t_default->ID(), $ticket_ids);
        $this->assertArrayDoesNotContain((string) $t_password->ID(), $ticket_ids);
    }
}
// Location: tests/testcases/core/db_models/EEM_Ticket_Test.php
