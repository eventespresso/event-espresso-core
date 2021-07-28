<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Country;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use Throwable;

/**
 * Class DatetimeConnectionResolver
 */
class CountryConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_country';
    }

    /**
     * @return EEM_Country
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_Country
    {
        return EEM_Country::instance();
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
     * Get_query_amount
     *
     * Returns the max between what was requested and what is defined as the $max_query_amount to
     * ensure that queries don't exceed unwanted limits when querying data.
     *
     * @return int
     * @throws Exception
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_amount()
    {
        // Override the default limit (100) for countries
        return 300;
    }


    /**
     * Here, we map the args from the input, then we make sure that we're only querying
     * for IDs. The IDs are then passed down the resolve tree, and deferred resolvers
     * handle batch resolution of the posts.
     *
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_args(): array
    {
        $where_params = [];
        $query_args   = [];

        $query_args['limit'] = $this->getLimit();

        // Avoid multiple entries by join.
        $query_args['group_by'] = 'CNT_ISO';

        $query_args['default_where_conditions'] = 'minimum';

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);

            // Since we do not have any falsy values in query params
            // Lets get rid of empty values
            $input_fields = array_filter($input_fields);

            // Use the proper operator.
            if (! empty($input_fields['CNT_ISO']) && is_array($input_fields['CNT_ISO'])) {
                $input_fields['CNT_ISO'] = ['IN', $input_fields['CNT_ISO']];
            }
            if (! empty($input_fields['CNT_ISO3']) && is_array($input_fields['CNT_ISO3'])) {
                $input_fields['CNT_ISO3'] = ['IN', $input_fields['CNT_ISO3']];
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        // limit to active countries by default.
        if (!isset($this->args['where']['activeOnly']) || $this->args['where']['activeOnly']) {
            $where_params['CNT_active'] = true;
        }

        [$query_args, $where_params] = $this->mapOrderbyInputArgs($query_args, $where_params, 'CNT_ISO');

        if (empty($query_args['order_by'])) {
            // set order_by to 'name' by default
            $query_args['order_by'] = [
                'CNT_name' => 'ASC',
            ];
        }

        $search = $this->getSearchKeywords($this->args['where']);

        if (! empty($search)) {
            // use OR operator to search in any of the fields
            $where_params['OR'] = array(
                'CNT_name' => array('LIKE', '%' . $search . '%'),
                'CNT_ISO'  => array('LIKE', '%' . $search . '%'),
            );
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__country_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__country_query_args',
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
        $arg_mapping = [
            'isoIn'  => 'CNT_ISO',
            'in'     => 'CNT_ISO',
            'iso3In' => 'CNT_ISO3',
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['in']
        );
    }
}
