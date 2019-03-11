<?php

namespace EventEspresso\tests\testcases\core\request_stack;

use EE_Request;
use EventEspresso\core\services\request\Request;
use PHPUnit_Framework_TestCase;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class RequestTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\request_stack
 * @author  Brent Christensen
 *
 */
class RequestTest extends PHPUnit_Framework_TestCase
{

    public function getParams(array $params = array())
    {
        return $params + array(
            'action'         => 'edit',
            'id'             => 123,
            'event-name-123' => 'Event 123',
        );
    }

    public function postParams(array $params = array())
    {
        return $params + array(
            'input-a' => 'A',
            'input-b' => 'B',
            'sub' => array(
                'sub-a'   => 'AA',
                'sub-b'   => 'BB',
                'sub-sub' => array(
                    'sub-sub-a'   => 'AAA',
                    'sub-sub-b'   => 'BBB',
                )
            ),
        );
    }

    public function cookieParams(array $params = array())
    {
        return $params + array(
            'PHPSESSID'   => 'abcdefghijklmnopqrstuvwxyz',
            'cookie_test' => 'a1b2c3d4e5f6g7h8i9j0.12345678',
        );
    }


    /**
     * @param array $get
     * @param array $post
     * @param array $cookie
     * @param array $server
     * @param array $files
     * @return EE_Request
     */
    private function getLegacyRequest(array $get, array $post, array $cookie, array $server, array $files = array())
    {
        $request = new Request($get, $post, $cookie, $server, $files);
        $legacy_request = new EE_Request(array(), array(), array());
        $legacy_request->setRequest($request);
        return $legacy_request;
    }


