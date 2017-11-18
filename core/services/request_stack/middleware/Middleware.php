<?php

namespace EventEspresso\core\services\request_stack\middleware;

use EE_Request;
use EE_Response;
use EEI_Request_Decorator;

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
 * @package EventEspresso\core\services\request_stack\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
abstract class Middleware implements EEI_Request_Decorator
{

    /**
     * @type    EEI_Request_Decorator $request_stack
     */
    protected $request_stack;

    /**
     * @type    EE_Request $request
     */
    protected $request;

    /**
     * @type    EE_Response $response
     */
    protected $response;



    /**
     * @param    \EEI_Request_Decorator $request_stack
     */
    public function __construct(EEI_Request_Decorator $request_stack)
    {
        $this->request_stack = $request_stack;
    }



    /**
     * process_request_stack
     *
     * @param    EE_Request  $request
     * @param    EE_Response $response
     * @return    EE_Response
     */
    protected function process_request_stack(EE_Request $request, EE_Response $response)
    {
        $this->request  = $request;
        $this->response = $response;
        if (! $this->response->request_terminated()) {
            $this->response = $this->request_stack->handle_request($this->request, $this->response);
        }
        return $this->response;
    }


}
// Location: Middleware.php
