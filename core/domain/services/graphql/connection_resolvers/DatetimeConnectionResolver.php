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
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name()
    {
        return 'espresso_datetime';
    }

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
     * Return an array of item IDs from the query
     *
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_ids()
    {
        $results = $this->query->get_col($this->query_args);

        return ! empty($results) ? $results : [];
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
        $where_params = ['DTT_deleted' => ['IN', [true, false]]];
        $query_args   = [];

        $query_args['limit'] = $this->getLimit();

        // Avoid multiple entries by join.
        $query_args['group_by'] = 'DTT_ID';

        $query_args['default_where_conditions'] = 'minimum';

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

        $search = isset($this->args['where']) ? $this->getSearchKeywords($this->args['where']) : '';

        if (! empty($search)) {
            // use OR operator to search in any of the fields
            $where_params['OR'] = array(
                'DTT_name'        => array('LIKE', '%' . $search . '%'),
                'DTT_description' => array('LIKE', '%' . $search . '%'),
            );
        }

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

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__datetime_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__datetime_query_args',
            $query_args,
            $this->source,
            $this->args
        );
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
