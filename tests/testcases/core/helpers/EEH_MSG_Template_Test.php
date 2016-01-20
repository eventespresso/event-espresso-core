<?php
/**
 * Contains test class for /core/helpers/EEH_MSG_Template.helper.php
 *
 * @since  		4.4.1
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the EEH_MSG_Template class.
 *
 * @since 		4.4.1
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EEH_MSG_Template_Test extends EE_UnitTestCase {



	/**
	 * test messenger that should be active
	 *
	 * @since 4.4.1
	 */
	public function test_get_active_messenger() {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$Message_Resource_Manager->activate_default_messengers_and_message_types();
		$this->assertInstanceOf(
			'EE_Messenger',
			$Message_Resource_Manager->get_active_messenger( 'email' )
		);
		$this->assertNotInstanceOf(
			'EE_Messenger',
			$Message_Resource_Manager->get_active_messenger( 'some_random_messenger' )
		);
	}


} //end EEH_MSG_Template_Test
// Location: tests/testcases/core/helpers/EEH_MSG_Template_Test.php
