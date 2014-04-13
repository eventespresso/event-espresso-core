<?php
/**
 * EE's extension of WP_UnitTestCase for writing all EE_Tests
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

require_once EE_TESTS_DIR . 'includes/factory.php';


/**
 * This is used to override any existing WP_UnitTestCase methods that need specific handling in EE.  We
 * can also add additional methods in here for EE tests (that are used frequently)
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_UnitTestCase extends WP_UnitTestCase {

	public function setUp() {
		parent::setUp();


		//any necessary setup stuff including making sure all EE tables are empty should be done here.


		//factor
		$this->factory = new EE_UnitTest_Factory;

	}

}
