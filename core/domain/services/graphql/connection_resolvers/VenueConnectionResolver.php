<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Venue;
use EE_Event;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Model\Post;

/**
 * Class VenueConnectionResolver
 */
class VenueConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_venue';
    }

    /**
     * @return EEM_Venue
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_Venue
    {
        return EEM_Venue::instance();
    }


    /**
     * Return an array of item IDs from the query
     *
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_ids(): array
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
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_args(): array
    {
        $where_params = [];
        $query_args = [];

        $query_args['limit'] = $this->getLimit();

        // Avoid multiple entries by join.
        $query_args['group_by'] = 'VNU_ID';

        $query_args['default_where_conditions'] = 'minimum';

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);
        }

        /**
         * Determine where we're at in the Graph and adjust the query context appropriately.
         * For example, if we're querying for datetime as a field of event query, this will automatically
         * set the query to pull datetimes that belong to that event.
         * We can set more cases for other source types.
         */
        if (is_object($this->source)) {
            switch (true) {
                // Assumed to be an event
                case $this->source instanceof Post:
                    $where_params['Event.EVT_ID'] = $this->source->ID;
                    break;
                case $this->source instanceof EE_Event:
                    $where_params['Event.EVT_ID'] = $this->source->ID();
                    break;
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        [$query_args, $where_params] = $this->mapOrderbyInputArgs($query_args, $where_params, 'VNU_ID');

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__venue_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__venue_query_args',
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
    public function sanitizeInputFields(array $where_args): array
    {
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            [],
            []
        );
    }
}
