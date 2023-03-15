<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\assets\WordPressPluginsPageAssetManager;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\WordPressPluginsPageData;
use EventEspresso\core\domain\services\admin\PluginUpsells;

/**
 * Class WordPressPluginsPage
 * detects and executes logic for the WordPress Plugins admin page
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class WordPressPluginsPage extends AdminRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        global $pagenow;
        return $pagenow === 'plugins.php' && ($this->request->isAdmin() || $this->request->isAdminAjax());
    }


    /**
     * @since 5.0.0.p
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

        $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData'
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
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        /** @var WordPressPluginsPageAssetManager $asset_manager */
        $asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\WordPressPluginsPageAssetManager'
        );
        add_action('admin_enqueue_scripts', [$asset_manager, 'enqueueAssets']);
        return true;
    }
}
