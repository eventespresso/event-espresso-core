<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\domain\services\contexts\RequestTypeContextDetector;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;
use InvalidArgumentException;

/**
 * Class SetRequestTypeContextChecker
 * Request Stack Middleware class for setting the RequestTypeContext
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.53
 */
class SetRequestTypeContextChecker extends Middleware
{

    /**
     * converts a Request to a Response
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws InvalidArgumentException
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request  = $request;
        $this->response = $response;
        /** @var RequestTypeContextDetector $request_type_context_detector */
        $request_type_context_detector = $this->loader->getShared(
            'EventEspresso\core\domain\services\contexts\RequestTypeContextDetector',
            array(
                $this->request,
                $this->loader->getShared(
                    'EventEspresso\core\domain\services\contexts\RequestTypeContextFactory',
                    array($this->loader)
                ),
                array(
                    'DOING_AJAX' => defined('DOING_AJAX') && DOING_AJAX,
                    'WP_CLI'     => defined('WP_CLI') && WP_CLI,
                    'is_admin'   => is_admin(),
                )
            )
        );
        $request_type_context          = $request_type_context_detector->detectRequestTypeContext();
        $request_type_context_checker  = $this->loader->getShared(
            'EventEspresso\core\domain\services\contexts\RequestTypeContextChecker',
            array($request_type_context)
        );
        $this->request->setRequestTypeContextChecker($request_type_context_checker);
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}
