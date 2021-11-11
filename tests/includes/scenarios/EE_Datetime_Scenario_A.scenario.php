<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * This scenario creates an Datetime that is attached to three tickets and two of those tickets have other datetimes:
 * - Three Datetimes
 *      - D1 (datetime returned from this class) - reg limit 5, DTT_sold = 5
 *      - D2 - reg limit 20, DTT_sold = 3
 *      - D3 - reg limit 3, DTT_sold = 3
 * - Four Tickets
 *      - TA - qty EE_INF (D1, D2, D3), TKT_sold = 3
 *      - TB - qty 15 (D1,D2), TKT_sold = 0
 *      - TC - qty 20 (D1), TKT_sold = 2
 *
 * @package    Event Espresso
 * @subpackage tests/scenarios
 * @author     Darren Ethier
 */
class EE_Datetime_Scenario_A extends EE_Test_Scenario {

	public function __construct( EE_UnitTestCase $eetest ) {
		$this->type = 'datetime';
		$this->name = 'Datetime Scenario A';
		parent::__construct( $eetest );
	}


	protected function _set_up_expected() {
		// array of Datetime IDs => available ticket quantities
		$this->_expected_values = array(
			'sum_tickets_currently_available_at_datetime' => 0,
			'datetime_id_to_tickets_map' => array(
				1 => 0,
				2 => 0,
				3 => 0,
			),
		);
	}


	protected function _set_up_scenario() {
		$build_artifact = array(
			'Datetime' => array(
				1 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 1',
						'DTT_reg_limit' => 5,
					)
				),
				2 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 2',
						'DTT_reg_limit' => 20,
					)
				),
				3 => array(
					'fields' => array(
						'DTT_name' => 'Datetime 3',
						'DTT_reg_limit' => 3,
					)
				)
			),
			'Ticket' => array(
				'A' => array(
					'fields' => array(
						'TKT_name' => 'Ticket A',
						'TKT_qty' => EE_INF,
						'TKT_sold' => 3,
					),
					'relations' => array(
						'Datetime' => array( 1, 2, 3 )
					)
				),
				'B' => array(
					'fields' => array(
						'TKT_name' => 'Ticket B',
						'TKT_qty' => 15,
						'TKT_sold' => 0,
					),
					'relations' => array(
						'Datetime' => array( 1, 2 )
					)
				),
				'C' => array(
					'fields' => array(
						'TKT_name' => 'Ticket C',
						'TKT_qty' => 20,
						'TKT_sold' => 2,
					),
					'relations' => array(
						'Datetime' => array( 1 )
					)
				),
			),
		);
		$build_objects = $this->_eeTest->factory->complex_factory->build( $build_artifact );
		//assign the first datetime object as the scenario object (it's the one that will be used for tests.
		$this->_scenario_object = reset( $build_objects['Datetime'] );
	}


	protected function _get_scenario_object() {
		return $this->_scenario_object;
	}
}