<?php

namespace EventEspresso\core\domain\entities\routing\handlers;

use DomainException;
use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class Route
 * - class for detecting and matching with incoming requests
 * (this can be done by directly examining the incoming Request
 * or via a Route Match Specification class for better SRP and sharing)
 * - registers dependencies for any classes that are required from that point forwards in the request
 * - loads additional classes for handling the request
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class Route implements RouteInterface
{

    // /** will most likely need this for routing so pencilled it in for now
    //  * @type CommandBusInterface $command_bus
    //  */
    // protected $command_bus;

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var RouteMatchSpecificationInterface $specification
     */
    private $specification;

    /**
     * @var boolean $handled
     */
    private $handled = false;


    /**
     * Route constructor.
     *
     * @param EE_Dependency_Map                $dependency_map
     * @param LoaderInterface                  $loader
     * @param RequestInterface                 $request
     * @param RouteMatchSpecificationInterface $specification
     */
    public function __construct(
        EE_Dependency_Map $dependency_map,
        LoaderInterface $loader,
        RequestInterface $request,
        RouteMatchSpecificationInterface $specification = null
    ) {
        $this->dependency_map = $dependency_map;
        $this->loader = $loader;
        $this->request = $request;
        $this->specification = $specification;
    }


    /**
     * @since $VID:$
     */
    abstract protected function registerDependencies();


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    abstract protected function requestHandler();


    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->specification instanceof RouteMatchSpecificationInterface
            ? $this->specification->isMatchingRoute()
            : false;
    }


    /**
     * @return bool
     */
    final public function isHandled()
    {
        return $this->handled;
    }


    /**
     * @param bool $handled
     */
    private function setHandled($handled)
    {
        $this->handled = filter_var($handled, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * runs route requestHandler() if
     *      - route has not previously been handled
     *      - route specification matches for current request
     * sets route handled property based on results returned by requestHandler()
     *
     * @return bool
     * @throws DomainException
     * @since   $VID:$
     */
    final public function handleRequest()
    {
        if (! $this->isHandled() && $this->matchesCurrentRequest()) {
            do_action('AHEE__EventEspresso_core_domain_entities_routes_handlers_Route__handleRequest', $this);
            $this->registerDependencies();
            $handled = $this->requestHandler();
            if (! is_bool($handled)) {
                throw new DomainException(
                    esc_html__(
                        'Route::requestHandler() must return a boolean to indicate whether the request has been handled or not.',
                        'eventespresso'
                    )
                );
            }
            $this->setHandled($handled);
        }
        return $this->handled;
    }
}
