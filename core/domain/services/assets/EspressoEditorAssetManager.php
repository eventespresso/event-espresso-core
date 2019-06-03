<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;


/**
 * EspressoEditorAssetManager
 * assets for EE admin editors
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEditorAssetManager extends AssetManager
{
    const JS_HANDLE_EDITOR = 'eventespresso-editor';
    const CSS_HANDLE_EDITOR = 'eventespresso-editor';
    const ASSET_CHUNK_NAME_EDITOR = 'editor';

    /**
     * @since 4.9.62.p
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addAssets()
    {
        $this->registerJavascript();
        $this->registerStyleSheets();
    }


    /**
     * Register javascript assets
     *
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    private function registerJavascript()
    {
        $this->addJavascript(
            self::JS_HANDLE_EDITOR,
            $this->registry->getJsUrl(
                $this->domain->assetNamespace(),
                self::ASSET_CHUNK_NAME_EDITOR
            ),
            [
                CoreAssetManager::JS_HANDLE_COMPONENTS,
                CoreAssetManager::JS_HANDLE_EDITOR_HOCS,
                'ee-datepicker'
            ]
        )
            ->setRequiresTranslation();
    }


    /**
     * Register CSS assets.
     *
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function registerStyleSheets()
    {
        $this->addStylesheet(
            self::CSS_HANDLE_EDITOR,
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                self::ASSET_CHUNK_NAME_EDITOR
            ),
            [ CoreAssetManager::CSS_HANDLE_COMPONENTS ]
        );
    }
}
