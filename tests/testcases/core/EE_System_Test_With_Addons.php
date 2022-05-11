<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\container\RegistryContainer;
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');
/**
 * EE_System_Test_With_Addons
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * Tests EE_System's support for addons
 */


/**
 * @group core
 * @group addons
 * @group activation
 */
class EE_System_Test_With_Addons extends EE_UnitTestCase
{

    /**
     * @var TableAnalysis $_table_analysis
     */
    protected $_table_analysis;

    /**
     * @var TableManager $_table_manager
     */
    protected $_table_manager;

    /**
     * The mock addon registered
     *
     * @var EE_Addon
     */
    protected $_addon;

    /**
     * THe addon's name/slug
     *
     * @var string
     */
    protected $_addon_name = 'New_Addon';

    /**
     * the addon class' classname
     *
     * @var string
     */
    protected $_addon_classname = '';

    /**
     * the original activation history for the addon (gets restored after each test)
     *
     * @var array
     */
    protected $_addon_activation_history;

    /**
     * The current db state wp option; it gets stored before each test and restored after each test
     *
     * @var array
     */
    protected $_current_db_state = [];

    /**
     * For when we are detecting an upgrade in an addon, we pretend its old database
     * version was this
     *
     * @var string
     */
    protected $_pretend_addon_previous_version = '0.0.1.dev.000';

    /**
     * Names of the temporary tables added by the add-on
     *
     * @var array
     */
    protected $_temp_tables_added_by_addon = ['esp_new_addon_thing', 'esp_new_addon_attendee_meta'];


    /**
     * Registers the mock addon so it can be used for testing
     *
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws EE_Error
     * @throws DomainException
     * @throws ReflectionException
     */
    public function set_up()
    {
        parent::set_up();
        $this->_table_analysis = new TableAnalysis();
        $this->_table_manager  = new TableManager($this->_table_analysis);
        $this->_pretend_addon_hook_time();
        require_once EE_TESTS_DIR . 'mocks/addons/eea-new-addon/EE_New_Addon.class.php';
        $mock_addon_path                = EE_TESTS_DIR . 'mocks/addons/eea-new-addon/';
        EE_Registry::instance()->addons = new RegistryContainer('addons_test');
        EE_Register_Addon::register(
            $this->_addon_name,
            [
                'version'          => '1.0.0.dev.000',
                'min_core_version' => '4.0.0',
                'main_file_path'   => $mock_addon_path . 'eea-new-addon.php',
                'dms_paths'        => $mock_addon_path . 'core/data_migration_scripts',
            ]
        );
        // now verify that this is the only addon
        $this->assertCount(1, EE_Registry::instance()->addons);
        //double-check that worked fine
        $this->assertArrayHasKey(
            'EE_New_Addon',
            EE_Registry::instance()->addons
        );
        $this->assertInstanceOf(
            'EE_New_Addon',
            EE_Registry::instance()->addons->EE_New_Addon
        );
        $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
        $this->assertArrayHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
        $this->_addon = EE_Registry::instance()->addons->EE_New_Addon;
        $this->assertInstanceOf('EE_New_Addon', $this->_addon);
        $this->_addon_classname          = get_class($this->_addon);
        $this->_addon_activation_history = $this->_addon->get_activation_history();
        $this->_current_db_state         = get_option(EE_Data_Migration_Manager::current_database_state);
        delete_option(EE_Data_Migration_Manager::current_database_state);
        update_option(
            EE_Data_Migration_Manager::current_database_state,
            ['Core' => espresso_version()]
        );
        add_filter(
            'FHEE__EEH_Activation__create_table__short_circuit',
            [$this, 'dont_short_circuit_new_addon_table'],
            20,
            2
        );
    }


    public function tear_down()
    {
        //if somehow $this->_addon isn't set, we don't need to worry about deregistering it right?
        if ($this->_addon instanceof EE_Addon) {
            update_option(
                $this->_addon->get_activation_history_option_name(),
                $this->_addon_activation_history
            );
            update_option(
                EE_Data_Migration_Manager::current_database_state,
                $this->_current_db_state
            );
            EE_Register_Addon::deregister($this->_addon_name);
            try {
                EE_Registry::instance()->addons->EE_New_Addon;
                $this->fail('EE_New_Addon is still registered. Deregister failed');
            } catch (Exception $e) {
                $this->assertInstanceOf('OutOfBoundsException', $e);
            }
            //verify DMSs deregistered
            $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
            $this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
            $this->_stop_pretending_addon_hook_time();
            // drop all the temporary tables we created during this test,
            // because each subsequent test expects them to be gone
            $this->_table_manager->dropTables($this->_temp_tables_added_by_addon);
        }
        parent::tear_down();
    }


