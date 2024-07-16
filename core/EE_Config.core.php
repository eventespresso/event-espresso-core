<?php

use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\modules\LegacyModulesManager;
use EventEspresso\core\services\modules\ModuleRoutesManager;
use EventEspresso\core\services\widgets\LegacyWidgetsManager;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestParams;
use EventEspresso\core\services\shortcodes\LegacyShortcodesManager;

/**
 * EE_Config
 *
 * @package     Event Espresso
 * @subpackage  core/
 * @author      Brent Christensen
 */
final class EE_Config implements ResettableInterface
{
    const OPTION_NAME        = 'ee_config';

    const LOG_NAME           = 'ee_config_log';

    const LOG_LENGTH         = 100;

    const ADDON_OPTION_NAMES = 'ee_config_option_names';

    private static ?EE_Config $_instance = null;

    private ?LegacyShortcodesManager $legacy_shortcodes_manager = null;

    private ?ModuleRoutesManager $module_routes_manager = null;

    private static bool $_logging_enabled = false;

    /**
     * A StdClass whose property names are addon slugs, and values are their config classes
     *
     * @var StdClass
     */
    public StdClass $addons;

    public ?EE_Admin_Config $admin = null;

    public ?EE_Core_Config $core = null;

    public ?EE_Currency_Config $currency = null;

    public ?EE_Organization_Config $organization = null;

    public ?EE_Registration_Config $registration = null;

    public ?EE_Template_Config $template_settings = null;

    public ?EE_Environment_Config $environment = null;

    public ?EE_Map_Config $map_settings = null;

    public ?EE_Tax_Config $tax_settings = null;

    public ?EE_Messages_Config $messages = null;

    /**
     * @deprecated
     */
    public ?EE_Gateway_Config $gateway = null;

    private array $_addon_option_names = [];

    private static bool $initialized = false;


