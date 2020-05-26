<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationDecoratorMock;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\Exception;

/**
 * Class RouteMatchSpecificationDecoratorTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationDecoratorTest extends RouteMatchSpecificationTestBase
{
    /**
     * @since 4.9.71.p
     * @param RouteMatchSpecificationInterface|null $route_match_specification
     * @return RouteMatchSpecificationDecoratorMock
     */
    public function getDecorator(RouteMatchSpecificationInterface $route_match_specification = null)
    {
        $route_match_specification = $route_match_specification instanceof RouteMatchSpecificationInterface
            ? $route_match_specification
            : $this->getRouteMatchSpecification();
        return new RouteMatchSpecificationDecoratorMock($route_match_specification);
    }

    /**
     * @since 4.9.71.p
     * @throws Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock',
            $this->getDecorator()->getSpecification()
        );

    }

    /**
     * @since 4.9.71.p
     * @throws AssertionFailedError
     */
    public function testIsMatchingRoute()
    {
        // not testing 1-2-1-2 request
        $route_match_specification = $this->getRouteMatchSpecification(array('another' => 'request'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-one-two');
        $decorator = $this->getDecorator($route_match_specification);
        $this->assertFalse($decorator->isMatchingRoute());
        //  testing 1-2-1-2 request but checking for other route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-three');
        $decorator = $this->getDecorator($route_match_specification);
        $this->assertFalse($decorator->isMatchingRoute());
        //  testing 1-2-1-2 request and route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-one-two');
        $decorator = $this->getDecorator($route_match_specification);
        $this->assertTrue($decorator->isMatchingRoute());
    }
}
