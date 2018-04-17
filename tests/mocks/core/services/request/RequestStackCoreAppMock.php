<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\request\RequestDecoratorInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\RequestStackCoreAppInterface;
use EventEspresso\core\services\request\ResponseInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackCoreAppMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RequestStackCoreAppMock implements RequestDecoratorInterface, RequestStackCoreAppInterface
{

    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        \EE_Error::add_error(
            'Back away! I will deal with this Jedi slime myself!',
            __FILE__, __FUNCTION__, __LINE__
        );
        return $response;
    }


    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     */
    public function handleResponse(RequestInterface $request, ResponseInterface $response)
    {
        \EE_Error::add_success('Now, let\'s get a move on. We\'ve got a battle to win here.');
    }
}
