<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - One Datetimes
 *      - D1 - reg limit 18 ( T1, T2 )    	<< can only sell 18 max
 * - Two Tickets
 *      - T1 - qty 18 ( D1 ) 	<< can only sell 18 max due to TKT qty or reg limit
 *      - T2 - qty 18 ( D1 )    << can only sell 18 max due to TKT qty or reg limit
 *
 *  MAX SELLOUT:
 * 		- 18 of either ticket
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Brent Christensen
 * @see https://events.codebasehq.com/projects/event-espresso/tickets/10878
 */
class EE_Event_Scenario_J extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario J';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 18,
			'total_remaining_spaces' => 8
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				1 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT J' )
				)
			),
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 18,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				)
			),
			'Ticket' => array(
				1 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 1',
						'TKT_qty' => 18
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 2',
						'TKT_qty' => 18
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				)
			)
		);

		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );
		// simulate 6 sales for ticket 1, which will also increase sold qty for D1
		if (
			isset( $build_objects['Ticket'], $build_objects['Ticket'][1] )
			&& $build_objects['Ticket'][1] instanceof EE_Ticket
		) {
			/** @type EE_Ticket $ticket */
			$ticket = $build_objects['Ticket'][1];
			$ticket->increaseSold( 6 );
		}
		// and 4 sales for ticket 2, which will also increase sold qty for D1
		if (
			isset( $build_objects['Ticket'], $build_objects['Ticket'][2] )
			&& $build_objects['Ticket'][2] instanceof EE_Ticket
		) {
			/** @type EE_Ticket $ticket */
			$ticket = $build_objects['Ticket'][2];
			$ticket->increaseSold( 4 );
		}
		//EEH_Debug_Tools::printr( $build_objects['Datetime'], 'Datetimes', __FILE__, __LINE__ );
		//assign the event object as the scenario object
		$this->_scenario_object = reset( $build_objects['Event'] );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}

}

// Location:/tests/includes/scenarios/EE_Event_Scenario_J.scenario.php
