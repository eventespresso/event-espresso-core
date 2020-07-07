<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\services\routing\Route;

/**
 * Class RoutingRequests
 * registers dependencies for all other Routes as long as this is not an activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RoutingRequests extends Route
{

    /**
     * called just before matchesCurrentRequest()
     * and allows Route to perform any setup required such as calling setSpecification()
     *
     * @since $VID:$
     */
    public function initialize()
    {
        $basic_nodes = [
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Api',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\CurrentUser',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\GeneralSettings',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Locale',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteUrls',
        ];
        foreach ($basic_nodes as $basic_node) {
            $this->dependency_map->registerDependencies(
                $basic_node,
                ['EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache]
            );
        }
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData',
            [
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Api'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Config' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\JedLocaleData'                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'            => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Config',
            [
                'EventEspresso\core\domain\entities\routing\data_nodes\core\CurrentUser'        => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\EspressoCoreDomain' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\GeneralSettings'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Locale'             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteCurrency'       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteUrls'           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\EspressoCoreDomain',
            [
                'EventEspresso\core\domain\Domain'                       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteCurrency',
            [
                'EE_Currency_Config'                                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->setDataNode(
            $this->loader->getShared('EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData')
        );
    }


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return ! $this->request->isActivation() || $this->request->isUnitTesting();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $default = [
            'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
        ];
        $admin = ['EE_Admin_Config' => EE_Dependency_Map::load_from_cache] + $default;
        $public = ['EE_Maintenance_Mode' => EE_Dependency_Map::load_from_cache] + $default;
        $default_routes = [
            // default dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests'          => $default,
            'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\AssetRequests'       => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests'         => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests'     => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\SessionRequests'     => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat'  => $default,
            // admin dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute'           => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventsAdmin'  => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventEditor'  => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoLegacyAdmin'  => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\GutenbergEditor'  => $admin,
            // public dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\PersonalDataRequests' => $public,
            'EventEspresso\core\domain\entities\routing\handlers\frontend\FrontendRequests'  => $public,
        ];
        foreach ($default_routes as $route => $dependencies) {
            $this->dependency_map->registerDependencies($route, $dependencies);
        }
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        return true;
    }
}
