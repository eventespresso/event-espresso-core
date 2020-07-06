<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * EspressoEditorAssetManager
 * assets for EE admin editors
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoCoreAppAssetManager extends ReactAssetManager
{
    const JS_HANDLE_EDITOR = 'eventespresso-core-app';

    /**
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    public function addAssets()
    {
        parent::addAssets();
        $this->registerJavascript();
    }


    /**
     * Register javascript assets
     *
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    private function registerJavascript()
    {
        $this->addJs(
            EspressoCoreAppAssetManager::JS_HANDLE_EDITOR,
            [
                ReactAssetManager::JS_HANDLE_REACT,
                ReactAssetManager::JS_HANDLE_REACT_DOM,
                CoreAssetManager::JS_HANDLE_JS_CORE,
                'wp-components',
                'wp-i18n',
                'wp-keycodes',
                'wp-url',
            ]
        )->setRequiresTranslation();
    }
}
