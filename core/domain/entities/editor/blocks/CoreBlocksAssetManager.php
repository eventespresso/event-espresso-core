<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use EventEspresso\core\services\assets\BlockAssetManager;

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
     */
    public function setAssetHandles()
    {
        $this->setEditorScriptHandle(self::JS_HANDLE_CORE_BLOCKS);
        $this->setEditorStyleHandle(self::CSS_HANDLE_CORE_BLOCKS);
        $this->setScriptHandle(self::JS_HANDLE_CORE_BLOCKS);
        $this->setStyleHandle(self::CSS_HANDLE_CORE_BLOCKS);
    }
}
