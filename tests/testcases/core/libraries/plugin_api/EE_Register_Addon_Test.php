<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Register_Addon_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/libraries/plugin_api
 * @group agg
 */
class EE_Register_Addon_Test extends EE_UnitTestCase{
	private $_mock_addon_path;
	private $_reg_args;
	private $_addon_name;
	static function setUpBeforeClass() {
		parent::setUpBeforeClass();
	}
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		$this->_mock_addon_path = EE_TESTS_DIR.'mocks/addons/new-addon/';
		$this->_reg_args = array(
			'version'=>'1.0.0',
			'min_core_version'=>'4.0.0',
			'base_path'=>$this->_mock_addon_path,
			'dms_paths'=>$this->_mock_addon_path . 'core/data_migration_scripts'
			
		);
		$this->_addon_name = 'New_Addon';
		parent::__construct($name, $data, $dataName);
	}
	//test registering a bare minimum addon, and then deregistering it
	function test_register_mock_addon_fail(){
		//we're registering the addon WAAAY after EE_System has set thing up, so 
		//registering this first time should throw an E_USER_NOTICE
		try{
			EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
			$this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertTrue(True);
		}
		
		//check that we didn't actually register the addon
		try{
			EE_Registry::instance()->addons->EE_New_Addon;
			$this->fail('The addon New_Addon should not have been registered because its called at the wrong time');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertEquals(EE_UnitTestCase::error_code_undefined_property,$e->getCode());
		}
		//check dmss werne't setup either
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_New_Addon_0_0_2',$DMSs_available);
		
	}
	
	function test_register_mock_addon_success(){
		$this->_pretend_addon_hook_time();
		EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
		//cehck DMSs were setup properly too
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_New_Addon_0_0_2',$DMSs_available);
		
		
		
		
		//now verify we can deregister it
		EE_Register_Addon::deregister($this->_addon_name);
		try{
			EE_Registry::instance()->addons->EE_New_Addon;
			$this->fail('EE_New_Addon is still registered. Deregister failed');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertEquals(EE_UnitTestCase::error_code_undefined_property,$e->getCode());
		}
		//verify DMSs deregistered
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_New_Addon_0_0_2',$DMSs_available);
		
		$this->_stop_pretending_addon_hook_time();
	}
}

// End of file EE_Register_Addon_Test.php