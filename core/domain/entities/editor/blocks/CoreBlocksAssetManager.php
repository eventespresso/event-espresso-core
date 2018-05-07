<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

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
 * @since   $VID:$
 */
class CoreBlocksAssetManager extends BlockAssetManager
{
    const JS_HANDLE_CORE_BLOCKS = 'core-blocks';
    const CSS_HANDLE_CORE_BLOCKS = 'core-blocks';

    /**
     * @since $VID:$
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addAssets()
    {
        $this->addEditorScript(self::JS_HANDLE_CORE_BLOCKS);
        $this->addEditorStyle(self::CSS_HANDLE_CORE_BLOCKS);
        $this->setScriptHandle(self::JS_HANDLE_CORE_BLOCKS);
        $this->setStyleHandle(self::CSS_HANDLE_CORE_BLOCKS);
    }
}
