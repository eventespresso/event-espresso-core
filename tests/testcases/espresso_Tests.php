<?php
/**
 * Contains test class for espresso.php
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the espresso.php file.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class espresso_Tests extends EE_UnitTestCase {

	/**
	 * espresso_load_required is run automatically when the plugin is loaded.
	 *
	 * That means we should have the following files already loaded:
	 *  - EE_System
	 *  - EE_Debug_Tools
	 *  - EE_Error
	 *
	 * @since 4.3.0
	 */
	function test_espresso_load_required() {
		$this->assertTrue( class_exists( 'EE_System') );
		$this->assertTrue( class_exists( 'EEH_Debug_Tools') );
		$this->assertTrue( class_exists( 'EE_Error' ) );
	}
}
