<?php

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\RequiresDependencyMapInterface;
use EventEspresso\core\domain\RequiresDomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestType;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Class EE_Addon
 * Abstract Parent class for all classes that want to function as EE Addons
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Michael Nelson, Brent Christensen
 */
abstract class EE_Addon extends EE_Configurable implements RequiresDependencyMapInterface, RequiresDomainInterface
{
    /**
     * prefix to be added onto an addon's plugin slug to make a wp option name
     * which will be used to store the plugin's activation history
     */
    const ee_addon_version_history_option_prefix = 'ee_version_history_';

    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;

    /**
     * A non-internationalized name to identify this addon. Eg 'Calendar','MailChimp',etc/
     *
     * @type string _addon_name
     */
    protected $_addon_name = '';


    /**
     * @var EE_Dependency_Map $dependency_map
     */
    private $dependency_map;


    /**
     * @var DomainInterface $domain
     */
    private $domain;

    /**
     * filepath to the main file, which can be used for register_activation_hook, register_deactivation_hook, etc.
     *
     * @type string
     */
    protected $_main_plugin_file;


    /**
     * @var $_min_core_version
     * @type string
     */
    protected $_min_core_version = '';

    /**
     * page slug to be used when generating the "Settings" link on the WP plugin page
     *
     * @type string $_plugin_action_slug
     */
    protected $_plugin_action_slug = '';

    /**
     * derived from plugin 'main_file_path using plugin_basename()
     *
     * @type string $_plugin_basename
     */
    protected $_plugin_basename = '';

    /**
     * if not empty, inserts a new table row after this plugin's row on the WP Plugins page
     * that can be used for adding upgrading/marketing info
     *
     * @type array $_plugins_page_row
     */
    protected $_plugins_page_row = [];

    /**
     * A non-internationalized name to identify this addon for use in URLs, etc
     *
     * @type string $_plugin_slug
     */
    protected $_plugin_slug = '';

    /**
     *    This is the slug used to identify this add-on within the plugin update engine.
     *
     * @type string
     */
    protected $pue_slug;

    /**
     * one of the EE_System::req_type_* constants
     *
     * @type int $_req_type
     */
    protected $_req_type;

    /**
     * @var RequestType $request_type
     */
    private $request_type;

    /**
     * @var $_version
     * @type string
     */
    protected $_version = '';


    /**
     * @param EE_Dependency_Map|null $dependency_map [optional]
     * @param DomainInterface|null   $domain         [optional]
     */
    public function __construct(?EE_Dependency_Map $dependency_map, ?DomainInterface $domain)
    {
        if ($dependency_map instanceof EE_Dependency_Map) {
            $this->setDependencyMap($dependency_map);
        }
        if ($domain instanceof DomainInterface) {
            $this->setDomain($domain);
        }
        add_action('AHEE__EE_System__load_controllers__load_admin_controllers', [$this, 'admin_init']);
    }


    /**
     * @param EE_Dependency_Map $dependency_map
     */
    public function setDependencyMap($dependency_map)
    {
        $this->dependency_map = $dependency_map;
    }


    /**
     * @return EE_Dependency_Map
     */
    public function dependencyMap(): EE_Dependency_Map
    {
        return $this->dependency_map;
    }


    /**
     * @param DomainInterface $domain
     */
    public function setDomain(DomainInterface $domain)
    {
        $this->domain = $domain;
    }


    /**
     * @return DomainInterface
     */
    public function domain(): DomainInterface
    {
        return $this->domain;
    }


    /**
     * @param mixed $version
     */
    public function set_version($version = null)
    {
        $this->_version = $version;
    }


    /**
     * get__version
     *
     * @return string
     */
    public function version(): string
    {
        return $this->_version;
    }


    /**
     * @param mixed $min_core_version
     */
    public function set_min_core_version($min_core_version = null)
    {
        $this->_min_core_version = $min_core_version;
    }


