<?php

namespace EventEspresso\tests\mocks\modules\ticket_selector;

use EventEspresso\tests\mocks\core\services\request\RequestMockBlank;

class RequestMock extends RequestMockBlank
{

    /**
     * @var array
     */
    private $request_data = [];

    public function setRequestParam($key, $value, $override_ee = false)
    {
        $this->request_data[ $key ] = $value;
    }


    public function getRequestParam($key, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
        return $this->request_data[ $key ];
    }


    public function requestParamIsSet($key): bool
    {
        return isset($this->request_data[ $key ]);
    }
}
