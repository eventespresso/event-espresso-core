<?php
/**
 * Contains test class for /core/libraries/messages/EE_messages.lib.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_messages class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_messages_Test extends EE_UnitTestCase {


	/**
	 * tests to make sure forcing a messenger to be active works.
	 *
	 * @since 4.5.0
	 */
	public function test_ensure_messenger_is_active() {
		EE_Registry::instance()->load_lib('messages');
		EE_Registry::instance()->load_helper('Activation');
		$msg = new EE_messages();
		$this->assertInstanceOf( 'EE_messages', $msg );

		//make sure html messenger is setup (should be by default)
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$this->assertTrue( isset( $active_messengers['html'] ), sprintf( 'The messenger %s should be active on fresh install, but it is not.', 'html' ) );

		//let's UNSET the html messenger from active messengers and update the db
		unset( $active_messengers['html'] );
		EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );

		//now let's FORCE reactivation.
		$response = $msg->ensure_messenger_is_active( 'html' );
		$this->assertFalse( $response ); //that means it was previously inactive which it should be.

		//verify html messenger IS actually active now.
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$this->assertTrue( isset( $active_messengers['html'] ), 'The html messenger should have been forced to be active again but it is not.' );

		//now verify that trying to ensure is active verifies it's already active
		$response = $msg->ensure_messenger_is_active('html');
		$this->assertTrue( $response );
	}


} //end EE_messages_Test class
