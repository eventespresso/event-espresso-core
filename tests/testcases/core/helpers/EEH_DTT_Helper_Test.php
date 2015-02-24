<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 *
 * EEH_DTT_Helper_Test
 *
 * @package 			Event Espresso
 * @subpackage 	tests
 * @author				Brent Christensen
 *
 */
class EEH_DTT_Helper_Test extends EE_UnitTestCase {

	static function setUpBeforeClass() {
		EE_Registry::instance()->load_helper('DTT_Helper');
	}



	function test_get_valid_timezone_string() {
		// test retrieval of WP timezone string
		$wp_timezone_string = get_option( 'timezone_string' );
		$timezone_string = EEH_DTT_Helper::get_valid_timezone_string();
		$this->assertEquals( $timezone_string, $wp_timezone_string );
	}


}
// End of file EEH_DTT_Helper_Test.php
// Location: /EEH_DTT_Helper_Test.php