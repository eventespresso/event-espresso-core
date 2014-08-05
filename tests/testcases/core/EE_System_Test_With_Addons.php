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

	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		$this->_main_file_path = EE_TESTS_DIR . 'mocks/addons/new-addon/espresso-new-addon.php';require_once $this->_main_file_path;
		parent::__construct($name, $data, $dataName);
	}
	/**
	 * The mock addon registered
	 * @var EE_Addon
	 */
	protected $_addon;

	/**
	 * THe addon's name/slug
	 * @var string
	 */
	protected $_addon_name = 'New_Addon';

	/**
	 * the addon class' classname
	 * @var string
	 */
	protected $_addon_classname = '';

	/**
	 * the original activation history for the addon (gets restored after each test)
	 * @var array
	 */
	protected $_addon_activation_history;

	/**
	 * The current db state wp option; it gets stored before each test and restored after each test
	 * @var array
	 */
	protected $_current_db_state = array();
	/**
	 * tests that we're correctly detecting activation or upgrades in registered
	 * addons.
	 * @group agg
	 */
	function test_detect_activations_or_upgrades__new_install(){
		global $wp_actions;

		//its activation history wp option shouldn't exist
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_history_option_name());
		//and it also shouldn't be in the current db state
		$current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		//just for assurance, make sure New Addon is the only existing addon
		$this->assertArrayNotHasKey($this->_addon_name, $current_db_state);
		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"]) ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"] : 0;
		//set the activator option
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
//		$this->assertTableDoesNotExist( 'new_addon' );
		//now check for activations/upgrades in addons

		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_new_activation,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__new_install"]);
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
		//now we also want to check that the addon will have created the necessary table
		//that it needed upon new activation (and so we call the function that does it, which
		//is normally called a little later in the request)
		EE_System::instance()->perform_activations_upgrades_and_migrations();
		$this->assertTableExists('esp_new_addon_thing');
	}

	public function test_detect_activations_or_upgrades__upgrade_on_activation(){
		global $wp_actions;
		$this->_addon_classname = get_class($this->_addon);
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
		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
		//the site shouldn't be in MM before
		$this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level());

		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]);
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
		//first make sure the mock DMS can migrate from v 0.0.1
		$dms = new EE_DMS_New_Addon_0_0_2();
		$this->assertTrue($dms->can_migrate_from_version(array($this->_addon_name=>'0.0.1')));

		//it should have an entry in its activation history and db state
		$activation_history_option_name = $this->_addon->get_activation_history_option_name();
		update_option($activation_history_option_name,array($this->_addon->version()));
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		$db_state[$this->_addon_name] = '0.0.1';
		update_option(EE_Data_Migration_Manager::current_database_state,$db_state);

		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
		//the site shouldn't be in MM before
		$this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level());
		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]);
		//the fact that there's an applicable DMS means the site should be placed in maintenance mode
		$this->assertEquals(EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level());
		//ok all done
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
	}

	public function test_detect_activations_or_upgrades__reactivation(){
		global $wp_actions;

		$this->assertEquals(EE_Maintenance_Mode::level_0_not_in_maintenance,  EE_Maintenance_Mode::instance()->level());

		//it should have an entry in its activation history and db state
		$activation_history_option_name = $this->_addon->get_activation_history_option_name();
		update_option($activation_history_option_name,array($this->_addon->version()));
		$db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		$db_state['New_Addon'] = '0.0.1';
		update_option(EE_Data_Migration_Manager::current_database_state,$db_state);

		//set the activator option
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());

		$times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"]) ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_upgrade,$this->_addon->detect_req_type());
		$this->assertEquals($times_its_new_install_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]);
		$this->assertEquals(EE_Maintenance_Mode::level_2_complete_maintenance,  EE_Maintenance_Mode::instance()->level());
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
		//ok all done
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
	}

	/**
	 * Checks that even though the addon was activated, because it happened during
	 * maintenance mode, we couldn't do any of its setup logic. (SO it should be run
	 * later, when the site is taken out of MM)
	 * @global array $wp_actions
	 */
	public function test_detect_actiavtions_or_upgrade__activation_during_maintenance_mode(){
		global $wp_actions;

		//its activation history wp option shouldn't exist
		delete_option($this->_addon->get_activation_history_option_name());
		//and it also shouldn't be in the current db state
		$current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		//just for assurance, make sure New Addon is the only existing addon
		unset($current_db_state[ $this->_addon_name ]);
		update_option( EE_Data_Migration_Manager::current_database_state,$current_db_state );
		$times_reactivation_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__reactivation"]) ? $wp_actions["AHEE__{$this->_addon_classname}__reactivation"] : 0;
		//set the activator option
		update_option($this->_addon->get_activation_indicator_option_name(),TRUE);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
		//lastly, and imporatntly SET MAINTENANCE MODE LEVEL 2
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_2_complete_maintenance);

//		$this->assertTableDoesNotExist( 'new_addon' );
		//now check for activations/upgrades in addons
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_activation_but_not_installed,$this->_addon->detect_req_type());
		$this->assertEquals($times_reactivation_hook_fired_before, isset( $wp_actions["AHEE__{$this->_addon_classname}__reactivation"] ) ? $wp_actions["AHEE__{$this->_addon_classname}__reactivation"] : 0);
		$this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name() );

		//ok, now let's pretend the site was teaken out of MM
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);

		//check for activations/upgrades again. This time activation should be detected
		EE_System::reset()->detect_activations_or_upgrades();
		$this->assertEquals(EE_System::req_type_reactivation,$this->_addon->detect_req_type());
		$this->assertEquals($times_reactivation_hook_fired_before + 1, $wp_actions["AHEE__{$this->_addon_classname}__reactivation"]);
		$this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());

		//now we also want to check that the addon will have created the necessary table
		//that it needed upon new activation (and so we call the function that does it, which
		//is normally called a little later in the request)
		EE_System::instance()->perform_activations_upgrades_and_migrations();
		$this->assertTableExists('esp_new_addon_thing');
	}

	/**
	 * Registers the mock addon so it can be used for testing
	 */
	public function setUp(){
		parent::setUp();

		$this->_pretend_addon_hook_time();
		$mock_addon_path = EE_TESTS_DIR.'mocks/addons/new-addon/';
		EE_Register_Addon::register($this->_addon_name, array(
			'version'=>'0.0.1',
			'min_core_version'=>'4.0.0',
			'main_file_path'=>$mock_addon_path . 'espresso-new-addon.php',
			'dms_paths'=>$mock_addon_path . 'core/data_migration_scripts'
			));
		//double-check that worked fine
		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_New_Addon_0_0_2',$DMSs_available);

		//ensure this is the only addon
		$this->assertEquals(1,count(EE_Registry::instance()->addons));
		$this->_addon = EE_Registry::instance()->addons->EE_New_Addon;
		$this->assertTrue( $this->_addon instanceof EE_New_Addon );
		$this->_addon_classname = get_class($this->_addon);
		$this->_addon_activation_history = $this->_addon->get_activation_history();
		$this->_current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
		delete_option(EE_Data_Migration_Manager::current_database_state);
		update_option(EE_Data_Migration_Manager::current_database_state, array('Core' => espresso_version() ) );
	}


	public function tearDown(){
		//if somehow $this->_addon isn't set, we don't need to worry about deregistering it right?
		if( $this->_addon instanceof EE_Addon ){
			update_option( $this->_addon->get_activation_history_option_name(), $this->_addon_activation_history );
			update_option(EE_Data_Migration_Manager::current_database_state, $this->_current_db_state );
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
		parent::tearDown();
	}

}

// End of file EE_System_Test_With_Addons.php
