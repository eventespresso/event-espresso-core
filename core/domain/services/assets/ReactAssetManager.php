<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;


/**
 * ReactAssetManager
 * assets for routes that utilize React
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ReactAssetManager extends AssetManager
{
    const JS_HANDLE_REACT_DEV = 'react-development';
    const JS_HANDLE_REACT_PROD = 'react-production';
    const JS_HANDLE_REACT_DOM_DEV = 'react-dom-development';
    const JS_HANDLE_REACT_DOM_PROD = 'react-dom-production';
    // base URLs
    const URL_BASE_UMD_REACT = 'https://unpkg.com/react@16/umd/';
    const URL_BASE_UMD_REACT_DOM = 'https://unpkg.com/react-dom@16/umd/';

    /**
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    public function addAssets()
    {
        if (defined('SCRIPT_DEBUG')) {
            $this->addJavascript(
                ReactAssetManager::JS_HANDLE_REACT_DEV,
                ReactAssetManager::URL_BASE_UMD_REACT . 'react.development.js'
            )->addAttributes(['crossorigin']);
            $this->addJavascript(
                ReactAssetManager::JS_HANDLE_REACT_DOM_DEV,
                ReactAssetManager::URL_BASE_UMD_REACT_DOM . 'react-dom.development.js'
            )->addAttributes(['crossorigin']);
        } else {
            $this->addJavascript(
                ReactAssetManager::JS_HANDLE_REACT_PROD,
                ReactAssetManager::URL_BASE_UMD_REACT . 'react.production.min.js'
            )->addAttributes(['crossorigin']);
            $this->addJavascript(
                ReactAssetManager::JS_HANDLE_REACT_DOM_PROD,
                ReactAssetManager::URL_BASE_UMD_REACT_DOM . 'react-dom.production.min.js'
            )->addAttributes(['crossorigin']);
        }
    }
}
