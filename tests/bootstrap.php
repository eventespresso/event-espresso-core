<?php
/**
 * Bootstrap for EE Unit Tests
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	Tests
 */
require( dirname( __FILE__ ) . '/includes/define-constants.php' );
// load PSR4 autoloader
require_once( EE_PLUGIN_DIR . 'core/Psr4Autoloader.php' );
if ( ! file_exists( WP_TESTS_DIR . '/includes/functions.php' ) ) {
	die( "The WordPress PHPUnit test suite could not be found.\n" );
}

require_once WP_TESTS_DIR . '/includes/functions.php';

function _install_and_load_event_espresso() {
	require EE_TESTS_DIR . 'includes/loader.php';
}
tests_add_filter( 'muplugins_loaded', '_install_and_load_event_espresso' );

require WP_TESTS_DIR . '/includes/bootstrap.php';
require_once( EE_CORE . 'EE_Dependency_Map.core.php' );
require_once( EE_CORE . 'request_stack' . DS . 'EE_Request.core.php' );
require_once( EE_CORE . 'request_stack' . DS . 'EE_Response.core.php' );
EE_Dependency_Map::instance( new EE_Request( $_GET, $_POST, $_COOKIE ), new EE_Response() );
add_filter(
	'FHEE__EE_Registry____construct___class_abbreviations',
	function( $class_abbreviations = array() ) {
		$class_abbreviations['EE_Session_Mock'] = 'SSN';
		return $class_abbreviations;
	}
);
add_filter(
	'FHEE__EE_Registry__load_core__core_paths',
	function( $core_paths = array() ) {
		$core_paths[] = EE_TESTS_DIR . 'mocks' . DS . 'core' . DS;
		return $core_paths;
	}
);
EE_Dependency_Map::register_dependencies(
	'EE_Session_Mock',
	array( 'EE_Encryption' => EE_Dependency_Map::load_from_cache )
);
EE_Dependency_Map::register_class_loader( 'Session_Mock' );
EE_Registry::instance()->SSN = EE_Registry::instance()->load_core( 'EE_Session_Mock' );

// turn off caching for any loaders in use
add_filter('FHEE__EventEspresso\core\services\loaders\CachingLoader__load__bypass_cache', '__return_true', 1);

//Load the EE_specific testing tools
require EE_TESTS_DIR . 'includes/EE_UnitTestCase.class.php';
require EE_TESTS_DIR . 'includes/EE_REST_TestCase.php';

require_once EE_TESTS_DIR . 'mocks/addons/eea-new-addon/eea-new-addon.php';
remove_action( 'AHEE__EE_System__load_espresso_addons', 'load_espresso_new_addon' );
//save wpdb queries in case we want to know what queries ran during a test
define( 'SAVEQUERIES', TRUE );

/**
 * redefining wp_mail function here as a mock for our tests.  Has to be done early
 * to override the existing wp_mail.  Tests can use the given filter to adjust the responses as necessary.
 */
function wp_mail( $to, $subject, $message, $headers = '', $attachments = array() ) {
	return apply_filters( 'FHEE__wp_mail', true, $to, $subject, $message, $headers, $attachments );
}
//nuke all EE4 data once the tests are done, so that it doesn't carry over to the next time we run tests
register_shutdown_function(
    'ee_finished_testing'
);
function ee_finished_testing(){
    //this should only be torn down when all tests are done
    EEH_Activation::delete_all_espresso_tables_and_data();
}