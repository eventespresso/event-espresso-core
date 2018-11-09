<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\MatchAllRouteSpecifications;

/**
 * MatchAllRouteSpecificationsTest
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class MatchAllRouteSpecificationsTest extends MultiRouteSpecificationTestBase
{
    /**
     * @param array $specifications
     * @since $VID:$
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
     * @since $VID:$
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