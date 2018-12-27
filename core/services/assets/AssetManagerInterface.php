<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\ManifestFile;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\domain\values\assets\VendorJavascriptAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Interface AssetManagerInterface
 * Defines any class capable of handling asset registration via EventEspresso\core\services\assets\Registry
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
interface AssetManagerInterface
{
    /**
     * @since 4.9.71.p
     * @return string
     */
    public function assetNamespace();

    /**
     * @since 4.9.62.p
     */
    public function addAssets();


    /**
     * @return ManifestFile
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addManifestFile();


    /**
     * @return ManifestFile[]
     * @since 4.9.62.p
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
     * @since 4.9.62.p
     */
    public function addJavascript(
        $handle,
        $source,
        array $dependencies = array(),
        $load_in_footer = true
    );


    /**
     * @since 4.9.71.p
     * @param string $handle
     * @param array  $dependencies
     * @param bool   $load_in_footer
     * @return JavascriptAsset
     */
    public function addVendorJavascript(
        $handle,
        array $dependencies = array(),
        $load_in_footer = true
    );



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
    );


    /**
     * @param string $handle
     * @return bool
     * @since 4.9.62.p
     */
    public function enqueueAsset($handle);
}
