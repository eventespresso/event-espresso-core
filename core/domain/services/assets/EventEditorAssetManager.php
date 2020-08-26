<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\services\assets\AssetManager;

/**
 * EventEditorAssetManager assets for the EE admin event editor
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventEditorAssetManager extends ReactAssetManager
{
    const DOMAIN = 'eventEditor';

    const JS_HANDLE_EVENT_EDITOR = AssetManager::EE_NAMESPACE . EventEditorAssetManager::DOMAIN;


    /**
     * @throws DomainException
     */
    public function enqueueEventEditor()
    {
        if ($this->verifyAssetIsRegistered(EventEditorAssetManager::JS_HANDLE_EVENT_EDITOR)) {
            wp_enqueue_script(
                EventEditorAssetManager::JS_HANDLE_EVENT_EDITOR,
                $this->domain->distributionAssetsUrl()
            );
        }
    }
}
