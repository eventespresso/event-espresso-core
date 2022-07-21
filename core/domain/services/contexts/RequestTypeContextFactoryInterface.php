<?php

namespace EventEspresso\core\domain\services\contexts;

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use EventEspresso\core\interfaces\InterminableInterface;

/**
 * RequestTypeContextFactoryInterface
 * Defines a factory class for generating RequestTypeContext objects
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.51
 */
interface RequestTypeContextFactoryInterface extends InterminableInterface
{
    /**
     * @param string $slug
     * @return RequestTypeContext
     */
    public function create($slug);
}
