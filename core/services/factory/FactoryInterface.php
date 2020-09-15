<?php

namespace EventEspresso\core\services\factory;

/**
 * Interface FactoryInterface
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface FactoryInterface
{

    /**
     * @param string $fqcn      Fully Qualified Class Name
     * @param array  $arguments [optional] array of data required for construction
     * @return mixed
     */
    public function create($fqcn, array $arguments = []);
}
