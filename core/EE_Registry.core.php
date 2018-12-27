<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\commands\CommandBusInterface;
use EventEspresso\core\services\container\Mirror;
use EventEspresso\core\services\container\RegistryContainer;
use EventEspresso\core\services\loaders\ClassInterfaceCache;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\ObjectIdentifier;

/**
 * EE_Registry Class
 * Centralized Application Data Storage and Management
 *
 * @package                   Event Espresso
 * @subpackage                core
 * @author                    Brent Christensen
 */
class EE_Registry implements ResettableInterface
{

    /**
     * @var EE_Registry $_instance
     */
    private static $_instance;

    /**
     * @var EE_Dependency_Map $_dependency_map
     */
    protected $_dependency_map;

    /**
     * @var Mirror
     */
    private $mirror;

    /**
     * @var ClassInterfaceCache $class_cache
     */
    private $class_cache;

    /**
     * @var array $_class_abbreviations
     */
    protected $_class_abbreviations = array();

    /**
     * @var CommandBusInterface $BUS
     */
    public $BUS;

    /**
     * @var EE_Cart $CART
     */
    public $CART;

    /**
     * @var EE_Config $CFG
     */
    public $CFG;

    /**
     * @var EE_Network_Config $NET_CFG
     */
    public $NET_CFG;

    /**
     * StdClass object for storing library classes in
     *
     * @var RegistryContainer $LIB
     */
    public $LIB;

    /**
     * @var EE_Request_Handler $REQ
     */
    public $REQ;

    /**
     * @var EE_Session $SSN
     */
    public $SSN;

    /**
     * @since 4.5.0
     * @var EE_Capabilities $CAP
     */
    public $CAP;

    /**
     * @since 4.9.0
     * @var EE_Message_Resource_Manager $MRM
     */
    public $MRM;

    /**
     * @var Registry $AssetsRegistry
     */
    public $AssetsRegistry;

    /**
     * StdClass object for holding addons which have registered themselves to work with EE core
     *
     * @var EE_Addon[] $addons
     */
    public $addons;

    /**
     * keys are 'short names' (eg Event), values are class names (eg 'EEM_Event')
     *
     * @var EEM_Base[] $models
     */
    public $models = array();

    /**
     * @var EED_Module[] $modules
     */
    public $modules;

    /**
     * @var EES_Shortcode[] $shortcodes
     */
    public $shortcodes;

    /**
     * @var WP_Widget[] $widgets
     */
    public $widgets;

    /**
     * this is an array of all implemented model names (i.e. not the parent abstract models, or models
     * which don't actually fetch items from the DB in the normal way (ie, are not children of EEM_Base)).
     * Keys are model "short names" (eg "Event") as used in model relations, and values are
     * classnames (eg "EEM_Event")
     *
     * @var array $non_abstract_db_models
     */
    public $non_abstract_db_models = array();

    /**
     * internationalization for JS strings
     *    usage:   EE_Registry::i18n_js_strings['string_key'] = esc_html__( 'string to translate.', 'event_espresso' );
     *    in js file:  var translatedString = eei18n.string_key;
     *
     * @var array $i18n_js_strings
     */
    public static $i18n_js_strings = array();

    /**
     * $main_file - path to espresso.php
     *
     * @var array $main_file
     */
    public $main_file;

    /**
     * array of ReflectionClass objects where the key is the class name
     *
     * @deprecated 4.9.62.p
     * @var ReflectionClass[] $_reflectors
     */
    public $_reflectors;

    /**
     * boolean flag to indicate whether or not to load/save dependencies from/to the cache
     *
     * @var boolean $_cache_on
     */
    protected $_cache_on = true;

    /**
     * @var ObjectIdentifier
     */
    private $object_identifier;


