<?php

namespace EventEspresso\tests\testcases\core\services\routing;

use EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorEdit;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestParams;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\core\services\request\sanitizers\ServerSanitizer;
use EventEspresso\core\services\request\ServerParams;
use EventEspresso\core\services\routing\RouteMatchSpecificationCollection;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;
use EventEspresso\tests\mocks\core\services\dependencies\composites\Oof;
use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\Exception;

/**
 * Class RouteMatchSpecificationCollectionTest
 *
 * @package EventEspresso\tests\testcases\core\services\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationCollectionTest extends EspressoPHPUnitFrameworkTestCase
{
    /**
     * @since 4.9.71.p
     * @return RouteMatchSpecificationCollection
     * @throws InvalidInterfaceException
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
        $request_params = new RequestParams(new RequestSanitizer());
        $server_params  = new ServerParams(new ServerSanitizer());
        return new Request($request_params, $server_params);
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
     * @throws InvalidInterfaceException
     * @throws Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\core\services\routing\RouteMatchSpecificationCollection',
            $this->getCollection()
        );
    }

    /**
     * @since 4.9.71.p
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws DuplicateCollectionIdentifierException
     * @throws AssertionFailedError
     * @throws Exception
     */
    public function testAdd()
    {
        $request = $this->getRequest();
        $route_fqcn = 'EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorEdit';
        $collection = $this->getCollection();
        $this->assertFalse($collection->has($route_fqcn));
        $route = $this->getRoute($request);
        $this->assertTrue($collection->add($route));
        $this->assertTrue($collection->has($route_fqcn));
        // and now for something completely different.. and something invalid
        $oof_ouch_owie_fqcn = 'EventEspresso\tests\mocks\core\services\dependencies\composites\Oof';
        $this->assertFalse($collection->has($oof_ouch_owie_fqcn));
        $oof_ouch_owie = new Oof($request);
        $this->setExceptionExpected('EventEspresso\core\exceptions\InvalidEntityException');
        $collection->add($oof_ouch_owie);
        $this->assertFalse($collection->has($oof_ouch_owie_fqcn));
    }

    /**
     * @since 4.9.71.p
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws DuplicateCollectionIdentifierException
     * @throws AssertionFailedError
     */
    public function testGetIdentifier()
    {
        $request = $this->getRequest();
        $collection = $this->getCollection();
        $route = $this->getRoute($request);
        $this->assertTrue($collection->add($route));
        $this->assertEquals(
            'EventEspresso\core\domain\entities\routing\specifications\admin\EspressoEventEditorEdit',
            $collection->getIdentifier($route)
        );
        $this->assertEquals(
            'custom_identifier',
            $collection->getIdentifier($route, 'custom_identifier')
        );
    }
}

// location: /tests/testcases/core/services/routing/RouteMatchSpecificationCollectionTest.php
