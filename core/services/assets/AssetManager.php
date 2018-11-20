<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\domain\values\assets\VendorJavascriptAsset;
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
     * @return JavascriptAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addJavascript(
        $handle,
        $source,
        array $dependencies = array(),
        $load_in_footer = true
    ) {
        $asset = new JavascriptAsset(
            $handle,
            $source,
            $dependencies,
            $load_in_footer,
            $this->domain
        );
        $this->assets->add($asset, $handle);
        return $asset;
    }


    /**
     * @param string $handle
     * @param array  $dependencies
     * @param bool   $load_in_footer
     * @return JavascriptAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     * @since 4.9.71.p
     */
    public function addVendorJavascript(
        $handle,
        array $dependencies = array(),
        $load_in_footer = true
    ) {
        $dev_suffix = wp_scripts_get_suffix('dev');
        $vendor_path = $this->domain->pluginUrl() . 'assets/vendor/';
        return $this->addJavascript(
            $handle,
            "{$vendor_path}{$handle}{$dev_suffix}.js",
            $dependencies,
            $load_in_footer
        );
    }



    /**
     * @param string $handle
     * @param string $source
     * @param array  $dependencies
     * @param string $media
     * @return StylesheetAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addStylesheet(
        $handle,
        $source,
        array $dependencies = array(),
        $media = 'all'
    ) {
        $asset = new StylesheetAsset(
            $handle,
            $source,
            $dependencies,
            $this->domain,
            $media
        );
        $this->assets->add($asset, $handle);
        return $asset;
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
}
