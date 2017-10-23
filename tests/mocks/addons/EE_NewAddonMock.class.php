<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

/**
 * EE_NewAddonMock
 * Mock class for an addon.
 *
 * @package EventEspresso
 * @subpackage \tests\mocks\addons
 * @author  Darren Ethier
 * @since   1.0.0
 */
class EE_NewAddonMock extends EE_Addon
{

    /**
     * Holds cached copy of options.
     * @var array
     */
    private static $options = array();

    /**
     * Holds cached copy of the given name for the addon.
     * @var string
     */
    private static $addon_name = '';

    /**
     * This allows for triggering registration with specific options.
     *
     * @param string $addon_name
     * @param array  $options
     */
    public static function registerWithGivenOptions($addon_name = 'EE_NewAddonMock', $options = array())
    {
        self::$options = array_merge(self::baseOptions(), $options);
        self::$addon_name = $addon_name;
        self::register_addon();
    }


    /**
     * Main method used for registering the addon.
     */
    public static function register_addon()
    {
        EE_Register_Addon::register(
            self::$addon_name,
            self::$options
        );
    }


    /**
     * @return array
     */
    private static function baseOptions()
    {
        return array(
            'class_name' => 'EE_NewAddonMock',
            'plugin_slug' => 'eea-new-addon-mock',
            'min_core_version' => '4.0.0',
            'version' => '1.0.0.rc.000',
            'main_file_path' => __FILE__,
            'pue_options' => true
        );
    }



    /**
     * @return array
     */
    public static function getCurrentOptions()
    {
        return self::$options;
    }


    /**
     * @return string
     */
    public static function getCurrentName()
    {
        return self::$addon_name;
    }
}
