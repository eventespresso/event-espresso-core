<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * This is the abstract parent for all test scenario classes.  It provides a common structure
 * for creating specific test scenarios that can then be used in various tests.
 *
 * Test Scenarios are less "unit-y" tests and more "system" or "integration" type tests.  Typically a test scenario
 * is used for testing specific setups.
 *
 * @package		Event Espresso
 * @subpackage  tests
 * @author	    Darren Ethier
 *
 */
abstract class EE_Test_Scenario {

	/**
	 * Holds the expected values that are registered for the scenario.
	 * Index is a description of what the expected value is (i.e. count_of_registrations).
	 * The indexes are arbitrary per scenario but helps keep things well defined.
	 * @var array
	 */
	protected $_expected_values = array();


	/**
	 * This usually corresponds to the class name (without the EE prefix) that the scenario
	 * represents (i.e. "Event", or "Registration).
	 * @var string
	 */
	public $type;


	/**
	 * This corresponds to a way of identifying the scenario (i.e. "Event Test A")
	 *
	 * @var string
	 */
	public $name;


	/**
	 * This is used to flag whether a test scenario has been initialized or not.
	 *
	 * @var bool
	 */
	protected $_initialized = false;


	/**
	 * This contains the data returned by get_object().  Typically this is something that test cases need for
	 * setting up a test.
	 * @var mixed
	 */
	protected $_scenario_object;


	/**
	 * @var EE_UnitTestCase
	 */
	protected $_eeTest;


	/**
	 * @var bool
	 */
	protected $_skip = false;



	/**
	 * Instantiates the scenario class and sets up basic properties.
	 * @param \EE_UnitTestCase $eeTest
	 */
	public function __construct( EE_UnitTestCase $eeTest ) {
		//verify properties set
		$this->type = empty( $this->type ) ? 'Unknown' : $this->type;
		$this->name = empty( $this->name ) ? get_class( $this ) : $this->name;
		$this->_eeTest = $eeTest;
	}


	/**
	 * Add an expected key/value pair to the $expected property.
	 *
	 * @param string $key a reference for the expected $key
	 * @param mixed  $value the expected value.
	 */
	public function add_expected( $key, $value ) {
		$this->_expected_values[$key] = $value;
	}


	/**
	 * Returns whether the scenario has been initialized or not.
	 * @return bool
	 */
	public function is_initialized() {
		return $this->_initialized;
	}


	/**
	 * Used to initialize the scenario (does nothing if its been initialized.
	 */
	public function initialize() {
		if ( $this->is_initialized() ) {
			return;
		}
		$this->_set_up_scenario();
		$this->_set_up_expected();
		$this->_initialized = true;
	}


	/**
	 * Reset the scenario to non-initialized state.  Note this does not do any cleanup
	 */
	public function reset() {
		$this->_initialized = false;
		$this->_scenario_object = null;
	}





	/**
	 * Used to retrieve the expected value for a given key on the scenario.
	 *
	 * @param string $key
	 * @return mixed
	 */
	public function get_expected( $key ) {
		return isset( $this->_expected_values[$key] ) ? $this->_expected_values[$key] : false;
	}




	/**
	 * Return the test_scenario_object
	 * @return mixed
	 */
	public function get_scenario_object() {
		if ( ! empty( $this->_scenario_object) ) {
			return $this->_scenario_object;
		}
		$this->_scenario_object = $this->_get_scenario_object();
		return $this->_scenario_object;
	}



	/**
	 * simulate six sales for an event's ticket, which will also increase sold qty for D1 & D2
	 *
	 * @param \EE_Ticket $ticket
	 * @param int $qty
	 * @throws \EE_Error
	 */
	protected function _sell_tickets( EE_Ticket $ticket, $qty = 1 ) {
		if ( $ticket instanceof EE_Ticket ) {
			$transaction = EE_Transaction::new_instance(
				array(
					'STS_ID'        => EEM_Transaction::complete_status_code,
					'TXN_timestamp' => time() - DAY_IN_SECONDS,
					'TXN_total'     => 0,
					'TXN_paid'      => 0,
				)
			);
			$transaction->save();
			for ( $x = 1; $x <= $qty; $x++ ) {
				$registration = EE_Registration::new_instance(
					array(
						'STS_ID'   => EEM_Registration::status_id_pending_payment,
						'REG_date' => time() - DAY_IN_SECONDS,
						'REG_code' => $transaction->ID() . "-" . $ticket->ID() . "-$x-test",
						'TXN_ID'   => $transaction->ID(),
						'EVT_ID'   => $ticket->get_event_ID(),
						'TKT_ID'   => $ticket->ID(),
					)
				);
				$registration->save();
				// upgrade status to RAP so that ticket and datetime sold values get incremented
				$registration->set_status( EEM_Registration::status_id_approved );
				$registration->save();
			}
		}
	}



	/**
	 * @return boolean
	 */
	public function skip() {
		return $this->_skip;
	}



