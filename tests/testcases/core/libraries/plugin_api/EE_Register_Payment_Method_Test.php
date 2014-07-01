<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Register_Payment_Method_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/libraries/plugin_api
 * @group core
 * @group agg
 */
class EE_Register_Payment_Method_Test extends EE_UnitTestCase{
	protected $_pmt_name = 'Mock_Onsite';
	protected $_pmt_args = NULL;
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_pmt_args = array('payment_method_paths' =>
			array(
				EE_TESTS_DIR . 'mocks' . DS . 'payment_methods' . DS . 'Mock_Onsite',
			));
		EE_Registry::instance()->load_lib( 'Payment_Method_Manager' );
	}
	public function test_register__fail(){
		$this->_stop_pretending_addon_hook_time();
		remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

		//first verify it doesn't already exists
		$pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists( $this->_pmt_name );
		$this->assertFalse( $pmt_exists );

		//try registering at wrong time
		try{
			EE_Register_Payment_Method::register($this->pmt_name, $this->_pmt_args);
			$this->fail('We should have had a warning saying that we are setting up the payment methods at the wrong time');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertTrue(True);
		}
	}

	public function test_register__success(){
		$this->_pretend_addon_hook_time();
		//double-check no one else is filtering payment method types
		remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

		//first verify it doesn't already exists
		$pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists( $this->_pmt_name );
		$this->assertFalse( $pmt_exists );


		EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
		//now check it does exist
		$pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists( $this->_pmt_name, TRUE );
		$this->assertTrue( $pmt_exists );
	}
}

// End of file EE_Register_Payment_Method_Test.php