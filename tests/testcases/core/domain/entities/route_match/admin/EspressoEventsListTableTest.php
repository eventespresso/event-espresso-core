<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventsListTable;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * EspressoEventsListTableTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEventsListTableTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @since $VID:$
     * @return EspressoEventsListTable
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params)
    {
        return new EspressoEventsListTable($this->getRequest($request_params));
    }

    /**
     * @since $VID:$
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        $route_match_specification = $this->getMultiRouteSpecification(
            array('page' => 'espresso_events')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'page' => 'espresso_events',
                'action' => 'default',
            )
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'page' => 'not_espresso_page',
                'action' => 'WSOD',
            )
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