    /**
     * @singleton method used to instantiate class object
     * @param EE_Dependency_Map|null   $dependency_map
     * @param Mirror|null              $mirror
     * @param ClassInterfaceCache|null $class_cache
     * @param ObjectIdentifier|null    $object_identifier
     * @return EE_Registry instance
     */
    public static function instance(
        EE_Dependency_Map $dependency_map = null,
        Mirror $mirror = null,
        ClassInterfaceCache $class_cache = null,
        ObjectIdentifier $object_identifier = null
    ) {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Registry
            && $dependency_map instanceof EE_Dependency_Map
            && $mirror instanceof Mirror
            && $class_cache instanceof ClassInterfaceCache
            && $object_identifier instanceof ObjectIdentifier
        ) {
            self::$_instance = new self(
                $dependency_map,
                $mirror,
                $class_cache,
                $object_identifier
            );
        }
        return self::$_instance;
    }


    /**
     * protected constructor to prevent direct creation
     *
     * @Constructor
     * @param  EE_Dependency_Map  $dependency_map
     * @param Mirror              $mirror
     * @param ClassInterfaceCache $class_cache
     * @param ObjectIdentifier    $object_identifier
     */
    protected function __construct(
        EE_Dependency_Map $dependency_map,
        Mirror $mirror,
        ClassInterfaceCache $class_cache,
        ObjectIdentifier $object_identifier
    ) {
        $this->_dependency_map = $dependency_map;
        $this->mirror = $mirror;
        $this->class_cache = $class_cache;
        $this->object_identifier = $object_identifier;
        // $registry_container = new RegistryContainer();
        $this->LIB = new RegistryContainer();
        $this->addons = new RegistryContainer();
        $this->modules = new RegistryContainer();
        $this->shortcodes = new RegistryContainer();
        $this->widgets = new RegistryContainer();
        add_action('EE_Load_Espresso_Core__handle_request__initialize_core_loading', array($this, 'initialize'));
    }


    /**
     * initialize
     *
     * @throws OutOfBoundsException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function initialize()
    {
        $this->_class_abbreviations = apply_filters(
            'FHEE__EE_Registry____construct___class_abbreviations',
            array(
                'EE_Config'                                       => 'CFG',
                'EE_Session'                                      => 'SSN',
                'EE_Capabilities'                                 => 'CAP',
                'EE_Cart'                                         => 'CART',
                'EE_Network_Config'                               => 'NET_CFG',
                'EE_Request_Handler'                              => 'REQ',
                'EE_Message_Resource_Manager'                     => 'MRM',
                'EventEspresso\core\services\commands\CommandBus' => 'BUS',
                'EventEspresso\core\services\assets\Registry'     => 'AssetsRegistry',
            )
        );
        $this->load_core('Base', array(), true);
        // add our request and response objects to the cache
        $request_loader = $this->_dependency_map->class_loader(
            'EventEspresso\core\services\request\Request'
        );
        $this->_set_cached_class(
            $request_loader(),
            'EventEspresso\core\services\request\Request'
        );
        $response_loader = $this->_dependency_map->class_loader(
            'EventEspresso\core\services\request\Response'
        );
        $this->_set_cached_class(
            $response_loader(),
            'EventEspresso\core\services\request\Response'
        );
        add_action('AHEE__EE_System__set_hooks_for_core', array($this, 'init'));
    }


    /**
     * @return void
     */
    public function init()
    {
        // Get current page protocol
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        // Output admin-ajax.php URL with same protocol as current page
        self::$i18n_js_strings['ajax_url'] = admin_url('admin-ajax.php', $protocol);
        self::$i18n_js_strings['wp_debug'] = defined('WP_DEBUG') ? WP_DEBUG : false;
    }


    /**
     * localize_i18n_js_strings
     *
     * @return string
     */
    public static function localize_i18n_js_strings()
    {
        $i18n_js_strings = (array) self::$i18n_js_strings;
        foreach ($i18n_js_strings as $key => $value) {
            if (is_scalar($value)) {
                $i18n_js_strings[ $key ] = html_entity_decode((string) $value, ENT_QUOTES, 'UTF-8');
            }
        }
        return '/* <![CDATA[ */ var eei18n = ' . wp_json_encode($i18n_js_strings) . '; /* ]]> */';
    }


    /**
     * @param mixed string | EED_Module $module
     * @throws OutOfBoundsException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_module($module)
    {
        if ($module instanceof EED_Module) {
            $module_class = get_class($module);
            $this->modules->{$module_class} = $module;
        } else {
            if (! class_exists('EE_Module_Request_Router', false)) {
                $this->load_core('Module_Request_Router');
            }
            EE_Module_Request_Router::module_factory($module);
        }
    }


    /**
     * @param string $module_name
     * @return mixed EED_Module | NULL
     */
    public function get_module($module_name = '')
    {
        return isset($this->modules->{$module_name})
            ? $this->modules->{$module_name}
            : null;
    }


    /**
     * loads core classes - must be singletons
     *
     * @param string $class_name - simple class name ie: session
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return mixed
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_core($class_name, $arguments = array(), $load_only = false)
    {
        $core_paths = apply_filters(
            'FHEE__EE_Registry__load_core__core_paths',
            array(
                EE_CORE,
                EE_ADMIN,
                EE_CPTS,
                EE_CORE . 'data_migration_scripts' . DS,
                EE_CORE . 'capabilities' . DS,
                EE_CORE . 'request_stack' . DS,
                EE_CORE . 'middleware' . DS,
            )
        );
        // retrieve instantiated class
        return $this->_load(
            $core_paths,
            'EE_',
            $class_name,
            'core',
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * loads service classes
     *
     * @param string $class_name - simple class name ie: session
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return mixed
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_service($class_name, $arguments = array(), $load_only = false)
    {
        $service_paths = apply_filters(
            'FHEE__EE_Registry__load_service__service_paths',
            array(
                EE_CORE . 'services' . DS,
            )
        );
        // retrieve instantiated class
        return $this->_load(
            $service_paths,
            'EE_',
            $class_name,
            'class',
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * loads data_migration_scripts
     *
     * @param string $class_name - class name for the DMS ie: EE_DMS_Core_4_2_0
     * @param mixed  $arguments
     * @return EE_Data_Migration_Script_Base|mixed
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_dms($class_name, $arguments = array())
    {
        // retrieve instantiated class
        return $this->_load(
            EE_Data_Migration_Manager::instance()->get_data_migration_script_folders(),
            'EE_DMS_',
            $class_name,
            'dms',
            $arguments,
            false,
            false
        );
    }


    /**
     * loads object creating classes - must be singletons
     *
     * @param string $class_name - simple class name ie: attendee
     * @param mixed  $arguments  - an array of arguments to pass to the class
     * @param bool   $from_db    - some classes are instantiated from the db and thus call a different method to
     *                           instantiate
     * @param bool   $cache      if you don't want the class to be stored in the internal cache (non-persistent) then
     *                           set this to FALSE (ie. when instantiating model objects from client in a loop)
     * @param bool   $load_only  whether or not to just load the file and NOT instantiate, or load AND instantiate
     *                           (default)
     * @return EE_Base_Class | bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_class($class_name, $arguments = array(), $from_db = false, $cache = true, $load_only = false)
    {
        $paths = apply_filters(
            'FHEE__EE_Registry__load_class__paths',
            array(
                EE_CORE,
                EE_CLASSES,
                EE_BUSINESS,
            )
        );
        // retrieve instantiated class
        return $this->_load(
            $paths,
            'EE_',
            $class_name,
            'class',
            $arguments,
            $from_db,
            $cache,
            $load_only
        );
    }


    /**
     * loads helper classes - must be singletons
     *
     * @param string $class_name - simple class name ie: price
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return EEH_Base | bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_helper($class_name, $arguments = array(), $load_only = true)
    {
        // todo: add doing_it_wrong() in a few versions after all addons have had calls to this method removed
        $helper_paths = apply_filters('FHEE__EE_Registry__load_helper__helper_paths', array(EE_HELPERS));
        // retrieve instantiated class
        return $this->_load(
            $helper_paths,
            'EEH_',
            $class_name,
            'helper',
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * loads core classes - must be singletons
     *
     * @param string $class_name - simple class name ie: session
     * @param mixed  $arguments
     * @param bool   $load_only
     * @param bool   $cache      whether to cache the object or not.
     * @return mixed
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_lib($class_name, $arguments = array(), $load_only = false, $cache = true)
    {
        $paths = array(
            EE_LIBRARIES,
            EE_LIBRARIES . 'messages' . DS,
            EE_LIBRARIES . 'shortcodes' . DS,
            EE_LIBRARIES . 'qtips' . DS,
            EE_LIBRARIES . 'payment_methods' . DS,
        );
        // retrieve instantiated class
        return $this->_load(
            $paths,
            'EE_',
            $class_name,
            'lib',
            $arguments,
            false,
            $cache,
            $load_only
        );
    }


    /**
     * loads model classes - must be singletons
     *
     * @param string $class_name - simple class name ie: price
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return EEM_Base | bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_model($class_name, $arguments = array(), $load_only = false)
    {
        $paths = apply_filters(
            'FHEE__EE_Registry__load_model__paths',
            array(
                EE_MODELS,
                EE_CORE,
            )
        );
        // retrieve instantiated class
        return $this->_load(
            $paths,
            'EEM_',
            $class_name,
            'model',
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * loads model classes - must be singletons
     *
     * @param string $class_name - simple class name ie: price
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return mixed | bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_model_class($class_name, $arguments = array(), $load_only = true)
    {
        $paths = array(
            EE_MODELS . 'fields' . DS,
            EE_MODELS . 'helpers' . DS,
            EE_MODELS . 'relations' . DS,
            EE_MODELS . 'strategies' . DS,
        );
        // retrieve instantiated class
        return $this->_load(
            $paths,
            'EE_',
            $class_name,
            '',
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * Determines if $model_name is the name of an actual EE model.
     *
     * @param string $model_name like Event, Attendee, Question_Group_Question, etc.
     * @return boolean
     */
    public function is_model_name($model_name)
    {
        return isset($this->models[ $model_name ]);
    }


    /**
     * generic class loader
     *
     * @param string $path_to_file - directory path to file location, not including filename
     * @param string $file_name    - file name  ie:  my_file.php, including extension
     * @param string $type         - file type - core? class? helper? model?
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return mixed
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_file($path_to_file, $file_name, $type = '', $arguments = array(), $load_only = true)
    {
        // retrieve instantiated class
        return $this->_load(
            $path_to_file,
            '',
            $file_name,
            $type,
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * @param string $path_to_file - directory path to file location, not including filename
     * @param string $class_name   - full class name  ie:  My_Class
     * @param string $type         - file type - core? class? helper? model?
     * @param mixed  $arguments
     * @param bool   $load_only
     * @return bool|EE_Addon|object
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function load_addon($path_to_file, $class_name, $type = 'class', $arguments = array(), $load_only = false)
    {
        // retrieve instantiated class
        return $this->_load(
            $path_to_file,
            'addon',
            $class_name,
            $type,
            $arguments,
            false,
            true,
            $load_only
        );
    }


    /**
     * instantiates, caches, and automatically resolves dependencies
     * for classes that use a Fully Qualified Class Name.
     * if the class is not capable of being loaded using PSR-4 autoloading,
     * then you need to use one of the existing load_*() methods
     * which can resolve the classname and filepath from the passed arguments
     *
     * @param bool|string $class_name   Fully Qualified Class Name
     * @param array       $arguments    an argument, or array of arguments to pass to the class upon instantiation
     * @param bool        $cache        whether to cache the instantiated object for reuse
     * @param bool        $from_db      some classes are instantiated from the db
     *                                  and thus call a different method to instantiate
     * @param bool        $load_only    if true, will only load the file, but will NOT instantiate an object
     * @param bool|string $addon        if true, will cache the object in the EE_Registry->$addons array
     * @return bool|null|mixed          null = failure to load or instantiate class object.
     *                                  object = class loaded and instantiated successfully.
     *                                  bool = fail or success when $load_only is true
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public function create(
        $class_name = false,
        $arguments = array(),
        $cache = false,
        $from_db = false,
        $load_only = false,
        $addon = false
    ) {
        $class_name = ltrim($class_name, '\\');
        $class_name = $this->class_cache->getFqnForAlias($class_name);
        $class_exists = $this->loadOrVerifyClassExists($class_name, $arguments);
        // if a non-FQCN was passed, then
        // verifyClassExists() might return an object
        // or it could return null if the class just could not be found anywhere
        if ($class_exists instanceof $class_name || $class_exists === null) {
            // either way, return the results
            return $class_exists;
        }
        $class_name = $class_exists;
        // if we're only loading the class and it already exists, then let's just return true immediately
        if ($load_only) {
            return true;
        }
        $addon = $addon ? 'addon' : '';
        // $this->_cache_on is toggled during the recursive loading that can occur with dependency injection
        // $cache is controlled by individual calls to separate Registry loader methods like load_class()
        // $load_only is also controlled by individual calls to separate Registry loader methods like load_file()
        if ($this->_cache_on && $cache && ! $load_only) {
            // return object if it's already cached
            $cached_class = $this->_get_cached_class($class_name, $addon, $arguments);
            if ($cached_class !== null) {
                return $cached_class;
            }
        }// obtain the loader method from the dependency map
        $loader = $this->_dependency_map->class_loader($class_name);// instantiate the requested object
        if ($loader instanceof Closure) {
            $class_obj = $loader($arguments);
        } else {
            if ($loader && method_exists($this, $loader)) {
                $class_obj = $this->{$loader}($class_name, $arguments);
            } else {
                $class_obj = $this->_create_object($class_name, $arguments, $addon, $from_db);
            }
        }
        if (($this->_cache_on && $cache) || $this->get_class_abbreviation($class_name, '')) {
            // save it for later... kinda like gum  { : $
            $this->_set_cached_class(
                $class_obj,
                $class_name,
                $addon,
                $from_db,
                $arguments
            );
        }
        $this->_cache_on = true;
        return $class_obj;
    }


    /**
     * Recursively checks that a class exists and potentially attempts to load classes with non-FQCNs
     *
     * @param string|object $class_name
     * @param array         $arguments
     * @param int           $attempt
     * @return mixed
     */
    private function loadOrVerifyClassExists($class_name, array $arguments, $attempt = 1)
    {
        if (is_object($class_name) || class_exists($class_name)) {
            return $class_name;
        }
        switch ($attempt) {
            case 1:
                // if it's a FQCN then maybe the class is registered with a preceding \
                $class_name = strpos($class_name, '\\') !== false
                    ? '\\' . ltrim($class_name, '\\')
                    : $class_name;
                break;
            case 2:
                //
                $loader = $this->_dependency_map->class_loader($class_name);
                if ($loader && method_exists($this, $loader)) {
                    return $this->{$loader}($class_name, $arguments);
                }
                break;
            case 3:
            default:
                return null;
        }
        $attempt++;
        return $this->loadOrVerifyClassExists($class_name, $arguments, $attempt);
    }


    /**
     * instantiates, caches, and injects dependencies for classes
     *
     * @param array       $file_paths   an array of paths to folders to look in
     * @param string      $class_prefix EE  or EEM or... ???
     * @param bool|string $class_name   $class name
     * @param string      $type         file type - core? class? helper? model?
     * @param mixed       $arguments    an argument or array of arguments to pass to the class upon instantiation
     * @param bool        $from_db      some classes are instantiated from the db
     *                                  and thus call a different method to instantiate
     * @param bool        $cache        whether to cache the instantiated object for reuse
     * @param bool        $load_only    if true, will only load the file, but will NOT instantiate an object
     * @return bool|null|object null = failure to load or instantiate class object.
     *                                  object = class loaded and instantiated successfully.
     *                                  bool = fail or success when $load_only is true
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    protected function _load(
        $file_paths = array(),
        $class_prefix = 'EE_',
        $class_name = false,
        $type = 'class',
        $arguments = array(),
        $from_db = false,
        $cache = true,
        $load_only = false
    ) {
        $class_name = ltrim($class_name, '\\');
        // strip php file extension
        $class_name = str_replace('.php', '', trim($class_name));
        // does the class have a prefix ?
        if (! empty($class_prefix) && $class_prefix !== 'addon') {
            // make sure $class_prefix is uppercase
            $class_prefix = strtoupper(trim($class_prefix));
            // add class prefix ONCE!!!
            $class_name = $class_prefix . str_replace($class_prefix, '', $class_name);
        }
        $class_name = $this->class_cache->getFqnForAlias($class_name);
        $class_exists = class_exists($class_name, false);
        // if we're only loading the class and it already exists, then let's just return true immediately
        if ($load_only && $class_exists) {
            return true;
        }
        $arguments = is_array($arguments) ? $arguments : array($arguments);
        // $this->_cache_on is toggled during the recursive loading that can occur with dependency injection
        // $cache is controlled by individual calls to separate Registry loader methods like load_class()
        // $load_only is also controlled by individual calls to separate Registry loader methods like load_file()
        if ($this->_cache_on && $cache && ! $load_only) {
            // return object if it's already cached
            $cached_class = $this->_get_cached_class($class_name, $class_prefix, $arguments);
            if ($cached_class !== null) {
                return $cached_class;
            }
        }
        // if the class doesn't already exist.. then we need to try and find the file and load it
        if (! $class_exists) {
            // get full path to file
            $path = $this->_resolve_path($class_name, $type, $file_paths);
            // load the file
            $loaded = $this->_require_file($path, $class_name, $type, $file_paths);
            // if we are only loading a file but NOT instantiating an object
            // then return boolean for whether class was loaded or not
            if ($load_only) {
                return $loaded;
            }
            // if an object was expected but loading failed, then return nothing
            if (! $loaded) {
                return null;
            }
        }
        // instantiate the requested object
        $class_obj = $this->_create_object($class_name, $arguments, $type, $from_db);
        if ($this->_cache_on && $cache) {
            // save it for later... kinda like gum  { : $
            $this->_set_cached_class(
                $class_obj,
                $class_name,
                $class_prefix,
                $from_db,
                $arguments
            );
        }
        $this->_cache_on = true;
        return $class_obj;
    }


    /**
     * @param string $class_name
     * @param string $default have to specify something, but not anything that will conflict
     * @return mixed|string
     */
    protected function get_class_abbreviation($class_name, $default = 'FANCY_BATMAN_PANTS')
    {
        return isset($this->_class_abbreviations[ $class_name ])
            ? $this->_class_abbreviations[ $class_name ]
            : $default;
    }


    /**
     * attempts to find a cached version of the requested class
     * by looking in the following places:
     *        $this->{$class_abbreviation}            ie:    $this->CART
     *        $this->{$class_name}                        ie:    $this->Some_Class
     *        $this->LIB->{$class_name}                ie:    $this->LIB->Some_Class
     *        $this->addon->{$class_name}    ie:    $this->addon->Some_Addon_Class
     *
     * @param string $class_name
     * @param string $class_prefix
     * @param array  $arguments
     * @return mixed
     */
    protected function _get_cached_class(
        $class_name,
        $class_prefix = '',
        $arguments = array()
    ) {
        if ($class_name === 'EE_Registry') {
            return $this;
        }
        $class_abbreviation = $this->get_class_abbreviation($class_name);
        // check if class has already been loaded, and return it if it has been
        if (isset($this->{$class_abbreviation})) {
            return $this->{$class_abbreviation};
        }
        $class_name = str_replace('\\', '_', $class_name);
        if (isset($this->{$class_name})) {
            return $this->{$class_name};
        }
        if ($class_prefix === 'addon' && isset($this->addons->{$class_name})) {
            return $this->addons->{$class_name};
        }
        $object_identifier = $this->object_identifier->getIdentifier($class_name, $arguments);
        if (isset($this->LIB->{$object_identifier})) {
            return $this->LIB->{$object_identifier};
        }
        foreach ($this->LIB as $key => $object) {
            if (// request does not contain new arguments and therefore no args identifier
                ! $this->object_identifier->hasArguments($object_identifier)
                // but previously cached class with args was found
                && $this->object_identifier->fqcnMatchesObjectIdentifier($class_name, $key)
            ) {
                return $object;
            }
        }
        return null;
    }


    /**
     * removes a cached version of the requested class
     *
     * @param string  $class_name
     * @param boolean $addon
     * @param array   $arguments
     * @return boolean
     */
    public function clear_cached_class(
        $class_name,
        $addon = false,
        $arguments = array()
    ) {
        $class_abbreviation = $this->get_class_abbreviation($class_name);
        // check if class has already been loaded, and return it if it has been
        if (isset($this->{$class_abbreviation})) {
            $this->{$class_abbreviation} = null;
            return true;
        }
        $class_name = str_replace('\\', '_', $class_name);
        if (isset($this->{$class_name})) {
            $this->{$class_name} = null;
            return true;
        }
        if ($addon && isset($this->addons->{$class_name})) {
            unset($this->addons->{$class_name});
            return true;
        }
        $class_name = $this->object_identifier->getIdentifier($class_name, $arguments);
        if (isset($this->LIB->{$class_name})) {
            unset($this->LIB->{$class_name});
            return true;
        }
        return false;
    }


    /**
     * _set_cached_class
     * attempts to cache the instantiated class locally
     * in one of the following places, in the following order:
     *        $this->{class_abbreviation}   ie:    $this->CART
     *        $this->{$class_name}          ie:    $this->Some_Class
     *        $this->addon->{$$class_name}    ie:    $this->addon->Some_Addon_Class
     *        $this->LIB->{$class_name}     ie:    $this->LIB->Some_Class
     *
     * @param object $class_obj
     * @param string $class_name
     * @param string $class_prefix
     * @param bool   $from_db
     * @param array  $arguments
     * @return void
     */
    protected function _set_cached_class(
        $class_obj,
        $class_name,
        $class_prefix = '',
        $from_db = false,
        $arguments = array()
    ) {
        if ($class_name === 'EE_Registry' || empty($class_obj)) {
            return;
        }
        // return newly instantiated class
        $class_abbreviation = $this->get_class_abbreviation($class_name, '');
        if ($class_abbreviation) {
            $this->{$class_abbreviation} = $class_obj;
            return;
        }
        $class_name = str_replace('\\', '_', $class_name);
        if (property_exists($this, $class_name)) {
            $this->{$class_name} = $class_obj;
            return;
        }
        if ($class_prefix === 'addon') {
            $this->addons->{$class_name} = $class_obj;
            return;
        }
        if (! $from_db) {
            $class_name = $this->object_identifier->getIdentifier($class_name, $arguments);
            $this->LIB->{$class_name} = $class_obj;
        }
    }


    /**
     * attempts to find a full valid filepath for the requested class.
     * loops thru each of the base paths in the $file_paths array and appends : "{classname} . {file type} . php"
     * then returns that path if the target file has been found and is readable
     *
     * @param string $class_name
     * @param string $type
     * @param array  $file_paths
     * @return string | bool
     */
    protected function _resolve_path($class_name, $type = '', $file_paths = array())
    {
        // make sure $file_paths is an array
        $file_paths = is_array($file_paths)
            ? $file_paths
            : array($file_paths);
        // cycle thru paths
        foreach ($file_paths as $key => $file_path) {
            // convert all separators to proper DS, if no filepath, then use EE_CLASSES
            $file_path = $file_path
                ? str_replace(array('/', '\\'), DS, $file_path)
                : EE_CLASSES;
            // prep file type
            $type = ! empty($type)
                ? trim($type, '.') . '.'
                : '';
            // build full file path
            $file_paths[ $key ] = rtrim($file_path, DS) . DS . $class_name . '.' . $type . 'php';
            // does the file exist and can be read ?
            if (is_readable($file_paths[ $key ])) {
                return $file_paths[ $key ];
            }
        }
        return false;
    }


    /**
     * basically just performs a require_once()
     * but with some error handling
     *
     * @param  string $path
     * @param  string $class_name
     * @param  string $type
     * @param  array  $file_paths
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _require_file($path, $class_name, $type = '', $file_paths = array())
    {
        $this->resolve_legacy_class_parent($class_name);
        // don't give up! you gotta...
        try {
            // does the file exist and can it be read ?
            if (! $path) {
                // just in case the file has already been autoloaded,
                // but discrepancies in the naming schema are preventing it from
                // being loaded via one of the EE_Registry::load_*() methods,
                // then let's try one last hail mary before throwing an exception
                // and call class_exists() again, but with autoloading turned ON
                if (class_exists($class_name)) {
                    return true;
                }
                // so sorry, can't find the file
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'The %1$s file %2$s could not be located or is not readable due to file permissions. Please ensure that the following filepath(s) are correct: %3$s',
                            'event_espresso'
                        ),
                        trim($type, '.'),
                        $class_name,
                        '<br />' . implode(',<br />', $file_paths)
                    )
                );
            }
            // get the file
            require_once($path);
            // if the class isn't already declared somewhere
            if (class_exists($class_name, false) === false) {
                // so sorry, not a class
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'The %s file %s does not appear to contain the %s Class.',
                            'event_espresso'
                        ),
                        $type,
                        $path,
                        $class_name
                    )
                );
            }
        } catch (EE_Error $e) {
            $e->get_error();
            return false;
        }
        return true;
    }


    /**
     * Some of our legacy classes that extended a parent class would simply use a require() statement
     * before their class declaration in order to ensure that the parent class was loaded.
     * This is not ideal, but it's nearly impossible to determine the parent class of a non-namespaced class,
     * without triggering a fatal error because the parent class has yet to be loaded and therefore doesn't exist.
     *
     * @param string $class_name
     */
    protected function resolve_legacy_class_parent($class_name = '')
    {
        try {
            $legacy_parent_class_map = array(
                'EE_Payment_Processor' => 'core/business/EE_Processor_Base.class.php',
            );
            if (isset($legacy_parent_class_map[ $class_name ])) {
                require_once EE_PLUGIN_DIR_PATH . $legacy_parent_class_map[ $class_name ];
            }
        } catch (Exception $exception) {
        }
    }


    /**
     * _create_object
     * Attempts to instantiate the requested class via any of the
     * commonly used instantiation methods employed throughout EE.
     * The priority for instantiation is as follows:
     *        - abstract classes or any class flagged as "load only" (no instantiation occurs)
     *        - model objects via their 'new_instance_from_db' method
     *        - model objects via their 'new_instance' method
     *        - "singleton" classes" via their 'instance' method
     *    - standard instantiable classes via their __constructor
     * Prior to instantiation, if the classname exists in the dependency_map,
     * then the constructor for the requested class will be examined to determine
     * if any dependencies exist, and if they can be injected.
     * If so, then those classes will be added to the array of arguments passed to the constructor
     *
     * @param string $class_name
     * @param array  $arguments
     * @param string $type
     * @param bool   $from_db
     * @return null|object|bool
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     */
    protected function _create_object($class_name, $arguments = array(), $type = '', $from_db = false)
    {
        // create reflection
        $reflector = $this->mirror->getReflectionClass($class_name);
        // make sure arguments are an array
        $arguments = is_array($arguments)
            ? $arguments
            : array($arguments);
        // and if arguments array is numerically and sequentially indexed, then we want it to remain as is,
        // else wrap it in an additional array so that it doesn't get split into multiple parameters
        $arguments = $this->_array_is_numerically_and_sequentially_indexed($arguments)
            ? $arguments
            : array($arguments);
        // attempt to inject dependencies ?
        if ($this->_dependency_map->has($class_name)) {
            $arguments = $this->_resolve_dependencies($reflector, $class_name, $arguments);
        }
        // instantiate the class if possible
        if ($reflector->isAbstract()) {
            // nothing to instantiate, loading file was enough
            // does not throw an exception so $instantiation_mode is unused
            // $instantiation_mode = "1) no constructor abstract class";
            return true;
        }
        if (empty($arguments)
            && $this->mirror->getConstructorFromReflection($reflector) === null
            && $reflector->isInstantiable()
        ) {
            // no constructor = static methods only... nothing to instantiate, loading file was enough
            // $instantiation_mode = "2) no constructor but instantiable";
            return $reflector->newInstance();
        }
        if ($from_db && method_exists($class_name, 'new_instance_from_db')) {
            // $instantiation_mode = "3) new_instance_from_db()";
            return call_user_func_array(array($class_name, 'new_instance_from_db'), $arguments);
        }
        if (method_exists($class_name, 'new_instance')) {
            // $instantiation_mode = "4) new_instance()";
            return call_user_func_array(array($class_name, 'new_instance'), $arguments);
        }
        if (method_exists($class_name, 'instance')) {
            // $instantiation_mode = "5) instance()";
            return call_user_func_array(array($class_name, 'instance'), $arguments);
        }
        if ($reflector->isInstantiable()) {
            // $instantiation_mode = "6) constructor";
            return $reflector->newInstanceArgs($arguments);
        }
        // heh ? something's not right !
        throw new EE_Error(
            sprintf(
                __('The %s file %s could not be instantiated.', 'event_espresso'),
                $type,
                $class_name
            )
        );
    }


    /**
     * @see http://stackoverflow.com/questions/173400/how-to-check-if-php-array-is-associative-or-sequential
     * @param array $array
     * @return bool
     */
    protected function _array_is_numerically_and_sequentially_indexed(array $array)
    {
        return ! empty($array)
            ? array_keys($array) === range(0, count($array) - 1)
            : true;
    }


    /**
     * _resolve_dependencies
     * examines the constructor for the requested class to determine
     * if any dependencies exist, and if they can be injected.
     * If so, then those classes will be added to the array of arguments passed to the constructor
     * PLZ NOTE: this is achieved by type hinting the constructor params
     * For example:
     *        if attempting to load a class "Foo" with the following constructor:
     *        __construct( Bar $bar_class, Fighter $grohl_class )
     *        then $bar_class and $grohl_class will be added to the $arguments array,
     *        but only IF they are NOT already present in the incoming arguments array,
     *        and the correct classes can be loaded
     *
     * @param ReflectionClass $reflector
     * @param string          $class_name
     * @param array           $arguments
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _resolve_dependencies(ReflectionClass $reflector, $class_name, array $arguments = array())
    {
        // let's examine the constructor
        $constructor = $this->mirror->getConstructorFromReflection($reflector);
        // whu? huh? nothing?
        if (! $constructor) {
            return $arguments;
        }
        // get constructor parameters
        $params = $this->mirror->getParametersFromReflection($reflector);
        // and the keys for the incoming arguments array so that we can compare existing arguments with what is expected
        $argument_keys = array_keys($arguments);
        // now loop thru all of the constructors expected parameters
        foreach ($params as $index => $param) {
            // is this a dependency for a specific class ?
            $param_class = $this->mirror->getParameterClassName($param, $class_name, $index);
            // BUT WAIT !!! This class may be an alias for something else (or getting replaced at runtime)
            $param_class = $this->class_cache->isAlias($param_class, $class_name)
                ? $this->class_cache->getFqnForAlias($param_class, $class_name)
                : $param_class;
            if (// param is not even a class
                $param_class === null
                // and something already exists in the incoming arguments for this param
                && array_key_exists($index, $argument_keys)
                && array_key_exists($argument_keys[ $index ], $arguments)
            ) {
                // so let's skip this argument and move on to the next
                continue;
            }
            if (// parameter is type hinted as a class, exists as an incoming argument, AND it's the correct class
                $param_class !== null
                && isset($argument_keys[ $index ], $arguments[ $argument_keys[ $index ] ])
                && $arguments[ $argument_keys[ $index ] ] instanceof $param_class
            ) {
                // skip this argument and move on to the next
                continue;
            }
            if (// parameter is type hinted as a class, and should be injected
                $param_class !== null
                && $this->_dependency_map->has_dependency_for_class($class_name, $param_class)
            ) {
                $arguments = $this->_resolve_dependency(
                    $class_name,
                    $param_class,
                    $arguments,
                    $index
                );
            }
            if (empty($arguments[ $index ])) {
                $arguments[ $index ] = $this->mirror->getParameterDefaultValue(
                    $param,
                    $class_name,
                    $index
                );
            }
        }
        return $arguments;
    }


    /**
     * @param string $class_name
     * @param string $param_class
     * @param array  $arguments
     * @param mixed  $index
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    protected function _resolve_dependency($class_name, $param_class, $arguments, $index)
    {
        $dependency = null;
        // should dependency be loaded from cache ?
        $cache_on = $this->_dependency_map->loading_strategy_for_class_dependency(
            $class_name,
            $param_class
        );
        $cache_on = $cache_on !== EE_Dependency_Map::load_new_object;
        // we might have a dependency...
        // let's MAYBE try and find it in our cache if that's what's been requested
        $cached_class = $cache_on
            ? $this->_get_cached_class($param_class)
            : null;
        // and grab it if it exists
        if ($cached_class instanceof $param_class) {
            $dependency = $cached_class;
        } elseif ($param_class !== $class_name) {
            // obtain the loader method from the dependency map
            $loader = $this->_dependency_map->class_loader($param_class);
            // is loader a custom closure ?
            if ($loader instanceof Closure) {
                $dependency = $loader($arguments);
            } else {
                // set the cache on property for the recursive loading call
                $this->_cache_on = $cache_on;
                // if not, then let's try and load it via the registry
                if ($loader && method_exists($this, $loader)) {
                    $dependency = $this->{$loader}($param_class);
                } else {
                    $dependency = LoaderFactory::getLoader()->load(
                        $param_class,
                        array(),
                        $cache_on
                    );
                }
            }
        }
        // did we successfully find the correct dependency ?
        if ($dependency instanceof $param_class) {
            // then let's inject it into the incoming array of arguments at the correct location
            $arguments[ $index ] = $dependency;
        }
        return $arguments;
    }


    /**
     * call any loader that's been registered in the EE_Dependency_Map::$_class_loaders array
     *
     * @param string $classname PLEASE NOTE: the class name needs to match what's registered
     *                          in the EE_Dependency_Map::$_class_loaders array,
     *                          including the class prefix, ie: "EE_", "EEM_", "EEH_", etc
     * @param array  $arguments
     * @return object
     */
    public static function factory($classname, $arguments = array())
    {
        $loader = self::instance()->_dependency_map->class_loader($classname);
        if ($loader instanceof Closure) {
            return $loader($arguments);
        }
        if (method_exists(self::instance(), $loader)) {
            return self::instance()->{$loader}($classname, $arguments);
        }
        return null;
    }


    /**
     * Gets the addon by its class name
     *
     * @param string $class_name
     * @return EE_Addon
     */
    public function getAddon($class_name)
    {
        $class_name = str_replace('\\', '_', $class_name);
        if (isset($this->addons->{$class_name})) {
            return $this->addons->{$class_name};
        } else {
            return null;
        }
    }


    /**
     * removes the addon from the internal cache
     *
     * @param string $class_name
     * @return void
     */
    public function removeAddon($class_name)
    {
        $class_name = str_replace('\\', '_', $class_name);
        unset($this->addons->{$class_name});
    }


    /**
     * Gets the addon by its name/slug (not classname. For that, just
     * use the get_addon() method above
     *
     * @param string $name
     * @return EE_Addon
     */
    public function get_addon_by_name($name)
    {
        foreach ($this->addons as $addon) {
            if ($addon->name() === $name) {
                return $addon;
            }
        }
        return null;
    }


    /**
     * Gets an array of all the registered addons, where the keys are their names.
     * (ie, what each returns for their name() function)
     * They're already available on EE_Registry::instance()->addons as properties,
     * where each property's name is the addon's classname,
     * So if you just want to get the addon by classname,
     * OR use the get_addon() method above.
     * PLEASE  NOTE:
     * addons with Fully Qualified Class Names
     * have had the namespace separators converted to underscores,
     * so a classname like Fully\Qualified\ClassName
     * would have been converted to Fully_Qualified_ClassName
     *
     * @return EE_Addon[] where the KEYS are the addon's name()
     */
    public function get_addons_by_name()
    {
        $addons = array();
        foreach ($this->addons as $addon) {
            $addons[ $addon->name() ] = $addon;
        }
        return $addons;
    }


    /**
     * Resets the specified model's instance AND makes sure EE_Registry doesn't keep
     * a stale copy of it around
     *
     * @param string $model_name
     * @return \EEM_Base
     * @throws \EE_Error
     */
    public function reset_model($model_name)
    {
        $model_class_name = strpos($model_name, 'EEM_') !== 0
            ? "EEM_{$model_name}"
            : $model_name;
        if (! isset($this->LIB->{$model_class_name}) || ! $this->LIB->{$model_class_name} instanceof EEM_Base) {
            return null;
        }
        // get that model reset it and make sure we nuke the old reference to it
        if ($this->LIB->{$model_class_name} instanceof $model_class_name
            && is_callable(
                array($model_class_name, 'reset')
            )) {
            $this->LIB->{$model_class_name} = $this->LIB->{$model_class_name}->reset();
        } else {
            throw new EE_Error(
                sprintf(
                    esc_html__('Model %s does not have a method "reset"', 'event_espresso'),
                    $model_name
                )
            );
        }
        return $this->LIB->{$model_class_name};
    }


    /**
     * Resets the registry.
     * The criteria for what gets reset is based on what can be shared between sites on the same request when
     * switch_to_blog is used in a multisite install.  Here is a list of things that are NOT reset.
     * - $_dependency_map
     * - $_class_abbreviations
     * - $NET_CFG (EE_Network_Config): The config is shared network wide so no need to reset.
     * - $REQ:  Still on the same request so no need to change.
     * - $CAP: There is no site specific state in the EE_Capability class.
     * - $SSN: Although ideally, the session should not be shared between site switches, we can't reset it because only
     * one Session can be active in a single request.  Resetting could resolve in "headers already sent" errors.
     * - $addons:  In multisite, the state of the addons is something controlled via hooks etc in a normal request.  So
     *             for now, we won't reset the addons because it could break calls to an add-ons class/methods in the
     *             switch or on the restore.
     * - $modules
     * - $shortcodes
     * - $widgets
     *
     * @param boolean $hard             [deprecated]
     * @param boolean $reinstantiate    whether to create new instances of EE_Registry's singletons too,
     *                                  or just reset without re-instantiating (handy to set to FALSE if you're not
     *                                  sure if you CAN currently reinstantiate the singletons at the moment)
     * @param   bool  $reset_models     Defaults to true.  When false, then the models are not reset.  This is so
     *                                  client
     *                                  code instead can just change the model context to a different blog id if
     *                                  necessary
     * @return EE_Registry
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidArgumentException
     */
    public static function reset($hard = false, $reinstantiate = true, $reset_models = true)
    {
        $instance = self::instance();
        $instance->_cache_on = true;
        // reset some "special" classes
        EEH_Activation::reset();
        $hard = apply_filters('FHEE__EE_Registry__reset__hard', $hard);
        $instance->CFG = EE_Config::reset($hard, $reinstantiate);
        $instance->CART = null;
        $instance->MRM = null;
        $instance->AssetsRegistry = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\assets\Registry'
        );
        // messages reset
        EED_Messages::reset();
        // handle of objects cached on LIB
        foreach (array('LIB', 'modules') as $cache) {
            foreach ($instance->{$cache} as $class_name => $class) {
                if (self::_reset_and_unset_object($class, $reset_models)) {
                    unset($instance->{$cache}->{$class_name});
                }
            }
        }
        return $instance;
    }


    /**
     * if passed object implements ResettableInterface, then call it's reset() method
     * if passed object implements InterminableInterface, then return false,
     * to indicate that it should NOT be cleared from the Registry cache
     *
     * @param      $object
     * @param bool $reset_models
     * @return bool returns true if cached object should be unset
     */
    private static function _reset_and_unset_object($object, $reset_models)
    {
        if (! is_object($object)) {
            // don't unset anything that's not an object
            return false;
        }
        if ($object instanceof EED_Module) {
            $object::reset();
            // don't unset modules
            return false;
        }
        if ($object instanceof ResettableInterface) {
            if ($object instanceof EEM_Base) {
                if ($reset_models) {
                    $object->reset();
                    return true;
                }
                return false;
            }
            $object->reset();
            return true;
        }
        if (! $object instanceof InterminableInterface) {
            return true;
        }
        return false;
    }


    /**
     * Gets all the custom post type models defined
     *
     * @return array keys are model "short names" (Eg "Event") and keys are classnames (eg "EEM_Event")
     */
    public function cpt_models()
    {
        $cpt_models = array();
        foreach ($this->non_abstract_db_models as $short_name => $classname) {
            if (is_subclass_of($classname, 'EEM_CPT_Base')) {
                $cpt_models[ $short_name ] = $classname;
            }
        }
        return $cpt_models;
    }


    /**
     * @return \EE_Config
     */
    public static function CFG()
    {
        return self::instance()->CFG;
    }


    /**
     * @deprecated 4.9.62.p
     * @param string $class_name
     * @return ReflectionClass
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     */
    public function get_ReflectionClass($class_name)
    {
        return $this->mirror->getReflectionClass($class_name);
    }
}
