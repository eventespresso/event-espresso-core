<?php

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\services\loaders\ClassInterfaceCache;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\LegacyRequestInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

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
     * @var ClassInterfaceCache $class_cache
     */
    private $class_cache;

    /**
     * @type RequestInterface $request
     */
    protected $request;

    /**
     * @type LegacyRequestInterface $legacy_request
     */
    protected $legacy_request;

    /**
     * @type ResponseInterface $response
     */
    protected $response;

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
     * EE_Dependency_Map constructor.
     *
     * @param ClassInterfaceCache $class_cache
     */
    protected function __construct(ClassInterfaceCache $class_cache)
    {
        $this->class_cache = $class_cache;
        do_action('EE_Dependency_Map____construct', $this);
    }


    /**
     * @return void
     */
    public function initialize()
    {
        $this->_register_core_dependencies();
        $this->_register_core_class_loaders();
        $this->_register_core_aliases();
    }


    /**
     * @singleton method used to instantiate class object
     * @param ClassInterfaceCache|null $class_cache
     * @return EE_Dependency_Map
     */
    public static function instance(ClassInterfaceCache $class_cache = null)
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EE_Dependency_Map
            && $class_cache instanceof ClassInterfaceCache
        ) {
            self::$_instance = new EE_Dependency_Map($class_cache);
        }
        return self::$_instance;
    }


    /**
     * @param RequestInterface $request
     */
    public function setRequest(RequestInterface $request)
    {
        $this->request = $request;
    }


    /**
     * @param LegacyRequestInterface $legacy_request
     */
    public function setLegacyRequest(LegacyRequestInterface $legacy_request)
    {
        $this->legacy_request = $legacy_request;
    }


    /**
     * @param ResponseInterface $response
     */
    public function setResponse(ResponseInterface $response)
    {
        $this->response = $response;
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
        foreach ($dependencies as $dependency => $load_source) {
            $alias = self::$_instance->getFqnForAlias($dependency);
            if ($overwrite === EE_Dependency_Map::OVERWRITE_DEPENDENCIES
                || ! isset(self::$_instance->_dependency_map[ $class ][ $alias ])
            ) {
                unset($dependencies[ $dependency ]);
                $dependencies[ $alias ] = $load_source;
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
        if (! is_callable($loader)
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
        $class_name = self::$_instance->getFqnForAlias($class_name);
        if (! isset(self::$_instance->_class_loaders[ $class_name ])) {
            self::$_instance->_class_loaders[ $class_name ] = $loader;
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
        return isset($this->_dependency_map[ $class_name ]) ? true : false;
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
        $dependency = $this->getFqnForAlias($dependency, $class_name);
        return isset($this->_dependency_map[ $class_name ][ $dependency ])
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
        $dependency = $this->getFqnForAlias($dependency);
        return $this->has_dependency_for_class($class_name, $dependency)
            ? $this->_dependency_map[ $class_name ][ $dependency ]
            : EE_Dependency_Map::not_registered;
    }


    /**
     * @param string $class_name
     * @return string | Closure
     */
    public function class_loader($class_name)
    {
        // all legacy models use load_model()
        if (strpos($class_name, 'EEM_') === 0) {
            return 'load_model';
        }
        // EE_CPT_*_Strategy classes like EE_CPT_Event_Strategy, EE_CPT_Venue_Strategy, etc
        // perform strpos() first to avoid loading regex every time we load a class
        if (strpos($class_name, 'EE_CPT_') === 0
            && preg_match('/^EE_CPT_([a-zA-Z]+)_Strategy$/', $class_name)
        ) {
            return 'load_core';
        }
        $class_name = $this->getFqnForAlias($class_name);
        return isset($this->_class_loaders[ $class_name ]) ? $this->_class_loaders[ $class_name ] : '';
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
     * @param string $fqcn      the class name that should be used (concrete class to replace interface)
     * @param string $alias     the class name that would be type hinted for (abstract parent or interface)
     * @param string $for_class the class that has the dependency (is type hinting for the interface)
     */
    public function add_alias($fqcn, $alias, $for_class = '')
    {
        $this->class_cache->addAlias($fqcn, $alias, $for_class);
    }


    /**
     * Returns TRUE if the provided fully qualified name IS an alias
     * WHY?
     * Because if a class is type hinting for a concretion,
     * then why would we need to find another class to supply it?
     * ie: if a class asks for `Fully/Qualified/Namespace/SpecificClassName`,
     * then give it an instance of `Fully/Qualified/Namespace/SpecificClassName`.
     * Don't go looking for some substitute.
     * Whereas if a class is type hinting for an interface...
     * then we need to find an actual class to use.
     * So the interface IS the alias for some other FQN,
     * and we need to find out if `Fully/Qualified/Namespace/SomeInterface`
     * represents some other class.
     *
     * @param string $fqn
     * @param string $for_class
     * @return bool
     */
    public function isAlias($fqn = '', $for_class = '')
    {
        return $this->class_cache->isAlias($fqn, $for_class);
    }


    /**
     * Returns a FQN for provided alias if one exists, otherwise returns the original $alias
     * functions recursively, so that multiple aliases can be used to drill down to a FQN
     *  for example:
     *      if the following two entries were added to the _aliases array:
     *          array(
     *              'interface_alias'           => 'some\namespace\interface'
     *              'some\namespace\interface'  => 'some\namespace\classname'
     *          )
     *      then one could use EE_Registry::instance()->create( 'interface_alias' )
     *      to load an instance of 'some\namespace\classname'
     *
     * @param string $alias
     * @param string $for_class
     * @return string
     */
    public function getFqnForAlias($alias = '', $for_class = '')
    {
        return (string) $this->class_cache->getFqnForAlias($alias, $for_class);
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
                'EE_Registry'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                         => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Session'                                                                                                  => array(
                'EventEspresso\core\services\cache\TransientCacheStorage'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\session\SessionStartHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                            => EE_Dependency_Map::load_from_cache,
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
            'EventEspresso\core\services\assets\I18nRegistry'                                                             => array(
                array(),
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\assets\Registry'                                                                 => array(
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\I18nRegistry'    => EE_Dependency_Map::load_from_cache,
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
            'EventEspresso\core\services\cache\BasicCacheManager'                                                         => array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\cache\PostRelatedCacheManager'                                                   => array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\validation\email\EmailValidationService'                                  => array(
                'EE_Registration_Config'                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\values\EmailAddress'                                                               => array(
                null,
                'EventEspresso\core\domain\services\validation\email\EmailValidationService' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\orm\ModelFieldFactory'                                                           => array(
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'LEGACY_MODELS'                                                                                               => array(
                null,
                'EventEspresso\core\services\database\ModelFieldFactory' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Module_Request_Router'                                                                                    => array(
                'EE_Request' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Registration_Processor'                                                                                   => array(
                'EE_Request' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'                                      => array(
                null,
                'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                         => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\licensing\LicenseService'                                                        => array(
                'EventEspresso\core\domain\services\pue\Stats'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\pue\Config' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_Admin_Transactions_List_Table'                                                                            => array(
                null,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\pue\Stats'                                                                => array(
                'EventEspresso\core\domain\services\pue\Config'        => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\pue\StatsGatherer' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\pue\Config'                                                               => array(
                'EE_Network_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Config'         => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\pue\StatsGatherer'                                                        => array(
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
                'EEM_Event'          => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'       => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'         => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'   => EE_Dependency_Map::load_from_cache,
                'EEM_Transaction'    => EE_Dependency_Map::load_from_cache,
                'EE_Config'          => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\ExitModal'                                                          => array(
                'EventEspresso\core\services\assets\Registry' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\PluginUpsells'                                                      => array(
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\caffeinated\modules\recaptcha_invisible\InvisibleRecaptcha'                                    => array(
                'EE_Registration_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Session'             => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaAdminSettings'                                => array(
                'EE_Registration_Config' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\modules\ticket_selector\ProcessTicketSelector'                                                 => array(
                'EE_Core_Config'                                                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                             => EE_Dependency_Map::load_from_cache,
                'EE_Session'                                                              => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'                                                              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker'                                     => array(
                'EEM_Datetime' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'                              => array(
                'EE_Core_Config'                             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes'                                => array(
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies'                               => array(
                'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_CPT_Strategy'                                                                                             => array(
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\loaders\ObjectIdentifier'                                                        => array(
                'EventEspresso\core\services\loaders\ClassInterfaceCache' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\assets\CoreAssetManager'                                                  => array(
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EE_Currency_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EE_Template_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\policy\PrivacyPolicy' => array(
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\domain\services\admin\privacy\export\ExportAttendee' => array(
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\export\ExportAttendeeBillingData' => array(
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\domain\services\admin\privacy\export\ExportCheckins' => array(
                'EEM_Checkin' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\export\ExportRegistration' => array(
                'EEM_Registration' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\export\ExportTransaction' => array(
                'EEM_Transaction' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\erasure\EraseAttendeeData' => array(
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\erasure\EraseAnswers' => array(
                'EEM_Answer' => EE_Dependency_Map::load_from_cache,
                'EEM_Question' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\CPTs\CptQueryModifier' => array(
                null,
                null,
                null,
                'EE_Request_Handler'                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\privacy\forms\PrivacySettingsFormHandler' => array(
                'EE_Registry' => EE_Dependency_Map::load_from_cache,
                'EE_Config' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\services\editor\BlockRegistrationManager'                                                 => array(
                'EventEspresso\core\services\assets\BlockAssetManagerCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\editor\BlockCollection'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\route_match\RouteMatchSpecificationManager' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                    => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager' => array(
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\blocks\EventAttendeesBlockRenderer' => array(
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\entities\editor\blocks\EventAttendees' => array(
                'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager' => self::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\blocks\EventAttendeesBlockRenderer' => self::load_from_cache,
            ),
            'EventEspresso\core\services\route_match\RouteMatchSpecificationDependencyResolver' => array(
                'EventEspresso\core\services\container\Mirror' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\ClassInterfaceCache' => EE_Dependency_Map::load_from_cache,
                'EE_Dependency_Map' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\route_match\RouteMatchSpecificationFactory' => array(
                'EventEspresso\core\services\route_match\RouteMatchSpecificationDependencyResolver' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\route_match\RouteMatchSpecificationManager' => array(
                'EventEspresso\core\services\route_match\RouteMatchSpecificationCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\route_match\RouteMatchSpecificationFactory' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\libraries\rest_api\CalculatedModelFields' => array(
                'EventEspresso\core\libraries\rest_api\calculations\CalculatedModelFieldsFactory' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\libraries\rest_api\calculations\CalculatedModelFieldsFactory' => array(
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\libraries\rest_api\controllers\model\Read' => array(
                'EventEspresso\core\libraries\rest_api\CalculatedModelFields' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\libraries\rest_api\calculations\Datetime' => array(
                'EEM_Datetime' => EE_Dependency_Map::load_from_cache,
                'EEM_Registration' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\libraries\rest_api\calculations\Event' => array(
                'EEM_Event' => EE_Dependency_Map::load_from_cache,
                'EEM_Registration' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\libraries\rest_api\calculations\Registration' => array(
                'EEM_Registration' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\services\session\SessionStartHandler' => array(
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ),
            'EE_URL_Validation_Strategy' => array(
                null,
                null,
                'EventEspresso\core\services\validators\URLValidator' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\admin_pages\general_settings\OrganizationSettings' => array(
                'EE_Registry'                                             => EE_Dependency_Map::load_from_cache,
                'EE_Organization_Config'                                  => EE_Dependency_Map::load_from_cache,
                'EE_Core_Config'                                          => EE_Dependency_Map::load_from_cache,
                'EE_Network_Core_Config'                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\address\CountrySubRegionDao' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\services\address\CountrySubRegionDao' => array(
                'EEM_State'                                            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\validators\JsonValidator' => EE_Dependency_Map::load_from_cache
            ),
            'EventEspresso\core\domain\services\admin\ajax\WordpressHeartbeat' => array(
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ),
            'EventEspresso\core\domain\services\admin\ajax\EventEditorHeartbeat' => array(
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
                'EE_Environment_Config'            => EE_Dependency_Map::load_from_cache,
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
     */
    protected function _register_core_class_loaders()
    {
        $this->_class_loaders = array(
            // load_core
            'EE_Dependency_Map'                            => function () {
                return $this;
            },
            'EE_Capabilities'                              => 'load_core',
            'EE_Encryption'                                => 'load_core',
            'EE_Front_Controller'                          => 'load_core',
            'EE_Module_Request_Router'                     => 'load_core',
            'EE_Registry'                                  => 'load_core',
            'EE_Request'                                   => function () {
                return $this->legacy_request;
            },
            'EventEspresso\core\services\request\Request'  => function () {
                return $this->request;
            },
            'EventEspresso\core\services\request\Response' => function () {
                return $this->response;
            },
            'EE_Base'                                      => 'load_core',
            'EE_Request_Handler'                           => 'load_core',
            'EE_Session'                                   => 'load_core',
            'EE_Cron_Tasks'                                => 'load_core',
            'EE_System'                                    => 'load_core',
            'EE_Maintenance_Mode'                          => 'load_core',
            'EE_Register_CPTs'                             => 'load_core',
            'EE_Admin'                                     => 'load_core',
            'EE_CPT_Strategy'                              => 'load_core',
            // load_lib
            'EE_Message_Resource_Manager'                  => 'load_lib',
            'EE_Message_Type_Collection'                   => 'load_lib',
            'EE_Message_Type_Collection_Loader'            => 'load_lib',
            'EE_Messenger_Collection'                      => 'load_lib',
            'EE_Messenger_Collection_Loader'               => 'load_lib',
            'EE_Messages_Processor'                        => 'load_lib',
            'EE_Message_Repository'                        => 'load_lib',
            'EE_Messages_Queue'                            => 'load_lib',
            'EE_Messages_Data_Handler_Collection'          => 'load_lib',
            'EE_Message_Template_Group_Collection'         => 'load_lib',
            'EE_Payment_Method_Manager'                    => 'load_lib',
            'EE_Messages_Generator'                        => function () {
                return EE_Registry::instance()->load_lib(
                    'Messages_Generator',
                    array(),
                    false,
                    false
                );
            },
            'EE_Messages_Template_Defaults'                => function ($arguments = array()) {
                return EE_Registry::instance()->load_lib(
                    'Messages_Template_Defaults',
                    $arguments,
                    false,
                    false
                );
            },
            // load_helper
            'EEH_Parse_Shortcodes'                         => function () {
                if (EE_Registry::instance()->load_helper('Parse_Shortcodes')) {
                    return new EEH_Parse_Shortcodes();
                }
                return null;
            },
            'EE_Template_Config'                           => function () {
                return EE_Config::instance()->template_settings;
            },
            'EE_Currency_Config'                           => function () {
                return EE_Config::instance()->currency;
            },
            'EE_Registration_Config'                       => function () {
                return EE_Config::instance()->registration;
            },
            'EE_Core_Config'                               => function () {
                return EE_Config::instance()->core;
            },
            'EventEspresso\core\services\loaders\Loader'   => function () {
                return LoaderFactory::getLoader();
            },
            'EE_Network_Config'                            => function () {
                return EE_Network_Config::instance();
            },
            'EE_Config'                                    => function () {
                return EE_Config::instance();
            },
            'EventEspresso\core\domain\Domain'             => function () {
                return DomainFactory::getEventEspressoCoreDomain();
            },
            'EE_Admin_Config'                              => function () {
                return EE_Config::instance()->admin;
            },
            'EE_Organization_Config'                       => function () {
                return EE_Config::instance()->organization;
            },
            'EE_Network_Core_Config'                       => function () {
                return EE_Network_Config::instance()->core;
            },
            'EE_Environment_Config'                        => function () {
                return EE_Config::instance()->environment;
            },
        );
    }


    /**
     * can be used for supplying alternate names for classes,
     * or for connecting interface names to instantiable classes
     */
    protected function _register_core_aliases()
    {
        $aliases = array(
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
            'CreateRegistrationCommandHandler'                                             => 'EventEspresso\core\services\commands\registration\CreateRegistrationCommand',
            'CopyRegistrationDetailsCommandHandler'                                        => 'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommand',
            'CopyRegistrationPaymentsCommandHandler'                                       => 'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommand',
            'CancelRegistrationAndTicketLineItemCommandHandler'                            => 'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler',
            'UpdateRegistrationAndTransactionAfterChangeCommandHandler'                    => 'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler',
            'CreateTicketLineItemCommandHandler'                                           => 'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommand',
            'CreateTransactionCommandHandler'                                              => 'EventEspresso\core\services\commands\transaction\CreateTransactionCommandHandler',
            'CreateAttendeeCommandHandler'                                                 => 'EventEspresso\core\services\commands\attendee\CreateAttendeeCommandHandler',
            'TableManager'                                                                 => 'EventEspresso\core\services\database\TableManager',
            'TableAnalysis'                                                                => 'EventEspresso\core\services\database\TableAnalysis',
            'EspressoShortcode'                                                            => 'EventEspresso\core\services\shortcodes\EspressoShortcode',
            'ShortcodeInterface'                                                           => 'EventEspresso\core\services\shortcodes\ShortcodeInterface',
            'EventEspresso\core\services\shortcodes\ShortcodeInterface'                    => 'EventEspresso\core\services\shortcodes\EspressoShortcode',
            'EventEspresso\core\services\cache\CacheStorageInterface'                      => 'EventEspresso\core\services\cache\TransientCacheStorage',
            'LoaderInterface'                                                              => 'EventEspresso\core\services\loaders\LoaderInterface',
            'EventEspresso\core\services\loaders\LoaderInterface'                          => 'EventEspresso\core\services\loaders\Loader',
            'CommandFactoryInterface'                                                      => 'EventEspresso\core\services\commands\CommandFactoryInterface',
            'EventEspresso\core\services\commands\CommandFactoryInterface'                 => 'EventEspresso\core\services\commands\CommandFactory',
            'EmailValidatorInterface'                                                      => 'EventEspresso\core\domain\services\validation\email\EmailValidatorInterface',
            'EventEspresso\core\domain\services\validation\email\EmailValidatorInterface'  => 'EventEspresso\core\domain\services\validation\email\EmailValidationService',
            'NoticeConverterInterface'                                                     => 'EventEspresso\core\services\notices\NoticeConverterInterface',
            'EventEspresso\core\services\notices\NoticeConverterInterface'                 => 'EventEspresso\core\services\notices\ConvertNoticesToEeErrors',
            'NoticesContainerInterface'                                                    => 'EventEspresso\core\services\notices\NoticesContainerInterface',
            'EventEspresso\core\services\notices\NoticesContainerInterface'                => 'EventEspresso\core\services\notices\NoticesContainer',
            'EventEspresso\core\services\request\RequestInterface'                         => 'EventEspresso\core\services\request\Request',
            'EventEspresso\core\services\request\ResponseInterface'                        => 'EventEspresso\core\services\request\Response',
            'EventEspresso\core\domain\DomainInterface'                                    => 'EventEspresso\core\domain\Domain',
        );
        foreach ($aliases as $alias => $fqn) {
            if (is_array($fqn)) {
                foreach ($fqn as $class => $for_class) {
                    $this->class_cache->addAlias($class, $alias, $for_class);
                }
                continue;
            }
            $this->class_cache->addAlias($fqn, $alias);
        }
        if (! (defined('DOING_AJAX') && DOING_AJAX) && is_admin()) {
            $this->class_cache->addAlias(
                'EventEspresso\core\services\notices\ConvertNoticesToAdminNotices',
                'EventEspresso\core\services\notices\NoticeConverterInterface'
            );
        }
    }


    /**
     * This is used to reset the internal map and class_loaders to their original default state at the beginning of the
     * request Primarily used by unit tests.
     */
    public function reset()
    {
        $this->_register_core_class_loaders();
        $this->_register_core_dependencies();
    }


    /**
     * PLZ NOTE: a better name for this method would be is_alias()
     * because it returns TRUE if the provided fully qualified name IS an alias
     * WHY?
     * Because if a class is type hinting for a concretion,
     * then why would we need to find another class to supply it?
     * ie: if a class asks for `Fully/Qualified/Namespace/SpecificClassName`,
     * then give it an instance of `Fully/Qualified/Namespace/SpecificClassName`.
     * Don't go looking for some substitute.
     * Whereas if a class is type hinting for an interface...
     * then we need to find an actual class to use.
     * So the interface IS the alias for some other FQN,
     * and we need to find out if `Fully/Qualified/Namespace/SomeInterface`
     * represents some other class.
     *
     * @deprecated 4.9.62.p
     * @param string $fqn
     * @param string $for_class
     * @return bool
     */
    public function has_alias($fqn = '', $for_class = '')
    {
        return $this->isAlias($fqn, $for_class);
    }


    /**
     * PLZ NOTE: a better name for this method would be get_fqn_for_alias()
     * because it returns a FQN for provided alias if one exists, otherwise returns the original $alias
     * functions recursively, so that multiple aliases can be used to drill down to a FQN
     *  for example:
     *      if the following two entries were added to the _aliases array:
     *          array(
     *              'interface_alias'           => 'some\namespace\interface'
     *              'some\namespace\interface'  => 'some\namespace\classname'
     *          )
     *      then one could use EE_Registry::instance()->create( 'interface_alias' )
     *      to load an instance of 'some\namespace\classname'
     *
     * @deprecated 4.9.62.p
     * @param string $alias
     * @param string $for_class
     * @return string
     */
    public function get_alias($alias = '', $for_class = '')
    {
        return $this->getFqnForAlias($alias, $for_class);
    }
}
