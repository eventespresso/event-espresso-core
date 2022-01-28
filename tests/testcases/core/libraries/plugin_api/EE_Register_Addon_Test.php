<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * EE_Register_Addon_Test
 *
 * @package 	Event Espresso
 * @subpackage
 * @author 		Mike Nelson
 *
 * @group 		core/libraries/plugin_api
 * @group 		core
 * @group 		agg
 * @group 		addons
 * @group 		caps
 */
class EE_Register_Addon_Test extends EE_UnitTestCase
{

    private $_mock_addon_path;

    private $_reg_args;

    private $_addon_name;



    /**
     * Constructs a test case with the given name.
     *
     * @param string $name
     * @param array  $data
     * @param string $dataName
     */
    public function __construct($name = null, array $data = array(), $dataName = '')
    {
        $this->_mock_addon_path = EE_MOCKS_DIR . 'addons/eea-new-addon/';
        $this->_reg_args = array(
            'version'               => '1.0.0',
            'min_core_version'      => '4.0.0',
            'main_file_path'        => $this->_mock_addon_path . 'eea-new-addon.php',
            'dms_paths'             => $this->_mock_addon_path . 'core/data_migration_scripts',
            'model_paths'           => $this->_mock_addon_path . 'core/db_models',
            'class_paths'           => $this->_mock_addon_path . 'core/db_classes',
            'class_extension_paths' => $this->_mock_addon_path . 'core/db_class_extensions',
            'model_extension_paths' => $this->_mock_addon_path . 'core/db_model_extensions',
        );
        $this->_addon_name = 'New_Addon';
        parent::__construct($name, $data, $dataName);
    }



    public function setUp()
    {
        parent::setUp();
        add_filter(
            'FHEE__EEH_Activation__create_table__short_circuit',
            array($this, 'dont_short_circuit_new_addon_table'),
            20,
            3
        );
        // will be overridden by _pretend_addon_hook_time() on a per test basis as needed
        $this->_stop_pretending_addon_hook_time();
        // make sure that NO OTHER ADD_ONS are registered
        foreach (EE_Registry::instance()->addons as $key => $addon) {
            EE_Registry::instance()->addons->offsetUnset($key);
        }
    }



    /**
     * OK's the creation of the esp_new_addon table, because this hooks in AFTER EE_UNitTestCase's callback on this same hook
     *
     * @param bool   $short_circuit
     * @param string $table_name
     * @param string $create_sql
     * @return boolean
     */
    public function dont_short_circuit_new_addon_table($short_circuit = false, $table_name = '', $create_sql = '')
    {
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        if (
            in_array($table_name, array('esp_new_addon_thing', 'esp_new_addon_attendee_meta'), true)
            && ! $table_analysis->tableExists($table_name)
        ) {
            // echo "\r\n\r\nDONT short circuit $sql";
            // it's not altering. it's ok to allow this
            return false;
        }
        // echo "3\r\n\r\n short circuit:$sql";
        return $short_circuit;
    }



