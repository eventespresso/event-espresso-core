<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\domain\entities\routing\handlers\RouteInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\loaders\LoaderInterface;
use Exception;

/**
 * Class RouteHandler
 * Description
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteHandler
{

    /**
     * @var LoaderInterface
     */
    private $loader;

    /**
     * @var RouteCollection $routes
     */
    private $routes;


    /**
     * RouteHandler constructor.
     *
     * @param LoaderInterface  $loader
     * @param RouteCollection $routes
     */
    public function __construct(LoaderInterface $loader, RouteCollection $routes) {
        $this->loader = $loader;
        $this->routes = $routes;
    }


    /**
     * @param string $fqcn   Fully Qualified Class Name for Route
     * @param bool   $handle if true [default] will immediately call RouteInterface::handleRequest()
     * @throws Exception
     * @since $VID:$
     */
    public function addRoute($fqcn, $handle = true)
    {
        try {
            $route = $this->loader->getShared($fqcn);
            if (! $route instanceof RouteInterface) {
                throw new InvalidClassException(
                    sprintf(
                        esc_html__(
                            'The supplied FQCN (%1$s) must be an instance of RouteInterface.',
                            'eventespresso'
                        ),
                        $fqcn
                    )
                );
            }
            $this->routes->add($route);
            if ($handle) {
                $route->handleRequest();
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * finds and returns all Routes that have yet to be handled
     *
     * @return RouteInterface[]
     */
    public function getRoutesForCurrentRequest()
    {
        return $this->routes->getRoutesForCurrentRequest();
    }


    /**
     * calls RouteInterface::handleRequest() on all Routes that
     *      - match current request
     *      - have yet to be handled
     *
     * @return void
     */
    public function handleRoutesForCurrentRequest()
    {
        $this->routes->handleRoutesForCurrentRequest();
    }
}
