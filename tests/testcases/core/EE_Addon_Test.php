<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Addon_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core
 * @group addons
 */
class EE_Addon_Test extends EE_UnitTestCase{
	/**
	 *
	 * @var EE_New_Addon
	 */
	protected $_addon = NULL;
	protected $_main_file_path;
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		$this->_main_file_path = EE_TESTS_DIR . 'mocks/addons/new-addon/espresso-new-addon.php';require_once $this->_main_file_path;
		//loading that file adds a hook, but we want to control when it hooks in
		remove_action( 'AHEE__EE_System__load_espresso_addons', 'load_espresso_new_addon' );		parent::__construct($name, $data, $dataName);
	}
	public function setUp(){
		parent::setUp();
		//let's just make a generic addon, but not bother registering it
		$this->_addon = EE_Registry::instance()->load_addon( dirname( $this->_main_file_path ), 'EE_New_Addon' );
		$this->_addon->set_name( 'New_Addon' );
		$this->_addon->set_main_plugin_file( $this->_main_file_path );
		$this->_addon->set_version( '1.0.0' );
		$this->_addon->set_min_core_version( '4.0.0' );
//		$addon->set_config_section( self::$_settings[ $addon_name ]['config_section'] );
//		$addon->set_config_class( self::$_settings[ $addon_name ]['config_class'] );
//		$addon->set_config_name( self::$_settings[ $addon_name ]['config_name'] );

	}

	public function test_update_list_of_installed_versions(){
		$initial_activation_history = $this->_addon->get_activation_history();
		$this->assertEmpty( $initial_activation_history );
		$now_string =  substr( date( 'Y-m-d H:i:s', time() ), 0, -1);
		//now update the list
		$this->_addon->update_list_of_installed_versions( $initial_activation_history, '2.0.0' );
		//now let's try adding more to it
		$this->_addon->update_list_of_installed_versions( $initial_activation_history, '3.0.0' );
		$new_activation_history = $this->_addon->get_activation_history();
		$version_number = key($new_activation_history);
		$times_installed = array_shift($new_activation_history);
		$this->assertEquals('2.0.0',$version_number);
		$this->assertTrue( is_array( $times_installed ) );
		$time_first_installed = array_shift( $times_installed );
		$this->assertEquals( $now_string, substr( $time_first_installed, 0, -1) );

		$second_version_number = key($new_activation_history);
		$times_second_v_installed = array_shift($new_activation_history);
		$this->assertEquals('3.0.0',$second_version_number);
		$this->assertTrue( is_array( $times_second_v_installed ) );
		$time_second_v_first_installed = array_shift( $times_second_v_installed );
		$this->assertEquals($now_string, substr( $time_second_v_first_installed, 0, -1) );
	}

	public function test_get_main_plugin_file(){
		$this->assertEquals($this->_main_file_path,$this->_addon->get_main_plugin_file() );
	}

	public function test_get_main_plugin_file_basename(){
		$this->assertEquals(plugin_basename($this->_main_file_path ), $this->_addon->get_main_plugin_file_basename() );
	}
	public function test_get_main_plugin_file_dirname(){
		$this->assertEquals( dirname($this->_main_file_path ), $this->_addon->get_main_plugin_file_dirname() );
	}



}

// End of file EE_Addon_Test.php