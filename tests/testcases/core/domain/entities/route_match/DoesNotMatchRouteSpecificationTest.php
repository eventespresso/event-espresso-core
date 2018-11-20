<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\DoesNotMatchRouteSpecification;
use EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface;

/**
 * Class DoesNotMatchRouteSpecificationTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class DoesNotMatchRouteSpecificationTest extends RouteMatchSpecificationDecoratorTest
{
    /**
     * @since 4.9.71.p
     * @param RouteMatchSpecificationInterface|null $route_match_specification
     * @return DoesNotMatchRouteSpecification
     */
    public function getDecorator(RouteMatchSpecificationInterface $route_match_specification = null)
    {
        $route_match_specification = $route_match_specification instanceof RouteMatchSpecificationInterface
            ? $route_match_specification
            : $this->getRouteMatchSpecification();
        return new DoesNotMatchRouteSpecification($route_match_specification);
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        // useless test but need to override parent constructor
        $this->assertInstanceOf(
            'EventEspresso\core\domain\entities\route_match\DoesNotMatchRouteSpecification',
            $this->getDecorator()
        );

    }
    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testIsMatchingRoute()
    {
        // not testing 1-2-1-2 request
        $route_match_specification = $this->getRouteMatchSpecification(array('another' => 'request'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-one-two');
        $decorator = $this->getDecorator($route_match_specification);
        // IT'S OPPOSITE DAY!!!
        $this->assertTrue($decorator->isMatchingRoute());
        //  testing 1-2-1-2 request but checking for other route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-three');
        $decorator = $this->getDecorator($route_match_specification);
        // IT'S OPPOSITE DAY!!!
        $this->assertTrue($decorator->isMatchingRoute());
        //  testing 1-2-1-2 request and route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-one-two');
        $decorator = $this->getDecorator($route_match_specification);
        // IT'S OPPOSITE DAY!!!
        $this->assertFalse($decorator->isMatchingRoute());
    }
}