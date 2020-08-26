<?php

namespace EventEspresso\core\domain;

use DomainException;
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

    const DISTRIBUTION_ASSETS_FOLDER = 'assets/dist/';

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
     * @var string $assets_path
     */
    private $assets_path;


    /**
     * Initializes internal properties.
     *
     * @param FilePath $plugin_file
     * @param Version  $version
     * @param string $asset_namespace
     */
    public function __construct(FilePath $plugin_file, Version $version, $asset_namespace = 'eventespresso')
    {
        $this->plugin_file = $plugin_file;
        $this->version     = $version;
        $this->initialize($asset_namespace);
    }


    /**
     * @param string $asset_namespace
     * @return void
     * @since $VID:$
     */
    public function initialize($asset_namespace = 'eventespresso')
    {
        $this->plugin_basename = plugin_basename($this->pluginFile());
        $this->plugin_path     = plugin_dir_path($this->pluginFile());
        $this->plugin_url      = plugin_dir_url($this->pluginFile());
        $this->setAssetNamespace($asset_namespace);
        $this->setDistributionAssetsPath();
    }


    /**
     * @param string $asset_namespace
     * @return void
     */
    public function setAssetNamespace($asset_namespace = 'eventespresso')
    {
        if (! $this->asset_namespace) {
            $this->asset_namespace = sanitize_key(
            // convert directory separators to dashes and remove file extension
                str_replace(['/', '.php'], ['-', ''], $asset_namespace)
            );
        }
    }


    /**
     * @throws DomainException
     * @since $VID:$
     */
    private function setDistributionAssetsPath()
    {
        $assets_path = $this->pluginPath() . DomainBase::DISTRIBUTION_ASSETS_FOLDER;
        if (! is_readable($assets_path)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The assets distribution folder was not found or is not readable. Please verify that "%1$s" exists and has valid permissions.',
                        'event_espresso'
                    ),
                    $assets_path
                )
            );
        }
        $this->assets_path = trailingslashit($assets_path);
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
    public function distributionAssetsFolder()
    {
        return DomainBase::DISTRIBUTION_ASSETS_FOLDER;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsPath($additional_path = '')
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->assets_path . $additional_path
            : $this->assets_path;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsUrl($additional_path = '')
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->plugin_url . DomainBase::DISTRIBUTION_ASSETS_FOLDER . $additional_path
            : $this->plugin_url . DomainBase::DISTRIBUTION_ASSETS_FOLDER;
    }


    /**
     * @return string
     */
    public function assetNamespace()
    {
        return $this->asset_namespace;
    }
}
