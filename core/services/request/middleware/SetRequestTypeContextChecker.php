<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\domain\services\contexts\RequestTypeContextDetector;
use EventEspresso\core\domain\services\contexts\RequestTypeContextFactoryInterface;
use EventEspresso\core\services\graphql\GraphQLEndpoint;
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
        $this->request = $request;
        $this->response = $response;
        /** @var GraphQLEndpoint $gql_endpoint */
        $gql_endpoint = $this->loader->getShared('EventEspresso\core\services\graphql\GraphQLEndpoint');
        /** @var RequestTypeContextFactoryInterface $request_type_context_factory */
        $request_type_context_factory = $this->loader->getShared(
            'EventEspresso\core\domain\services\contexts\RequestTypeContextFactory',
            [$this->loader]
        );
        /** @var RequestTypeContextDetector $request_type_context_detector */
        $request_type_context_detector = $this->loader->getShared(
            'EventEspresso\core\domain\services\contexts\RequestTypeContextDetector',
            [
                $gql_endpoint,
                $this->request,
                $request_type_context_factory,
                [
                    'DOING_AJAX' => defined('DOING_AJAX') && DOING_AJAX,
                    'WP_CLI'     => defined('WP_CLI') && WP_CLI,
                    'is_admin'   => is_admin(),
                ],
            ]
        );
        $request_type_context = $request_type_context_detector->detectRequestTypeContext();

        // make sure these constants are defined
        if (! defined('EE_ADMIN_AJAX')) {
            define('EE_ADMIN_AJAX', false);
        }
        if (! defined('EE_FRONT_AJAX')) {
            define('EE_FRONT_AJAX', false);
        }

        $request_type_context->setIsUnitTesting(defined('EE_TESTS_DIR'));
        $request_type_context_checker = $this->loader->getShared(
            'EventEspresso\core\domain\services\contexts\RequestTypeContextChecker',
            [$request_type_context]
        );
        $this->request->setRequestTypeContextChecker($request_type_context_checker);
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }
}
