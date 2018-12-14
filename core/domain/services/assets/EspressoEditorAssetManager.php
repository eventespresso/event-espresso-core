<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;


/**
 * Class AdminRefactorAssetManager
 * Description
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
    const JS_HANDLE_ADMIN_REFACTOR = 'eventespresso-admin-refactor';
    const CSS_HANDLE_ADMIN_REFACTOR = 'eventespresso-admin-refactor';
    const ASSET_CHUNK_NAME_ADMIN_REFACTOR = 'admin-refactor';

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
                CoreAssetManager::JS_HANDLE_JQUERY,
                CoreAssetManager::JS_HANDLE_EE_COMPONENTS,
                CoreAssetManager::JS_HANDLE_EE_HOC_COMPONENTS,
                'ee-datepicker'
            ]
        )
            ->setRequiresTranslation();

        $this->addJavascript(
            self::JS_HANDLE_ADMIN_REFACTOR,
            $this->registry->getJsUrl(
                $this->domain->assetNamespace(),
                self::ASSET_CHUNK_NAME_ADMIN_REFACTOR
            ),
            [ self::JS_HANDLE_EDITOR ]
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
            [ CoreAssetManager::CSS_HANDLE_EE_COMPONENTS ]
        );
        $this->addStylesheet(
            self::CSS_HANDLE_ADMIN_REFACTOR,
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                self::ASSET_CHUNK_NAME_ADMIN_REFACTOR
            ),
            [ self::CSS_HANDLE_EDITOR ]
        );
    }
}