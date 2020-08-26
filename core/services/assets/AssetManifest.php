<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;

/**
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AssetManifest
{

    const ASSET_EXT_CSS      = '.css';

    const ASSET_EXT_JS      = '.js';

    const ASSET_EXT_JS_MAP  = '.js.map';

    const ASSET_EXT_PHP     = '.php';

    const FILE_NAME         = 'asset-manifest.json';

    const KEY_DEPENDENCIES  = 'dependencies';

    const KEY_ENTRY_POINTS  = 'entrypoints';

    const KEY_FILES         = 'files';

    const KEY_VERSION       = 'version';


    /**
     * @var array
     */
    private $asset_files;

    /**
     * @var string
     */
    private $assets_namespace;

    /**
     * @var string
     */
    private $assets_path;

    /**
     * @var DomainInterface
     */
    protected $domain;

    /**
     * @var array
     */
    private $entry_points;

    /**
     * @var array
     */
    private $manifest;

    /**
     * @var string
     */
    private $manifest_path;


    /**
     * AssetManifest constructor.
     *
     * @param DomainInterface $domain
     */
    public function __construct(DomainInterface $domain)
    {
        $this->domain = $domain;
    }


    /**
     * @return void
     */
    public function initialize()
    {
        if (! $this->manifest) {
            $this->assets_namespace = $this->domain->assetNamespace();
            $assets_path = $this->domain->distributionAssetsPath();
            $this->assets_path = trailingslashit($assets_path);
            $this->setManifestFilepath();
            $this->loadManifest();
            $this->getAssetFiles();
            $this->getEntryPoints();
        }
    }


    /**
     * @param string $manifest_path
     */
    public function setManifestFilepath($manifest_path = '')
    {
        $manifest_path = $manifest_path ? $manifest_path : $this->assets_path . AssetManifest::FILE_NAME;
        if (! is_readable($manifest_path)) {
            throw new AssetManifestException(
                sprintf(
                    esc_html__(
                        'Manifest file was not found or is not readable. Please try running "yarn dev" in the console and/or verify that "%1$s" exists and has valid permissions.',
                        'event_espresso'
                    ),
                    $manifest_path
                )
            );
        }
        $this->manifest_path = $manifest_path;
    }


    /**
     * @return void
     */
    private function loadManifest()
    {
        if (! $this->manifest) {
            // TODO May be use WP File system? ¯\_(ツ)_/¯
            $manifest_json  = file_get_contents($this->manifest_path);
            $this->manifest = json_decode($manifest_json, true);
        }
    }


    /**
     * @param string $file_name
     * @return string
     */
    private function trimAssetFilename($file_name)
    {
        return ltrim($file_name, '/');
    }


    /**
     * @return array
     */
    public function getAssetFiles()
    {
        if (! $this->asset_files) {
            if (empty($this->manifest[ AssetManifest::KEY_FILES ])) {
                if (WP_DEBUG) {
                    throw new AssetManifestException(AssetManifest::KEY_FILES);
                }
                return [];
            }
            $this->asset_files = $this->manifest[ AssetManifest::KEY_FILES ];
        }
        return $this->asset_files;
    }


    /**
     * @return array
     */
    public function getEntryPoints()
    {
        if (! $this->entry_points) {
            if (empty($this->manifest[ AssetManifest::KEY_ENTRY_POINTS ])) {
                if (WP_DEBUG) {
                    throw new AssetManifestException(AssetManifest::KEY_ENTRY_POINTS);
                }
                return [];
            }
            $this->entry_points = array_keys($this->manifest[ AssetManifest::KEY_ENTRY_POINTS ]);
        }
        return $this->entry_points;
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return string
     */
    private function getAsset($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        return $this->hasAsset($entry_point, $type)
            ? $this->trimAssetFilename($this->asset_files[ $entry_point . $type ])
            : '';
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return array
     */
    public function getAssetDependencies($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        // currently only tracking/need dependencies for JS
        if ($type !== AssetManifest::ASSET_EXT_JS) {
            return [];
        }
        $asset = $this->getAssetDetails($entry_point);
        if (! isset($asset[AssetManifest::KEY_DEPENDENCIES])) {
            return [];
        }
        $dependencies = $asset[AssetManifest::KEY_DEPENDENCIES];
        // remove cyclical dependencies, if any
        if (($key = array_search($this->assets_namespace . '-' . $entry_point, $dependencies, true)) !== false) {
            unset($dependencies[ $key ]);
        }
        return $dependencies;
    }


    /**
     * @param string $entry_point
     * @return array
     */
    public function getAssetDetails($entry_point)
    {
        $file_name = $this->getAsset($entry_point, AssetManifest::ASSET_EXT_PHP);
        if (! $file_name) {
            return [];
        }
        $full_path = $this->assets_path . $file_name;
        if (! is_readable($full_path)) {
            if (WP_DEBUG) {
                throw new AssetManifestException(AssetManifest::KEY_DEPENDENCIES);
            }
            return [];
        }
        return require($full_path);
    }


    /**
     * @param string $entry_point
     * @return string|int|false
     */
    public function getAssetHandle($entry_point)
    {
        return $this->assets_namespace . '-' . $entry_point;
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return string
     */
    public function getAssetPath($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        $file_name = $this->getAsset($entry_point, $type);
        return $file_name ? $this->domain->distributionAssetsPath($file_name) : '';
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return string
     */
    public function getAssetUrl($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        $file_name = $this->getAsset($entry_point, $type);
        return $file_name ? $this->domain->distributionAssetsUrl($file_name) : '';
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return string|int|false
     */
    public function getAssetVersion($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        $asset = $this->getAssetDetails($entry_point);
        return $type === AssetManifest::ASSET_EXT_JS && isset($asset[AssetManifest::KEY_VERSION])
            ? $asset[AssetManifest::KEY_VERSION]
            : filemtime($this->getAssetPath($entry_point, $type));
    }


    /**
     * @param string $entry_point
     * @param string $type
     * @return string
     */
    public function hasAsset($entry_point, $type = AssetManifest::ASSET_EXT_JS)
    {
        $file_name = $entry_point . $type;
        return ! empty($this->asset_files[ $file_name ]);
    }
}
