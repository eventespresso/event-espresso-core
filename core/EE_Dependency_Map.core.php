<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Dependency_Map
 *
 * info about how to load classes required by other classes
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
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
		$this->_register_core_dependencies();
		$this->_register_core_class_loaders();
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
	 * @return boolean
	 */
	public static function register_dependencies( $class, $dependencies ) {
		if ( ! isset( self::$_dependency_map[ $class ] ) ) {
			self::$_dependency_map[ $class ] = (array)$dependencies;
			return true;
		}
		return false;
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
	 * @return bool
	 * @throws \EE_Error
	 */
	public static function register_class_loader( $class_name, $loader = 'load_core' ) {
		// check that loader method starts with "load_" and exists in EE_Registry
		if ( strpos( $loader, 'load_' ) !== 0 || ! method_exists( EE_Registry::instance(), $loader ) ) {
			throw new EE_Error(
				sprintf(
					__( '"%1$s" is not a valid loader method on EE_Registry.', 'event_espresso' ),
					$loader
				)
			);
		}
		if ( ! isset( self::$_class_loaders[ $class_name ] ) ) {
			self::$_class_loaders[ $class_name ] = $loader;
			return true;
		}
		return false;
	}



	/**
	 * Registers the core dependencies
	 */
	protected function _register_core_dependencies() {
		self::$_dependency_map = array(
			'EE_System' => array(
				'EE_Registry',
			),
			'EE_Session' => array(
				'EE_Encryption'
			),
			'EE_Cart' => array(
				null,
				'EE_Session',
			),
			'EE_Front_Controller' => array(
				'EE_Registry',
				'EE_Request_Handler',
				'EE_Module_Request_Router',
			),
			'EE_Messenger_Collection_Loader' => array(
				'EE_Messenger_Collection',
			),
			'EE_Message_Type_Collection_Loader' => array(
				'EE_Message_Type_Collection',
			),
			'EE_Message_Resource_Manager' => array(
				'EE_Messenger_Collection_Loader',
				'EE_Message_Type_Collection_Loader',
				'EEM_Message_Template_Group',
			),
			'EE_Message_Factory' => array(
				'EE_Message_Resource_Manager',
			),
			'EE_Messages' => array(
				'EE_Message_Resource_Manager',
			),
			'EE_messages' => array(
				'EE_Message_Resource_Manager',
			),
			'EE_Messages_Generator' => array(
				'EE_Messages_Queue',
				null,
				'EE_Messages_Queue',
				'EE_Messages_Data_Handler_Collection',
				'EE_Message_Template_Group_Collection',
				'EEH_Parse_Shortcodes',
			),
			'EE_Messages_Queue' => array(
				'EE_Message_Repository',
				'EE_Message_Resource_Manager',
			),
		);
	}



	/**
	 * Registers the core class loaders.
	 */
	protected function _register_core_class_loaders() {
		self::$_class_loaders = array(
			//load_core
			'EE_Encryption'                        => 'load_core',
			'EE_Front_Controller'                  => 'load_core',
			'EE_Module_Request_Router'             => 'load_core',
			'EE_Registry'                          => 'load_core',
			'EE_Request_Handler'                   => 'load_core',
			'EE_Session'                           => 'load_core',
			'EE_System'                            => 'load_core',
			//load_lib
			'EE_Message_Resource_Manager'          => 'load_lib',
			'EE_Message_Type_Collection'           => 'load_lib',
			'EE_Message_Type_Collection_Loader'    => 'load_lib',
			'EE_Messenger_Collection'              => 'load_lib',
			'EE_Messenger_Collection_Loader'       => 'load_lib',
			'EE_Messages_Queue'                    => 'load_lib',
			'EE_Messages_Data_Handler_Collection'  => 'load_lib',
			'EE_Message_Template_Group_Collection' => 'load_lib',
			//load_model
			'EEM_Message_Template_Group'           => 'load_model',
			//load_helper
			'EEH_Parse_Shortcodes'                 => 'load_lib',
		);
	}


	/**
	 * This is used to reset the internal map and class_loaders to their original default state at the beginning of the request
	 * Primarily used by unit tests.
	 */
	public function reset() {
		self::_register_core_class_loaders();
		self::_register_core_dependencies();
	}


}
// End of file EE_Dependency_Map.core.php
// Location: /EE_Dependency_Map.core.php