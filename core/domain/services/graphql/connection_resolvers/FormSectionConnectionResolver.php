<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Form_Section;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class FormSectionConnectionResolver
 */
class FormSectionConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_formSection';
    }

    /**
     * @return EEM_Form_Section
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_Form_Section
    {
        return EEM_Form_Section::instance();
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
        $query_args['group_by'] = 'FSC_UUID';

        /**
         * Collect the input fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);

            // Use the proper operator.
            if (! empty($input_fields['FSC_appliesTo']) && is_array($input_fields['FSC_appliesTo'])) {
                $input_fields['FSC_appliesTo'] = ['IN', $input_fields['FSC_appliesTo']];
            }
            if (! empty($input_fields['FSC_belongsTo']) && is_array($input_fields['FSC_belongsTo'])) {
                $input_fields['FSC_belongsTo'] = ['IN', $input_fields['FSC_belongsTo']];
            }
            if (! empty($input_fields['FSC_status']) && is_array($input_fields['FSC_status'])) {
                $input_fields['FSC_status'] = ['IN', $input_fields['FSC_status']];
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__form_section_where_params',
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
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__form_section_query_args',
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
                'appliesTo' => 'FSC_appliesTo',
                'belongsTo' => 'FSC_belongsTo',
                'status'    => 'FSC_status',
            ]
        );
    }
}
