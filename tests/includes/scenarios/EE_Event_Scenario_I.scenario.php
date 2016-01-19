<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - One Datetime
 *      - D1 - reg limit 25 	( T1, T2, T3, T4 ) 	<< can sell 25 max
 * - Four Tickets
 *      - T1 - qty 6 ( D1 ) 	<< can only sell 6 max due to TKT qty
 *      - T2 - qty 6 ( D1 ) 	<< can only sell 6 max due to TKT qty
 *      - T3 - qty 6 ( D1 ) 	<< can only sell 6 max due to TKT qty
 *      - T4 - qty 6 ( D1 ) 	<< can only sell 6 max due to TKT qty
 *
*@package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier / Brent Christensen
 */
class EE_Event_Scenario_I extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario I - Four Tickets One Date';
		$this->_skip = true;
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 24,
			'total_remaining_spaces' => 24,
			'total_remaining_spaces_20' => 20,
			'total_remaining_spaces_16' => 16,
			'total_remaining_spaces_12' => 12,
			'total_remaining_spaces_8' => 8,
			'total_remaining_spaces_4' => 4,
			'total_remaining_spaces_0' => 0,
		);
	}



	/**
	 * @throws \Exception
	 */
	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				1 => array(
					'fields' => array(
						'EVT_name' 	=> 'Test Scenario EVT H - Four Tickets One Date',
						'status' 	=> 'publish',
					)
				)
			),
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' 		=> 'D1',
						'DTT_EVT_start' => time() + ( 7 * DAY_IN_SECONDS ),
						'DTT_EVT_end' 	=> time() + ( 7.5 * DAY_IN_SECONDS ),
						'DTT_reg_limit' => 25,
						'DTT_sold' 		=> 0,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
			),
			'Ticket' => array(
				1 => array(
					'fields' => array(
						'TKT_name' 	=> 'Ticket 1',
						'TKT_qty' 	=> 6,
						'TKT_sold' 	=> 0,
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' 	=> 'Ticket 2',
						'TKT_qty' 	=> 6,
						'TKT_sold' 	=> 0,
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
				3 => array(
					'fields' => array(
						'TKT_name' 	=> 'Ticket 3',
						'TKT_qty' 	=> 6,
						'TKT_sold' 	=> 0,
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
				4 => array(
					'fields' => array(
						'TKT_name' 	=> 'Ticket 4',
						'TKT_qty' 	=> 6,
						'TKT_sold' 	=> 0,
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
			),
		);

		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );
		//assign the event object as the scenario object
		$this->_scenario_object = reset( $build_objects['Event'] );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}



	/**
	 * @param int $tkt_id
	 * @return \EE_Ticket|null
	 */
	protected function _get_event_ticket( $tkt_id = 0 ) {
		$ticket = null;
		if ( $this->_scenario_object instanceof EE_Event ) {
			$tickets = $this->_scenario_object->tickets();
			foreach ( $tickets as $tkt ) {
				if ( $tkt instanceof EE_Ticket ) {
					$ticket = $tkt->name() === 'Ticket ' . $tkt_id ? $tkt : $ticket;
				}
			}
		}
		return $ticket;
	}



	/**
	 * run_additional_logic
	 *
	 * @param array $arguments
	 */
	public function run_additional_logic( $arguments = array() ) {
		$qty = isset( $arguments['qty'] ) ? $arguments[ 'qty' ] : 0;
		$tkt_id = isset( $arguments['tkt_id'] ) ? $arguments[ 'tkt_id' ] : 0;
		if ( $qty && $tkt_id ) {
			$this->_sell_tickets( $this->_get_event_ticket( $tkt_id ), $qty );
		}
	}


}

// Location:/tests/includes/scenarios/EE_Event_Scenario_H.scenario.php