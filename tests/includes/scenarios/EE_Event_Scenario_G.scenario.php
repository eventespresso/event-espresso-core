<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Three Datetimes (in order of asc reg limit)
 *      - D2 - reg limit 2 		( T2, T3 )    	<< can only sell 2 max : Tickets 2 & 3 sold out after 2 sales
 *      - D1 - reg limit 3 		( T1, T3, T4 ) 	<< can only sell 3 max : Tickets 1, 3 & 4 sold out after 3 sales
 *      - D3 - reg limit 10 	( T1, T4 ) 		<< can only sell 3 max : Tickets 1 & 4 sold out after 3 sales
 * - Four Tickets
 *      - T1 - qty 2 ( D1, D3 ) 	<< can only sell 2 max due to TKT qty ( which sells out Ticket 1 )
 *      - T2 - qty 2 ( D2 )        	<< can only sell 2 max due to TKT qty && DT reg limit ( which sells out T2 && D2 )
 *      - T3 - qty 2 ( D1, D2 ) 	<< can only sell 2 max due to TKT qty ( which sells out Ticket 3 )
 *      - T4 - qty 2 ( D1, D3 ) 	<< can only sell 2 max due to TKT qty ( which sells out Ticket 4 )
 *
 *  MAX SELLOUT:
 * 		- 2 T2 (or T3) tickets for D2 ( T2 & T3 sold out + D2 sold out )
 * 		- 1 T1 (or T4) ticket for D1 ( T1 & T4 sold out + D1 & D3 sold out )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier / Brent Christensen
 */
class EE_Event_Scenario_G extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario G';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 3,
			'total_remaining_spaces' => 1
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				1 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT G' )
				)
			),
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 3,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
				2 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 2',
						'DTT_reg_limit' => 2,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
				3 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 3',
						'DTT_reg_limit' => 10
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
			),
			'Ticket' => array(
				1 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 1',
						'TKT_qty' => 2
					),
					'relations' => array(
						'Datetime' => array( 1, 3 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 2',
						'TKT_qty' => 2
					),
					'relations' => array(
						'Datetime' => array( 2 )
					)
				),
				3 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 3',
						'TKT_qty' => 2,
					),
					'relations' => array(
						'Datetime' => array( 1, 2 )
					)
				),
				4 => array(
					'fields' => array(
						'TKT_name' => 'Ticket 4',
						'TKT_qty' => 2
					),
					'relations' => array(
						'Datetime' => array( 1, 3 )
					)
				),
			)
		);

		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );
		// simulate two sales for ticket 3, which will also increase sold qty for D1 & D2
		if (
			isset( $build_objects['Ticket'], $build_objects['Ticket'][3] )
			&& $build_objects['Ticket'][3] instanceof EE_Ticket
		) {
			/** @type EE_Ticket $ticket */
			$ticket = $build_objects['Ticket'][3];
			$ticket->increase_sold( 2 );
		}
		//EEH_Debug_Tools::printr( $build_objects['Datetime'], 'Datetimes', __FILE__, __LINE__ );
		//assign the event object as the scenario object
		$this->_scenario_object = reset( $build_objects['Event'] );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}

}

// Location:/tests/includes/scenarios/EE_Event_Scenario_G.scenario.php
