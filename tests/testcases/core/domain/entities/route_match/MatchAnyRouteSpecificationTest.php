<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use \EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;

/**
 * Class MultiRouteSpecificationTEst
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MatchAnyRouteSpecificationTest extends MultiRouteSpecificationTestBase
{
    /**
     * @param array $specifications
     * @since 4.9.71.p
     * @return MatchAnyRouteSpecification
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $specifications)
    {
        return new MatchAnyRouteSpecification(
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
                // will not match but test will pass after hitting the next spec
                $this->getRouteMatchThree(),
                $this->getRouteMatchOne(),
                $this->getRouteMatchTwo(),
            )
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
    }
}