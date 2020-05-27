<?php

namespace EventEspresso\core\domain\entities\routing\handlers;

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
interface RouteInterface
{

    /**
     * final method called by RouteHandler on Route which in turn calls requestHandler()
     *
     * @return bool
     * @since   $VID:$
     */
    public function handleRequest();


    /**
     * @return bool
     */
    public function isHandled();


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest();
}
