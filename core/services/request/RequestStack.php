<?php

namespace EventEspresso\core\services\request;

/**
 * Class RequestStack
 * Basically a container class for holding
 * EventEspresso\core\services\request\middleware\Middleware classes
 * as well as the core application
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class RequestStack
{

    /**
     * @var RequestDecoratorInterface $request_stack_app
     */
    protected $request_stack_app;

    /**
     * @var RequestStackCoreAppInterface $core_app
     */
    protected $core_app;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;


    /**
     * @param RequestDecoratorInterface    $request_stack_app
     * @param RequestStackCoreAppInterface $core_app
     */
    public function __construct(RequestDecoratorInterface $request_stack_app, RequestStackCoreAppInterface $core_app)
    {
        $this->request_stack_app = $request_stack_app;
        $this->core_app      = $core_app;
    }


    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request  = $request;
        $this->response = $response;
        return $this->request_stack_app->handleRequest($request, $response);
    }


    /**
     * handle_response
     * executes the handle_response() method on the RequestStackCoreAppInterface object
     * after the request stack has been fully processed
     */
    public function handleResponse()
    {
        $this->core_app->handleResponse($this->request, $this->response);
    }
}
// Location: RequestStack.php
