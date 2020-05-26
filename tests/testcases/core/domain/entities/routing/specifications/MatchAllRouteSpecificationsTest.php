<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

use EventEspresso\core\domain\entities\routing\specifications\MatchAllRouteSpecifications;
use EventEspresso\core\exceptions\InvalidEntityException;
use PHPUnit\Framework\AssertionFailedError;

/**
 * MatchAllRouteSpecificationsTest
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MatchAllRouteSpecificationsTest extends MultiRouteSpecificationTestBase
{
    /**
     * @param array $specifications
     * @return MatchAllRouteSpecifications
     * @throws InvalidEntityException
     *@since 4.9.71.p
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
     * @throws AssertionFailedError
     * @throws InvalidEntityException
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