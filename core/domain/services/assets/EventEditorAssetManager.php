<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\domain\Domain;

/**
 * EventEditorAssetManager assets for the EE admin event editor
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EventEditorAssetManager extends ReactAssetManager
{
    const DOMAIN = 'eventEditor';

    const ASSET_HANDLE_EVENT_EDITOR = Domain::ASSET_NAMESPACE . '-' . EventEditorAssetManager::DOMAIN;


    /**
     * @throws DomainException
     */
    public function enqueueEventEditor()
    {
        if ($this->verifyAssetIsRegistered(EventEditorAssetManager::ASSET_HANDLE_EVENT_EDITOR)) {
            wp_enqueue_script(EventEditorAssetManager::ASSET_HANDLE_EVENT_EDITOR);
            wp_enqueue_style(EventEditorAssetManager::ASSET_HANDLE_EVENT_EDITOR);
        }
    }
}
