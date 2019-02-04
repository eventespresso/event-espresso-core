<?php

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_System
 * The backbone of the core application that the rest of the system builds off of once bootstrapping is complete
 *
 * @package        Event Espresso
 * @subpackage     core/
 * @author         Brent Christensen, Michael Nelson
 */
final class EE_System implements ResettableInterface
{

    /**
     * indicates this is a 'normal' request. Ie, not activation, nor upgrade, nor activation.
     * So examples of this would be a normal GET request on the frontend or backend, or a POST, etc
     */
    const req_type_normal = 0;

    /**
     * Indicates this is a brand new installation of EE so we should install
     * tables and default data etc
     */
    const req_type_new_activation = 1;

    /**
     * we've detected that EE has been reactivated (or EE was activated during maintenance mode,
     * and we just exited maintenance mode). We MUST check the database is setup properly
     * and that default data is setup too
     */
    const req_type_reactivation = 2;

    /**
     * indicates that EE has been upgraded since its previous request.
     * We may have data migration scripts to call and will want to trigger maintenance mode
     */
    const req_type_upgrade = 3;

    /**
     * TODO  will detect that EE has been DOWNGRADED. We probably don't want to run in this case...
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
     * option prefix for recording the activation history (like core's "espresso_db_update") of addons
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
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * Stores which type of request this is, options being one of the constants on EE_System starting with req_type_*.
     * It can be a brand-new activation, a reactivation, an upgrade, a downgrade, or a normal request.
     *
     * @var int $_req_type
     */
    private $_req_type;

    /**
     * Whether or not there was a non-micro version change in EE core version during this request
     *
     * @var boolean $_major_version_change
     */
    private $_major_version_change = false;

    /**
     * A Context DTO dedicated solely to identifying the current request type.
     *
     * @var RequestTypeContextCheckerInterface $request_type
     */
    private $request_type;


