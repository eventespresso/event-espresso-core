<?php
/**
 * Define constants needed by test suite.
 *
 * @since 		0.0.1.dev.002
 * @package 		EE4 Addon Skeleton
 * @subpackage 	Tests
 */

define( 'EE_PLUGIN_DIR', dirname( dirname( dirname( dirname(__FILE__ ) ) ) ) . '/event-espresso-core/');
define( 'EEADDON_TESTS_DIR', dirname( dirname( __FILE__ ) ) . '/'  );
define( 'EEADDON_PLUGIN_DIR' , dirname( dirname( dirname(__FILE__)  ) ). '/' );

if ( ! defined( 'EE_TESTS_DIR' ) ) {
	define( 'EE_TESTS_DIR', EE_PLUGIN_DIR .  'tests/' );
}

/**
 * In the pre-develop.svn WP development environment, an environmental bash
 * variable would be set to run PHP Unit tests. However, this has been done
 * away with in a post-develop.svn world. We'll still check if this variable
 * is set for backwards compat.
 */
if ( getenv( 'WP_TESTS_DIR' ) ) {
	define( 'WP_TESTS_DIR', getenv( 'WP_TESTS_DIR' ) );
	define( 'WP_ROOT_DIR', WP_TESTS_DIR );
} else {
	define( 'WP_ROOT_DIR', dirname( dirname( dirname( dirname( dirname( dirname( __DIR__ ) ) ) ) ) ) );
	define( 'WP_TESTS_DIR', WP_ROOT_DIR . '/tests/phpunit' );
}

// Based on the tests directory, look for a config file
if ( is_readable( WP_ROOT_DIR . '/wp-tests-config.php' ) ) {
	// Standard develop.svn.wordpress.org setup
	define( 'WP_TESTS_CONFIG_PATH', WP_ROOT_DIR . '/wp-tests-config.php' );

} else if ( is_readable( WP_TESTS_DIR . '/wp-tests-config.php' ) ) {
	// Legacy unit-test.svn.wordpress.org setup
	define( 'WP_TESTS_CONFIG_PATH', WP_TESTS_DIR . '/wp-tests-config.php' );

} else if ( is_readable( dirname( dirname( WP_TESTS_DIR ) ) . '/wp-tests-config.php' ) ) {
	// Environment variable exists and points to tests/phpunit of
	// develop.svn.wordpress.org setup
	define( 'WP_TESTS_CONFIG_PATH', dirname( dirname( WP_TESTS_DIR ) ) . '/wp-tests-config.php' );

} else {
	die( "wp-tests-config.php could not be found.\n" );
}
