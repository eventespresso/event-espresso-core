<?php
/**
 * Contains test class for testing code covered by EE_DMS_Core_4_1_0 class.
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests related to EE_DMS_Core_4_1_0.
 *
 * Note, this also tests that tables specific to this EE version are setup.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_DMS_Core_4_1_0_Tests extends EE_UnitTestCase {

	function test_esp_answer_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_answer' ) );
	}

	function test_esp_attendee_meta_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_attendee_meta' ) );
	}

	function test_esp_country_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_country' ) );
	}

	function test_esp_datetime_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_datetime' ) );
	}

	function test_esp_event_meta_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_event_meta' ) );
	}

	function test_esp_event_question_group_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_event_question_group' ) );
	}


	function test_esp_event_venue_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_event_venue' ) );
	}


	function test_esp_extra_meta_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_extra_meta' ) );
	}

	function test_esp_line_item_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_line_item' ) );
	}

	function test_esp_message_template_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_message_template' ) );
	}

	function test_esp_message_template_group_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_message_template_group' ) );
	}

	function test_esp_payment_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_payment' ) );
	}

	function test_esp_promotion_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_promotion' ) );
	}

	function test_esp_promotion_object_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_promotion_object' ) );
	}

	function test_esp_promotion_applied_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_promotion_applied' ) );
	}

	function test_esp_promotion_rule_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_promotion_rule' ) );
	}

	function test_esp_rule_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_rule' ) );
	}

	function test_esp_ticket_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_ticket' ) );
	}

	function test_esp_ticket_price_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_ticket_price' ) );
	}

	function test_esp_datetime_ticket_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_datetime_ticket' ) );
	}

	function test_esp_ticket_template_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_ticket_template' ) );
	}

	function test_esp_price_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_price' ) );
	}

	function test_esp_price_type_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_price_type' ) );
	}

	function test_esp_question_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_question' ) );
	}

	function test_esp_question_group_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_question_group' ) );
	}

	function test_esp_question_group_question_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_question_group_question' ) );
	}

	function test_esp_question_option_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_question_option' ) );
	}

	function test_esp_registration_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_registration' ) );
	}

	function test_esp_checkin_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_checkin' ) );
	}

	function test_esp_state_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_state' ) );
	}

	function test_esp_status_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_status' ) );
	}

	function test_esp_transaction_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_transaction' ) );
	}

	function test_esp_venue_meta_exists() {
		$this->assertTrue( $this->table_exists_check( 'esp_venue_meta' ) );
	}

	function table_exists_check( $name ) {
		global $wpdb;
		$table_name = $wpdb->prefix . $name;
		return $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $table_name;
	}
}
