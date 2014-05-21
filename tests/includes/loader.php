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
tests_add_filter( 'FHEE__EE_Session__construct__can_create_session', '__return_false' );

// Bootstrap EE
require dirname( __FILE__ ) . '/../../espresso.php';
