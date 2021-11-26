<?php

namespace EventEspresso\tests\mocks\modules\ticket_selector;

use EventEspresso\core\services\request\sanitizers\RequestSanitizer;
use EventEspresso\tests\mocks\core\services\request\RequestMockBlank;

class RequestMock extends RequestMockBlank
{

    /**
     * @var array
     */
    private $request_data = [];

    /**
     * @var RequestSanitizer
     */
    protected $sanitizer;


    public function __construct()
    {
        $this->sanitizer = new RequestSanitizer();
    }


    public function setRequestParam($key, $value, $override_ee = false)
    {
        $this->request_data[ $key ] = $value;
    }


    public function getRequestParam($key, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
        $param = $this->request_data[ $key ] ?? null;
        // even though we are fully mocking the request,
        // we still need to apply the same sanitization to the request params
        // in order for our test results to be accurate
        return $this->sanitizer->clean($param, $type, $is_array, $delimiter);
    }


    public function requestParamIsSet($key): bool
    {
        return isset($this->request_data[ $key ]);
    }


    public function requestParams(): array
    {
        return $this->request_data;
    }
}
