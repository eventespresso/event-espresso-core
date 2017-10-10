<?php
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class EE_Dependency_Map
 * info about how to load classes required by other classes
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class EE_Dependency_Map
{

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
     * When registering a dependency,
     * this indicates to keep any existing dependencies that already exist,
     * and simply discard any new dependencies declared in the incoming data
     */
    const KEEP_EXISTING_DEPENDENCIES = 0;

    /**
     * When registering a dependency,
     * this indicates to overwrite any existing dependencies that already exist using the incoming data
     */
    const OVERWRITE_DEPENDENCIES = 1;



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
     * @type LoaderInterface $loader
     */
    protected $loader;

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
     * @param EE_Request  $request
     * @param EE_Response $response
     */
    protected function __construct(EE_Request $request, EE_Response $response)
    {
        $this->_request = $request;
        $this->_response = $response;
        add_action('EE_Load_Espresso_Core__handle_request__initialize_core_loading', array($this, 'initialize'));
        do_action('EE_Dependency_Map____construct');
    }



    /**
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function initialize()
    {
        $this->_register_core_dependencies();
        $this->_register_core_class_loaders();
        $this->_register_core_aliases();
    }



    /**
     * @singleton method used to instantiate class object
     * @access    public
     * @param EE_Request  $request
     * @param EE_Response $response
     * @return EE_Dependency_Map
     */
    public static function instance(EE_Request $request = null, EE_Response $response = null)
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EE_Dependency_Map) {
            self::$_instance = new EE_Dependency_Map($request, $response);
        }
        return self::$_instance;
    }



    /**
     * @param LoaderInterface $loader
     */
    public function setLoader(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }



    /**
     * @param string $class
     * @param array  $dependencies
     * @param int    $overwrite
     * @return bool
     */
    public static function register_dependencies(
        $class,
        array $dependencies,
        $overwrite = EE_Dependency_Map::KEEP_EXISTING_DEPENDENCIES
    ) {
        return self::$_instance->registerDependencies($class, $dependencies, $overwrite);
    }



    /**
     * Assigns an array of class names and corresponding load sources (new or cached)
     * to the class specified by the first parameter.
     * IMPORTANT !!!
     * The order of elements in the incoming $dependencies array MUST match
     * the order of the constructor parameters for the class in question.
     * This is especially important when overriding any existing dependencies that are registered.
     * the third parameter controls whether any duplicate dependencies are overwritten or not.
     *
     * @param string $class
     * @param array  $dependencies
     * @param int    $overwrite
     * @return bool
     */
    public function registerDependencies(
        $class,
        array $dependencies,
        $overwrite = EE_Dependency_Map::KEEP_EXISTING_DEPENDENCIES
    ) {
        $class = trim($class, '\\');
        $registered = false;
        if (empty(self::$_instance->_dependency_map[ $class ])) {
            self::$_instance->_dependency_map[ $class ] = array();
        }
        // we need to make sure that any aliases used when registering a dependency
        // get resolved to the correct class name
        foreach ((array)$dependencies as $dependency => $load_source) {
            $alias = self::$_instance->get_alias($dependency);
            if (
                $overwrite === EE_Dependency_Map::OVERWRITE_DEPENDENCIES
                || ! isset(self::$_instance->_dependency_map[ $class ][ $alias ])
            ) {
                unset($dependencies[$dependency]);
                $dependencies[$alias] = $load_source;
                $registered = true;
            }
        }
        // now add our two lists of dependencies together.
        // using Union (+=) favours the arrays in precedence from left to right,
        // so $dependencies is NOT overwritten because it is listed first
        // ie: with A = B + C, entries in B take precedence over duplicate entries in C
        // Union is way faster than array_merge() but should be used with caution...
        // especially with numerically indexed arrays
        $dependencies += self::$_instance->_dependency_map[ $class ];
        // now we need to ensure that the resulting dependencies
        // array only has the entries that are required for the class
        // so first count how many dependencies were originally registered for the class
        $dependency_count = count(self::$_instance->_dependency_map[ $class ]);
        // if that count is non-zero (meaning dependencies were already registered)
        self::$_instance->_dependency_map[ $class ] = $dependency_count
            // then truncate the  final array to match that count
            ? array_slice($dependencies, 0, $dependency_count)
            // otherwise just take the incoming array because nothing previously existed
            : $dependencies;
        return $registered;
    }



    /**
     * @param string $class_name
     * @param string $loader
     * @return bool
     * @throws DomainException
     */
    public static function register_class_loader($class_name, $loader = 'load_core')
    {
        if (! $loader instanceof Closure && strpos($class_name, '\\') !== false) {
            throw new DomainException(
                esc_html__('Don\'t use class loaders for FQCNs.', 'event_espresso')
            );
        }
        // check that loader is callable or method starts with "load_" and exists in EE_Registry
        if (
            ! is_callable($loader)
            && (
                strpos($loader, 'load_') !== 0
                || ! method_exists('EE_Registry', $loader)
            )
        ) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        '"%1$s" is not a valid loader method on EE_Registry.',
                        'event_espresso'
                    ),
                    $loader
                )
            );
        }
        $class_name = self::$_instance->get_alias($class_name);
        if (! isset(self::$_instance->_class_loaders[$class_name])) {
            self::$_instance->_class_loaders[$class_name] = $loader;
            return true;
        }
        return false;
    }



    /**
     * @return array
     */
    public function dependency_map()
    {
        return $this->_dependency_map;
    }



    /**
     * returns TRUE if dependency map contains a listing for the provided class name
     *
     * @param string $class_name
     * @return boolean
     */
    public function has($class_name = '')
    {
        // all legacy models have the same dependencies
        if (strpos($class_name, 'EEM_') === 0) {
            $class_name = 'LEGACY_MODELS';
        }
        return isset($this->_dependency_map[$class_name]) ? true : false;
    }



    /**
     * returns TRUE if dependency map contains a listing for the provided class name AND dependency
     *
     * @param string $class_name
     * @param string $dependency
     * @return bool
     */
    public function has_dependency_for_class($class_name = '', $dependency = '')
    {
        // all legacy models have the same dependencies
        if (strpos($class_name, 'EEM_') === 0) {
            $class_name = 'LEGACY_MODELS';
        }
        $dependency = $this->get_alias($dependency);
        return isset($this->_dependency_map[$class_name], $this->_dependency_map[$class_name][$dependency])
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
    public function loading_strategy_for_class_dependency($class_name = '', $dependency = '')
    {
        // all legacy models have the same dependencies
        if (strpos($class_name, 'EEM_') === 0) {
            $class_name = 'LEGACY_MODELS';
        }
        $dependency = $this->get_alias($dependency);
        return $this->has_dependency_for_class($class_name, $dependency)
            ? $this->_dependency_map[$class_name][$dependency]
            : EE_Dependency_Map::not_registered;
    }



    /**
     * @param string $class_name
     * @return string | Closure
     */
    public function class_loader($class_name)
    {
        // all legacy models use load_model()
        if(strpos($class_name, 'EEM_') === 0){
            return 'load_model';
        }
        $class_name = $this->get_alias($class_name);
        return isset($this->_class_loaders[$class_name]) ? $this->_class_loaders[$class_name] : '';
    }



    /**
     * @return array
     */
    public function class_loaders()
    {
        return $this->_class_loaders;
    }



    /**
     * adds an alias for a classname
     *
     * @param string $class_name the class name that should be used (concrete class to replace interface)
     * @param string $alias      the class name that would be type hinted for (abstract parent or interface)
     * @param string $for_class  the class that has the dependency (is type hinting for the interface)
     */
    public function add_alias($class_name, $alias, $for_class = '')
    {
        if ($for_class !== '') {
            if (! isset($this->_aliases[$for_class])) {
                $this->_aliases[$for_class] = array();
            }
            $this->_aliases[$for_class][$class_name] = $alias;
        }
        $this->_aliases[$class_name] = $alias;
    }



    /**
     * returns TRUE if the provided class name has an alias
     *
     * @param string $class_name
     * @param string $for_class
     * @return bool
     */
    public function has_alias($class_name = '', $for_class = '')
    {
        return isset($this->_aliases[$for_class], $this->_aliases[$for_class][$class_name])
               || (
                   isset($this->_aliases[$class_name])
                   && ! is_array($this->_aliases[$class_name])
               );
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
     * @param string $for_class
     * @return string
     */
    public function get_alias($class_name = '', $for_class = '')
    {
        if (! $this->has_alias($class_name, $for_class)) {
            return $class_name;
        }
        if ($for_class !== '' && isset($this->_aliases[ $for_class ][ $class_name ])) {
            return $this->get_alias($this->_aliases[$for_class][$class_name], $for_class);
        }
        return $this->get_alias($this->_aliases[$class_name]);
    }



    /**
     * Registers the core dependencies and whether a previously instantiated object should be loaded from the cache,
     * if one exists, or whether a new object should be generated every time the requested class is loaded.
     * This is done by using the following class constants:
     *        EE_Dependency_Map::load_from_cache - loads previously instantiated object
     *        EE_Dependency_Map::load_new_object - generates a new object every time
     */
    protected function _register_core_dependencies()
    {
        $this->_dependency_map = array(
            'EE_Request_Handler'                                                                                          => array(
                'EE_Request' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_System'                                                                                                   => array(
                'EE_Registry'                                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
                'EE_Capabilities'                            => EE_Dependency_Map::load_from_cache,
                'EE_Request'                                 => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                        => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Session'                                                                                                  => array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                           => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Cart'                                                                                                     => array(
                'EE_Session' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Front_Controller'                                                                                         => array(
                'EE_Registry'              => EE_Dependency_Map::load_from_cache,
                'EE_Request_Handler'       => EE_Dependency_Map::load_from_cache,
                'EE_Module_Request_Router' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Messenger_Collection_Loader'                                                                              => array(
                'EE_Messenger_Collection' => EE_Dependency_Map::load_new_object,
            ),
            'EE_Message_Type_Collection_Loader'                                                                           => array(
                'EE_Message_Type_Collection' => EE_Dependency_Map::load_new_object,
            ),
            'EE_Message_Resource_Manager'                                                                                 => array(
                'EE_Messenger_Collection_Loader'    => EE_Dependency_Map::load_new_object,
                'EE_Message_Type_Collection_Loader' => EE_Dependency_Map::load_new_object,
                'EEM_Message_Template_Group'        => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Message_Factory'                                                                                          => array(
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_messages'                                                                                                 => array(
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Messages_Generator'                                                                                       => array(
                'EE_Messages_Queue'                    => EE_Dependency_Map::load_new_object,
                'EE_Messages_Data_Handler_Collection'  => EE_Dependency_Map::load_new_object,
                'EE_Message_Template_Group_Collection' => EE_Dependency_Map::load_new_object,
                'EEH_Parse_Shortcodes'                 => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Messages_Processor'                                                                                       => array(
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Messages_Queue'                                                                                           => array(
                'EE_Message_Repository' => EE_Dependency_Map::load_new_object,
            ),
            'EE_Messages_Template_Defaults'                                                                               => array(
                'EEM_Message_Template_Group' => EE_Dependency_Map::load_from_cache,
                'EEM_Message_Template'       => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Message_To_Generate_From_Request'                                                                         => array(
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
                'EE_Request_Handler'          => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\CommandBus'                                                             => array(
                'EventEspresso\core\services\commands\CommandHandlerManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\services\commands\CommandHandler'                                                              => array(
                'EE_Registry'         => EE_Dependency_Map::load_from_cache,
                'CommandBusInterface' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\CommandHandlerManager'                                                  => array(
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\CompositeCommandHandler'                                                => array(
                'EventEspresso\core\services\commands\CommandBus'     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\commands\CommandFactory' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\CommandFactory'                                                         => array(
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\middleware\CapChecker'                                                  => array(
                'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker'                                         => array(
                'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\capabilities\RegistrationsCapChecker'                                     => array(
                'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\registration\CreateRegistrationCommandHandler'                          => array(
                'EventEspresso\core\domain\services\registration\CreateRegistrationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommandHandler'                     => array(
                'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommandHandler'                    => array(
                'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler'         => array(
                'EventEspresso\core\domain\services\registration\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler' => array(
                'EventEspresso\core\domain\services\registration\UpdateRegistrationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommandHandler'                              => array(
                'EventEspresso\core\domain\services\ticket\CreateTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommandHandler'                              => array(
                'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\registration\CancelRegistrationService'                                   => array(
                'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\commands\attendee\CreateAttendeeCommandHandler'                                  => array(
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\database\TableManager'                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Data_Migration_Class_Base'                                                                                => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_1_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_2_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_3_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_4_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_5_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_6_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_7_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_8_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EE_DMS_Core_4_9_0'                                                                                           => array(
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\assets\Registry'                                                                 => array(
                'EE_Template_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Currency_Config' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoCancelled'                                             => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoCheckout'                                              => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees'                                        => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoEvents'                                                => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoThankYou'                                              => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoTicketSelector'                                        => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\shortcodes\EspressoTxnPage'                                               => array(
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\cache\BasicCacheManager'                        => array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\cache\PostRelatedCacheManager'                  => array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\validation\email\EmailValidationService' => array(
                'EE_Registration_Config'                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'              => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\values\EmailAddress'                              => array(
                null,
                'EventEspresso\core\domain\services\validation\email\EmailValidationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\orm\ModelFieldFactory' => array(
                'EventEspresso\core\services\loaders\Loader'              => EE_Dependency_Map::load_from_cache,
            ),
            'LEGACY_MODELS'                                                   => array(
                null,
                'EventEspresso\core\services\database\ModelFieldFactory' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Module_Request_Router' => array(
                'EE_Request' => EE_Dependency_Map::load_from_cache,
            ),
        );
    }



    /**
     * Registers how core classes are loaded.
     * This can either be done by simply providing the name of one of the EE_Registry loader methods such as:
     *        'EE_Request_Handler' => 'load_core'
     *        'EE_Messages_Queue'  => 'load_lib'
     *        'EEH_Debug_Tools'    => 'load_helper'
     * or, if greater control is required, by providing a custom closure. For example:
     *        'Some_Class' => function () {
     *            return new Some_Class();
     *        },
     * This is required for instantiating dependencies
     * where an interface has been type hinted in a class constructor. For example:
     *        'Required_Interface' => function () {
     *            return new A_Class_That_Implements_Required_Interface();
     *        },
     *
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    protected function _register_core_class_loaders()
    {
        //for PHP5.3 compat, we need to register any properties called here in a variable because `$this` cannot
        //be used in a closure.
        $request = &$this->_request;
        $response = &$this->_response;
        // $loader = &$this->loader;
        $this->_class_loaders = array(
            //load_core
            'EE_Capabilities'                      => 'load_core',
            'EE_Encryption'                        => 'load_core',
            'EE_Front_Controller'                  => 'load_core',
            'EE_Module_Request_Router'             => 'load_core',
            'EE_Registry'                          => 'load_core',
            'EE_Request'                           => function () use (&$request) {
                return $request;
            },
            'EE_Response'                          => function () use (&$response) {
                return $response;
            },
            'EE_Request_Handler'                   => 'load_core',
            'EE_Session'                           => 'load_core',
            'EE_Cron_Tasks'                        => 'load_core',
            'EE_System'                            => 'load_core',
            'EE_Maintenance_Mode'                  => 'load_core',
            'EE_Register_CPTs'                     => 'load_core',
            'EE_Admin'                             => 'load_core',
            //load_lib
            'EE_Message_Resource_Manager'          => 'load_lib',
            'EE_Message_Type_Collection'           => 'load_lib',
            'EE_Message_Type_Collection_Loader'    => 'load_lib',
            'EE_Messenger_Collection'              => 'load_lib',
            'EE_Messenger_Collection_Loader'       => 'load_lib',
            'EE_Messages_Processor'                => 'load_lib',
            'EE_Message_Repository'                => 'load_lib',
            'EE_Messages_Queue'                    => 'load_lib',
            'EE_Messages_Data_Handler_Collection'  => 'load_lib',
            'EE_Message_Template_Group_Collection' => 'load_lib',
            'EE_Payment_Method_Manager'            => 'load_lib',
            'EE_Messages_Generator'                => function () {
                return EE_Registry::instance()->load_lib(
                    'Messages_Generator',
                    array(),
                    false,
                    false
                );
            },
            'EE_Messages_Template_Defaults'        => function ($arguments = array()) {
                return EE_Registry::instance()->load_lib(
                    'Messages_Template_Defaults',
                    $arguments,
                    false,
                    false
                );
            },
            //load_model
            // 'EEM_Attendee'                         => 'load_model',
            // 'EEM_Message_Template_Group'           => 'load_model',
            // 'EEM_Message_Template'                 => 'load_model',
            //load_helper
            'EEH_Parse_Shortcodes'                 => function () {
                if (EE_Registry::instance()->load_helper('Parse_Shortcodes')) {
                    return new EEH_Parse_Shortcodes();
                }
                return null;
            },
            'EE_Template_Config'                   => function () {
                return EE_Config::instance()->template_settings;
            },
            'EE_Currency_Config'                   => function () {
                return EE_Config::instance()->currency;
            },
            'EE_Registration_Config'                   => function () {
                return EE_Config::instance()->registration;
            },
            'EventEspresso\core\services\loaders\Loader' => function () {
                return LoaderFactory::getLoader();
            },
        );
    }



    /**
     * can be used for supplying alternate names for classes,
     * or for connecting interface names to instantiable classes
     */
    protected function _register_core_aliases()
    {
        $this->_aliases = array(
            'CommandBusInterface'                                                          => 'EventEspresso\core\services\commands\CommandBusInterface',
            'EventEspresso\core\services\commands\CommandBusInterface'                     => 'EventEspresso\core\services\commands\CommandBus',
            'CommandHandlerManagerInterface'                                               => 'EventEspresso\core\services\commands\CommandHandlerManagerInterface',
            'EventEspresso\core\services\commands\CommandHandlerManagerInterface'          => 'EventEspresso\core\services\commands\CommandHandlerManager',
            'CapChecker'                                                                   => 'EventEspresso\core\services\commands\middleware\CapChecker',
            'AddActionHook'                                                                => 'EventEspresso\core\services\commands\middleware\AddActionHook',
            'CapabilitiesChecker'                                                          => 'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker',
            'CapabilitiesCheckerInterface'                                                 => 'EventEspresso\core\domain\services\capabilities\CapabilitiesCheckerInterface',
            'EventEspresso\core\domain\services\capabilities\CapabilitiesCheckerInterface' => 'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker',
            'CreateRegistrationService'                                                    => 'EventEspresso\core\domain\services\registration\CreateRegistrationService',
            'CreateRegCodeCommandHandler'                                                  => 'EventEspresso\core\services\commands\registration\CreateRegCodeCommand',
            'CreateRegUrlLinkCommandHandler'                                               => 'EventEspresso\core\services\commands\registration\CreateRegUrlLinkCommand',
            'CreateRegistrationCommandHandler'                                             => 'EventEspresso\core\services\commands\registration\CreateRegistrationCommand',
            'CopyRegistrationDetailsCommandHandler'                                        => 'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommand',
            'CopyRegistrationPaymentsCommandHandler'                                       => 'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommand',
            'CancelRegistrationAndTicketLineItemCommandHandler'                            => 'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler',
            'UpdateRegistrationAndTransactionAfterChangeCommandHandler'                    => 'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler',
            'CreateTicketLineItemCommandHandler'                                           => 'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommand',
            'CreateTransactionCommandHandler'                                     => 'EventEspresso\core\services\commands\transaction\CreateTransactionCommandHandler',
            'CreateAttendeeCommandHandler'                                        => 'EventEspresso\core\services\commands\attendee\CreateAttendeeCommandHandler',
            'TableManager'                                                                 => 'EventEspresso\core\services\database\TableManager',
            'TableAnalysis'                                                                => 'EventEspresso\core\services\database\TableAnalysis',
            'EspressoShortcode'                                                            => 'EventEspresso\core\services\shortcodes\EspressoShortcode',
            'ShortcodeInterface'                                                           => 'EventEspresso\core\services\shortcodes\ShortcodeInterface',
            'EventEspresso\core\services\shortcodes\ShortcodeInterface'                    => 'EventEspresso\core\services\shortcodes\EspressoShortcode',
            'EventEspresso\core\services\cache\CacheStorageInterface'                      => 'EventEspresso\core\services\cache\TransientCacheStorage',
            'LoaderInterface'                                                              => 'EventEspresso\core\services\loaders\LoaderInterface',
            'EventEspresso\core\services\loaders\LoaderInterface'                          => 'EventEspresso\core\services\loaders\Loader',
            'CommandFactoryInterface'                                                     => 'EventEspresso\core\services\commands\CommandFactoryInterface',
            'EventEspresso\core\services\commands\CommandFactoryInterface'                => 'EventEspresso\core\services\commands\CommandFactory',
            'EventEspresso\core\domain\services\session\SessionIdentifierInterface'       => 'EE_Session',
            'EmailValidatorInterface'                                                     => 'EventEspresso\core\domain\services\validation\email\EmailValidatorInterface',
            'EventEspresso\core\domain\services\validation\email\EmailValidatorInterface' => 'EventEspresso\core\domain\services\validation\email\EmailValidationService',
            'NoticeConverterInterface'                                            => 'EventEspresso\core\services\notices\NoticeConverterInterface',
            'EventEspresso\core\services\notices\NoticeConverterInterface'        => 'EventEspresso\core\services\notices\ConvertNoticesToEeErrors',
            'NoticesContainerInterface'                                            => 'EventEspresso\core\services\notices\NoticesContainerInterface',
            'EventEspresso\core\services\notices\NoticesContainerInterface'        => 'EventEspresso\core\services\notices\NoticesContainer',
        );
        if (! (defined('DOING_AJAX') && DOING_AJAX) && is_admin()) {
            $this->_aliases['EventEspresso\core\services\notices\NoticeConverterInterface'] = 'EventEspresso\core\services\notices\ConvertNoticesToAdminNotices';
        }
    }



    /**
     * This is used to reset the internal map and class_loaders to their original default state at the beginning of the
     * request Primarily used by unit tests.
     *
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function reset()
    {
        $this->_register_core_class_loaders();
        $this->_register_core_dependencies();
    }


}
// End of file EE_Dependency_Map.core.php
// Location: /EE_Dependency_Map.core.php
