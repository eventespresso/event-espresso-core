<?php

namespace EventEspresso\tests\testcases\core\services\request;

use EventEspresso\tests\includes\EspressoPHPUnitFrameworkTestCase;


/**
 * Class RequestTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\request_stack
 * @author  Brent Christensen
 *
 */
class RequestTest extends EspressoPHPUnitFrameworkTestCase
{

    public function getParams(array $params = [])
    {
        return $params + [
                'action'         => 'edit',
                'id'             => 123,
                'event-name-123' => 'Event 123',
            ];
    }


    public function postParams(array $params = [])
    {
        return $params + [
                'input-a' => 'A',
                'input-b' => 'B',
                'sub'     => [
                    'sub-a'   => 'AA',
                    'sub-b'   => 'BB',
                    'sub-sub' => [
                        'sub-sub-a' => 'AAA',
                        'sub-sub-b' => 'BBB',
                    ],
                ],
            ];
    }


    public function cookieParams(array $params = [])
    {
        return $params + [
                'PHPSESSID'   => 'abcdefghijklmnopqrstuvwxyz',
                'cookie_test' => 'a1b2c3d4e5f6g7h8i9j0.12345678',
            ];
    }


    public function testGetParams()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $this->assertEquals(
            $this->getParams(),
            $request->requestParams()
        );
    }


    public function testPostParams()
    {
        $request = $this->getRequest(
            [],
            $this->postParams(),
            [],
            []
        );
        $this->assertEquals(
            $this->postParams(),
            $request->postParams()
        );
    }


    public function testCookieParams()
    {
        $request = $this->getRequest(
            [],
            [],
            $this->cookieParams(),
            []
        );
        $this->assertEquals(
            $this->cookieParams(),
            $request->cookieParams()
        );
    }


    public function testParams()
    {
        $request = $this->getRequest(
            $this->getParams(),
            $this->postParams(),
            [],
            []
        );
        $this->assertEquals(
            array_merge($this->getParams(), $this->postParams()),
            $request->requestParams()
        );
    }


    public function testSet()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $key     = 'new-key';
        $value   = 'ima noob';
        $request->setRequestParam($key, $value);
        $params = $request->requestParams();
        $this->assertArrayHasKey($key, $params);
        $this->assertEquals($value, $params[ $key ]);
    }


    public function testSetEE()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $request->setRequestParam('ee', 'module-route');
        $params = $request->requestParams();
        $this->assertArrayHasKey('ee', $params);
        $this->assertEquals('module-route', $params['ee']);
    }


    public function testAlreadySetEE()
    {
        $request = $this->getRequest(
            $this->getParams(['ee' => 'existing-route']),
            [],
            [],
            []
        );
        $request->setRequestParam('ee', 'module-route');
        $params = $request->requestParams();
        $this->assertArrayHasKey('ee', $params);
        $this->assertNotEquals('module-route', $params['ee']);
        $this->assertEquals('existing-route', $params['ee']);
    }


    public function testOverrideAlreadySetEE()
    {
        $request = $this->getRequest(
            $this->getParams(['ee' => 'existing-route']),
            [],
            [],
            []
        );
        $request->setRequestParam('ee', 'module-route', true);
        $params = $request->requestParams();
        $this->assertArrayHasKey('ee', $params);
        $this->assertEquals('module-route', $params['ee']);
    }


    public function testGet()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        // key exists
        $this->assertEquals('edit', $request->getRequestParam('action'));
        // key does NOT exist and no default value set
        $this->assertNotEquals('edit', $request->getRequestParam('me-no-key'));
        $this->assertEquals('', $request->getRequestParam('me-no-key'));
        // key does NOT exist but default value set
        $this->assertNotEquals(
            'edit',
            $request->getRequestParam('me-no-key', 'me-default')
        );
        $this->assertEquals(
            'me-default',
            $request->getRequestParam('me-no-key', 'me-default')
        );
    }


    public function testGetWithDrillDown()
    {
        $request = $this->getRequest(
            [],
            $this->postParams(),
            [],
            []
        );
        // our post data looks like this:
        //  array(
        //    'input-a' => 'A',
        //    'input-b' => 'B',
        //    'sub' => array(
        //        'sub-a'   => 'AA',
        //        'sub-b'   => 'BB',
        //        'sub-sub' => array(
        //            'sub-sub-a'   => 'AAA',
        //            'sub-sub-b'   => 'BBB',
        //          )
        //      )
        //  );
        // top-level value
        $this->assertEquals('A', $request->getRequestParam('input-a'));
        $this->assertEquals('B', $request->getRequestParam('input-b'));
        // second level
        $this->assertEquals('AA', $request->getRequestParam('sub[sub-a]'));
        $this->assertEquals('BB', $request->getRequestParam('sub[sub-b]'));
        // third level
        $this->assertEquals('AAA', $request->getRequestParam('sub[sub-sub][sub-sub-a]'));
        $this->assertEquals('BBB', $request->getRequestParam('sub[sub-sub][sub-sub-b]'));
        // does not exist
        $this->assertEquals('', $request->getRequestParam('input-c'));
        $this->assertEquals('', $request->getRequestParam('sub[sub-c]'));
        $this->assertEquals('', $request->getRequestParam('sub[sub-sub][sub-sub-c]'));
    }


    public function testIsSet()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $this->assertTrue($request->requestParamIsSet('action'));
        $this->assertFalse($request->requestParamIsSet('me-no-key'));
    }


    public function testIsSetWithDrillDown()
    {
        $request = $this->getRequest(
            [],
            $this->postParams(),
            [],
            []
        );
        // our post data looks like this:
        //  array(
        //    'input-a' => 'A',
        //    'input-b' => 'B',
        //    'sub' => array(
        //        'sub-a'   => 'AA',
        //        'sub-b'   => 'BB',
        //        'sub-sub' => array(
        //            'sub-sub-a'   => 'AAA',
        //            'sub-sub-b'   => 'BBB',
        //          )
        //      )
        //  );
        // top-level value
        $this->assertTrue($request->requestParamIsSet('input-a'));
        $this->assertTrue($request->requestParamIsSet('input-b'));
        // second level
        $this->assertTrue($request->requestParamIsSet('sub[sub-a]'));
        $this->assertTrue($request->requestParamIsSet('sub[sub-b]'));
        // third level
        $this->assertTrue($request->requestParamIsSet('sub[sub-sub][sub-sub-a]'));
        $this->assertTrue($request->requestParamIsSet('sub[sub-sub][sub-sub-b]'));
        // not set
        $this->assertFalse($request->requestParamIsSet('input-c'));
        $this->assertFalse($request->requestParamIsSet('sub[sub-c]'));
        $this->assertFalse($request->requestParamIsSet('sub[sub-sub][sub-sub-c]'));
    }


    public function testUnSet()
    {
        // do the chevy shuffle with the $_REQUEST global
        // in case it's needed by other tests
        $EXISTING_REQUEST = $_REQUEST;
        $_REQUEST         = $this->getParams();
        $request          = $this->getRequest(
            $_REQUEST,
            [],
            [],
            []
        );
        $this->assertTrue($request->requestParamIsSet('action'));
        $request->unSetRequestParam('action');
        $this->assertFalse($request->requestParamIsSet('action'));
        $this->assertTrue(isset($_REQUEST['action']));
        // unset 'id' param but from GLOBAL too
        $this->assertTrue($request->requestParamIsSet('id'));
        $request->unSetRequestParam('id', true);
        $this->assertFalse($request->requestParamIsSet('id'));
        $this->assertFalse(isset($_REQUEST['id']));
        // reinstate $_REQUEST global
        $_REQUEST = $EXISTING_REQUEST;
    }


    public function testIpAddress()
    {
        // do the chevy shuffle with the $_SERVER global
        // in case it's needed by other tests
        $EXISTING_SERVER = $_SERVER;
        $server_keys     = [
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        ];
        $x               = 0;
        // let's test 100 random IP addresses
        while ($x < 100) {
            // first clear out entries from previous test
            foreach ($server_keys as $server_key) {
                unset($_SERVER[ $server_key ]);
            }
            // randomly generate IP address. plz see: https://stackoverflow.com/a/39846883
            $ip_address = long2ip(mt_rand() + mt_rand() + mt_rand(0, 1));
            // then randomly populate one of the $_SERVER keys used to determine the IP
            $_SERVER[ $server_keys[ mt_rand(0, 6) ] ] = $ip_address;
            $request                                  = $this->getRequest([], [], [], $_SERVER);
            $this->assertEquals($ip_address, $request->ipAddress());
            unset($request);
            $x++;
        }
        // reinstate $_SERVER global
        $_SERVER = $EXISTING_SERVER;
    }


    public function testMatches()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $this->assertTrue($request->matches('event-*'));
        $this->assertTrue($request->matches('*-name-*'));
        $this->assertTrue($request->matches('event-name-*'));
        $this->assertTrue($request->matches('event*name*'));
        $this->assertTrue($request->matches('event?name*'));
        $this->assertTrue($request->matches('event-name-123'));
        $this->assertFalse($request->matches('event-name-?'));
    }


    public function testMatchesWithDrillDown()
    {
        $request = $this->getRequest(
            [],
            $this->postParams(),
            [],
            []
        );
        // our post data looks like this:
        //  array(
        //    'input-a' => 'A',
        //    'input-b' => 'B',
        //    'sub' => array(
        //        'sub-a'   => 'AA',
        //        'sub-b'   => 'BB',
        //        'sub-sub' => array(
        //            'sub-sub-a'   => 'AAA',
        //            'sub-sub-b'   => 'BBB',
        //          )
        //      )
        //  );
        // top-level value
        $this->assertTrue($request->matches('input-?'));
        $this->assertTrue($request->matches('input-*'));
        // second level
        $this->assertTrue($request->matches('sub[sub-?]'));
        $this->assertTrue($request->matches('sub[sub-*]'));
        // third level
        $this->assertTrue($request->matches('sub[sub-sub][sub-sub-?]'));
        $this->assertTrue($request->matches('sub[sub-sub][sub-sub-*]'));
        // not set
        $this->assertFalse($request->matches('input-c-*'));
        $this->assertFalse($request->matches('sub[sub-c-*]'));
        $this->assertFalse($request->matches('sub[sub-sub-*][sub-sub-c]'));
    }


    public function testGetMatch()
    {
        $request = $this->getRequest(
            $this->getParams(),
            [],
            [],
            []
        );
        $this->assertEquals('Event 123', $request->getMatch('event-*'));
        $this->assertEquals('Event 123', $request->getMatch('*-name-*'));
        $this->assertEquals('Event 123', $request->getMatch('event-name-*'));
        $this->assertEquals('Event 123', $request->getMatch('event*name*'));
        $this->assertEquals('Event 123', $request->getMatch('event?name*'));
        $this->assertEquals('Event 123', $request->getMatch('event-name-123'));
        $this->assertEquals('', $request->getMatch('event-name-?'));
        // with default
        $this->assertEquals('default', $request->getMatch('event-name-?', 'default'));
    }


    public function testGetMatchWithDrillDown()
    {
        $request = $this->getRequest(
            [],
            $this->postParams(),
            [],
            []
        );
        // our post data looks like this:
        //  array(
        //    'input-a' => 'A',
        //    'input-b' => 'B',
        //    'sub' => array(
        //        'sub-a'   => 'AA',
        //        'sub-b'   => 'BB',
        //        'sub-sub' => array(
        //            'sub-sub-a'   => 'AAA',
        //            'sub-sub-b'   => 'BBB',
        //          )
        //      )
        //  );
        // top-level value
        $this->assertEquals('A', $request->getMatch('input-?'));
        $this->assertEquals('A', $request->getMatch('input-*'));
        // with default
        $this->assertEquals('default', $request->getMatch('not-an-input-?', 'default'));
        // second level
        $this->assertEquals('AA', $request->getMatch('sub[sub-?]'));
        $this->assertEquals('AA', $request->getMatch('sub[sub-*]'));
        // with default
        $this->assertEquals('default', $request->getMatch('sub[not-an-input-?]', 'default'));
        // third level
        $this->assertEquals('AAA', $request->getMatch('sub[sub-sub][sub-sub-?]'));
        $this->assertEquals('AAA', $request->getMatch('sub[sub-sub][sub-sub-*]'));
        // with default
        $this->assertEquals('default', $request->getMatch('sub[sub-sub][not-an-input-?]', 'default'));
        // not set
        $this->assertEquals('', $request->getMatch('input-c-*'));
        $this->assertEquals('', $request->getMatch('sub[sub-c-*]'));
        $this->assertEquals('', $request->getMatch('sub[sub-sub-*][sub-sub-c]'));
    }
}
// Location: tests/testcases/core/request_stack/RequestTest.php
