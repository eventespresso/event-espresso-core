<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\values\assets\JavascriptAsset;
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
 * @since   4.9.62.p
 */
interface AssetManagerInterface
{
    /**
     * @since 4.9.71.p
     * @return string
     */
    public function assetNamespace(): string;

    /**
     * @since 4.9.62.p
     */
    public function addAssets();


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
     * @since 4.9.62.p
     */
    public function addJavascript(
        string $handle,
        string $source,
        array $dependencies = array(),
        bool $load_in_footer = true,
        string $version = ''
    ): JavascriptAsset;


    /**
     * @param string $handle
     * @param array  $dependencies
     * @param bool   $load_in_footer
     * @param string $version
     * @return JavascriptAsset
     *@since 4.9.71.p
     */
    public function addVendorJavascript(
        string $handle,
        array $dependencies = array(),
        bool $load_in_footer = true,
        string $version = ''
    ): JavascriptAsset;



    /**
     * @param string $handle
     * @param string $source
     * @param array  $dependencies
     * @param string $media
     * @param string $version
     * @return StylesheetAsset
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 4.9.62.p
     */
    public function addStylesheet(
        string $handle,
        string $source,
        array $dependencies = array(),
        string $media = 'all',
        string $version = ''
    ): StylesheetAsset;


    /**
     * @param string $handle
     * @return bool
     * @since 4.9.62.p
     */
    public function enqueueAsset(string $handle): bool;
}
