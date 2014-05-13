<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Data_Migration_Manager_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group data_migration_scripts
 */
class EE_Data_Migration_Manager_Test extends EE_UnitTestCase{
	public function test_get_all_data_migration_scripts_available(){
		add_filter('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array($this,'add_mock_dms'));
		EE_Data_Migration_Manager::reset();
		$dms_classpaths = EE_Data_Migration_Manager::instance()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_Core_4_1_0', $dms_classpaths);
		$this->assertArrayHasKey('EE_DMS_Mock_1_0_0',$dms_classpaths);
		$this->assertArrayHasKey('EE_DMS_Core_4_2_0', $dms_classpaths);
		$this->assertArrayHasKey('EE_DMS_Core_4_3_0', $dms_classpaths);
	}
	public function test_ensure_current_database_state_is_set(){
		//options table should be empty to start
		$this->assertWPOptionDoesNotExist(EE_Data_Migration_Manager::current_database_state);
		$this->_pretend_current_code_state_is_at(espresso_version());
		$db_state = EE_Data_Migration_Manager::instance()->ensure_current_database_state_is_set();
		$this->assertArrayHasKey('Core',$db_state);
		$this->assertEquals(espresso_version(), $db_state['Core']);
	}
	public function test_check_for_applicable_data_migration_scripts(){
		$this->_pretend_current_db_state_is_at('3.1.37.7');
		$dmss = EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts();
		//make sure the array contains the first two migrations, and they're in teh right order
		$first = array_shift($dmss);
		$this->assertInstanceOf('EE_DMS_Core_4_1_0',$first);
		$second = array_shift($dmss);
		$this->assertInstanceOf('EE_DMS_Mock_1_0_0',$first);
		//pretend we already ran one DMS
		$dms_done = new EE_DMS_Core_4_1_0();
		$dms_done->set_completed();
		$this->_pretend_ran_dms($dms_done);
		$dmss = EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts();
		$this->assertArrayNotHasKey('EE_DMS_Core_4_1_0',$dmss);
		$this->assertArrayHasKey('EE_DMS_Mock_1_0_0',$dmss);
		
		//now pretend we're elsewhere in the migration where 4.2 should be ran
		$this->_pretend_current_db_state_is_at('4.1.1');
		$dmss = EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts();
		$this->assertArrayHasKey('EE_DMS_Core_4_2_0',$dmss);
		
	}
	public function test_parse_dms_classname(){
		$details = EE_Data_Migration_Manager::instance()->parse_dms_classname("EE_DMS_Funky_4_8_12");
		$this->assertEquals("Funky",$details['slug']);
		$this->assertEquals(4,$details['major_version']);
		$this->assertEquals(8,$details['minor_version']);
		$this->assertEquals(12,$details['micro_version']);
	}
	public function test_get_data_migrations_ran(){
		//make sure all DMSs are autoloaded
		EE_Data_Migration_Manager::instance()->get_all_data_migration_scripts_available();
		$dms1 = new EE_DMS_Core_4_1_0();
		$dms1->set_completed();
		$this->_pretend_ran_dms($dms1);
		$dms_ran = EE_Data_Migration_Manager::instance()->get_data_migrations_ran();
		$this->assertArrayHasKey('Core', $dms_ran);
		$this->assertArrayhasKey('4.1.0',$dms_ran['Core']);
	}
	private function _pretend_ran_dms(EE_Data_Migration_Script_Base $dms_class){
		$details = EE_Data_Migration_Manager::instance()->parse_dms_classname(get_class($dms_class));
		$plugin_slug_for_use_in_option_name = $details['slug'].".";
		$version_string = $details['major_version'].".".$details['minor_version'].".".$details['micro_version'];
		update_option(EE_Data_Migration_Manager::data_migration_script_option_prefix.$plugin_slug_for_use_in_option_name.$version_string,$dms_class->properties_as_array());
	}
	private function _pretend_current_code_state_is_at($code_version = NULL){
		if($code_version){
			$code_version_array = array($code_version => current_time('timestamp') - 1000);
			update_option('espresso_db_update',$code_version_array);
		}else{
			delete_option('espresso_db_update');
		}
	}
	private function _pretend_current_db_state_is_at($core_version = NULL){
		if( $core_version ){
			$current_db_state = array('Core'=>$core_version);
			update_option(EE_Data_Migration_Manager::current_database_state,$current_db_state);
		}else{
			delete_option(EE_Data_Migration_Manager::current_database_state);
		}
	}
	private function _add_mock_dms(){
		add_filter('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',array($this,'add_mock_dms'));
		EE_Data_Migration_Manager::reset();
	}
	public function add_mock_dms($dms_folders){
		$dms_folders[] = EE_TESTS_DIR . 'mocks/core/data_migration_scripts';
		return $dms_folders;
	}
}

// End of file EE_Data_Migration_Manager_Test.php
