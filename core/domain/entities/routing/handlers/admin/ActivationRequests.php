<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\services\routing\PrimaryRoute;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\services\routing\Router;

/**
 * Class ActivationRequests
 * registers dependencies for activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivationRequests extends PrimaryRoute
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->request->isActivation();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute',
            ['EE_Admin_Config' => EE_Dependency_Map::load_from_cache] + Route::$default_dependencies
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests',
            Route::$default_dependencies
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage',
            Route::$default_dependencies
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
        $this->setRouteRequestType(PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION);
        return true;
    }
}
