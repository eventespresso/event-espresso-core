<?php

namespace EventEspresso\core\services\routing;

use DomainException;
use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\services\assets\AssetManagerInterface;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class PrimaryRoute
 * - A route that is the base that all other "sub-routes" branch from
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class PrimaryRoute extends Route
{
    const ROUTE_REQUEST_TYPE_ACTIVATION = 'ACTIVATION';

    const ROUTE_REQUEST_TYPE_REGULAR = 'REGULAR';


    /**
     * @var string $route_request_type
     */
    protected $route_request_type = '';


    /**
     * @param string $route_request_type
     */
    public function setRouteRequestType(string $route_request_type = '')
    {
        $this->route_request_type = $route_request_type;
    }


    /**
     * @return string
     */
    public function getRouteRequestType(): string
    {
        return $this->route_request_type;
    }
}
