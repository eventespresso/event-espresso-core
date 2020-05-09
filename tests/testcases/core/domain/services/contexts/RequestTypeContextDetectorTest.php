<?php

namespace EventEspresso\tests\testcases\core\domain\services\contexts;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\services\contexts\RequestTypeContextDetector;
use EventEspresso\tests\mocks\core\domain\services\contexts\RequestTypeContextFactoryMock;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use InvalidArgumentException;
use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;

class RequestTypeContextDetectorTest extends EspressoPHPUnitFrameworkTestCase
{

    /**
     * @dataProvider requestProvider
     * @param RequestTypeContextDetector $detector
     * @param string                     $expected
     * @throws InvalidArgumentException
     * @since        4.9.70.p
     */
    public function testDetectRequestTypeContext($detector, $expected)
    {
        $request_type = $detector->detectRequestTypeContext();
        $this->assertEquals($expected, $request_type->slug());
    }


    /**
     * @since 4.9.70.p
     * @return array
     */
    public function requestProvider()
    {
        $factory = new RequestTypeContextFactoryMock();
        return [
            'Detect WP Scrape Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array('wp_scrape_key' => '123', 'wp_scrape_nonce' => '456'),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::WP_SCRAPE,
            ],
            'Detect EE REST API Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array('REQUEST_URI' => '/wp-json/' . Domain::API_NAMESPACE . '/')
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::API,
            ],
            'Detect WP REST API Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array('REQUEST_URI' => '/wp-json/')
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::WP_API,
            ],
            'Detect Frontend AJAX Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array('ee_front_ajax' => true),
                        array(),
                        array()
                    ),
                    $factory,
                    ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::AJAX_FRONT,
            ],
            'Detect Admin AJAX Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array('ee_admin_ajax' => true),
                        array(),
                        array()
                    ),
                    $factory,
                    ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::AJAX_ADMIN,
            ],
            'Detect Other AJAX Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['DOING_AJAX' => true, 'EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::AJAX_OTHER,
            ],
            'Detect WP Cron Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array('REQUEST_URI' => '/wp-cron.php')
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::CRON,
            ],
            'Detect WP CLI Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['WP_CLI' => true, 'EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::CLI,
            ],
            'Detect WP Admin Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    array('is_admin' => true, 'EE_TESTS_DIR' => false)
                ),
                RequestTypeContext::ADMIN,
            ],
            'Detect Event List iFrame Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array('event_list' => 'iframe'),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::IFRAME,
            ],
            'Detect Ticket Selector iFrame Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array('ticket_selector' => 'iframe'),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::IFRAME,
            ],
            'Detect Calendar iFrame Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array('calendar' => 'iframe'),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::IFRAME,
            ],
            'Detect Feed Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array(),
                        array(),
                        array(),
                        array('REQUEST_URI' => '/feed/')
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::FEED,
            ],
            'Detect Frontend Request' => [
                new RequestTypeContextDetector(
                    new RequestMock(
                        array('param' => 'value'),
                        array(),
                        array(),
                        array()
                    ),
                    $factory,
                    ['EE_TESTS_DIR' => false]
                ),
                RequestTypeContext::FRONTEND,
            ],
        ];
    }
}

// location: /tests/testcases/core/domain/services/contexts/RequestTypeContextDetectorTest.php
