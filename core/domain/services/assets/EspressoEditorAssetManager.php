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

    /**
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
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    private function registerJavascript()
    {
        $this->addJs(self::JS_HANDLE_EDITOR)->setRequiresTranslation();
    }


    /**
     * Register CSS assets.
     *
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function registerStyleSheets()
    {
        $this->addCss(self::CSS_HANDLE_EDITOR);
    }
}
