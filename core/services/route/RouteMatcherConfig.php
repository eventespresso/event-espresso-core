<?php

namespace EventEspresso\core\services\route;

use Closure;
use EventEspresso\core\services\request\RequestInterface;

/**
 * RouteMatcher
 * A class used to derive whether the given route is a match for the defined conditions sent in via closure.
 *
 * @package EventEspresso\core\services\route
 * @author  Darren Ethier
 * @since   4.9.53.p
 */
final class RouteMatcherConfig
{
    /**
     * @var string
     */
    private $identifier;


    /**
     * @var Closure
     */
    private $matcher;


    /**
     * RouteMatcher constructor.
     *
     * @param string  $identifier   A simple string used to identify this instance.
     * @param Closure $matcher      A closure that receives an instance of Request and returns a boolean where true
     *                              true means on that route (derived from request) and false means not on that route.
     */
    public function __construct($identifier, Closure $matcher)
    {
        $this->identifier = (string) $identifier;
        $this->matcher = $matcher;
    }


    /**
     * @param RequestInterface $request
     * @return bool
     */
    public function isOnRoute(RequestInterface $request)
    {
        $matcher = $this->matcher;
        return apply_filters(
            'FHEE__EventEspresso_core_services_route_' . $this->getIdentifier() . '__onRoute',
            $matcher($request)
        );
    }


    /**
     * @return string
     */
    public function getIdentifier()
    {
        return $this->identifier;
    }
}
