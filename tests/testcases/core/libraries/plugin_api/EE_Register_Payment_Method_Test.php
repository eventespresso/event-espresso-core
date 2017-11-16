<?php

/**
 * @group core/libraries/plugin_api
 * @group core
 * @group agg
 * @group payment_methods
 */
class EE_Register_Payment_Method_Test extends EE_UnitTestCase
{
    protected $_pmt_name = 'Mock_Onsite';
    protected $_pmt_args = null;

    public function __construct($name = null, array $data = array(), $dataName = '')
    {
        parent::__construct($name, $data, $dataName);
        $this->_pmt_args = array(
            'payment_method_paths' =>
                array(
                    EE_TESTS_DIR . 'mocks' . DS . 'payment_methods' . DS . 'Mock_Onsite',
                ),
        );
        EE_Registry::instance()->load_lib('Payment_Method_Manager');
    }

    public function test_register__fail()
    {
        $this->_stop_pretending_addon_hook_time();
        remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

        //first verify it doesn't already exists
        $pmt_exists = EE_Payment_Method_Manager::reset()->payment_method_type_exists($this->_pmt_name);
        $this->assertFalse($pmt_exists);

        //try registering at wrong time
        try {
            EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
            $this->fail('We should have had a warning saying that we are setting up the payment methods at the wrong time');
        } catch (PHPUnit_Framework_Error_Notice $e) {
            $this->assertTrue(true);
        }
    }

    /**
     * @group 7230
     */
    public function test_register__too_late()
    {
        $this->_pretend_addon_hook_time();
        //double-check no one else is filtering payment method types
        remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

        //first verify it doesn't already exists
        $pmt_exists = EE_Payment_Method_Manager::reset()->payment_method_type_exists($this->_pmt_name);
        $this->assertFalse($pmt_exists);


        EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
        //now check it does exist
        $pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists($this->_pmt_name);
        $this->assertTrue($pmt_exists);
    }

    public function test_register__success()
    {
        EE_Register_Payment_Method::deregister($this->_pmt_name);
        $this->_pretend_addon_hook_time();
        //double-check no one else is filtering payment method types
        remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

        //first verify it doesn't already exists
        $pmt_exists = EE_Payment_Method_Manager::reset()->payment_method_type_exists($this->_pmt_name);
        $this->assertFalse($pmt_exists);


        EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
        //now check it does exist
        $pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists($this->_pmt_name, true);
        $this->assertTrue($pmt_exists);
    }
}

// End of file EE_Register_Payment_Method_Test.php