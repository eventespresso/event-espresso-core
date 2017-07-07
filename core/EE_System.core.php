<?php
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\activation\ActivatableInterface;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivationsAndUpgradesManager;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\activation\RequestType;
use EventEspresso\core\services\shortcodes\ShortcodesManager;


defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * EE_System
 *
 * @package        Event Espresso
 * @subpackage     core/
 * @author         Brent Christensen, Michael Nelson
 */
final class EE_System implements ActivatableInterface
{


    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const req_type_normal = 0;

    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const req_type_new_activation = 1;

    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const req_type_reactivation = 2;

    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const req_type_upgrade = 3;

    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const req_type_downgrade = 4;

    /**
     * @deprecated since version 4.6.0.dev.006
     * Now whenever a new_activation is detected the request type is still just
     * new_activation (same for reactivation, upgrade, downgrade etc), but if we'r ein maintenance mode
     * EE_System::initialize_db_if_no_migrations_required and EE_Addon::initialize_db_if_no_migrations_required
     * will instead enqueue that EE plugin's db initialization for when we're taken out of maintenance mode.
     * (Specifically, when the migration manager indicates migrations are finished
     * EE_Data_Migration_Manager::initialize_db_for_enqueued_ee_plugins() will be called)
     */
    const req_type_activation_but_not_installed = 5;

    /**
     * @deprecated 4.9.40
     * @see        \EventEspresso\core\services\activation\RequestTypeDetector
     */
    const addon_activation_history_option_prefix = 'ee_addon_activation_history_';


    /**
     * @var EE_System $_instance
     */
    private static $_instance;

    /**
     * @var EE_Registry $registry
     */
    private $registry;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;

    /**
     * @var EE_Capabilities $capabilities
     */
    private $capabilities;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var ActivationsAndUpgradesManager $activations_and_upgrades_manager
     */
    private $activations_and_upgrades_manager;

    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;

    /**
     * @var \EventEspresso\core\services\activation\RequestType $request_type
     */
    private $request_type;

    /**
     * @var bool $activation_detected
     */
    private $activation_detected = false;



