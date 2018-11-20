<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\frontend;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * AnyFrontendRequest
 * Returns true when the current request is for any front end.
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\frontend
 * @author  Darren Ethier
 * @since   4.9.71.p
 */
class AnyFrontendRequest extends RouteMatchSpecification
{
    public function isMatchingRoute()
    {
        return $this->request->isFrontend();
    }
}
