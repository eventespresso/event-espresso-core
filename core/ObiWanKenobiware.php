<?php

namespace EventEspresso\core;

use EventEspresso\core\services\request\middleware\Middleware;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

class ObiWanKenobiware extends Middleware
{
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        \EE_Error::add_attention('Hello There!');
        return $this->processRequestStack($request, $response);
    }
}
