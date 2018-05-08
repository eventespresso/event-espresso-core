<?php

/**
 * Class EE_Register_Data_Migration_Scripts
 * EEI_Plugin_API class for registering addons for use with EE core.
 * Receives an array of addon details and takes care of adding all of the necessary hooks and filters to setup things
 * such as autoloaders, configuration settings, data migration scripts, admin pages, modules, shortcodes, and even
 * widgets
 *
 * @package     Event Espresso
 * @subpackage  plugin api
 * @since       4.3.0
 * @author      Brent Christensen
 */
class EE_Register_Data_Migration_Scripts implements EEI_Plugin_API
{

    /**
     * Holds values for registered DMSs
     *
     * @var array[][]
     */
    protected static $_settings = array();


    /**
     * Method for registering new Data Migration Scripts
     *
     * @since 4.3.0
     * @param string $addon_name EE_Addon class name that this set of data migration scripts belongs to
     *                           If EE_Addon class is namespaced, then this needs to be the Fully Qualified Class Name
     * @param array  $setup_args {
     * @type string  $dms_paths  an array of full server paths to folders that contain data migration scripts
     *                           }
     * @throws EE_Error
     * @return void
     */
    public static function register($addon_name = '', $setup_args = array())
    {
        // required fields MUST be present, so let's make sure they are.
        if (empty($addon_name) || ! is_array($setup_args) || empty($setup_args['dms_paths'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register Data Migration Scripts with EE_Register_Data_Migration_Scripts::register(), you must include the EE_Addon class name (used as a unique identifier for this set of data migration scripts), and an array containing the following keys: "dms_paths" (an array of full server paths to folders that contain data migration scripts)',
                    'event_espresso'
                )
            );
        }
        // make sure we don't register twice
        if (isset(self::$_settings[ $addon_name ])) {
            return;
        }
        // make sure this was called in the right place!
        if (! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                esc_html__(
                    'An attempt to register Data Migration Scripts has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register Data Migration Scripts.',
                    'event_espresso'
                ),
                '4.3.0'
            );
        }
        // setup $_settings array from incoming values.
        self::$_settings[ $addon_name ] = array(
            'dms_paths' => (array) $setup_args['dms_paths'],
        );
        // setup DMS
        add_filter(
            'FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders',
            array('EE_Register_Data_Migration_Scripts', 'add_data_migration_script_folders')
        );
    }


    /**
     * @param array $dms_paths
     * @return array
     */
    public static function add_data_migration_script_folders($dms_paths = array())
    {
        foreach (self::$_settings as $addon_name => $settings) {
            $wildcards = 0;
            foreach ($settings['dms_paths'] as $dms_path) {
                // since we are using the addon name for the array key
                // we need to ensure that the key is unique,
                // so if for some reason an addon has multiple dms paths,
                // we append one or more * to the classname
                // which will get stripped out later on
                $dms_paths[ $addon_name . str_repeat('*', $wildcards) ] = $dms_path;
                $wildcards++;
            }
        }
        return $dms_paths;
    }


    /**
     * This deregisters a set of Data Migration Scripts that were previously registered with a specific dms_id
     *
     * @since 4.3.0
     * @param string $addon_name EE_Addon class name that this set of data migration scripts belongs to
     * @return void
     */
    public static function deregister($addon_name = '')
    {
        unset(self::$_settings[ $addon_name ]);
    }
}