    /**
     * OK's the creation of the esp_new_addon table, because this hooks in AFTER EE_UNitTestCase's callback on this
     * same hook
     *
     * @param boolean $short_circuit whether or not to short-circuit
     * @param string  $table_name    name we're about to create. Should NOT have the $wpdb->prefix on it
     * @return array|bool
     * @global wpdb   $wpdb
     */
    public function dont_short_circuit_new_addon_table($short_circuit = false, $table_name = '')
    {
        //allow creation of new_addon tables. Unfortunately, this also allows their modification, which causes
        //implicit commits. But I like allowing re-defining the tables on test
        //test_detect_activations_or_upgrades__new_install_on_core_and_addon_simultaneously
        //so we can confirm a notices are sent when attempting to redefine an addon table
        if (in_array($table_name, $this->_temp_tables_added_by_addon, true)) {
            //it's not altering. it's ok to allow this
            return false;
        }
        return $short_circuit;
    }


    private function _add_mock_dms()
    {
        add_filter('FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders', [$this, 'add_mock_dms']);
        EE_Data_Migration_Manager::reset();
    }


    private function _remove_mock_dms()
    {
        remove_filter(
            'FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',
            [$this, 'add_mock_dms']
        );
        EE_Data_Migration_Manager::reset();
    }


    public function add_mock_dms($dms_folders)
    {
        $dms_folders[] = EE_TESTS_DIR . 'mocks/core/data_migration_scripts';
        return $dms_folders;
    }


