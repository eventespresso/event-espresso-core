<?php

namespace EventEspresso\core\domain\entities\route_match;

/**
 * Class MatchAllRouteSpecifications
 * Returns true if ALL of the supplied Route Match Specifications also return true
 * ie: supplied Route Match Specifications joined using AND logic
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class MatchAllRouteSpecifications extends MultiRouteSpecification
{

    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        foreach ($this->specifications as $specification) {
            if (! $specification->isMatchingRoute()) {
                return false;
            }
        }
        return true;
    }
}
