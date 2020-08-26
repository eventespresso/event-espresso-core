<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData;
use EventEspresso\core\domain\services\assets\WordPressPluginsPageAssetManager;
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
            'EventEspresso\core\domain\services\assets\WordPressPluginsPageAssetManager',
            [
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EE_Currency_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EE_Template_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
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

        /** @var EventEspressoData $primary_data_node */
        $primary_data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData'
        );
        $primary_data_node->setTargetScript(WordPressPluginsPageAssetManager::ASSET_HANDLE_WP_PLUGINS_PAGE);
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
        /** @var WordPressPluginsPageAssetManager $asset_manager */
        $asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\WordPressPluginsPageAssetManager'
        );
        add_action('admin_enqueue_scripts', [$asset_manager, 'enqueueAssets']);
        return true;
    }
}
