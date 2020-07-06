<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\services\routing\RouteInterface;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\Collection;

/**
 * Class RouteCollection
 * SplObjectStorage Collection of \EventEspresso\core\services\routing\RouteInterface objects
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteCollection extends Collection
{

    const COLLECTION_NAME = 'routes';


    /**
     * RouteMatchSpecificationCollection constructor
     *
     * @throws InvalidInterfaceException
     */
    public function __construct()
    {
        parent::__construct(
            'EventEspresso\core\services\routing\RouteInterface',
            RouteCollection::COLLECTION_NAME
        );
    }


    /**
     * getIdentifier
     * Overrides EventEspresso\core\services\collections\Collection::getIdentifier()
     * If no $identifier is supplied, then the  fully qualified class name is used
     *
     * @param        $object
     * @param mixed  $identifier
     * @return bool
     */
    public function getIdentifier($object, $identifier = null)
    {
        return ! empty($identifier)
            ? $identifier
            : get_class($object);
    }


    /**
     * finds and returns all Routes that have yet to be handled
     *
     * @return RouteInterface[]
     */
    public function getRoutesForCurrentRequest()
    {
        $routes = [];
        $this->rewind();
        while ($this->valid()) {
            /** @var RouteInterface $route */
            $route = $this->current();
            if ($route->matchesCurrentRequest()) {
                $routes[] = $route;
            }
            $this->next();
        }
        $this->rewind();
        return $routes;
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
        $this->rewind();
        while ($this->valid()) {
            $this->current()->handleRequest();
            $this->next();
        }
        $this->rewind();
    }
}
