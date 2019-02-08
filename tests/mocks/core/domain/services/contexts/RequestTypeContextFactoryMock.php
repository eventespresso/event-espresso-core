<?php

namespace EventEspresso\tests\mocks\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\domain\services\contexts\RequestTypeContextFactoryInterface;
use InvalidArgumentException;

/**
 * Class RequestTypeContextFactoryMock
 *
 * @package EventEspresso\tests\mocks\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class RequestTypeContextFactoryMock implements RequestTypeContextFactoryInterface
{

    /**
     * @param string $slug
     * @return RequestTypeContext
     * @throws InvalidArgumentException
     */
    public function create($slug)
    {
        return new RequestTypeContext($slug, $slug);
    }
}