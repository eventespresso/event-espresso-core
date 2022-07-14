<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\services\request\InvalidRequestStackMiddlewareException;
use EventEspresso\core\services\request\RequestStackBuilder;

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
     * @throws InvalidRequestStackMiddlewareException
     */
    public function validateMiddlewareAppDetails(array $middleware_app, bool $recurse = false): array
    {
        return parent::validateMiddlewareAppDetails($middleware_app, $recurse);
    }
}
