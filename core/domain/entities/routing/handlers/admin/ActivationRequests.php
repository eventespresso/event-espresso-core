<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EventEspresso\core\services\routing\PrimaryRoute;

/**
 * Class ActivationRequests
 * registers dependencies for activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class ActivationRequests extends PrimaryRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isActivation();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute',
            AdminRoute::getDefaultDependencies()
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage',
            AdminRoute::getDefaultDependencies()
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
        $this->setRouteRequestType(PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION);
        return true;
    }
}