    /**
     * get__min_core_version
     *
     * @return string
     */
    public function min_core_version(): string
    {
        return $this->_min_core_version;
    }


    /**
     * Sets addon_name
     *
     * @param string $addon_name
     */
    public function set_name(string $addon_name)
    {
        $this->_addon_name = $addon_name;
    }


    /**
     * Gets addon_name
     *
     * @return string
     */
    public function name(): string
    {
        return $this->_addon_name;
    }


    /**
     * @return string
     */
    public function plugin_basename(): string
    {

        return $this->_plugin_basename;
    }


    /**
     * @param string $plugin_basename
     */
    public function set_plugin_basename(string $plugin_basename)
    {

        $this->_plugin_basename = $plugin_basename;
    }


    /**
     * @return string
     */
    public function plugin_slug(): string
    {

        return $this->_plugin_slug;
    }


    /**
     * @param string $plugin_slug
     */
    public function set_plugin_slug(string $plugin_slug)
    {

        $this->_plugin_slug = $plugin_slug;
    }


    /**
     * @return string
     */
    public function plugin_action_slug(): string
    {

        return $this->_plugin_action_slug;
    }


    /**
     * @param string $plugin_action_slug
     */
    public function set_plugin_action_slug(string $plugin_action_slug)
    {

        $this->_plugin_action_slug = $plugin_action_slug;
    }


    /**
     * @return array
     */
    public function get_plugins_page_row(): array
    {

        return $this->_plugins_page_row;
    }


    /**
     * @param array|string $plugins_page_row
     */
    public function set_plugins_page_row($plugins_page_row = [])
    {
        // sigh.... check for example content that I stupidly merged to master and remove it if found
        if (
            ! is_array($plugins_page_row)
            && strpos($plugins_page_row, '<h3>Promotions Addon Upsell Info</h3>') !== false
        ) {
            $plugins_page_row = [];
        }
        $this->_plugins_page_row = (array) $plugins_page_row;
    }


    /**
     * Called when the registered deactivation hook for this addon fires.
     */
    public function deactivation()
    {
        $classname = get_class($this);
        do_action("AHEE__{$classname}__deactivation");
        do_action('AHEE__EE_Addon__deactivation', $this);
        // check if the site no longer needs to be in maintenance mode
        EE_Register_Addon::deregister($this->name());
        EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
    }


