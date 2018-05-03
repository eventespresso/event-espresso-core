<?php

namespace EventEspresso\core\interfaces;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface ReservedInstanceInterface
 * Classes implementing this interface will always be shared by the DI container
 * and the construction of multiple instances will not be allowed.
 *
 * @package EventEspresso\core\interfaces
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface ReservedInstanceInterface
{

}
