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
class EspressoEditorAssetManager extends ReactAssetManager
{
    const JS_HANDLE_EDITOR = 'eventespresso-editor';
    const CSS_HANDLE_EDITOR = 'eventespresso-editor';

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
        $this->registerStyleSheets();
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
            EspressoEditorAssetManager::JS_HANDLE_EDITOR,
            [
                ReactAssetManager::JS_HANDLE_REACT,
                ReactAssetManager::JS_HANDLE_REACT_DOM,
                'wp-i18n',
                CoreAssetManager::JS_HANDLE_JS_CORE,
            ]
            )->setRequiresTranslation();
        }


    /**
     * Register CSS assets.
     *
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     */
    private function registerStyleSheets()
    {
        $this->addCss(EspressoEditorAssetManager::CSS_HANDLE_EDITOR);
    }
}