    /**
     * @singleton method used to instantiate class object
     * @return EE_Config instance
     */
    public static function instance(): EE_Config
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
     * @param bool $hard_reset       if TRUE, sets EE_CONFig back to its original settings in the database. If FALSE
     *                               (default) leaves the database alone, and merely resets the EE_Config object to
     *                               reflect its state in the database
     * @param bool $reinstantiate    if TRUE (default) call instance() and return it. Otherwise, just leave
     *                               $_instance as NULL. Useful in case you want to forget about the old instance on
     *                               EE_Config, but might not be ready to instantiate EE_Config currently (eg if the
     *                               site was put into maintenance mode)
     * @return EE_Config|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function reset(bool $hard_reset = false, bool $reinstantiate = true): ?EE_Config
    {
        if (self::$_instance instanceof EE_Config) {
            if ($hard_reset) {
                self::$_instance->legacy_shortcodes_manager = null;
                self::$_instance->_addon_option_names       = [];
                self::$_instance->_initialize_config();
                self::$_instance->update_espresso_config();
            }
            self::$_instance->update_addon_option_names();
        }
        self::$_instance   = null;
        self::$initialized = false;
        // we don't need to reset the static properties imo because those should
        // only change when a module is added or removed. Currently we don't
        // support removing a module during a request when it previously existed
        if ($reinstantiate) {
            return self::instance();
        }
        return null;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function __construct()
    {
        if (self::$initialized) {
            return;
        }
        self::$initialized = true;
        $this->loadLegacyConfigClasses();
        do_action('AHEE__EE_Config__construct__begin', $this);
        EE_Config::$_logging_enabled = (bool) filter_var(
            apply_filters('FHEE__EE_Config___construct__logging_enabled', false),
            FILTER_VALIDATE_BOOLEAN
        );
        // setup empty config classes
        $this->_initialize_config();
        // load existing EE site settings
        $this->_load_core_config();
        // confirm everything loaded correctly and set filtered defaults if not
        $this->_verify_config();
        // shutdown
        add_action('shutdown', [$this, 'shutdown']);
        // construct__end hook
        do_action('AHEE__EE_Config__construct__end', $this);
        // hardcoded hack
        $this->template_settings->current_espresso_theme = 'Espresso_Arabica_2014';
    }


    /**
     * @return void
     * @since 5.0.21.p
     */
    private function loadLegacyConfigClasses()
    {
        // first load the legacy config base class
        if (! is_readable(EE_CORE . 'domain/entities/config/legacy/EE_Config_Base.php')) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The legacy config class file "%s" is not readable. Please check file permissions.',
                        'event_espresso'
                    ),
                    EE_CORE . 'domain/entities/config/legacy/EE_Config_Base.php'
                )
            );
        }
        require_once EE_CORE . 'domain/entities/config/legacy/EE_Config_Base.php';

        $legacy_config_classes = glob(EE_CORE . 'domain/entities/config/legacy/EE_*_Config.php');
        foreach ($legacy_config_classes as $legacy_config_class) {
            if (! is_readable($legacy_config_class)) {
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'The legacy config class file "%s" is not readable. Please check file permissions.',
                            'event_espresso'
                        ),
                        $legacy_config_class
                    )
                );
            }
            require_once $legacy_config_class;
        }
    }


    /**
     * @return bool
     */
    public static function logging_enabled(): bool
    {
        return self::$_logging_enabled;
    }


    /**
     * use to get the current theme if needed from static context
     *
     * @return string current theme set.
     */
    public static function get_current_theme(): string
    {
        return self::$_instance->template_settings instanceof EE_Template_Config
            ? self::$_instance->template_settings->current_espresso_theme
            : 'Espresso_Arabica_2014';
    }


    /**
     * @return void
     */
    private function _initialize_config()
    {
        EE_Config::trim_log();
        // set defaults
        $this->_addon_option_names = get_option(EE_Config::ADDON_OPTION_NAMES, []);
        $this->addons              = new stdClass();
    }


    /**
     * load core plugin configuration
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _load_core_config()
    {
        // load_core_config__start hook
        do_action('AHEE__EE_Config___load_core_config__start', $this);
        $espresso_config = (array) $this->get_espresso_config();
        // need to move the "addons" element to the end of the config array
        // in case an addon config references one of the other config classes
        $addons = $espresso_config['addons'] ?? new StdClass();
        unset($espresso_config['addons']);
        $espresso_config['addons'] = $addons;
        foreach ($espresso_config as $config => $settings) {
            // load_core_config__start hook
            $settings = apply_filters(
                'FHEE__EE_Config___load_core_config__config_settings',
                $settings,
                $config,
                $this
            );
            if (is_object($settings) && property_exists($this, $config)) {
                /** @var EE_Config_Base $config_object */
                $config_object = apply_filters('FHEE__EE_Config___load_core_config__' . $config, $settings);
                // call configs populate method to ensure any defaults are set for empty values.
                if (method_exists($config_object, 'populate')) {
                    $config_object->populate();
                }
                if (method_exists($config_object, 'do_hooks')) {
                    $config_object->do_hooks();
                }
                $this->{$config} = $config_object;
            }
        }
        if (apply_filters('FHEE__EE_Config___load_core_config__update_espresso_config', false)) {
            $this->update_espresso_config();
        }
        // load_core_config__end hook
        do_action('AHEE__EE_Config___load_core_config__end', $this);
    }


    /**
     * @return void
     */
    protected function _verify_config()
    {
        $this->core                      = $this->core instanceof EE_Core_Config
            ? $this->core
            : new EE_Core_Config();
        $this->core                      = apply_filters('FHEE__EE_Config___initialize_config__core', $this->core);
        $this->organization              = $this->organization instanceof EE_Organization_Config
            ? $this->organization
            : new EE_Organization_Config();
        $this->organization              = apply_filters(
            'FHEE__EE_Config___initialize_config__organization',
            $this->organization
        );
        $this->currency                  = $this->currency instanceof EE_Currency_Config
            ? $this->currency
            : new EE_Currency_Config();
        $this->currency                  =
            apply_filters('FHEE__EE_Config___initialize_config__currency', $this->currency);
        $this->registration              = $this->registration instanceof EE_Registration_Config
            ? $this->registration
            : new EE_Registration_Config();
        $this->registration              = apply_filters(
            'FHEE__EE_Config___initialize_config__registration',
            $this->registration
        );
        $this->admin                     = $this->admin instanceof EE_Admin_Config
            ? $this->admin
            : new EE_Admin_Config();
        $this->admin                     = apply_filters('FHEE__EE_Config___initialize_config__admin', $this->admin);
        $this->template_settings         = $this->template_settings instanceof EE_Template_Config
            ? $this->template_settings
            : new EE_Template_Config();
        $this->template_settings         = apply_filters(
            'FHEE__EE_Config___initialize_config__template_settings',
            $this->template_settings
        );
        $this->map_settings              = $this->map_settings instanceof EE_Map_Config
            ? $this->map_settings
            : new EE_Map_Config();
        $this->map_settings              = apply_filters(
            'FHEE__EE_Config___initialize_config__map_settings',
            $this->map_settings
        );
        $this->environment               = $this->environment instanceof EE_Environment_Config
            ? $this->environment
            : new EE_Environment_Config();
        $this->environment               = apply_filters(
            'FHEE__EE_Config___initialize_config__environment',
            $this->environment
        );
        $this->tax_settings              = $this->tax_settings instanceof EE_Tax_Config
            ? $this->tax_settings
            : new EE_Tax_Config();
        $this->tax_settings              = apply_filters(
            'FHEE__EE_Config___initialize_config__tax_settings',
            $this->tax_settings
        );
        $this->messages                  =
            apply_filters('FHEE__EE_Config__initialize_config__messages', $this->messages);
        $this->messages                  = $this->messages instanceof EE_Messages_Config
            ? $this->messages
            : new EE_Messages_Config();
        $this->gateway                   = $this->gateway instanceof EE_Gateway_Config
            ? $this->gateway
            : new EE_Gateway_Config();
        $this->gateway                   =
            apply_filters('FHEE__EE_Config___initialize_config__gateway', $this->gateway);
        $this->legacy_shortcodes_manager = null;
    }


    /**
     * @return mixed espresso config stuff
     */
    public function get_espresso_config()
    {
        // grab espresso configuration
        return apply_filters(
            'FHEE__EE_Config__get_espresso_config__CFG',
            get_option(EE_Config::OPTION_NAME, [])
        );
    }


    /**
     * @param string $option
     * @param mixed  $old_value
     * @param mixed  $value
     */
    public function double_check_config_comparison(string $option, $old_value, $value)
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
                remove_action('update_option', [$this, 'check_config_updated']);
            }
        }
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _reset_espresso_addon_config()
    {
        $this->_addon_option_names = [];
        foreach ($this->addons as $addon_name => $addon_config_obj) {
            $addon_config_obj = maybe_unserialize($addon_config_obj);
            if ($addon_config_obj instanceof EE_Config_Base) {
                $this->update_config('addons', $addon_name, $addon_config_obj, false);
            }
            $this->addons->{$addon_name} = null;
        }
    }


    /**
     * @param bool $add_success
     * @param bool $add_error
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_espresso_config(bool $add_success = false, bool $add_error = true): bool
    {
        // don't allow config updates during WP heartbeats
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        if ($request->isWordPressHeartbeat()) {
            return false;
        }
        // commented out the following re: https://events.codebasehq.com/projects/event-espresso/tickets/8197
        // $clone = clone( self::$_instance );
        // self::$_instance = NULL;
        do_action('AHEE__EE_Config__update_espresso_config__begin', $this);
        $this->_reset_espresso_addon_config();
        // hook into update_option because that happens AFTER the ( $value === $old_value ) conditional
        // but BEFORE the actual update occurs
        add_action('update_option', [$this, 'double_check_config_comparison'], 1, 3);
        // don't want to persist legacy_shortcodes_manager, but don't want to lose it either
        $legacy_shortcodes_manager       = $this->legacy_shortcodes_manager;
        $this->legacy_shortcodes_manager = null;
        // now update "ee_config"
        $saved                           = update_option(EE_Config::OPTION_NAME, $this);
        $this->legacy_shortcodes_manager = $legacy_shortcodes_manager;
        EE_Config::log(EE_Config::OPTION_NAME);
        // if not saved... check if the hook we just added still exists;
        // if it does, it means one of two things:
        // that update_option bailed at the($value === $old_value) conditional,
        // or...
        // the db update query returned 0 rows affected
        // (probably because the data  value was the same from its perspective)
        // so the existence of the hook means that a negative result from update_option is NOT an error,
        // but just means no update occurred, so don't display an error to the user.
        // BUT... if update_option returns FALSE, AND the hook is missing,
        // then it means that something truly went wrong
        $saved = ! $saved ? has_action('update_option', [$this, 'double_check_config_comparison']) : $saved;
        // remove our action since we don't want it in the system anymore
        remove_action('update_option', [$this, 'double_check_config_comparison'], 1);
        do_action('AHEE__EE_Config__update_espresso_config__end', $this, $saved);
        // self::$_instance = $clone;
        // unset( $clone );
        // if config remains the same or was updated successfully
        if ($saved) {
            if ($add_success) {
                EE_Error::add_success(
                    esc_html__(
                        'The Event Espresso Configuration Settings have been successfully updated.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return true;
        }
        if ($add_error) {
            EE_Error::add_error(
                esc_html__('The Event Espresso Configuration Settings were not updated.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return false;
    }


    /**
     * @param string              $section
     * @param string              $name
     * @param string              $config_class
     * @param EE_Config_Base|array|null $config_obj
     * @param array               $tests_to_run
     * @param bool                $display_errors
     * @return bool    TRUE on success, FALSE on fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _verify_config_params(
        string $section = '',
        string $name = '',
        string $config_class = '',
        $config_obj = null,
        array $tests_to_run = [1, 2, 3, 4, 5, 6, 7, 8],
        bool $display_errors = true
    ): bool {
        try {
            foreach ($tests_to_run as $test) {
                switch ($test) {
                    // TEST #1 : check that section was set
                    case 1:
                        if (empty($section)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__(
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
                    case 2:
                        if (! isset($this->{$section})) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__('The "%s" configuration section does not exist.', 'event_espresso'),
                                        $section
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #3 : check that section is the proper format
                    case 3:
                        if (
                            ! ($this->{$section} instanceof EE_Config_Base || $this->{$section} instanceof stdClass)
                        ) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__(
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
                    case 4:
                        if (empty($name)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    esc_html__(
                                        'No name has been provided for the specific configuration section.',
                                        'event_espresso'
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #5 : check that a config class name has been set
                    case 5:
                        if (empty($config_class)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    esc_html__(
                                        'No class name has been provided for the specific configuration section.',
                                        'event_espresso'
                                    )
                                );
                            }
                            return false;
                        }
                        break;
                    // TEST #6 : verify config class is accessible
                    case 6:
                        if (! class_exists($config_class)) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__(
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
                    case 7:
                        if (! isset($this->{$section}->{$name})) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__('No configuration has been set for "%1$s->%2$s".', 'event_espresso'),
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
                    case 8:
                        if (! $this->{$section}->{$name} instanceof $config_class) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__(
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
                    case 9:
                        if (! $config_obj instanceof EE_Config_Base) {
                            if ($display_errors) {
                                throw new EE_Error(
                                    sprintf(
                                        esc_html__(
                                            'The "%s" class is not an instance of EE_Config_Base.',
                                            'event_espresso'
                                        ),
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
     * @param string $section
     * @param string $name
     * @return string
     */
    private function _generate_config_option_name(string $section = '', string $name = ''): string
    {
        return 'ee_config-' . strtolower($section . '-' . str_replace(['EE_', 'EED_'], '', $name));
    }


    /**
     * ensures that a config class is set, either from a passed config class or one generated from the config name
     *
     * @param string $config_class
     * @param string $name
     * @return string
     */
    private function _set_config_class(string $config_class = '', string $name = ''): string
    {
        return ! empty($config_class)
            ? $config_class
            : str_replace(' ', '_', ucwords(str_replace('_', ' ', $name))) . '_Config';
    }


    /**
     * @param string              $section
     * @param string              $name
     * @param string              $config_class
     * @param EE_Config_Base|array|null $config_obj
     * @return EE_Config_Base|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_config(
        string $section = '',
        string $name = '',
        string $config_class = '',
        $config_obj = null
    ): ?EE_Config_Base {
        // ensure config class is set to something
        $config_class = $this->_set_config_class($config_class, $name);
        // run tests 1-4, 6, and 7 to verify all config params are set and valid
        if (! $this->_verify_config_params($section, $name, $config_class, null, [1, 2, 3, 4, 5, 6])) {
            return null;
        }
        $config_option_name = $this->_generate_config_option_name($section, $name);
        // if the config option name hasn't been added yet to the list of option names we're tracking, then do so now
        if (! isset($this->_addon_option_names[ $config_option_name ])) {
            $this->_addon_option_names[ $config_option_name ] = $config_class;
            $this->update_addon_option_names();
        }
        // verify the incoming config object but suppress errors
        if (! $this->_verify_config_params($section, $name, $config_class, $config_obj, [9], false)) {
            $config_obj = new $config_class();
        }
        if (get_option($config_option_name)) {
            EE_Config::log($config_option_name);
            try {
                update_option($config_option_name, $config_obj);
            } catch (Exception $exception) {
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'The following exception occurred while attempting to update the "%1$s" class for config section "%2$s->%3$s": %4$s',
                            'event_espresso'
                        ),
                        $config_class,
                        $section,
                        $name,
                        $exception->getMessage()
                    )
                );
            }
            $this->{$section}->{$name} = $config_obj;
            return $this->{$section}->{$name};
        } else {
            // create a wp-option for this config
            if (add_option($config_option_name, $config_obj, '', 'no')) {
                $this->{$section}->{$name} = maybe_unserialize($config_obj);
                return $this->{$section}->{$name};
            } else {
                EE_Error::add_error(
                    sprintf(
                        esc_html__('The "%s" could not be saved to the database.', 'event_espresso'),
                        $config_class
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return null;
            }
        }
    }


    /**
     * Important: the config object must ALREADY be set, otherwise this will produce an error.
     *
     * @param string                     $section
     * @param string                     $name
     * @param EE_Config_Base|string|null $config_obj
     * @param bool                       $throw_errors
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_config(
        string $section = '',
        string $name = '',
        $config_obj = '',
        bool $throw_errors = true
    ): bool {
        // don't allow config updates during WP heartbeats
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        if ($request->isWordPressHeartbeat()) {
            return false;
        }
        $config_obj = maybe_unserialize($config_obj);
        // get class name of the incoming object
        $config_class = get_class($config_obj);
        // run tests 1-5 and 9 to verify config
        if (
            ! $this->_verify_config_params(
                $section,
                $name,
                $config_class,
                $config_obj,
                [1, 2, 3, 4, 7, 9]
            )
        ) {
            return false;
        }
        $config_option_name = $this->_generate_config_option_name($section, $name);
        // check if config object has been added to db by seeing if config option name is in $this->_addon_option_names array
        if (! isset($this->_addon_option_names[ $config_option_name ])) {
            // save new config to db
            if ($this->set_config($section, $name, $config_class, $config_obj)) {
                return true;
            }
        } else {
            // first check if the record already exists
            $existing_config = get_option($config_option_name);
            $config_obj      = serialize($config_obj);
            // just return if db record is already up-to-date (NOT type safe comparison)
            if ($existing_config == $config_obj) {
                $this->{$section}->{$name} = $config_obj;
                return true;
            }
            if (update_option($config_option_name, $config_obj)) {
                EE_Config::log($config_option_name);
                // update wp-option for this config class
                $this->{$section}->{$name} = $config_obj;
                return true;
            }
            if ($throw_errors) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
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
     * @param string $section
     * @param string $name
     * @param string $config_class
     * @return EE_Config_Base|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_config(string $section = '', string $name = '', string $config_class = ''): ?EE_Config_Base
    {
        // ensure config class is set to something
        $config_class = $this->_set_config_class($config_class, $name);
        // run tests 1-4, 6 and 7 to verify that all params have been set
        if (! $this->_verify_config_params($section, $name, $config_class, null, [1, 2, 3, 4, 5, 6])) {
            return null;
        }
        // now test if the requested config object exists, but suppress errors
        if ($this->_verify_config_params($section, $name, $config_class, null, [7, 8], false)) {
            // config already exists, so pass it back
            return $this->{$section}->{$name};
        }
        // load config option from db if it exists
        $config_obj = $this->get_config_option($this->_generate_config_option_name($section, $name));
        // verify the newly retrieved config object, but suppress errors
        if ($this->_verify_config_params($section, $name, $config_class, $config_obj, [9], false)) {
            // config is good, so set it and pass it back
            $this->{$section}->{$name} = $config_obj;
            return $this->{$section}->{$name};
        }
        // oops! $config_obj is not already set and does not exist in the db, so create a new one
        $config_obj = $this->set_config($section, $name, $config_class);
        // verify the newly created config object
        if ($this->_verify_config_params($section, $name, $config_class, $config_obj, [9])) {
            return $this->{$section}->{$name};
        } else {
            EE_Error::add_error(
                sprintf(
                    esc_html__('The "%s" could not be retrieved from the database.', 'event_espresso'),
                    $config_class
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return null;
    }


    /**
     * @param string $config_option_name
     * @return EE_Config_Base|array
     */
    public function get_config_option(string $config_option_name = '')
    {
        // retrieve the wp-option for this config class.
        $config_option = maybe_unserialize(get_option($config_option_name, []));
        if (empty($config_option)) {
            EE_Config::log($config_option_name . '-NOT-FOUND');
        }
        return $config_option;
    }


    /**
     * @param string $config_option_name
     */
    public static function log(string $config_option_name = '')
    {
        if (EE_Config::logging_enabled() && ! empty($config_option_name)) {
            $config_log = get_option(EE_Config::LOG_NAME, []);
            /** @var RequestParams $request */
            $request = LoaderFactory::getLoader()->getShared(RequestParams::class);
            $config_log[ (string) microtime(true) ] = [
                'config_name' => $config_option_name,
                'request'     => $request->requestParams(),
            ];
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
        $config_log = maybe_unserialize(get_option(EE_Config::LOG_NAME, []));
        $log_length = count($config_log);
        if ($log_length > EE_Config::LOG_LENGTH) {
            ksort($config_log);
            $config_log = array_slice($config_log, $log_length - EE_Config::LOG_LENGTH, null, true);
            update_option(EE_Config::LOG_NAME, $config_log);
        }
    }


    public function update_addon_option_names()
    {
        update_option(EE_Config::ADDON_OPTION_NAMES, $this->_addon_option_names);
    }


    public function shutdown()
    {
        $this->update_addon_option_names();
    }


    public static function getLegacyShortcodesManager(): LegacyShortcodesManager
    {
        if (! EE_Config::instance()->legacy_shortcodes_manager instanceof LegacyShortcodesManager) {
            EE_Config::instance()->legacy_shortcodes_manager = LoaderFactory::getLoader()->getShared(
                LegacyShortcodesManager::class
            );
        }
        return EE_Config::instance()->legacy_shortcodes_manager;
    }


    public static function getModuleRoutesManager(): ?ModuleRoutesManager
    {
        if (! EE_Config::instance()->module_routes_manager instanceof ModuleRoutesManager) {
            EE_Config::instance()->module_routes_manager = LoaderFactory::getLoader()->getShared(
                ModuleRoutesManager::class
            );
        }
        return EE_Config::instance()->module_routes_manager;
    }


    /**
     * register_shortcode - makes core aware of this shortcode
     *
     * @param string $shortcode_path - full path up to and including shortcode folder
     * @return bool
     * @deprecated 4.9.26
     */
    public static function register_shortcode($shortcode_path = null)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use \EventEspresso\core\services\shortcodes\LegacyShortcodesManager::registerShortcode() as direct replacement, or better yet, please see the new \EventEspresso\core\services\shortcodes\ShortcodesManager class.',
                'event_espresso'
            ),
            '4.9.26'
        );
        return EE_Config::instance()->getLegacyShortcodesManager()->registerShortcode($shortcode_path);
    }


    /**
     * @return string|null
     * @deprecated 5.0.21.p
     */
    public static function get_page_for_posts(): ?string
    {
        return EE_Config::getLegacyShortcodesManager()->getPageForPosts();
    }


    /**
     * @return void
     * @deprecated 5.0.21.p
     */
    public function register_shortcodes_and_modules()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\shortcodes\LegacyShortcodesManager::registerShortcode() or EventEspresso\core\services\modules\LegacyModulesManager::registerModule() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
    }


    /**
     * @return void
     * @deprecated 5.0.21.p
     */
    public function initialize_shortcodes_and_modules()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\shortcodes\LegacyShortcodesManager::initializeShortcodes() or EventEspresso\core\services\modules\LegacyModulesManager::initializeModules() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
    }


    /**
     * @param string $module_path - full path up to and including module folder
     * @return bool
     * @deprecated 5.0.21.p
     */
    public static function register_module($module_path = '')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\LegacyModulesManager::registerModule() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        /** @var LegacyModulesManager $legacy_modules_manager */
        $legacy_modules_manager = LoaderFactory::getShared(LegacyModulesManager::class);
        return $legacy_modules_manager->registerModule((string) $module_path);
    }


    /**
     * @return void
     * @deprecated 5.0.21.p
     */
    public function widgets_init()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\widgets\LegacyWidgetsManager::widgetsInit() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        /** @var LegacyWidgetsManager $legacy_widgets_manager */
        $legacy_widgets_manager = LoaderFactory::getShared(LegacyWidgetsManager::class);
        $legacy_widgets_manager->widgetsInit();
    }


    /**
     * @param string $widget_path - full path up to and including widget folder
     * @return void
     * @deprecated 5.0.21.p
     */
    public static function register_ee_widget($widget_path = '')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\widgets\LegacyWidgetsManager::registerWidget() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        /** @var LegacyWidgetsManager $legacy_widgets_manager */
        $legacy_widgets_manager = LoaderFactory::getShared(LegacyWidgetsManager::class);
        $legacy_widgets_manager->registerWidget((string) $widget_path);
    }


    /**
     * @param string $route       - "pretty" public alias for module method
     * @param string $module      - module name (classname without EED_ prefix)
     * @param string $method_name - the actual module method to be routed to
     * @param string $key         - url param key indicating a route is being called
     * @return bool
     * @deprecated 5.0.21.p
     */
    public static function register_route($route = '', $module = '', $method_name = '', $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::registerRoute() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        return EE_Config::getModuleRoutesManager()->registerRoute(
            (string) $route,
            (string) $module,
            (string) $method_name,
            (string) $key
        );
    }


    /**
     * @param string $route - "pretty" public alias for module method
     * @param string $key   - url param key indicating a route is being called
     * @return array
     * @deprecated 5.0.21.p
     */
    public static function get_route($route = '', $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::getRoute() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        return EE_Config::getModuleRoutesManager()->getRoute((string) $route, (string) $key);
    }


    /**
     * @return array
     * @deprecated 5.0.21.p
     */
    public static function get_routes()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::getRoutes() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        return EE_Config::getModuleRoutesManager()->getRoutes();
    }


    /**
     * @param string       $route      - "pretty" public alias for module method
     * @param integer      $status     - integer value corresponding  to status constant strings set in module parent
     *                                 class, allows different forwards to be served based on status
     * @param array|string $forward    - function name or array( class, method )
     * @param string       $key        - url param key indicating a route is being called
     * @return bool
     * @deprecated 5.0.21.p
     */
    public static function register_forward($route = '', $status = 0, $forward = '', $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::registerForward() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        return EE_Config::getModuleRoutesManager()->registerForward(
            (string) $forward,
            (string) $route,
            (string) $key,
            (int) $status
        );
    }


    /**
     * @param string  $route     - "pretty" public alias for module method
     * @param integer $status    - integer value corresponding  to status constant strings set in module parent class,
     *                           allows different forwards to be served based on status
     * @param string  $key       - url param key indicating a route is being called
     * @return string
     * @deprecated 5.0.21.p
     */
    public static function get_forward($route = '', $status = 0, $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::getForward() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        if (is_array($route) && isset($route[0], $route[1])) {
            $key   = $route[0];
            $route = $route[1];
        }
        return EE_Config::getModuleRoutesManager()->getForward((string) $route, (string) $key, (int) $status);
    }


    /**
     * @param string  $route     - "pretty" public alias for module method
     * @param integer $status    - integer value corresponding  to status constant strings set in module parent class,
     *                           allows different views to be served based on status
     * @param string  $view
     * @param string  $key       - url param key indicating a route is being called
     * @return bool
     * @deprecated 5.0.21.p
     */
    public static function register_view($route = '', $status = 0, $view = '', $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::registerView() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        return EE_Config::getModuleRoutesManager()->registerView(
            (string) $view,
            (string) $route,
            (string) $key,
            (int) $status
        );
    }


    /**
     * @param array|string|null $route  - "pretty" public alias for module method
     * @param integer           $status - integer value corresponding  to status constant strings set in module parent
     *                                  class, allows different views to be served based on status
     * @param string            $key    - url param key indicating a route is being called
     * @return string
     * @deprecated 5.0.21.p
     */
    public static function get_view($route = '', $status = 0, $key = 'ee')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'Usage is deprecated. Use EventEspresso\core\services\modules\ModuleRoutesManager::getView() as direct replacement.',
                'event_espresso'
            ),
            '5.0.21.p',
            '5.5.0'
        );
        if (is_array($route) && isset($route[0], $route[1])) {
            $key   = $route[0];
            $route = $route[1];
        }
        return EE_Config::getModuleRoutesManager()->getView((string) $route, (string) $key, (int) $status);
    }
}
