<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\DomainInterface;

/**
 * Class for loading parsing and retrieving data from an asset manifest file
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AssetManifest implements AssetManifestInterface
{

    const ASSET_EXT_CSS      = '.css';

    const ASSET_EXT_JS      = '.js';

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
     * This is a list of known handles that are used for css.
     * @var array
     */
    private $wp_css_handle_dependencies = [
        'wp-components',
        'wp-block-editor',
        'wp-block-library',
        'wp-edit-post',
        'wp-edit-widgets',
        'wp-editor',
        'wp-format-library',
        'wp-list-reusable-blocks',
        'wp-nux',
    ];


    /**
     * AssetManifest constructor.
     *
     * @param DomainInterface $domain
     */
    public function __construct(DomainInterface $domain)
    {
        $this->domain = $domain;
        $this->initialize();
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
                $manifest_path,
                '',
                sprintf(
                    esc_html__(
                        'The "%1$s" file was not found or is not readable. Please verify that the file exists and has appropriate permissions.',
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
                    throw new AssetManifestException(AssetManifest::KEY_FILES, $this->manifest_path);
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
                    throw new AssetManifestException(AssetManifest::KEY_ENTRY_POINTS, $this->manifest_path);
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
        $asset = $this->getAssetDetails($entry_point);
        if (! isset($asset[AssetManifest::KEY_DEPENDENCIES])) {
            return [];
        }
        $dependencies = $asset[AssetManifest::KEY_DEPENDENCIES];
        // remove cyclical dependencies, if any
        if (($key = array_search($this->assets_namespace . '-' . $entry_point, $dependencies, true)) !== false) {
            unset($dependencies[ $key ]);
        }
        // currently need to derive dependencies for CSS from the JS dependencies
        if ($type === AssetManifest::ASSET_EXT_CSS) {
            $css_dependencies = [];
            foreach ($dependencies as $handle) {
                $dependency_style = $this->getEntryPointFromHandle($handle) . AssetManifest::ASSET_EXT_CSS;
                if (isset($this->asset_files[ $dependency_style ])
                    || in_array($handle, $this->wp_css_handle_dependencies)
                ) {
                    $css_dependencies[] = $handle;
                }
            }
            return $css_dependencies;
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
                throw new AssetManifestException(AssetManifest::KEY_DEPENDENCIES, $full_path);
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
     * @return string
     */
    public function getAssetsPath()
    {
        return $this->assets_path;
    }


    /**
     * @param string $handle
     * @return string|int|false
     */
    private function getEntryPointFromHandle($handle)
    {   $find = $this->assets_namespace . '-';
        return str_replace($find, '', $handle);
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
