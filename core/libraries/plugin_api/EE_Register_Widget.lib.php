<?php

/**
 * Class EE_Register_Widget
 *
 * EEI_Plugin_API class for registering Widgets for use with EE core.
 * Receives an array of Widget details and takes care of adding all of the necessary hooks and filters to integrate
 * with EE core
 *
 * @package               Event Espresso
 * @subpackage            plugin api
 * @since                 4.3.0
 * @author                Brent Christensen
 */
class EE_Register_Widget implements EEI_Plugin_API
{

    /**
     * Holds values for registered widgets
     *
     * @var array
     */
    protected static $_settings = [];


    /**
     *    Method for registering new EED_Widgets
     *
     * @param string $identifier a unique identifier for this set of widgets
     * @param array  $setup_args an array of arguments provided for registering widgets
     * @type array widget_paths        an array of full server paths to folders containing any EED_Widgets, or to the
     *                           EED_Widget files themselves
     * @return void
     * @throws EE_Error
     * @since    4.3.0
     */
    public static function register($identifier = '', array $setup_args = [])
    {

        // required fields MUST be present, so let's make sure they are.
        if (empty($identifier) || ! is_array($setup_args) || empty($setup_args['widget_paths'])) {
            throw new EE_Error(
                __(
                    'In order to register Widgets with EE_Register_Widget::register(), you must include a "widget_id" (a unique identifier for this set of widgets), and an array containing the following keys: "widget_paths" (an array of full server paths to folders that contain widgets, or to the widget files themselves)',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_settings[ $identifier ])) {
            return;
        }


        // make sure this was called in the right place!
        if (
            ! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System__register_shortcodes_modules_and_widgets')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                __(
                    'An attempt to register widgets has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register widgets.',
                    'event_espresso'
                ),
                '4.3.0'
            );
        }
        // setup $_settings array from incoming values.
        self::$_settings[ $identifier ] = [
            // array of full server paths to any EED_Widgets used by the widget
            'widget_paths' => isset($setup_args['widget_paths']) ? (array) $setup_args['widget_paths'] : [],
        ];
        // add to list of widgets to be registered
        add_filter(
            'FHEE__EE_Config__register_widgets__widgets_to_register',
            ['EE_Register_Widget', 'add_widgets']
        );
    }


    /**
     * Filters the list of widgets to add ours.
     * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
     * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/widgets/espresso_monkey'...)
     *
     * @param array $widgets_to_register array of paths to all widgets that require registering
     * @return array
     */
    public static function add_widgets(array $widgets_to_register = [])
    {
        foreach (self::$_settings as $settings) {
            $widgets_to_register = array_merge($widgets_to_register, $settings['widget_paths']);
        }
        return $widgets_to_register;
    }


    /**
     * This deregisters a widget that was previously registered with a specific $identifier.
     *
     * @param string $identifier the name for the widget that was previously registered
     * @return void
     * @since    4.3.0
     *
     */
    public static function deregister($identifier = '')
    {
        unset(self::$_settings[ $identifier ]);
    }
}
