<?php

namespace EventEspresso\core\services\request;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface RequestDecoratorInterface
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface RequestDecoratorInterface
{

    /**
     * converts a Request to a Response
     * can perform their logic either before or after the core application has run like so:
     *    public function handle_request( EE_Request $request, EE_Response $response ) {
     *        $this->request = $request;
     *        $this->response = $response;
     *      // logic performed BEFORE core app has run
     *      $this->process_request_stack( $this->request, $this->response );
     *      // logic performed AFTER core app has run
     *      return $response;
     *    }
     *
     * @param RequestInterface $request
     * @param ResponseInterface      $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response);
}
// Location: RequestDecoratorInterface.php