    /**
     * @singleton method used to instantiate class object
     * @param EE_Registry|null         $registry
     * @param LoaderInterface|null     $loader
     * @param EE_Maintenance_Mode|null $maintenance_mode
     * @return EE_System
     */
    public static function instance(
        EE_Registry $registry = null,
        LoaderInterface $loader = null,
        EE_Maintenance_Mode $maintenance_mode = null
    ) {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_System) {
            self::$_instance = new self(
                $registry,
                $loader,
                $maintenance_mode
            );
        }
        return self::$_instance;
    }



    /**
     * resets the instance and returns it
     *
     * @return EE_System
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidEntityException
     */
    public static function reset()
    {
        //make sure none of the old hooks are left hanging around
        remove_all_actions('AHEE__EE_System__perform_activations_upgrades_and_migrations');
        //we need to reset the migration manager in order for it to detect DMSs properly
        EE_Data_Migration_Manager::reset();
        self::instance()->detect_activations_or_upgrades();
        self::instance()->activations_and_upgrades_manager->performActivationsAndUpgrades();
        return self::instance();
    }



    /**
     * sets hooks for running rest of system
     * provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
     * starting EE Addons from any other point may lead to problems
     *
     * @param EE_Registry         $registry
     * @param LoaderInterface     $loader
     * @param EE_Maintenance_Mode $maintenance_mode
     */
    private function __construct(
        EE_Registry $registry,
        LoaderInterface $loader,
        EE_Maintenance_Mode $maintenance_mode
    ) {
        $this->registry = $registry;
        $this->loader = $loader;
        $this->maintenance_mode = $maintenance_mode;
        do_action('AHEE__EE_System__construct__begin', $this);
        // allow addons to load first so that they can register autoloaders, set hooks for running DMS's, etc
        add_action('AHEE__EE_Bootstrap__load_espresso_addons', array($this, 'load_espresso_addons'));
        // when an ee addon is activated, we want to call the core hook(s) again
        // because the newly-activated addon didn't get a chance to run at all
        add_action('activate_plugin', array($this, 'load_espresso_addons'), 1);
        // detect whether install or upgrade
        add_action(
            'AHEE__EE_Bootstrap__detect_activations_or_upgrades', array($this, 'detect_activations_or_upgrades'),
            3
        );
        // load EE_Config, EE_Textdomain, etc
        add_action('AHEE__EE_Bootstrap__load_core_configuration', array($this, 'load_core_configuration'), 5);
        // load EE_Config, EE_Textdomain, etc
        add_action(
            'AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets',
            array($this, 'register_shortcodes_modules_and_widgets'), 7
        );
        // you wanna get going? I wanna get going... let's get going!
        add_action('AHEE__EE_Bootstrap__brew_espresso', array($this, 'brew_espresso'), 9);
        //other housekeeping
        //exclude EE critical pages from wp_list_pages
        add_filter('wp_list_pages_excludes', array($this, 'remove_pages_from_wp_list_pages'), 10);
        // ALL EE Addons should use the following hook point to attach their initial setup too
        // it's extremely important for EE Addons to register any class autoloaders so that they can be available when the EE_Config loads
        do_action('AHEE__EE_System__construct__complete', $this);
    }



    /**
     * Gets the ActivationHistory object for this addon
     *
     * @return ActivationHistory
     */
    public function getActivationHistory()
    {
        return $this->activation_history;
    }



    /**
     * @param ActivationHistory $activation_history
     */
    public function setActivationHistory(ActivationHistory $activation_history)
    {
        $this->activation_history = $activation_history;
    }



    /**
     * @return RequestType
     */
    public function getRequestType()
    {
        return $this->request_type;
    }



    /**
     * @param RequestType $request_type
     */
    public function setRequestType(RequestType $request_type)
    {
        $this->request_type = $request_type;
    }

    /**
     * load_espresso_addons
     * allow addons to load first so that they can set hooks for running DMS's, etc
     * this is hooked into both:
     *    'AHEE__EE_Bootstrap__load_core_configuration'
     *        which runs during the WP 'plugins_loaded' action at priority 5
     *    and the WP 'activate_plugin' hook point
     *
     * @return void
     * @throws EE_Error
     */
    public function load_espresso_addons()
    {
        // set autoloaders for all of the classes implementing EEI_Plugin_API
        // which provide helpers for EE plugin authors to more easily register certain components with EE.
        EEH_Autoloader::instance()->register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'plugin_api');
        //caps need to be initialized on every request so that capability maps are set.
        //@see https://events.codebasehq.com/projects/event-espresso/tickets/8674
        $this->capabilities = $this->loader->getShared('EE_Capabilities');
        $this->capabilities->init_caps();
        do_action('AHEE__EE_System__load_espresso_addons');
        //if the WP API basic auth plugin isn't already loaded, load it now.
        //We want it for mobile apps. Just include the entire plugin
        //also, don't load the basic auth when a plugin is getting activated, because
        //it could be the basic auth plugin, and it doesn't check if its methods are already defined
        //and causes a fatal error
        if (
            ! (
                isset($_GET['activate'])
                && $_GET['activate'] === 'true'
            )
            && ! function_exists('json_basic_auth_handler')
            && ! function_exists('json_basic_auth_error')
            && ! (
                isset($_GET['action'])
                && in_array($_GET['action'], array('activate', 'activate-selected'), true)
            )
        ) {
            include_once EE_THIRD_PARTY . 'wp-api-basic-auth' . DS . 'basic-auth.php';
        }
        do_action('AHEE__EE_System__load_espresso_addons__complete');
    }



    /**
     * detect_activations_or_upgrades
     * Checks for activation or upgrade of core first;
     * then also checks if any registered addons have been activated or upgraded
     * This is hooked into 'AHEE__EE_Bootstrap__detect_activations_or_upgrades'
     * which runs during the WP 'plugins_loaded' action at priority 3
     *
     * @return void
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidEntityException
     */
    public function detect_activations_or_upgrades()
    {
        if(
            (defined('DOING_AJAX') && DOING_AJAX)
            || (defined('REST_REQUEST') && REST_REQUEST)
        ) {
            return;
        }
        $this->activations_and_upgrades_manager = $this->loader->getShared(
            'EventEspresso\core\services\activation\ActivationsAndUpgradesManager',
            array(
                array_merge(
                    array($this),
                    get_object_vars($this->registry->addons)
                )
            )
        );
        $this->activation_detected = $this->activations_and_upgrades_manager->detectActivationsAndUpgrades();
    }



    /**
     * load_core_configuration
     * this is hooked into 'AHEE__EE_Bootstrap__load_core_configuration'
     * which runs during the WP 'plugins_loaded' action at priority 5
     *
     * @return void
     * @throws ReflectionException
     */
    public function load_core_configuration()
    {
        do_action('AHEE__EE_System__load_core_configuration__begin', $this);
        $this->loader->getShared('EE_Load_Textdomain');
        //load textdomain
        EE_Load_Textdomain::load_textdomain();
        // load and setup EE_Config and EE_Network_Config
        $config = $this->loader->getShared('EE_Config');
        $this->loader->getShared('EE_Network_Config');
        // setup autoloaders
        // enable logging?
        if ($config->admin->use_full_logging) {
            $this->loader->getShared('EE_Log');
        }
        // check for activation errors
        $activation_errors = get_option('ee_plugin_activation_errors', false);
        if ($activation_errors) {
            EE_Error::add_error($activation_errors, __FILE__, __FUNCTION__, __LINE__);
            update_option('ee_plugin_activation_errors', false);
        }
        // get model names
        $this->_parse_model_names();
        //load caf stuff a chance to play during the activation process too.
        $this->_maybe_brew_regular();
        do_action('AHEE__EE_System__load_core_configuration__complete', $this);
    }



    /**
     * cycles through all of the models/*.model.php files, and assembles an array of model names
     *
     * @return void
     * @throws ReflectionException
     */
    private function _parse_model_names()
    {
        //get all the files in the EE_MODELS folder that end in .model.php
        $models = glob(EE_MODELS . '*.model.php');
        $model_names = array();
        $non_abstract_db_models = array();
        foreach ($models as $model) {
            // get model classname
            $classname = EEH_File::get_classname_from_filepath_with_standard_filename($model);
            $short_name = str_replace('EEM_', '', $classname);
            $reflectionClass = new ReflectionClass($classname);
            if ($reflectionClass->isSubclassOf('EEM_Base') && ! $reflectionClass->isAbstract()) {
                $non_abstract_db_models[$short_name] = $classname;
            }
            $model_names[$short_name] = $classname;
        }
        $this->registry->models = apply_filters('FHEE__EE_System__parse_model_names', $model_names);
        $this->registry->non_abstract_db_models = apply_filters(
            'FHEE__EE_System__parse_implemented_model_names',
            $non_abstract_db_models
        );
    }



    /**
     * The purpose of this method is to simply check for a file named "caffeinated/brewing_regular.php" for any hooks
     * that need to be setup before our EE_System launches.
     *
     * @return void
     */
    private function _maybe_brew_regular()
    {
        if (
            ! $this->activation_detected
            && (! defined('EE_DECAF') || EE_DECAF !== true)
            && is_readable(EE_CAFF_PATH . 'brewing_regular.php')
        ) {
            require_once EE_CAFF_PATH . 'brewing_regular.php';
        }
    }



    /**
     * register_shortcodes_modules_and_widgets
     * generate lists of shortcodes and modules, then verify paths and classes
     * This is hooked into 'AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets'
     * which runs during the WP 'plugins_loaded' action at priority 7
     *
     * @access public
     * @return void
     */
    public function register_shortcodes_modules_and_widgets()
    {
        if ($this->activation_detected) {
            return;
        }
        // check for addons using old hook point
        if (has_action('AHEE__EE_System__register_shortcodes_modules_and_addons')) {
            $this->_incompatible_addon_error();
        }
        do_action('AHEE__EE_System__register_shortcodes_modules_and_widgets');
        try {
            // load, register, and add shortcodes the new way
            new ShortcodesManager(
            // and the old way, but we'll put it under control of the new system
                EE_Config::getLegacyShortcodesManager()
            );
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }



    /**
     * _incompatible_addon_error
     *
     * @access public
     * @return void
     */
    private function _incompatible_addon_error()
    {
        // get array of classes hooking into here
        $class_names = EEH_Class_Tools::get_class_names_for_all_callbacks_on_hook(
            'AHEE__EE_System__register_shortcodes_modules_and_addons'
        );
        if (! empty($class_names)) {
            $msg = __(
                'The following plugins, addons, or modules appear to be incompatible with this version of Event Espresso and were automatically deactivated to avoid fatal errors:',
                'event_espresso'
            );
            $msg .= '<ul>';
            foreach ($class_names as $class_name) {
                $msg .= '<li><b>Event Espresso - ' . str_replace(
                        array('EE_', 'EEM_', 'EED_', 'EES_', 'EEW_'), '',
                        $class_name
                    ) . '</b></li>';
            }
            $msg .= '</ul>';
            $msg .= __(
                'Compatibility issues can be avoided and/or resolved by keeping addons and plugins updated to the latest version.',
                'event_espresso'
            );
            // save list of incompatible addons to wp-options for later use
            add_option('ee_incompatible_addons', $class_names, '', 'no');
            if (is_admin()) {
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        }
    }



    /**
     * brew_espresso
     * begins the process of setting hooks for initializing EE in the correct order
     * This is happening on the 'AHEE__EE_Bootstrap__brew_espresso' hook point
     * which runs during the WP 'plugins_loaded' action at priority 9
     *
     * @return void
     */
    public function brew_espresso()
    {
        if ($this->activation_detected) {
            add_action('init', array($this, 'perform_activations_upgrades_and_migrations'), 3);
            return;
        }
        do_action('AHEE__EE_System__brew_espresso__begin', $this);
        // load some final core systems
        add_action('init', array($this, 'set_hooks_for_core'), 1);
        add_action('init', array($this, 'load_CPTs_and_session'), 5);
        add_action('init', array($this, 'load_controllers'), 7);
        add_action('init', array($this, 'core_loaded_and_ready'), 9);
        add_action('init', array($this, 'initialize'), 10);
        add_action('init', array($this, 'initialize_last'), 100);
        if (is_admin() && apply_filters('FHEE__EE_System__brew_espresso__load_pue', true)) {
            // pew pew pew
            $this->loader->getShared('EE_PUE');
            do_action('AHEE__EE_System__brew_espresso__after_pue_init');
        }
        do_action('AHEE__EE_System__brew_espresso__complete', $this);
    }



    /**
     *    set_hooks_for_core
     *
     * @access public
     * @return    void
     */
    public function set_hooks_for_core()
    {
        do_action('AHEE__EE_System__set_hooks_for_core');
    }



    /**
     *    perform_activations_upgrades_and_migrations
     *
     * @access public
     * @return    void
     */
    public function perform_activations_upgrades_and_migrations()
    {
        do_action('AHEE__EE_System__perform_activations_upgrades_and_migrations');
    }



    /**
     *    load_CPTs_and_session
     *
     * @access public
     * @return    void
     */
    public function load_CPTs_and_session()
    {
        do_action('AHEE__EE_System__load_CPTs_and_session__start');
        // register Custom Post Types
        $this->loader->getShared('EE_Register_CPTs');
        do_action('AHEE__EE_System__load_CPTs_and_session__complete');
    }



    /**
     * load_controllers
     * this is the best place to load any additional controllers that needs access to EE core.
     * it is expected that all basic core EE systems, that are not dependant on the current request are loaded at this
     * time
     *
     * @access public
     * @return void
     */
    public function load_controllers()
    {
        do_action('AHEE__EE_System__load_controllers__start');
        // let's get it started
        if (! is_admin() && ! $this->maintenance_mode->level()) {
            do_action('AHEE__EE_System__load_controllers__load_front_controllers');
            $this->loader->getShared('EE_Front_Controller');
        } else if (! EE_FRONT_AJAX) {
            do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
            $this->loader->getShared('EE_Admin');
        }
        do_action('AHEE__EE_System__load_controllers__complete');
    }



    /**
     * core_loaded_and_ready
     * all of the basic EE core should be loaded at this point and available regardless of M-Mode
     *
     * @access public
     * @return void
     */
    public function core_loaded_and_ready()
    {
        $this->loader->getShared('EE_Session');
        do_action('AHEE__EE_System__core_loaded_and_ready');
        // load_espresso_template_tags
        if (is_readable(EE_PUBLIC . 'template_tags.php')) {
            require_once(EE_PUBLIC . 'template_tags.php');
        }
        do_action('AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons');
        $this->loader->getShared('EventEspresso\core\services\assets\Registry');
    }



    /**
     * initialize
     * this is the best place to begin initializing client code
     *
     * @access public
     * @return void
     */
    public function initialize()
    {
        do_action('AHEE__EE_System__initialize');
    }



    /**
     * initialize_last
     * this is run really late during the WP init hook point, and ensures that mostly everything else that needs to
     * initialize has done so
     *
     * @access public
     * @return void
     */
    public function initialize_last()
    {
        do_action('AHEE__EE_System__initialize_last');
        add_action('admin_bar_init', array($this, 'addEspressoToolbar'));
    }



    /**
     * @return void
     * @throws EE_Error
     */
    public function addEspressoToolbar()
    {
        $this->registry->create(
            'EventEspresso\core\domain\services\admin\AdminToolBar',
            array($this->registry->CAP)
        );
    }



    /**
     * do_not_cache
     * sets no cache headers and defines no cache constants for WP plugins
     *
     * @access public
     * @return void
     */
    public static function do_not_cache()
    {
        // set no cache constants
        if (! defined('DONOTCACHEPAGE')) {
            define('DONOTCACHEPAGE', true);
        }
        if (! defined('DONOTCACHCEOBJECT')) {
            define('DONOTCACHCEOBJECT', true);
        }
        if (! defined('DONOTCACHEDB')) {
            define('DONOTCACHEDB', true);
        }
        // add no cache headers
        add_action('send_headers', array('EE_System', 'nocache_headers'), 10);
        // plus a little extra for nginx and Google Chrome
        add_filter('nocache_headers', array('EE_System', 'extra_nocache_headers'), 10, 1);
        // prevent browsers from prefetching of the rel='next' link, because it may contain content that interferes with the registration process
        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
    }



    /**
     *    extra_nocache_headers
     *
     * @access    public
     * @param $headers
     * @return    array
     */
    public static function extra_nocache_headers($headers)
    {
        // for NGINX
        $headers['X-Accel-Expires'] = 0;
        // plus extra for Google Chrome since it doesn't seem to respect "no-cache", but WILL respect "no-store"
        $headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0';
        return $headers;
    }



    /**
     *    nocache_headers
     *
     * @access    public
     * @return    void
     */
    public static function nocache_headers()
    {
        nocache_headers();
    }




    /**
     * simply hooks into "wp_list_pages_exclude" filter (for wp_list_pages method) and makes sure EE critical pages are
     * never returned with the function.
     *
     * @param  array $exclude_array any existing pages being excluded are in this array.
     * @return array
     */
    public function remove_pages_from_wp_list_pages($exclude_array)
    {
        return array_merge($exclude_array, $this->registry->CFG->core->get_critical_pages_array());
    }



    /******************************** DEPRECATED ***************************************/



    /**
     * @deprecated 4.9.40
     * @return void
     */
    public function detect_if_activation_or_upgrade()
    {
    }



    /**
     * @deprecated 4.9.40
     * @return void
     */
    public function update_list_of_installed_versions($version_history = null, $current_version_to_add = null)
    {
    }



    /**
     * @deprecated 4.9.40
     * @param null $espresso_db_update
     * @return int one of the constants on EE_System::req_type_
     */
    public function detect_req_type($espresso_db_update = null)
    {
        return $this->getRequestType()->getRequestType();
    }



    /**
     * @deprecated 4.9.40
     * @return bool
     */
    public function is_major_version_change()
    {
        return $this->getRequestType()->isMajorVersionChange();
    }



    /**
     * @deprecated 4.9.40
     * @param array  $activation_history_for_addon
     * @param string $activation_indicator_option_name
     * @param string $version_to_upgrade_to
     * @return int one of the constants on EE_System::req_type_*
     */
    public static function detect_req_type_given_activation_history(
        $activation_history_for_addon,
        $activation_indicator_option_name,
        $version_to_upgrade_to
    ) {
        return EE_System::instance()->getRequestType()->getRequestType();
    }



    /**
     * @deprecated 4.9.40
     * @param boolean $initialize_addons_too
     * @param boolean $verify_schema
     * @return void
     * @throws EE_Error
     */
    public function initialize_db_if_no_migrations_required($initialize_addons_too = false, $verify_schema = true)
    {
    }



    /**
     * @deprecated 4.9.40
     * @throws EE_Error
     */
    public function initialize_addons()
    {
    }



    /**
     * @deprecated 4.9.40
     * @return void
     */
    public function redirect_to_about_ee()
    {
    }


}
// End of file EE_System.core.php
// Location: /core/EE_System.core.php
