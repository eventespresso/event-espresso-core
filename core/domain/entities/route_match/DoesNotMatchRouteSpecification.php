<?php

namespace EventEspresso\core\domain\entities\route_match;

/**
 * Class DoesNotMatchRouteSpecification
 * Returns true if the supplied Route Match Specification returns false (does not match).
 * ex: could be used to determine if current request is NOT for the WP Plugins admin page
 * by supplying a RouteMatch specification that matches for that page
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class DoesNotMatchRouteSpecification extends RouteMatchSpecificationDecorator
{
    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return ! $this->specification->isMatchingRoute();
    }
}