    public function testGetParams()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
        );
        $this->assertEquals(
            $this->getParams(),
            $request->get_params()
        );
    }

    public function testPostParams()
    {
        $request = $this->getLegacyRequest(
            array(),
            $this->postParams(),
            array(),
            array()
        );
        $this->assertEquals(
            $this->postParams(),
            $request->post_params()
        );
    }

    public function testCookieParams()
    {
        $request = $this->getLegacyRequest(
            array(),
            array(),
            $this->cookieParams(),
            array()
        );
        $this->assertEquals(
            $this->cookieParams(),
            $request->cookie_params()
        );
    }

    public function testParams()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            $this->postParams(),
            array(),
            array()
        );
        $this->assertEquals(
            array_merge($this->getParams(), $this->postParams()),
            $request->params()
        );
    }

    public function testSet()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
        );
        $key = 'new-key';
        $value = 'ima noob';
        $request->set($key, $value);
        $params = $request->params();
        $this->assertArrayHasKey($key, $params);
        $this->assertEquals($value, $params[$key]);
    }

    public function testSetEE()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
        );
        $request->set('ee', 'module-route');
        $params = $request->params();
        $this->assertArrayHasKey('ee', $params);
        $this->assertEquals('module-route', $params['ee']);
    }

    public function testAlreadySetEE()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(array('ee' => 'existing-route')),
            array(),
            array(),
            array()
        );
        $request->set('ee', 'module-route');
        $params = $request->params();
        $this->assertArrayHasKey('ee', $params);
        $this->assertNotEquals('module-route', $params['ee']);
        $this->assertEquals('existing-route', $params['ee']);
    }

    public function testOverrideAlreadySetEE()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(array('ee' => 'existing-route')),
            array(),
            array(),
            array()
        );
        $request->set('ee', 'module-route', true);
        $params = $request->params();
        $this->assertArrayHasKey('ee', $params);
        $this->assertEquals('module-route', $params['ee']);
    }



    public function testGet()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
        );
        // key exists
        $this->assertEquals('edit', $request->get('action'));
        // key does NOT exist and no default value set
        $this->assertNotEquals('edit', $request->get('me-no-key'));
        $this->assertNull($request->get('me-no-key'));
        // key does NOT exist but default value set
        $this->assertNotEquals(
            'edit',
            $request->get('me-no-key', 'me-default')
        );
        $this->assertEquals(
            'me-default',
            $request->get('me-no-key', 'me-default')
        );
    }



    public function testGetWithDrillDown()
    {
        $request = $this->getLegacyRequest(
            array(),
            $this->postParams(),
            array(),
            array()
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
        $this->assertEquals('A', $request->get('input-a'));
        $this->assertEquals('B', $request->get('input-b'));
        // second level
        $this->assertEquals('AA', $request->get('sub[sub-a]'));
        $this->assertEquals('BB', $request->get('sub[sub-b]'));
        // third level
        $this->assertEquals('AAA', $request->get('sub[sub-sub][sub-sub-a]'));
        $this->assertEquals('BBB', $request->get('sub[sub-sub][sub-sub-b]'));
        // does not exist
        $this->assertNull($request->get('input-c'));
        $this->assertNull($request->get('sub[sub-c]'));
        $this->assertNull($request->get('sub[sub-sub][sub-sub-c]'));
    }



    public function testIsSet()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
        );
        $this->assertTrue($request->is_set('action'));
        $this->assertFalse($request->is_set('me-no-key'));
    }



    public function testIsSetWithDrillDown()
    {
        $request = $this->getLegacyRequest(
            array(),
            $this->postParams(),
            array(),
            array()
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
        $this->assertTrue($request->is_set('input-a'));
        $this->assertTrue($request->is_set('input-b'));
        // second level
        $this->assertTrue($request->is_set('sub[sub-a]'));
        $this->assertTrue($request->is_set('sub[sub-b]'));
        // third level
        $this->assertTrue($request->is_set('sub[sub-sub][sub-sub-a]'));
        $this->assertTrue($request->is_set('sub[sub-sub][sub-sub-b]'));
        // not set
        $this->assertFalse($request->is_set('input-c'));
        $this->assertFalse($request->is_set('sub[sub-c]'));
        $this->assertFalse($request->is_set('sub[sub-sub][sub-sub-c]'));
    }



    public function testUnSet()
    {
        // do the chevy shuffle with the $_REQUEST global
        // in case it's needed by other tests
        $EXISTING_REQUEST = $_REQUEST;
        $_REQUEST = $this->getParams();
        $request = $this->getLegacyRequest(
            $_REQUEST,
            array(),
            array(),
            array()
        );
        $this->assertTrue($request->is_set('action'));
        $request->un_set('action');
        $this->assertFalse($request->is_set('action'));
        $this->assertTrue(isset($_REQUEST['action']));
        // unset 'id' param but from GLOBAL too
        $this->assertTrue($request->is_set('id'));
        $request->un_set('id', true);
        $this->assertFalse($request->is_set('id'));
        $this->assertFalse(isset($_REQUEST['id']));
        // reinstate $_REQUEST global
        $_REQUEST = $EXISTING_REQUEST;
    }



    public function testIpAddress()
    {
        // do the chevy shuffle with the $_SERVER global
        // in case it's needed by other tests
        $EXISTING_SERVER = $_SERVER;
        $server_keys = array(
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        );
        $x = 0;
        // let's test 100 random IP addresses
        while ($x < 100) {
            // first clear out entries from previous test
            foreach ($server_keys as $server_key) {
                unset($_SERVER[$server_key]);
            }
            // randomly generate IP address. plz see: https://stackoverflow.com/a/39846883
            $ip_address = long2ip(mt_rand() + mt_rand() + mt_rand(0, 1));
            // then randomly populate one of the $_SERVER keys used to determine the IP
            $_SERVER[$server_keys[mt_rand(0, 6)]] = $ip_address;
            $request = $this->getLegacyRequest(array(), array(), array(), $_SERVER);
            $this->assertEquals($ip_address, $request->ip_address());
            unset($request);
            $x++;
        }
        // reinstate $_SERVER global
        $_SERVER = $EXISTING_SERVER;
    }


    public function testMatches()
    {
        $request = $this->getLegacyRequest(
            $this->getParams(),
            array(),
            array(),
            array()
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
        $request = $this->getLegacyRequest(
        array(),
            $this->postParams(),
            array(),
            array()
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
        $request = $this->getLegacyRequest(
        $this->getParams(),
            array(),
            array(),
            array()
        );
        $this->assertEquals('Event 123', $request->getMatch('event-*'));
        $this->assertEquals('Event 123', $request->getMatch('*-name-*'));
        $this->assertEquals('Event 123', $request->getMatch('event-name-*'));
        $this->assertEquals('Event 123', $request->getMatch('event*name*'));
        $this->assertEquals('Event 123', $request->getMatch('event?name*'));
        $this->assertEquals('Event 123', $request->getMatch('event-name-123'));
        $this->assertNull($request->getMatch('event-name-?'));
        // with default
        $this->assertEquals('default', $request->getMatch('event-name-?', 'default'));
    }


    public function testGetMatchWithDrillDown()
    {
        $request = $this->getLegacyRequest(
        array(),
            $this->postParams(),
            array(),
            array()
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
        $this->assertNull($request->getMatch('input-c-*'));
        $this->assertNull($request->getMatch('sub[sub-c-*]'));
        $this->assertNull($request->getMatch('sub[sub-sub-*][sub-sub-c]'));
    }
}
// Location: tests/testcases/core/request_stack/RequestTest.php
