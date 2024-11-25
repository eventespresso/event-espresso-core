<?php

namespace EventEspresso\core\services\addon\api;

use DomainException;
use EventEspresso\core\services\routing\RouteHandler;
use Exception;
use Throwable;

/**
 * Class AddonRoutes
 * for tracking and loading routes for add-ons
 *
 * @package EventEspresso\core\services\addon\api
 * @since 5.0.30.p
 */
class AddonRoutes
{
    protected RouteHandler $route_handler;

    /**
     * array of fully qualified class names for routes where keys are add-on slugs
     * @var string[][]
     */
    private array $routes = [];


    /**
     * @param RouteHandler $route_handler
     */
    public function __construct(RouteHandler $route_handler)
    {
        $this->route_handler = $route_handler;
    }


    /**
     * @param string $route_fqcn
     * @param string $addon_slug The class name of the add-on that the route belongs to
     * @return void
     */
    public function addRouteFor(string $route_fqcn, string $addon_slug)
    {
        if (! isset($this->routes[ $addon_slug ])) {
            $this->routes[ $addon_slug ] = [];
        }
        $this->routes[ $addon_slug ][] = $route_fqcn;
    }


    /**
     * @throws Exception|DomainException|Throwable
     */
    public function loadRoutesFor(string $addon_slug)
    {
        if (isset($this->routes[ $addon_slug ])) {
            foreach ($this->routes[ $addon_slug ] as $route_fqcn) {
                $this->route_handler->addRoute($route_fqcn);
            }
        }
    }
}
