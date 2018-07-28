<?php

namespace EventEspresso\core\interfaces;

/**
 * Interface FactoryInterface
 *
 * @package EventEspresso\core\interfaces
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface FactoryInterface
{
    /**
     * @param string $fqcn  Fully Qualified Class Name
     * @return object       Instantiated object
     * @since $VID:$
     */
    public static function create($fqcn);
}