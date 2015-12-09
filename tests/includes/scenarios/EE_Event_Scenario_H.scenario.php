<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Two Datetimes
 *      - D1 - reg limit 12 	( T1 ) 	<< can only sell 12 max : Ticket 1 sold out after 12 sales
 *      - D2 - reg limit 12 	( T1 ) 	<< can only sell 12 max : Ticket 1 sold out after 12 sales
 * - One Tickets
 *      - T1 - qty 12 ( D1, D2 ) 	<< can only sell 12 max due to TKT qty
 *
*@package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier / Brent Christensen
 */
class EE_Event_Scenario_H extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario H - Two Classes';
		$this->_skip = true;
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 12,
			'total_remaining_spaces' => 6,
			'total_remaining_spaces_4' => 4,
			'total_remaining_spaces_2' => 2,
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
						'EVT_name' 	=> 'Test Scenario EVT H - Two Classes',
						'status' 	=> 'publish',
					)
				)
			),
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' 		=> 'Class 1 of 2',
						'DTT_EVT_start' => time() + ( 7 * DAY_IN_SECONDS ),
						'DTT_EVT_end' 	=> time() + ( 7.5 * DAY_IN_SECONDS ),
						'DTT_reg_limit' => 12,
						'DTT_sold' 		=> 0,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
				2 => array(
					'fields' => array(
						'DTT_name' 		=> 'Class 2 of 2',
						'DTT_EVT_start' => time() + ( 14 * DAY_IN_SECONDS ),
						'DTT_EVT_end'   => time() + ( 14.5 * DAY_IN_SECONDS ),
						'DTT_reg_limit' => 12,
						'DTT_sold' 		=> 0,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				)
			),
			'Ticket' => array(
				1 => array(
					'fields' => array(
						'TKT_name' 	=> 'Ticket 1',
						'TKT_qty' 	=> 12,
						'TKT_sold' 	=> 0,
					),
					'relations' => array(
						'Datetime' => array( 1, 2 )
					)
				),
			),
		);

		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );
		//assign the event object as the scenario object
		$this->_scenario_object = reset( $build_objects['Event'] );
		$this->_sell_tickets( $this->_get_event_ticket() , 6 );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}



	/**
	 * @return EE_Ticket|null
	 */
	protected function _get_event_ticket() {
		$ticket = null;
		if ( $this->_scenario_object instanceof EE_Event ) {
			$tickets = $this->_scenario_object->tickets();
			$ticket = reset( $tickets );
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
		if ( $qty ) {
			$this->_sell_tickets( $this->_get_event_ticket(), $qty );
		}
	}


}

// Location:/tests/includes/scenarios/EE_Event_Scenario_H.scenario.php