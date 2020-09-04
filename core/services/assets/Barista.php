<?php

namespace EventEspresso\core\services\assets;

/**
 * @package EventEspresso\core\services\assets
 * @author  Manzoor Wani, Brent Christensen
 * @since   $VID:$
 */
class Barista implements BaristaInterface
{

    const DEPENDENCY_LIST_REGISTERED = 'registered';


    /**
     * @var AssetManifestInterface
     */
    private $asset_manifest;

    /**
     * @var bool
     */
    protected $initialized = false;


    /**
     * Barista constructor.
     *
     * @param AssetManifestInterface $asset_manifest
     */
    public function __construct(AssetManifestInterface $asset_manifest)
    {
        $this->asset_manifest = $asset_manifest;
    }


    /**
     * @return void
     */
    public function initialize()
    {
        if (! $this->initialized) {
            add_action('wp_enqueue_scripts', [$this, 'registerScripts'], 0);
            add_action('admin_enqueue_scripts', [$this, 'registerScripts'], 0);
            add_action('wp_enqueue_scripts', [$this, 'registerStyles'], 0);
            add_action('admin_enqueue_scripts', [$this, 'registerStyles'], 0);
            $this->initialized = true;
        }
    }


    /**
     * Registers all the WordPress packages scripts that are in the standardized
     * `build/` location.
     *
     * @return void
     */
    public function registerScripts()
    {
        $entry_points = $this->asset_manifest->getEntryPoints();
        foreach ($entry_points as $entry_point) {
            if ($this->asset_manifest->hasAsset($entry_point)) {
                $handle = $this->asset_manifest->getAssetHandle($entry_point);
                $source = $this->asset_manifest->getAssetUrl($entry_point);
                $dependencies = $this->asset_manifest->getAssetDependencies($entry_point);
                $version = $this->asset_manifest->getAssetVersion($entry_point);
                wp_register_script($handle, $source, $dependencies, $version, true);
            }
        }
    }


    /**
     * Registers all the packages and domain styles that are in the build folder.
     *
     * @return void
     */
    public function registerStyles()
    {
        $entry_points = $this->asset_manifest->getEntryPoints();
        foreach ($entry_points as $entry_point) {
            if ($this->asset_manifest->hasAsset($entry_point, AssetManifest::ASSET_EXT_CSS)) {
                $handle = $this->asset_manifest->getAssetHandle($entry_point);
                $source = $this->asset_manifest->getAssetUrl($entry_point, AssetManifest::ASSET_EXT_CSS);
                $dependencies = $this->asset_manifest->getAssetDependencies($entry_point, AssetManifest::ASSET_EXT_CSS);
                $version = $this->asset_manifest->getAssetVersion($entry_point, AssetManifest::ASSET_EXT_CSS);
                wp_register_style($handle, $source, $dependencies, $version, 'all');
            }
        }
    }
}
