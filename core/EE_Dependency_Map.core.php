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
	 * This instructs the loader to ALWAYS return a newly instantiated object for the requested class.
	 */
	const load_new_object = 1;

	/**
	 * This instructs the loader to return a previously instantiated and cached object for the requested class.
	 * IF a previously instantiated object does not exist, a new one will be created and added to the cache.
	 */
	const load_from_cache = 2;


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
	 * @type EE_Request $request
	 */
	protected $_request;

	/**
	 * @type EE_Response $response
	 */
	protected $_response;



	/**
	 * EE_Dependency_Map constructor.
	 *
	 * @param  \EE_Request  $request
	 * @param  \EE_Response $response
	 */
	protected function __construct( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		$this->_register_core_dependencies();
		$this->_register_core_class_loaders();
		do_action( 'EE_Dependency_Map____construct' );
	}



	/**
	 * @singleton method used to instantiate class object
	 * @access public
	 * @param  \EE_Request  $request
	 * @param  \EE_Response $response
	 * @return \EE_Dependency_Map instance
	 */
	public static function instance( EE_Request $request = null, EE_Response $response = null ) {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EE_Dependency_Map ) {
			self::$_instance = new EE_Dependency_Map( $request, $response );
		}
		return self::$_instance;
	}



	/**
	 * @return EE_Request
	 */
	public static function request() {
		return EE_Dependency_Map::instance()->_request;
	}



	/**
	 * @return EE_Response
	 */
	public static function response() {
		return EE_Dependency_Map::instance()->_response;
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
	 * @return string | Closure
	 */
	public static function class_loader( $class_name ) {
		return isset( self::$_class_loaders[ $class_name ] ) ? self::$_class_loaders[ $class_name ] : '';
	}



	/**
	 * @return array
	 */
	public static function class_loaders() {
		return self::$_class_loaders;
	}



	/**
	 * @param string $class_name
	 * @param string $loader
	 * @return bool
	 * @throws \EE_Error
	 */
	public static function register_class_loader( $class_name, $loader = 'load_core' ) {
		// check that loader method starts with "load_" and exists in EE_Registry
		if ( strpos( $loader, 'load_' ) !== 0 || ! method_exists( 'EE_Registry', $loader ) ) {
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
	 * Registers the core dependencies and whether a previously instantiated object should be loaded from the cache,
	 * if one exists, or whether a new object should be generated every time the requested class is loaded.
	 * This is done by using the following class constants:
	 *
	 * 		EE_Dependency_Map::load_from_cache - loads previously instantiated object
	 * 		EE_Dependency_Map::load_new_object - generates a new object every time
	 */
	protected function _register_core_dependencies() {
		self::$_dependency_map = array(
			'EE_Request_Handler' => array(
				'EE_Request' => EE_Dependency_Map::load_from_cache,
			),
			'EE_System' => array(
				'EE_Registry' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Session' => array(
				'EE_Encryption' => EE_Dependency_Map::load_from_cache
			),
			'EE_Cart' => array(
				'EE_Session' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Front_Controller' => array(
				'EE_Registry'              => EE_Dependency_Map::load_from_cache,
				'EE_Request_Handler'       => EE_Dependency_Map::load_from_cache,
				'EE_Module_Request_Router' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Messenger_Collection_Loader' => array(
				'EE_Messenger_Collection' => EE_Dependency_Map::load_new_object,
			),
			'EE_Message_Type_Collection_Loader' => array(
				'EE_Message_Type_Collection' => EE_Dependency_Map::load_new_object,
			),
			'EE_Message_Resource_Manager' => array(
				'EE_Messenger_Collection_Loader'    => EE_Dependency_Map::load_new_object,
				'EE_Message_Type_Collection_Loader' => EE_Dependency_Map::load_new_object,
				'EEM_Message_Template_Group'        => EE_Dependency_Map::load_from_cache,
			),
			'EE_Message_Factory' => array(
				'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Messages' => array(
				'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Messages_Generator' => array(
				'EE_Messages_Queue'                    => EE_Dependency_Map::load_new_object,
				'EE_Messages_Data_Handler_Collection'  => EE_Dependency_Map::load_new_object,
				'EE_Message_Template_Group_Collection' => EE_Dependency_Map::load_new_object,
				'EEH_Parse_Shortcodes'                 => EE_Dependency_Map::load_from_cache,
			),
			'EE_Messages_Processor' => array(
				'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Messages_Queue' => array(
				'EE_Message_Repository' => EE_Dependency_Map::load_new_object,
			),
			'EE_Messages_Template_Defaults' => array(
				'EEM_Message_Template_Group' => EE_Dependency_Map::load_from_cache,
				'EEM_Message_Template' => EE_Dependency_Map::load_from_cache,
			)
		);
	}



	/**
	 * Registers how core classes are loaded.
	 *
	 * This can either be done by simply providing the name of one of the EE_Registry loader methods such as:
	 *
	 * 		'EE_Request_Handler' => 'load_core'
	 * 		'EE_Messages_Queue'  => 'load_lib'
	 * 		'EEH_Debug_Tools'    => 'load_helper'
	 *
	 * or, if greater control is required, by providing a custom closure. For example:
	 *
	 * 		'Some_Class' => function () {
	 * 			return new Some_Class();
	 * 		},
	 *
	 * This is required for instantiating dependencies
	 * where an interface has been type hinted in a class constructor. For example:
	 *
	 *        'Required_Interface' => function () {
	 *            return new A_Class_That_Implements_Required_Interface();
	 *        },
	 *
	 */
	protected function _register_core_class_loaders() {
		self::$_class_loaders = array(
			//load_core
			'EE_Encryption'                        => 'load_core',
			'EE_Front_Controller'                  => 'load_core',
			'EE_Module_Request_Router'             => 'load_core',
			'EE_Registry'                          => 'load_core',
			'EE_Request'                   		   => function () {
				return EE_Dependency_Map::instance()->_request instanceof EE_Request
					? EE_Dependency_Map::instance()->_request
					: new EE_Request( $_REQUEST );
			},
			'EE_Request_Handler'                   => 'load_core',
			'EE_Session'                           => 'load_core',
			'EE_System'                            => 'load_core',
			//load_lib
			'EE_Message_Resource_Manager'          => 'load_lib',
			'EE_Message_Type_Collection'           => 'load_lib',
			'EE_Message_Type_Collection_Loader'    => 'load_lib',
			'EE_Messenger_Collection'              => 'load_lib',
			'EE_Messenger_Collection_Loader'       => 'load_lib',
			'EE_Messages_Processor'       		   => 'load_lib',
			'EE_Message_Repository'       		   => 'load_lib',
			'EE_Messages_Queue'                    => 'load_lib',
			'EE_Messages_Data_Handler_Collection'  => 'load_lib',
			'EE_Message_Template_Group_Collection' => 'load_lib',
			'EE_Messages_Generator' => function() {
				return EE_Registry::instance()->load_lib( 'Messages_Generator', array(), false, false );
			},
			'EE_Messages_Template_Defaults' => function( $arguments = array() ) {
				return EE_Registry::instance()->load_lib( 'Messages_Template_Defaults', $arguments, false, false );
			},
			//load_model
			'EEM_Message_Template_Group'           => 'load_model',
			'EEM_Message_Template'                 => 'load_model',
			//load_helper
			'EEH_Parse_Shortcodes'                 => function() {
				if ( EE_Registry::instance()->load_helper( 'Parse_Shortcodes' ) ) {
					return new EEH_Parse_Shortcodes();
				}
				return null;
			},
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