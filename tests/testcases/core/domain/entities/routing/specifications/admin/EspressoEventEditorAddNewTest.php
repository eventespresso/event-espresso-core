<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorAddNew;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\RouteMatchSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * EspressoEventEditorAddNewTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditorAddNewTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @return EspressoEventEditorAddNew
     * @throws InvalidEntityException
     * @since 4.9.71.p
     */
    public function getMultiRouteSpecification(array $request_params): EspressoEventEditorAddNew
    {
        return new EspressoEventEditorAddNew(
            $this->getRequest(
                $request_params,
                [],
                [],
                [],
                [],
                RequestTypeContext::ADMIN
            )
        );
    }


    /**
     * @throws AssertionFailedError
     * @throws InvalidEntityException
     * @since 4.9.71.p
     */
    public function testIsMatchingRoute()
    {
        $route_match_specification = $this->getMultiRouteSpecification(
            [
                'page'   => 'espresso_events',
                'action' => 'create_new',
            ]
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            [
                'page'   => 'not_espresso_page',
                'action' => 'WSOD',
            ]
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
