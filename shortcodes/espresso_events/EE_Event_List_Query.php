<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 *
 * Class EE_Event_List_Query
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.1
 *
 */
class EE_Event_List_Query
{

    /**
     * EE_Event_List_Query constructor.
     *
     * @param array $args
     */
    public function __construct($args = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\services\wp_queries\EventListQuery instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        new \EventEspresso\core\domain\services\wp_queries\EventListQuery($args);
    }

}
