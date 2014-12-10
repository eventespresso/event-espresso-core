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
 * @group core
 * @group agg
 * @group addons
 */
class EE_Register_Addon_Test extends EE_UnitTestCase{
	private $_mock_addon_path;
	private $_reg_args;
	private $_addon_name;
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		$this->_mock_addon_path = EE_MOCKS_DIR.'addons/eea-new-addon/';
		$this->_reg_args = array(
			'version'=>'1.0.0',
			'min_core_version'=>'4.0.0',
			'main_file_path'=>$this->_mock_addon_path . 'eea-new-addon.php',
			'dms_paths'=>$this->_mock_addon_path . 'core/data_migration_scripts',
			'model_paths' => $this->_mock_addon_path . 'core/db_models',
			'class_paths' => $this->_mock_addon_path . 'core/db_classes',
			'class_extension_paths' => $this->_mock_addon_path . 'core/db_class_extensions',
			'model_extension_paths' => $this->_mock_addon_path . 'core/db_model_extensions',

		);
		$this->_addon_name = 'New_Addon';
		parent::__construct($name, $data, $dataName);
	}
	public function setUp(){
		parent::setUp();
		add_filter( 'FHEE__EEH_Activation__create_table__short_circuit', array( $this, 'dont_short_circuit_new_addon_table' ), 20, 3 );
	}
	/**
	 * OK's the creation of the esp_new_addon table, because this hooks in AFTER EE_UNitTestCase's callback on this same hook
	 * @global type $wpdb
	 * @param array $whitelisted_tables
	 * @return array
	 */
	public function dont_short_circuit_new_addon_table( $short_circuit = FALSE, $table_name = '', $create_sql = '' ){
		if( in_array( $table_name, array( 'esp_new_addon_thing', 'esp_new_addon_attendee_meta' ) ) && ! EEH_Activation::table_exists( $table_name) ){
//			echo "\r\n\r\nDONT shortcircuit $sql";
			//it's not altering. it's ok to allow this
			return FALSE;
		}else{
//			echo "3\r\n\r\nshort circuit:$sql";
			return $short_circuit;
		}
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
		//check dmss weren't setup either
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0',$DMSs_available);

		//check that we didn't register the addon's deactivaiton hook either
		$this->assertFalse( has_action( 'deactivate_' .  plugin_basename( $this->_reg_args[ 'main_file_path' ] ) )  );
	}

	function test_register_mock_addon_fail__bad_parameters(){
		//we're registering the addon with the wrong parameters
		$this->_pretend_addon_hook_time();
		if( did_action( 'activate_plugin' ) ){
			$this->assertTrue( FALSE );
		}
		try{
			EE_Register_Addon::register($this->_addon_name, array(
				'version'=>'1.0.0',
				'min_core_version'=>'4.0.0',
				'dms_paths'=>$this->_mock_addon_path . 'core/data_migration_scripts'
			));
			$this->fail('We should have received a warning that the \'plugin_main_file\' is a required argument when registerign an addon');
		}catch(EE_Error $e){
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
		$this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0',$DMSs_available);

		//check that we didn't register the addon's deactivaiton hook either
		$this->assertFalse( has_action( 'deactivate_' .  plugin_basename( $this->_reg_args[ 'main_file_path' ] ) )  );
	}

	function test_register_mock_addon_success(){
		//ensure model and class extensions weren't setup beforehand
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );

		$this->_pretend_addon_hook_time();
		if( did_action( 'activate_plugin' ) ){
			$this->assertTrue( FALSE );
		}
		$this->assertFalse(property_exists(EE_Registry::instance()->addons, 'EE_New_Addon'));


		EE_Register_Addon::register($this->_addon_name, $this->_reg_args);

		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
		//check DMSs were setup properly too
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayHasKey('EE_DMS_New_Addon_1_0_0',$DMSs_available);

		//and check the deactivation hook was setup properly
		$this->assertTrue( has_action( 'deactivate_' .  EE_Registry::instance()->addons->EE_New_Addon->get_main_plugin_file_basename() ) );

		//check that the model was registered properly
		EE_System::instance()->load_core_configuration();
		$this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->non_abstract_db_models);
		$this->assertArrayContains('EEM_New_Addon_Thing', EE_Registry::instance()->models);

		$dms = EE_Registry::instance()->load_dms('New_Addon_1_0_0');
		$this->assertInstanceOf( 'EE_Data_Migration_Script_Base', $dms );
		$dms->set_migrating( FALSE );
		$dms->schema_changes_before_migration();
		$dms->schema_changes_after_migration();
		$this->assertTableExists( 'esp_new_addon_thing', 'New_Addon_Thing' );
		//check that the model extension was registerd properly
		$this->assertTrue( $this->_class_has_been_extended( TRUE ) );
		$this->assertTrue( $this->_model_has_been_extended( TRUE ) );
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
//		//check that the model extension was registerd properly
//		$this->assertTrue( $this->_class_has_been_extended( TRUE ) );
//		$this->assertTrue( $this->_model_has_been_extended( TRUE ) );
//	}

	/**
	 * check that when we register an addon and then another after the 'activate_plugin'
	 * action fired, that there are no errors and the 2nd addon's activation indicator
	 * was set properly
	 */
	function test_register_mock_addon__activation() {
		$this->_pretend_after_plugin_activation();
		EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
		$this->assertWPOptionExists( EE_Registry::instance()->addons->EE_New_Addon->get_activation_indicator_option_name());
	}

	/**
	 * registers an addon as usual, but then calls 'activate_plugin', as if a different
	 * addon had been activated. Because the register method is called twice, this has the potential
	 * for problems
	 */
	public function test_register_addon_called_twice_on_activation(){
		EE_System::reset();
		$this->_pretend_addon_hook_time();
		if( did_action( 'activate_plugin' ) ){
			$this->assertTrue( FALSE );
		}
		$this->assertFalse(property_exists(EE_Registry::instance()->addons, 'EE_New_Addon'));
		EE_Register_Addon::register($this->_addon_name, $this->_reg_args);
		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);

		global $wp_actions;
		$times_load_addons_fired = $wp_actions[ 'AHEE__EE_System__load_espresso_addons' ];
		do_action( 'activate_plugin' );
		$this->assertGreaterThan($times_load_addons_fired, $wp_actions[ 'AHEE__EE_System__load_espresso_addons' ] );
	}

	public function tearDown() {
		if( isset( $this->_addon_name ) && isset( EE_Registry::instance()->addons->EE_New_Addon ) ){
			$main_file_path_before_deregistration = EE_Registry::instance()->addons->EE_New_Addon->get_main_plugin_file_basename();
			EE_Register_Addon::deregister($this->_addon_name);
			try{
				EE_Registry::instance()->addons->EE_New_Addon;
				$this->fail('EE_New_Addon is still registered. Deregister failed');
			}catch(PHPUnit_Framework_Error_Notice $e){
				$this->assertEquals(EE_UnitTestCase::error_code_undefined_property,$e->getCode());
			}
			//verify the deactvation hook was removed
			$this->assertFalse( has_action( 'deactivate_' . $main_file_path_before_deregistration ) );
			//verify the models were deregistered
			EE_System::instance()->load_core_configuration();
			$this->assertArrayDoesNotContain('EEM_New_Addon_Thing', EE_Registry::instance()->non_abstract_db_models);
			$this->assertArrayDoesNotContain('EEM_New_Addon_Thing', EE_Registry::instance()->models);
			EE_Registry::instance()->reset_model( 'Attendee' );
			//verify that the model and class extensions have been removed
			$this->assertFalse( $this->_class_has_been_extended() );
			$this->assertFalse( $this->_model_has_been_extended() );
		}

		//verify DMSs deregistered
		$DMSs_available = EE_Data_Migration_Manager::reset()->get_all_data_migration_scripts_available();
		$this->assertArrayNotHasKey('EE_DMS_New_Addon_1_0_0',$DMSs_available);

		$this->_stop_pretending_addon_hook_time();
		$this->_stop_pretending_after_plugin_activation();
		remove_all_filters('AHEE__EE_System__load_espresso_addons');
		parent::tearDown();
	}

	/**
	 * double checks that we the example addon is registering correctly.
	 * @todo: to make sure our example addon is really working, we shoudl try using it
	 * on its own
	 */
