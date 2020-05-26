<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

use EventEspresso\core\domain\entities\routing\specifications\MatchAnyRouteSpecification;
use EventEspresso\core\exceptions\InvalidEntityException;
use PHPUnit\Framework\AssertionFailedError;

/**
 * Class MultiRouteSpecificationTEst
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MatchAnyRouteSpecificationTest extends MultiRouteSpecificationTestBase
{
    /**
     * @param array $specifications
     * @since 4.9.71.p
     * @return MatchAnyRouteSpecification
     * @throws InvalidEntityException
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
                // will not match but test will pass after hitting the next spec
                $this->getRouteMatchThree(),
                $this->getRouteMatchOne(),
                $this->getRouteMatchTwo(),
            )
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
    }
}