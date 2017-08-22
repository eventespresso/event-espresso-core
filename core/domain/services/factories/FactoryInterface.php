<?php

namespace EventEspresso\core\domain\services\factories;

defined('EVENT_ESPRESSO_VERSION') || exit;


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
     * @param mixed $arguments
     * @return mixed
     */
    public static function create($arguments);


}
// Location: FactoryInterface.php
