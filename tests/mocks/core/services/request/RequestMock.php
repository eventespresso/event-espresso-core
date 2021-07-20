<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestParams;
use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\core\services\request\sanitizers\ServerSanitizer;
use EventEspresso\core\services\request\ServerParams;

/**
 * Class RequestMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class RequestMock extends Request
{

	public function __construct(
        array $get = [],
        array $post = [],
        array $cookies = [],
        array $server = [],
        array $files = []
    ) {
        $request_params = new RequestParams(new RequestSanitizer(), $get, $post);
        $server_params  = new ServerParams(new ServerSanitizer(), $server);
        parent::__construct($request_params, $server_params);
        $request = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\request\Request');
        $this->setRequestTypeContextChecker($request->getRequestType());
        $this->cookies = ! empty($cookies) ? $cookies : $this->cookies;
        $this->files   = ! empty($files) ? $files : $this->files;
    }


	public function resetRequestParams(
        array $get = [],
        array $post = [],
        array $cookies = [],
        array $server = [],
        array $files = []
    ) {
        $existing = $this->requestParams();
        $this->unSetRequestParams(array_keys($existing));
        foreach ($get as $key => $value) {
            $this->setRequestParam($key, $value);
	    }
        foreach ($post as $key => $value) {
            $this->setRequestParam($key, $value);
	    }
        foreach ($server as $key => $value) {
            $this->setServerParam($key, $value);
        }
        $this->cookies = ! empty($cookies) ? $cookies : $this->cookies;
        $this->files = ! empty($files) ? $files : $this->files;
    }


	/**
     * @param string $visitor_ip
     * @return string
     */
    public function visitorIp($visitor_ip = '0.0.0.0')
    {
        return $visitor_ip;
    }
}
