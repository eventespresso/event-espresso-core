<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\mocks\core\domain\entities\routing\specifications\MultiRouteSpecificationMock;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\Exception;
use stdClass;

/**
 * MultiRouteSpecificationTest
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class MultiRouteSpecificationTest extends MultiRouteSpecificationTestBase
{

    /**
     * @param array $specifications
     * @since 4.9.71.p
     * @return MultiRouteSpecificationMock
     * @throws InvalidEntityException
     */
    public function getMultiRouteSpecification(array $specifications)
    {
        return new MultiRouteSpecificationMock(
            $specifications,
            $this->getRequest($this->request_params)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws Exception
     * @throws InvalidEntityException
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\MultiRouteSpecificationMock',
            $this->getMultiRouteSpecification(
                array(
                    $this->getRouteMatchOne(),
                    $this->getRouteMatchTwo(),
                )
            )
        );
    }

    /**
     * @since 4.9.71.p
     * @throws Exception
     * @throws InvalidEntityException
     */
    public function test__constructWithBadParameters()
    {
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidEntityException');
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\MultiRouteSpecificationMock',
            $this->getMultiRouteSpecification(
                array(
                    new stdClass(),
                    "what the heck... I'm not even an object!?!?!?"
                )
            )
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
        $route_match_specification->addResults(true);
        $route_match_specification->addResults(true);
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                $this->getRouteMatchOne(),
                $this->getRouteMatchTwo(),
                // should return false
                $this->getRouteMatchThree(),
            )
        );
        $route_match_specification->addResults(true);
        $route_match_specification->addResults(true);
        $route_match_specification->addResults(false);
        $this->assertTrue($route_match_specification->isMatchingRoute());
    }
}