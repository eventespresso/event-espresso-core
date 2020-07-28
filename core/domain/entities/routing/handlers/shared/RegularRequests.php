<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\services\routing\PrimaryRoute;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\services\routing\Router;

/**
 * Class RoutingRequests
 * registers dependencies for all other Routes as long as this is not an activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RegularRequests extends PrimaryRoute
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
        $admin = ['EE_Admin_Config' => EE_Dependency_Map::load_from_cache] + Route::$default_dependencies;
        $public = ['EE_Maintenance_Mode' => EE_Dependency_Map::load_from_cache] + Route::$default_dependencies;
        $default_routes = [
            // default dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests'          => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage' => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests' => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\shared\AssetRequests'       => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests'         => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests'     => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\shared\SessionRequests'     => Route::$default_dependencies,
            'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat'  => Route::$default_dependencies,
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
        $this->setRouteRequestType(PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR);
        return true;
    }
}
