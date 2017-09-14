<?php
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\activation\ActivationHistory;
use EventEspresso\core\services\activation\ActivatableInterface;
use EventEspresso\core\services\activation\RequestType;

defined('EVENT_ESPRESSO_VERSION' ) || exit( 'No direct script access allowed' );

/**
 * Class EE_Addon
 * Abstract Parent class for all classes that want to function as EE Addons
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Michael Nelson, Brent Christensen
 */
abstract class EE_Addon extends EE_Configurable implements ActivatableInterface
{


    /**
     * prefix to be added onto an addon's plugin slug to make a wp option name
     * which will be used to store the plugin's activation history
     */
    const ee_addon_version_history_option_prefix = 'ee_version_history_';

    /**
     * @var $_version
     * @type string
     */
    protected $_version = '';

    /**
     * @var $_min_core_version
     * @type string
     */
    protected $_min_core_version = '';

    /**
     * derived from plugin 'main_file_path using plugin_basename()
     *
     * @type string $_plugin_basename
     */
    protected $_plugin_basename = '';

    /**
     * A non-internationalized name to identify this addon for use in URLs, etc
     *
     * @type string $_plugin_slug
     */
    protected $_plugin_slug = '';

    /**
     * A non-internationalized name to identify this addon. Eg 'Calendar','MailChimp',etc/
     *
     * @type string _addon_name
     */
    protected $_addon_name = '';

    /**
     * one of the EE_System::req_type_* constants
     *
     * @type int $_req_type
     */
    protected $_req_type;

    /**
     * page slug to be used when generating the "Settings" link on the WP plugin page
     *
     * @type string $_plugin_action_slug
     */
    protected $_plugin_action_slug = '';

    /**
     * if not empty, inserts a new table row after this plugin's row on the WP Plugins page
     * that can be used for adding upgrading/marketing info
     *
     * @type array $_plugins_page_row
     */
    protected $_plugins_page_row = array();

    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;

    /**
     * @var RequestType $request_type
     */
    private $request_type;



