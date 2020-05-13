<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\assets\Asset;
use EventEspresso\core\domain\values\assets\BrowserAsset;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
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
     * @var AssetCollection $assets
     */
    protected $assets;

    /**
     * @var DomainInterface
     */
    protected $domain;

    /**
     * @var Registry $registry
     */
    protected $registry;


    /**
     * AssetRegister constructor.
     *
     * @param DomainInterface $domain
     * @param AssetCollection $assets
     * @param Registry        $registry
     */
    public function __construct(DomainInterface $domain, AssetCollection $assets, Registry $registry)
    {
        $this->domain = $domain;
        $this->assets = $assets;
        $this->registry = $registry;
        add_action('wp_enqueue_scripts', array($this, 'addManifestFile'), 0);
        add_action('admin_enqueue_scripts', array($this, 'addManifestFile'), 0);
        add_action('wp_enqueue_scripts', array($this, 'addAssets'), 2);
        add_action('admin_enqueue_scripts', array($this, 'addAssets'), 2);
    }


    /**
     * @since 4.9.71.p
     * @return string
     */
    public function assetNamespace()
    {
        return $this->domain->assetNamespace();
    }


    /**
     * @return void
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addManifestFile()
    {
        // if a manifest file has already been added for this domain, then just return
        if ($this->assets->has($this->domain->assetNamespace())) {
            return;
        }
        $asset = new ManifestFile($this->domain);
        $this->assets->add($asset, $this->domain->assetNamespace());
    }


    /**
     * @return ManifestFile[]
     * @since 4.9.62.p
     */
    public function getManifestFile()
    {
        return $this->assets->getManifestFiles();
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
        $handle,
        $source,
        array $dependencies = array(),
        $load_in_footer = true,
        $version = ''
    ) {
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
    public function addJs($handle, $extra_dependencies = [])
    {
        $details = $this->getAssetDetails(
            Asset::TYPE_JS,
            $handle,
            $extra_dependencies
        );
        $source = $this->registry->getJsUrl($this->domain->assetNamespace(), $handle);
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
        $handle,
        array $dependencies = array(),
        $load_in_footer = true,
        $version = ''
    ) {
        $dev_suffix = wp_scripts_get_suffix('dev');
        $vendor_path = $this->domain->pluginUrl() . 'assets/vendor/';
        return $this->addJavascript(
            $handle,
            "{$vendor_path}{$handle}{$dev_suffix}.js",
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
        $handle,
        $source,
        array $dependencies = array(),
        $media = 'all',
        $version = ''
    ) {
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
    public function addCss($handle, $extra_dependencies = [])
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
    public function enqueueAsset($handle)
    {
        if ($this->assets->has($handle)) {
            $asset = $this->assets->get($handle);
            if ($asset->isRegistered()) {
                $asset->enqueueAsset();
                return true;
            }
        }
        return false;
    }


    /**
     * @return  void
     * @since   $VID:$
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
     * @param string $asset_type
     * @param string $handle
     * @param array  $extra_dependencies
     * @return array
     * @since 4.10.2.p
     */
    private function getAssetDetails($asset_type, $handle, $extra_dependencies = [])
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
        $details = $this->registry->$getAssetDetails(
            $this->domain->assetNamespace(),
            $handle
        );
        $details['dependencies'] = isset($details['dependencies'])
            ? $details['dependencies']
            : [];
        $details['version'] = isset($details['version'])
            ? $details['version']
            : '';
        $details['dependencies'] = ! empty($extra_dependencies)
            ? array_merge($details['dependencies'], (array) $extra_dependencies)
            : $details['dependencies'];
        return $details;

    }
}
