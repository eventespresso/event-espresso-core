<?php

use EventEspresso\core\services\loaders\LoaderFactory;


/**
 * @group core/libraries/plugin_api
 * @group core
 * @group agg
 * @group payment_methods
 */
class EE_Register_Payment_Method_Test extends EE_UnitTestCase
{
    protected $_pmt_name;
    protected $_pmt_args;

    /**
     * @var EE_Payment_Method_Manager
     */
    protected $payment_method_manager;


    public function setUp()
    {
        parent::setUp();
        $this->_pmt_args = array(
            'payment_method_paths' =>
                array(
                    EE_TESTS_DIR . 'mocks/payment_methods/Mock_Onsite',
                ),
        );
        $this->_pmt_name = 'Mock_Onsite';
        $this->payment_method_manager = LoaderFactory::getLoader()->getShared('EE_Payment_Method_Manager');
    }


    public function tearDown()
    {
        parent::tearDown();
        $this->_pmt_args = null;
        $this->_pmt_name = null;
        $this->payment_method_manager = null;
    }

    public function test_register__fail()
    {
        $this->_stop_pretending_addon_hook_time();
        remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

        //first verify it doesn't already exists
        $pmt_exists = $this->payment_method_manager->payment_method_type_exists($this->_pmt_name);
        $this->assertFalse($pmt_exists);

        //try registering at wrong time
        try {
            EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
            $this->fail('We should have had a warning saying that we are setting up the payment methods at the wrong time');
        } catch (PHPUnit_Framework_Error_Notice $e) {
            $this->assertTrue(true);
        }
    }

    public function test_register__success()
    {
        $this->_pretend_addon_hook_time();
        //double-check no one else is filtering payment method types
        remove_all_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register');

        //first verify it doesn't already exists
        $pmt_exists = $this->payment_method_manager->payment_method_type_exists($this->_pmt_name);
        $this->assertFalse($pmt_exists);


        EE_Register_Payment_Method::register($this->_pmt_name, $this->_pmt_args);
        //now check it does exist
        $pmt_exists = EE_Payment_Method_Manager::instance()->payment_method_type_exists($this->_pmt_name, true);
        $this->assertTrue($pmt_exists);
    }
}
