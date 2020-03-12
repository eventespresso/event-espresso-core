<?php

namespace EventEspresso\tests\testcases\core\services\route_match;

use EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\route_match\RouteMatchSpecificationCollection;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Oof;
use PHPUnit_Framework_TestCase;

/**
 * Class RouteMatchSpecificationCollectionTest
 *
 * @package EventEspresso\tests\testcases\core\services\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationCollectionTest extends PHPUnit_Framework_TestCase
{
    /**
     * @since 4.9.71.p
     * @return RouteMatchSpecificationCollection
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    protected function getCollection()
    {
        return new RouteMatchSpecificationCollection();
    }

    /**
     * @since 4.9.71.p
     * @return Request
     */
    protected function getRequest()
    {
        return new Request(array(), array(), array(), array(), array());
    }

    /**
     * @param RequestInterface $request
     * @since 4.9.71.p
     * @return EspressoEventEditorEdit
     */
    protected function getRoute(RequestInterface $request)
    {
        return new EspressoEventEditorEdit($request);
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\route_match\RouteMatchSpecificationCollection',
            $this->getCollection()
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\services\collections\DuplicateCollectionIdentifierException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\Exception
     */
    public function testAdd()
    {
        $request = $this->getRequest();
        $route_fqcn = 'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit';
        $collection = $this->getCollection();
        $this->assertFalse($collection->has($route_fqcn));
        $route = $this->getRoute($request);
        $this->assertTrue($collection->add($route));
        $this->assertTrue($collection->has($route_fqcn));
        // and now for something completely different.. and something invalid
        $oof_ouch_owie_fqcn = 'EventEspresso\tests\mocks\core\services\dependencies\composites\Oof';
        $this->assertFalse($collection->has($oof_ouch_owie_fqcn));
        $oof_ouch_owie = new Oof($request);
        $exception = 'EventEspresso\core\exceptions\InvalidEntityException';
        if (method_exists($this, 'expectException')) {
            $this->expectException($exception);
        } elseif (method_exists($this, 'setExpectedException')) {
            $this->setExpectedException($exception);
        }
        $collection->add($oof_ouch_owie);
        $this->assertFalse($collection->has($oof_ouch_owie_fqcn));
    }

    /**
     * @since 4.9.71.p
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\services\collections\DuplicateCollectionIdentifierException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function testGetIdentifier()
    {
        $request = $this->getRequest();
        $collection = $this->getCollection();
        $route = $this->getRoute($request);
        $this->assertTrue($collection->add($route));
        $this->assertEquals(
            'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoEventEditorEdit',
            $collection->getIdentifier($route)
        );
        $this->assertEquals(
            'custom_identifier',
            $collection->getIdentifier($route, 'custom_identifier')
        );
    }
}

// location: /tests/testcases/core/services/route_match/RouteMatchSpecificationCollectionTest.php
