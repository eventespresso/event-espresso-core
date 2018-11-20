<?php

namespace EventEspresso\core\domain\entities\route_match;

use EventEspresso\core\services\request\RequestInterface;

/**
 * Class RouteMatchSpecification
 * Variation of the Specification design pattern for matching the current request to specific routes.
 *
 * !!! IMPORTANT !!!
 *
 * RouteMatchSpecification classes that only have dependencies for the RequestInterface
 * or other RouteMatchSpecification classes can have their dependencies automatically resolved
 * by the RouteMatchSpecificationManager and do not need to be registered by calling
 * EE_Dependency_Map::registerDependencies() or manually adding an entry in the dependency map.
 * RouteMatchSpecification classes with more complex dependencies will still have to
 * register their dependencies normally
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
abstract class RouteMatchSpecification implements RouteMatchSpecificationInterface
{

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * RouteMatch constructor.
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }
}
