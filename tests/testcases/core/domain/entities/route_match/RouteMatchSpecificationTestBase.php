<?php
namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use PHPUnit_Framework_TestCase;

/**
 * RouteMatchSpecificationTestBase
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationTestBase extends PHPUnit_Framework_TestCase
{
    /**
     * @since 4.9.71.p
     * @return RouteMatchSpecificationMock
     */
    protected function getRouteMatchSpecification(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array(),
        array $files = array()
    ) {
        return new RouteMatchSpecificationMock(
            $this->getRequest($get, $post, $cookie, $server, $files)
        );
    }

    /**
     * @return RequestMock
     * @since 4.9.71.p
     */
    protected function getRequest(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array(),
        array $files = array()
    ) {
        /** @var RequestMock $request */
        $request = LoaderFactory::getLoader()->getNew(
            'EventEspresso\tests\mocks\core\services\request\RequestMock'
        );
        $request->resetRequestParams($get, $post, $cookie, $server, $files);
        return $request;
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock',
            $this->getRouteMatchSpecification()
        );
    }
}
// location:  /testcases/core/domain/entities/route_match/RouteMatchSpecificationTest.php
