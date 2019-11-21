<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Datetime;
use EE_Event;
use EE_Ticket;
use EE_Checkin;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use WPGraphQL\Model\Post;

/**
 * Class DatetimeConnectionResolver
 *
 */
class DatetimeConnectionResolver extends AbstractConnectionResolver
{

    /**
     * @return EEM_Datetime
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query()
    {
        return EEM_Datetime::instance();
    }

    /**
     * Return an array of items from the query
     *
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_items()
    {
        $results = $this->query->get_col($this->query_args);

        return ! empty($results) ? $results : [];
    }

    /**
     * Determine whether the Query should execute. If it's determined that the query should
     * not be run based on context such as, but not limited to, who the user is, where in the
     * ResolveTree the Query is, the relation to the node the Query is connected to, etc
     *
     * Return false to prevent the query from executing.
     *
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function should_execute()
    {
        if (false === $this->should_execute) {
            return false;
        }

        return $this->should_execute;
    }

    /**
     * Here, we map the args from the input, then we make sure that we're only querying
     * for IDs. The IDs are then passed down the resolve tree, and deferred resolvers
     * handle batch resolution of the posts.
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_args()
    {
        $where_params = [];
        $query_args   = [];

        $query_args['limit'] = $this->getLimit();

        // Avoid multiple entries by join.
        $query_args['group_by'] = 'DTT_ID';

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);

            // Use the proper operator.
            if (! empty($input_fields['EVT_ID']) && is_array($input_fields['EVT_ID'])) {
                $input_fields['EVT_ID'] = ['in', $input_fields['EVT_ID']];
            }
            if (! empty($input_fields['Ticket.TKT_ID']) && is_array($input_fields['Ticket.TKT_ID'])) {
                $input_fields['Ticket.TKT_ID'] = ['in', $input_fields['Ticket.TKT_ID']];
            }
        }

        /**
         * Determine where we're at in the Graph and adjust the query context appropriately.
         *
         * For example, if we're querying for datetime as a field of event query, this will automatically
         * set the query to pull datetimes that belong to that event.
         * We can set more cases for other source types.
         */
        if (is_object($this->source)) {
            switch (true) {
                // It's surely an event
                case $this->source instanceof Post:
                    $where_params['EVT_ID'] = $this->source->ID;
                    break;
                case $this->source instanceof EE_Event:
                    $where_params['EVT_ID'] = $this->source->ID();
                    break;
                case $this->source instanceof EE_Ticket:
                    $where_params['Ticket.TKT_ID'] = $this->source->ID();
                    break;
                case $this->source instanceof EE_Checkin:
                    $where_params['Checkin.CHK_ID'] = $this->source->ID();
                    break;
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        list($query_args, $where_params) = $this->mapOrderbyInputArgs($query_args, $where_params, 'DTT_ID');

        if (! empty($this->args['where']['upcoming'])) {
            $where_params['DTT_EVT_start'] = array(
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start')
            );
        }

        if (! empty($this->args['where']['active'])) {
            $where_params['DTT_EVT_start'] = array(
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start')
            );
            $where_params['DTT_EVT_end'] = array(
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end')
            );
        }

        if (! empty($this->args['where']['expired'])) {
            $where_params['DTT_EVT_end'] = array(
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end')
            );
        }

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return $query_args;
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @return array
     */
    public function sanitizeInputFields(array $where_args)
    {
        $arg_mapping = [
            'event'      => 'EVT_ID',
            'eventIn'    => 'EVT_ID',
            'eventId'    => 'EVT_ID',
            'eventIdIn'  => 'EVT_ID',
            'ticket'     => 'Ticket.TKT_ID',
            'ticketIn'   => 'Ticket.TKT_ID',
            'ticketId'   => 'Ticket.TKT_ID',
            'ticketIdIn' => 'Ticket.TKT_ID',
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['event', 'eventIn', 'ticket', 'ticketIn']
        );
    }
}
