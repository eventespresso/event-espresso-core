<?php

namespace EventEspresso\core\domain;

use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\services\assets\Registry;

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
     * @var FilePath
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
     * @var string $asset_namespace
     */
    private $asset_namespace;



    /**
     * Initializes internal properties.
     *
     * @param FilePath $plugin_file
     * @param Version  $version
     */
    public function __construct(FilePath $plugin_file, Version $version)
    {
        $this->plugin_file = $plugin_file;
        $this->version = $version;
        $this->plugin_basename = plugin_basename($this->pluginFile());
        $this->plugin_path = plugin_dir_path($this->pluginFile());
        $this->plugin_url = plugin_dir_url($this->pluginFile());
        $this->setAssetNamespace();
    }


    /**
     * @return string
     */
    public function pluginFile()
    {
        return (string) $this->plugin_file;
    }



    /**
     * @return string
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
     */
    public function pluginUrl()
    {
        return $this->plugin_url;
    }



    /**
     * @return string
     */
    public function version()
    {
        return (string) $this->version;
    }



    /**
     * @return Version
     */
    public function versionValueObject()
    {
        return $this->version;
    }


    /**
     * @return string
     */
    public function distributionAssetsPath()
    {
        return $this->pluginPath() . 'assets/dist/';
    }


    /**
     * @return string
     */
    public function distributionAssetsUrl()
    {
        return $this->pluginUrl() . 'assets/dist/';
    }


    /**
     * @return string
     */
    public function assetNamespace()
    {
        return $this->asset_namespace;
    }


    /**
     * @return void
     */
    private function setAssetNamespace()
    {
        $this->asset_namespace = sanitize_key(
            // convert directory separators to dashes and remove file extension
            str_replace(array('/', '.php'), array('-', ''), $this->plugin_basename)
        );
    }
}