//	public function test_regular_new_addon_activation(){
//		$this->_pretend_addon_hook_time();
//		require_once( EE_TESTS_DIR . 'mocks/addons/eea-new-addon/eea-new-addon.php' );
//		EE_New_Addon::register_addon();
//		$this->assertAttributeNotEmpty('EE_New_Addon',EE_Registry::instance()->addons);
//
//		//and theni t hsould be teared-down by tearDown()
//	}

	protected function _stop_pretending_after_plugin_activation(){
		global $wp_actions;
		unset($wp_actions['activate_plugin']);
	}

	protected function _pretend_after_plugin_activation(){
		do_action('activate_plugin');
	}

	protected function _pretend_addon_hook_time() {
		global $wp_actions;
		unset( $wp_actions[ 'AHEE__EEM_Attendee__construct__end' ] );
		unset( $wp_actions[ 'AHEE__EE_System__load_core_configuration__begin' ] );
		unset( $wp_actions[ 'AHEE__EE_System__register_shortcodes_modules_and_widgets' ] );
		unset( $wp_actions[ 'AHEE__EE_System__core_loaded_and_ready' ] );
		parent::_pretend_addon_hook_time();
	}
	/**
	 * Determines if the attendee class has been extended by teh mock extension
	 * @return boolean
	 */
	private function _class_has_been_extended( $throw_error = FALSE){
		try{
			$a = EE_Attendee::new_instance();
			$a->foobar();
			return TRUE;
		}catch(EE_Error $e){
			if( $throw_error ){
				throw $e;
			}
			return FALSE;
		}
	}


	/**
	 * Determines if the Attendee model has been extended by the mock extension
	 * @return boolean
	 */
	private function _model_has_been_extended( $throw_error = FALSE){
		try{
			$att = EE_Registry::instance()->reset_model('Attendee');
			if( ! $att->has_field('ATT_foobar')){
				if( $throw_error ){
					throw new EE_Error(sprintf( __( 'The field ATT_foobar is not on EEM_Attendee, but the extension should have added it. fields are: %s', 'event_espresso' ), implode(",",array_keys(EEM_Attendee::instance()->field_settings()))));
				}
				return FALSE;
			}
			if( ! $att->has_relation('New_Addon_Thing')){
				if( $throw_error ){
					throw new EE_Error(sprintf( __( 'The relation of type New_Addon_Thing on EEM_Attendee, but the extension should have added it. fields are: %s', 'event_espresso' ), implode(",",array_keys(EEM_Attendee::instance()->field_settings()))));
				}
				return FALSE;
			}
			$att->get_all_new_things();
			return TRUE;
		}catch(EE_Error $e){
			if( $throw_error ){
				throw $e;
			}
			return FALSE;
		}
	}
}

// End of file EE_Register_Addon_Test.php