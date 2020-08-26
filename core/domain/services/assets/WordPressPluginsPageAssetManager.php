<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\services\assets\AssetManager;

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

    const JS_HANDLE_WP_PLUGINS_PAGE = AssetManager::EE_NAMESPACE . WordPressPluginsPageAssetManager::DOMAIN;

    /**
     * @throws DomainException
     */
    public function enqueueAssets()
    {
        if ($this->verifyAssetIsRegistered(WordPressPluginsPageAssetManager::JS_HANDLE_WP_PLUGINS_PAGE)) {
            wp_enqueue_script(
                WordPressPluginsPageAssetManager::JS_HANDLE_WP_PLUGINS_PAGE,
                $this->domain->distributionAssetsUrl(),
                ['wp-components', 'wp-i18n', 'wp-url']
            );
            wp_enqueue_style('wp-components');
        }
    }
}
