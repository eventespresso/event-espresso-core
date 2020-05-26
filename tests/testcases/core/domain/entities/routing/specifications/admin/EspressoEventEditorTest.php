<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditor;
use EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorAddNew;
use EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorEdit;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\MultiRouteSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * EspressoEventEditorTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditorTest extends MultiRouteSpecificationTestBase
{

    /**
     * @param array $request_params
     * @since 4.9.71.p
     * @return EspressoEventEditor
     * @throws InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params)
    {
        $request = $this->getRequest($request_params);
        return new EspressoEventEditor(
            new EspressoEventEditorEdit($request),
            new EspressoEventEditorAddNew($request),
            $request
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
                'page' => 'espresso_events',
                'action'=> 'edit',
            )
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'page' => 'espresso_events',
                'action'=> 'create_new',
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
