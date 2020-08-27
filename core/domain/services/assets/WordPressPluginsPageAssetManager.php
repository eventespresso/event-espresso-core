<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\domain\Domain;

/**
 * WordPressPluginsPageAssetManager
 * assets for WP Plugins admin page
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPluginsPageAssetManager extends ReactAssetManager
{
    const DOMAIN = 'wpPluginsPage';

    const ASSET_HANDLE_WP_PLUGINS_PAGE = Domain::ASSET_NAMESPACE . WordPressPluginsPageAssetManager::DOMAIN;

    /**
     * @throws DomainException
     */
    public function enqueueAssets()
    {
        if ($this->verifyAssetIsRegistered(WordPressPluginsPageAssetManager::ASSET_HANDLE_WP_PLUGINS_PAGE)) {
            wp_enqueue_script(WordPressPluginsPageAssetManager::ASSET_HANDLE_WP_PLUGINS_PAGE);
            wp_enqueue_style(WordPressPluginsPageAssetManager::ASSET_HANDLE_WP_PLUGINS_PAGE);
        }
    }
}
