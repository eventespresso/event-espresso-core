<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * EspressoEventEditorEditTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditorEditTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @since 4.9.71.p
     * @return EspressoEventEditorEdit
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params)
    {
        return new EspressoEventEditorEdit($this->getRequest($request_params));
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
                'page' => 'espresso_events',
                'action' => 'edit',
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