	/**
	 * Child classes are required to setup the initial "expected" property.
	 *
	 */
	abstract protected function _set_up_expected();



	/**
	 * This method should contain all the code for setting up the scenario.
	 */
	abstract protected function _set_up_scenario();


	/**
	 * Used to return the main object(s) being setup for the test scenario.
	 * Test cases will likely want access to this for setting up the test!
	 * @return object | object[]
	 */
	abstract protected function _get_scenario_object();



	/**
	 * Can be overridden in child classes for doing additional "stuff" during tests.
	 *
	 * @param array $arguments
	 */
	public function run_additional_logic( $arguments = array() ) {
	}


}


/**
 * This is used to store the EE_Test_Scenario collection for use by unit test cases.
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 */
class EE_Test_Scenario_Collection extends EE_Object_Collection {


	public function __construct() {
		$this->interface = 'EE_Test_Scenario';
	}



	/**
	 * @param \EE_Test_Scenario $test_scenario
	 * @return bool
	 */
	public function add_test_scenario( EE_Test_Scenario $test_scenario ) {
		return $this->add( $test_scenario, array(
			'type' => $test_scenario->type,
			'name' => $test_scenario->name
		) );
	}



	/**
	 * @param string $type
	 * @return array
	 */
	public function get_scenarios_by_type( $type ) {
		return $this->getObjectByInfoArray( $type, 'type' );
	}



	/**
	 * @param string $name
	 * @return mixed
	 */
	public function get_scenario_by_name( $name ) {
		$objects = $this->getObjectByInfoArray( $name, 'name' );
		return reset( $objects );
	}


	/**
	 * @param mixed $info  The value to check for.
	 * @param $key
	 *
	 * @return array
	 */
	protected function getObjectByInfoArray( $info, $key ) {
		$objects = array();
		$this->rewind();
		while( $this->valid() ) {
			$currentInfo = $this->getInfo();
			if ( ! is_array( $currentInfo ) ) {
				$this->next();
				continue;
			}
			if ( isset( $currentInfo[$key] ) && $currentInfo[$key] === $info ) {
				$objects[] = $this->current();
				$this->next();
				continue;
			}
			$this->next();
		}
		$this->rewind();
		return $objects;
	}

}


/**
 * This checks for all test scenarios in the tests/includes/scenarios/ folder
 * and adds them to the EE_Test_Scenario repository.
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 */
class EE_Test_Scenario_Factory {

	/**
	 * This will hold the collection containing all the test scenarios.
	 * @var EE_Test_Scenario_Collection
	 */
	protected $_collection;


	/**
	 * @var EE_UnitTestCase
	 */
	protected $_eeTest;



	public function __construct( EE_UnitTestCase $eeTest ) {
		$this->_eeTest = $eeTest;
	}


	protected function _build_scenarios() {
		$scenario_files = glob( EE_TESTS_DIR . 'includes/scenarios/*.scenario.php' );

		if ( ! empty( $scenario_files ) ) {
			foreach ( $scenario_files as $scenario_file ) {
				require_once $scenario_file;
				$class_name = str_replace( '.scenario.php', '', basename( $scenario_file ) );
				if ( class_exists( $class_name ) ) {
					$scenario = new $class_name( $this->_eeTest );
					$this->_collection->add_test_scenario( $scenario );
				}
			}
		}
	}


	/**
	 * This returns the EE_Test_Scenario collection
	 * @return EE_Test_Scenario_Collection
	 */
	public function get_collection() {
		if ( ! $this->_collection instanceof EE_Test_Scenario_Collection ) {
			$this->_collection = new EE_Test_Scenario_Collection();
			$this->_build_scenarios();
		}
		return $this->_collection;
	}


	/**
	 * Return specific scenarios by type.
	 *
	 * @param string $type  Type represents the type of EE_Test_Scenarios to return.
	 * @param bool $initialize Whether to initialize the scenarios or just return them uninitialized. (default is to
	 *                         initialize)
	 *
	 * @return EE_Test_Scenario[]
	 */
	public function get_scenarios_by_type( $type, $initialize = true ) {
		$this->get_collection();
		$scenarios = $this->_collection->get_scenarios_by_type( $type );
		if ( $scenarios && $initialize) {
			foreach ( $scenarios as $scenario ) {
				if ( $scenario instanceof EE_Test_Scenario ) {
					$scenario->initialize();
				}
			}
		}
		return $scenarios;
	}


	/**
	 * Return specific scenario by name;
	 *
	 * @param string $name  The specific name to return the scenario for.
	 * @param bool $initialize  Whether to initialize the scenarios or just return them uninitialized. (default is to
	 *                          initialize).
	 * @return EE_Test_Scenario
	 */
	public function get_scenario_by_name( $name, $initialize = true ) {
		$this->get_collection();
		$scenario = $this->_collection->get_scenario_by_name( $name );
		if ( $scenario instanceof EE_Test_Scenario && $initialize ) {
			$scenario->initialize();
		}
		return $scenario;
	}

}