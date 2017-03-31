<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EE_Config
 *
 * @package     Event Espresso
 * @subpackage  core/
 * @author      Brent Christensen
 */
final class EE_Config
{

    const OPTION_NAME        = 'ee_config';

    const LOG_NAME           = 'ee_config_log';

    const LOG_LENGTH         = 100;

    const ADDON_OPTION_NAMES = 'ee_config_option_names';


    /**
     *    instance of the EE_Config object
     *
     * @var    EE_Config $_instance
     * @access    private
     */
    private static $_instance;

    /**
     * @var boolean $_logging_enabled
     */
    private static $_logging_enabled = false;

    /**
     * An StdClass whose property names are addon slugs,
     * and values are their config classes
     *
     * @var StdClass
     */
    public $addons;

    /**
     * @var EE_Admin_Config
     */
    public $admin;

    /**
     * @var EE_Core_Config
     */
    public $core;

    /**
     * @var EE_Currency_Config
     */
    public $currency;

    /**
     * @var EE_Organization_Config
     */
    public $organization;

    /**
     * @var EE_Registration_Config
     */
    public $registration;

    /**
     * @var EE_Template_Config
     */
    public $template_settings;

    /**
     * Holds EE environment values.
     *
     * @var EE_Environment_Config
     */
    public $environment;

    /**
     * settings pertaining to Google maps
     *
     * @var EE_Map_Config
     */
    public $map_settings;

    /**
     * settings pertaining to Taxes
     *
     * @var EE_Tax_Config
     */
    public $tax_settings;


    /**
     * Settings pertaining to global messages settings.
     *
     * @var EE_Messages_Config
     */
    public $messages;

    /**
     * @deprecated
     * @var EE_Gateway_Config
     */
    public $gateway;

    /**
     * @var    array $_addon_option_names
     * @access    private
     */
    private $_addon_option_names = array();

    /**
     * @var    array $_module_route_map
     * @access    private
     */
    private static $_module_route_map = array();

    /**
     * @var    array $_module_forward_map
     * @access    private
     */
    private static $_module_forward_map = array();

    /**
     * @var    array $_module_view_map
     * @access    private
     */
    private static $_module_view_map = array();



