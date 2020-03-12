<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Payment_Processor_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group payment_methods
 * @group agg
 * @group messages
 */
//if this test is ran individually, make sure we have all the other stuff on it
require_once( 'EE_Payment_Processor_Test.php' );
class EE_Payment_Processor_With_Messages_Test extends EE_Payment_Processor_Test{
	/**
	 * unit tests inherited from parent
	 */

	public function setUp(){
		parent::setUp();
		$this->_pretend_addon_hook_time();
		EE_Register_Payment_Method::register('onsite', array(
			'payment_method_paths'=>array(
				EE_TESTS_DIR . 'mocks/payment_methods/Mock_Onsite'
			)
		));
		EE_Register_Payment_Method::register('offsite',array(
			'payment_method_paths' => array(
				EE_TESTS_DIR . 'mocks/payment_methods/Mock_Offsite'
			)
		));
		EE_Payment_Method_Manager::instance()->reset();

		//unlike EE_Payment_Processor_With_Messages, this is integration testing
		//and so we want to leave messages hooks in-place

	}
	public function tearDown(){
		EE_Register_Payment_Method::deregister( 'onsite' );
		EE_Register_Payment_Method::deregister( 'offsite' );
		parent::tearDown();
	}
}

// End of file EE_Payment_Processor_Test.php
