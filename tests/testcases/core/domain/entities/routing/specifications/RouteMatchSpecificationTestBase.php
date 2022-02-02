<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications;

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
    public function setUp(string $page_now = 'admin.php')
    {
        parent::setUp();
        global $pagenow;
        $this->pagenow = $pagenow;
        $pagenow       = $page_now;
    }


    public function tearDown()
    {
        global $pagenow;
        $pagenow = $this->pagenow;
        parent::tearDown();
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
        array $get = [],
        array $post = [],
        array $cookie = [],
        array $server = [],
        array $files = []
    ): RouteMatchSpecificationMock {
        return new RouteMatchSpecificationMock(
            $this->getRequest($get, $post, $cookie, $server, $files)
        );
    }


    /**
     * @throws Exception
     * @since 4.9.71.p
     */
    public function test__construct()
    {
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\domain\entities\routing\specifications\RouteMatchSpecificationMock',
            $this->getRouteMatchSpecification()
        );
    }
}