    /**
     *    class constructor
     */
    public function __construct()
    {
        add_action('AHEE__EE_System__load_controllers__load_admin_controllers', array($this, 'admin_init'));
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
    public function version()
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
    public function min_core_version()
    {
        return $this->_min_core_version;
    }


    /**
     * Sets addon_name
     *
     * @param string $addon_name
     * @return boolean
     */
    public function set_name($addon_name)
    {
        return $this->_addon_name = $addon_name;
    }


    /**
     * Gets addon_name
     *
     * @return string
     */
    public function name()
    {
        return $this->_addon_name;
    }


    /**
     * @return string
     */
    public function plugin_basename()
    {

        return $this->_plugin_basename;
    }


    /**
     * @param string $plugin_basename
     */
    public function set_plugin_basename($plugin_basename)
    {

        $this->_plugin_basename = $plugin_basename;
    }


    /**
     * @return string
     */
    public function plugin_slug()
    {

        return $this->_plugin_slug;
    }


    /**
     * @param string $plugin_slug
     */
    public function set_plugin_slug($plugin_slug)
    {

        $this->_plugin_slug = $plugin_slug;
    }


    /**
     * @return string
     */
    public function plugin_action_slug()
    {

        return $this->_plugin_action_slug;
    }


    /**
     * @param string $plugin_action_slug
     */
    public function set_plugin_action_slug($plugin_action_slug)
    {

        $this->_plugin_action_slug = $plugin_action_slug;
    }


    /**
     * @return array
     */
    public function get_plugins_page_row()
    {

        return $this->_plugins_page_row;
    }


    /**
     * @param array $plugins_page_row
     */
    public function set_plugins_page_row($plugins_page_row = array())
    {
        // sigh.... check for example content that I stupidly merged to master and remove it if found
        if (! is_array($plugins_page_row)
            && strpos($plugins_page_row, '<h3>Promotions Addon Upsell Info</h3>') !== false
        ) {
            $plugins_page_row = array();
        }
        $this->_plugins_page_row = (array) $plugins_page_row;
    }


    /**
     * Called when the registered deactivation hook for this addon fires.
     * @throws EE_Error
     */
    public function deactivation()
    {
        $classname = get_class($this);
        do_action("AHEE__{$classname}__deactivation");
        do_action('AHEE__EE_Addon__deactivation', $this);
        //check if the site no longer needs to be in maintenance mode
        EE_Register_Addon::deregister($this->name());
        EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
    }



	/**
	 * Gets the name of the wp option which is used to temporarily indicate that this addon was activated
	 * @return string
	 */
	public function get_activation_indicator_option_name(){
		return 'ee_activation_' . $this->name();
	}



	/**
	 * Gets the name of the wp option that stores the activation history
	 * of this addon
	 * @return string
	 */
	public function get_activation_history_option_name(){
		return self::ee_addon_version_history_option_prefix . $this->name();
	}



	/**
	 * @param string $config_section
	 */
	public function set_config_section( $config_section = '' ) {
		$this->_config_section = ! empty( $config_section ) ? $config_section : 'addons';
	}
	/**
	 *	filepath to the main file, which can be used for register_activation_hook, register_deactivation_hook, etc.
	 * @type string
	 */
	protected $_main_plugin_file;


    /**
     * gets the filepath to the main file
     *
     * @return string
     */
    public function get_main_plugin_file()
    {
        return $this->_main_plugin_file;
    }


    /**
     * Gets the filename (no path) of the main file (the main file loaded
     * by WP)
     *
     * @return string
     */
    public function get_main_plugin_file_basename()
    {
        return plugin_basename($this->get_main_plugin_file());
    }

    /**
     * Gets the folder name which contains the main plugin file
     *
     * @return string
     */
    public function get_main_plugin_file_dirname()
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
            add_filter('plugin_action_links', array($this, 'plugin_action_links'), 10, 2);
            add_filter('after_plugin_row_' . $this->_plugin_basename, array($this, 'after_plugin_row'), 10, 3);
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
    public function plugin_action_links($links, $file)
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
            $class            = $status ? 'active' : 'inactive';
            $link_text        = isset($plugins_page_row['link_text']) ? $plugins_page_row['link_text'] : '';
            $link_url         = isset($plugins_page_row['link_url']) ? $plugins_page_row['link_url'] : '';
            $description      = isset($plugins_page_row['description'])
                ? $plugins_page_row['description']
                : '';
            if (! empty($link_text) && ! empty($link_url) && ! empty($description)) {
                $after_plugin_row .= '<tr id="' . sanitize_title($plugin_file) . '-ee-addon" class="' . $class . '">';
                $after_plugin_row .= '<th class="check-column" scope="row"></th>';
                $after_plugin_row .= '<td class="ee-addon-upsell-info-title-td plugin-title column-primary">';
                $after_plugin_row .= '<style>
.ee-button,
.ee-button:active,
.ee-button:visited {
	box-sizing: border-box;
	display: inline-block;
	position: relative;
	top: -1px;
	padding:.5em 1em;
	margin: 0;
	background: #00B1CA -webkit-linear-gradient( #4EBFDE, #00B1CA ); /* For Safari 5.1 to 6.0 */
	background: #00B1CA -o-linear-gradient( #4EBFDE, #00B1CA ); /* For Opera 11.1 to 12.0 */
	background: #00B1CA -moz-linear-gradient( #4EBFDE, #00B1CA ); /* For Firefox 3.6 to 15 */
	background: #00B1CA linear-gradient( #4EBFDE, #00B1CA ); /* Standard syntax */
	border: 1px solid rgba(0,0,0,0.1) !important;
	border-top: 1px solid rgba(255,255,255,0.5) !important;
	border-bottom: 2px solid rgba(0,0,0,0.25) !important;
	font-weight: normal;
	cursor: pointer;
	color: #fff !important;
	text-decoration: none !important;
	text-align: center;
	line-height: 1em;
/*	line-height: 1;*/
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
}
.ee-button:hover {
	color: #fff !important;
	background: #4EBFDE;
}
.ee-button:active { top:0; }
</style>';
                $after_plugin_row .= '
<p class="ee-addon-upsell-info-dv">
	<a class="ee-button" href="' . $link_url . '">'
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

        echo $after_plugin_row;
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
     * ensures the activation history property is set
     *
     * @return void
     * @throws InvalidDataTypeException
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
     * @throws InvalidDataTypeException
     */
    public function getActivationHistory()
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



    /******************************** DEPRECATED ***************************************/



    /**
     * @deprecated 4.9.44
     * @return array
     * @throws InvalidDataTypeException
     */
    public function get_activation_history()
    {
        $this->setup_activation_history();
        return $this->activation_history->getVersionHistory();
    }



    /**
     * @deprecated 4.9.44
     * @return void
     */
    public function new_install()
    {
    }



    /**
     * @deprecated 4.9.44
     * @return void
     */
    public function reactivation()
    {
    }



    /**
     * @deprecated 4.9.44
     * @return void
     */
    public function upgrade()
    {
    }



    /**
     * @deprecated 4.9.44
     */
    public function downgrade()
    {
    }



    /**
     * set_db_update_option_name
     * Until we do something better, we'll just check for migration scripts upon
     * plugin activation only. In the future, we'll want to do it on plugin updates too
     *
     * @deprecated 4.3.0.alpha.016
     * @return bool
     */
    public function set_db_update_option_name()
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__(
                'EE_Addon::set_db_update_option_name was renamed to EE_Addon::set_activation_indicator_option',
                'event_espresso'
            ), '4.3.0.alpha.016',
            '5.0.0'
        );
        //let's just handle this on the next request, ok? right now we're just not really ready
        return $this->set_activation_indicator_option();
    }



