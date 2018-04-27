<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\DomainInterface;
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
 * @since   $VID:$
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
        $this->domain   = $domain;
        $this->assets   = $assets;
        $this->registry = $registry;
    }


    /**
     * @since $VID:$
     */
    abstract public function addAssets();


    /**
     * @return ManifestFile
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since $VID:$
     */
    public function addManifestFile()
    {
        // if a manifest file has already been added for this domain, then just return that one
        if ($this->assets->has($this->domain->assetNamespace())) {
            return $this->assets->get($this->domain->assetNamespace());
        }
        $asset = new ManifestFile($this->domain);
        $this->assets->add($asset, $this->domain->assetNamespace());
        return $asset;
    }


    /**
     * @return ManifestFile[]
     * @since $VID:$
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
     * @since $VID:$
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
     * @return JavascriptAsset[]
     * @since $VID:$
     */
    public function getJavascriptAssets()
    {
        return $this->assets->getJavascriptAssets();
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
     * @since $VID:$
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
            $media,
            $this->domain
        );
        $this->assets->add($asset, $handle);
        return $asset;
    }


    /**
     * @return StylesheetAsset[]
     * @since $VID:$
     */
    public function getStylesheetAssets()
    {
        return $this->assets->getStylesheetAssets();
    }
}
