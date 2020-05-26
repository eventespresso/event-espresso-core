<?php
namespace EventEspresso\tests\testcases\core\domain\entities\routing;

use EventEspresso\core\services\request\Request;
use EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

/**
 * RouteMatchSpecificationTestBase
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationTestBase extends EspressoPHPUnitFrameworkTestCase
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
     * @since 4.9.71.p
     * @return Request
     */
    protected function getRequest(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array(),
        array $files = array()
    ) {
        return new Request($get, $post, $cookie, $server, $files);
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock',
            $this->getRouteMatchSpecification()
        );
    }
}
