<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Three Datetimes
 *      - D1 - reg limit 5 (TA, TC)             << can sell 5 max (either 5 TA or 5 TC)
 *      - D2 - reg limit 20 (TA, TD, TB)        << can sell 15 max ( 5 TA/TC sold above + 5 TD + 10 TB )
 *      - D3 - reg limit EE_INF (TA, TC, TB)    << can't sell %$#@ cuz all tickets are shared with
 *                                                 other datetimes that are already at capacity.
 *                                                 selling even one ticket for this datetime,
 *                                                 could put other datetimes over capacity
 * - Four Tickets
 *      - TA - qty 5 (D1, D2, D3)
 *      - TB - qty 15 (D2,D3)
 *      - TC - qty 5 (D1, D3)
 *      - TD - qty 5 (D2)
 *
 *  MAX SELLOUT:
 *        D1 :  5 TA tickets  ( D1 sold out + TA & TC sold out )
 *        D2 :  5 TD tickets ( TD sold out )
 *        D2 : 10 TB tickets ( D1 sold out + TD & TB sold out )
 *        D3 : 0 tickets available ( TA, TC, TD, && TB sold out )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier
 */
class EE_Event_Scenario_F extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario F';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 20,
			'total_remaining_spaces' => 20
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				0 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT D' )
				)
			),
			'Datetime' => array(
				0 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 5
					),
					'relations' => array(
						'Event' => array( 0 )
					)
				),
				1 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 2',
						'DTT_reg_limit' => 20
					),
					'relations' => array(
						'Event' => array( 0 )
					)
				),
				2 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 3'
					),
					'relations' => array(
						'Event' => array( 0 )
					)
				),
			),
			'Ticket' => array(
				0 => array(
					'fields' => array(
						'TKT_name' => 'Ticket A',
						'TKT_qty' => 5
					),
					'relations' => array(
						'Datetime' => array( 0, 1, 2 )
					)
				),
				1 => array(
					'fields' => array(
						'TKT_name' => 'Ticket B',
						'TKT_qty' => 15
					),
					'relations' => array(
						'Datetime' => array( 1, 2 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' => 'Ticket C',
						'TKT_qty' => 5
					),
					'relations' => array(
						'Datetime' => array( 0, 2 )
					)
				),
				3 => array(
					'fields' => array(
						'TKT_name' => 'Ticket D',
						'TKT_qty' => 5
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
			)
		);

		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );

		//assign the event object as the scenario object
		$this->_scenario_object = reset( $build_objects['Event'] );
	}



	protected function _get_scenario_object(){
		return $this->_scenario_object;
	}
}
