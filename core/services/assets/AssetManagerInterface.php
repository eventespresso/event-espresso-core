<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Interface AssetManagerInterface
 * Defines any class capable of handling asset registration via EventEspresso\core\services\assets\Registry
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface AssetManagerInterface
{

    /**
     * @return ManifestFile
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since $VID:$
     */
    public function addManifestFile();


    /**
     * @return ManifestFile[]
     * @since $VID:$
     */
    public function getManifestFile();


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
    );


    /**
     * @return JavascriptAsset[]
     * @since $VID:$
     */
    public function getJavascriptAssets();


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
    );


    /**
     * @return StylesheetAsset[]
     * @since $VID:$
     */
    public function getStylesheetAssets();
}
