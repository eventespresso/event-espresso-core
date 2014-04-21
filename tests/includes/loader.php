<?php
/**
 * Loader for EE Unit Tests initializes plugin and gets thing off to a start.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * Do the testsbypass filter for when EE is loaded so that we get db setup.  Need to make sure this
 * ONLY runs here on initial install of db.  We can simply do a check for a EE db to know if we bypass or
 * not.
 *
 * @since 4.3.0
 *
 */
function maybe_bypass_for_tests($bypass) {
	global $wpdb;
	//let's check if EE Table exists.  If it does then we do a bypass of is_admin() and user_logged_in check AND we set the $request_type to new_activation.
	$table_name = $wpdb->prefix . "esp_country";
	if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name && $wpdb->get_var( "SHOW COLUMNS FROM '$table_name' LIKE 'CNT_ISO' " ) != 'CNT_ISO' ) {
		return TRUE;
	}
	return FALSE; //table exists load things normally.
}
tests_add_filter('FHEE__EE_System__detect_if_activation_or_upgrade__testsbypass', 'maybe_bypass_for_tests');

// Bootstrap EE
require dirname( __FILE__ ) . '/../../espresso.php';
