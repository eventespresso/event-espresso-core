<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeHandler;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use Exception;

/**
 * Class RouteHandler
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteHandler
{

    /**
     * @var JsonDataNodeHandler $data_node_handler
     */
    private $data_node_handler;

    /**
     * @var LoaderInterface $loader
     */
    private $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var RouteCollection $routes
     */
    private $routes;


    /**
     * RouteHandler constructor.
     *
     * @param JsonDataNodeHandler $data_node_handler
     * @param LoaderInterface  $loader
     * @param RequestInterface $request
     * @param RouteCollection $routes
     */
    public function __construct(
        JsonDataNodeHandler $data_node_handler,
        LoaderInterface $loader,
        RequestInterface $request,
        RouteCollection $routes
    ) {
        $this->data_node_handler = $data_node_handler;
        $this->loader = $loader;
        $this->request = $request;
        $this->routes = $routes;
        add_action('admin_footer', [$this->data_node_handler, 'printDataNode']);
        add_action('wp_footer', [$this->data_node_handler, 'printDataNode']);
    }


    /**
     * @param string $fqcn   Fully Qualified Class Name for Route
     * @param bool   $handle if true [default] will immediately call RouteInterface::handleRequest() after adding
     * @throws Exception
     * @since $VID:$
     */
    public function addRoute($fqcn, $handle = true)
    {
        try {
            if ($this->request->isActivation()) {
                return;
            }
            $route = $this->loader->getShared($fqcn);
            $this->validateRoute($route, $fqcn);
            $this->routes->add($route);
            $this->handle($route, $handle);
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @param RouteInterface $route
     * @param bool $handle if true [default] will immediately call RouteInterface::handleRequest()
     */
    public function handle(RouteInterface $route, $handle = true)
    {
        if ($handle && $route->isNotHandled()) {
            $route->handleRequest();
            $data_node = $route->dataNode();
            if ($data_node instanceof JsonDataNode) {
                $this->data_node_handler->addDataNode($data_node);
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
     * @param RouteInterface $route
     * @param string         $fqcn
     * @since $VID:$
     */
    private function validateRoute($route, $fqcn)
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
