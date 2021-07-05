<?php

/**
 * EE_Register_Model_Extensions
 *
 * @since      4.3.0
 *
 * @package    Event Espresso
 * @subpackage plugin api
 * @author     Darren Ethier
 */
class EE_Register_Model_Extensions implements EEI_Plugin_API
{
    protected static $_registry;

    protected static $_extensions = [];


    /**
     * register method for setting up model extensions
     *
     * @param string $addon_name            unique id for the extensions being setup
     * @param array  $setup_args            {
     * @return bool
     * @throws EE_Error
     * @type  array  $model_extension_paths array of folders containing DB model extensions, where each file follows
     *                                      the models naming convention, which is:
     *                                      EEME_{your_plugin_slug}_model_name_extended}.model_ext.php.
     *                                      Where {your_plugin_slug} is really anything you want (but something having
     *                                      to do with your addon, like 'Calendar' or '3D_View') and
     *                                      model_name_extended} is the model extended.
     *                                      The class contained in teh file should extend
     *                                      EEME_Base_{model_name_extended}.model_ext.php.
     *                                      Where {your_plugin_slug} is really anything you want (but something
     *                                      having to do with your addon, like 'Calendar' or '3D_View') and
     *                                      {model_name_extended} is the model extended. The class contained in teh
     *                                      file should extend EEME_Base
     * @type array   $class_extension_paths array of folders containing DB class extensions, where each file follows
     *                                      the model class extension naming convention, which is:
     *                                      EEE_{your_plugin_slug}_model_name_extended}.class_ext.php.
     *                                      Where {your_plugin_slug} is something like 'Calendar','MailChimp',etc,
     *                                      and model_name_extended} is the name of the model extended, eg
     *                                      'Attendee','Event',etc.
     *                                      The class contained in the file should extend EEE_Base_Class
     *                                      ._{model_name_extended}.class_ext.php.
     *                                      Where {your_plugin_slug} is something like 'Calendar','MailChimp',etc,
     *                                      and {model_name_extended} is the name of the model extended, eg
     *                                      'Attendee','Event',etc. The class contained in the file should extend
     *                                      EEE_Base_Class.
     *                                      }
     *
     */
    public static function register(string $addon_name = '', array $setup_args = []): bool
    {
        // required fields MUST be present, so let's make sure they are.
        if (
            empty($addon_name)
            || ! is_array($setup_args)
            || (
                empty($setup_args['model_extension_paths'])
                && empty($setup_args['class_extension_paths'])
            )
        ) {
            throw new EE_Error(
                __(
                    'In order to register Model extensions with EE_Register_Model_Extensions::register(), you must include a "model_id" (a unique identifier for this set of models), and an array containing the following keys: "model_extension_paths" (an array of full server paths to folders that contain model extensions), and "class_extension_paths" (an array of full server paths to folders that contain class extensions)',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_registry[ $addon_name ])) {
            return true;
        }
        // check correct loading
        if (! did_action('AHEE__EE_System__load_espresso_addons') || did_action('AHEE__EE_Admin__loaded')) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    __(
                        'An attempt was made to register "%1$s" as a Model extension has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register models.%2$s Hook Status: %2$s "AHEE__EE_System__load_espresso_addons" : %3$s %2$s "AHEE__EE_Admin__loaded" : %4$s%2$s',
                        'event_espresso'
                    ),
                    $addon_name,
                    '<br />',
                    did_action('AHEE__EE_System__load_espresso_addons') ? 'action done' : 'action NOT done',
                    did_action('AHEE__EE_Admin__loaded') ? 'action done' : 'action NOT done'
                ),
                '4.3'
            );
        }

        self::$_registry[ $addon_name ]   = $setup_args;
        self::$_extensions[ $addon_name ] = [];

        if (isset($setup_args['model_extension_paths'])) {
            require_once(EE_LIBRARIES . 'plugin_api/db/EEME_Base.lib.php');
            $class_to_filepath_map = EEH_File::get_contents_of_folders($setup_args['model_extension_paths']);
            // remove all files that are not PHP
            foreach ($class_to_filepath_map as $class => $path) {
                if (substr($path, strlen($path) - 3) !== 'php') {
                    unset($class_to_filepath_map[ $class ]);
                }
            }
            EEH_Autoloader::register_autoloader($class_to_filepath_map);
            foreach (array_keys($class_to_filepath_map) as $classname) {
                self::$_extensions[ $addon_name ]['models'][ $classname ] = new $classname();
            }
            unset($setup_args['model_extension_paths']);
        }
        if (isset($setup_args['class_extension_paths'])) {
            require_once(EE_LIBRARIES . 'plugin_api/db/EEE_Base_Class.lib.php');
            $class_to_filepath_map = EEH_File::get_contents_of_folders($setup_args['class_extension_paths']);
            EEH_Autoloader::register_autoloader($class_to_filepath_map);
            foreach (array_keys($class_to_filepath_map) as $classname) {
                self::$_extensions[ $addon_name ]['classes'][ $classname ] = new $classname();
            }
            unset($setup_args['class_extension_paths']);
        }
        foreach ($setup_args as $unknown_key => $unknown_config) {
            throw new EE_Error(
                sprintf(__("The key '%s' is not a known key for registering a model", "event_espresso"), $unknown_key)
            );
        }
        return true;
    }


    /**
     * deregister
     *
     * @param string $addon_name
     */
    public static function deregister(string $addon_name = '')
    {
        if (isset(self::$_registry[ $addon_name ])) {
            unset(self::$_registry[ $addon_name ]);
            foreach (self::$_extensions[ $addon_name ] as $extension_of_type) {
                foreach ($extension_of_type as $extension) {
                    $extension->deregister();
                }
            }
        }
    }
}
