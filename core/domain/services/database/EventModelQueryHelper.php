<?php

namespace EventEspresso\core\domain\services\database;

use EE_Capabilities;
use EEM_Event;

class EventModelQueryHelper
{

    /**
     * @var EE_Capabilities
     */
    protected $capabilities;


    /**
     * EventModelQueryHelper constructor.
     *
     * @param EE_Capabilities $capabilities
     */
    public function __construct(EE_Capabilities $capabilities)
    {
        $this->capabilities = $capabilities;
    }


    /**
     * adds specific query_params for active_events
     * keep in mind this will override any sent status in the query AND any date queries.
     *
     * @param array  $query_params
     * @param string $context
     * @return array
     * @since $VID:$
     */
    public function addBasicWhereParams(array $query_params, string $context = '')
    {
        $where_params = isset($query_params[0]) ? $query_params[0] : [];
        // we don't care about the status for expired or inactive events
        if ($context === EEM_Event::STATUS_EXPIRED || $context === EEM_Event::STATUS_INACTIVE) {
            unset($where_params['status']);
        } else {
            // we need to pull events with a status of publish and sold_out
            $event_status = ['publish', EEM_Event::sold_out];
            // check if the user can read private events and if so add the 'private status to the were params'
            if ($context !== '') {
                $context = "get_{$context}_events";
                if ($this->capabilities->current_user_can('ee_read_private_events', $context)) {
                    $event_status[] = 'private';
                }
            }
            $where_params['status'] = ['IN', $event_status];
        }
        return $where_params;
    }


    /**
     * @param array $query_params
     * @param array $where_params
     * @param bool  $count
     * @return array
     * @since $VID:$
     */
    public function finalizeQueryParams(array $query_params, array $where_params, bool $count = false)
    {
        if ($count) {
            // don't use $query_params with count()
            // because we don't want to include additional query clauses like "GROUP BY"
            return [$where_params];
        }
        $query_params[0] = $where_params;
        return $query_params;
    }


}