<?php

namespace EventEspresso\core\domain\entities\editor;

use DomainException;
use EventEspresso\core\domain\Domain;
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
    const DOMAIN = 'blocks';

    const ASSET_HANDLE_EDITOR_BLOCKS = Domain::ASSET_NAMESPACE . '-core-' . CoreBlocksAssetManager::DOMAIN;
    const ASSET_HANDLE_CORE_BLOCKS = '';


    /**
     * @since  5.0.0.p
     * @throws DomainException
     */
    public function enqueueEventEditor()
    {
        if ($this->verifyAssetIsRegistered(CoreBlocksAssetManager::ASSET_HANDLE_EDITOR_BLOCKS)) {
            wp_enqueue_script(CoreBlocksAssetManager::ASSET_HANDLE_EDITOR_BLOCKS);
            wp_enqueue_style(CoreBlocksAssetManager::ASSET_HANDLE_EDITOR_BLOCKS);
        }
    }


    /**
     * @since 4.9.71.p
     */
    public function setAssetHandles()
    {
        $this->setEditorScriptHandle(CoreBlocksAssetManager::ASSET_HANDLE_EDITOR_BLOCKS);
        $this->setScriptHandle(CoreBlocksAssetManager::ASSET_HANDLE_CORE_BLOCKS);
    }
}
