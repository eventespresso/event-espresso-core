<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\database\MaintenanceStatus;

/**
 * Class FrontendRequests
 * registers dependencies and loads resources for all non-authorized standard HTTP requests
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class FrontendRequests extends PublicRoute
{
    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return ($this->request->isFrontend() || $this->request->isFrontAjax() || $this->request->isIframe())
               && MaintenanceStatus::isDisabled();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EE_Front_Controller',
            [
                'EE_Registry'                                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\CurrentPage' => EE_Dependency_Map::load_from_cache,
                'EE_Module_Request_Router'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        do_action('AHEE__EE_System__load_controllers__load_front_controllers');
        $this->loader->getShared('EE_Front_Controller');
        return true;
    }
}
