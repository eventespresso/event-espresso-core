<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorAddNew;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * EspressoEventEditorAddNewTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditorAddNewTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @since 4.9.71.p
     * @return EspressoEventEditorAddNew
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params)
    {
        return new EspressoEventEditorAddNew($this->getRequest($request_params));
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
                'action' => 'create_new',
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
