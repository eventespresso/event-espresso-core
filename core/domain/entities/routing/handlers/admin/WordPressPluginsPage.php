<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\Route;
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
        return $this->request->isAdmin()
               && strpos($this->request->requestUri(), 'wp-admin/plugins.php') !== false;
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\assets\WordpressPluginsPageAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\admin\ExitModal' => EE_Dependency_Map::load_from_cache,
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
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        $this->loader->getShared('EventEspresso\core\domain\services\assets\WordpressPluginsPageAssetManager');
        /** @var PluginUpsells $plugin_upsells */
        $plugin_upsells = $this->loader->getShared('EventEspresso\core\domain\services\admin\PluginUpsells');
        $plugin_upsells->decafUpsells();
        return true;
    }
}
