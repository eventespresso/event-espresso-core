<?php

namespace EventEspresso\tests\mocks\core\domain\entities\route_match;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;
use EventEspresso\core\services\request\RequestInterface;

/**
 * RouteMatchSpecificationMock
 *
 * @package EventEspresso\tests\mocks\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteMatchSpecificationMock extends RouteMatchSpecification
{
    private $param;
    private $value;

    /**
     * @param mixed $param
     */
    public function setParam($param)
    {
        $this->param = $param;
    }

    /**
     * @param mixed $value
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

    /**
     * @return RequestInterface
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * @return mixed
     */
    public function getParam()
    {
        return $this->param;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return $this->request->getRequestParam($this->param) === $this->value;
    }
}