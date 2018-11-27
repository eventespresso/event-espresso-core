<?php

namespace EventEspresso\tests\mocks\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationDecorator;
use EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface;

/**
 * Class RouteMatchSpecificationDecoratorMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationDecoratorMock extends RouteMatchSpecificationDecorator
{
    /**
     * @return RouteMatchSpecificationInterface
     */
    public function getSpecification()
    {
        return $this->specification;
    }

    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return $this->specification->isMatchingRoute();
    }
}