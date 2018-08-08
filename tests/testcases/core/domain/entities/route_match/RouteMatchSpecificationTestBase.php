<?php
namespace EventEspresso\tests\testcases\core\domain\entities\route_match;

use EventEspresso\core\services\request\Request;
use EventEspresso\tests\mocks\core\domain\entities\route_match\RouteMatchSpecificationMock;
use PHPUnit_Framework_TestCase;

/**
 * RouteMatchSpecificationTestBase
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RouteMatchSpecificationTestBase extends PHPUnit_Framework_TestCase
{
    /**
     * @since $VID:$
     * @return RouteMatchSpecificationMock
     */
    protected function getRouteMatchSpecification(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array()
    ) {
        return new RouteMatchSpecificationMock(
            $this->getRequest($get, $post, $cookie, $server)
        );
    }

    /**
     * @since $VID:$
     * @return Request
     */
    protected function getRequest(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array()
    ) {
        return new Request($get, $post, $cookie, $server);
    }
}
// location:  /testcases/core/domain/entities/route_match/RouteMatchSpecificationTest.php