    /**
     * Takes care of double-checking that we're not in maintenance mode, and then
     * initializing this addon's necessary initial data. This is called by default on new activations
     * and reactivations.
     *
     * @param boolean|string $verify_schema whether to verify the database's schema for this addon, or just its data.
     *                                      This is a resource-intensive job so we prefer to only do it when necessary
     * @return void
     * @throws EE_Error
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function initialize_db_if_no_migrations_required($verify_schema = true)
    {
        if ($verify_schema === '') {
            // wp core bug imo: if no args are passed to `do_action('some_hook_name')` besides the hook's name
            // (ie, no 2nd or 3rd arguments), instead of calling the registered callbacks with no arguments, it
            // calls them with an argument of an empty string (ie ""), which evaluates to false
            // so we need to treat the empty string as if nothing had been passed, and should instead use the default
            $verify_schema = true;
        }
        if (EE_Maintenance_Mode::instance()->level() !== EE_Maintenance_Mode::level_2_complete_maintenance) {
            if ($verify_schema) {
                $this->initialize_db();
            }
            $this->initialize_default_data();
            // @todo: this will probably need to be adjusted in 4.4 as the array changed formats I believe
            EE_Data_Migration_Manager::instance()->update_current_database_state_to(
                [
                    'slug'    => $this->name(),
                    'version' => $this->version(),
                ]
            );
            /* make sure core's data is a-ok
             * (at the time of writing, we especially want to verify all the caps are present
             * because payment method type capabilities are added dynamically, and it's
             * possible this addon added a payment method. But it's also possible
             * other data needs to be verified)
             */
            EEH_Activation::initialize_db_content();
            /** @var EventEspresso\core\domain\services\custom_post_types\RewriteRules $rewrite_rules */
            $rewrite_rules = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\services\custom_post_types\RewriteRules'
            );
            $rewrite_rules->flushRewriteRules();
            // in case there are lots of addons being activated at once, let's force garbage collection
            // to help avoid memory limit errors
            // EEH_Debug_Tools::instance()->measure_memory( 'db content initialized for ' . get_class( $this), true );
            gc_collect_cycles();
        } else {
            // ask the data migration manager to init this addon's data
            // when migrations are finished because we can't do it now
            EE_Data_Migration_Manager::instance()->enqueue_db_initialization_for($this->name());
        }
    }


    /**
     * Used to setup this addon's database tables, but not necessarily any default
     * data in them. The default is to actually use the most up-to-date data migration script
     * for this addon, and just use its schema_changes_before_migration() and schema_changes_after_migration()
     * methods to setup the db.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function initialize_db()
    {
        // find the migration script that sets the database to be compatible with the code
        $current_dms_name = EE_Data_Migration_Manager::instance()->get_most_up_to_date_dms($this->name());
        if ($current_dms_name) {
            $current_data_migration_script = EE_Registry::instance()->load_dms($current_dms_name);
            $current_data_migration_script->set_migrating(false);
            $current_data_migration_script->schema_changes_before_migration();
            $current_data_migration_script->schema_changes_after_migration();
            if ($current_data_migration_script->get_errors()) {
                foreach ($current_data_migration_script->get_errors() as $error) {
                    EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__);
                }
            }
        }
        // if not DMS was found that should be ok. This addon just doesn't require any database changes
        EE_Data_Migration_Manager::instance()->update_current_database_state_to(
            [
                'slug'    => $this->name(),
                'version' => $this->version(),
            ]
        );
    }


    /**
     * If you want to setup default data for the addon, override this method, and call
     * parent::initialize_default_data() from within it. This is normally called
     * from EE_Addon::initialize_db_if_no_migrations_required(), just after EE_Addon::initialize_db()
     * and should verify default data is present (but this is also called
     * on reactivations and just after migrations, so please verify you actually want
     * to ADD default data, because it may already be present).
     * However, please call this parent (currently it just fires a hook which other
     * addons may be depending on)
     */
    public function initialize_default_data()
    {
        /**
         * Called when an addon is ensuring its default data is set (possibly called
         * on a reactivation, so first check for the absence of other data before setting
         * default data)
         *
         * @param EE_Addon $addon the addon that called this
         */
        do_action('AHEE__EE_Addon__initialize_default_data__begin', $this);
        // override to insert default data. It is safe to use the models here
        // because the site should not be in maintenance mode
    }


    /**
     * Gets the name of the wp option that stores the activation history
     * of this addon
     *
     * @return string
     */
    public function get_activation_history_option_name(): string
    {
        return self::ee_addon_version_history_option_prefix . $this->name();
    }


    /**
     * Gets the wp option which stores the activation history for this addon
     *
     * @return array
     */
    public function get_activation_history(): array
    {
        $this->setup_activation_history();
        return $this->activation_history->getVersionHistory();
    }


    /**
     * @param string $config_section
     */
    public function set_config_section($config_section = '')
    {
        $this->_config_section = ! empty($config_section) ? $config_section : 'addons';
    }


    /**
     * Sets the filepath to the main plugin file
     *
     * @param string $filepath
     */
    public function set_main_plugin_file(string $filepath)
    {
        $this->_main_plugin_file = $filepath;
    }


    /**
     * gets the filepath to the main file
     *
     * @return string
     */
    public function get_main_plugin_file(): string
    {
        return $this->_main_plugin_file;
    }


    /**
     * Gets the filename (no path) of the main file
     * (the main file loaded by WP)
     *
     * @return string
     */
    public function get_main_plugin_file_basename(): string
    {
        return plugin_basename($this->get_main_plugin_file());
    }


    /**
     * Gets the folder name which contains the main plugin file
     *
     * @return string
     */
    public function get_main_plugin_file_dirname(): string
    {
        return dirname($this->get_main_plugin_file());
    }


    /**
     * sets hooks used in the admin
     *
     * @return void
     */
    public function admin_init()
    {
        // is admin and not in M-Mode ?
        if (is_admin() && ! EE_Maintenance_Mode::instance()->level()) {
            add_filter('plugin_action_links', [$this, 'plugin_action_links'], 10, 2);
            add_filter('after_plugin_row_' . $this->_plugin_basename, [$this, 'after_plugin_row'], 10, 3);
        }
    }


    /**
     * plugin_actions
     * Add a settings link to the Plugins page, so people can go straight from the plugin page to the settings page.
     *
     * @param $links
     * @param $file
     * @return array
     */
    public function plugin_action_links($links, $file): array
    {
        if ($file === $this->plugin_basename() && $this->plugin_action_slug() !== '') {
            // before other links
            array_unshift(
                $links,
                '<a href="admin.php?page=' . $this->plugin_action_slug() . '">'
                . esc_html__('Settings', 'event_espresso')
                . '</a>'
            );
        }
        return $links;
    }


    /**
     * after_plugin_row
     * Add additional content to the plugins page plugin row
     * Inserts another row
     *
     * @param $plugin_file
     * @param $plugin_data
     * @param $status
     * @return void
     */
    public function after_plugin_row($plugin_file, $plugin_data, $status)
    {
        $after_plugin_row = '';
        $plugins_page_row = $this->get_plugins_page_row();
        if (! empty($plugins_page_row) && $plugin_file === $this->plugin_basename()) {
            $class       = $status ? 'active' : 'inactive';
            $link_text   = $plugins_page_row['link_text'] ?? '';
            $link_url    = $plugins_page_row['link_url'] ?? '';
            $description = $plugins_page_row['description'] ?? '';
            if (! empty($link_text) && ! empty($link_url) && ! empty($description)) {
                $after_plugin_row .= '<tr id="' . sanitize_title($plugin_file) . '-ee-addon" class="' . $class . '">';
                $after_plugin_row .= '<th class="check-column" scope="row"></th>';
                $after_plugin_row .= '<td class="ee-addon-upsell-info-title-td plugin-title column-primary">';
                $after_plugin_row .= '<p class="ee-addon-upsell-info-dv">
	                <a class="ee-button" href="' . esc_url_raw($link_url) . '">'
                    . $link_text
                    . ' &nbsp;<span class="dashicons dashicons-arrow-right-alt2" style="margin:0;"></span>'
                    . '</a>
                </p>';
                $after_plugin_row .= '</td>';
                $after_plugin_row .= '<td class="ee-addon-upsell-info-desc-td column-description desc">';
                $after_plugin_row .= $description;
                $after_plugin_row .= '</td>';
                $after_plugin_row .= '</tr>';
            } else {
                $after_plugin_row .= $description;
            }
        }

        echo wp_kses($after_plugin_row, AllowedTags::getAllowedTags());
    }


    /**
     * A safe space for addons to add additional logic like setting hooks that need to be set early in the request.
     * Child classes that have logic like that to run can override this method declaration.  This was not made abstract
     * for back compat reasons.
     *
     * This will fire on the `AHEE__EE_System__load_espresso_addons__complete` hook at priority 999.
     *
     * It is recommended, if client code is `de-registering` an add-on, then do it on the
     * `AHEE__EE_System__load_espresso_addons__complete` hook before priority 999 so as to ensure any code logic in this
     * callback does not get run/set in that request.
     *
     * Also, keep in mind that if a registered add-on happens to be deactivated via
     * EE_System::_deactivate_incompatible_addons() because its incompatible, any code executed in this method
     * (including setting hooks etc) will have executed before the plugin was deactivated.  If you use
     * `after_registration` to set any filter and/or action hooks and want to ensure they are removed on this add-on's
     * deactivation, you can override `EE_Addon::deactivation` and unset your hooks and filters there.  Just remember
     * to call `parent::deactivation`.
     *
     * @since 4.9.26
     */
    public function after_registration()
    {
        // cricket chirp... cricket chirp...
    }


    /**
     * @return string
     */
    public function getPueSlug(): string
    {
        return $this->pue_slug;
    }


    /**
     * @param string $pue_slug
     */
    public function setPueSlug(string $pue_slug)
    {
        $this->pue_slug = $pue_slug;
    }


    /**
     * ensures the activation history property is set
     *
     * @return void
     */
    public function setup_activation_history()
    {
        if (! $this->activation_history instanceof ActivationHistory) {
            $this->setActivationHistory(
                new ActivationHistory(
                    $this->get_activation_history_option_name(),
                    $this->get_activation_indicator_option_name(),
                    $this->version()
                )
            );
        }
    }


    /**
     * Gets the ActivationHistory object for this addon
     *
     * @return ActivationHistory
     */
    public function getActivationHistory(): ActivationHistory
    {
        $this->setup_activation_history();
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
    public function getRequestType(): RequestType
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



    /******************************** DEPRECATED ***************************************/


    /**
     * @return void
     * @deprecated 4.9.40
     */
    public function new_install()
    {
    }


    /**
     * @return void
     * @deprecated 4.9.40
     */
    public function reactivation()
    {
    }


    /**
     * @return void
     * @deprecated 4.9.40
     */
    public function upgrade()
    {
    }


    /**
     * @deprecated 4.9.40
     */
    public function downgrade()
    {
    }


    /**
     * set_db_update_option_name
     * Until we do something better, we'll just check for migration scripts upon
     * plugin activation only. In the future, we'll want to do it on plugin updates too
     *
     * @return bool
     * @deprecated 4.3.0.alpha.016
     */
    public function set_db_update_option_name(): bool
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            __(
                'EE_Addon::set_db_update_option_name was renamed to EE_Addon::set_activation_indicator_option',
                'event_espresso'
            ),
            '4.3.0.alpha.016'
        );
        //let's just handle this on the next request, ok? right now we're just not really ready
        return $this->set_activation_indicator_option();
    }


    /**
     *
     * Returns the name of the activation indicator option
     * (an option which is set temporarily to indicate that this addon was just activated)
     *
     * @return string
     * @deprecated 4.3.0.alpha.016
     */
    public function get_db_update_option_name(): string
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            __(
                'EE_Addon::get_db_update_option was renamed to EE_Addon::get_activation_indicator_option_name',
                'event_espresso'
            ),
            '4.3.0.alpha.016'
        );
        return $this->get_activation_indicator_option_name();
    }


    /**
     * Gets the name of the wp option which is used to temporarily indicate that this addon was activated
     *
     * @return string
     * @deprecated 4.3.0.alpha.016
     */
    public function get_activation_indicator_option_name(): string
    {
        return 'ee_activation_' . $this->name();
    }


    /**
     * @return bool
     * @deprecated 4.9.40
     */
    public function set_activation_indicator_option(): bool
    {
        $this->setup_activation_history();
        return $this->activation_history->setActivationIndicator();
    }


    /**
     * @param int $req_type
     * @deprecated 4.9.40
     */
    public function set_req_type(int $req_type)
    {
    }


    /**
     * @deprecated 4.9.40
     */
    public function detect_req_type(): int
    {
        return $this->getRequestType()->requestType();
    }


    /**
     * @return void
     * @deprecated 4.9.40
     */
    public function detect_activation_or_upgrade()
    {
    }


    /**
     * @param array|null  $version_history
     * @param string|null $current_version
     * @return boolean success
     * @deprecated 4.9.40
     */
    public function update_list_of_installed_versions(array $version_history = null, string $current_version = null): bool
    {
        $this->setup_activation_history();
        return $this->activation_history->updateActivationHistory($version_history, $current_version);
    }


}
