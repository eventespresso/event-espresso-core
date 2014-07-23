<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_WP_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_WP_Test extends EE_UnitTestCase{

	function setUp(){
		//DONT call parent
		$this->update_option('foobar', 'before_setup');
		parent::setUp();
	}
	function test_it(){
		$this->update_option('foobar', 'during_test');
	}
	function tearDown(){
		//DONT call parent
		parent::tearDown();
		$this->assertEquals('before_setup',$this->get_option('foobar'));
	}

	private function update_option( $option_name, $option_value ){
		global $wpdb;
		return $wpdb->update( $wpdb->options, array( 'option_value' => maybe_serialize($option_value) ), array( 'option_name' => $option_name ) );
	}

	private function get_option($option_name){
		global $wpdb;
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s LIMIT 1", $option_name ) );
		if($row){
			return $row->option_value;
		}else{
			return FALSE;
		}
	}



	private function get_attendee_name_in_db($att_id){
		global $wpdb;
		return $wpdb->get_var("SELECT ATT_fname FROM {$wpdb->prefix}esp_attendee_meta where ATT_ID = $att_id");
	}
}

// End of file EE_WP_Test.php