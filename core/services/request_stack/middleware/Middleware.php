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
     * @type    EE_Request $_request
     */
    protected $_request;

    /**
     * @type    EE_Response $_response
     */
    protected $_response;



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
        $this->_request  = $request;
        $this->_response = $response;
        if (! $this->_response->request_terminated()) {
            $this->_response = $this->request_stack->handle_request($this->_request, $this->_response);
        }
        return $this->_response;
    }


}
// Location: Middleware.php
