<?php

namespace EventEspresso\tests\mocks\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\MultiRouteSpecification;

/**
 * MultiRouteSpecificationMock
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MultiRouteSpecificationMock extends MultiRouteSpecification
{
    private $results = array();

    /**
     * @param bool $param
     */
    public function addResults($result)
    {
        $this->results[] = filter_var($result, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        foreach ($this->specifications as $index => $specification) {
            if (! isset($this->results[ $index ])) {
                return false;
            }
            if ($specification->isMatchingRoute() !== $this->results[ $index ]) {
                return false;
            }
        }
        return true;
    }
}