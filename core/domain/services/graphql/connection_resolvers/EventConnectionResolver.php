<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Datetime;
use EE_Error;
use EEM_Datetime;
use EEM_Event;
use EE_Event;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use WPGraphQL\Model\Post;

/**
 * Class EventConnectionResolver
 *
 */
class EventConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name()
    {
        return 'espresso_event';
    }

    /**
     * @return EEM_Event
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query()
    {
        return EEM_Event::instance();
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
        $input_fields = [];
        $query_args   = [
            'limit'                    => $this->getLimit(),
            'default_where_conditions' => 'minimum',
        ];
        $where_params = [
            'status' => ['IN', ['publish', EEM_Event::sold_out]],
        ];

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);
            // Use the proper operator.
            if (! empty($input_fields['EVT_ID']) && is_array($input_fields['EVT_ID'])) {
                $input_fields['EVT_ID'] = ['in', $input_fields['EVT_ID']];
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
                case $this->source instanceof EE_Datetime:
                    $where_params['Datetime.EVT_ID'] = $this->source->ID();
                    break;
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        [$query_args, $where_params] = $this->mapOrderbyInputArgs($query_args, $where_params, 'EVT_ID');

        $search = isset($this->args['where']) ? $this->getSearchKeywords($this->args['where']) : '';

        if (! empty($search)) {
            // use OR operator to search in any of the fields
            $where_params['OR'] = [
                'EVT_name'        => ['LIKE', '%' . $search . '%'],
                'EVT_description' => ['LIKE', '%' . $search . '%'],
            ];
        }

        if (! empty($this->args['where']['upcoming'])) {
            $where_params['Datetime.DTT_EVT_start'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        }

        if (! empty($this->args['where']['active'])) {
            $where_params['Datetime.DTT_EVT_start'] = [
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        }

        if (! empty($this->args['where']['expired'])) {
            $where_params['Datetime.DTT_EVT_end'] = [
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__event_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__event_query_args',
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
            'datetime'     => 'Datetime.DTT_ID',
            'datetimeIn'   => 'Datetime.DTT_ID',
            'datetimeIdIn' => 'Datetime.DTT_ID',
            'datetimeId'   => 'Datetime.DTT_ID', // priority.
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['datetime', 'datetimeIn']
        );
    }
}
