<?php

namespace EventEspresso\core\services\request;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
     * @var RequestDecoratorInterface $application
     */
    protected $application;

    /**
     * @var array $middlewares
     */
    protected $middlewares;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;



    /**
     * @param    RequestDecoratorInterface $application
     * @param    array                     $middlewares
     */
    public function __construct(RequestDecoratorInterface $application, array $middlewares = array())
    {
        $this->application = $application;
        $this->middlewares = $middlewares;
    }



    /**
     * @param RequestInterface $request
     * @param ResponseInterface      $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request  = $request;
        $this->response = $response;
        return $this->application->handleRequest($request, $response);
    }



    /**
     * handle_response
     * executes the handle_response() method on the RequestStackCoreAppInterface object
     * after the request stack has been fully processed
     */
    public function handleResponse()
    {
        foreach ($this->middlewares as $middleware) {
            if ($middleware instanceof RequestStackCoreAppInterface) {
                $middleware->handleResponse($this->request, $this->response);
                // exit loop since we should be done
                // (also in case someone has accidentally labeled multiple apps as the EEI_Request_Stack_Core_App )
                break;
            }
        }
    }

}
// Location: RequestStack.php
