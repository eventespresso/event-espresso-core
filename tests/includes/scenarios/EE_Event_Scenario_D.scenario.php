<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Three Datetimes (in order of increasing reg limit)
 *      - D1 - reg limit 5  ( TA, TB, TC )  << can only sell 5 max (cuz ticket qty) : TA, TB, & TC sold out after 5 sales
 *      - D3 - reg limit 12 ( TA, TC, TD )  << can only sell 7 max (5 TA/TC sold already) : TD sold out after 7 sales
 *      - D2 - reg limit 20 ( TA, TB, TD )  << can't sell #$@!$ cuz all tickets are sold out
 * - Four Tickets
 *      - TA - qty 5 	( D1, D2, D3 )
 *      - TB - qty 5 	( D1, D2 )
 *      - TC - qty 5 	( D1, D3 )
 *      - TD - qty 10 	( D2, D3 )
 *
 *  MAX SELLOUT:
 *        5 TA tickets for D1 ( D1 sold out + TA, TB, & TC sold out )
 *        7 TD tickets for D3 ( TD sold out (cuz TA has access and sold 5))
 *        ( D2 sold out because ALL tickets sold out )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier
 */
class EE_Event_Scenario_D extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario D';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 12,
			'total_remaining_spaces' => 12
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
						'DTT_name' => 'Datetime 3',
						'DTT_reg_limit' => 12
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
						'TKT_qty' => 5
					),
					'relations' => array(
						'Datetime' => array( 0, 1 )
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
						'TKT_qty' => 10
					),
					'relations' => array(
						'Datetime' => array( 1, 2 )
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
