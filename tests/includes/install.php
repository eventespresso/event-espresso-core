<?php
/**
 * Installs EE for the purpose of the unit-tests.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

error_reporting( E_ALL & ~E_DEPRECATED & ~E_STRICT );

$config_file_path = $argv[1];
$tests_dir_path = $argv[2];
$multisite = ! empty( $argv[3] );

require_once $config_file_path;
require_once $tests_dir_path . '/includes/functions.php';

function _load_event_espresso() {
	require dirname( dirname( dirname( __FILE__ ) ) ) . '/espresso.php';
}
tests_add_filter( 'muplugins_loaded', '_load_event_espresso' );

define( 'EE_PLUGIN_DIR', dirname( dirname( dirname( __FILE__ ) ) ) . '/' );
define( 'EE_ROOT_BLOG', 1 );

$_SERVER['SERVER_PROTOCOL'] = 'HTTP/1.1';
$_SERVER['HTTP_HOST'] = WP_TESTS_DOMAIN;
$PHP_SELF = $GLOBALS['PHP_SELF'] = $_SERVER['PHP_SELF'] = '/index.php';

require_once ABSPATH . '/wp-settings.php';

echo "Installing Event Espresso...\n";

$wpdb->query( 'SET storage_engine = INNODB' );
$wpdb->select( DB_NAME, $wpdb->dbh );

// Install Event Espresso using EEH_Activation
EEH_Activation::system_initialization();
EEH_Activation::initialize_db_and_folders();
EEH_Activation::initilaized_db_content();
