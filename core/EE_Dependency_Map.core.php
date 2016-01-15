<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Dependency_Map
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Dependency_Map {


	/**
	 * @type EE_Dependency_Map $_instance
	 */
	protected static $_instance = null;

	/**
	 * @type array $_dependency_map
	 */
	protected static $_dependency_map = array();

	/**
	 * @type array $_class_loaders
	 */
	protected static $_class_loaders = array();



	/**
	 * EE_Dependency_Map constructor.
	 */
	protected function __construct() {
		$this->set_dependency_map();
		$this->set_class_loaders();
		do_action( 'EE_Dependency_Map____construct' );
	}



	/**
	 * @singleton method used to instantiate class object
	 * @access    public
	 * @return \EE_Dependency_Map instance
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EE_Dependency_Map ) {
			self::$_instance = new EE_Dependency_Map();
		}
		return self::$_instance;
	}



	/**
	 * @return array
	 */
	public static function dependency_map() {
		return self::$_dependency_map;
	}



	/**
	 * @param string $class
	 * @param array $dependencies
	 * @return void
	 */
	public static function register_dependencies( $class, $dependencies ) {
		if ( ! isset( self::$_dependency_map[ $class ] ) ) {
			self::$_dependency_map[ $class ] = $dependencies;
		} else {
			self::$_dependency_map[ $class ] = array_merge(
				self::$_dependency_map[ $class ],
				$dependencies
			);
		}
	}



	/**
	 * @param string $class_name
	 * @return array
	 */
	public static function class_loader( $class_name ) {
		return isset( self::$_class_loaders[ $class_name ] ) ? self::$_class_loaders[ $class_name ] : '';
	}



	/**
	 * @param string $class_name
	 * @param string $loader
	 * @return array
	 */
	public static function register_class_loader( $class_name, $loader = 'load_core' ) {
		if ( ! isset( self::$_class_loaders[ $class_name ] ) ) {
			self::$_class_loaders[ $class_name ] = $loader;
		}
	}



	/**
	 * @access protected
	 */
	protected function set_dependency_map() {
		EE_Dependency_Map::register_dependencies(
			'EE_Session',
			array(
				'EE_Encryption',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Cart',
			array(
				null,
				'EE_Session',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Front_Controller',
			array(
				'EE_Registry',
				'EE_Request_Handler',
				'EE_Module_Request_Router',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Messenger_Collection_Loader',
			array(
				'EE_Messenger_Collection',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Message_Type_Collection_Loader',
			array(
				'EE_Message_Type_Collection',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Message_Resource_Manager',
			array(
				'EE_Messenger_Collection_Loader',
				'EE_Message_Type_Collection_Loader',
				'EEM_Message_Template_Group',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Message_Factory',
			array(
				'EE_Message_Resource_Manager',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Messages',
			array(
				'EE_Message_Resource_Manager',
			)
		);
		EE_Dependency_Map::register_dependencies(
			'EE_messages',
			array(
				'EE_Message_Resource_Manager',
			)
		);
	}



	/**
	 * @access protected
	 */
	protected function set_class_loaders() {
		// load_core
		EE_Dependency_Map::register_class_loader( 'EE_Encryption' );
		EE_Dependency_Map::register_class_loader( 'EE_Module_Request_Router' );
		EE_Dependency_Map::register_class_loader( 'EE_Registry' );
		EE_Dependency_Map::register_class_loader( 'EE_Request_Handler' );
		EE_Dependency_Map::register_class_loader( 'EE_Session' );
		// load_lib
		EE_Dependency_Map::register_class_loader( 'EE_Message_Type_Collection', 'load_lib' );
		EE_Dependency_Map::register_class_loader( 'EE_Message_Resource_Manager', 'load_lib' );
		EE_Dependency_Map::register_class_loader( 'EE_Message_Type_Collection_Loader', 'load_lib' );
		EE_Dependency_Map::register_class_loader( 'EE_Messenger_Collection', 'load_lib' );
		EE_Dependency_Map::register_class_loader( 'EE_Messenger_Collection_Loader', 'load_lib' );
		EE_Dependency_Map::register_class_loader( 'EEM_Message_Template_Group', 'load_lib' );
	}



}
// End of file EE_Dependency_Map.core.php
// Location: /EE_Dependency_Map.core.php