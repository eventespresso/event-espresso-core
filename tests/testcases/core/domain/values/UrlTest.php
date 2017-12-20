<?php

namespace EventEspresso\tests\testcases\core\domain\values;

use EE_UnitTestCase;
use EventEspresso\core\domain\values\Url;
use PHPUnit\Framework\Exception;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class UrlTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\domain\values
 * @author  Brent Christensen
 * @since   $VID:$
 * @group   UrlVO
 */
class UrlTest extends EE_UnitTestCase
{

    /**
     * @return array
     */
    public function constructorProvider()
    {
        return array(
            array(
                'http://',
                true,
            ),
            array(
                'local.wordpress.dev',
                true,
            ),
            array(
                'http://local.wordpress.dev',
                false,
            ),
            array(
                'http://local.wordpress.dev/wp-admin/admin.php',
                false,
            ),
            array(
                'http://local.wordpress.dev/wp-admin/admin.php?page=espresso_events&action=edit&post=39&edit_nonce=be452be953',
                false,
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                false,
            ),
        );
    }


    /**
     * @dataProvider constructorProvider
     * @param string $url_string
     * @param bool   $throws_exception
     * @throws Exception
     */
    public function testConstructor($url_string, $throws_exception)
    {
        if ($throws_exception) {
            $this->setExceptionExpected('InvalidArgumentException');
        }
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
    }


    /**
     * @return array
     */
    public function schemeProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                'http://',
            ),
            array(
                'https://local.wordpress.dev/wp-admin/admin.php',
                'https://',
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                'abc://',
            ),
        );
    }


    /**
     * @dataProvider schemeProvider
     * @param string $url_string
     * @param string $scheme
     * @throws Exception
     */
    public function testScheme($url_string, $scheme)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($scheme, $url->scheme());
    }


    /**
     * @return array
     */
    public function hostProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                'local.wordpress.dev',
            ),
            array(
                'https://www.eventespresso.com/',
                'www.eventespresso.com',
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                'example.com',
            ),
        );
    }


    /**
     * @dataProvider hostProvider
     * @param string $url_string
     * @param string $host
     * @throws Exception
     */
    public function testHost($url_string, $host)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($host, $url->host());
    }


    /**
     * @return array
     */
    public function pathProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                '',
            ),
            array(
                'https://local.wordpress.dev/wp-admin/admin.php',
                '/wp-admin/admin.php',
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                '/path/data',
            ),
        );
    }


    /**
     * @dataProvider pathProvider
     * @param string $url_string
     * @param string $path
     * @throws Exception
     */
    public function testPath($url_string, $path)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($path, $url->path());
    }


    /**
     * @return array
     */
    public function queryProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                '',
                array(),
            ),
            array(
                'http://local.wordpress.dev/wp-admin/admin.php?page=espresso_events&action=edit&post=39',
                '?page=espresso_events&action=edit&post=39',
                array(
                    'page'   => 'espresso_events',
                    'action' => 'edit',
                    'post'   => '39',
                ),
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                '?key=value',
                array('key' => 'value'),
            ),
        );
    }


    /**
     * @dataProvider queryProvider
     * @param string $url_string
     * @param string $query_string
     * @param array $query_params
     * @throws Exception
     */
    public function testQueryStringAndQueryParams($url_string, $query_string, array $query_params)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($query_string, $url->queryString());
        $this->assertEquals($query_params, $url->queryParams());
    }


    /**
     * @return array
     */
    public function fragmentProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                '',
            ),
            array(
                'http://local.wordpress.dev/registration-checkout/?uts=1513717329#checkout',
                '#checkout',
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                '#fragid1',
            ),
        );
    }


    /**
     * @dataProvider fragmentProvider
     * @param string $url_string
     * @param string $fragment
     * @throws Exception
     */
    public function testFragment($url_string, $fragment)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($fragment, $url->fragment());
    }


    /**
     * @return array
     */
    public function fullUrlProvider()
    {
        return array(
            array(
                'http://local.wordpress.dev',
                'http://local.wordpress.dev',
            ),
            array(
                'http://local.wordpress.dev/registration-checkout/?uts=1513717329#checkout',
                'http://local.wordpress.dev/registration-checkout/?uts=1513717329#checkout',
            ),
            array(
                'abc://username:password@example.com:123/path/data?key=value#fragid1',
                'abc://example.com/path/data?key=value#fragid1',
            ),
        );
    }


    /**
     * @dataProvider fullUrlProvider
     * @param string $url_string
     * @param string $full_url
     * @throws Exception
     */
    public function testGetFullUrl($url_string, $full_url)
    {
        $url = new Url($url_string);
        $this->assertInstanceOf('EventEspresso\core\domain\values\Url', $url);
        $this->assertEquals($full_url, $url->getFullUrl());
        ob_start();
        echo $url;
        $this->assertEquals($full_url, ob_get_clean());
    }
}
