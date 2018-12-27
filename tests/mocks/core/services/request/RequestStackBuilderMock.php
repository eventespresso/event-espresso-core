<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\request\RequestStackBuilder;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackBuilderMock
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RequestStackBuilderMock extends RequestStackBuilder
{
    /**
     * @param array $middleware_app
     * @param bool  $recurse
     * @return array
     * @throws \EventEspresso\core\services\request\InvalidRequestStackMiddlewareException
     */
    public function validateMiddlewareAppDetails(array $middleware_app, $recurse = false)
    {
        return parent::validateMiddlewareAppDetails($middleware_app, $recurse);
    }
}
