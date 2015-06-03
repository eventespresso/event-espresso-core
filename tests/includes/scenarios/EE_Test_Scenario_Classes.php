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
	 * This contains the data returned by get_object().  Typically this is somethign that test cases need for
	 * setting up a test.
	 * @var mixed
	 */
	protected $_scenario_object;


	/**
	 * Instantiates the scenario class and sets up basic properties.
	 */
	public function __construct() {
		//verify properties set
		$this->type = empty( $this->type ) ? 'Unknown' : $this->type;
		$this->name = empty( $this->name ) ? get_class( $this ) : $this->name;
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
	 * Used to initialize the scenario (does nothing if its beein initialized.
	 */
	public function initialize() {
		if ( ! $this->is_initalized() ) {
			return;
		}
		$this->_set_up_scenario();
		$this->_set_up_expected();
		$this->_initialized = true;
	}


	/**
	 * Reset the scenario to non-initalized state.  Note this does not do any cleanup
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
		return isset( $this->_expected_values[$key] ) ? $this->_expected_values[$key] : null;
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

}


/**
 * This is used to store the EE_Test_Scenario collection for use by unit test cases.
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 */
class EE_Test_Scenario_Repository extends EE_Object_Repository {


	public function add_test_scenario( EE_Test_Scenario $test_scenario ) {
		return $this->addObject( $test_scenario, array(
			'type' => $test_scenario->type,
			'name' => $test_scenario->name
		) );
	}

	public function get_scenarios_by_type( $type ) {
		return $this->getObjectByInfo( $type, 'type' );
	}


	public function get_scenario_by_name( $name ) {
		return reset( $this->getObjectByInfo( $name, 'name' ) );
	}


	/**
	 * @param mixed $info  The value to check for.
	 * @param $key
	 *
	 * @return array | object
	 */
	protected function getObjectByInfo( $info, $key ) {
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
			}
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
	 * This will hold the repository containing all the test scenario collections.
	 * @var EE_Test_Scenario_Repository
	 */
	protected $_repository;

	public function __construct() {
		$this->_repository = new EE_Test_Scenario_Repository();
	}


	protected function _build_scenarios() {
		$scenario_files = glob( EE_TESTS_DIR . 'includes/scenarios/*.scenario.php' );

		if ( ! empty( $scenario_files ) ) {
			foreach ( $scenario_files as $scenario_file ) {
				require $scenario_file;
				$class_name = str_replace( '.scenario.php', '', $scenario_file );
				if ( class_exists( $class_name ) ) {
					$this->_repository->add_test_scenario( new $class_name );
				}
			}
		}
	}


	/**
	 * This returns the EE_Test_Scenario collection
	 * @return EE_Test_Scenario_Repository
	 */
	public function get_repository() {
		if ( empty( $this->_repository ) ) {
			$this->_build_scenarios();
		}
		return $this->_repository;
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
		$this->get_repository();
		$scenarios = $this->_repository->get_scenarios_by_type( $type );
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
		$this->get_repository();
		$scenario = $this->_repository->get_scenario_by_name( $name );
		if ( $scenario instanceof EE_Test_Scenario && $initialize ) {
			$scenario->initialize();
		}
		return $scenario;
	}

}