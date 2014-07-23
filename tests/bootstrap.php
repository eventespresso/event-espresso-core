<?php
/**
 * Bootstrap for EE Unit Tests
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	Tests
 */

require( dirname( __FILE__ ) . '/includes/define-constants.php' );
if ( ! file_exists( WP_TESTS_DIR . '/includes/functions.php' ) ) {
	die( "The WordPress PHPUnit test suite could not be found.\n" );
}

require_once WP_TESTS_DIR . '/includes/functions.php';

function _install_and_load_event_espresso() {
	require EE_TESTS_DIR . 'includes/loader.php';
}
tests_add_filter( 'muplugins_loaded', '_install_and_load_event_espresso' );

require WP_TESTS_DIR . '/includes/bootstrap.php';

//Load the EE_specific testing tools
require EE_TESTS_DIR . 'includes/EE_UnitTestCase.class.php';
