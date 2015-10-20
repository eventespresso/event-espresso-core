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
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 12,
			'total_remaining_spaces' => 6,
			'total_remaining_spaces_2' => 0,
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				1 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT H - Two Classes' )
				)
			),
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' => 'Class 1 of 2',
						'DTT_reg_limit' => 12,
					),
					'relations' => array(
						'Event' => array( 1 )
					)
				),
				2 => array(
					'fields' => array(
						'DTT_name' => 'Class 2 of 2',
						'DTT_reg_limit' => 12,
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
						'TKT_qty' => 12,
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
		$this->_sell_tickets( 6 );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}



	/**
	 * simulate six sales for the ticket, which will also increase sold qty for D1 & D2
	 *
	 * @param int $qty
	 */
	protected function _sell_tickets( $qty = 1 ) {

		$event = $this->_scenario_object;
		if ( $event instanceof EE_Event ) {
			$transaction = EE_Transaction::new_instance(
				array(
					'STS_ID'        => EEM_Transaction::complete_status_code,
					'TXN_timestamp' => time() - DAY_IN_SECONDS,
					'TXN_total'     => 0,
					'TXN_paid'      => 0,
				)
			);
			$transaction->save();
			$tickets = $event->tickets();
			$ticket = reset( $tickets );
			if ( $ticket instanceof EE_Ticket ) {
				for ( $x = 1; $x <= $qty; $x++ ) {
					$registration = EE_Registration::new_instance(
						array(
							'STS_ID'   => EEM_Registration::status_id_approved,
							'REG_date' => time() - DAY_IN_SECONDS,
							'REG_code' => $x . '-2-1-eieio',
							'TXN_ID'   => $transaction->ID(),
							'EVT_ID'   => $event->ID(),
							'TKT_ID'   => $ticket->ID(),
						)
					);
					$registration->save();
				}
				$event->save();
			}
		}
	}



	/**
	 * run_additional_logic
	 *
	 * @param array $arguments
	 */
	public function run_additional_logic( $arguments = array() ) {
		$qty = isset( $arguments['qty'] ) ? $arguments[ 'qty' ] : 6;
		$this->_sell_tickets( $qty );
	}


}

// Location:/tests/includes/scenarios/EE_Event_Scenario_H.scenario.php