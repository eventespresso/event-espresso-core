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

}
// Location: tests/testcases/core/db_models/EEM_Ticket_Test.php