    /**
     * @singleton method used to instantiate class object
     * @access    public
     * @return EE_Config instance
     */
    public static function instance()
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EE_Config) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    /**
     * Resets the config
     *
     * @param bool    $hard_reset    if TRUE, sets EE_CONFig back to its original settings in the database. If FALSE
     *                               (default) leaves the database alone, and merely resets the EE_Config object to
     *                               reflect its state in the database
     * @param boolean $reinstantiate if TRUE (default) call instance() and return it. Otherwise, just leave
     *                               $_instance as NULL. Useful in case you want to forget about the old instance on
     *                               EE_Config, but might not be ready to instantiate EE_Config currently (eg if the
     *                               site was put into maintenance mode)
     * @return EE_Config
     */
    public static function reset($hard_reset = false, $reinstantiate = true)
    {
        if (self::$_instance instanceof EE_Config) {
            if ($hard_reset) {
                self::$_instance->_addon_option_names = array();
                self::$_instance->_initialize_config();
                self::$_instance->update_espresso_config();
            }
            self::$_instance->update_addon_option_names();
        }
        self::$_instance = null;
        //we don't need to reset the static properties imo because those should
        //only change when a module is added or removed. Currently we don't
        //support removing a module during a request when it previously existed
        if ($reinstantiate) {
            return self::instance();
        } else {
            return null;
        }
    }



    /**
     *    class constructor
     *
     * @access    private
     */
    private function __construct()
    {
        do_action('AHEE__EE_Config__construct__begin', $this);
        EE_Config::$_logging_enabled = apply_filters('FHEE__EE_Config___construct__logging_enabled', false);
        // setup empty config classes
        $this->_initialize_config();
        // load existing EE site settings
        $this->_load_core_config();
        // confirm everything loaded correctly and set filtered defaults if not
        $this->_verify_config();
        //  register shortcodes and modules
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            array($this, 'register_shortcodes_and_modules'),
            999
        );
        //  initialize shortcodes and modules
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'initialize_shortcodes_and_modules'));
        // register widgets
        add_action('widgets_init', array($this, 'widgets_init'), 10);
        // shutdown
        add_action('shutdown', array($this, 'shutdown'), 10);
        // construct__end hook
        do_action('AHEE__EE_Config__construct__end', $this);
        // hardcoded hack
        $this->template_settings->current_espresso_theme = 'Espresso_Arabica_2014';
    }



    /**
     * @return boolean
     */
    public static function logging_enabled()
    {
        return self::$_logging_enabled;
    }



    /**
     * use to get the current theme if needed from static context
     *
     * @return string current theme set.
     */
    public static function get_current_theme()
    {
        return isset(self::$_instance->template_settings->current_espresso_theme)
            ? self::$_instance->template_settings->current_espresso_theme : 'Espresso_Arabica_2014';
    }



    /**
     *        _initialize_config
     *
     * @access private
     * @return void
     */
    private function _initialize_config()
    {
        EE_Config::trim_log();
        //set defaults
        $this->_addon_option_names = get_option(EE_Config::ADDON_OPTION_NAMES, array());
        $this->addons = new stdClass();
        // set _module_route_map
        EE_Config::$_module_route_map = array();
        // set _module_forward_map
        EE_Config::$_module_forward_map = array();
        // set _module_view_map
        EE_Config::$_module_view_map = array();
    }



    /**
     *        load core plugin configuration
     *
     * @access private
     * @return void
     */
    private function _load_core_config()
    {
        // load_core_config__start hook
        do_action('AHEE__EE_Config___load_core_config__start', $this);
        $espresso_config = $this->get_espresso_config();
        foreach ($espresso_config as $config => $settings) {
            // load_core_config__start hook
            $settings = apply_filters(
                'FHEE__EE_Config___load_core_config__config_settings',
                $settings,
                $config,
                $this
            );
            if (is_object($settings) && property_exists($this, $config)) {
                $this->{$config} = apply_filters('FHEE__EE_Config___load_core_config__' . $config, $settings);
                //call configs populate method to ensure any defaults are set for empty values.
                if (method_exists($settings, 'populate')) {
                    $this->{$config}->populate();
                }
                if (method_exists($settings, 'do_hooks')) {
                    $this->{$config}->do_hooks();
                }
            }
        }
        if (apply_filters('FHEE__EE_Config___load_core_config__update_espresso_config', false)) {
            $this->update_espresso_config();
        }
        // load_core_config__end hook
        do_action('AHEE__EE_Config___load_core_config__end', $this);
    }



    /**
     *    _verify_config
     *
     * @access    protected
     * @return    void
     */
    protected function _verify_config()
    {
        $this->core = $this->core instanceof EE_Core_Config
            ? $this->core
            : new EE_Core_Config();
        $this->core = apply_filters('FHEE__EE_Config___initialize_config__core', $this->core);
        $this->organization = $this->organization instanceof EE_Organization_Config
            ? $this->organization
            : new EE_Organization_Config();
        $this->organization = apply_filters('FHEE__EE_Config___initialize_config__organization',
            $this->organization);
        $this->currency = $this->currency instanceof EE_Currency_Config
            ? $this->currency
            : new EE_Currency_Config();
        $this->currency = apply_filters('FHEE__EE_Config___initialize_config__currency', $this->currency);
        $this->registration = $this->registration instanceof EE_Registration_Config
            ? $this->registration
            : new EE_Registration_Config();
        $this->registration = apply_filters('FHEE__EE_Config___initialize_config__registration',
            $this->registration);
        $this->admin = $this->admin instanceof EE_Admin_Config
            ? $this->admin
            : new EE_Admin_Config();
        $this->admin = apply_filters('FHEE__EE_Config___initialize_config__admin', $this->admin);
        $this->template_settings = $this->template_settings instanceof EE_Template_Config
            ? $this->template_settings
            : new EE_Template_Config();
        $this->template_settings = apply_filters(
            'FHEE__EE_Config___initialize_config__template_settings',
            $this->template_settings
        );
        $this->map_settings = $this->map_settings instanceof EE_Map_Config
            ? $this->map_settings
            : new EE_Map_Config();
        $this->map_settings = apply_filters('FHEE__EE_Config___initialize_config__map_settings',
            $this->map_settings);
        $this->environment = $this->environment instanceof EE_Environment_Config
            ? $this->environment
            : new EE_Environment_Config();
        $this->environment = apply_filters('FHEE__EE_Config___initialize_config__environment',
            $this->environment);
        $this->tax_settings = $this->tax_settings instanceof EE_Tax_Config
            ? $this->tax_settings
            : new EE_Tax_Config();
        $this->tax_settings = apply_filters('FHEE__EE_Config___initialize_config__tax_settings',
            $this->tax_settings);
        $this->messages = apply_filters('FHEE__EE_Config__initialize_config__messages', $this->messages);
        $this->messages = $this->messages instanceof EE_Messages_Config
            ? $this->messages
            : new EE_Messages_Config();
        $this->gateway = $this->gateway instanceof EE_Gateway_Config
            ? $this->gateway
            : new EE_Gateway_Config();
        $this->gateway = apply_filters('FHEE__EE_Config___initialize_config__gateway', $this->gateway);
    }


    /**
     *    get_espresso_config
     *
     * @access    public
     * @return    array of espresso config stuff
     */
    public function get_espresso_config()
    {
        // grab espresso configuration
        return apply_filters(
            'FHEE__EE_Config__get_espresso_config__CFG',
            get_option(EE_Config::OPTION_NAME, array())
        );
    }



    /**
     *    double_check_config_comparison
     *
     * @access    public
     * @param string $option
     * @param        $old_value
     * @param        $value
     */
    public function double_check_config_comparison($option = '', $old_value, $value)
    {
        // make sure we're checking the ee config
        if ($option === EE_Config::OPTION_NAME) {
            // run a loose comparison of the old value against the new value for type and properties,
            // but NOT exact instance like WP update_option does (ie: NOT type safe comparison)
            if ($value != $old_value) {
                // if they are NOT the same, then remove the hook,
                // which means the subsequent update results will be based solely on the update query results
                // the reason we do this is because, as stated above,
                // WP update_option performs an exact instance comparison (===) on any update values passed to it
                // this happens PRIOR to serialization and any subsequent update.
                // If values are found to match their previous old value,
                // then WP bails before performing any update.
                // Since we are passing the EE_Config object, it is comparing the EXACT instance of the saved version
                // it just pulled from the db, with the one being passed to it (which will not match).
                // HOWEVER, once the object is serialized and passed off to MySQL to update,
                // MySQL MAY ALSO NOT perform the update because
                // the string it sees in the db looks the same as the new one it has been passed!!!
                // This results in the query returning an "affected rows" value of ZERO,
                // which gets returned immediately by WP update_option and looks like an error.
                remove_action('update_option', array($this, 'check_config_updated'));
            }
        }
    }



    /**
     *    update_espresso_config
     *
     * @access   public
     */
    protected function _reset_espresso_addon_config()
    {
        $this->_addon_option_names = array();
        foreach ($this->addons as $addon_name => $addon_config_obj) {
            $addon_config_obj = maybe_unserialize($addon_config_obj);
            $config_class = get_class($addon_config_obj);
            if ($addon_config_obj instanceof $config_class && ! $addon_config_obj instanceof __PHP_Incomplete_Class) {
                $this->update_config('addons', $addon_name, $addon_config_obj, false);
            }
            $this->addons->{$addon_name} = null;
        }
    }



    /**
     *    update_espresso_config
     *
     * @access   public
     * @param   bool $add_success
     * @param   bool $add_error
     * @return   bool
     */
    public function update_espresso_config($add_success = false, $add_error = true)
    {
        // don't allow config updates during WP heartbeats
        if (\EE_Registry::instance()->REQ->get('action', '') === 'heartbeat') {
            return false;
        }
        // commented out the following re: https://events.codebasehq.com/projects/event-espresso/tickets/8197
        //$clone = clone( self::$_instance );
        //self::$_instance = NULL;
        do_action('AHEE__EE_Config__update_espresso_config__begin', $this);
        $this->_reset_espresso_addon_config();
        // hook into update_option because that happens AFTER the ( $value === $old_value ) conditional
        // but BEFORE the actual update occurs
        add_action('update_option', array($this, 'double_check_config_comparison'), 1, 3);
        // now update "ee_config"
        $saved = update_option(EE_Config::OPTION_NAME, $this);
        EE_Config::log(EE_Config::OPTION_NAME);
        // if not saved... check if the hook we just added still exists;
        // if it does, it means one of two things:
        // 		that update_option bailed at the ( $value === $old_value ) conditional,
        //		 or...
        // 		the db update query returned 0 rows affected
        // 		(probably because the data  value was the same from it's perspective)
        // so the existence of the hook means that a negative result from update_option is NOT an error,
        // but just means no update occurred, so don't display an error to the user.
        // BUT... if update_option returns FALSE, AND the hook is missing,
        // then it means that something truly went wrong
        $saved = ! $saved ? has_action('update_option', array($this, 'double_check_config_comparison')) : $saved;
        // remove our action since we don't want it in the system anymore
        remove_action('update_option', array($this, 'double_check_config_comparison'), 1);
        do_action('AHEE__EE_Config__update_espresso_config__end', $this, $saved);
        //self::$_instance = $clone;
        //unset( $clone );
        // if config remains the same or was updated successfully
        if ($saved) {
            if ($add_success) {
                EE_Error::add_success(
                    __('The Event Espresso Configuration Settings have been successfully updated.', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return true;
        } else {
            if ($add_error) {
                EE_Error::add_error(
                    __('The Event Espresso Configuration Settings were not updated.', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return false;
        }
    }



    /**
     *    _verify_config_params
     *
     * @access    private
     * @param    string         $section
     * @param    string         $name
     * @param    string         $config_class
     * @param    EE_Config_Base $config_obj
     * @param    array          $tests_to_run
     * @param    bool           $display_errors
     * @return    bool    TRUE on success, FALSE on fail
     */
    private function _verify_config_params(
        $section = '',
        $name = '',
        $config_class = '',
        $config_obj = null,
        $tests_to_run = array(1, 2, 3, 4, 5, 6, 7, 8),
        $display_errors = true
    ) {
        try {
            foreach ($tests_to_run as $test) {
                switch ($test) {
                    // TEST #1 : check that section was set
                    case 1 :
                        if (empty($section)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __(
                                            'No configuration section has been provided while attempting to save "%s".',
                                            'event_espresso'
                                        ),
                                        $config_class
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #2 : check that settings section exists
                    case 2 :
                        if (! isset($this->{$section})) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __('The "%s" configuration section does not exist.', 'event_espresso'),
                                        $section
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #3 : check that section is the proper format
                    case 3 :
                        if (
                        ! ($this->{$section} instanceof EE_Config_Base || $this->{$section} instanceof stdClass)
                        ) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __(
                                            'The "%s" configuration settings have not been formatted correctly.',
                                            'event_espresso'
                                        ),
                                        $section
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #4 : check that config section name has been set
                    case 4 :
                        if (empty($name)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    __(
                                        'No name has been provided for the specific configuration section.',
                                        'event_espresso'
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #5 : check that a config class name has been set
                    case 5 :
                        if (empty($config_class)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    __(
                                        'No class name has been provided for the specific configuration section.',
                                        'event_espresso'
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #6 : verify config class is accessible
                    case 6 :
                        if (! class_exists($config_class)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __(
                                            'The "%s" class does not exist. Please ensure that an autoloader has been set for it.',
                                            'event_espresso'
                                        ),
                                        $config_class
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #7 : check that config has even been set
                    case 7 :
                        if (! isset($this->{$section}->{$name})) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __('No configuration has been set for "%1$s->%2$s".', 'event_espresso'),
                                        $section,
                                        $name
                                    )
                                );
                            }
                            return false;
                        } else {
                            // and make sure it's not serialized
                            $this->{$section}->{$name} = maybe_unserialize($this->{$section}->{$name});
                        }
                        break;
                    // TEST #8 : check that config is the requested type
                    case 8 :
                        if (! $this->{$section}->{$name} instanceof $config_class) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __(
                                            'The configuration for "%1$s->%2$s" is not of the "%3$s" class.',
                                            'event_espresso'
                                        ),
                                        $section,
                                        $name,
                                        $config_class
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #9 : verify config object
                    case 9 :
                        if (! $config_obj instanceof EE_Config_Base) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        __('The "%s" class is not an instance of EE_Config_Base.', 'event_espresso'),
                                        print_r($config_obj, true)
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }
        // you have successfully run the gauntlet
        return true;
    }



    /**
     *    _generate_config_option_name
     *
     * @access        protected
     * @param        string $section
     * @param        string $name
     * @return        string
     */
    private function _generate_config_option_name($section = '', $name = '')
    {
        return 'ee_config-' . strtolower($section . '-' . str_replace(array('EE_', 'EED_'), '', $name));
    }



    /**
     *    _set_config_class
     * ensures that a config class is set, either from a passed config class or one generated from the config name
     *
     * @access    private
     * @param    string $config_class
     * @param    string $name
     * @return    string
     */
    private function _set_config_class($config_class = '', $name = '')
    {
        return ! empty($config_class)
            ? $config_class
            : str_replace(' ', '_', ucwords(str_replace('_', ' ', $name))) . '_Config';
    }



    /**
     *    set_config
     *
     * @access    protected
     * @param    string         $section
     * @param    string         $name
     * @param    string         $config_class
     * @param    EE_Config_Base $config_obj
     * @return    EE_Config_Base
     */
    public function set_config($section = '', $name = '', $config_class = '', EE_Config_Base $config_obj = null)
    {
        // ensure config class is set to something
        $config_class = $this->_set_config_class($config_class, $name);
        // run tests 1-4, 6, and 7 to verify all config params are set and valid
        if (! $this->_verify_config_params($section, $name, $config_class, null, array(1, 2, 3, 4, 5, 6))) {
            return null;
        }
        $config_option_name = $this->_generate_config_option_name($section, $name);
        // if the config option name hasn't been added yet to the list of option names we're tracking, then do so now
        if (! isset($this->_addon_option_names[$config_option_name])) {
            $this->_addon_option_names[$config_option_name] = $config_class;
            $this->update_addon_option_names();
        }
        // verify the incoming config object but suppress errors
        if (! $this->_verify_config_params($section, $name, $config_class, $config_obj, array(9), false)) {
            $config_obj = new $config_class();
        }
        if (get_option($config_option_name)) {
            EE_Config::log($config_option_name);
            update_option($config_option_name, $config_obj);
            $this->{$section}->{$name} = $config_obj;
            return $this->{$section}->{$name};
        } else {
            // create a wp-option for this config
            if (add_option($config_option_name, $config_obj, '', 'no')) {
                $this->{$section}->{$name} = maybe_unserialize($config_obj);
                return $this->{$section}->{$name};
            } else {
                EE_Error::add_error(
                    sprintf(__('The "%s" could not be saved to the database.', 'event_espresso'), $config_class),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return null;
            }
        }
    }



    /**
     *    update_config
     * Important: the config object must ALREADY be set, otherwise this will produce an error.
     *
     * @access    public
     * @param    string                $section
     * @param    string                $name
     * @param    EE_Config_Base|string $config_obj
     * @param    bool                  $throw_errors
     * @return    bool
     */
    public function update_config($section = '', $name = '', $config_obj = '', $throw_errors = true)
    {
        // don't allow config updates during WP heartbeats
        if (\EE_Registry::instance()->REQ->get('action', '') === 'heartbeat') {
            return false;
        }
        $config_obj = maybe_unserialize($config_obj);
        // get class name of the incoming object
        $config_class = get_class($config_obj);
        // run tests 1-5 and 9 to verify config
        if (! $this->_verify_config_params(
            $section,
            $name,
            $config_class,
            $config_obj,
            array(1, 2, 3, 4, 7, 9)
        )
        ) {
            return false;
        }
        $config_option_name = $this->_generate_config_option_name($section, $name);
        // check if config object has been added to db by seeing if config option name is in $this->_addon_option_names array
        if (! isset($this->_addon_option_names[$config_option_name])) {
            // save new config to db
            if ($this->set_config($section, $name, $config_class, $config_obj)) {
                return true;
            }
        } else {
            // first check if the record already exists
            $existing_config = get_option($config_option_name);
            $config_obj = serialize($config_obj);
            // just return if db record is already up to date (NOT type safe comparison)
            if ($existing_config == $config_obj) {
                $this->{$section}->{$name} = $config_obj;
                return true;
            } else if (update_option($config_option_name, $config_obj)) {
                EE_Config::log($config_option_name);
                // update wp-option for this config class
                $this->{$section}->{$name} = $config_obj;
                return true;
            } elseif ($throw_errors) {
                EE_Error::add_error(
                    sprintf(
                        __(
                            'The "%1$s" object stored at"%2$s" was not successfully updated in the database.',
                            'event_espresso'
                        ),
                        $config_class,
                        'EE_Config->' . $section . '->' . $name
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        return false;
    }



    /**
     *    get_config
     *
     * @access    public
     * @param    string $section
     * @param    string $name
     * @param    string $config_class
     * @return    mixed EE_Config_Base | NULL
     */
    public function get_config($section = '', $name = '', $config_class = '')
    {
        // ensure config class is set to something
        $config_class = $this->_set_config_class($config_class, $name);
        // run tests 1-4, 6 and 7 to verify that all params have been set
        if (! $this->_verify_config_params($section, $name, $config_class, null, array(1, 2, 3, 4, 5, 6))) {
            return null;
        }
        // now test if the requested config object exists, but suppress errors
        if ($this->_verify_config_params($section, $name, $config_class, null, array(7, 8), false)) {
            // config already exists, so pass it back
            return $this->{$section}->{$name};
        }
        // load config option from db if it exists
        $config_obj = $this->get_config_option($this->_generate_config_option_name($section, $name));
        // verify the newly retrieved config object, but suppress errors
        if ($this->_verify_config_params($section, $name, $config_class, $config_obj, array(9), false)) {
            // config is good, so set it and pass it back
            $this->{$section}->{$name} = $config_obj;
            return $this->{$section}->{$name};
        }
        // oops! $config_obj is not already set and does not exist in the db, so create a new one
        $config_obj = $this->set_config($section, $name, $config_class);
        // verify the newly created config object
        if ($this->_verify_config_params($section, $name, $config_class, $config_obj, array(9))) {
            return $this->{$section}->{$name};
        } else {
            EE_Error::add_error(
                sprintf(__('The "%s" could not be retrieved from the database.', 'event_espresso'), $config_class),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return null;
    }



    /**
     *    get_config_option
     *
     * @access    public
     * @param    string $config_option_name
     * @return    mixed EE_Config_Base | FALSE
     */
    public function get_config_option($config_option_name = '')
    {
        // retrieve the wp-option for this config class.
        $config_option = maybe_unserialize(get_option($config_option_name, array()));
        if (empty($config_option)) {
            EE_Config::log($config_option_name . '-NOT-FOUND');
        }
        return $config_option;
    }



    /**
     * log
     *
     * @param string $config_option_name
     */
    public static function log($config_option_name = '')
    {
        if (EE_Config::logging_enabled() && ! empty($config_option_name)) {
            $config_log = get_option(EE_Config::LOG_NAME, array());
            //copy incoming $_REQUEST and sanitize it so we can save it
            $_request = $_REQUEST;
            array_walk_recursive($_request, 'sanitize_text_field');
            $config_log[(string)microtime(true)] = array(
                'config_name' => $config_option_name,
                'request'     => $_request,
            );
            update_option(EE_Config::LOG_NAME, $config_log);
        }
    }



    /**
     * trim_log
     * reduces the size of the config log to the length specified by EE_Config::LOG_LENGTH
     */
    public static function trim_log()
    {
        if (! EE_Config::logging_enabled()) {
            return;
        }
        $config_log = maybe_unserialize(get_option(EE_Config::LOG_NAME, array()));
        $log_length = count($config_log);
        if ($log_length > EE_Config::LOG_LENGTH) {
            ksort($config_log);
            $config_log = array_slice($config_log, $log_length - EE_Config::LOG_LENGTH, null, true);
            update_option(EE_Config::LOG_NAME, $config_log);
        }
    }



    /**
     *    get_page_for_posts
     *    if the wp-option "show_on_front" is set to "page", then this is the post_name for the post set in the
     *    wp-option "page_for_posts", or "posts" if no page is selected
     *
     * @access    public
     * @return    string
     */
    public static function get_page_for_posts()
    {
        $page_for_posts = get_option('page_for_posts');
        if (! $page_for_posts) {
            return 'posts';
        }
        /** @type WPDB $wpdb */
        global $wpdb;
        $SQL = "SELECT post_name from $wpdb->posts WHERE post_type='posts' OR post_type='page' AND post_status='publish' AND ID=%d";
        return $wpdb->get_var($wpdb->prepare($SQL, $page_for_posts));
    }



    /**
     *    register_shortcodes_and_modules.
     *    At this point, it's too early to tell if we're maintenance mode or not.
     *    In fact, this is where we give modules a chance to let core know they exist
     *    so they can help trigger maintenance mode if it's needed
     *
     * @access    public
     * @return    void
     */
    public function register_shortcodes_and_modules()
    {
        // allow shortcodes to register with WP and to set hooks for the rest of the system
        EE_Registry::instance()->shortcodes = $this->_register_shortcodes();
        // allow modules to set hooks for the rest of the system
        EE_Registry::instance()->modules = $this->_register_modules();
    }



    /**
     *    initialize_shortcodes_and_modules
     *    meaning they can start adding their hooks to get stuff done
     *
     * @access    public
     * @return    void
     */
    public function initialize_shortcodes_and_modules()
    {
        // allow shortcodes to set hooks for the rest of the system
        $this->_initialize_shortcodes();
        // allow modules to set hooks for the rest of the system
        $this->_initialize_modules();
    }



    /**
     *    widgets_init
     *
     * @access private
     * @return void
     */
    public function widgets_init()
    {
        //only init widgets on admin pages when not in complete maintenance, and
        //on frontend when not in any maintenance mode
        if (
            ! EE_Maintenance_Mode::instance()->level()
            || (
                is_admin()
                && EE_Maintenance_Mode::instance()->level() !== EE_Maintenance_Mode::level_2_complete_maintenance
            )
        ) {
            // grab list of installed widgets
            $widgets_to_register = glob(EE_WIDGETS . '*', GLOB_ONLYDIR);
            // filter list of modules to register
            $widgets_to_register = apply_filters(
                'FHEE__EE_Config__register_widgets__widgets_to_register',
                $widgets_to_register
            );
            if (! empty($widgets_to_register)) {
                // cycle thru widget folders
                foreach ($widgets_to_register as $widget_path) {
                    // add to list of installed widget modules
                    EE_Config::register_ee_widget($widget_path);
                }
            }
            // filter list of installed modules
            EE_Registry::instance()->widgets = apply_filters(
                'FHEE__EE_Config__register_widgets__installed_widgets',
                EE_Registry::instance()->widgets
            );
        }
    }



    /**
     *    register_ee_widget - makes core aware of this widget
     *
     * @access    public
     * @param    string $widget_path - full path up to and including widget folder
     * @return    void
     */
    public static function register_ee_widget($widget_path = null)
    {
        do_action('AHEE__EE_Config__register_widget__begin', $widget_path);
        $widget_ext = '.widget.php';
        // make all separators match
        $widget_path = rtrim(str_replace('/\\', DS, $widget_path), DS);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($widget_path, $widget_ext) !== false) {
            // grab and shortcode file name from directory name and break apart at dots
            $file_name = explode('.', basename($widget_path));
            // take first segment from file name pieces and remove class prefix if it exists
            $widget = strpos($file_name[0], 'EEW_') === 0 ? substr($file_name[0], 4) : $file_name[0];
            // sanitize shortcode directory name
            $widget = sanitize_key($widget);
            // now we need to rebuild the shortcode path
            $widget_path = explode(DS, $widget_path);
            // remove last segment
            array_pop($widget_path);
            // glue it back together
            $widget_path = implode(DS, $widget_path);
        } else {
            // grab and sanitize widget directory name
            $widget = sanitize_key(basename($widget_path));
        }
        // create classname from widget directory name
        $widget = str_replace(' ', '_', ucwords(str_replace('_', ' ', $widget)));
        // add class prefix
        $widget_class = 'EEW_' . $widget;
        // does the widget exist ?
        if (! is_readable($widget_path . DS . $widget_class . $widget_ext)) {
            $msg = sprintf(
                __(
                    'The requested %s widget file could not be found or is not readable due to file permissions. Please ensure the following path is correct: %s',
                    'event_espresso'
                ),
                $widget_class,
                $widget_path . DS . $widget_class . $widget_ext
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return;
        }
        // load the widget class file
        require_once($widget_path . DS . $widget_class . $widget_ext);
        // verify that class exists
        if (! class_exists($widget_class)) {
            $msg = sprintf(__('The requested %s widget class does not exist.', 'event_espresso'), $widget_class);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return;
        }
        register_widget($widget_class);
        // add to array of registered widgets
        EE_Registry::instance()->widgets->{$widget_class} = $widget_path . DS . $widget_class . $widget_ext;
    }



    /**
     *        _register_shortcodes
     *
     * @access private
     * @return array
     */
    private function _register_shortcodes()
    {
        // grab list of installed shortcodes
        $shortcodes_to_register = glob(EE_SHORTCODES . '*', GLOB_ONLYDIR);
        // filter list of modules to register
        $shortcodes_to_register = apply_filters(
            'FHEE__EE_Config__register_shortcodes__shortcodes_to_register',
            $shortcodes_to_register
        );
        if (! empty($shortcodes_to_register)) {
            // cycle thru shortcode folders
            foreach ($shortcodes_to_register as $shortcode_path) {
                // add to list of installed shortcode modules
                EE_Config::register_shortcode($shortcode_path);
            }
        }
        // filter list of installed modules
        return apply_filters(
            'FHEE__EE_Config___register_shortcodes__installed_shortcodes',
            EE_Registry::instance()->shortcodes
        );
    }



    /**
     *    register_shortcode - makes core aware of this shortcode
     *
     * @access    public
     * @param    string $shortcode_path - full path up to and including shortcode folder
     * @return    bool
     */
    public static function register_shortcode($shortcode_path = null)
    {
        do_action('AHEE__EE_Config__register_shortcode__begin', $shortcode_path);
        $shortcode_ext = '.shortcode.php';
        // make all separators match
        $shortcode_path = str_replace(array('\\', '/'), DS, $shortcode_path);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($shortcode_path, $shortcode_ext) !== false) {
            // grab shortcode file name from directory name and break apart at dots
            $shortcode_file = explode('.', basename($shortcode_path));
            // take first segment from file name pieces and remove class prefix if it exists
            $shortcode = strpos($shortcode_file[0], 'EES_') === 0
                ? substr($shortcode_file[0], 4)
                : $shortcode_file[0];
            // sanitize shortcode directory name
            $shortcode = sanitize_key($shortcode);
            // now we need to rebuild the shortcode path
            $shortcode_path = explode(DS, $shortcode_path);
            // remove last segment
            array_pop($shortcode_path);
            // glue it back together
            $shortcode_path = implode(DS, $shortcode_path) . DS;
        } else {
            // we need to generate the filename based off of the folder name
            // grab and sanitize shortcode directory name
            $shortcode = sanitize_key(basename($shortcode_path));
            $shortcode_path = rtrim($shortcode_path, DS) . DS;
        }
        // create classname from shortcode directory or file name
        $shortcode = str_replace(' ', '_', ucwords(str_replace('_', ' ', $shortcode)));
        // add class prefix
        $shortcode_class = 'EES_' . $shortcode;
        // does the shortcode exist ?
        if (! is_readable($shortcode_path . DS . $shortcode_class . $shortcode_ext)) {
            $msg = sprintf(
                __(
                    'The requested %s shortcode file could not be found or is not readable due to file permissions. It should be in %s',
                    'event_espresso'
                ),
                $shortcode_class,
                $shortcode_path . DS . $shortcode_class . $shortcode_ext
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // load the shortcode class file
        require_once($shortcode_path . $shortcode_class . $shortcode_ext);
        // verify that class exists
        if (! class_exists($shortcode_class)) {
            $msg = sprintf(
                __('The requested %s shortcode class does not exist.', 'event_espresso'),
                $shortcode_class
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        $shortcode = strtoupper($shortcode);
        // add to array of registered shortcodes
        EE_Registry::instance()->shortcodes->{$shortcode} = $shortcode_path . $shortcode_class . $shortcode_ext;
        return true;
    }



    /**
     *        _register_modules
     *
     * @access private
     * @return array
     */
    private function _register_modules()
    {
        // grab list of installed modules
        $modules_to_register = glob(EE_MODULES . '*', GLOB_ONLYDIR);
        // filter list of modules to register
        $modules_to_register = apply_filters(
            'FHEE__EE_Config__register_modules__modules_to_register',
            $modules_to_register
        );
        if (! empty($modules_to_register)) {
            // loop through folders
            foreach ($modules_to_register as $module_path) {
                /**TEMPORARILY EXCLUDE gateways from modules for time being**/
                if (
                    $module_path !== EE_MODULES . 'zzz-copy-this-module-template'
                    && $module_path !== EE_MODULES . 'gateways'
                ) {
                    // add to list of installed modules
                    EE_Config::register_module($module_path);
                }
            }
        }
        // filter list of installed modules
        return apply_filters(
            'FHEE__EE_Config___register_modules__installed_modules',
            EE_Registry::instance()->modules
        );
    }



    /**
     *    register_module - makes core aware of this module
     *
     * @access    public
     * @param    string $module_path - full path up to and including module folder
     * @return    bool
     */
    public static function register_module($module_path = null)
    {
        do_action('AHEE__EE_Config__register_module__begin', $module_path);
        $module_ext = '.module.php';
        // make all separators match
        $module_path = str_replace(array('\\', '/'), DS, $module_path);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($module_path, $module_ext) !== false) {
            // grab and shortcode file name from directory name and break apart at dots
            $module_file = explode('.', basename($module_path));
            // now we need to rebuild the shortcode path
            $module_path = explode(DS, $module_path);
            // remove last segment
            array_pop($module_path);
            // glue it back together
            $module_path = implode(DS, $module_path) . DS;
            // take first segment from file name pieces and sanitize it
            $module = preg_replace('/[^a-zA-Z0-9_\-]/', '', $module_file[0]);
            // ensure class prefix is added
            $module_class = strpos($module, 'EED_') !== 0 ? 'EED_' . $module : $module;
        } else {
            // we need to generate the filename based off of the folder name
            // grab and sanitize module name
            $module = strtolower(basename($module_path));
            $module = preg_replace('/[^a-z0-9_\-]/', '', $module);
            // like trailingslashit()
            $module_path = rtrim($module_path, DS) . DS;
            // create classname from module directory name
            $module = str_replace(' ', '_', ucwords(str_replace('_', ' ', $module)));
            // add class prefix
            $module_class = 'EED_' . $module;
        }
        // does the module exist ?
        if (! is_readable($module_path . DS . $module_class . $module_ext)) {
            $msg = sprintf(
                __(
                    'The requested %s module file could not be found or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $module
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // load the module class file
        require_once($module_path . $module_class . $module_ext);
        // verify that class exists
        if (! class_exists($module_class)) {
            $msg = sprintf(__('The requested %s module class does not exist.', 'event_espresso'), $module_class);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // add to array of registered modules
        EE_Registry::instance()->modules->{$module_class} = $module_path . $module_class . $module_ext;
        do_action(
            'AHEE__EE_Config__register_module__complete',
            $module_class,
            EE_Registry::instance()->modules->{$module_class}
        );
        return true;
    }



    /**
     *    _initialize_shortcodes
     *    allow shortcodes to set hooks for the rest of the system
     *
     * @access private
     * @return void
     */
    private function _initialize_shortcodes()
    {
        // cycle thru shortcode folders
        foreach (EE_Registry::instance()->shortcodes as $shortcode => $shortcode_path) {
            // add class prefix
            $shortcode_class = 'EES_' . $shortcode;
            // fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
            // which set hooks ?
            if (is_admin()) {
                // fire immediately
                call_user_func(array($shortcode_class, 'set_hooks_admin'));
            } else {
                // delay until other systems are online
                add_action(
                    'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons',
                    array($shortcode_class, 'set_hooks')
                );
                // convert classname to UPPERCASE and create WP shortcode.
                $shortcode_tag = strtoupper($shortcode);
                // but first check if the shortcode has already been added before assigning 'fallback_shortcode_processor'
                if (! shortcode_exists($shortcode_tag)) {
                    // NOTE: this shortcode declaration will get overridden if the shortcode is successfully detected in the post content in EE_Front_Controller->_initialize_shortcodes()
                    add_shortcode($shortcode_tag, array($shortcode_class, 'fallback_shortcode_processor'));
                }
            }
        }
    }



    /**
     *    _initialize_modules
     *    allow modules to set hooks for the rest of the system
     *
     * @access private
     * @return void
     */
    private function _initialize_modules()
    {
        // cycle thru shortcode folders
        foreach (EE_Registry::instance()->modules as $module_class => $module_path) {
            // fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
            // which set hooks ?
            if (is_admin()) {
                // fire immediately
                call_user_func(array($module_class, 'set_hooks_admin'));
            } else {
                // delay until other systems are online
                add_action(
                    'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons',
                    array($module_class, 'set_hooks')
                );
            }
        }
    }



    /**
     *    register_route - adds module method routes to route_map
     *
     * @access    public
     * @param    string $route       - "pretty" public alias for module method
     * @param    string $module      - module name (classname without EED_ prefix)
     * @param    string $method_name - the actual module method to be routed to
     * @param    string $key         - url param key indicating a route is being called
     * @return    bool
     */
    public static function register_route($route = null, $module = null, $method_name = null, $key = 'ee')
    {
        do_action('AHEE__EE_Config__register_route__begin', $route, $module, $method_name);
        $module = str_replace('EED_', '', $module);
        $module_class = 'EED_' . $module;
        if (! isset(EE_Registry::instance()->modules->{$module_class})) {
            $msg = sprintf(__('The module %s has not been registered.', 'event_espresso'), $module);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (empty($route)) {
            $msg = sprintf(__('No route has been supplied.', 'event_espresso'), $route);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (! method_exists('EED_' . $module, $method_name)) {
            $msg = sprintf(
                __('A valid class method for the %s route has not been supplied.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        EE_Config::$_module_route_map[$key][$route] = array('EED_' . $module, $method_name);
        return true;
    }



    /**
     *    get_route - get module method route
     *
     * @access    public
     * @param    string $route - "pretty" public alias for module method
     * @param    string $key   - url param key indicating a route is being called
     * @return    string
     */
    public static function get_route($route = null, $key = 'ee')
    {
        do_action('AHEE__EE_Config__get_route__begin', $route);
        $route = (string)apply_filters('FHEE__EE_Config__get_route', $route);
        if (isset(EE_Config::$_module_route_map[$key][$route])) {
            return EE_Config::$_module_route_map[$key][$route];
        }
        return null;
    }



    /**
     *    get_routes - get ALL module method routes
     *
     * @access    public
     * @return    array
     */
    public static function get_routes()
    {
        return EE_Config::$_module_route_map;
    }



    /**
     *    register_forward - allows modules to forward request to another module for further processing
     *
     * @access    public
     * @param    string       $route   - "pretty" public alias for module method
     * @param    integer      $status  - integer value corresponding  to status constant strings set in module parent
     *                                 class, allows different forwards to be served based on status
     * @param    array|string $forward - function name or array( class, method )
     * @param    string       $key     - url param key indicating a route is being called
     * @return    bool
     */
    public static function register_forward($route = null, $status = 0, $forward = null, $key = 'ee')
    {
        do_action('AHEE__EE_Config__register_forward', $route, $status, $forward);
        if (! isset(EE_Config::$_module_route_map[$key][$route]) || empty($route)) {
            $msg = sprintf(
                __('The module route %s for this forward has not been registered.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (empty($forward)) {
            $msg = sprintf(__('No forwarding route has been supplied.', 'event_espresso'), $route);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (is_array($forward)) {
            if (! isset($forward[1])) {
                $msg = sprintf(
                    __('A class method for the %s forwarding route has not been supplied.', 'event_espresso'),
                    $route
                );
                EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
                return false;
            }
            if (! method_exists($forward[0], $forward[1])) {
                $msg = sprintf(
                    __('The class method %s for the %s forwarding route is in invalid.', 'event_espresso'),
                    $forward[1],
                    $route
                );
                EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
                return false;
            }
        } else if (! function_exists($forward)) {
            $msg = sprintf(
                __('The function %s for the %s forwarding route is in invalid.', 'event_espresso'),
                $forward,
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        EE_Config::$_module_forward_map[$key][$route][absint($status)] = $forward;
        return true;
    }



    /**
     *    get_forward - get forwarding route
     *
     * @access    public
     * @param    string  $route  - "pretty" public alias for module method
     * @param    integer $status - integer value corresponding  to status constant strings set in module parent class,
     *                           allows different forwards to be served based on status
     * @param    string  $key    - url param key indicating a route is being called
     * @return    string
     */
    public static function get_forward($route = null, $status = 0, $key = 'ee')
    {
        do_action('AHEE__EE_Config__get_forward__begin', $route, $status);
        if (isset(EE_Config::$_module_forward_map[$key][$route][$status])) {
            return apply_filters(
                'FHEE__EE_Config__get_forward',
                EE_Config::$_module_forward_map[$key][$route][$status],
                $route,
                $status
            );
        }
        return null;
    }



    /**
     *    register_forward - allows modules to specify different view templates for different method routes and status
     *    results
     *
     * @access    public
     * @param    string  $route  - "pretty" public alias for module method
     * @param    integer $status - integer value corresponding  to status constant strings set in module parent class,
     *                           allows different views to be served based on status
     * @param    string  $view
     * @param    string  $key    - url param key indicating a route is being called
     * @return    bool
     */
    public static function register_view($route = null, $status = 0, $view = null, $key = 'ee')
    {
        do_action('AHEE__EE_Config__register_view__begin', $route, $status, $view);
        if (! isset(EE_Config::$_module_route_map[$key][$route]) || empty($route)) {
            $msg = sprintf(
                __('The module route %s for this view has not been registered.', 'event_espresso'),
                $route
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (! is_readable($view)) {
            $msg = sprintf(
                __(
                    'The %s view file could not be found or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $view
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        EE_Config::$_module_view_map[$key][$route][absint($status)] = $view;
        return true;
    }



    /**
     *    get_view - get view for route and status
     *
     * @access    public
     * @param    string  $route  - "pretty" public alias for module method
     * @param    integer $status - integer value corresponding  to status constant strings set in module parent class,
     *                           allows different views to be served based on status
     * @param    string  $key    - url param key indicating a route is being called
     * @return    string
     */
    public static function get_view($route = null, $status = 0, $key = 'ee')
    {
        do_action('AHEE__EE_Config__get_view__begin', $route, $status);
        if (isset(EE_Config::$_module_view_map[$key][$route][$status])) {
            return apply_filters(
                'FHEE__EE_Config__get_view',
                EE_Config::$_module_view_map[$key][$route][$status],
                $route,
                $status
            );
        }
        return null;
    }



    public function update_addon_option_names()
    {
        update_option(EE_Config::ADDON_OPTION_NAMES, $this->_addon_option_names);
    }



    public function shutdown()
    {
        $this->update_addon_option_names();
    }


}



/**
 * Base class used for config classes. These classes should generally not have
 * magic functions in use, except we'll allow them to magically set and get stuff...
 * basically, they should just be well-defined stdClasses
 */
class EE_Config_Base
{

    /**
     * Utility function for escaping the value of a property and returning.
     *
     * @param string $property property name (checks to see if exists).
     * @return mixed if a detected type found return the escaped value, otherwise just the raw value is returned.
     * @throws \EE_Error
     */
    public function get_pretty($property)
    {
        if (! property_exists($this, $property)) {
            throw new EE_Error(
                sprintf(
                    __(
                        '%1$s::get_pretty() has been called with the property %2$s which does not exist on the %1$s config class.',
                        'event_espresso'
                    ),
                    get_class($this),
                    $property
                )
            );
        }
        //just handling escaping of strings for now.
        if (is_string($this->{$property})) {
            return stripslashes($this->{$property});
        }
        return $this->{$property};
    }



    public function populate()
    {
        //grab defaults via a new instance of this class.
        $class_name = get_class($this);
        $defaults = new $class_name;
        //loop through the properties for this class and see if they are set.  If they are NOT, then grab the
        //default from our $defaults object.
        foreach (get_object_vars($defaults) as $property => $value) {
            if ($this->{$property} === null) {
                $this->{$property} = $value;
            }
        }
        //cleanup
        unset($defaults);
    }


    /**
     *        @ override magic methods
     *        @ return void
     */
    //	public function __get($a) { return apply_filters('FHEE__'.get_class($this).'__get__'.$a,$this->{$a}); }
    //	public function __set($a,$b) { return apply_filters('FHEE__'.get_class($this).'__set__'.$a, $this->{$a} = $b ); }
    /**
     *        __isset
     *
     * @param $a
     * @return bool
     */
    public function __isset($a)
    {
        return false;
    }



    /**
     *        __unset
     *
     * @param $a
     * @return bool
     */
    public function __unset($a)
    {
        return false;
    }



    /**
     *        __clone
     */
    public function __clone()
    {
    }



    /**
     *        __wakeup
     */
    public function __wakeup()
    {
    }



    /**
     *        __destruct
     */
    public function __destruct()
    {
    }
}



/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Core_Config extends EE_Config_Base
{

    public $current_blog_id;

    public $ee_ueip_optin;

    public $ee_ueip_has_notified;

    /**
     * Not to be confused with the 4 critical page variables (See
     * get_critical_pages_array()), this is just an array of wp posts that have EE
     * shortcodes in them. Keys are slugs, values are arrays with only 1 element: where the key is the shortcode
     * in the page, and the value is the page's ID. The key 'posts' is basically a duplicate of this same array.
     *
     * @var array
     */
    public $post_shortcodes;

    public $module_route_map;

    public $module_forward_map;

    public $module_view_map;

    /**
     * The next 4 vars are the IDs of critical EE pages.
     *
     * @var int
     */
    public $reg_page_id;

    public $txn_page_id;

    public $thank_you_page_id;

    public $cancel_page_id;

    /**
     * The next 4 vars are the URLs of critical EE pages.
     *
     * @var int
     */
    public $reg_page_url;

    public $txn_page_url;

    public $thank_you_page_url;

    public $cancel_page_url;

    /**
     * The next vars relate to the custom slugs for EE CPT routes
     */
    public $event_cpt_slug;


    /**
     * This caches the _ee_ueip_option in case this config is reset in the same
     * request across blog switches in a multisite context.
     * Avoids extra queries to the db for this option.
     *
     * @var bool
     */
    public static $ee_ueip_option;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default organization settings
        $this->current_blog_id = get_current_blog_id();
        $this->current_blog_id = $this->current_blog_id === null ? 1 : $this->current_blog_id;
        $this->ee_ueip_optin = $this->_get_main_ee_ueip_optin();
        $this->ee_ueip_has_notified = is_main_site() ? get_option('ee_ueip_has_notified', false) : true;
        $this->post_shortcodes = array();
        $this->module_route_map = array();
        $this->module_forward_map = array();
        $this->module_view_map = array();
        // critical EE page IDs
        $this->reg_page_id = 0;
        $this->txn_page_id = 0;
        $this->thank_you_page_id = 0;
        $this->cancel_page_id = 0;
        // critical EE page URLs
        $this->reg_page_url = '';
        $this->txn_page_url = '';
        $this->thank_you_page_url = '';
        $this->cancel_page_url = '';
        //cpt slugs
        $this->event_cpt_slug = __('events', 'event_espresso');
        //ueip constant check
        if (defined('EE_DISABLE_UXIP') && EE_DISABLE_UXIP) {
            $this->ee_ueip_optin = false;
            $this->ee_ueip_has_notified = true;
        }
    }



    /**
     * @return array
     */
    public function get_critical_pages_array()
    {
        return array(
            $this->reg_page_id,
            $this->txn_page_id,
            $this->thank_you_page_id,
            $this->cancel_page_id,
        );
    }



    /**
     * @return array
     */
    public function get_critical_pages_shortcodes_array()
    {
        return array(
            $this->reg_page_id       => 'ESPRESSO_CHECKOUT',
            $this->txn_page_id       => 'ESPRESSO_TXN_PAGE',
            $this->thank_you_page_id => 'ESPRESSO_THANK_YOU',
            $this->cancel_page_id    => 'ESPRESSO_CANCELLED',
        );
    }



    /**
     *  gets/returns URL for EE reg_page
     *
     * @access    public
     * @return    string
     */
    public function reg_page_url()
    {
        if (! $this->reg_page_url) {
            $this->reg_page_url = add_query_arg(
                                      array('uts' => time()),
                                      get_permalink($this->reg_page_id)
                                  ) . '#checkout';
        }
        return $this->reg_page_url;
    }



    /**
     *  gets/returns URL for EE txn_page
     *
     * @param array $query_args like what gets passed to
     *                          add_query_arg() as the first argument
     * @access    public
     * @return    string
     */
    public function txn_page_url($query_args = array())
    {
        if (! $this->txn_page_url) {
            $this->txn_page_url = get_permalink($this->txn_page_id);
        }
        if ($query_args) {
            return add_query_arg($query_args, $this->txn_page_url);
        } else {
            return $this->txn_page_url;
        }
    }



    /**
     *  gets/returns URL for EE thank_you_page
     *
     * @param array $query_args like what gets passed to
     *                          add_query_arg() as the first argument
     * @access    public
     * @return    string
     */
    public function thank_you_page_url($query_args = array())
    {
        if (! $this->thank_you_page_url) {
            $this->thank_you_page_url = get_permalink($this->thank_you_page_id);
        }
        if ($query_args) {
            return add_query_arg($query_args, $this->thank_you_page_url);
        } else {
            return $this->thank_you_page_url;
        }
    }



    /**
     *  gets/returns URL for EE cancel_page
     *
     * @access    public
     * @return    string
     */
    public function cancel_page_url()
    {
        if (! $this->cancel_page_url) {
            $this->cancel_page_url = get_permalink($this->cancel_page_id);
        }
        return $this->cancel_page_url;
    }



    /**
     * Resets all critical page urls to their original state.  Used primarily by the __sleep() magic method currently.
     *
     * @since 4.7.5
     */
    protected function _reset_urls()
    {
        $this->reg_page_url = '';
        $this->txn_page_url = '';
        $this->cancel_page_url = '';
        $this->thank_you_page_url = '';
    }



    /**
     * Used to return what the optin value is set for the EE User Experience Program.
     * This accounts for multisite and this value being requested for a subsite.  In multisite, the value is set
     * on the main site only.
     *
     * @return mixed|void
     */
    protected function _get_main_ee_ueip_optin()
    {
        //if this is the main site then we can just bypass our direct query.
        if (is_main_site()) {
            return get_option('ee_ueip_optin', false);
        }
        //is this already cached for this request?  If so use it.
        if ( ! empty(EE_Core_Config::$ee_ueip_option)) {
            return EE_Core_Config::$ee_ueip_option;
        }
        global $wpdb;
        $current_network_main_site = is_multisite() ? get_current_site() : null;
        $current_main_site_id = ! empty($current_network_main_site) ? $current_network_main_site->blog_id : 1;
        $option = 'ee_ueip_optin';
        //set correct table for query
        $table_name = $wpdb->get_blog_prefix($current_main_site_id) . 'options';
        //rather than getting blog option for the $current_main_site_id, we do a direct $wpdb query because
        //get_blog_option() does a switch_to_blog an that could cause infinite recursion because EE_Core_Config might be
        //re-constructed on the blog switch.  Note, we are still executing any core wp filters on this option retrieval.
        //this bit of code is basically a direct copy of get_option without any caching because we are NOT switched to the blog
        //for the purpose of caching.
        $pre = apply_filters('pre_option_' . $option, false, $option);
        if (false !== $pre) {
            EE_Core_Config::$ee_ueip_option = $pre;
            return EE_Core_Config::$ee_ueip_option;
        }
        $row = $wpdb->get_row($wpdb->prepare("SELECT option_value FROM $table_name WHERE option_name = %s LIMIT 1",
            $option));
        if (is_object($row)) {
            $value = $row->option_value;
        } else { //option does not exist so use default.
            return apply_filters('default_option_' . $option, false, $option);
        }
        EE_Core_Config::$ee_ueip_option = apply_filters('option_' . $option, maybe_unserialize($value), $option);
        return EE_Core_Config::$ee_ueip_option;
    }



    /**
     * Currently used to ensure critical page urls have initial values saved to the db instead of any current set values
     * on the object.
     *
     * @return array
     */
    public function __sleep()
    {
        //reset all url properties
        $this->_reset_urls();
        //return what to save to db
        return array_keys(get_object_vars($this));
    }

}



/**
 * Config class for storing info on the Organization
 */
class EE_Organization_Config extends EE_Config_Base
{

    /**
     * @var string $name
     * eg EE4.1
     */
    public $name;

    /**
     * @var string $address_1
     * eg 123 Onna Road
     */
    public $address_1;

    /**
     * @var string $address_2
     * eg PO Box 123
     */
    public $address_2;

    /**
     * @var string $city
     * eg Inna City
     */
    public $city;

    /**
     * @var int $STA_ID
     * eg 4
     */
    public $STA_ID;

    /**
     * @var string $CNT_ISO
     * eg US
     */
    public $CNT_ISO;

    /**
     * @var string $zip
     * eg 12345  or V1A 2B3
     */
    public $zip;

    /**
     * @var string $email
     * eg support@eventespresso.com
     */
    public $email;


    /**
     * @var string $phone
     * eg. 111-111-1111
     */
    public $phone;


    /**
     * @var string $vat
     * VAT/Tax Number
     */
    public $vat;

    /**
     * @var string $logo_url
     * eg http://www.somedomain.com/wp-content/uploads/kittehs.jpg
     */
    public $logo_url;


    /**
     * The below are all various properties for holding links to organization social network profiles
     *
     * @var string
     */
    /**
     * facebook (facebook.com/profile.name)
     *
     * @var string
     */
    public $facebook;


    /**
     * twitter (twitter.com/twitter_handle)
     *
     * @var string
     */
    public $twitter;


    /**
     * linkedin (linkedin.com/in/profile_name)
     *
     * @var string
     */
    public $linkedin;


    /**
     * pinterest (www.pinterest.com/profile_name)
     *
     * @var string
     */
    public $pinterest;


    /**
     * google+ (google.com/+profileName)
     *
     * @var string
     */
    public $google;


    /**
     * instagram (instagram.com/handle)
     *
     * @var string
     */
    public $instagram;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default organization settings
        $this->name = get_bloginfo('name');
        $this->address_1 = '123 Onna Road';
        $this->address_2 = 'PO Box 123';
        $this->city = 'Inna City';
        $this->STA_ID = 4;
        $this->CNT_ISO = 'US';
        $this->zip = '12345';
        $this->email = get_bloginfo('admin_email');
        $this->phone = '';
        $this->vat = '123456789';
        $this->logo_url = '';
        $this->facebook = '';
        $this->twitter = '';
        $this->linkedin = '';
        $this->pinterest = '';
        $this->google = '';
        $this->instagram = '';
    }

}



/**
 * Class for defining what's in the EE_Config relating to currency
 */
class EE_Currency_Config extends EE_Config_Base
{

    /**
     * @var string $code
     * eg 'US'
     */
    public $code;

    /**
     * @var string $name
     * eg 'Dollar'
     */
    public $name;

    /**
     * plural name
     *
     * @var string $plural
     * eg 'Dollars'
     */
    public $plural;

    /**
     * currency sign
     *
     * @var string $sign
     * eg '$'
     */
    public $sign;

    /**
     * Whether the currency sign should come before the number or not
     *
     * @var boolean $sign_b4
     */
    public $sign_b4;

    /**
     * How many digits should come after the decimal place
     *
     * @var int $dec_plc
     */
    public $dec_plc;

    /**
     * Symbol to use for decimal mark
     *
     * @var string $dec_mrk
     * eg '.'
     */
    public $dec_mrk;

    /**
     * Symbol to use for thousands
     *
     * @var string $thsnds
     * eg ','
     */
    public $thsnds;



    /**
     *    class constructor
     *
     * @access    public
     * @param string $CNT_ISO
     * @throws \EE_Error
     */
    public function __construct($CNT_ISO = '')
    {
        /** @var \EventEspresso\core\services\database\TableAnalysis $table_analysis */
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', array(), true);
        // get country code from organization settings or use default
        $ORG_CNT = isset(EE_Registry::instance()->CFG->organization)
                   && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : '';
        // but override if requested
        $CNT_ISO = ! empty($CNT_ISO) ? $CNT_ISO : $ORG_CNT;
        // so if that all went well, and we are not in M-Mode (cuz you can't query the db in M-Mode) and double-check the countries table exists
        if (
            ! empty($CNT_ISO)
            && EE_Maintenance_Mode::instance()->models_can_query()
            && $table_analysis->tableExists(EE_Registry::instance()->load_model('Country')->table())
        ) {
            // retrieve the country settings from the db, just in case they have been customized
            $country = EE_Registry::instance()->load_model('Country')->get_one_by_ID($CNT_ISO);
            if ($country instanceof EE_Country) {
                $this->code = $country->currency_code();    // currency code: USD, CAD, EUR
                $this->name = $country->currency_name_single();    // Dollar
                $this->plural = $country->currency_name_plural();    // Dollars
                $this->sign = $country->currency_sign();            // currency sign: $
                $this->sign_b4 = $country->currency_sign_before();        // currency sign before or after: $TRUE  or  FALSE$
                $this->dec_plc = $country->currency_decimal_places();    // decimal places: 2 = 0.00  3 = 0.000
                $this->dec_mrk = $country->currency_decimal_mark();    // decimal mark: (comma) ',' = 0,01   or (decimal) '.' = 0.01
                $this->thsnds = $country->currency_thousands_separator();    // thousands separator: (comma) ',' = 1,000   or (decimal) '.' = 1.000
            }
        }
        // fallback to hardcoded defaults, in case the above failed
        if (empty($this->code)) {
            // set default currency settings
            $this->code = 'USD';    // currency code: USD, CAD, EUR
            $this->name = __('Dollar', 'event_espresso');    // Dollar
            $this->plural = __('Dollars', 'event_espresso');    // Dollars
            $this->sign = '$';    // currency sign: $
            $this->sign_b4 = true;    // currency sign before or after: $TRUE  or  FALSE$
            $this->dec_plc = 2;    // decimal places: 2 = 0.00  3 = 0.000
            $this->dec_mrk = '.';    // decimal mark: (comma) ',' = 0,01   or (decimal) '.' = 0.01
            $this->thsnds = ',';    // thousands separator: (comma) ',' = 1,000   or (decimal) '.' = 1.000
        }
    }
}



/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Registration_Config extends EE_Config_Base
{

    /**
     * Default registration status
     *
     * @var string $default_STS_ID
     * eg 'RPP'
     */
    public $default_STS_ID;

    /**
     * level of validation to apply to email addresses
     *
     * @var string $email_validation_level
     * options: 'basic', 'wp_default', 'i18n', 'i18n_dns'
     */
    public $email_validation_level;

    /**
     *    whether or not to show alternate payment options during the reg process if payment status is pending
     *
     * @var boolean $show_pending_payment_options
     */
    public $show_pending_payment_options;

    /**
     * Whether to skip the registration confirmation page
     *
     * @var boolean $skip_reg_confirmation
     */
    public $skip_reg_confirmation;

    /**
     * an array of SPCO reg steps where:
     *        the keys denotes the reg step order
     *        each element consists of an array with the following elements:
     *            "file_path" => the file path to the EE_SPCO_Reg_Step class
     *            "class_name" => the specific EE_SPCO_Reg_Step child class name
     *            "slug" => the URL param used to trigger the reg step
     *
     * @var array $reg_steps
     */
    public $reg_steps;

    /**
     * Whether registration confirmation should be the last page of SPCO
     *
     * @var boolean $reg_confirmation_last
     */
    public $reg_confirmation_last;

    /**
     * Whether or not to enable the EE Bot Trap
     *
     * @var boolean $use_bot_trap
     */
    public $use_bot_trap;

    /**
     * Whether or not to encrypt some data sent by the EE Bot Trap
     *
     * @var boolean $use_encryption
     */
    public $use_encryption;

    /**
     * Whether or not to use ReCaptcha
     *
     * @var boolean $use_captcha
     */
    public $use_captcha;

    /**
     * ReCaptcha Theme
     *
     * @var string $recaptcha_theme
     *    options: 'dark    ', 'light'
     */
    public $recaptcha_theme;

    /**
     * ReCaptcha Type
     *
     * @var string $recaptcha_type
     *    options: 'audio', 'image'
     */
    public $recaptcha_type;

    /**
     * ReCaptcha language
     *
     * @var string $recaptcha_language
     * eg 'en'
     */
    public $recaptcha_language;

    /**
     * ReCaptcha public key
     *
     * @var string $recaptcha_publickey
     */
    public $recaptcha_publickey;

    /**
     * ReCaptcha private key
     *
     * @var string $recaptcha_privatekey
     */
    public $recaptcha_privatekey;

    /**
     * ReCaptcha width
     *
     * @var int $recaptcha_width
     * @deprecated
     */
    public $recaptcha_width;

    /**
     * Whether or not invalid attempts to directly access the registration checkout page should be tracked.
     *
     * @var boolean $track_invalid_checkout_access
     */
    protected $track_invalid_checkout_access = true;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default registration settings
        $this->default_STS_ID = EEM_Registration::status_id_pending_payment;
        $this->email_validation_level = 'wp_default';
        $this->show_pending_payment_options = true;
        $this->skip_reg_confirmation = false;
        $this->reg_steps = array();
        $this->reg_confirmation_last = false;
        $this->use_bot_trap = true;
        $this->use_encryption = true;
        $this->use_captcha = false;
        $this->recaptcha_theme = 'light';
        $this->recaptcha_type = 'image';
        $this->recaptcha_language = 'en';
        $this->recaptcha_publickey = null;
        $this->recaptcha_privatekey = null;
        $this->recaptcha_width = 500;
    }



    /**
     * This is called by the config loader and hooks are initialized AFTER the config has been populated.
     *
     * @since 4.8.8.rc.019
     */
    public function do_hooks()
    {
        add_action('AHEE__EE_Config___load_core_config__end', array($this, 'set_default_reg_status_on_EEM_Event'));
    }



    /**
     * @return void
     */
    public function set_default_reg_status_on_EEM_Event()
    {
        EEM_Event::set_default_reg_status($this->default_STS_ID);
    }



    /**
     * @return boolean
     */
    public function track_invalid_checkout_access()
    {
        return $this->track_invalid_checkout_access;
    }



    /**
     * @param boolean $track_invalid_checkout_access
     */
    public function set_track_invalid_checkout_access($track_invalid_checkout_access)
    {
        $this->track_invalid_checkout_access = filter_var(
            $track_invalid_checkout_access,
            FILTER_VALIDATE_BOOLEAN
        );
    }


}



/**
 * Class for defining what's in the EE_Config relating to admin settings
 */
class EE_Admin_Config extends EE_Config_Base
{

    /**
     * @var boolean $use_personnel_manager
     */
    public $use_personnel_manager;

    /**
     * @var boolean $use_dashboard_widget
     */
    public $use_dashboard_widget;

    /**
     * @var int $events_in_dashboard
     */
    public $events_in_dashboard;

    /**
     * @var boolean $use_event_timezones
     */
    public $use_event_timezones;

    /**
     * @var boolean $use_full_logging
     */
    public $use_full_logging;

    /**
     * @var string $log_file_name
     */
    public $log_file_name;

    /**
     * @var string $debug_file_name
     */
    public $debug_file_name;

    /**
     * @var boolean $use_remote_logging
     */
    public $use_remote_logging;

    /**
     * @var string $remote_logging_url
     */
    public $remote_logging_url;

    /**
     * @var boolean $show_reg_footer
     */
    public $show_reg_footer;

    /**
     * @var string $affiliate_id
     */
    public $affiliate_id;

    /**
     * help tours on or off (global setting)
     *
     * @var boolean
     */
    public $help_tour_activation;

    /**
     * adds extra layer of encoding to session data to prevent serialization errors
     * but is incompatible with some server configuration errors
     * if you get "500 internal server errors" during registration, try turning this on
     * if you get PHP fatal errors regarding base 64 methods not defined, then turn this off
     *
     * @var boolean $encode_session_data
     */
    private $encode_session_data = false;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default general admin settings
        $this->use_personnel_manager = true;
        $this->use_dashboard_widget = true;
        $this->events_in_dashboard = 30;
        $this->use_event_timezones = false;
        $this->use_full_logging = false;
        $this->use_remote_logging = false;
        $this->remote_logging_url = null;
        $this->show_reg_footer = true;
        $this->affiliate_id = 'default';
        $this->help_tour_activation = true;
        $this->encode_session_data = false;
    }



    /**
     * @param bool $reset
     * @return string
     */
    public function log_file_name($reset = false)
    {
        if (empty($this->log_file_name) || $reset) {
            $this->log_file_name = sanitize_key('espresso_log_' . md5(uniqid('', true))) . '.txt';
            EE_Config::instance()->update_espresso_config(false, false);
        }
        return $this->log_file_name;
    }



    /**
     * @param bool $reset
     * @return string
     */
    public function debug_file_name($reset = false)
    {
        if (empty($this->debug_file_name) || $reset) {
            $this->debug_file_name = sanitize_key('espresso_debug_' . md5(uniqid('', true))) . '.txt';
            EE_Config::instance()->update_espresso_config(false, false);
        }
        return $this->debug_file_name;
    }



    /**
     * @return string
     */
    public function affiliate_id()
    {
        return ! empty($this->affiliate_id) ? $this->affiliate_id : 'default';
    }



    /**
     * @return boolean
     */
    public function encode_session_data()
    {
        return filter_var($this->encode_session_data, FILTER_VALIDATE_BOOLEAN);
    }



    /**
     * @param boolean $encode_session_data
     */
    public function set_encode_session_data($encode_session_data)
    {
        $this->encode_session_data = filter_var($encode_session_data, FILTER_VALIDATE_BOOLEAN);
    }


}



/**
 * Class for defining what's in the EE_Config relating to template settings
 */
class EE_Template_Config extends EE_Config_Base
{

    /**
     * @var boolean $enable_default_style
     */
    public $enable_default_style;

    /**
     * @var string $custom_style_sheet
     */
    public $custom_style_sheet;

    /**
     * @var boolean $display_address_in_regform
     */
    public $display_address_in_regform;

    /**
     * @var int $display_description_on_multi_reg_page
     */
    public $display_description_on_multi_reg_page;

    /**
     * @var boolean $use_custom_templates
     */
    public $use_custom_templates;

    /**
     * @var string $current_espresso_theme
     */
    public $current_espresso_theme;

    /**
     * @var EE_Ticket_Selector_Config $EED_Ticket_Selector
     */
    public $EED_Ticket_Selector;

    /**
     * @var EE_Event_Single_Config $EED_Event_Single
     */
    public $EED_Event_Single;

    /**
     * @var EE_Events_Archive_Config $EED_Events_Archive
     */
    public $EED_Events_Archive;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default template settings
        $this->enable_default_style = true;
        $this->custom_style_sheet = null;
        $this->display_address_in_regform = true;
        $this->display_description_on_multi_reg_page = false;
        $this->use_custom_templates = false;
        $this->current_espresso_theme = 'Espresso_Arabica_2014';
        $this->EED_Event_Single = null;
        $this->EED_Events_Archive = null;
        $this->EED_Ticket_Selector = null;
    }

}



/**
 * Class for defining what's in the EE_Config relating to map settings
 */
class EE_Map_Config extends EE_Config_Base
{

    /**
     * @var boolean $use_google_maps
     */
    public $use_google_maps;

    /**
     * @var string $api_key
     */
    public $google_map_api_key;

    /**
     * @var int $event_details_map_width
     */
    public $event_details_map_width;

    /**
     * @var int $event_details_map_height
     */
    public $event_details_map_height;

    /**
     * @var int $event_details_map_zoom
     */
    public $event_details_map_zoom;

    /**
     * @var boolean $event_details_display_nav
     */
    public $event_details_display_nav;

    /**
     * @var boolean $event_details_nav_size
     */
    public $event_details_nav_size;

    /**
     * @var string $event_details_control_type
     */
    public $event_details_control_type;

    /**
     * @var string $event_details_map_align
     */
    public $event_details_map_align;

    /**
     * @var int $event_list_map_width
     */
    public $event_list_map_width;

    /**
     * @var int $event_list_map_height
     */
    public $event_list_map_height;

    /**
     * @var int $event_list_map_zoom
     */
    public $event_list_map_zoom;

    /**
     * @var boolean $event_list_display_nav
     */
    public $event_list_display_nav;

    /**
     * @var boolean $event_list_nav_size
     */
    public $event_list_nav_size;

    /**
     * @var string $event_list_control_type
     */
    public $event_list_control_type;

    /**
     * @var string $event_list_map_align
     */
    public $event_list_map_align;



    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        // set default map settings
        $this->use_google_maps = true;
        $this->google_map_api_key = '';
        // for event details pages (reg page)
        $this->event_details_map_width = 585;            // ee_map_width_single
        $this->event_details_map_height = 362;            // ee_map_height_single
        $this->event_details_map_zoom = 14;            // ee_map_zoom_single
        $this->event_details_display_nav = true;            // ee_map_nav_display_single
        $this->event_details_nav_size = false;            // ee_map_nav_size_single
        $this->event_details_control_type = 'default';        // ee_map_type_control_single
        $this->event_details_map_align = 'center';            // ee_map_align_single
        // for event list pages
        $this->event_list_map_width = 300;            // ee_map_width
        $this->event_list_map_height = 185;        // ee_map_height
        $this->event_list_map_zoom = 12;            // ee_map_zoom
        $this->event_list_display_nav = false;        // ee_map_nav_display
        $this->event_list_nav_size = true;            // ee_map_nav_size
        $this->event_list_control_type = 'dropdown';        // ee_map_type_control
        $this->event_list_map_align = 'center';            // ee_map_align
    }

}



/**
 * stores Events_Archive settings
 */
class EE_Events_Archive_Config extends EE_Config_Base
{

    public $display_status_banner;

    public $display_description;

    public $display_ticket_selector;

    public $display_datetimes;

    public $display_venue;

    public $display_expired_events;

    public $use_sortable_display_order;

    public $display_order_tickets;

    public $display_order_datetimes;

    public $display_order_event;

    public $display_order_venue;



    /**
     *    class constructor
     */
    public function __construct()
    {
        $this->display_status_banner = 0;
        $this->display_description = 1;
        $this->display_ticket_selector = 0;
        $this->display_datetimes = 1;
        $this->display_venue = 0;
        $this->display_expired_events = 0;
        $this->use_sortable_display_order = false;
        $this->display_order_tickets = 100;
        $this->display_order_datetimes = 110;
        $this->display_order_event = 120;
        $this->display_order_venue = 130;
    }
}



/**
 * Stores Event_Single_Config settings
 */
class EE_Event_Single_Config extends EE_Config_Base
{

    public $display_status_banner_single;

    public $display_venue;

    public $use_sortable_display_order;

    public $display_order_tickets;

    public $display_order_datetimes;

    public $display_order_event;

    public $display_order_venue;



    /**
     *    class constructor
     */
    public function __construct()
    {
        $this->display_status_banner_single = 0;
        $this->display_venue = 1;
        $this->use_sortable_display_order = false;
        $this->display_order_tickets = 100;
        $this->display_order_datetimes = 110;
        $this->display_order_event = 120;
        $this->display_order_venue = 130;
    }
}



/**
 * Stores Ticket_Selector_Config settings
 */
class EE_Ticket_Selector_Config extends EE_Config_Base
{

    /**
     * constant to indicate that a datetime selector should NEVER be shown for ticket selectors
     */
    const DO_NOT_SHOW_DATETIME_SELECTOR = 'no_datetime_selector';

    /**
     * constant to indicate that a datetime selector should only be shown for ticket selectors
     * when the number of datetimes for the event matches the value set for $datetime_selector_threshold
     */
    const MAYBE_SHOW_DATETIME_SELECTOR = 'maybe_datetime_selector';

    /**
     * @var boolean $show_ticket_sale_columns
     */
    public $show_ticket_sale_columns;

    /**
     * @var boolean $show_ticket_details
     */
    public $show_ticket_details;

    /**
     * @var boolean $show_expired_tickets
     */
    public $show_expired_tickets;

    /**
     * whether or not to display a dropdown box populated with event datetimes
     * that toggles which tickets are displayed for a ticket selector.
     * uses one of the *_DATETIME_SELECTOR constants defined above
     *
     * @var string $show_datetime_selector
     */
    private $show_datetime_selector = 'no_datetime_selector';

    /**
     * the number of datetimes an event has to have before conditionally displaying a datetime selector
     *
     * @var int $datetime_selector_threshold
     */
    private $datetime_selector_threshold = 3;



    /**
     *    class constructor
     */
    public function __construct()
    {
        $this->show_ticket_sale_columns = true;
        $this->show_ticket_details = true;
        $this->show_expired_tickets = true;
        $this->show_datetime_selector = \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR;
        $this->datetime_selector_threshold = 3;
    }



    /**
     * returns true if a datetime selector should be displayed
     *
     * @param array $datetimes
     * @return bool
     */
    public function showDatetimeSelector(array $datetimes)
    {
        // if the settings are NOT: don't show OR below threshold, THEN active = true
        return ! (
            $this->getShowDatetimeSelector() === \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
            || (
                $this->getShowDatetimeSelector() === \EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR
                && count($datetimes) < $this->getDatetimeSelectorThreshold()
            )
        );
    }



    /**
     * @return string
     */
    public function getShowDatetimeSelector()
    {
        return $this->show_datetime_selector;
    }



    /**
     * @param bool $keys_only
     * @return array
     */
    public function getShowDatetimeSelectorOptions($keys_only = true)
    {
        return $keys_only
            ? array(
                \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR,
                \EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR,
            )
            : array(
                \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR => esc_html__(
                    'Do not show date & time filter', 'event_espresso'
                ),
                \EE_Ticket_Selector_Config::MAYBE_SHOW_DATETIME_SELECTOR  => esc_html__(
                    'Maybe show date & time filter', 'event_espresso'
                ),
            );
    }



    /**
     * @param string $show_datetime_selector
     */
    public function setShowDatetimeSelector($show_datetime_selector)
    {
        $this->show_datetime_selector = in_array(
            $show_datetime_selector,
            $this->getShowDatetimeSelectorOptions(),
            true
        )
            ? $show_datetime_selector
            : \EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR;
    }



    /**
     * @return int
     */
    public function getDatetimeSelectorThreshold()
    {
        return $this->datetime_selector_threshold;
    }



    /**
     * @param int $datetime_selector_threshold
     */
    public function setDatetimeSelectorThreshold($datetime_selector_threshold)
    {
        $datetime_selector_threshold = absint($datetime_selector_threshold);
        $this->datetime_selector_threshold = $datetime_selector_threshold ? $datetime_selector_threshold : 3;
    }


}



/**
 * Stores any EE Environment values that are referenced through the code.
 *
 * @since       4.4.0
 * @package     Event Espresso
 * @subpackage  config
 */
class EE_Environment_Config extends EE_Config_Base
{

    /**
     * Hold any php environment variables that we want to track.
     *
     * @var stdClass;
     */
    public $php;



    /**
     *    constructor
     */
    public function __construct()
    {
        $this->php = new stdClass();
        $this->_set_php_values();
    }



    /**
     * This sets the php environment variables.
     *
     * @since 4.4.0
     * @return void
     */
    protected function _set_php_values()
    {
        $this->php->max_input_vars = ini_get('max_input_vars');
        $this->php->version = phpversion();
    }



    /**
     * helper method for determining whether input_count is
     * reaching the potential maximum the server can handle
     * according to max_input_vars
     *
     * @param int   $input_count the count of input vars.
     * @return array {
     *                           An array that represents whether available space and if no available space the error
     *                           message.
     * @type bool   $has_space   whether more inputs can be added.
     * @type string $msg         Any message to be displayed.
     *                           }
     */
    public function max_input_vars_limit_check($input_count = 0)
    {
        if (! empty($this->php->max_input_vars)
            && ($input_count >= $this->php->max_input_vars)
            && (PHP_MAJOR_VERSION >= 5 && PHP_MINOR_VERSION >= 3 && PHP_RELEASE_VERSION >= 9)
        ) {
            return sprintf(
                __(
                    'The maximum number of inputs on this page has been exceeded.  You cannot add anymore items (i.e. tickets, datetimes, custom fields) on this page because of your servers PHP "max_input_vars" setting.%1$sThere are %2$d inputs and the maximum amount currently allowed by your server is %3$d.',
                    'event_espresso'
                ),
                '<br>',
                $input_count,
                $this->php->max_input_vars
            );
        } else {
            return '';
        }
    }



    /**
     * The purpose of this method is just to force rechecking php values so if they've changed, they get updated.
     *
     * @since 4.4.1
     * @return void
     */
    public function recheck_values()
    {
        $this->_set_php_values();
    }


}



/**
 * Stores any options pertaining to taxes
 *
 * @since       4.9.13
 * @package     Event Espresso
 * @subpackage  config
 */
class EE_Tax_Config extends EE_Config_Base
{

    /*
     * flag to indicate whether or not to display ticket prices with the taxes included
     *
     * @var boolean $prices_displayed_including_taxes
     */
    public $prices_displayed_including_taxes;



    /**
     *    class constructor
     */
    public function __construct()
    {
        $this->prices_displayed_including_taxes = true;
    }
}


/**
 * Holds all global messages configuration options.
 *
 * @package    EventEspresso/core/
 * @subpackage config
 * @author     Darren Ethier
 * @since      4.27.rc
 */
class EE_Messages_Config extends EE_Config_Base
{

    /**
     * This is an integer representing the deletion threshold in months for when old messages will get deleted.
     * A value of 0 represents never deleting.  Default is 0.
     *
     * @var integer
     */
    public $delete_threshold;

    public function __construct() {
        $this->delete_threshold = 0;
    }
}


/**
 * stores payment gateway info
 *
 * @deprecated
 */
class EE_Gateway_Config extends EE_Config_Base
{

    /**
     * Array with keys that are payment gateways slugs, and values are arrays
     * with any config info the gateway wants to store
     *
     * @var array
     */
    public $payment_settings;

    /**
     * Where keys are gateway slugs, and values are booleans indicating whether or not
     * the gateway is stored in the uploads directory
     *
     * @var array
     */
    public $active_gateways;



    /**
     *    class constructor
     *
     * @deprecated
     */
    public function __construct()
    {
        $this->payment_settings = array();
        $this->active_gateways = array('Invoice' => false);
    }
}

// End of file EE_Config.core.php
// Location: /core/EE_Config.core.php
