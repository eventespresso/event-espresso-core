<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\values\assets\Asset;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class AssetCollection
 * SplObjectStorage Collection of \EventEspresso\core\domain\values\assets\Asset objects
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class AssetCollection extends Collection
{


    /**
     * AssetCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct('EventEspresso\core\domain\values\assets\Asset');
    }


    /**
     * @return StylesheetAsset[]
     * @since 4.9.62.p
     */
    public function getStylesheetAssets(): array
    {
        return $this->getAssetsOfType(Asset::TYPE_CSS);
    }


    /**
     * @return JavascriptAsset[]
     * @since 4.9.62.p
     */
    public function getJavascriptAssets(): array
    {
        return $this->getAssetsOfType(Asset::TYPE_JS);
    }


    /**
     * @return ManifestFile[]
     * @since 4.9.62.p
     */
    public function getManifestFiles(): array
    {
        return $this->getAssetsOfType(Asset::TYPE_MANIFEST);
    }


    /**
     * @param string $type
     * @return JavascriptAsset[]|StylesheetAsset[]|ManifestFile[]
     * @since 4.9.62.p
     */
    protected function getAssetsOfType(string $type): array
    {
        $files = [];
        $this->rewind();
        while ($this->valid()) {
            /** @var Asset $asset */
            $asset = $this->current();
            if ($asset->type() === $type) {
                $files[ $asset->handle() ] = $asset;
            }
            $this->next();
        }
        $this->rewind();
        return $files;
    }


    /**
     * @return JavascriptAsset[]
     * @since 4.9.62.p
     */
    public function getJavascriptAssetsWithData(): array
    {
        $files = [];
        $this->rewind();
        while ($this->valid()) {
            /** @var JavascriptAsset $asset */
            $asset = $this->current();
            if ($asset->type() === Asset::TYPE_JS && $asset->hasInlineData()) {
                $files[ $asset->handle() ] = $asset;
            }
            $this->next();
        }
        $this->rewind();
        return $files;
    }


    /**
     * returns TRUE or FALSE
     * depending on whether the object is within the Collection
     * based on the supplied $identifier and type
     *
     * @param string $identifier
     * @param string $type
     * @return bool
     * @since 4.9.63.p
     */
    public function hasAssetOfType(string $identifier, string $type = Asset::TYPE_JS): bool
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->getInfo() === $identifier && $this->current()->type() === $type) {
                $this->rewind();
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * returns TRUE or FALSE
     * depending on whether the Javascript Asset is within the Collection
     * based on the supplied $identifier
     *
     * @param string $identifier
     * @return bool
     * @since 4.9.63.p
     */
    public function hasJavascriptAsset(string $identifier): bool
    {
        return $this->hasAssetOfType($identifier, Asset::TYPE_JS);
    }


    /**
     * returns TRUE or FALSE
     * depending on whether the Stylesheet Asset is within the Collection
     * based on the supplied $identifier
     *
     * @param string $identifier
     * @return bool
     * @since 4.9.63.p
     */
    public function hasStylesheetAsset(string $identifier): bool
    {
        return $this->hasAssetOfType($identifier, Asset::TYPE_CSS);
    }


    /**
     * returns the object from the Collection
     * based on the supplied $identifier and type
     *
     * @param string $identifier
     * @param string $type
     * @return JavascriptAsset|StylesheetAsset
     * @since 4.9.63.p
     */
    public function getAssetOfType(string $identifier, string $type = Asset::TYPE_JS)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->getInfo() === $identifier && $this->current()->type() === $type) {
                /** @var JavascriptAsset|StylesheetAsset $object */
                $object = $this->current();
                $this->rewind();
                return $object;
            }
            $this->next();
        }
        return null;
    }


    /**
     * returns the Stylesheet Asset from the Collection
     * based on the supplied $identifier
     *
     * @param string $identifier
     * @return StylesheetAsset
     * @since 4.9.63.p
     */
    public function getStylesheetAsset(string $identifier)
    {
        return $this->getAssetOfType($identifier, Asset::TYPE_CSS);
    }


    /**
     * returns the Javascript Asset from the Collection
     * based on the supplied $identifier
     *
     * @param string $identifier
     * @return JavascriptAsset
     * @since 4.9.63.p
     */
    public function getJavascriptAsset(string $identifier)
    {
        return $this->getAssetOfType($identifier, Asset::TYPE_JS);
    }
}
