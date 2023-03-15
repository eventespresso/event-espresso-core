<?php

namespace EventEspresso\core\services\routing;

use EventEspresso\core\services\json\JsonDataNode;

/**
 * RouteInterface
 * - class for detecting and matching with incoming requests
 * (this can be done by directly examining the incoming Request
 * or via a Route Match Specification class for better SRP and sharing)
 * - registers dependencies for any classes that are required from that point forwards in the request
 * - loads additional classes for handling the request
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface RouteInterface
{
    /**
     * @return JsonDataNode
     */
    public function dataNode(): ?JsonDataNode;


    /**
     * final method called by RouteHandler on Route which in turn calls requestHandler()
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function handleRequest(): bool;


    /**
     * a place to run any setup required for matchesCurrentRequest() which runs immediately after
     *
     * @since 5.0.0.p
     */
    public function initialize();


    /**
     * returns true if the route has already been handled
     *
     * @return bool
     */
    public function isHandled(): bool;


    /**
     * returns true if the route has not yet been handled
     *
     * @return bool
     */
    public function isNotHandled(): bool;


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool;
}
