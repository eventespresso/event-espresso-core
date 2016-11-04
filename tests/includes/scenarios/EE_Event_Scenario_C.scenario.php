<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Two Datetimes
 *      - D1 - reg limit 15 	( TA, TB ) 			<< can only sell 15 max : Tickets A & B sold out after 15 sales
 *      - D2 - reg limit 17    	( TA, TB, TC ) 	<< can only sell 15 max : Tickets A & B sold out after 15 sales
 * - Three Tickets
 *      - TA - qty 23 	( D1, D2 )    << can only sell 15 max due to D1 reg limit ( which sells out Tickets A & B )
 *      - TB - qty 5 	( D1, D2 ) 	<< can only sell 5 max due to TB qty ( which sells out Tickets A & B )
 *      - TC - qty 15 	( D2 ) 			<< can only sell 15 max due to TC qty
 *
 *  MAX SELLOUT:
 *    	5 TB tickets for D1 ( TB sold out )
 * 		10 TA tickets for D1 ( D1 sold out = TA sold out )
 * 		2 TC tickets for D2 ( since 5 TB + 10 TA tickets have already been sold )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier
 */
class EE_Event_Scenario_C extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario C';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 17,
			'total_remaining_spaces' => 17
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(

			'Event' => array(
				0 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT C' )
				)
			),

			'Datetime' => array(
				0 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 15
					),
					'relations' => array(
						'Event' => array( 0 )
					)
				),
				1 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 2',
						'DTT_reg_limit' => 17
					),
					'relations' => array(
						'Event' => array( 0 )
					)
				)
			),

			'Ticket' => array(
				0 => array(
					'fields' => array(
						'TKT_name' => 'Ticket A',
						'TKT_qty' => 23
					),
					'relations' => array(
						'Datetime' => array( 0, 1 )
					)
				),
				1 => array(
					'fields' => array(
						'TKT_name' => 'Ticket B',
						'TKT_qty' => 5
					),
					'relations' => array(
						'Datetime' => array( 0, 1 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' => 'Ticket C',
						'TKT_qty' => 15
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				)
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