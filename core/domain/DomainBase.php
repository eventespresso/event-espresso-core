<?php

namespace EventEspresso\core\domain;

use DomainException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');


/**
 * DomainBase Class
 * A container for all domain data related to the plugin
 *
 * @package EventEspresso\core\domain
 * @author  Darren Ethier
 * @since   4.9.38
 */
abstract class DomainBase
{

    /**
     * Equivalent to `__FILE__` for main plugin file.
     *
     * @var string
     */
    private static $plugin_file = '';

    /**
     * String indicating version for plugin
     *
     * @var string
     */
    private static $version = '';

    /**
     * @var string $plugin_basename
     */
    private static $plugin_basename = '';

    /**
     * @var string $plugin_path
     */
    private static $plugin_path = '';

    /**
     * @var string $plugin_url
     */
    private static $plugin_url = '';



    /**
     * Initializes internal static properties.
     *
     * @param string $plugin_file
     * @param string $version
     */
    public static function init($plugin_file, $version)
    {
        self::$plugin_file = $plugin_file;
        self::$version = $version;
        self::$plugin_basename = plugin_basename($plugin_file);
        self::$plugin_path = plugin_dir_path($plugin_file);
        self::$plugin_url = plugin_dir_url($plugin_file);
    }



    /**
     * @return string
     * @throws DomainException
     */
    public static function pluginFile()
    {
        self::verifyInitialized(__METHOD__);
        return self::$plugin_file;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public static function pluginBasename()
    {
        self::verifyInitialized(__METHOD__);
        return self::$plugin_basename;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public static function pluginPath()
    {
        self::verifyInitialized(__METHOD__);
        return self::$plugin_path;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public static function pluginUrl()
    {
        self::verifyInitialized(__METHOD__);
        return self::$plugin_url;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public static function version()
    {
        self::verifyInitialized(__METHOD__);
        return self::$version;
    }



    /**
     * @param string $method
     * @throws DomainException
     */
    private static function verifyInitialized($method)
    {
        if (self::$plugin_file === '') {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        '%1$s needs to be called before %2$s can return a value.',
                        'event_espresso'
                    ),
                    get_called_class() . '::init()',
                    "{$method}()"
                )
            );
        }
    }

}
