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
    const JS_HANDLE_CORE_BLOCKS_EDITOR = 'core-blocks';
    const CSS_HANDLE_CORE_BLOCKS_EDITOR = 'core-blocks';
    const JS_HANDLE_CORE_BLOCKS = 'core-blocks-frontend';
    const CSS_HANDLE_CORE_BLOCKS = 'core-blocks-frontend';


    /**
     * @since 4.9.71.p
     */
    public function setAssetHandles()
    {
        $this->setEditorScriptHandle(self::JS_HANDLE_CORE_BLOCKS_EDITOR);
        $this->setEditorStyleHandle(self::CSS_HANDLE_CORE_BLOCKS_EDITOR);
        $this->setScriptHandle(self::JS_HANDLE_CORE_BLOCKS);
        $this->setStyleHandle(self::CSS_HANDLE_CORE_BLOCKS);
    }
}