    /**
     *
     * Returns the name of the activation indicator option
     * (an option which is set temporarily to indicate that this addon was just activated)
     *
     * @deprecated 4.3.0.alpha.016
     * @return string
     */
    public function get_db_update_option_name()
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__(
                'EE_Addon::get_db_update_option was renamed to EE_Addon::get_activation_indicator_option_name',
                'event_espresso'
            ),
            '4.3.0.alpha.016',
            '5.0.0'
        );
        return $this->get_activation_indicator_option_name();
    }



    /**
     * @deprecated 4.9.44
     * @return bool
     * @throws InvalidDataTypeException
     */
    public function set_activation_indicator_option()
    {
        $this->setup_activation_history();
        return $this->activation_history->setActivationIndicator();
    }



    /**
     * @deprecated 4.9.44
     * @param int $req_type
     */
    public function set_req_type($req_type)
    {
    }



    /**
     * @deprecated 4.9.44
     */
    public function detect_req_type()
    {
        return $this->getRequestType()->getRequestType();
    }



    /**
     * @deprecated 4.9.44
     * @return void
     */
    public function detect_activation_or_upgrade()
    {
    }



    /**
     * @deprecated 4.9.44
     * @param array  $version_history
     * @param string $current_version
     * @return boolean success
     * @throws InvalidDataTypeException
     */
    public function update_list_of_installed_versions($version_history = null, $current_version = null)
    {
        $this->setup_activation_history();
        return $this->activation_history->updateActivationHistory(
            $version_history,
            $current_version
        );
    }



    /**
     * @deprecated 4.9.44
     * @param boolean $verify_schema
     * @return void
     * @throws EE_Error
     */
    public function initialize_db_if_no_migrations_required($verify_schema = true)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
                esc_html__('The logic in "%1$s" was moved to "%2$s"', 'event_espresso'),
                __METHOD__ . '()',
                'EventEspresso\core\services\activation\InitializeAddon::initialize'
            ),
            '4.9.44',
            '5.0.0'
        );
    }



    /**
     * @deprecated 4.9.44
     */
    public function initialize_db()
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
                esc_html__('The logic in "%1$s" was moved to "%2$s"', 'event_espresso'),
                __METHOD__ . '()',
                'EventEspresso\core\services\activation\InitializeAddon::initializeDatabase'
            ),
            '4.9.44',
            '5.0.0'
        );
    }



    /**
     * @deprecated 4.9.44
     */
    public function initialize_default_data()
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            sprintf(
                esc_html__('The logic in "%1$s" was moved to "%2$s"', 'event_espresso'),
                __METHOD__.'()',
                'EventEspresso\core\services\activation\InitializeAddon::initializeDefaultData'
            ),
            '4.9.44',
            '5.0.0'
        );
    }


}