    /**
     * @singleton method used to instantiate class object
     * @param EE_Registry|null         $registry
     * @param LoaderInterface|null     $loader
     * @param RequestInterface|null    $request
     * @param EE_Maintenance_Mode|null $maintenance_mode
     * @return EE_System
     */
    public static function instance(
        EE_Registry $registry = null,
        LoaderInterface $loader = null,
        RequestInterface $request = null,
        EE_Maintenance_Mode $maintenance_mode = null
    ) {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_System) {
            self::$_instance = new self($registry, $loader, $request, $maintenance_mode);
        }
        return self::$_instance;
    }


    /**
     * resets the instance and returns it
     *
     * @return EE_System
     */
    public static function reset()
    {
        self::$_instance->_req_type = null;
        // make sure none of the old hooks are left hanging around
        remove_all_actions('AHEE__EE_System__perform_activations_upgrades_and_migrations');
        // we need to reset the migration manager in order for it to detect DMSs properly
        EE_Data_Migration_Manager::reset();
        self::instance()->detect_activations_or_upgrades();
        self::instance()->perform_activations_upgrades_and_migrations();
        return self::instance();
    }


    /**
     * sets hooks for running rest of system
     * provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
     * starting EE Addons from any other point may lead to problems
     *
     * @param EE_Registry         $registry
     * @param LoaderInterface     $loader
     * @param RequestInterface    $request
     * @param EE_Maintenance_Mode $maintenance_mode
     */
    private function __construct(
        EE_Registry $registry,
        LoaderInterface $loader,
        RequestInterface $request,
        EE_Maintenance_Mode $maintenance_mode
    ) {
        $this->registry = $registry;
        $this->loader = $loader;
        $this->request = $request;
        $this->maintenance_mode = $maintenance_mode;
        do_action('AHEE__EE_System__construct__begin', $this);
        add_action(
            'AHEE__EE_Bootstrap__load_espresso_addons',
            array($this, 'loadCapabilities'),
            5
        );
        add_action(
            'AHEE__EE_Bootstrap__load_espresso_addons',
            array($this, 'loadCommandBus'),
            7
        );
        add_action(
            'AHEE__EE_Bootstrap__load_espresso_addons',
            array($this, 'loadPluginApi'),
            9
        );
        // allow addons to load first so that they can register autoloaders, set hooks for running DMS's, etc
        add_action(
            'AHEE__EE_Bootstrap__load_espresso_addons',
            array($this, 'load_espresso_addons')
        );
        // when an ee addon is activated, we want to call the core hook(s) again
        // because the newly-activated addon didn't get a chance to run at all
        add_action('activate_plugin', array($this, 'load_espresso_addons'), 1);
        // detect whether install or upgrade
        add_action(
            'AHEE__EE_Bootstrap__detect_activations_or_upgrades',
            array($this, 'detect_activations_or_upgrades'),
            3
        );
        // load EE_Config, EE_Textdomain, etc
        add_action(
            'AHEE__EE_Bootstrap__load_core_configuration',
            array($this, 'load_core_configuration'),
            5
        );
        // load specifications for matching routes to current request
        add_action(
            'AHEE__EE_Bootstrap__load_core_configuration',
            array($this, 'loadRouteMatchSpecifications')
        );
        // load EE_Config, EE_Textdomain, etc
        add_action(
            'AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets',
            array($this, 'register_shortcodes_modules_and_widgets'),
            7
        );
        // you wanna get going? I wanna get going... let's get going!
        add_action(
            'AHEE__EE_Bootstrap__brew_espresso',
            array($this, 'brew_espresso'),
            9
        );
        // other housekeeping
        // exclude EE critical pages from wp_list_pages
        add_filter(
            'wp_list_pages_excludes',
            array($this, 'remove_pages_from_wp_list_pages'),
            10
        );
        // ALL EE Addons should use the following hook point to attach their initial setup too
        // it's extremely important for EE Addons to register any class autoloaders so that they can be available when the EE_Config loads
        do_action('AHEE__EE_System__construct__complete', $this);
    }


    /**
     * load and setup EE_Capabilities
     *
     * @return void
     * @throws EE_Error
     */
    public function loadCapabilities()
    {
        $this->capabilities = $this->loader->getShared('EE_Capabilities');
        add_action(
            'AHEE__EE_Capabilities__init_caps__before_initialization',
            function () {
                LoaderFactory::getLoader()->getShared('EE_Payment_Method_Manager');
            }
        );
    }


    /**
     * create and cache the CommandBus, and also add middleware
     * The CapChecker middleware requires the use of EE_Capabilities
     * which is why we need to load the CommandBus after Caps are set up
     *
     * @return void
     * @throws EE_Error
     */
    public function loadCommandBus()
    {
        $this->loader->getShared(
            'CommandBusInterface',
            array(
                null,
                apply_filters(
                    'FHEE__EE_Load_Espresso_Core__handle_request__CommandBus_middleware',
                    array(
                        $this->loader->getShared('EventEspresso\core\services\commands\middleware\CapChecker'),
                        $this->loader->getShared('EventEspresso\core\services\commands\middleware\AddActionHook'),
                    )
                ),
            )
        );
    }


    /**
     * @return void
     * @throws EE_Error
     */
    public function loadPluginApi()
    {
        // set autoloaders for all of the classes implementing EEI_Plugin_API
        // which provide helpers for EE plugin authors to more easily register certain components with EE.
        EEH_Autoloader::instance()->register_autoloaders_for_each_file_in_folder(EE_LIBRARIES . 'plugin_api');
        $this->loader->getShared('EE_Request_Handler');
    }


    /**
     * @param string $addon_name
     * @param string $version_constant
     * @param string $min_version_required
     * @param string $load_callback
     * @param string $plugin_file_constant
     * @return void
     */
    private function deactivateIncompatibleAddon(
        $addon_name,
        $version_constant,
        $min_version_required,
        $load_callback,
        $plugin_file_constant
    ) {
        if (! defined($version_constant)) {
            return;
        }
        $addon_version = constant($version_constant);
        if ($addon_version && version_compare($addon_version, $min_version_required, '<')) {
            remove_action('AHEE__EE_System__load_espresso_addons', $load_callback);
            if (! function_exists('deactivate_plugins')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
            deactivate_plugins(plugin_basename(constant($plugin_file_constant)));
            unset($_GET['activate'], $_REQUEST['activate'], $_GET['activate-multi'], $_REQUEST['activate-multi']);
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'We\'re sorry, but the Event Espresso %1$s addon was deactivated because version %2$s or higher is required with this version of Event Espresso core.',
                        'event_espresso'
                    ),
                    $addon_name,
                    $min_version_required
                ),
                __FILE__,
                __FUNCTION__ . "({$addon_name})",
                __LINE__
            );
            EE_Error::get_notices(false, true);
        }
    }


    /**
     * load_espresso_addons
     * allow addons to load first so that they can set hooks for running DMS's, etc
     * this is hooked into both:
     *    'AHEE__EE_Bootstrap__load_core_configuration'
     *        which runs during the WP 'plugins_loaded' action at priority 5
     *    and the WP 'activate_plugin' hook point
     *
     * @access public
     * @return void
     */
    public function load_espresso_addons()
    {
        $this->deactivateIncompatibleAddon(
            'Wait Lists',
            'EE_WAIT_LISTS_VERSION',
            '1.0.0.beta.074',
            'load_espresso_wait_lists',
            'EE_WAIT_LISTS_PLUGIN_FILE'
        );
        $this->deactivateIncompatibleAddon(
            'Automated Upcoming Event Notifications',
            'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_VERSION',
            '1.0.0.beta.091',
            'load_espresso_automated_upcoming_event_notification',
            'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_PLUGIN_FILE'
        );
        do_action('AHEE__EE_System__load_espresso_addons');
        // if the WP API basic auth plugin isn't already loaded, load it now.
        // We want it for mobile apps. Just include the entire plugin
        // also, don't load the basic auth when a plugin is getting activated, because
        // it could be the basic auth plugin, and it doesn't check if its methods are already defined
        // and causes a fatal error
        if ($this->request->getRequestParam('activate') !== 'true'
            && ! function_exists('json_basic_auth_handler')
            && ! function_exists('json_basic_auth_error')
            && ! in_array(
                $this->request->getRequestParam('action'),
                array('activate', 'activate-selected'),
                true
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
     * @access public
     * @return void
     */
    public function detect_activations_or_upgrades()
    {
        // first off: let's make sure to handle core
        $this->detect_if_activation_or_upgrade();
        foreach ($this->registry->addons as $addon) {
            if ($addon instanceof EE_Addon) {
                // detect teh request type for that addon
                $addon->detect_activation_or_upgrade();
            }
        }
    }


    /**
     * detect_if_activation_or_upgrade
     * Takes care of detecting whether this is a brand new install or code upgrade,
     * and either setting up the DB or setting up maintenance mode etc.
     *
     * @access public
     * @return void
     */
    public function detect_if_activation_or_upgrade()
    {
        do_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin');
        // check if db has been updated, or if its a brand-new installation
        $espresso_db_update = $this->fix_espresso_db_upgrade_option();
        $request_type = $this->detect_req_type($espresso_db_update);
        // EEH_Debug_Tools::printr( $request_type, '$request_type', __FILE__, __LINE__ );
        switch ($request_type) {
            case EE_System::req_type_new_activation:
                do_action('AHEE__EE_System__detect_if_activation_or_upgrade__new_activation');
                $this->_handle_core_version_change($espresso_db_update);
                break;
            case EE_System::req_type_reactivation:
                do_action('AHEE__EE_System__detect_if_activation_or_upgrade__reactivation');
                $this->_handle_core_version_change($espresso_db_update);
                break;
            case EE_System::req_type_upgrade:
                do_action('AHEE__EE_System__detect_if_activation_or_upgrade__upgrade');
                // migrations may be required now that we've upgraded
                $this->maintenance_mode->set_maintenance_mode_if_db_old();
                $this->_handle_core_version_change($espresso_db_update);
                break;
            case EE_System::req_type_downgrade:
                do_action('AHEE__EE_System__detect_if_activation_or_upgrade__downgrade');
                // its possible migrations are no longer required
                $this->maintenance_mode->set_maintenance_mode_if_db_old();
                $this->_handle_core_version_change($espresso_db_update);
                break;
            case EE_System::req_type_normal:
            default:
                break;
        }
        do_action('AHEE__EE_System__detect_if_activation_or_upgrade__complete');
    }


    /**
     * Updates the list of installed versions and sets hooks for
     * initializing the database later during the request
     *
     * @param array $espresso_db_update
     */
    private function _handle_core_version_change($espresso_db_update)
    {
        $this->update_list_of_installed_versions($espresso_db_update);
        // get ready to verify the DB is ok (provided we aren't in maintenance mode, of course)
        add_action(
            'AHEE__EE_System__perform_activations_upgrades_and_migrations',
            array($this, 'initialize_db_if_no_migrations_required')
        );
    }


    /**
     * standardizes the wp option 'espresso_db_upgrade' which actually stores
     * information about what versions of EE have been installed and activated,
     * NOT necessarily the state of the database
     *
     * @param mixed $espresso_db_update           the value of the WordPress option.
     *                                            If not supplied, fetches it from the options table
     * @return array the correct value of 'espresso_db_upgrade', after saving it, if it needed correction
     */
    private function fix_espresso_db_upgrade_option($espresso_db_update = null)
    {
        do_action('FHEE__EE_System__manage_fix_espresso_db_upgrade_option__begin', $espresso_db_update);
        if (! $espresso_db_update) {
            $espresso_db_update = get_option('espresso_db_update');
        }
        // check that option is an array
        if (! is_array($espresso_db_update)) {
            // if option is FALSE, then it never existed
            if ($espresso_db_update === false) {
                // make $espresso_db_update an array and save option with autoload OFF
                $espresso_db_update = array();
                add_option('espresso_db_update', $espresso_db_update, '', 'no');
            } else {
                // option is NOT FALSE but also is NOT an array, so make it an array and save it
                $espresso_db_update = array($espresso_db_update => array());
                update_option('espresso_db_update', $espresso_db_update);
            }
        } else {
            $corrected_db_update = array();
            // if IS an array, but is it an array where KEYS are version numbers, and values are arrays?
            foreach ($espresso_db_update as $should_be_version_string => $should_be_array) {
                if (is_int($should_be_version_string) && ! is_array($should_be_array)) {
                    // the key is an int, and the value IS NOT an array
                    // so it must be numerically-indexed, where values are versions installed...
                    // fix it!
                    $version_string = $should_be_array;
                    $corrected_db_update[ $version_string ] = array('unknown-date');
                } else {
                    // ok it checks out
                    $corrected_db_update[ $should_be_version_string ] = $should_be_array;
                }
            }
            $espresso_db_update = $corrected_db_update;
            update_option('espresso_db_update', $espresso_db_update);
        }
        do_action('FHEE__EE_System__manage_fix_espresso_db_upgrade_option__complete', $espresso_db_update);
        return $espresso_db_update;
    }


    /**
     * Does the traditional work of setting up the plugin's database and adding default data.
     * If migration script/process did not exist, this is what would happen on every activation/reactivation/upgrade.
     * NOTE: if we're in maintenance mode (which would be the case if we detect there are data
     * migration scripts that need to be run and a version change happens), enqueues core for database initialization,
     * so that it will be done when migrations are finished
     *
     * @param boolean $initialize_addons_too if true, we double-check addons' database tables etc too;
     * @param boolean $verify_schema         if true will re-check the database tables have the correct schema.
     *                                       This is a resource-intensive job
     *                                       so we prefer to only do it when necessary
     * @return void
     * @throws EE_Error
     */
    public function initialize_db_if_no_migrations_required($initialize_addons_too = false, $verify_schema = true)
    {
        $request_type = $this->detect_req_type();
        // only initialize system if we're not in maintenance mode.
        if ($this->maintenance_mode->level() !== EE_Maintenance_Mode::level_2_complete_maintenance) {
            /** @var EventEspresso\core\domain\services\custom_post_types\RewriteRules $rewrite_rules */
            $rewrite_rules = $this->loader->getShared(
                'EventEspresso\core\domain\services\custom_post_types\RewriteRules'
            );
            $rewrite_rules->flush();
            if ($verify_schema) {
                EEH_Activation::initialize_db_and_folders();
            }
            EEH_Activation::initialize_db_content();
            EEH_Activation::system_initialization();
            if ($initialize_addons_too) {
                $this->initialize_addons();
            }
        } else {
            EE_Data_Migration_Manager::instance()->enqueue_db_initialization_for('Core');
        }
        if ($request_type === EE_System::req_type_new_activation
            || $request_type === EE_System::req_type_reactivation
            || (
                $request_type === EE_System::req_type_upgrade
                && $this->is_major_version_change()
            )
        ) {
            add_action('AHEE__EE_System__initialize_last', array($this, 'redirect_to_about_ee'), 9);
        }
    }


    /**
     * Initializes the db for all registered addons
     *
     * @throws EE_Error
     */
    public function initialize_addons()
    {
        // foreach registered addon, make sure its db is up-to-date too
        foreach ($this->registry->addons as $addon) {
            if ($addon instanceof EE_Addon) {
                $addon->initialize_db_if_no_migrations_required();
            }
        }
    }


    /**
     * Adds the current code version to the saved wp option which stores a list of all ee versions ever installed.
     *
     * @param    array  $version_history
     * @param    string $current_version_to_add version to be added to the version history
     * @return    boolean success as to whether or not this option was changed
     */
    public function update_list_of_installed_versions($version_history = null, $current_version_to_add = null)
    {
        if (! $version_history) {
            $version_history = $this->fix_espresso_db_upgrade_option($version_history);
        }
        if ($current_version_to_add === null) {
            $current_version_to_add = espresso_version();
        }
        $version_history[ $current_version_to_add ][] = date('Y-m-d H:i:s', time());
        // re-save
        return update_option('espresso_db_update', $version_history);
    }


    /**
     * Detects if the current version indicated in the has existed in the list of
     * previously-installed versions of EE (espresso_db_update). Does NOT modify it (ie, no side-effect)
     *
     * @param array $espresso_db_update array from the wp option stored under the name 'espresso_db_update'.
     *                                  If not supplied, fetches it from the options table.
     *                                  Also, caches its result so later parts of the code can also know whether
     *                                  there's been an update or not. This way we can add the current version to
     *                                  espresso_db_update, but still know if this is a new install or not
     * @return int one of the constants on EE_System::req_type_
     */
    public function detect_req_type($espresso_db_update = null)
    {
        if ($this->_req_type === null) {
            $espresso_db_update = ! empty($espresso_db_update)
                ? $espresso_db_update
                : $this->fix_espresso_db_upgrade_option();
            $this->_req_type = EE_System::detect_req_type_given_activation_history(
                $espresso_db_update,
                'ee_espresso_activation',
                espresso_version()
            );
            $this->_major_version_change = $this->_detect_major_version_change($espresso_db_update);
            $this->request->setIsActivation($this->_req_type !== EE_System::req_type_normal);
        }
        return $this->_req_type;
    }


    /**
     * Returns whether or not there was a non-micro version change (ie, change in either
     * the first or second number in the version. Eg 4.9.0.rc.001 to 4.10.0.rc.000,
     * but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     *
     * @param $activation_history
     * @return bool
     */
    private function _detect_major_version_change($activation_history)
    {
        $previous_version = EE_System::_get_most_recently_active_version_from_activation_history($activation_history);
        $previous_version_parts = explode('.', $previous_version);
        $current_version_parts = explode('.', espresso_version());
        return isset($previous_version_parts[0], $previous_version_parts[1], $current_version_parts[0], $current_version_parts[1])
               && ($previous_version_parts[0] !== $current_version_parts[0]
                   || $previous_version_parts[1] !== $current_version_parts[1]
               );
    }


    /**
     * Returns true if either the major or minor version of EE changed during this request.
     * Eg 4.9.0.rc.001 to 4.10.0.rc.000, but not 4.9.0.rc.0001 to 4.9.1.rc.0001
     *
     * @return bool
     */
    public function is_major_version_change()
    {
        return $this->_major_version_change;
    }


    /**
     * Determines the request type for any ee addon, given three piece of info: the current array of activation
     * histories (for core that' 'espresso_db_update' wp option); the name of the WordPress option which is temporarily
     * set upon activation of the plugin (for core it's 'ee_espresso_activation'); and the version that this plugin was
     * just activated to (for core that will always be espresso_version())
     *
     * @param array  $activation_history_for_addon     the option's value which stores the activation history for this
     *                                                 ee plugin. for core that's 'espresso_db_update'
     * @param string $activation_indicator_option_name the name of the WordPress option that is temporarily set to
     *                                                 indicate that this plugin was just activated
     * @param string $version_to_upgrade_to            the version that was just upgraded to (for core that will be
     *                                                 espresso_version())
     * @return int one of the constants on EE_System::req_type_*
     */
    public static function detect_req_type_given_activation_history(
        $activation_history_for_addon,
        $activation_indicator_option_name,
        $version_to_upgrade_to
    ) {
        $version_is_higher = self::_new_version_is_higher($activation_history_for_addon, $version_to_upgrade_to);
        if ($activation_history_for_addon) {
            // it exists, so this isn't a completely new install
            // check if this version already in that list of previously installed versions
            if (! isset($activation_history_for_addon[ $version_to_upgrade_to ])) {
                // it a version we haven't seen before
                if ($version_is_higher === 1) {
                    $req_type = EE_System::req_type_upgrade;
                } else {
                    $req_type = EE_System::req_type_downgrade;
                }
                delete_option($activation_indicator_option_name);
            } else {
                // its not an update. maybe a reactivation?
                if (get_option($activation_indicator_option_name, false)) {
                    if ($version_is_higher === -1) {
                        $req_type = EE_System::req_type_downgrade;
                    } elseif ($version_is_higher === 0) {
                        // we've seen this version before, but it's an activation. must be a reactivation
                        $req_type = EE_System::req_type_reactivation;
                    } else {// $version_is_higher === 1
                        $req_type = EE_System::req_type_upgrade;
                    }
                    delete_option($activation_indicator_option_name);
                } else {
                    // we've seen this version before and the activation indicate doesn't show it was just activated
                    if ($version_is_higher === -1) {
                        $req_type = EE_System::req_type_downgrade;
                    } elseif ($version_is_higher === 0) {
                        // we've seen this version before and it's not an activation. its normal request
                        $req_type = EE_System::req_type_normal;
                    } else {// $version_is_higher === 1
                        $req_type = EE_System::req_type_upgrade;
                    }
                }
            }
        } else {
            // brand new install
            $req_type = EE_System::req_type_new_activation;
            delete_option($activation_indicator_option_name);
        }
        return $req_type;
    }


    /**
     * Detects if the $version_to_upgrade_to is higher than the most recent version in
     * the $activation_history_for_addon
     *
     * @param array  $activation_history_for_addon (keys are versions, values are arrays of times activated,
     *                                             sometimes containing 'unknown-date'
     * @param string $version_to_upgrade_to        (current version)
     * @return int results of version_compare( $version_to_upgrade_to, $most_recently_active_version ).
     *                                             ie, -1 if $version_to_upgrade_to is LOWER (downgrade);
     *                                             0 if $version_to_upgrade_to MATCHES (reactivation or normal request);
     *                                             1 if $version_to_upgrade_to is HIGHER (upgrade) ;
     */
    private static function _new_version_is_higher($activation_history_for_addon, $version_to_upgrade_to)
    {
        // find the most recently-activated version
        $most_recently_active_version =
            EE_System::_get_most_recently_active_version_from_activation_history($activation_history_for_addon);
        return version_compare($version_to_upgrade_to, $most_recently_active_version);
    }


    /**
     * Gets the most recently active version listed in the activation history,
     * and if none are found (ie, it's a brand new install) returns '0.0.0.dev.000'.
     *
     * @param array $activation_history  (keys are versions, values are arrays of times activated,
     *                                   sometimes containing 'unknown-date'
     * @return string
     */
    private static function _get_most_recently_active_version_from_activation_history($activation_history)
    {
        $most_recently_active_version_activation = '1970-01-01 00:00:00';
        $most_recently_active_version = '0.0.0.dev.000';
        if (is_array($activation_history)) {
            foreach ($activation_history as $version => $times_activated) {
                // check there is a record of when this version was activated. Otherwise,
                // mark it as unknown
                if (! $times_activated) {
                    $times_activated = array('unknown-date');
                }
                if (is_string($times_activated)) {
                    $times_activated = array($times_activated);
                }
                foreach ($times_activated as $an_activation) {
                    if ($an_activation !== 'unknown-date'
                        && $an_activation
                           > $most_recently_active_version_activation) {
                        $most_recently_active_version = $version;
                        $most_recently_active_version_activation = $an_activation === 'unknown-date'
                            ? '1970-01-01 00:00:00'
                            : $an_activation;
                    }
                }
            }
        }
        return $most_recently_active_version;
    }


    /**
     * This redirects to the about EE page after activation
     *
     * @return void
     */
    public function redirect_to_about_ee()
    {
        $notices = EE_Error::get_notices(false);
        // if current user is an admin and it's not an ajax or rest request
        if (! isset($notices['errors'])
            && $this->request->isAdmin()
            && apply_filters(
                'FHEE__EE_System__redirect_to_about_ee__do_redirect',
                $this->capabilities->current_user_can('manage_options', 'espresso_about_default')
            )
        ) {
            $query_params = array('page' => 'espresso_about');
            if (EE_System::instance()->detect_req_type() === EE_System::req_type_new_activation) {
                $query_params['new_activation'] = true;
            }
            if (EE_System::instance()->detect_req_type() === EE_System::req_type_reactivation) {
                $query_params['reactivation'] = true;
            }
            $url = add_query_arg($query_params, admin_url('admin.php'));
            wp_safe_redirect($url);
            exit();
        }
    }


    /**
     * load_core_configuration
     * this is hooked into 'AHEE__EE_Bootstrap__load_core_configuration'
     * which runs during the WP 'plugins_loaded' action at priority 5
     *
     * @return void
     * @throws ReflectionException
     * @throws Exception
     */
    public function load_core_configuration()
    {
        do_action('AHEE__EE_System__load_core_configuration__begin', $this);
        $this->loader->getShared('EE_Load_Textdomain');
        // load textdomain
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
        // load caf stuff a chance to play during the activation process too.
        $this->_maybe_brew_regular();
        // configure custom post type definitions
        $this->loader->getShared('EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions');
        $this->loader->getShared('EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions');
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
        // get all the files in the EE_MODELS folder that end in .model.php
        $models = glob(EE_MODELS . '*.model.php');
        $model_names = array();
        $non_abstract_db_models = array();
        foreach ($models as $model) {
            // get model classname
            $classname = EEH_File::get_classname_from_filepath_with_standard_filename($model);
            $short_name = str_replace('EEM_', '', $classname);
            $reflectionClass = new ReflectionClass($classname);
            if ($reflectionClass->isSubclassOf('EEM_Base') && ! $reflectionClass->isAbstract()) {
                $non_abstract_db_models[ $short_name ] = $classname;
            }
            $model_names[ $short_name ] = $classname;
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
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidClassException
     * @throws InvalidFilePathException
     */
    private function _maybe_brew_regular()
    {
        /** @var Domain $domain */
        $domain = DomainFactory::getShared(
            new FullyQualifiedName(
                'EventEspresso\core\domain\Domain'
            ),
            array(
                new FilePath(EVENT_ESPRESSO_MAIN_FILE),
                Version::fromString(espresso_version()),
            )
        );
        if ($domain->isCaffeinated()) {
            require_once EE_CAFF_PATH . 'brewing_regular.php';
        }
    }


    /**
     * @since 4.9.71.p
     * @throws Exception
     */
    public function loadRouteMatchSpecifications()
    {
        try {
            $this->loader->getShared(
                'EventEspresso\core\services\route_match\RouteMatchSpecificationManager'
            );
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
        do_action('AHEE__EE_System__loadRouteMatchSpecifications');
    }


    /**
     * register_shortcodes_modules_and_widgets
     * generate lists of shortcodes and modules, then verify paths and classes
     * This is hooked into 'AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets'
     * which runs during the WP 'plugins_loaded' action at priority 7
     *
     * @access public
     * @return void
     * @throws Exception
     */
    public function register_shortcodes_modules_and_widgets()
    {
        if ($this->request->isFrontend() || $this->request->isIframe() || $this->request->isAjax()) {
            try {
                // load, register, and add shortcodes the new way
                $this->loader->getShared(
                    'EventEspresso\core\services\shortcodes\ShortcodesManager',
                    array(
                        // and the old way, but we'll put it under control of the new system
                        EE_Config::getLegacyShortcodesManager(),
                    )
                );
            } catch (Exception $exception) {
                new ExceptionStackTraceDisplay($exception);
            }
        }
        do_action('AHEE__EE_System__register_shortcodes_modules_and_widgets');
        // check for addons using old hook point
        if (has_action('AHEE__EE_System__register_shortcodes_modules_and_addons')) {
            $this->_incompatible_addon_error();
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
                $msg .= '<li><b>Event Espresso - '
                        . str_replace(
                            array('EE_', 'EEM_', 'EED_', 'EES_', 'EEW_'),
                            '',
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
        do_action('AHEE__EE_System__brew_espresso__begin', $this);
        // load some final core systems
        add_action('init', array($this, 'set_hooks_for_core'), 1);
        add_action('init', array($this, 'perform_activations_upgrades_and_migrations'), 3);
        add_action('init', array($this, 'load_CPTs_and_session'), 5);
        add_action('init', array($this, 'load_controllers'), 7);
        add_action('init', array($this, 'core_loaded_and_ready'), 9);
        add_action('init', array($this, 'initialize'), 10);
        add_action('init', array($this, 'initialize_last'), 100);
        if (is_admin() && apply_filters('FHEE__EE_System__brew_espresso__load_pue', true)) {
            // pew pew pew
            $this->loader->getShared('EventEspresso\core\services\licensing\LicenseService');
            do_action('AHEE__EE_System__brew_espresso__after_pue_init');
        }
        do_action('AHEE__EE_System__brew_espresso__complete', $this);
    }


    /**
     *    set_hooks_for_core
     *
     * @access public
     * @return    void
     * @throws EE_Error
     */
    public function set_hooks_for_core()
    {
        $this->_deactivate_incompatible_addons();
        do_action('AHEE__EE_System__set_hooks_for_core');
        $this->loader->getShared('EventEspresso\core\domain\values\session\SessionLifespan');
        // caps need to be initialized on every request so that capability maps are set.
        // @see https://events.codebasehq.com/projects/event-espresso/tickets/8674
        $this->registry->CAP->init_caps();
    }


    /**
     * Using the information gathered in EE_System::_incompatible_addon_error,
     * deactivates any addons considered incompatible with the current version of EE
     */
    private function _deactivate_incompatible_addons()
    {
        $incompatible_addons = get_option('ee_incompatible_addons', array());
        if (! empty($incompatible_addons)) {
            $active_plugins = get_option('active_plugins', array());
            foreach ($active_plugins as $active_plugin) {
                foreach ($incompatible_addons as $incompatible_addon) {
                    if (strpos($active_plugin, $incompatible_addon) !== false) {
                        unset($_GET['activate']);
                        espresso_deactivate_plugin($active_plugin);
                    }
                }
            }
        }
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
     * @return void
     * @throws DomainException
     */
    public function load_CPTs_and_session()
    {
        do_action('AHEE__EE_System__load_CPTs_and_session__start');
        /** @var EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies $register_custom_taxonomies */
        $register_custom_taxonomies = $this->loader->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies'
        );
        $register_custom_taxonomies->registerCustomTaxonomies();
        /** @var EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes $register_custom_post_types */
        $register_custom_post_types = $this->loader->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes'
        );
        $register_custom_post_types->registerCustomPostTypes();
        /** @var EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomyTerms $register_custom_taxonomy_terms */
        $register_custom_taxonomy_terms = $this->loader->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomyTerms'
        );
        $register_custom_taxonomy_terms->registerCustomTaxonomyTerms();
        // load legacy Custom Post Types and Taxonomies
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
        if (! $this->maintenance_mode->level()
            && ($this->request->isFrontend() || $this->request->isFrontAjax())
        ) {
            do_action('AHEE__EE_System__load_controllers__load_front_controllers');
            $this->loader->getShared('EE_Front_Controller');
        } elseif ($this->request->isAdmin() || $this->request->isAdminAjax()) {
            do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
            $this->loader->getShared('EE_Admin');
        } elseif ($this->request->isWordPressHeartbeat()) {
            $this->loader->getShared('EventEspresso\core\domain\services\admin\ajax\WordpressHeartbeat');
        }
        do_action('AHEE__EE_System__load_controllers__complete');
    }


    /**
     * core_loaded_and_ready
     * all of the basic EE core should be loaded at this point and available regardless of M-Mode
     *
     * @access public
     * @return void
     * @throws Exception
     */
    public function core_loaded_and_ready()
    {
        if ($this->request->isAdmin()
            || $this->request->isFrontend()
            || $this->request->isIframe()
            || $this->request->isWordPressApi()
        ) {
            try {
                $this->loader->getShared('EventEspresso\core\services\assets\Registry');
                $this->loader->getShared('EventEspresso\core\domain\services\assets\CoreAssetManager');
                if ($this->canLoadBlocks()) {
                    $this->loader->getShared(
                        'EventEspresso\core\services\editor\BlockRegistrationManager'
                    );
                }
            } catch (Exception $exception) {
                new ExceptionStackTraceDisplay($exception);
            }
        }
        if ($this->request->isAdmin()
            || $this->request->isEeAjax()
            || $this->request->isFrontend()
        ) {
            $this->loader->getShared('EE_Session');
        }
        // integrate WP_Query with the EE models
        $this->loader->getShared('EE_CPT_Strategy');
        do_action('AHEE__EE_System__core_loaded_and_ready');
        // always load template tags, because it's faster than checking if it's a front-end request, and many page
        // builders require these even on the front-end
        require_once EE_PUBLIC . 'template_tags.php';
        do_action('AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons');
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
        /** @var EventEspresso\core\domain\services\custom_post_types\RewriteRules $rewrite_rules */
        $rewrite_rules = $this->loader->getShared(
            'EventEspresso\core\domain\services\custom_post_types\RewriteRules'
        );
        $rewrite_rules->flushRewriteRules();
        add_action('admin_bar_init', array($this, 'addEspressoToolbar'));
        if (($this->request->isAjax() || $this->request->isAdmin())
            && $this->maintenance_mode->models_can_query()) {
            $this->loader->getShared('EventEspresso\core\services\privacy\export\PersonalDataExporterManager');
            $this->loader->getShared('EventEspresso\core\services\privacy\erasure\PersonalDataEraserManager');
        }
    }


    /**
     * @return void
     * @throws EE_Error
     */
    public function addEspressoToolbar()
    {
        $this->loader->getShared(
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


    /**
     * Return whether blocks can be registered/loaded or not.
     * @return bool
     */
    private function canLoadBlocks()
    {
        return apply_filters('FHEE__EE_System__canLoadBlocks', true)
               && function_exists('register_block_type')
               // don't load blocks if in the Divi page builder editor context
               // @see https://github.com/eventespresso/event-espresso-core/issues/814
               && ! $this->request->getRequestParam('et_fb', false);
    }
}
