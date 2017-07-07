<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\activation\RequestType;
use EventEspresso\core\services\activation\RequestTypeDetector;

defined('EVENT_ESPRESSO_VERSION') || exit;


class RequestTypeDetectorExtendedMock extends RequestTypeDetector
{

    /**
     * @param RequestType $request_type
     */
    public function setRequestType(RequestType $request_type)
    {
        $this->request_type = $request_type;
    }

}
