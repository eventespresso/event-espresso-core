<?php

namespace EventEspresso\core\domain\services\event;

use EE_Error;
use EEM_Event;
use ReflectionException;

/**
 * Class FilterNextPreviousEventPostQuery
 * Exclude the expired events links from the get_next_post and get_previous_post functions
 *
 * @package EventEspresso\core\domain\services\event
 * @author  Hossein Rafiei <hoseinrafiei@gmail.com>
 * @see     get_previous_post()
 * @see     get_next_post()
 * @since   5.0.0.p
 */
class FilterNextPreviousEventPostQuery
{
    public function __construct()
    {
        add_filter('get_next_post_where', [$this, 'where_query']);
        add_filter('get_previous_post_where', [$this, 'where_query']);
    }


    /**
     * Add not expired events as white-list to the adjacent post query
     * to hide the expired events.
     *
     * @param string $sql
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function where_query(string $sql): string
    {
        if (! is_main_query() || ! is_singular('espresso_events')) {
            return $sql;
        }

        // Get active & upcoming events
        $not_expired_event_ids = EEM_Event::instance()->get_all_not_expired_event_ids();

        // To make sure nothing would show if all events are expired.
        if (! count($not_expired_event_ids)) {
            $not_expired_event_ids[] = 0;
        }

        // Include only not expired events
        $sql .= " AND p.ID IN (" . esc_sql(implode(', ', $not_expired_event_ids)) . ")";

        return $sql;
    }
}
