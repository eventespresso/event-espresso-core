<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\services\contexts\RequestTypeContextChecker;
use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
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

    const UNSET_REQUEST_TYPE = 'UNSET_REQUEST_TYPE';

    /**
     * @param array  $get
     * @param array  $post
     * @param array $cookies
     * @param array  $server
     * @param array  $files
     * @param string|null $request_type_slug
     */
	public function __construct(
        array $get = [],
        array $post = [],
        array $cookies = [],
        array $server = [],
        array $files = [],
        string $request_type_slug = RequestTypeContext::ADMIN
    ) {
        $request_params = new RequestParams(new RequestSanitizer(), $get, $post);
        $server_params  = new ServerParams(new ServerSanitizer(), $server);
        parent::__construct($request_params, $server_params);
        if ($request_type_slug === RequestMock::UNSET_REQUEST_TYPE) {
            $this->unsetRequestType();
        } else {
            $this->setRequestType($request_type_slug);
        }
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


    public function setRequestType(string $request_type_slug)
    {
        $request_type_slug = $request_type_slug ?: RequestTypeContext::ADMIN;
        $this->setRequestTypeContextChecker(
            new RequestTypeContextChecker(
                new RequestTypeContext(
                    $request_type_slug,
                    'mock request type'
                )
            )
        );
    }


    public function unsetRequestType()
    {
        $this->request_type = null;
    }



    public function requestTypeIsSet(): bool
    {
        return $this->request_type instanceof RequestTypeContextCheckerInterface;
    }
}