    // test registering a bare minimum addon, and then de-registering it
    public function test_register_mock_addon_fail()
    {
        $this->assertEquals(0, did_action('activate_plugin'));
        $this->assertEquals(1, did_action('AHEE__EE_System__load_espresso_addons'));
        $this->assertEquals(1, did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin'));
        //we're registering the addon WAAAY after EE_System has set thing up, so
        //registering this first time should throw an E_USER_NOTICE
        try {
            $registered = EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
            $this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
        } catch (PHPUnit_Framework_Error_Notice $e) {
            $registered = false;
        }
        $this->assertFalse($registered);
        //check that we didn't actually register the addon
        // $this->assertArrayNotHasKey('EE_New_Addon', EE_Registry::instance()->addons);
        $this->assertFalse(isset(EE_Registry::instance()->addons->EE_New_Addon));

        //check DMSs weren't setup either
        $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
        $this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
        //check that we didn't register the addon's deactivation hook either
        $this->assertFalse(has_action('deactivate_' . plugin_basename($this->_reg_args['main_file_path'])));
    }



    public function test_register_mock_addon_fail__bad_parameters()
    {
        // we're registering the addon at the right time but with the wrong parameters
        $this->_pretend_addon_hook_time();
        $this->assertEquals(0, did_action('activate_plugin'));
        $this->assertEquals(1, did_action('AHEE__EE_System__load_espresso_addons'));
        $this->assertEquals(0, did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin'));
        try {
            $registered = EE_Register_Addon::register(
                $this->_addon_name,
                array(
                	'version'          => '1.0.0',
                	'min_core_version' => '4.0.0',
                	'dms_paths'        => $this->_mock_addon_path . 'core/data_migration_scripts',
            	)
            );
            $this->fail(
                'We should have received a warning that the "main_file_path" is a required argument when registering an addon'
            );
        } catch (EE_Error $e) {
            $registered = false;
        }
        $this->assertFalse($registered);

        //check that we didn't actually register the addon
        $this->assertCount(0, EE_Registry::instance()->addons);
        $this->assertFalse(isset(EE_Registry::instance()->addons->EE_New_Addon));
        // $this->assertArrayNotHasKey('EE_New_Addon', (array) EE_Registry::instance()->addons);
        //check DMSs weren't setup either
        $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
        $this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
        //check that we didn't register the addon's de-activaiton hook either
        $this->assertFalse(has_action('deactivate_' . plugin_basename($this->_reg_args['main_file_path'])));
    }



    public function test_register_mock_addon_success()
    {
        //ensure model and class extensions weren't setup beforehand
        $this->assertFalse($this->_class_has_been_extended());
        $this->assertFalse($this->_model_has_been_extended());
        $this->_pretend_addon_hook_time();
        $this->assertEquals(0, did_action('activate_plugin'));
        $this->assertEquals(1, did_action('AHEE__EE_System__load_espresso_addons'));
        $this->assertEquals(0, did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin'));
        // $this->assertArrayNotHasKey('EE_New_Addon', (array) EE_Registry::instance()->addons);
        $this->assertFalse(isset(EE_Registry::instance()->addons->EE_New_Addon));
        //just to make this test truly test the "eea-new-addon", use its own addon params
        //this way we're more likely to keep the EE_New_Addon up-to-date
        require_once(EE_TESTS_DIR . 'mocks/addons/eea-new-addon/eea-new-addon.php');
        require_once(EE_TESTS_DIR . 'mocks/addons/eea-new-addon/EE_New_Addon.class.php');
        $this->assertCount(0, EE_Registry::instance()->addons);
        $registered = EE_New_Addon::register_addon();
        $this->assertTrue($registered);
        $this->assertTrue(isset(EE_Registry::instance()->addons->EE_New_Addon));
        $this->assertInstanceOf(
            'EE_New_Addon',
            EE_Registry::instance()->addons->EE_New_Addon
        );
        //check DMSs were setup properly too
        $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
        $this->assertArrayHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
        //and check the deactivation hook was setup properly
        $this->assertTrue(
            has_action('deactivate_' . EE_Registry::instance()->addons->EE_New_Addon->get_main_plugin_file_basename())
        );
        //check that the model was registered properly
        EE_System::instance()->load_core_configuration();
        $this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->non_abstract_db_models);
        $this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->models);
        $dms = EE_Registry::instance()->load_dms('New_Addon_1_0_0');
        $this->assertInstanceOf('EE_Data_Migration_Script_Base', $dms);
        $dms->set_migrating(false);
        $dms->schema_changes_before_migration();
        $dms->schema_changes_after_migration();
        $this->assertTableExists('esp_new_addon_thing', 'New_Addon_Thing');
        //check that the model extension was registered properly
        $this->assertTrue($this->_class_has_been_extended(true));
        $this->assertTrue($this->_model_has_been_extended(true));
        //check that the caps maps were registered properly too
        $this->_pretend_capabilities_registered();
        $current_user = $this->factory->user->create_and_get();
        $other_user = $this->factory->user->create_and_get();
        //give user administrator role for test!
        $current_user->add_role('administrator');
        $a_thing = $this->new_model_obj_with_dependencies('New_Addon_Thing', array('NEW_wp_user' => $current_user->ID));
        $others_thing = $this->new_model_obj_with_dependencies(
        	'New_Addon_Thing',
        	array('NEW_wp_user' => $other_user->ID)
        );
        $this->assertTrue(
            EE_Capabilities::instance()->user_can($current_user, 'edit_thing', 'testing_edit', $a_thing->ID())
        );
        $this->assertTrue(
            EE_Capabilities::instance()->user_can($current_user, 'edit_thing', 'testing_edit', $others_thing->ID())
        );
    }



    /**
     * Utility function to just setup valid capabilities for tests in this suite.
     *
     * @since 1.0.0
     * @return void
     */
    private function _pretend_capabilities_registered()
    {
        EE_Registry::instance()->load_core('Capabilities');
        EE_Capabilities::instance()->init_caps(true);
        //validate caps were registered and init saved.
        $admin_caps_init = EE_Capabilities::instance()->get_ee_capabilities('administrator');
        $this->assertArrayContains('edit_thing', $admin_caps_init);
        //verify new caps are in the role
        $role = get_role('administrator');
        $this->assertContains(
            array('edit_thing', 'edit_things', 'edit_others_things', 'edit_private_things'),
            $role->capabilities
        );
    }

    /**
     * uses the connection settings on EE_New_Addon::register() instead
     * of our copy of them
     */
    //	function test_register_mock_addon_success_using_its_callback(){
    //		//ensure model and class extensions weren't setup beforehand
    //		$this->assertFalse( $this->_class_has_been_extended() );
    //		$this->assertFalse( $this->_model_has_been_extended() );
    //
    //		$this->_pretend_addon_hook_time();
    //		if( did_action( 'activate_plugin' ) ){
    //			$this->assertTrue( FALSE );
    //		}
    //		$this->assertFalse(property_exists(EE_Registry::instance()->addons, 'EE_New_Addon'));
    //
    //
    //		//use the function in mocks/addons/new_addon/eea-new-addon.php
    //		load_espresso_new_addon();
    //
    //		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
    //		//check DMSs were setup properly too
    //		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
    //		$this->assertArrayHasKey('EE_DMS_New_Addon_1_0_0',$DMSs_available);
    //
    //		//and check the deactivation hook was setup properly
    //		$this->assertTrue( has_action( 'deactivate_' .  EE_Registry::instance()->addons->EE_New_Addon->get_main_plugin_file_basename() ) );
    //
    //		//check that the model was registered properly
    //		EE_System::instance()->load_core_configuration();
    //		$this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->non_abstract_db_models);
    //		$this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->models);
    //
    //		$dms = EE_Registry::instance()->load_dms('New_Addon_1_0_0');
    //		$this->assertInstanceOf( 'EE_Data_Migration_Script_Base', $dms );
    //		$dms->schema_changes_before_migration();
    //		$dms->schema_changes_after_migration();
    //		$this->assertTableExists( 'esp_new_addon_thing', 'New_Addon_Thing' );
    //		//check that the model extension was registered properly
    //		$this->assertTrue( $this->_class_has_been_extended( TRUE ) );
    //		$this->assertTrue( $this->_model_has_been_extended( TRUE ) );
    //	}
    /**
     * check that when we register an addon and then another after the 'activate_plugin'
     * action fired, that there are no errors and the 2nd addon's activation indicator
     * was set properly
     *
     * @throws \EE_Error
     */
    public function test_register_mock_addon__activation()
    {
        $this->_pretend_after_plugin_activation();
        $registered = EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
        $this->assertFalse($registered);

        $this->assertTrue(isset(EE_Registry::instance()->addons->EE_New_Addon));
        $this->assertInstanceOf(
            'EE_New_Addon',
            EE_Registry::instance()->addons->EE_New_Addon
        );
        $this->assertWPOptionExists(
            EE_Registry::instance()->addons->EE_New_Addon->get_activation_indicator_option_name()
        );
    }



    /**
     * registers an addon as usual, but then calls 'activate_plugin', as if a different
     * addon had been activated. Because the register method is called twice, this has the potential
     * for problems
     *
     * @throws \EE_Error
     */
    public function test_register_addon_called_twice_on_activation()
    {
        remove_all_filters('AHEE__EE_System__load_espresso_addons');
        EE_System::reset();
        $this->_pretend_addon_hook_time();
        $this->assertEquals(0, did_action('activate_plugin'));
        $this->assertFalse(isset(EE_Registry::instance()->addons->EE_New_Addon));
        EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
        $this->assertTrue(isset(EE_Registry::instance()->addons->EE_New_Addon));
        $this->assertInstanceOf(
            'EE_New_Addon',
            EE_Registry::instance()->addons->EE_New_Addon
        );
        global $wp_actions;
        $times_load_addons_fired = $wp_actions['AHEE__EE_System__load_espresso_addons'];
        do_action('activate_plugin');
        $this->assertGreaterThan($times_load_addons_fired, $wp_actions['AHEE__EE_System__load_espresso_addons']);
    }



    public function tearDown()
    {
        if (isset($this->_addon_name, EE_Registry::instance()->addons->EE_New_Addon)) {
            $main_file_path_before_deregistration = EE_Registry::instance()
            										->addons
            										->EE_New_Addon
            										->get_main_plugin_file_basename();
            EE_Register_Addon::deregister($this->_addon_name);
            $this->assertFalse(isset(EE_Registry::instance()->addons->EE_New_Addon));
            //verify the de-activation hook was removed
            $this->assertFalse(has_action('deactivate_' . $main_file_path_before_deregistration));
            //verify the models were deregistered
            EE_System::instance()->load_core_configuration();
            $this->assertArrayDoesNotContain('EEM_New_Addon_Thing', EE_Registry::instance()->non_abstract_db_models);
            $this->assertArrayDoesNotContain('EEM_New_Addon_Thing', EE_Registry::instance()->models);
            EE_Registry::instance()->reset_model('Attendee');
            //verify that the model and class extensions have been removed
            $this->assertFalse($this->_class_has_been_extended());
            $this->assertFalse($this->_model_has_been_extended());
        }
        //verify DMSs deregistered
        $DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
        $this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0', $DMSs_available);
        $this->_stop_pretending_addon_hook_time();
        $this->_stop_pretending_after_plugin_activation();
        remove_all_filters('AHEE__EE_System__load_espresso_addons');
        parent::tearDown();
    }

    /**
     * double checks that we the example addon is registering correctly.
     *
     * @todo: to make sure our example addon is really working, we should try using it
     * on its own
     */
    //	public function test_regular_new_addon_activation(){
    //		$this->_pretend_addon_hook_time();
    //		require_once( EE_TESTS_DIR . 'mocks/addons/eea-new-addon/eea-new-addon.php' );
    //		EE_New_Addon::register_addon();
    //		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
    //
    //		//and then it should be torn down by tearDown()
    //	}
    protected function _stop_pretending_after_plugin_activation()
    {
        global $wp_actions;
        unset($wp_actions['activate_plugin']);
    }



    protected function _pretend_after_plugin_activation()
    {
        do_action('activate_plugin');
    }



    protected function _pretend_addon_hook_time()
    {
        global $wp_actions;
        unset(
            $wp_actions['AHEE__EEM_Attendee__construct__end'],
            $wp_actions['AHEE__EE_System__load_core_configuration__begin'],
            $wp_actions['AHEE__EE_System__register_shortcodes_modules_and_widgets'],
            $wp_actions['AHEE__EE_System__core_loaded_and_ready']
        );
        parent::_pretend_addon_hook_time();
    }



    /**
     * Determines if the attendee class has been extended by teh mock extension
     *
     * @param bool $throw_error
     * @return bool
     * @throws \EE_Error
     */
    private function _class_has_been_extended($throw_error = false)
    {
        try {
            $a = EE_Attendee::new_instance();
            $a->foobar();
            return true;
        } catch (EE_Error $e) {
            if ($throw_error) {
                throw $e;
            }
            return false;
        }
    }



    /**
     * Determines if the Attendee model has been extended by the mock extension
     *
     * @param bool $throw_error
     * @return bool
     * @throws \EE_Error
     */
    private function _model_has_been_extended($throw_error = false)
    {
        try {
            /** @var EEM_Attendee $att */
            $att = EE_Registry::instance()->reset_model('Attendee');
            if (! $att->has_field('ATT_foobar')) {
                if ($throw_error) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'The field ATT_foobar is not on EEM_Attendee, but the extension should have added it. fields are: %s',
                                'event_espresso'
                            ), implode(",", array_keys(EEM_Attendee::instance()->field_settings()))
                        )
                    );
                }
                return false;
            }
            if (! $att->has_relation('New_Addon_Thing')) {
                if ($throw_error) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'The relation of type New_Addon_Thing on EEM_Attendee, but the extension should have added it. fields are: %s',
                                'event_espresso'
                            ), implode(",", array_keys(EEM_Attendee::instance()->field_settings()))
                        )
                    );
                }
                return false;
            }
            $att->get_all_new_things();
            return true;
        } catch (EE_Error $e) {
            if ($throw_error) {
                throw $e;
            }
            return false;
        }
    }



    public function test_effective_version()
    {
        //use reflection to test this protected method
        $method = new ReflectionMethod('EE_Register_Addon', '_effective_version');
        $method->setAccessible(true);
        $this->assertEquals('4.3.0.dev.000', $method->invoke(null, '4.3.0'));
        $this->assertEquals('4.3.0.p.000', $method->invoke(null, '4.3.0.p'));
        $this->assertEquals('4.3.0.rc.123', $method->invoke(null, '4.3.0.rc.123'));
    }



    public function test_meets_min_core_version_requirement()
    {
        //use reflection to test this protected method
        $method = new ReflectionMethod('EE_Register_Addon', '_meets_min_core_version_requirement');
        $method->setAccessible(true);
        $this->assertTrue($method->invoke(null, '4.3.0', '4.3.0.p'));
        $this->assertTrue($method->invoke(null, '4.3.0', '4.3.0.rc.032'));
        $this->assertTrue($method->invoke(null, '4.3.0.p', '4.3.0.p'));
        $this->assertTrue($method->invoke(null, '4.3.0.p', '4.4.0.p'));
        $this->assertTrue($method->invoke(null, '4.3.0.rc.000', '4.3.0.p'));
        $this->assertFalse($method->invoke(null, '4.4.0', '4.3.0.p'));
        $this->assertFalse($method->invoke(null, '4.4.0.p', '4.3.0.p'));
        $this->assertFalse($method->invoke(null, '4.3.0.rc.123', '4.3.0.rc.001'));
    }

}

// End of file EE_Register_Addon_Test.php
// Location: testcases/core/libraries/plugin_api/EE_Register_Addon_Test.php
