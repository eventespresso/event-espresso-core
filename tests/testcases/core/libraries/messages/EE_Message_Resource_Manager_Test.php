<?php
/**
 * All tests for the EE_Message_Resource_Manager class.
 *
 * @since 		4.9.0
 * @author      Darren Ethier
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Message_Resource_Manager_Test extends EE_UnitTestCase {


	/**
	 * @var EE_Message_Resource_Manager
	 */
	protected $_message_resource_manager = null;



	public function set_up() {
		parent::set_up();
		$this->_message_resource_manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$this->assertInstanceOf( 'EE_Message_Resource_Manager', $this->_message_resource_manager );
		//make sure message type and messenger that might be persisting inactive between tests are fixed.
		$this->_message_resource_manager->ensure_message_type_is_active( 'invoice', 'html' );
	}


	public function tear_down() {
		$this->_message_resource_manager = null;
		parent::tear_down();
	}


	public function test_messenger_collection() {
		$messenger_collection = $this->_message_resource_manager->messenger_collection();
		$this->assertInstanceOf( 'EE_Messenger_Collection', $messenger_collection );
	}



	public function test_active_messengers() {
		$active_messengers = $this->_message_resource_manager->active_messengers();

		//email messenger should be active by default so using that for the test.
		$this->assertTrue( isset( $active_messengers['email'] ) );
		$this->assertInstanceOf( 'EE_Email_messenger', $active_messengers['email'] );
	}



	public function test_get_messenger() {
		$messenger = $this->_message_resource_manager->get_messenger( 'email' );
		$this->assertInstanceOf( 'EE_Email_messenger', $messenger );
	}



	public function test_get_active_messenger() {
		$messenger_that_is_active = $this->_message_resource_manager->get_active_messenger( 'email' );
		$inactive_messenger = $this->_message_resource_manager->get_active_messenger( 'dummy' );
		$this->assertInstanceOf( 'EE_Email_messenger', $messenger_that_is_active );
		$this->assertNotInstanceOf( 'EE_Email_messenger', $inactive_messenger );
	}



	public function test_installed_messengers() {
		$installed_messengers = $this->_message_resource_manager->installed_messengers();
		$this->assertTrue( isset( $installed_messengers['email'] ) );
		$this->assertInstanceOf( 'EE_Email_messenger', $installed_messengers['email'] );
	}




	public function test_valid_messenger() {
		//test valid first.
		$messenger = $this->_message_resource_manager->valid_messenger( 'email' );
		$this->assertInstanceOf( 'EE_Email_messenger', $messenger );

		//test invalid
		$this->setExpectedException( 'EE_Error' );
		$this->_message_resource_manager->valid_messenger( 'dummy' );
	}




	public function test_message_type_collection() {
		$message_type_collection = $this->_message_resource_manager->message_type_collection();
		$this->assertInstanceOf( 'EE_Message_Type_Collection', $message_type_collection );
	}




	public function test_active_message_types() {
		$active_message_types = $this->_message_resource_manager->active_message_types();
		$this->assertTrue( isset( $active_message_types['email']['settings']['email-message_types']['registration'] ) );
	}



	public function test_get_message_type() {
		$message_type = $this->_message_resource_manager->get_message_type( 'invoice' );
		$this->assertInstanceOf( 'EE_Invoice_message_type', $message_type );
	}



	public function test_get_active_message_type_for_messenger() {
		$active_message_type = $this->_message_resource_manager->get_active_message_type_for_messenger( 'email', 'registration' );
		$invalid_message_type = $this->_message_resource_manager->get_active_message_type_for_messenger( 'email', 'invoice' );
		$this->assertInstanceOf( 'EE_Registration_message_type', $active_message_type );
		$this->assertNull( $invalid_message_type );
	}




	public function test_is_message_type_active_for_messenger() {
		$active_message_type = $this->_message_resource_manager->is_message_type_active_for_messenger( 'email', 'registration' );
		$invalid_message_type = $this->_message_resource_manager->is_message_type_active_for_messenger( 'email', 'invoice' );
		$this->assertTrue( $active_message_type );
		$this->assertFalse( $invalid_message_type );
	}



	public function test_is_messenger_active() {
		$this->assertTrue( $this->_message_resource_manager->is_messenger_active( 'email' ) );
		$this->assertFalse( $this->_message_resource_manager->is_messenger_active( 'dummy' ) );
	}



	public function test_get_message_type_settings_for_messenger() {
		$message_type_settings = $this->_message_resource_manager->get_message_type_settings_for_messenger( 'email', 'registration' );
		//currently this will always be an empty array because no message type has settings, so this should always return an array.
		$this->assertTrue( is_array( $message_type_settings ) );
	}




	public function test_messenger_has_active_message_types() {
		$this->assertTrue( $this->_message_resource_manager->messenger_has_active_message_types( 'email' ) );
		$this->assertFalse( $this->_message_resource_manager->messenger_has_active_message_types( 'pdf' ) );
	}




	public function test_get_active_message_types_for_messenger() {
		$active_message_types = $this->_message_resource_manager->get_active_message_types_for_messenger( 'email' );
		$this->assertTrue( isset( $active_message_types['registration'] ) );
		$this->assertInstanceOf( 'EE_Registration_message_type', $active_message_types['registration'] );
	}



	public function test_list_of_active_message_types() {
		$active_message_type_list = $this->_message_resource_manager->list_of_active_message_types();
		$this->assertArrayContains( 'invoice', $active_message_type_list );
	}



	public function test_get_active_message_type_objects() {
		$active_message_type_objects = $this->_message_resource_manager->get_active_message_type_objects();
		$this->assertTrue( isset( $active_message_type_objects['invoice'] ) );
		$this->assertInstanceOf( 'EE_Invoice_message_type', $active_message_type_objects['invoice'] );
	}




	public function test_installed_message_types() {
		$installed_message_types = $this->_message_resource_manager->installed_message_types();
		$this->assertTrue( isset( $installed_message_types['invoice'] ) );
		$this->assertInstanceOf( 'EE_Invoice_message_type', $installed_message_types['invoice'] );
	}



	public function test_valid_message_type() {
		//test valid
		$this->assertInstanceOf( 'EE_Registration_message_type', $this->_message_resource_manager->valid_message_type( 'registration' ) );

		//test invalid throwing exception
		$this->setExpectedException( 'EE_Error' );
		$this->_message_resource_manager->valid_message_type( 'dummy' );
	}



	public function test_valid_message_type_for_messenger() {
		//test valid
		$html_messenger = $this->_message_resource_manager->get_messenger( 'html' );
		$this->assertTrue( $this->_message_resource_manager->valid_message_type_for_messenger( $html_messenger, 'invoice' ) );

		//test invalid throwing exception
		$email_messenger = $this->_message_resource_manager->get_messenger( 'email' );
		$this->setExpectedException( 'EE_Error' );
		$this->_message_resource_manager->valid_message_type_for_messenger( $email_messenger, 'invoice' );
	}



	public function test_get_active_messengers_option() {
		$active_messengers_option = $this->_message_resource_manager->get_active_messengers_option( true );

		//this should be the same as what gets returned for the active_message_types property.
		$this->assertEquals(
			$active_messengers_option,
			$this->_message_resource_manager->active_message_types()
		);
	}



	public function test_update_active_messengers_option() {
		$this->markTestIncomplete(
			'This test is incomplete because for now it is tested indirectly via other tests in this class.'
		);
	}




	public function test_get_has_activated_messengers_option() {
		$has_activated = $this->_message_resource_manager->get_has_activated_messengers_option(true);
		$this->assertTrue( isset( $has_activated['email'] ) );
		$this->assertArrayContains( 'registration', $has_activated['email'] );
	}



	public function test_update_has_activated_messengers_option() {
		$has_activated = $this->_message_resource_manager->get_has_activated_messengers_option();
		$has_activated['email'][] = 'test_message_type';
		$this->assertTrue( $this->_message_resource_manager->update_has_activated_messengers_option( $has_activated ) );

		$has_activated_persistent_check = $this->_message_resource_manager->get_has_activated_messengers_option( true );
		$this->assertTrue( isset( $has_activated_persistent_check['email'] ) );
		$this->assertArrayContains( 'test_message_type', $has_activated_persistent_check['email'] );
	}



	public function test_reset_active_messengers_and_message_types() {
		$this->markTestIncomplete(
			'Not sure how to usefully perform this test just yet so this is just a marker.'
		);
	}


	/**
	 * tests to make sure forcing a messenger to be active works.
	 *
	 * Note this also indirectly tests the following methods in the MRM:
	 * - active_messengers
	 * - deactivate_messenger
	 * - update_active_messengers_option
	 * - is_messenger_active
	 *
	 * @since 4.9.0
	 */
	public function test_ensure_messenger_is_active() {
		//make sure html messenger is setup (should be by default)
		$current_active_messengers = $this->_message_resource_manager->active_messengers();
		$this->assertTrue( isset( $current_active_messengers['html'] ), sprintf( 'The messenger %s should be active on fresh install, but it is not.', 'html' ) );

		//let's deactivate the html messenger from active messengers and update the db
		$this->_message_resource_manager->deactivate_messenger( 'html' );
		$this->_message_resource_manager->update_active_messengers_option();
		//verify active_messengers prop in MRM doesn't have html in it
		$current_active_messengers = $this->_message_resource_manager->active_messengers();
		$this->assertFalse( isset( $current_active_messengers['html'] ) );

		//verify its not active
		$this->assertFalse( $this->_message_resource_manager->is_messenger_active( 'html' ) );

		//now let's FORCE reactivation.
		$response = $this->_message_resource_manager->ensure_messenger_is_active( 'html' );
		$this->assertTrue( $response );

		//verify html messenger IS actually active now.
		$current_active_messengers = $this->_message_resource_manager->active_messengers();
		$this->assertTrue( isset( $current_active_messengers['html'] ), 'The html messenger should have been forced to be active again but it is not.' );
	}



	public function test_ensure_messengers_are_active() {
		$this->markTestIncomplete(
			'For now, this test is mostly covered by test_ensure_messenger_is_active.'
		);
	}


	/**
	 * This test also indirectly tests the following methods:
	 * - get_active_message_type_objects
	 * - deactivate_message_type
	 * - update_active_messengers_option
	 *
	 *
	 * @since 4.9.0
	 */
	public function test_ensure_message_type_is_active() {
		//get all active message types.
		$current_active_message_types = $this->_message_resource_manager->get_active_message_type_objects();
		$this->assertTrue( isset( $current_active_message_types['invoice'] ) );

		//deactivate the invoice message type and persist
		$this->_message_resource_manager->deactivate_message_type( 'invoice' );
		$this->_message_resource_manager->update_active_messengers_option();

		//verify message type isn't active anywhere internally on the class.
		$list_of_active_message_types = $this->_message_resource_manager->list_of_active_message_types();
		$this->assertArrayDoesNotContain( 'invoice', $list_of_active_message_types );

		//now let's force reactivation (for html messenger)
		$response = $this->_message_resource_manager->ensure_message_type_is_active( 'invoice', 'html' );
		$this->assertTrue( $response );

		//very invoice message type IS actually active now.
		$current_active_message_types = $this->_message_resource_manager->get_active_message_type_objects();
		$this->assertTrue( isset( $current_active_message_types['invoice'] ) );
	}



	public function test_ensure_message_types_are_active() {
		$this->markTestIncomplete(
			'This test is mostly covered via test_ensure_message_type_is_active'
		);
	}



	public function test_activate_messenger() {
		$this->markTestIncomplete(
			'This method is indirectly covered in the test_ensure_messenger_is_active'
		);
	}



	public function test_add_settings_for_message_type() {
		$this->markTestIncomplete(
			'There are currently no message types that have settings so not tested yet.'
		);
	}



	public function test_add_settings_for_messenger() {
		$this->markTestIncomplete(
			'There are currently no messengers that have settings so not tested yet.'
		);
	}



	public function test_deactivate_messenger() {
		$this->assertTrue( $this->_message_resource_manager->is_messenger_active( 'html' ) );
		$this->_message_resource_manager->deactivate_messenger( 'html' );
		$this->assertFalse( $this->_message_resource_manager->is_messenger_active( 'html' ) );
	}



	public function test_deactivate_message_type() {
		$this->assertTrue( $this->_message_resource_manager->is_message_type_active_for_messenger( 'html', 'invoice' ) );
		$this->_message_resource_manager->deactivate_message_type( 'invoice' );
		$this->assertFalse( $this->_message_resource_manager->is_message_type_active_for_messenger( 'html', 'invoice' ) );
	}



	public function test_deactivate_message_type_for_messenger() {
		$this->assertTrue( $this->_message_resource_manager->is_message_type_active_for_messenger( 'html', 'invoice' ) );
		$this->_message_resource_manager->deactivate_message_type_for_messenger( 'invoice', 'html' );
		$this->assertFalse( $this->_message_resource_manager->is_message_type_active_for_messenger( 'html', 'invoice' ) );
	}




	public function test_is_generating_messenger_and_active() {
		//get email messenger
		$email_messenger = $this->_message_resource_manager->get_messenger( 'email' );
		//get registration message type
		$registration_message_type = $this->_message_resource_manager->get_message_type( 'registration' );
		//get invoice message type
		$invoice_message_type = $this->_message_resource_manager->get_message_type( 'invoice' );

		$this->assertTrue( $this->_message_resource_manager->is_generating_messenger_and_active( $email_messenger, $registration_message_type ) );
		$this->assertFalse( $this->_message_resource_manager->is_generating_messenger_and_active( $email_messenger, $invoice_message_type ) );
	}



	function test_get_all_contexts() {
		$contexts = $this->_message_resource_manager->get_all_contexts();

		//expected four contexts.
		$this->assertEquals( 4, count( $contexts ) );

		//expecting an array with 'admin', 'attendee', and 'primary_attendee', and 'purchaser' in it.
		$this->arrayHasKey( 'admin', $contexts );
		$this->arrayHasKey( 'attendee', $contexts );
		$this->arrayHasKey( 'primary_attendee', $contexts );
		$this->arrayHasKey( 'purchaser', $contexts );
	}


} //end EE_messages_Test class
// Location: tests/testcases/core/libraries/messages/EE_Message_Resource_Manager_Test.php
