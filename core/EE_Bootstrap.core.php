<?php

/**
 * Class EE_Bootstrap
 * Just a frame for attaching the rest of the system to
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 *
 */
class EE_Bootstrap
{


    /**
     * load_espresso_addons
     * runs during the WP 'plugins_loaded' action at priority 1
     * and is the initial loading phase for EE addons
     * no other logic should be performed at this point
     */
    public static function load_espresso_addons()
    {
        do_action('AHEE__EE_Bootstrap__load_espresso_addons');
    }


    /**
     * detect_activations_or_upgrades
     * runs during the WP 'plugins_loaded' action at priority 3
     * Now that all of the addons have been loaded,
     * we can determine if anything needs activating or upgrading
     */
    public static function detect_activations_or_upgrades()
    {
        do_action('AHEE__EE_Bootstrap__detect_activations_or_upgrades');
    }


    /**
     * load_core_configuration
     * runs during the WP 'plugins_loaded' action at priority 5
     * Now that the database is assumed to be at the correct version
     * we can load and set all of the system configurations
     */
    public static function load_core_configuration()
    {
        do_action('AHEE__EE_Bootstrap__load_core_configuration');
    }


    /**
     * register_shortcodes_modules_and_widgets
     * runs during the WP 'plugins_loaded' action at priority 7
     * and handles registering all o four shortcodes, modules and widgets
     * so that they are ready to be used throughout the system
     */
    public static function register_shortcodes_modules_and_widgets()
    {
        do_action('AHEE__EE_Bootstrap__register_shortcodes_modules_and_widgets');
    }


    /**
     * brew_espresso
     * runs during the WP 'plugins_loaded' action at priority 9
     * bootstrapping is considered complete at this point,
     * so let the fun begin...
     */
    public static function brew_espresso()
    {
        do_action('AHEE__EE_Bootstrap__brew_espresso');
    }


    /**
     * @deprecated 4.9.53
     */
    public function run_request_stack()
    {
    }


    /**
     * @deprecated 4.9.53
     */
    public function build_request_stack()
    {
    }
}
