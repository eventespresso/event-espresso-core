<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use DomainException;
use EE_Dependency_Map;
use EventEspresso\core\domain\services\assets\EspressoCoreAppAssetManager;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\services\assets\AssetCollection;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\WordPressPluginsPageData;
use EventEspresso\core\domain\services\admin\PluginUpsells;

/**
 * Class WordPressPluginsPage
 * detects and executes logic for the WordPress Plugins admin page
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPluginsPage extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        global $pagenow;
        return $this->request->isAdmin() && $pagenow && $pagenow === 'plugins.php';
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\WordPressPluginsPageData',
            [
                'EventEspresso\core\domain\services\admin\ExitModal'     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\ExitModal',
            ['EventEspresso\core\services\assets\Registry' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\PluginUpsells',
            ['EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache]
        );

        /** @var WordPressPluginsPageData $data_node */
        $data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\WordPressPluginsPageData'
        );
        $this->setDataNode($data_node);
        /** @var PluginUpsells $plugin_upsells */
        $plugin_upsells = $this->loader->getShared('EventEspresso\core\domain\services\admin\PluginUpsells');
        $plugin_upsells->decafUpsells();
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        /** @var EspressoCoreAppAssetManager $asset_manager */
        $this->asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\EspressoCoreAppAssetManager'
        );
        add_action('admin_enqueue_scripts', [$this, 'addDependencies'], 3);
        add_action('admin_enqueue_scripts', [$this->asset_manager, 'enqueueBrowserAssets'], 100);
        wp_enqueue_style('wp-components');
        return true;
    }


    /**
     * EspressoCoreAppAssetManager sets 'wp-i18n' as the only dependency for its scripts,
     * but the ExitSurvey uses additional WP core assets, so this method retrieves the
     * 'eventespresso-core-app' script and updates its dependencies accordingly
     *
     * @since $VID:$
     */
    public function addDependencies()
    {
        if (! $this->asset_manager instanceof EspressoCoreAppAssetManager) {
            throw new DomainException(
                esc_html__('Invalid or missing EspressoCoreAppAssetManager!')
            );
        }
        $assets = $this->asset_manager->getAssets();
        if (! $assets instanceof AssetCollection) {
            throw new DomainException(
                esc_html__('Invalid or missing AssetCollection!')
            );
        }
        $appJs = $assets->getJavascriptAsset(EspressoCoreAppAssetManager::JS_HANDLE_EDITOR);
        if (! $appJs instanceof JavascriptAsset) {
            throw new DomainException(
                sprintf(
                    esc_html__('Invalid or missing JavascriptAsset! Expected '),
                    EspressoCoreAppAssetManager::JS_HANDLE_EDITOR
                )
            );
        }
        $appJs->addDependencies(['wp-components', 'wp-url']);
    }
}
