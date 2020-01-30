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
     * @param mixed $arguments Either a Fully Qualified Class Name
     *                         or array of data required for construction
     * @return mixed
     */
    public static function create($arguments);
}
