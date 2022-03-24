<?php

namespace EventEspresso\core\domain;

use DomainException;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;

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
    const ASSETS_FOLDER = 'assets/';

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
     * @var bool
     */
    protected $initialized = false;


    /**
     * Initializes internal properties.
     *
     * @param FilePath $plugin_file
     * @param Version  $version
     * @param string $asset_namespace
     */
    public function __construct(
        FilePath $plugin_file,
        Version $version,
        string $asset_namespace = Domain::ASSET_NAMESPACE
    ) {
        $this->plugin_file = $plugin_file;
        $this->version     = $version;
        $this->initialize($asset_namespace);
    }


    /**
     * @param string $asset_namespace
     * @return void
     * @since $VID:$
     */
    public function initialize($asset_namespace = Domain::ASSET_NAMESPACE)
    {
        if (! $this->initialized) {
            $this->plugin_basename = plugin_basename($this->pluginFile());
            $this->plugin_path     = plugin_dir_path($this->pluginFile());
            $this->plugin_url      = plugin_dir_url($this->pluginFile());
            $this->setAssetNamespace($asset_namespace);
            $this->setDistributionAssetsPath();
            $this->initialized = true;
        }
    }


    /**
     * @param string $asset_namespace
     * @return void
     */
    public function setAssetNamespace($asset_namespace = Domain::ASSET_NAMESPACE)
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
        $assets_folder_paths = [
            $this->plugin_path . DomainBase::ASSETS_FOLDER,
            $this->plugin_path . 'src/' . DomainBase::ASSETS_FOLDER,
        ];
        foreach ($assets_folder_paths as $assets_folder_path) {
            if (is_readable($assets_folder_path)) {
                $this->assets_path = trailingslashit($assets_folder_path);
                // once we find a valid path, just break out of loop
                break;
            }
        }
    }


    /**
     * @return string
     */
    public function pluginFile(): string
    {
        return (string) $this->plugin_file;
    }


    /**
     * @return FilePath
     */
    public function pluginFileObject(): FilePath
    {
        return $this->plugin_file;
    }


    /**
     * @return string
     */
    public function pluginBasename(): string
    {
        return $this->plugin_basename;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function pluginPath($additional_path = ''): string
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->plugin_path . $additional_path
            : $this->plugin_path;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function pluginUrl($additional_path = ''): string
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->plugin_url . $additional_path
            : $this->plugin_url;
    }


    /**
     * @return string
     */
    public function version(): string
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
    public function distributionAssetsFolder(): string
    {
        return DomainBase::ASSETS_FOLDER;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsPath($additional_path = ''): string
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->assets_path . $additional_path
            : $this->assets_path;
    }


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsUrl($additional_path = ''): string
    {
        return is_string($additional_path) && $additional_path !== ''
            ? $this->plugin_url . DomainBase::ASSETS_FOLDER . $additional_path
            : $this->plugin_url . DomainBase::ASSETS_FOLDER;
    }


    /**
     * @return string
     */
    public function assetNamespace(): string
    {
        return $this->asset_namespace;
    }
}
