<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Form_Input;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class FormElementConnectionResolver
 */
class FormElementConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_formElement';
    }

    /**
     * @return EEM_Form_Input
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_Form_Input
    {
        return EEM_Form_Input::instance();
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
        $query_args['group_by'] = 'FIN_UUID';

        /**
        * Collect the input fields and sanitize them to prepare them for sending to the Query
        */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);

            // Use the proper operator.
            if (! empty($input_fields['FIN_belongsTo']) && is_array($input_fields['FIN_belongsTo'])) {
                $input_fields['FIN_belongsTo'] = ['IN', $input_fields['FIN_belongsTo']];
            }
            if (! empty($input_fields['FIN_status']) && is_array($input_fields['FIN_status'])) {
                $input_fields['FIN_status'] = ['IN', $input_fields['FIN_status']];
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__form_element_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        if (! empty($where_params)) {
            $query_args[] = $where_params;
        }


        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__form_element_query_args',
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
            [
                'belongsTo' => 'FIN_belongsTo',
                'status'    => 'FIN_status',
            ]
        );
    }
}
