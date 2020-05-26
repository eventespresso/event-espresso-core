<?php

namespace EventEspresso\tests\mocks\core\domain\entities\routing;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationDecorator;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;

/**
 * Class RouteMatchSpecificationDecoratorMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\routing
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