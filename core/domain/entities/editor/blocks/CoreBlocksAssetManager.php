<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use EventEspresso\core\services\editor\BlockAssetManager;

/**
 * Class CoreBlocksAssetRegister
 * Register Editor Block Assets for Event Espresso Core
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CoreBlocksAssetManager extends BlockAssetManager
{

    const EDITOR_SCRIPT_HANDLE = 'core-blocks';

    const EDITOR_STYLE_HANDLE  = 'core-blocks';

    const SCRIPT_HANDLE        = 'core-blocks';

    const STYLE_HANDLE         = 'core-blocks';


    /**
     * @since $VID:$
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addAssets()
    {
        $this->addEditorScript(CoreBlocksAssetManager::EDITOR_SCRIPT_HANDLE, array());
        $this->addEditorStyle(CoreBlocksAssetManager::EDITOR_STYLE_HANDLE, array());
        $this->setScriptHandle(CoreBlocksAssetManager::SCRIPT_HANDLE);
        $this->setStyleHandle(CoreBlocksAssetManager::STYLE_HANDLE);
    }
}
