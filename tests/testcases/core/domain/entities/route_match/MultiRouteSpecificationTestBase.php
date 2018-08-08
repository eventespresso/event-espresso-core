<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

/**
 * MultiRouteSpecificationTestBase
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class MultiRouteSpecificationTestBase extends RouteMatchSpecificationTestBase
{

    protected $request_params = array(
        'one' => '1',
        'two' => '2',
    );

    /**
     * @since $VID:$
     * @return \EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock
     */
    public function getRouteMatchOne()
    {
        $route_match_specification = $this->getRouteMatchSpecification($this->request_params);
        $route_match_specification->setParam('one');
        $route_match_specification->setValue('1');
        return $route_match_specification;
    }

    /**
     * @since $VID:$
     * @return \EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock
     */
    public function getRouteMatchTwo()
    {
        $route_match_specification = $this->getRouteMatchSpecification($this->request_params);
        $route_match_specification->setParam('two');
        $route_match_specification->setValue('2');
        return $route_match_specification;
    }

    /**
     * @since $VID:$
     * @return \EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock
     */
    public function getRouteMatchThree()
    {
        $route_match_specification = $this->getRouteMatchSpecification($this->request_params);
        $route_match_specification->setParam('three');
        $route_match_specification->setValue('3');
        return $route_match_specification;
    }
}