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
 * @since   $VID:$
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
     * @since $VID:$
     */
    public function getStylesheetAssets()
    {
        return $this->getAssetsOfType(Asset::TYPE_CSS);
    }


    /**
     * @return JavascriptAsset[]
     * @since $VID:$
     */
    public function getJavascriptAssets()
    {
        return $this->getAssetsOfType(Asset::TYPE_JS);
    }


    /**
     * @return ManifestFile[]
     * @since $VID:$
     */
    public function getManifestFiles()
    {
        return $this->getAssetsOfType(Asset::TYPE_MANIFEST);
    }


    /**
     * @param $type
     * @return array
     * @since $VID:$
     */
    protected function getAssetsOfType($type)
    {
        $files = array();
        $this->rewind();
        while ($this->valid()) {
            /** @var \EventEspresso\core\domain\values\assets\Asset $asset */
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
     * @since $VID:$
     */
    public function getJavascriptAssetsWithData()
    {
        $files = array();
        $this->rewind();
        while ($this->valid()) {
            /** @var \EventEspresso\core\domain\values\assets\JavascriptAsset $asset */
            $asset = $this->current();
            if ($asset->type() === Asset::TYPE_JS && $asset->hasLocalizedData()) {
                $files[ $asset->handle() ] = $asset;
            }
            $this->next();
        }
        $this->rewind();
        return $files;
    }
}
