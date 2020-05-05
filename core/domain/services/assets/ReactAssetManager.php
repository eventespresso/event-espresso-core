<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;


/**
 * ReactAssetManager
 * assets for domain use cases that utilize React
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ReactAssetManager extends AssetManager
{
    const REACT_VERSION = '16.13.1';

    const JS_HANDLE_REACT = 'react';

    const JS_HANDLE_REACT_DOM = 'react-dom';


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    public function addAssets()
    {
        $this->addVendorJavascript(
            ReactAssetManager::JS_HANDLE_REACT,
            [],
            true,
            ReactAssetManager::REACT_VERSION
        );
        $this->addVendorJavascript(
            ReactAssetManager::JS_HANDLE_REACT_DOM,
            [ReactAssetManager::JS_HANDLE_REACT],
            true,
            ReactAssetManager::REACT_VERSION
        );
    }
}
