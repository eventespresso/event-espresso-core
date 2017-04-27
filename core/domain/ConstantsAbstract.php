<?php

namespace EventEspresso\core\domain;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');

abstract class ConstantsAbstract
{
    /**
     * Equivalent to `__FILE__` for main plugin file.
     * @var string
     */
    private static $plugin_file ='';


    /**
     * String indicating version for plugin
     * @var string
     */
    private static $version = '';


    /**
     * Initializes internal static properties.
     * @param $plugin_file
     * @param $version
     */
    public static function init($plugin_file, $version)
    {
        self::$plugin_file = $plugin_file;
        self::$version     = $version;
    }


    /**
     * @return string
     */
    public static function pluginFile()
    {
        return self::$plugin_file;
    }

    /**
     * @return string
     */
    public static function pluginBasename()
    {
        return plugin_basename(self::$plugin_file);
    }

    /**
     * @return string
     */
    public static function pluginPath()
    {
        return plugin_dir_path(self::$plugin_file);
    }


    /**
     * @return string
     */
    public static function pluginUrl()
    {
        return plugin_dir_url(self::$plugin_file);
    }


    /**
     * @return string
     */
    public static function version()
    {
        return self::$version;
    }

}