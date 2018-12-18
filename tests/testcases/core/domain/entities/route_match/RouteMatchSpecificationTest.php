<?php
namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

/**
 * RouteMatchSpecificationTest
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationTest extends RouteMatchSpecificationTestBase
{

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
        $this->assertFalse(
            $route_match_specification->isMatchingRoute()
        );
        //  testing 1-2-1-2 request but checking for other route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-three');
        $this->assertFalse(
            $route_match_specification->isMatchingRoute()
        );
        //  testing 1-2-1-2 request and route
        $route_match_specification = $this->getRouteMatchSpecification(array('testing' => 'one-two-one-two'));
        $route_match_specification->setParam('testing');
        $route_match_specification->setValue('one-two-one-two');
        $this->assertTrue(
            $route_match_specification->isMatchingRoute()
        );
    }
}

// location:  /testcases/core/domain/entities/route_match/RouteMatchSpecificationTest.php