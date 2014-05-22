<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_System_Test_With_Addons
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * Tests EE_System's support for addons
 */
/**
 * @group core
 */
class EE_System_Test_With_Addons extends EE_UnitTestCase{
	/**
	 * The mock addon registered
	 * @var EE_Addon
	 */
	protected $_addon;

	protected $_addon_name = 'New_Addon';
	/**
	 * tests that we're correctly detecting activation or upgrades in registered
	 * addons.
	 * @group agg
	 */
	function test_detect_activations_or_upgrades__new_install(){
		global $wp_actions;
		$this->_addon_classname = get_class($this->_addon);

		//its activation history wp option shouldn't exist
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_history_option_name());
		//and it also shouldn't be in the current db state
		$current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		//just for assurance, make sure New Addon is the only existing addon
		$this->assertArrayNotHasKey($this->_addon_name, $current_db_state);
		$this->assertNull($this->_addon->detect_req_type());
		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"]) ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"] : 0;
		//set the activator option
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
		//now check for activations/upgrades in addons

		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_new_activation,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__new_install"]);
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
		//now we also want to check that the addon will have created the necessary table
		//that it needed upon new activation (and so we call the function that does it, which
		//is normally called a little later in the request)
		EE_System::instance()->perform_activations_upgrades_and_migrations();
		$this->assertTableExists('new_addon');
	}

	public function test_detect_activations_or_upgrades__upgrade_on_activation(){
		global $wp_actions;
		$addon_classname = get_class($this->_addon);
		//first make sure the mock DMS can migrate from v 0.0.1
		$dms = new EE_DMS_New_Addon_0_0_2();
		$this->assertTrue($dms->can_migrate_from_version(array($this->_addon_name=>'0.0.1')));

		//it should have an entry in its activation history and db state
		$activation_history_option_name = $this->_addon->get_activation_history_option_name();
		update_option($activation_history_option_name,array($this->_addon->version()));
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		$db_state[$this->_addon_name] = '0.0.1';
		update_option(EE_Data_Migration_Manager::current_database_state,$db_state);
		//pretend the activation indicator option was set (by WP calling its activation hook)
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$addon_classname}__upgrade"] : 0;
		//the site shouldn't be in MM before
		$this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level());

		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$addon_classname}__upgrade"]);
		//the fact that there's an applicable DMS means the site should be placed in maintenance mode
		$this->assertEquals(EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level());
		//check that the activation indicator option was removed
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
		//ok all done
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
	}

	/**
	 * tests we detect an upgrade even when the plugin isn't newly activated
	 * @global array $wp_actions
	 */
	public function test_detect_activations_or_upgrades__upgrade_on_normal_request(){
		global $wp_actions;
		$addon_classname = get_class($this->_addon);
		//first make sure the mock DMS can migrate from v 0.0.1
		$dms = new EE_DMS_New_Addon_0_0_2();
		$this->assertTrue($dms->can_migrate_from_version(array($this->_addon_name=>'0.0.1')));

		//it should have an entry in its activation history and db state
		$activation_history_option_name = $this->_addon->get_activation_history_option_name();
		update_option($activation_history_option_name,array($this->_addon->version()));
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		$db_state[$this->_addon_name] = '0.0.1';
		update_option(EE_Data_Migration_Manager::current_database_state,$db_state);

		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$addon_classname}__upgrade"] : 0;
		//the site shouldn't be in MM before
		$this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level());
		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$addon_classname}__upgrade"]);
		//the fact that there's an applicable DMS means the site should be placed in maintenance mode
		$this->assertEquals(EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level());
		//ok all done
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
	}

	public function test_detect_activations_or_upgrades__reactivation(){
		global $wp_actions;
		$addon_classname = get_class($this->_addon);

		//it should have an entry in its activation history and db state
		$activation_history_option_name = $this->_addon->get_activation_history_option_name();
		update_option($activation_history_option_name,array($this->_addon->version()));
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		$db_state['New_Addon'] = '0.0.1';
		update_option(EE_Data_Migration_Manager::current_database_state,$db_state);

		//set the activator option
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());

		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$addon_classname}__upgrade"] : 0;
		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$addon_classname}__upgrade"]);
		$this->assertEquals(EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level());
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
		//ok all done
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
	}
	/**
	 * Registers the mock addon so it can be used for testing
	 * @return EE_Addon
	 */
	public function setUp(){
		$this->_pretend_addon_hook_time();
		$mock_addon_path = EE_TESTS_DIR.'mocks/addons/new-addon/';
		EE_Register_Addon::register($this->_addon_name, array(
			'version'=>'0.0.1',
			'min_core_version'=>'4.0.0',
			'base_path'=>$mock_addon_path,
			'dms_paths'=>$mock_addon_path . 'core/data_migration_scripts'
			));
		//double-check that worked fine
		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_New_Addon_0_0_2',$DMSs_available);

		//ensure this is the only addon
		$this->assertEquals(1,count(EE_Registry::instance()->addons));
		$this->assertNull(EE_Registry::instance()->addons->EE_New_Addon->detect_req_type());
		$this->_addon = EE_Registry::instance()->addons->EE_New_Addon;
	}

	public function tearDown(){
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

// End of file EE_System_Test_With_Addons.php