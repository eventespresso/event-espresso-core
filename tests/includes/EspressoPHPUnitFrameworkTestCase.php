<?php

namespace EventEspresso\tests\includes;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\tests\mocks\core\services\request\RequestMock;
use PHPUnit\Framework\Exception;
use PHPUnit\Framework\TestCase;

/**
 * Class EspressoPHPUnitFrameworkTestCase
 * Description
 *
 * @package EventEspresso\tests\includes\
 * @author  Brent Christensen
 * @since   4.10.7.p
 */
class EspressoPHPUnitFrameworkTestCase extends TestCase
{
    /**
     * @var LoaderInterface
     */
    protected $loader;

    /**
     * @var RequestMock
     */
    protected $request;


    protected function initLoader()
    {
        if (! $this->loader instanceof LoaderInterface) {
            $this->loader = LoaderFactory::getLoader();
        }
    }


    public function setUp()
    {
        // echo "\n\n" . strtoupper($this->getName()) . '()';
        parent::setUp();
        $this->initLoader();
    }


    public function tearDown()
    {
        if ($this->request instanceof RequestMock && ! $this->request->requestTypeIsSet()) {
            $this->request->setRequestType(RequestTypeContext::ADMIN);
        }
        parent::tearDown();
    }

    /**
     * \PHPUnit\Framework\TestCase::expectException() only exists in PHPUnit version 5.7+
     * but on Travis-CI we test using PHPUnit 4.8 because it supports PHP versions < 5.6
     * This should call the appropriate method regardless of version
     *
     * @param string $exception
     * @param null   $code
     * @throws Exception
     */
    public function setExceptionExpected($exception, $code = null)
    {
        if (method_exists($this, 'expectException')) {
            parent::expectException($exception);
        } elseif (method_exists($this, 'setExpectedException')) {
            $this->setExpectedException($exception);
        }
        if ($code !== null && method_exists($this, 'expectExceptionCode')) {
            parent::expectExceptionCode($code);
        }
    }


    /**
     * @param array  $get
     * @param array  $post
     * @param array  $cookie
     * @param array  $server
     * @param array  $files
     * @param string|null $request_type_slug
     * @return Request
     * @since 4.9.71.p
     */
    protected function getRequest(
        array $get = [],
        array $post = [],
        array $cookie = [],
        array $server = [],
        array $files = [],
        ?string $request_type_slug = ''
    ): Request {
        $this->initLoader();
        $this->loader->remove(Request::class);
        $this->request = new RequestMock($get, $post, $cookie, $server, $files, $request_type_slug);
        $this->loader->share(Request::class, $this->request);
        return $this->request;
    }
}
