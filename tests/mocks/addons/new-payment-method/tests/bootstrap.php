<?php
/**
 * Bootstrap for EE4 Addon Skeleton Unit Tests
 *
 * @since 		0.0.1.dev.002
 * @package 		EE4 Addon Skeleton
 * @subpackage 	Tests
 */

require( dirname( __FILE__ ) . '/includes/define-constants.php' );
if ( ! is_readable( WP_TESTS_DIR . '/includes/functions.php' ) ) {
	die( "The WordPress PHPUnit test suite could not be found.\n" );
}

require_once WP_TESTS_DIR . '/includes/functions.php';

function _install_and_load_core_and_ee_promos() {
	require EE_TESTS_DIR . 'includes/loader.php';
	require EEADDON_TESTS_DIR . 'includes/loader.php';
}
tests_add_filter( 'muplugins_loaded', '_install_and_load_core_and_ee_promos' );

require WP_TESTS_DIR . '/includes/bootstrap.php';

//Load the EE_specific testing tools
require EE_TESTS_DIR . 'includes/EE_UnitTestCase.class.php';
