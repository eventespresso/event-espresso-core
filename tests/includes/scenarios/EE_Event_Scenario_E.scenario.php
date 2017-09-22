<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an event that has:
 * - Four Datetimes
 *      - D1 - reg limit 55  ( TA, TB, TC, TD ) << can only sell 5 max : TA, TB, & TC sold out after 5 sales
 *      - D2 - reg limit 20  ( TA, TB )         << can only sell 8 max : TA, TB, & TC sold out after 5 sales
 *      - D3 - reg limit 12  ( TA, TD )         << can only sell 12 max : TA & TD sold out after 12 sales
 *      - D4 - reg limit 30  ( TB, TC, TD, TE ) << can only sell 5 max : TA, TB, & TC sold out after 5 sales
 * - Five Tickets
 *      - TA - qty 12 (D1, D2, D3)
 *      - TB - qty 20 (D1,D2,D4)
 *      - TC - qty 30 (D1, D4)
 *      - TD - qty 12 (D1, D3, D4)
 *      - TE - qty 30 (D4)
 *
 *  MAX SELLOUT:
 *        D3 : 12 TA tickets  ( D3 sold out + TA & TD sold out )
 *        D2 : 20 TB tickets ( D2 sold out + TB sold out )
 *        D1 : 30 TC tickets ( D2 & TB sold out )
 *        D4 : 30 TC tickets ( D2 & TB sold out )
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier
 */
class EE_Event_Scenario_E extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'event';
		$this->name = 'Event Scenario E';
		parent::__construct( $eetest );
	}

	protected function _set_up_expected(){
		$this->_expected_values = array(
			'total_available_spaces' => 42,
			'total_remaining_spaces' => 42
		);
	}


	protected function _set_up_scenario(){
		$build_artifact = array(
			'Event' => array(
				0 => array(
					'fields' => array( 'EVT_name' => 'Test Scenario EVT E' )
				)
			),
			'Datetime' => array(
				0 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 55
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
				3 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 4',
						'DTT_reg_limit' => 30
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
						'TKT_qty' => 12
					),
					'relations' => array(
						'Datetime' => array( 0, 1, 2 )
					)
				),
				1 => array(
					'fields' => array(
						'TKT_name' => 'Ticket B',
						'TKT_qty' => 20
					),
					'relations' => array(
						'Datetime' => array( 0, 1, 3 )
					)
				),
				2 => array(
					'fields' => array(
						'TKT_name' => 'Ticket C',
						'TKT_qty' => 30
					),
					'relations' => array(
						'Datetime' => array( 0, 3 )
					)
				),
				3 => array(
					'fields' => array(
						'TKT_name' => 'Ticket D',
						'TKT_qty' => 12
					),
					'relations' => array(
						'Datetime' => array( 0, 2, 3 )
					)
				),
				4 => array(
					'fields' => array(
						'TKT_name' => 'Ticket E',
						'TKT_qty' => 30
					),
					'relations' => array(
						'Datetime' => array( 3 )
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
