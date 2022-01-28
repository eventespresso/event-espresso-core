<?php

/**
 * Class EE_Register_Module
 *
 * EEI_Plugin_API class for registering modules for use with EE core.
 * Receives an array of module details and takes care of adding all of the necessary hooks and filters to integrate
 * with EE core
 *
 * @package               Event Espresso
 * @subpackage            plugin api
 * @since                 4.3.0
 * @author                Brent Christensen
 */
class EE_Register_Module implements EEI_Plugin_API
{

    /**
     * Holds values for registered modules
     *
     * @var array
     */
    protected static $_settings = [];


    /**
     *    Method for registering new EED_Modules
     *
     * @param string $addon_name a unique identifier for this set of modules Required.
     * @param array  $setup_args an array of full server paths to folders containing any EED_Modules, or to the
     *                           EED_Module files themselves Required.
     * @type    array module_paths    an array of full server paths to folders containing any EED_Modules, or to the
     *                           EED_Module files themselves
     * @return bool
     * @throws EE_Error
     * @since    4.3.0
     */
    public static function register(string $addon_name = '', array $setup_args = []): bool
    {
        // required fields MUST be present, so let's make sure they are.
        if (empty($addon_name) || ! is_array($setup_args) || empty($setup_args['module_paths'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register Modules with EE_Register_Module::register(), you must include a "module_id" (a unique identifier for this set of modules), and an array containing the following keys: "module_paths" (an array of full server paths to folders that contain modules, or to the module files themselves)',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_settings[ $addon_name ])) {
            return true;
        }

        // make sure this was called in the right place!
        if (
            ! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System__register_shortcodes_modules_and_widgets')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                esc_html__(
                    'An attempt to register modules has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register modules.',
                    'event_espresso'
                ),
                '4.3.0'
            );
        }
        // setup $_settings array from incoming values.
        self::$_settings[ $addon_name ] = [
            // array of full server paths to any EED_Modules used by the module
            'module_paths' => isset($setup_args['module_paths']) ? (array) $setup_args['module_paths'] : [],
        ];
        // add to list of modules to be registered
        add_filter(
            'FHEE__EE_Config__register_modules__modules_to_register',
            ['EE_Register_Module', 'add_modules']
        );
        return true;
    }


    /**
     * Filters the list of modules to add ours.
     * and they're just full filepaths to FOLDERS containing a module class file. Eg.
     * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/shortcodes/espresso_monkey'...)
     *
     * @param array $modules_to_register array of paths to all modules that require registering
     * @return array
     */
    public static function add_modules(array $modules_to_register): array
    {
        $module_paths = [];
        foreach (self::$_settings as $settings) {
            $module_paths[] = $settings['module_paths'];
        }
        return array_merge($modules_to_register, ...$module_paths);
    }


    /**
     * This deregisters a module that was previously registered with a specific $addon_name.
     *
     * @param string $addon_name the name for the module that was previously registered
     * @return void
     * @since    4.3.0
     */
    public static function deregister(string $addon_name = '')
    {
        unset(self::$_settings[ $addon_name ]);
    }
}
