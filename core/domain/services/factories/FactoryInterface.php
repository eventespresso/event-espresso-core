<?php

namespace EventEspresso\core\domain\services\factories;

/**
 * Interface FactoryInterface
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 */
interface FactoryInterface
{

    /**
     * @param mixed $arguments
     * @return mixed
     */
    public static function create($arguments);
}
