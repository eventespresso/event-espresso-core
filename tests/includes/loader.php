<?php
/**
 * Loader for EE Unit Tests initializes plugin and gets thing off to a start.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * Filter testsbypass so that every time PHPUnit is ran, we setup EE properly as
 * if it were an activation.
 *
 * @since 4.3.0
 *
 */
tests_add_filter('FHEE__EE_System__detect_if_activation_or_upgrade__testsbypass', '__return_true');

//make sure EE_session does not load
tests_add_filter( 'FHEE_load_EE_Session', '__return_false' );
// and don't set cookies
tests_add_filter( 'FHEE__EE_Front_Controller____construct__set_test_cookie', '__return_false' );

tests_add_filter( 'FHEE__EE_Error__get_error__show_normal_exceptions', '__return_true');

//IF we detect we're running tests on WP4.1, then we need to make sure current_user_can tests pass by implementing
//updating all_caps when `WP_User::add_cap` is run (which is fixed in later wp versions).  So we hook into the
// 'user_has_cap' filter to do this
$_wp_test_version = getenv( 'WP_VERSION' );
if ( $_wp_test_version && $_wp_test_version == '4.1' ) {
	tests_add_filter( 'user_has_cap', function ( $all_caps, $caps, $args, $WP_User ) {
		$WP_User->get_role_caps();

		return $WP_User->all_caps;
	}, 10, 4 );
}

// Bootstrap EE
require dirname( __FILE__ ) . '/../../espresso.php';
