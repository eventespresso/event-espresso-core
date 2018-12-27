<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\request\middleware\Middleware;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class GeneralGrievousWare
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class GeneralGrievousWare extends Middleware
{

    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        \EE_Error::add_attention('General Kenobi!');
        return $this->processRequestStack($request, $response);
    }
}
