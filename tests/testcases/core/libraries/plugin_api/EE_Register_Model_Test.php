<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * EE_Register_Model_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */



/**
 * @group core/libraries/plugin_api
 * @group agg
 */
class EE_Register_Model_Test extends EE_UnitTestCase
{

    private $_reg_args;

    private $_model_group;



    public function __construct($name = null, array $data = array(), $dataName = '')
    {
        $this->_reg_args = array(
            'model_paths' => array(EE_MOCKS_DIR . 'core/db_models/'),
            'class_paths' => array(EE_MOCKS_DIR . 'core/db_classes/'),
        );
        $this->_model_group = 'Mock';
        parent::__construct($name, $data, $dataName);
    }



    public function set_up()
    {
        parent::set_up();
        $this->_stop_pretending_addon_hook_time();
        //		EE_System::instance()->load_core_configuration();
    }



    //test registering a bare minimum addon, and then deregistering it
    function test_register_mock_model_fail()
    {
        //we're registering the addon WAAAY after EE_System has set thing up, so
        //registering this first time should throw an E_USER_NOTICE
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        try {
            EE_Register_Model::register($this->_model_group, $this->_reg_args);
            $this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
        } catch (PHPUnit_Framework_Error_Notice $e) {
            $this->assertTrue(true);
        }
        EE_System::instance()->load_core_configuration();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
    }



    function test_register_mock_addon_fail__bad_parameters()
    {
        //we're registering the addon with the wrong parameters
        $this->_pretend_addon_hook_time();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        try {
            EE_Register_Model::register($this->_model_group, array(
                'foobar'      => '1.0.0',
                'model_paths' => EE_MOCKS_DIR . 'core/db_models',
                'class_paths' => EE_MOCKS_DIR . 'core/db_classes',
            ));
            $this->fail('We should have received a warning that the \'plugin_main_file\' is a required argument when registerign an addon');
        } catch (EE_Error $e) {
            $this->assertTrue(true);
        }
        EE_System::instance()->load_core_configuration();
        //check that we didn't actually register the addon
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
    }



    function test_register_mock_addon_success()
    {
        $this->_pretend_addon_hook_time();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        //register it for realz
        EE_Register_Model::register($this->_model_group, $this->_reg_args);
        EE_System::instance()->load_core_configuration();
        $this->assertArrayContains('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayContains('EEM_Mock', EE_Registry::instance()->models);
        //now deregister it
        EE_Register_Model::deregister($this->_model_group);
        EE_System::instance()->load_core_configuration();
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
    }



    public function tear_down()
    {
        //ensure the models aren't stil registered. they should have either been
        //deregistered during the test, or not been registered at all
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayDoesNotContain('EEM_Mock', EE_Registry::instance()->models);
        $this->_stop_pretending_addon_hook_time();
        parent::tear_down();
    }
}

// End of file EE_Register_Model_Test.php