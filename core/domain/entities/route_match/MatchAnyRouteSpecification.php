<?php

namespace EventEspresso\core\domain\entities\route_match;

/**
 * Class MatchAnyRouteSpecification
 * Returns true if ANY of the supplied Route Match Specifications also returns true
 * ie: supplied Route Match Specifications joined using OR logic
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MatchAnyRouteSpecification extends MultiRouteSpecification
{

    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        foreach ($this->specifications as $specification) {
            if ($specification->isMatchingRoute()) {
                return true;
            }
        }
        return false;
    }
}
