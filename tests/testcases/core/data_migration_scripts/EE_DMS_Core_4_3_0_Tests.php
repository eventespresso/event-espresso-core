<?php
/**
 * Contains test class for testing code covered by EE_DMS_Core_4_3_0 class.
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests related to EE_DMS_Core_4_3_0.
 *
 * Note, this also tests that tables specific to this EE version are setup.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_DMS_Core_4_3_0_Tests extends EE_UnitTestCase {

	function test_esp_event_message_template_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_event_message_template' ) );
	}

	function table_exists_check( $name ) {
		global $wpdb;
		$table_name = $wpdb->prefix . $name;
		return $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $table_name;
	}
}
