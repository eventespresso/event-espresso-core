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
    const JS_HANDLE_EDITOR_PROTOTYPE = 'eventespresso-editor-prototype';
    const CSS_HANDLE_EDITOR = 'eventespresso-editor';
    const JS_HANDLE_EDITOR_HOCS = 'eventespresso-editor-hocs';
    const CSS_HANDLE_EDITOR_HOCS = 'eventespresso-editor-hocs';


    /**
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    public function addAssets()
    {
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
        $this->addJs(self::JS_HANDLE_EDITOR)->setRequiresTranslation();
        $this->addJs(self::JS_HANDLE_EDITOR_PROTOTYPE)->setRequiresTranslation();
        $this->addJs(self::JS_HANDLE_EDITOR_HOCS)->setRequiresTranslation();
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
        $this->addCss(self::CSS_HANDLE_EDITOR);
        $this->addCss(self::CSS_HANDLE_EDITOR_HOCS);
    }
}
