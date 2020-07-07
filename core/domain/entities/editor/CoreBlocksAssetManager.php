<?php

namespace EventEspresso\core\domain\entities\editor;

use DomainException;
use EventEspresso\core\domain\services\assets\CoreAssetManager;
use EventEspresso\core\domain\services\assets\ReactAssetManager;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\BlockAssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class CoreBlocksAssetManager
 * Manages Editor Block Assets for Event Espresso Core
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class CoreBlocksAssetManager extends BlockAssetManager
{
    const JS_HANDLE_CORE_BLOCKS = 'eventespresso-blocks';


    /**
     * @since 4.9.71.p
     */
    public function setAssetHandles()
    {
        $this->setEditorScriptHandle(CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS);
        $this->setScriptHandle(CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS);
    }


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
            CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS,
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
