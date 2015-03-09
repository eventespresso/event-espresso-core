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
 */
class EEH_MSG_Template_Test extends EE_UnitTestCase {



	/**
	 * testing the is_messenger_active() method
	 *
	 * @since 4.4.1
	 */
	public function test_is_messenger_active() {
		//test messenger that should be active
		EE_Registry::instance()->load_helper('MSG_Template');
		$this->assertTrue( EEH_MSG_Template::is_messenger_active( 'email' ) );

		//test messenger that should NOT be active
		$this->assertFalse( EEH_MSG_Template::is_messenger_active( 'some_random_messenger' ) );
	}


} //end EEH_MSG_Template_Test
