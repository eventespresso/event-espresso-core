<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_State;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class DatetimeConnectionResolver
 */
class StateConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_state';
    }

    /**
     * @return EEM_State
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_State
    {
        return EEM_State::instance();
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
        $query_args['group_by'] = 'STA_ID';

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
            if (! empty($input_fields['STA_ID']) && is_array($input_fields['STA_ID'])) {
                $input_fields['STA_ID'] = ['IN', $input_fields['STA_ID']];
            }
            if (! empty($input_fields['CNT_ISO']) && is_array($input_fields['CNT_ISO'])) {
                $input_fields['CNT_ISO'] = ['IN', $input_fields['CNT_ISO']];
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
            $where_params['STA_active'] = true;
        }

        [$query_args, $where_params] = $this->mapOrderbyInputArgs($query_args, $where_params, 'STA_ID');

        if (empty($query_args['order_by'])) {
            // set order_by to 'name' by default
            $query_args['order_by'] = [
                'STA_name' => 'ASC',
            ];
        }

        $search = $this->getSearchKeywords($this->args['where']);

        if (! empty($search)) {
            // use OR operator to search in any of the fields
            $where_params['OR'] = array(
                'STA_name' => array('LIKE', '%' . $search . '%'),
            );
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__state_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__state_query_args',
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
            'in'           => 'STA_ID',
            'countryIsoIn' => 'CNT_ISO',
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['in']
        );
    }
}
