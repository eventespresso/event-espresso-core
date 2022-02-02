<?php

namespace EventEspresso\tests\testcases\core\domain\services\contexts;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\services\contexts\RequestTypeContextDetector;
use EventEspresso\core\services\graphql\GraphQLEndpoint;
use EventEspresso\tests\mocks\core\domain\services\contexts\RequestTypeContextFactoryMock;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use InvalidArgumentException;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

class RequestTypeContextDetectorTest extends EspressoPHPUnitFrameworkTestCase
{

    /**
     * @dataProvider requestProvider
     * @param string     $expected
     * @param array|null $get
     * @param array|null $post
     * @param array|null $cookies
     * @param array|null $server
     * @param array|null $files
     * @param array|null $globalRouteConditions
     * @throws InvalidArgumentException
     * @since        4.9.70.p
     */
    public function testDetectRequestTypeContext(
        string $expected,
        ?array $get = [],
        ?array $post = [],
        ?array $cookies = [],
        ?array $server = [],
        ?array $files = [],
        ?array $globalRouteConditions = []
    ) {
        $this->initLoader();
        $factory = $this->loader->getShared(RequestTypeContextFactoryMock::class);
        static $prev_request = null;
        static $prev_detector = null;
        $request = $this->getRequest(
            $get,
            $post,
            $cookies,
            $server,
            $files,
            RequestMock::UNSET_REQUEST_TYPE
        );
        $this->assertNotEquals(
            $prev_request ? spl_object_hash($prev_request) : null,
            spl_object_hash($request)
        );
        $this->assertFalse($this->request->requestTypeIsSet());
        $detector = new RequestTypeContextDetector(
            new GraphQLEndpoint(),
            $request,
            $factory,
            $globalRouteConditions ?? ['EE_TESTS_DIR' => false]
        );
        $this->assertNotEquals(
            $prev_detector ? spl_object_hash($prev_detector) : null,
            spl_object_hash($detector)
        );
        $request_type = $detector->detectRequestTypeContext();
        $this->assertEquals($expected, $request_type->slug());
    }


    /**
     * @return array[]
     * @since 4.9.70.p
     */
    public function requestProvider(): array
    {
        // $factory = new RequestTypeContextFactoryMock();
        return [
            '1. Detect WP Scrape Request'              => [
                RequestTypeContext::WP_SCRAPE,
                ['wp_scrape_key' => '123', 'wp_scrape_nonce' => '456'],
            ],
            '2. Detect EE REST API Request'            => [
                RequestTypeContext::API,
                [],
                [],
                [],
                ['REQUEST_URI' => '/wp-json/' . Domain::API_NAMESPACE . '/'],
            ],
            '3. Detect WP REST API Request'            => [
                RequestTypeContext::WP_API,
                [],
                [],
                [],
                ['REQUEST_URI' => '/wp-json/'],
            ],
            '4. Detect Frontend AJAX Request'          => [
                RequestTypeContext::AJAX_FRONT,
                [],
                ['ee_front_ajax' => true],
                [],
                [],
                [],
                ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false],
            ],
            '5. Detect Admin AJAX Request'             => [
                RequestTypeContext::AJAX_ADMIN,
                [],
                ['ee_admin_ajax' => true],
                [],
                [],
                [],
                ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false],
            ],
            '6. Detect Other AJAX Request'             => [
                RequestTypeContext::AJAX_OTHER,
                [],
                [],
                [],
                [],
                [],
                ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false],
            ],
            '7. Detect WP Cron Request'                => [
                RequestTypeContext::CRON,
                [],
                [],
                [],
                ['REQUEST_URI' => '/wp-cron.php'],
            ],
            '8. Detect WP CLI Request'                 => [
                RequestTypeContext::CLI,
                [],
                [],
                [],
                [],
                [],
                ['WP_CLI' => true, 'EE_TESTS_DIR' => false],
            ],
            '9. Detect WP Admin Request'               => [
                RequestTypeContext::ADMIN,
                [],
                [],
                [],
                [],
                [],
                ['is_admin' => true, 'EE_TESTS_DIR' => false],
            ],
            '10. Detect Event List iFrame Request'      => [
                RequestTypeContext::IFRAME,
                ['event_list' => 'iframe'],
            ],
            '11. Detect Ticket Selector iFrame Request' => [
                RequestTypeContext::IFRAME,
                ['ticket_selector' => 'iframe'],
            ],
            '12. Detect Calendar iFrame Request'        => [
                RequestTypeContext::IFRAME,
                ['calendar' => 'iframe'],
            ],
            '13. Detect Feed Request'                   => [
                RequestTypeContext::FEED,
                [],
                [],
                [],
                ['REQUEST_URI' => '/feed/'],
            ],
            '14. Detect Frontend Request'               => [
                RequestTypeContext::FRONTEND,
                ['param' => 'value'],
            ],
        ];
    }
}

// location: /tests/testcases/core/domain/services/contexts/RequestTypeContextDetectorTest.php
