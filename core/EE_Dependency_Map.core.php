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
	 * This means that the requested class dependency is not present in the dependency map
	 */
	const not_registered = 0;


	/**
	 * This instructs class loaders to ALWAYS return a newly instantiated object for the requested class.
	 */
	const load_new_object = 1;

	/**
	 * This instructs class loaders to return a previously instantiated and cached object for the requested class.
	 * IF a previously instantiated object does not exist, a new one will be created and added to the cache.
	 */
	const load_from_cache = 2;

	/**
	 * @type EE_Dependency_Map $_instance
	 */
	protected static $_instance;

	/**
	 * @type EE_Request $request
	 */
	protected $_request;

	/**
	 * @type EE_Response $response
	 */
	protected $_response;


	/**
	 * @type array $_dependency_map
	 */
	protected $_dependency_map = array();

	/**
	 * @type array $_class_loaders
	 */
	protected $_class_loaders = array();

	/**
	 * @type array $_aliases
	 */
	protected $_aliases = array();



	/**
	 * EE_Dependency_Map constructor.
	 *
	 * @param  \EE_Request  $request
	 * @param  \EE_Response $response
	 */
	protected function __construct( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		add_action( 'EE_Load_Espresso_Core__handle_request__initialize_core_loading', array( $this, 'initialize' ) );
		do_action( 'EE_Dependency_Map____construct' );
	}



	/**
	 */
	public function initialize() {
		$this->_register_core_dependencies();
		$this->_register_core_class_loaders();
		$this->_register_core_aliases();
	}



	/**
	 * @singleton method used to instantiate class object
	 * @access    public
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
	 * @param string $class
	 * @param array  $dependencies
	 * @return boolean
	 */
	public static function register_dependencies( $class, $dependencies ) {
		if ( ! isset( self::$_instance->_dependency_map[ $class ] ) ) {
			// we need to make sure that any aliases used when registering a dependency
			// get resolved to the correct class name
			foreach ( (array) $dependencies as $dependency => $load_source ) {
				$alias = self::$_instance->get_alias( $dependency );
				unset( $dependencies[ $dependency ] );
				$dependencies[ $alias ] = $load_source;
			}
			self::$_instance->_dependency_map[ $class ] = (array) $dependencies;
			return true;
		}
		return false;
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
		$class_name = self::$_instance->get_alias( $class_name );
		if ( ! isset( self::$_instance->_class_loaders[ $class_name ] ) ) {
			self::$_instance->_class_loaders[ $class_name ] = $loader;
			return true;
		}
		return false;
	}



	/**
	 * @return array
	 */
	public function dependency_map() {
		return $this->_dependency_map;
	}



	/**
	 * returns TRUE if dependency map contains a listing for the provided class name
	 *
	 * @param string $class_name
	 * @return boolean
	 */
	public function has( $class_name = '' ) {
		return isset( $this->_dependency_map[ $class_name ] ) ? true : false;
	}



	/**
	 * returns TRUE if dependency map contains a listing for the provided class name AND dependency
	 *
	 * @param string $class_name
	 * @param string $dependency
	 * @return bool
	 */
	public function has_dependency_for_class( $class_name = '', $dependency = '' ) {
		$dependency = $this->get_alias( $dependency );
		return isset( $this->_dependency_map[ $class_name ], $this->_dependency_map[ $class_name ][ $dependency ] )
			? true
			: false;
	}



	/**
	 * returns loading strategy for whether a previously cached dependency should be loaded or a new instance returned
	 *
	 * @param string $class_name
	 * @param string $dependency
	 * @return int
	 */
	public function loading_strategy_for_class_dependency( $class_name = '', $dependency = '' ) {
		$dependency = $this->get_alias( $dependency );
		return $this->has_dependency_for_class( $class_name, $dependency )
			? $this->_dependency_map[ $class_name ][ $dependency ]
			: EE_Dependency_Map::not_registered;
	}



	/**
	 * @param string $class_name
	 * @return string | Closure
	 */
	public function class_loader( $class_name ) {
		$class_name = $this->get_alias( $class_name );
		return isset( $this->_class_loaders[ $class_name ] ) ? $this->_class_loaders[ $class_name ] : '';
	}



	/**
	 * @return array
	 */
	public function class_loaders() {
		return $this->_class_loaders;
	}



	/**
	 * adds an alias for a classname
	 *
	 * @param string $class_name
	 * @param string $alias
	 */
	public function add_alias( $class_name, $alias ) {
		$this->_aliases[ $class_name ] = $alias;
	}



	/**
	 * returns TRUE if the provided class name has an alias
	 *
	 * @param string $class_name
	 * @return boolean
	 */
	public function has_alias( $class_name = '' ) {
		return isset( $this->_aliases[ $class_name ] ) ? true : false;
	}



	/**
	 * returns alias for class name if one exists, otherwise returns the original classname
	 * functions recursively, so that multiple aliases can be used to drill down to a classname
	 *  for example:
	 *      if the following two entries were added to the _aliases array:
	 *          array(
	 *              'interface_alias'           => 'some\namespace\interface'
	 *              'some\namespace\interface'  => 'some\namespace\classname'
	 *          )
	 *      then one could use EE_Registry::instance()->create( 'interface_alias' )
	 *      to load an instance of 'some\namespace\classname'
	 *
	 * @param string $class_name
	 * @return string
	 */
	public function get_alias( $class_name = '' ) {
		return $this->has_alias( $class_name )
			? $this->get_alias( $this->_aliases[ $class_name ] )
			: $class_name;
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
		$this->_dependency_map = array(
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
			'EE_messages' => array(
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
			),
			'EE_Message_To_Generate_From_Request' => array(
				'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
				'EE_Request_Handler' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\CommandBus' => array(
				'EventEspresso\core\services\commands\CommandHandlerManager' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\services\commands\CommandHandler' => array(
				'EE_Registry'         => EE_Dependency_Map::load_from_cache,
				'CommandBusInterface' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\CommandHandlerManager' => array(
				'EE_Registry' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\middleware\CapChecker' => array(
				'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => array(
				'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\domain\services\capabilities\RegistrationsCapChecker' => array(
				'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\registration\CreateRegistrationCommandHandler' => array(
				'EventEspresso\core\domain\services\registration\CreateRegistrationService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommandHandler' => array(
				'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommandHandler' => array(
				'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler' => array(
				'EventEspresso\core\domain\services\registration\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler' => array(
				'EventEspresso\core\domain\services\registration\UpdateRegistrationService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommandHandler' => array(
				'EventEspresso\core\domain\services\ticket\CreateTicketLineItemService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommandHandler' => array(
				'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\domain\services\registration\CancelRegistrationService' => array(
				'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
			),
			'EventEspresso\core\services\database\TableManager' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
			),
			'EE_Data_Migration_Class_Base' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_1_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_2_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_3_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_4_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_5_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_6_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_7_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_8_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
			'EE_DMS_Core_4_9_0' => array(
				'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager' => EE_Dependency_Map::load_from_cache,
			),
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
		//for PHP5.3 compat, we need to register any properties called here in a variable because `$this` cannot
		//be used in a closure.
		$request = &$this->_request;
		$response = &$this->_response;
		$this->_class_loaders = array(
			//load_core
			'EE_Capabilities'                      => 'load_core',
			'EE_Encryption'                        => 'load_core',
			'EE_Front_Controller'                  => 'load_core',
			'EE_Module_Request_Router'             => 'load_core',
			'EE_Registry'                          => 'load_core',
			'EE_Request' => function() use(&$request) {
				return $request;
			},
			'EE_Response' => function() use(&$response) {
				return $response;
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
	 * can be used for supplying alternate names for classes,
	 * or for connecting interface names to instantiable classes
	 */
	protected function _register_core_aliases() {
		$this->_aliases = array(
			'CommandBusInterface'                                                 => 'EventEspresso\core\services\commands\CommandBusInterface',
			'EventEspresso\core\services\commands\CommandBusInterface'            => 'EventEspresso\core\services\commands\CommandBus',
			'CommandHandlerManagerInterface'                                      => 'EventEspresso\core\services\commands\CommandHandlerManagerInterface',
			'EventEspresso\core\services\commands\CommandHandlerManagerInterface' => 'EventEspresso\core\services\commands\CommandHandlerManager',
			'CapChecker'                                                          => 'EventEspresso\core\services\commands\middleware\CapChecker',
			'CapabilitiesChecker'                                                 => 'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker',
			'CreateRegistrationService'                                           => 'EventEspresso\core\domain\services\registration\CreateRegistrationService',
			'CreateRegCodeCommandHandler'                                         => 'EventEspresso\core\services\commands\registration\CreateRegCodeCommand',
			'CreateRegUrlLinkCommandHandler'                                      => 'EventEspresso\core\services\commands\registration\CreateRegUrlLinkCommand',
			'CreateRegistrationCommandHandler'                                    => 'EventEspresso\core\services\commands\registration\CreateRegistrationCommand',
			'CopyRegistrationDetailsCommandHandler'                               => 'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommand',
			'CopyRegistrationPaymentsCommandHandler'                              => 'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommand',
			'CancelRegistrationAndTicketLineItemCommandHandler'                   => 'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler',
			'UpdateRegistrationAndTransactionAfterChangeCommandHandler'           => 'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler',
			'CreateTicketLineItemCommandHandler'                                  => 'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommand',
			'TableManager'                                                        => 'EventEspresso\core\services\database\TableManager',
			'TableAnalysis'                                                       => 'EventEspresso\core\services\database\TableAnalysis',
		);
	}


	/**
	 * This is used to reset the internal map and class_loaders to their original default state at the beginning of the request
	 * Primarily used by unit tests.
	 */
	public function reset() {
		$this->_register_core_class_loaders();
		$this->_register_core_dependencies();
	}


}
// End of file EE_Dependency_Map.core.php
// Location: /EE_Dependency_Map.core.php