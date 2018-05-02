<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestDecoratorInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * Class Middleware
 * Parent class for Middleware Request decorators.
 * Accepts an instance of another Middleware class,
 * and handles the passing of EE_Request and EE_Response objects to and from it
 * Middleware classes are for functionality that needs to run on nearly EVERY request.
 * They can perform their logic either before or after the core application has run:
 *    (see documentation for the handle() method below)
 * Middleware classes should NOT depend on core functionality,
 * because there is no guarantee that the core application has run
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
abstract class Middleware implements RequestDecoratorInterface
{

    /**
     * @var RequestDecoratorInterface $request_stack_app
     */
    protected $request_stack_app;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;

    /**
     * @var LoaderInterface
     */
    protected $loader;


    /**
     * @param RequestDecoratorInterface $request_stack_app
     * @param LoaderInterface           $loader
     */
    public function __construct(RequestDecoratorInterface $request_stack_app, LoaderInterface $loader)
    {
        $this->request_stack_app = $request_stack_app;
        $this->loader = $loader;
    }


    /**
     * process_request_stack
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    protected function processRequestStack(RequestInterface $request, ResponseInterface $response)
    {
        $this->request = $request;
        $this->response = $response;
        if (! $this->response->requestTerminated()) {
            $this->response = $this->request_stack_app->handleRequest($this->request, $this->response);
        }
        return $this->response;
    }
}