    /**
     * tests that we're correctly detecting activation or upgrades in registered
     * addons.
     *
     * @group agg
     * @group 8328
     */
    public function test_detect_activations_or_upgrades__new_install()
    {
        global $wp_actions;
        //its activation history wp option shouldn't exist
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_history_option_name());
        //and it also shouldn't be in the current db state
        $current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
        //just for assurance, make sure New Addon is the only existing addon
        $this->assertArrayNotHasKey($this->_addon_name, $current_db_state);
        $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"] : 0;
        //set the activator option
        update_option($this->_addon->get_activation_indicator_option_name(), true);
        $this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
        $this->assertTableDoesNotExist('esp_new_addon_thing');
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_new_activation, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_its_new_install_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__new_install"]
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
        //now we also want to check that the addon will have created the necessary table
        //that it needed upon new activation
        $this->assertTableExists('esp_new_addon_thing');
    }


    /**
     * tests that we're correctly detecting activation or upgrades in registered
     * addons.
     *
     * @group agg
     */
    public function test_detect_activations_or_upgrades__new_install_on_core_and_addon_simultaneously()
    {
        global $wp_actions, $wpdb;
        //pretend core was just activated
        delete_option('espresso_db_update');
        update_option('ee_espresso_activation', true);
        delete_option('ee_pers_admin_notices');
        //its activation history wp option shouldn't exist
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_history_option_name());
        //and it also shouldn't be in the current db state
        $current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
        //just for assurance, make sure New Addon is the only existing addon
        $this->assertArrayNotHasKey($this->_addon_name, $current_db_state);
        $times_addon_new_install_hook_fired = isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"]
            : 0;
        $times_core_new_install_hook_fired  =
            isset($wp_actions['AHEE__EE_System__detect_if_activation_or_upgrade__new_activation'])
                ? $wp_actions['AHEE__EE_System__detect_if_activation_or_upgrade__new_activation']
                : 0;
        //set the activator option
        update_option($this->_addon->get_activation_indicator_option_name(), true);
        $this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
        $this->assertTableDoesNotExist('esp_new_addon_thing');
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_new_activation, EE_System::instance()->detect_req_type());
        $this->assertEquals(EE_System::req_type_new_activation, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_addon_new_install_hook_fired + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__new_install"]
        );
        $this->assertEquals(
            $times_core_new_install_hook_fired + 1,
            $wp_actions['AHEE__EE_System__detect_if_activation_or_upgrade__new_activation']
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
        $this->assertWPOptionDoesNotExist('ee_espresso_activation');
        $this->assertTableExists('esp_new_addon_thing');
        //verify we haven't remarked that there we tried adding a duplicate table
        $notices = get_option('ee_pers_admin_notices', []);
        $this->assertArrayNotHasKey('bad_table_' . $wpdb->prefix . 'esp_new_addon_thing_detected', $notices);
        //double-check that when we intentionally try to add a table we just asserted exists
        //that the warning gets sent out
        global $track_it;
        $track_it = true;
        try {
            EEH_Activation::create_table(
                'esp_new_addon_thing',
                'BORKED SQL',
                'ENGINE=MyISAM ',
                true
            );
            $this->fail('Borked SQL didn\'t cause EEH_Activation::create_table to throw an EE_Error. It should have');
        } catch (EE_Error $e) {
            $this->assertTrue(true);
        }
    }


    public function test_detect_activations_or_upgrades__upgrade_on_activation()
    {
        global $wp_actions;
        $this->_addon_classname = get_class($this->_addon);
        //first make sure the mock DMS can migrate from v 0.0.1
        $dms = new EE_DMS_New_Addon_1_0_0();
        $this->assertTrue(
            $dms->can_migrate_from_version(
                [$this->_addon_name => $this->_pretend_addon_previous_version]
            )
        );
        //it should have an entry in its activation history and db state
        $activation_history_option_name = $this->_addon->get_activation_history_option_name();
        update_option($activation_history_option_name, [$this->_pretend_addon_previous_version]);
        $db_state                       = get_option(EE_Data_Migration_Manager::current_database_state);
        $db_state[ $this->_addon_name ] = $this->_pretend_addon_previous_version;
        update_option(EE_Data_Migration_Manager::current_database_state, $db_state);
        //pretend the activation indicator option was set (by WP calling its activation hook)
        update_option($this->_addon->get_activation_indicator_option_name(), true);
        $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
        //the site shouldn't be in MM before
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_upgrade, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_its_new_install_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]
        );
        //the fact that there's an applicable DMS means the site should be placed in maintenance mode
        $this->assertEquals(
            EE_Maintenance_Mode::level_2_complete_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        //check that the activation indicator option was removed
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
        //ok all done
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
    }


    /**
     * tests we detect an upgrade even when the plugin isn't newly activated
     *
     * @global array $wp_actions
     */
    public function test_detect_activations_or_upgrades__upgrade_on_normal_request()
    {
        global $wp_actions;
        //first make sure the mock DMS can migrate from v 0.0.1
        $dms = new EE_DMS_New_Addon_1_0_0();
        $this->assertTrue(
            $dms->can_migrate_from_version(
                [$this->_addon_name => $this->_pretend_addon_previous_version]
            )
        );
        //it should have an entry in its activation history and db state
        $activation_history_option_name = $this->_addon->get_activation_history_option_name();
        update_option($activation_history_option_name, [$this->_pretend_addon_previous_version]);
        $db_state                       = get_option(EE_Data_Migration_Manager::current_database_state);
        $db_state[ $this->_addon_name ] = $this->_pretend_addon_previous_version;
        update_option(EE_Data_Migration_Manager::current_database_state, $db_state);
        $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
        //the site shouldn't be in MM before
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_upgrade, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_its_new_install_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]
        );
        //the fact that there's an applicable DMS means the site should be placed in maintenance mode
        $this->assertEquals(
            EE_Maintenance_Mode::level_2_complete_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        //ok all done
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
    }


    public function test_detect_activations_or_upgrades__reactivation()
    {
        global $wp_actions;
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        //it should have an entry in its activation history and db state
        $activation_history_option_name = $this->_addon->get_activation_history_option_name();
        update_option(
            $activation_history_option_name,
            [$this->_addon->version() => [current_time('mysql')]]
        );
        $db_state              = get_option(EE_Data_Migration_Manager::current_database_state);
        $db_state['New_Addon'] = $this->_addon->version();
        update_option(EE_Data_Migration_Manager::current_database_state, $db_state);
        //set the activator option
        update_option($this->_addon->get_activation_indicator_option_name(), true);
        $this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
        $times_its_new_install_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__reactivation"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__reactivation"] : 0;
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_reactivation, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_its_new_install_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__reactivation"]
        );
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
        //ok all done
        EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
    }


    /**
     * Checks that even though the addon was activated, because it happened during
     * maintenance mode, we couldn't do any of its setup logic. (SO it should be run
     * later, when the site is taken out of MM)
     *
     * @global array $wp_actions
     * @group 6812
     * @group 6910
     */
    public function test_detect_actiavtions_or_upgrade__activation_during_maintenance_mode()
    {
        global $wp_actions;
        //its activation history wp option shouldn't exist
        delete_option($this->_addon->get_activation_history_option_name());
        //and it also shouldn't be in the current db state
        $current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
        //just for assurance, make sure New Addon is the only existing addon
        unset($current_db_state[ $this->_addon_name ]);
        update_option(EE_Data_Migration_Manager::current_database_state, $current_db_state);
        $times_reactivation_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"]
            : 0;
        //set the activator option
        update_option($this->_addon->get_activation_indicator_option_name(), true);
        $this->assertWPOptionExists($this->_addon->get_activation_indicator_option_name());
        //lastly, and imporatntly ADD A DMS SO MAINTENANCE MODE will be set
        $this->_add_mock_dms();
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(
            EE_Maintenance_Mode::level_2_complete_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        $this->assertEquals(EE_System::req_type_new_activation, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_reactivation_hook_fired_before + 1,
            isset($wp_actions["AHEE__{$this->_addon_classname}__new_install"])
                ? $wp_actions["AHEE__{$this->_addon_classname}__new_install"] : 0
        );
        $this->assertArrayContains(
            'New_Addon',
            EE_Data_Migration_Manager::instance()->get_db_initialization_queue()
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
        $this->assertTableDoesNotExist('esp_new_addon_thing');
        //ok, now let's pretend the site was teaken out of MM because migrations were finished
        $this->_remove_mock_dms();
        EE_Maintenance_Mode::reset()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        EE_Data_Migration_Manager::instance()->initialize_db_for_enqueued_ee_plugins();
        //now we also want to check that the addon will have created the necessary table
        //that it needed upon new activation
        $this->assertEquals(
            [],
            EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts()
        );
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->real_level()
        );
        $this->assertTableExists('esp_new_addon_thing');
        //check for activations/upgrades again. It should be a normal request
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_normal, $this->_addon->detect_req_type(true));
        $this->assertEquals(
            $times_reactivation_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__new_install"]
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
    }


    /**
     * Checks that even though the addon was upgraded, because it happened during
     * maintenance mode, we couldn't do any of its setup logic. (SO it should be run
     * later, when the site is taken out of MM by the migration manager)
     *
     * @group 6910
     */
    public function test_detect_actiavtions_or_upgrade__upgrade_during_maintenance_mode()
    {
        global $wp_actions;
        //pretend an older version of this addon was activated a while ago
        $addon_activation_history = [
            '0.9.0.dev.000' => [
                date('Y-m-d H:i:s', current_time('timestamp') - DAY_IN_SECONDS * 10),
            ],
        ];
        update_option($this->_addon->get_activation_history_option_name(), $addon_activation_history);
        //and it also shouldn't be in the current db state
        $current_db_state = get_option(EE_Data_Migration_Manager::current_database_state);
        //just for assurance, make sure New Addon is the only existing addon
        unset($current_db_state[ $this->_addon_name ]);
        update_option(EE_Data_Migration_Manager::current_database_state, $current_db_state);
        $times_reactivation_hook_fired_before = isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"])
            ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0;
        //lastly, and importantly SET MAINTENANCE MODE LEVEL 2
        $this->_add_mock_dms();
        //now check for activations/upgrades in addons
        EE_System::reset();
        $this->assertEquals(
            EE_Maintenance_Mode::level_2_complete_maintenance,
            EE_Maintenance_Mode::instance()->level()
        );
        $this->assertEquals(EE_System::req_type_upgrade, $this->_addon->detect_req_type());
        $this->assertEquals(
            $times_reactivation_hook_fired_before + 1,
            isset($wp_actions["AHEE__{$this->_addon_classname}__upgrade"])
                ? $wp_actions["AHEE__{$this->_addon_classname}__upgrade"] : 0
        );
        $this->assertArrayContains(
            'New_Addon',
            EE_Data_Migration_Manager::instance()->get_db_initialization_queue()
        );
        $addon_activation_history = $this->_addon->get_activation_history();
        $this->assertArrayHasKey('0.9.0.dev.000', $addon_activation_history);
        $this->assertArrayHasKey('1.0.0.dev.000', $addon_activation_history);
        $this->assertTableDoesNotExist('esp_new_addon_thing');
        //ok, now let's pretend the site was taken out of MM because migrations were finished
        $this->_remove_mock_dms();
        EE_Maintenance_Mode::reset()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
        EE_Data_Migration_Manager::instance()->initialize_db_for_enqueued_ee_plugins();
        //now we also want to check that the addon will have created the necessary table
        //that it needed upon new activation
        $this->assertEquals(
            [],
            EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts()
        );
        $this->assertEquals(
            EE_Maintenance_Mode::level_0_not_in_maintenance,
            EE_Maintenance_Mode::instance()->real_level()
        );
        $this->assertTableExists('esp_new_addon_thing');
        //check for activations/upgrades again. It should be a normal request
        EE_System::reset();
        $this->assertEquals(EE_System::req_type_normal, $this->_addon->detect_req_type(true));
        $this->assertEquals(
            $times_reactivation_hook_fired_before + 1,
            $wp_actions["AHEE__{$this->_addon_classname}__upgrade"]
        );
        $this->assertWPOptionDoesNotExist($this->_addon->get_activation_indicator_option_name());
    }
}

// End of file EE_System_Test_With_Addons.php
// Location:  tests/testcases/core/EE_System_Test_With_Addons.php
