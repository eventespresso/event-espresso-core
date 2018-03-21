<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\request\middleware\Middleware;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

class ObiWanKenobiWare extends Middleware
{
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        \EE_Error::add_success('Hello There!');
        return $this->processRequestStack($request, $response);
    }
}
