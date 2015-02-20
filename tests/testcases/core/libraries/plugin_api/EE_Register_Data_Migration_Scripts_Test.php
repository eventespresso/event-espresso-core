<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Register_Data_Migration_Scripts_test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group agg
 * @group core/libraries/plugin_api
 * @group core
 */
class EE_Register_Data_Migration_Scripts_Test extends EE_UnitTestCase{
	public function test_register(){
		//make sure nobody else interfers with this test
		$this->_stop_pretending_addon_hook_time();
		remove_all_filters('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders');
		$pretend_addon_name = 'More_Core';
		$args = array(
			'dms_paths'=>array(EE_TESTS_DIR.'mocks/core/data_migration_scripts')
		);
		//try registering at wrong time
		try{
			EE_Register_Data_Migration_Scripts::register($pretend_addon_name, $args);
			$this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
		}catch(PHPUnit_Framework_Error_Notice $e){
			$this->assertTrue(True);
		}
		//and check we didn't actually register the DMSs (because we attempted to do so at teh wrong time)
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_Core_1_0_0',$DMSs_available);

		//ok now pretend we're registering the DMS at the right time
		$this->_pretend_addon_hook_time();
		EE_Register_Data_Migration_Scripts::register($pretend_addon_name, $args);
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_Core_1_0_0',$DMSs_available);

		//now deregister it
		EE_Register_Data_Migration_Scripts::deregister($pretend_addon_name);
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_Core_1_0_0',$DMSs_available);

		$this->_stop_pretending_addon_hook_time();
	}
}

// End of file EE_Register_Data_Migration_Scripts_test.php