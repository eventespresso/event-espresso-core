<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\assets\Asset;
use EventEspresso\core\domain\values\assets\BrowserAsset;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class AssetManager
 * Manager class for helping with adding and retrieving Asset objects from an AssetCollection
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
abstract class AssetManager implements AssetManagerInterface
{

    /**
     * @var AssetCollection|Asset[] $assets
     */
    protected $assets;

    protected DomainInterface $domain;

    protected Registry $registry;


    /**
     * AssetRegister constructor.
     *
     * @param DomainInterface $domain
     * @param AssetCollection $assets
     * @param Registry        $registry
     */
    public function __construct(DomainInterface $domain, AssetCollection $assets, Registry $registry)
    {
        $this->domain   = $domain;
        $this->assets   = $assets;
        $this->registry = $registry;
        $this->registry->addAssetCollection($assets);
        add_action('wp_enqueue_scripts', [$this, 'addAssets'], 2);
        add_action('admin_enqueue_scripts', [$this, 'addAssets'], 2);
    }


    /**
     * @return AssetCollection
     */
    public function getAssets()
    {
        return $this->assets;
    }


    /**
     * @return string
     * @since 4.9.71.p
     */
    public function assetNamespace(): string
    {
        return $this->domain->assetNamespace();
    }


    /**
     * @param string $handle
     * @param string $source
     * @param array  $dependencies
     * @param bool   $load_in_footer
     * @param string $version
     * @return JavascriptAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     * @since 4.9.62.p
     */
    public function addJavascript(
        string $handle,
        string $source,
        array $dependencies = [],
        bool $load_in_footer = true,
        string $version = ''
    ): JavascriptAsset {
        $asset = new JavascriptAsset(
            $handle,
            $source,
            array_unique($dependencies),
            $load_in_footer,
            $this->domain,
            $version
        );
        $this->assets->add($asset, $handle);
        return $asset;
    }


    /**
     * Used to register a javascript asset where everything is dynamically derived from the given handle.
     *
     * @param string       $handle
     * @param string|array $extra_dependencies
     * @return JavascriptAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     */
    public function addJs(string $handle, $extra_dependencies = []): JavascriptAsset
    {
        $details = $this->getAssetDetails(
            Asset::TYPE_JS,
            $handle,
            $extra_dependencies
        );
        $source  = $this->registry->getJsUrl($this->domain->assetNamespace(), $handle);
        return $this->addJavascript(
            $handle,
            $source,
            $details['dependencies'],
            true,
            $details['version']
        );
    }


    /**
     * @param string $handle
     * @param array  $dependencies
     * @param bool   $load_in_footer
     * @param string $version
     * @return JavascriptAsset
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.71.p
     */
    public function addVendorJavascript(
        string $handle,
        array $dependencies = [],
        bool $load_in_footer = true,
        string $version = ''
    ): JavascriptAsset {
        $dev_suffix  = wp_scripts_get_suffix('dev');
        $vendor_path = $this->domain->pluginUrl() . 'assets/vendor/';
        return $this->addJavascript(
            $handle,
            "$vendor_path$handle$dev_suffix" . Asset::EXT_JS,
            $dependencies,
            $load_in_footer,
            $version
        );
    }


    /**
     * @param string $handle
     * @param string $source
     * @param array  $dependencies
     * @param string $media
     * @param string $version
     * @return StylesheetAsset
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addStylesheet(
        string $handle,
        string $source,
        array $dependencies = [],
        string $media = 'all',
        string $version = ''
    ): StylesheetAsset {
        $asset = new StylesheetAsset(
            $handle,
            $source,
            array_unique($dependencies),
            $this->domain,
            $media,
            $version
        );
        $this->assets->add($asset, $handle);
        return $asset;
    }


    /**
     * Used to register a css asset where everything is dynamically derived from the given handle.
     *
     * @param string       $handle
     * @param string|array $extra_dependencies
     * @return StylesheetAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     */
    public function addCss(string $handle, $extra_dependencies = []): StylesheetAsset
    {
        $details = $this->getAssetDetails(
            Asset::TYPE_CSS,
            $handle,
            $extra_dependencies
        );
        return $this->addStylesheet(
            $handle,
            $this->registry->getCssUrl($this->domain->assetNamespace(), $handle),
            $details['dependencies'],
            'all',
            $details['version']
        );
    }


    /**
     * @param string $handle
     * @return bool
     * @since 4.9.62.p
     */
    public function enqueueAsset(string $handle): bool
    {
        if ($this->assets->has($handle)) {
            /** @var Asset $asset */
            $asset = $this->assets->get($handle);
            if ($asset instanceof BrowserAsset && $asset->isRegistered()) {
                $asset->enqueueAsset();
                return true;
            }
        }
        return false;
    }


    /**
     * @return  void
     * @since   5.0.0.p
     */
    public function enqueueBrowserAssets()
    {
        foreach ($this->assets as $asset) {
            if ($asset instanceof BrowserAsset && $asset->isRegistered()) {
                $asset->enqueueAsset();
            }
        }
    }


    /**
     * @param string       $asset_type
     * @param string       $handle
     * @param string|array $extra_dependencies
     * @return array
     * @since 4.10.2.p
     */
    private function getAssetDetails(string $asset_type, string $handle, $extra_dependencies = []): array
    {
        $getAssetDetails = '';
        switch ($asset_type) {
            case Asset::TYPE_JS :
                $getAssetDetails = 'getJsAssetDetails';
                break;
            case Asset::TYPE_CSS :
                $getAssetDetails = 'getCssAssetDetails';
                break;
        }
        if ($getAssetDetails === '') {
            return ['dependencies' => [], 'version' => ''];
        }
        $details                 = $this->registry->$getAssetDetails(
            $this->domain->assetNamespace(),
            $handle
        );
        $details['dependencies'] = $details['dependencies'] ?? [];
        $details['version']      = $details['version'] ?? '';
        $details['dependencies'] = ! empty($extra_dependencies)
            ? array_merge($details['dependencies'], (array) $extra_dependencies)
            : $details['dependencies'];
        return $details;
    }


    /**
     * @param string $handle
     * @return bool
     * @throws DomainException
     */
    public function verifyAssetIsRegistered(string $handle): bool
    {
        if (wp_script_is($handle, 'registered')) {
            return true;
        }
        if (WP_DEBUG) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The "%1$s" script is not registered when it should be!%2$s
                        Are you running the Barista plugin for development purposes?
                        If so, then you need to build the appropriate assets for this domain.%2$s
                        If you are seeing this error on a live website, then you should not have
                        the WP_DEBUG constant in your wp-config.php file set to "true".
                        Please contact Event Espresso support for more information.',
                        'event_espresso'
                    ),
                    $handle,
                    '<br />'
                )
            );
        }
        return false;
    }


    /**************** deprecated ****************/


    /**
     * @return void
     * @deprecated 5.0.0.p
     */
    public function addManifestFile()
    {
    }


    /**
     * @return void
     * @deprecated 5.0.0.p
     */
    public function getManifestFile()
    {
    }
}
