<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;
use EventEspresso\core\domain\values\assets\Asset;

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
    public function getStylesheetAssets()
    {
        return $this->getAssetsOfType(Asset::TYPE_CSS);
    }


    /**
     * @return JavascriptAsset[]
     * @since 4.9.62.p
     */
    public function getJavascriptAssets()
    {
        return $this->getAssetsOfType(Asset::TYPE_JS);
    }


    /**
     * @return ManifestFile[]
     * @since 4.9.62.p
     */
    public function getManifestFiles()
    {
        return $this->getAssetsOfType(Asset::TYPE_MANIFEST);
    }


    /**
     * @param $type
     * @return JavascriptAsset[]|StylesheetAsset[]|ManifestFile[]
     * @since 4.9.62.p
     */
    protected function getAssetsOfType($type)
    {
        $files = array();
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
    public function getJavascriptAssetsWithData()
    {
        $files = array();
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
     * has
     * returns TRUE or FALSE
     * depending on whether the object is within the Collection
     * based on the supplied $identifier and type
     *
     * @access public
     * @param  mixed $identifier
     * @param string $type
     * @return bool
     */
    public function hasAssetOfType($identifier, $type = Asset::TYPE_JS)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->getInfo() === $identifier && $this->current() === $type) {
                $this->rewind();
                return true;
            }
            $this->next();
        }
        return false;
    }


    /**
     * has
     * returns TRUE or FALSE
     * depending on whether the Stylesheet Asset is within the Collection
     * based on the supplied $identifier
     *
     * @access public
     * @param  mixed $identifier
     * @return bool
     */
    public function hasStylesheetAsset($identifier)
    {
        return $this->hasAssetOfType($identifier, Asset::TYPE_CSS);
    }


    /**
     * has
     * returns TRUE or FALSE
     * depending on whether the Javascript Asset is within the Collection
     * based on the supplied $identifier
     *
     * @access public
     * @param  mixed $identifier
     * @return bool
     */
    public function hasJavascriptAsset($identifier)
    {
        return $this->hasAssetOfType($identifier, Asset::TYPE_JS);
    }

    /**
     * has
     * returns TRUE or FALSE
     * depending on whether the object is within the Collection
     * based on the supplied $identifier and type
     *
     * @access public
     * @param  mixed $identifier
     * @param string $type
     * @return JavascriptAsset|StylesheetAsset
     */
    public function getAssetOfType($identifier, $type = Asset::TYPE_JS)
    {
        $this->rewind();
        while ($this->valid()) {
            if ($this->getInfo() === $identifier && $this->current() === $type) {
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
     * has
     * returns TRUE or FALSE
     * depending on whether the Stylesheet Asset is within the Collection
     * based on the supplied $identifier
     *
     * @access public
     * @param  mixed $identifier
     * @return StylesheetAsset
     */
    public function getStylesheetAsset($identifier)
    {
        return $this->getAssetOfType($identifier, Asset::TYPE_CSS);
    }


    /**
     * has
     * returns TRUE or FALSE
     * depending on whether the Javascript Asset is within the Collection
     * based on the supplied $identifier
     *
     * @access public
     * @param  mixed $identifier
     * @return JavascriptAsset
     */
    public function getJavascriptAsset($identifier)
    {
        return $this->getAssetOfType($identifier, Asset::TYPE_JS);
    }
}
