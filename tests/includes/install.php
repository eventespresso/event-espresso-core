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


/**
 * Do the testsbypass filter for when EE is loaded so that we get db setup.  Need to make sure this
 * ONLY runs here on initial install of db.  We can simply do a check for a EE db to know if we bypass or
 * not.
 *
 * @since 4.3.0
 *
 */
function _maybe_bypass_for_tests() {
	global $wpdb;
	//let's check if EE Table exists.  If it does then we do a bypass of is_admin() and user_logged_in check AND we set the $request_type to new_activation.
	$table_name = $wpdb->prefix . "esp_country";
	if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
		return TRUE;
	}
	return FALSE; //table exists load things normally.
}
tests_add_filter('AHEE__EE_System__detect_if_activation_or_upgrade__begin', '_force_activation');

define( 'EE_PLUGIN_DIR', dirname( dirname( dirname( __FILE__ ) ) ) . '/' );
define( 'EE_ROOT_BLOG', 1 );

$_SERVER['SERVER_PROTOCOL'] = 'HTTP/1.1';
$_SERVER['HTTP_HOST'] = WP_TESTS_DOMAIN;
$PHP_SELF = $GLOBALS['PHP_SELF'] = $_SERVER['PHP_SELF'] = '/index.php';

require_once ABSPATH . '/wp-settings.php';

echo "Installing Event Espresso...\n";

$wpdb->query( 'SET storage_engine = INNODB' );
$wpdb->select( DB_NAME, $wpdb->dbh );
