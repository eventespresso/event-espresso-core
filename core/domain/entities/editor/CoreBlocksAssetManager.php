<?php

namespace EventEspresso\core\domain\entities\editor;

use EventEspresso\core\services\assets\BlockAssetManager;

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
    const JS_HANDLE_CORE_BLOCKS_EDITOR = 'eventespresso-core-app';
    const JS_HANDLE_CORE_BLOCKS = 'eventespresso-core-app';


    /**
     * @since 4.9.71.p
     */
    public function setAssetHandles()
    {
        $this->setEditorScriptHandle(CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS_EDITOR);
        $this->setScriptHandle(CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS);
    }
}
