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
 * @since   $VID:$
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
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return $this->specification->isMatchingRoute();
    }
}