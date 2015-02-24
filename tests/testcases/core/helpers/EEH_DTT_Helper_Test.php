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

		// TEST 1: retrieval of WP timezone string
		$expected_timezone_string = get_option( 'timezone_string' );
		$timezone_string = EEH_DTT_Helper::get_valid_timezone_string();
		$this->assertEquals( $timezone_string, $expected_timezone_string );

		// TEST 2: retrieval of specific timezone string
		$expected_timezone_string = 'America/Vancouver';
		$timezone_string = EEH_DTT_Helper::get_valid_timezone_string( $expected_timezone_string );
		$this->assertEquals( $timezone_string, $expected_timezone_string );

		// TEST 3: bogus timezone string
		$expected_timezone_string = 'i got funky pants and like to dance';
		try {
			$timezone_string = EEH_DTT_Helper::get_valid_timezone_string( $expected_timezone_string );
			$this->fail( sprintf( __( 'The timezone string %1$s should have thrown an Exception, but did not!', 'event_espresso' ), $timezone_string ));
		} catch( EE_Error $e ) {
			$this->assertTrue( true );
		}

		// TEST 4: gmt offsets
		$orig_timezone_string = get_option( 'timezone_string' );
		$orig_gmt_offset = get_option( 'gmt_offset' );
		// set timezone string to empty string
		update_option( 'timezone_string', '' );
		$offset_range = array (
			-12, -11.5, -11, -10.5, -10, -9.5, -9, -8.5, -8, -7.5, -7, -6.5, -6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0,
			0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 5.75, 6, 6.5, 7, 7.5, 8, 8.5, 8.75, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.75, 13, 13.75, 14
		);
		foreach ( $offset_range as $offset ) {
			update_option( 'gmt_offset', $offset );
			try {
				EEH_DTT_Helper::get_valid_timezone_string();
				$this->assertTrue( true );
			} catch( EE_Error $e ) {
				$offset_name = $offset >= 0 ? '+' . $offset : (string) $offset;
				$offset_name = str_replace( array( '.25','.5','.75' ), array( ':15',':30',':45' ), $offset_name );
				$offset_name = 'UTC' . $offset_name;
				$this->fail( sprintf( __( 'The WP GMT offset setting %1$s has thrown an Exception, but should not have!', 'event_espresso' ), $offset_name ));
			}
		}
		update_option( 'timezone_string', $orig_timezone_string );
		update_option( 'gmt_offset', $orig_gmt_offset );
	}


}
// End of file EEH_DTT_Helper_Test.php
// Location: /EEH_DTT_Helper_Test.php