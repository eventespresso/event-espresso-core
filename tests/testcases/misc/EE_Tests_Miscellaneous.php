<?php
/**
 * Contains test class for miscellaneous EE tests
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * This is just a miscellaneous test case class for EE to verify that tests work.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Tests_Miscellaneous extends EE_UnitTestCase {

	function test_version_check() {
		$this->assertTrue( espresso_version() >= '4.3.0.reg' );
	}

	/**
	 * note this should be moved to the system tests folder.
	 */
	function test_system_initialization() {
		$EE_SYS = EE_System::instance();
		$this->assertTrue( $EE_SYS instanceof EE_System );
	}
}
