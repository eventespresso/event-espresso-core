<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\MatchAllRouteSpecifications;

/**
 * MatchAllRouteSpecificationsTest
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MatchAllRouteSpecificationsTest extends MultiRouteSpecificationTestBase
{
    /**
     * @param array $specifications
     * @since 4.9.71.p
     * @return MatchAllRouteSpecifications
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $specifications)
    {
        return new MatchAllRouteSpecifications(
            $specifications,
            $this->getRequest($this->request_params)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                $this->getRouteMatchOne(),
                $this->getRouteMatchTwo(),
            )
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                $this->getRouteMatchOne(),
                $this->getRouteMatchTwo(),
                // will not match
                $this->getRouteMatchThree(),
            )
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}