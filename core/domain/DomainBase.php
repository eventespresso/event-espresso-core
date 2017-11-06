<?php

namespace EventEspresso\core\domain;

use DomainException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');


/**
 * DomainBase Class
 * A container for all domain data related to the plugin
 *
 * @package EventEspresso\core\domain
 * @author  Darren Ethier
 * @since   4.9.38
 */
abstract class DomainBase implements DomainInterface
{

    /**
     * Equivalent to `__FILE__` for main plugin file.
     *
     * @var string
     */
    private $plugin_file;

    /**
     * String indicating version for plugin
     *
     * @var string
     */
    private $version;

    /**
     * @var string $plugin_basename
     */
    private $plugin_basename;

    /**
     * @var string $plugin_path
     */
    private $plugin_path;

    /**
     * @var string $plugin_url
     */
    private $plugin_url;



    /**
     * Initializes internal properties.
     *
     * @param string $plugin_file
     * @param string $version
     * @throws InvalidArgumentException
     */
    public function __construct($plugin_file, $version)
    {
        $this->setPluginFile($plugin_file);
        $this->setVersion($version);
        $this->plugin_basename = plugin_basename($plugin_file);
        $this->plugin_path = plugin_dir_path($plugin_file);
        $this->plugin_url = plugin_dir_url($plugin_file);
    }


    /**
     * @param string $plugin_file
     * @throws InvalidArgumentException
     */
    private function setPluginFile($plugin_file)
    {
        if(empty($plugin_file) || ! is_string($plugin_file)){
            throw new InvalidArgumentException(
                esc_html__(
                    'You need to supply a path to the addon plugin file in order to generate a Domain class',
                    'event_espresso'
                )
            );
        }
        if(! is_readable($plugin_file)){
            throw new InvalidArgumentException(
                esc_html__(
                    'You need to supply a valid path to the addon plugin file in order to generate a Domain class',
                    'event_espresso'
                )
            );
        }
        $this->plugin_file = $plugin_file;
    }


    /**
     * @param string $version
     * @throws InvalidArgumentException
     */
    private function setVersion($version)
    {
        if (empty($version) || ! is_string($version)) {
            throw new InvalidArgumentException(
                esc_html__(
                    'You need to supply a version string in order to generate a Domain class',
                    'event_espresso'
                )
            );
        }
        if (strpos($version, '.') === false) {
            throw new InvalidArgumentException(
                esc_html__(
                    'You need to supply a valid version string in order to generate a Domain class',
                    'event_espresso'
                )
            );
        }
        $this->version = $version;
    }


    /**
     * @return string
     * @throws DomainException
     */
    public function pluginFile()
    {
        return $this->plugin_file;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public function pluginBasename()
    {
        return $this->plugin_basename;
    }



    /**
     * @return string
     */
    public function pluginPath()
    {
        return $this->plugin_path;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public function pluginUrl()
    {
        return $this->plugin_url;
    }



    /**
     * @return string
     * @throws DomainException
     */
    public function version()
    {
        return $this->version;
    }


}
