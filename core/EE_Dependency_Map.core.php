<?php

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\exceptions\InvalidAliasException;
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
    protected $_dependency_map = [];

    /**
     * @type array $_class_loaders
     */
    protected $_class_loaders = [];


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
     * @throws InvalidAliasException
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
    public static function instance(ClassInterfaceCache $class_cache = null): EE_Dependency_Map
    {
        // check if class object is instantiated, and instantiated properly
        if (
            ! EE_Dependency_Map::$_instance instanceof EE_Dependency_Map
            && $class_cache instanceof ClassInterfaceCache
        ) {
            EE_Dependency_Map::$_instance = new EE_Dependency_Map($class_cache);
        }
        return EE_Dependency_Map::$_instance;
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
        string $class,
        array $dependencies,
        int $overwrite = EE_Dependency_Map::KEEP_EXISTING_DEPENDENCIES
    ): bool {
        return EE_Dependency_Map::$_instance->registerDependencies($class, $dependencies, $overwrite);
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
        string $class,
        array $dependencies,
        int $overwrite = EE_Dependency_Map::KEEP_EXISTING_DEPENDENCIES
    ): bool {
        $class      = trim($class, '\\');
        $registered = false;
        if (empty(EE_Dependency_Map::$_instance->_dependency_map[ $class ])) {
            EE_Dependency_Map::$_instance->_dependency_map[ $class ] = [];
        }
        // we need to make sure that any aliases used when registering a dependency
        // get resolved to the correct class name
        foreach ($dependencies as $dependency => $load_source) {
            $alias = EE_Dependency_Map::$_instance->getFqnForAlias($dependency);
            if (
                $overwrite === EE_Dependency_Map::OVERWRITE_DEPENDENCIES
                || ! isset(EE_Dependency_Map::$_instance->_dependency_map[ $class ][ $alias ])
            ) {
                unset($dependencies[ $dependency ]);
                $dependencies[ $alias ] = $load_source;
                $registered             = true;
            }
        }
        // now add our two lists of dependencies together.
        // using Union (+=) favours the arrays in precedence from left to right,
        // so $dependencies is NOT overwritten because it is listed first
        // ie: with A = B + C, entries in B take precedence over duplicate entries in C
        // Union is way faster than array_merge() but should be used with caution...
        // especially with numerically indexed arrays
        $dependencies += EE_Dependency_Map::$_instance->_dependency_map[ $class ];
        // now we need to ensure that the resulting dependencies
        // array only has the entries that are required for the class
        // so first count how many dependencies were originally registered for the class
        $dependency_count = count(EE_Dependency_Map::$_instance->_dependency_map[ $class ]);
        // if that count is non-zero (meaning dependencies were already registered)
        EE_Dependency_Map::$_instance->_dependency_map[ $class ] = $dependency_count
            // then truncate the  final array to match that count
            ? array_slice($dependencies, 0, $dependency_count)
            // otherwise just take the incoming array because nothing previously existed
            : $dependencies;
        return $registered;
    }


    /**
     * @param string          $class_name
     * @param callable|string $loader
     * @param bool            $overwrite
     * @return bool
     * @throws DomainException
     */
    public static function register_class_loader(
        string $class_name,
        $loader = 'load_core',
        bool $overwrite = false
    ): bool {
        return EE_Dependency_Map::$_instance->registerClassLoader($class_name, $loader, $overwrite);
    }


    /**
     * @param string $class_name
     * @param Closure|string $loader
     * @param bool   $overwrite
     * @return bool
     * @throws DomainException
     */
    public function registerClassLoader(string $class_name, $loader = 'load_core', bool $overwrite = false): bool
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
        $class_name = EE_Dependency_Map::$_instance->getFqnForAlias($class_name);
        if ($overwrite || ! isset(EE_Dependency_Map::$_instance->_class_loaders[ $class_name ])) {
            EE_Dependency_Map::$_instance->_class_loaders[ $class_name ] = $loader;
            return true;
        }
        return false;
    }


    /**
     * @return array
     */
    public function dependency_map(): array
    {
        return $this->_dependency_map;
    }


    /**
     * returns TRUE if dependency map contains a listing for the provided class name
     *
     * @param string $class_name
     * @return boolean
     */
    public function has(string $class_name = ''): bool
    {
        // all legacy models have the same dependencies
        if (strpos($class_name, 'EEM_') === 0) {
            $class_name = 'LEGACY_MODELS';
        }
        return isset($this->_dependency_map[ $class_name ]);
    }


    /**
     * returns TRUE if dependency map contains a listing for the provided class name AND dependency
     *
     * @param string $class_name
     * @param string $dependency
     * @return bool
     */
    public function has_dependency_for_class(string $class_name = '', string $dependency = ''): bool
    {
        // all legacy models have the same dependencies
        if (strpos($class_name, 'EEM_') === 0) {
            $class_name = 'LEGACY_MODELS';
        }
        $dependency = $this->getFqnForAlias($dependency, $class_name);
        return isset($this->_dependency_map[ $class_name ][ $dependency ]);
    }


    /**
     * returns loading strategy for whether a previously cached dependency should be loaded or a new instance returned
     *
     * @param string $class_name
     * @param string $dependency
     * @return int
     */
    public function loading_strategy_for_class_dependency(string $class_name = '', string $dependency = ''): int
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
    public function class_loader(string $class_name)
    {
        // all legacy models use load_model()
        if (strpos($class_name, 'EEM_') === 0) {
            return 'load_model';
        }
        // EE_CPT_*_Strategy classes like EE_CPT_Event_Strategy, EE_CPT_Venue_Strategy, etc
        // perform strpos() first to avoid loading regex every time we load a class
        if (
            strpos($class_name, 'EE_CPT_') === 0
            && preg_match('/^EE_CPT_([a-zA-Z]+)_Strategy$/', $class_name)
        ) {
            return 'load_core';
        }
        $class_name = $this->getFqnForAlias($class_name);
        return $this->_class_loaders[ $class_name ] ?? '';
    }


    /**
     * @return array
     */
    public function class_loaders(): array
    {
        return $this->_class_loaders;
    }


    /**
     * adds an alias for a classname
     *
     * @param string $fqcn      the class name that should be used (concrete class to replace interface)
     * @param string $alias     the class name that would be type hinted for (abstract parent or interface)
     * @param string $for_class the class that has the dependency (is type hinting for the interface)
     * @throws InvalidAliasException
     */
    public function add_alias(string $fqcn, string $alias, string $for_class = '')
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
    public function isAlias(string $fqn = '', string $for_class = ''): bool
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
    public function getFqnForAlias(string $alias = '', string $for_class = ''): string
    {
        return $this->class_cache->getFqnForAlias($alias, $for_class);
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
        $this->_dependency_map = [
            'EE_Admin'                                                                                                    => [
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Request_Handler'                                                                                          => [
                'EventEspresso\core\services\request\Request'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Response' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_System'                                                                                                   => [
                'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                         => EE_Dependency_Map::load_from_cache,
                'EE_Registry'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\routing\Router'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Session'                                                                                                  => [
                'EventEspresso\core\services\cache\TransientCacheStorage'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\session\SessionStartHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                            => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Cart'                                                                                                     => [
                'EE_Session' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Messenger_Collection_Loader'                                                                              => [
                'EE_Messenger_Collection' => EE_Dependency_Map::load_new_object,
            ],
            'EE_Message_Type_Collection_Loader'                                                                           => [
                'EE_Message_Type_Collection' => EE_Dependency_Map::load_new_object,
            ],
            'EE_Message_Resource_Manager'                                                                                 => [
                'EE_Messenger_Collection_Loader'    => EE_Dependency_Map::load_new_object,
                'EE_Message_Type_Collection_Loader' => EE_Dependency_Map::load_new_object,
                'EEM_Message_Template_Group'        => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Message_Factory'                                                                                          => [
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_messages'                                                                                                 => [
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Messages_Generator'                                                                                       => [
                'EE_Messages_Queue'                    => EE_Dependency_Map::load_new_object,
                'EE_Messages_Data_Handler_Collection'  => EE_Dependency_Map::load_new_object,
                'EE_Message_Template_Group_Collection' => EE_Dependency_Map::load_new_object,
                'EEH_Parse_Shortcodes'                 => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Messages_Processor'                                                                                       => [
                'EE_Message_Resource_Manager' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Messages_Queue'                                                                                           => [
                'EE_Message_Repository' => EE_Dependency_Map::load_new_object,
            ],
            'EE_Messages_Template_Defaults'                                                                               => [
                'EEM_Message_Template_Group' => EE_Dependency_Map::load_from_cache,
                'EEM_Message_Template'       => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Message_To_Generate_From_Request'                                                                         => [
                'EE_Message_Resource_Manager'                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\CommandBus'                                                             => [
                'EventEspresso\core\services\commands\CommandHandlerManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\services\commands\CommandHandler'                                                              => [
                'EE_Registry'         => EE_Dependency_Map::load_from_cache,
                'CommandBusInterface' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\CommandHandlerManager'                                                  => [
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\CompositeCommandHandler'                                                => [
                'EventEspresso\core\services\commands\CommandBus'     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\commands\CommandFactory' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\CommandFactory'                                                         => [
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\middleware\CapChecker'                                                  => [
                'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker'                                         => [
                'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\capabilities\RegistrationsCapChecker'                                     => [
                'EE_Capabilities' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\registration\CreateRegistrationCommandHandler'                          => [
                'EventEspresso\core\domain\services\registration\CreateRegistrationService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommandHandler'                     => [
                'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommandHandler'                    => [
                'EventEspresso\core\domain\services\registration\CopyRegistrationService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommandHandler'         => [
                'EventEspresso\core\domain\services\registration\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommandHandler' => [
                'EventEspresso\core\domain\services\registration\UpdateRegistrationService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommandHandler'                              => [
                'EventEspresso\core\domain\services\ticket\CreateTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommandHandler'                              => [
                'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\CancelRegistrationService'                                   => [
                'EventEspresso\core\domain\services\ticket\CancelTicketLineItemService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\commands\attendee\CreateAttendeeCommandHandler'                                  => [
                'EEM_Attendee' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\database\TableManager'                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Data_Migration_Class_Base'                                                                                => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_1_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_2_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_3_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_4_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_5_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_6_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_7_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_8_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_9_0'                                                                                           => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_10_0'                                                                                          => [
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
                'EE_DMS_Core_4_9_0'                                  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_11_0'                                                                                          => [
                'EE_DMS_Core_4_10_0'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EE_DMS_Core_4_12_0'                                                                                          => [
                'EE_DMS_Core_4_11_0'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableAnalysis' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\database\TableManager'  => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\assets\I18nRegistry'                                                             => [
                [],
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\assets\Registry'                                                                 => [
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetManifest'   => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoCancelled'                                             => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoCheckout'                                              => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees'                                        => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoEvents'                                                => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoThankYou'                                              => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoTicketSelector'                                        => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\shortcodes\EspressoTxnPage'                                               => [
                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\cache\BasicCacheManager'                                                         => [
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\cache\PostRelatedCacheManager'                                                   => [
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\validation\email\EmailValidationService'                                  => [
                'EE_Registration_Config'                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\values\EmailAddress'                                                               => [
                null,
                'EventEspresso\core\domain\services\validation\email\EmailValidationService' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\orm\ModelFieldFactory'                                                           => [
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'LEGACY_MODELS'                                                                                               => [
                null,
                'EventEspresso\core\services\database\ModelFieldFactory' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Module_Request_Router'                                                                                    => [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_Registration_Processor'                                                                                   => [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'                                      => [
                null,
                'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                         => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\caffeinated\modules\recaptcha_invisible\InvisibleRecaptcha'                                    => [
                'EE_Registration_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Session'             => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\modules\ticket_selector\DisplayTicketSelector'                                                 => [
                'EventEspresso\core\domain\entities\users\CurrentUser' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'          => EE_Dependency_Map::load_from_cache,
                'EE_Ticket_Selector_Config'                            => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\modules\ticket_selector\ProcessTicketSelector'                                                 => [
                'EE_Core_Config'                                                          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                             => EE_Dependency_Map::load_from_cache,
                'EE_Session'                                                              => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'                                                              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker'                                     => [
                'EEM_Datetime' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'                              => [
                'EE_Core_Config'                             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes'                                => [
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies'                               => [
                'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions' => EE_Dependency_Map::load_from_cache,
            ],
            'EE_CPT_Strategy'                                                                                             => [
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\loaders\ObjectIdentifier'                                                        => [
                'EventEspresso\core\services\loaders\ClassInterfaceCache' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\CPTs\CptQueryModifier'                                                                    => [
                null,
                null,
                null,
                'EventEspresso\core\services\request\CurrentPage' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'      => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\dependencies\DependencyResolver'                                                 => [
                'EventEspresso\core\services\container\Mirror'            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\ClassInterfaceCache' => EE_Dependency_Map::load_from_cache,
                'EE_Dependency_Map'                                       => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\routing\RouteMatchSpecificationDependencyResolver'                               => [
                'EventEspresso\core\services\container\Mirror'            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\ClassInterfaceCache' => EE_Dependency_Map::load_from_cache,
                'EE_Dependency_Map'                                       => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\routing\RouteMatchSpecificationFactory'                                          => [
                'EventEspresso\core\services\routing\RouteMatchSpecificationDependencyResolver' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'                                    => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\routing\RouteMatchSpecificationManager'                                          => [
                'EventEspresso\core\services\routing\RouteMatchSpecificationCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\routing\RouteMatchSpecificationFactory'    => EE_Dependency_Map::load_from_cache,
            ],
            'EE_URL_Validation_Strategy'                                                                                  => [
                null,
                null,
                'EventEspresso\core\services\validators\URLValidator' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\request\files\FilesDataHandler'                                                  => [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspressoBatchRequest\BatchRequestProcessor'                                                             => [
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\converters\RestApiSpoofer'                                                => [
                'WP_REST_Server'                                               => EE_Dependency_Map::load_from_cache,
                'EED_Core_Rest_Api'                                            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\libraries\rest_api\controllers\model\Read' => EE_Dependency_Map::load_from_cache,
                null,
            ],
            'EventEspresso\core\services\routing\RouteHandler'                                                            => [
                'EventEspresso\core\services\json\JsonDataNodeHandler' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\routing\RouteCollection'  => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\json\JsonDataNodeHandler'                                                        => [
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\routing\Router'                                                                  => [
                'EE_Dependency_Map'                                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\routing\RouteHandler' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\assets\AssetManifest'                                                            => [
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\assets\AssetManifestFactory'                                                     => [
                'EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\assets\BaristaFactory'                                                           => [
                'EventEspresso\core\services\assets\AssetManifestFactory' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\Loader'              => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\capabilities\FeatureFlags'                                                => [
                'EventEspresso\core\domain\services\capabilities\CapabilitiesChecker' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\addon\AddonManager'                                                              => [
                'EventEspresso\core\services\addon\AddonCollection'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\Psr4Autoloader'                              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\v1\RegisterAddon'         => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\IncompatibleAddonHandler' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\addon\api\ThirdPartyPluginHandler'  => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\addon\api\ThirdPartyPluginHandler'                                               => [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspressoBatchRequest\JobHandlers\ExecuteBatchDeletion'                                                  => [
                'EventEspresso\core\services\orm\tree_traversal\NodeGroupDao' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspressoBatchRequest\JobHandlers\PreviewEventDeletion'                                                  => [
                'EventEspresso\core\services\orm\tree_traversal\NodeGroupDao' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\admin\events\data\PreviewDeletion'                                        => [
                'EventEspresso\core\services\orm\tree_traversal\NodeGroupDao' => EE_Dependency_Map::load_from_cache,
                'EEM_Event'                                                   => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'                                                => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'                                            => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\admin\events\data\ConfirmDeletion'                                        => [
                'EventEspresso\core\services\orm\tree_traversal\NodeGroupDao' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\request\CurrentPage'                                                             => [
                'EE_CPT_Strategy'                             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\shortcodes\LegacyShortcodesManager'                                              => [
                'EE_Registry'                                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\CurrentPage' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\shortcodes\ShortcodesManager'                                                    => [
                'EventEspresso\core\services\shortcodes\LegacyShortcodesManager' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\CurrentPage'                => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\entities\users\CurrentUser'                                                        => [
                'EventEspresso\core\domain\entities\users\EventManagers' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\form\meta\InputTypes'                                                            => [
                'EventEspresso\core\services\form\meta\inputs\Block'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Button'   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\DateTime' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Input'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Number'   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Phone'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Select'   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\form\meta\inputs\Text'     => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\domain\services\registration\form\v1\RegFormDependencyHandler'                            => [
                'EE_Dependency_Map' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\calculators\LineItemCalculator'                                                  => [
                'EventEspresso\core\services\helpers\DecimalValues' => EE_Dependency_Map::load_from_cache,
            ],
            'EventEspresso\core\services\helpers\DecimalValues'                                                           => [
                'EE_Currency_Config' => EE_Dependency_Map::load_from_cache,
            ],
        ];
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
        $this->_class_loaders = [
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
            // load_class
            'EE_Registration_Processor'                    => 'load_class',
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
            'EE_DMS_Core_4_1_0'                            => 'load_dms',
            'EE_DMS_Core_4_2_0'                            => 'load_dms',
            'EE_DMS_Core_4_3_0'                            => 'load_dms',
            'EE_DMS_Core_4_5_0'                            => 'load_dms',
            'EE_DMS_Core_4_6_0'                            => 'load_dms',
            'EE_DMS_Core_4_7_0'                            => 'load_dms',
            'EE_DMS_Core_4_8_0'                            => 'load_dms',
            'EE_DMS_Core_4_9_0'                            => 'load_dms',
            'EE_DMS_Core_4_10_0'                           => 'load_dms',
            'EE_DMS_Core_4_11_0'                           => 'load_dms',
            'EE_DMS_Core_4_12_0'                           => 'load_dms',
            'EE_Messages_Generator'                        => static function () {
                return EE_Registry::instance()->load_lib(
                    'Messages_Generator',
                    [],
                    false,
                    false
                );
            },
            'EE_Messages_Template_Defaults'                => static function ($arguments = []) {
                return EE_Registry::instance()->load_lib(
                    'Messages_Template_Defaults',
                    $arguments,
                    false,
                    false
                );
            },
            // load_helper
            'EEH_Parse_Shortcodes'                         => static function () {
                if (EE_Registry::instance()->load_helper('Parse_Shortcodes')) {
                    return new EEH_Parse_Shortcodes();
                }
                return null;
            },
            'EE_Template_Config'                           => static function () {
                return EE_Config::instance()->template_settings;
            },
            'EE_Currency_Config'                           => static function () {
                return EE_Config::instance()->currency;
            },
            'EE_Registration_Config'                       => static function () {
                return EE_Config::instance()->registration;
            },
            'EE_Core_Config'                               => static function () {
                return EE_Config::instance()->core;
            },
            'EventEspresso\core\services\loaders\Loader'   => static function () {
                return LoaderFactory::getLoader();
            },
            'EE_Network_Config'                            => static function () {
                return EE_Network_Config::instance();
            },
            'EE_Config'                                    => static function () {
                return EE_Config::instance();
            },
            'EventEspresso\core\domain\Domain'             => static function () {
                return DomainFactory::getEventEspressoCoreDomain();
            },
            'EE_Admin_Config'                              => static function () {
                return EE_Config::instance()->admin;
            },
            'EE_Organization_Config'                       => static function () {
                return EE_Config::instance()->organization;
            },
            'EE_Network_Core_Config'                       => static function () {
                return EE_Network_Config::instance()->core;
            },
            'EE_Environment_Config'                        => static function () {
                return EE_Config::instance()->environment;
            },
            'EED_Core_Rest_Api'                            => static function () {
                return EED_Core_Rest_Api::instance();
            },
            'WP_REST_Server'                               => static function () {
                return rest_get_server();
            },
            'EventEspresso\core\Psr4Autoloader'            => static function () {
                return EE_Psr4AutoloaderInit::psr4_loader();
            },
            'EE_Ticket_Selector_Config'                    => function () {
                return EE_Config::instance()->template_settings->EED_Ticket_Selector;
            },
        ];
    }


    /**
     * can be used for supplying alternate names for classes,
     * or for connecting interface names to instantiable classes
     *
     * @throws InvalidAliasException
     */
    protected function _register_core_aliases()
    {
        $aliases = [
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
            'Registration_Processor'                                                       => 'EE_Registration_Processor',
            'EventEspresso\core\services\assets\AssetManifestInterface'                    => 'EventEspresso\core\services\assets\AssetManifest',
        ];
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


    public function debug($for_class = '')
    {
        if (method_exists($this->class_cache, 'debug')) {
            $this->class_cache->debug($for_class);
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
     * @param string $fqn
     * @param string $for_class
     * @return bool
     * @deprecated 4.9.62.p
     */
    public function has_alias(string $fqn = '', string $for_class = ''): bool
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
     * @param string $alias
     * @param string $for_class
     * @return string
     * @deprecated 4.9.62.p
     */
    public function get_alias(string $alias = '', string $for_class = ''): string
    {
        return $this->getFqnForAlias($alias, $for_class);
    }
}
