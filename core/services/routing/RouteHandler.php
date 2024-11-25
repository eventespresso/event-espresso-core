<?php

namespace EventEspresso\core\services\routing;

use DomainException;
use EventEspresso\core\domain\services\capabilities\CapabilitiesCheckerInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeHandler;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use Throwable;

/**
 * Class RouteHandler
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class RouteHandler
{
    private CapabilitiesCheckerInterface $capabilities_checker;

    private JsonDataNodeHandler $data_node_handler;

    private LoaderInterface $loader;

    protected RequestInterface $request;

    private RouteCollection $routes;

    private bool $print_data_nodes = true;

    protected string $route_request_type = '';


    /**
     * RouteHandler constructor.
     *
     * @param CapabilitiesCheckerInterface $capabilities_checker
     * @param JsonDataNodeHandler $data_node_handler
     * @param LoaderInterface     $loader
     * @param RequestInterface    $request
     * @param RouteCollection     $routes
     */
    public function __construct(
        CapabilitiesCheckerInterface $capabilities_checker,
        JsonDataNodeHandler $data_node_handler,
        LoaderInterface $loader,
        RequestInterface $request,
        RouteCollection $routes
    ) {
        $this->capabilities_checker = $capabilities_checker;
        $this->data_node_handler = $data_node_handler;
        $this->loader            = $loader;
        $this->request           = $request;
        $this->routes            = $routes;
    }


    /**
     * @param string $fqcn   Fully Qualified Class Name for Route
     * @param bool   $handle if true [default] will immediately call RouteInterface::handleRequest() after adding
     * @throws Exception|Throwable
     */
    public function addRoute(string $fqcn, bool $handle = true)
    {
        try {
            $route = $this->loader->getShared($fqcn);
            $this->validateRoute($route, $fqcn);
            if ($this->capabilities_checker->processCapCheck($route->getCapCheck(), true)) {
                $this->routes->add($route);
                $this->handle($route, $handle);
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay(
                new DomainException(
                    sprintf(
                        esc_html__(
                            'The following error occurred while trying to handle the "%1$s" route:%2$s%3$s',
                            'event_espresso'
                        ),
                        $fqcn,
                        '<br />',
                        $exception->getMessage()
                    )
                )
            );
        }
    }


    /**
     * @return string
     */
    public function getRouteRequestType(): string
    {
        return $this->route_request_type;
    }


    /**
     * @param string $route_request_type
     */
    public function setRouteRequestType(string $route_request_type = '')
    {
        $this->route_request_type = ! empty($route_request_type) ? $route_request_type : $this->route_request_type;
    }


    /**
     * @param RouteInterface $route
     * @param bool           $handle if true [default] will immediately call RouteInterface::handleRequest()
     */
    public function handle(RouteInterface $route, bool $handle = true)
    {
        if ($handle && $route->isNotHandled()) {
            $route->handleRequest();
            if ($route instanceof PrimaryRoute) {
                $this->setRouteRequestType($route->getRouteRequestType());
            }
            $data_node = $route->dataNode();
            if ($data_node instanceof JsonDataNode) {
                $this->data_node_handler->addDataNode($data_node);
                $this->printDataNodes();
            }
        }
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


    /**
     * @return void
     */
    private function printDataNodes()
    {
        if ($this->print_data_nodes) {
            add_action('admin_footer', [$this->data_node_handler, 'printDataNode'], 0);
            add_action('wp_footer', [$this->data_node_handler, 'printDataNode'], 0);
            $this->print_data_nodes = false;
        }
    }


    /**
     * @param RouteInterface|null $route
     * @param string              $fqcn
     */
    private function validateRoute(?RouteInterface $route, string $fqcn = '')
    {
        if (! $route instanceof RouteInterface) {
            throw new InvalidClassException(
                sprintf(
                    /*
                     * translators:
                     * The supplied FQCN (Fully\Qualified\Class\Name) must be an instance of RouteInterface.
                     */
                    esc_html__(
                        'The supplied FQCN (%1$s) must be an instance of RouteInterface.',
                        'event_espresso'
                    ),
                    $fqcn
                )
            );
        }
    }
}
