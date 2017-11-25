<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestDecorator;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
abstract class Middleware implements RequestDecorator
{

    /**
     * @var RequestDecorator $request_stack
     */
    protected $request_stack;

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
     * @param RequestDecorator $request_stack
     * @param LoaderInterface  $loader
     */
    public function __construct(RequestDecorator $request_stack, LoaderInterface $loader)
    {
        $this->request_stack = $request_stack;
        $this->loader = $loader;
    }



    /**
     * process_request_stack
     *
     * @param RequestInterface $request
     * @param ResponseInterface      $response
     * @return ResponseInterface
     */
    protected function processRequestStack(RequestInterface $request, ResponseInterface $response)
    {
        $this->request  = $request;
        $this->response = $response;
        if (! $this->response->requestTerminated()) {
            $this->response = $this->request_stack->handleRequest($this->request, $this->response);
        }
        return $this->response;
    }


}
// Location: Middleware.php
