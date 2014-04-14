<?php
/**
 * Contains test class for testing that EE tables exist after new activation
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for verifying EE tables exist after DB activation.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_Test_DB_Tables_Exist extends EE_UnitTestCase {

	function test_esp_country_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_country' ) );
	}

	function table_exists_check( $name ) {
		global $wpdb;
		$table_name = $wpdb->prefix . $name;
		return $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $table_name;
	}
}
