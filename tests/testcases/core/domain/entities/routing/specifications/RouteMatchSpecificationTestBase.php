<?php
namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\services\contexts\RequestTypeContextChecker;
use EventEspresso\core\services\request\Request;
use EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;
use PHPUnit\Framework\Exception;

/**
 * RouteMatchSpecificationTestBase
 *
 * @package EventEspresso\tests\testcases\core\domain\entities\routing
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class RouteMatchSpecificationTestBase extends EspressoPHPUnitFrameworkTestCase
{

    private $pagenow;


    /**
     * @param string $page_now
     * @since $VID:$
     */
    public function setUp($page_now = 'admin.php')
    {
        global $pagenow;
        $this->pagenow = $pagenow;
        $pagenow = $page_now;
    }


    public function tearDown()
    {
        global $pagenow;
        $pagenow = $this->pagenow;
    }

    /**
     * @param array $get
     * @param array $post
     * @param array $cookie
     * @param array $server
     * @param array $files
     * @return RouteMatchSpecificationMock
     * @since 4.9.71.p
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
     * @param array  $get
     * @param array  $post
     * @param array  $cookie
     * @param array  $server
     * @param array  $files
     * @param string $request_type_slug
     * @return Request
     * @since 4.9.71.p
     */
    protected function getRequest(
        array $get = array(),
        array $post = array(),
        array $cookie = array(),
        array $server = array(),
        array $files = array(),
        $request_type_slug = RequestTypeContext::ADMIN
    ) {
        $request = new Request($get, $post, $cookie, $server, $files);
        $request->setRequestTypeContextChecker(
            new RequestTypeContextChecker(
                new RequestTypeContext(
                    $request_type_slug,
                    'mock request type'
                )
            )
        );
        return $request;
    }

    /**
     * @since 4.9.71.p
     * @throws Exception
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock',
            $this->getRouteMatchSpecification()
        );
    }
}
