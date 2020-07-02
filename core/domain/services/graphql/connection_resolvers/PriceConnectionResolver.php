<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Ticket;
use EE_Error;
use EEM_Price;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class PriceConnectionResolver
 */
class PriceConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name()
    {
        return 'espresso_price';
    }

    /**
     * @return EEM_Price
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query()
    {
        return EEM_Price::instance();
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
     * @throws ReflectionException
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
        $query_args['group_by'] = 'PRC_ID';

        $query_args['default_where_conditions'] = 'minimum';

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);

            // Use the proper operator.
            if (! empty($input_fields['PRC_ID']) && is_array($input_fields['PRC_ID'])) {
                $input_fields['PRC_ID'] = ['in', $input_fields['PRC_ID']];
            }
            if (! empty($input_fields['Ticket.TKT_ID']) && is_array($input_fields['Ticket.TKT_ID'])) {
                $input_fields['Ticket.TKT_ID'] = ['in', $input_fields['Ticket.TKT_ID']];
            }
            if (! empty($input_fields['Price_Type.PBT_ID']) && is_array($input_fields['Price_Type.PBT_ID'])) {
                $input_fields['Price_Type.PBT_ID'] = ['in', $input_fields['Price_Type.PBT_ID']];
            }
            if (! empty($input_fields['Price_Type.PRT_ID']) && is_array($input_fields['Price_Type.PRT_ID'])) {
                $input_fields['Price_Type.PRT_ID'] = ['in', $input_fields['Price_Type.PRT_ID']];
            }
        }

        /**
         * Determine where we're at in the Graph and adjust the query context appropriately.
         */
        if ($this->source instanceof EE_Ticket) {
            $where_params['Ticket.TKT_ID'] = $this->source->ID();
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        list($query_args, $where_params) = $this->mapOrderbyInputArgs($query_args, $where_params, 'PRC_ID');

        // If default prices should be included.
        if (! empty($this->args['where']['includeDefaultPrices'])) {
            /**
             * We need to get each price that
             * - satisfies $where_params above
             * OR
             * - it's a default non trashed price
             */
            $where_params = [
                'OR' => [
                    // use extra OR instead of AND to avoid it getting overridden
                    'OR' => [
                        'AND' => [
                            'PRC_deleted'    => 0,
                            'PRC_is_default' => 1,
                        ]
                    ],
                    'AND' => $where_params,
                ],
            ];
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
            'in'              => 'PRC_ID',
            'idIn'            => 'PRC_ID',
            'ticket'          => 'Ticket.TKT_ID',
            'ticketIn'        => 'Ticket.TKT_ID',
            'ticketIdIn'      => 'Ticket.TKT_ID',
            'ticketId'        => 'Ticket.TKT_ID', // priority.
            'priceType'       => 'Price_Type.PRT_ID',
            'priceTypeIn'     => 'Price_Type.PRT_ID',
            'priceTypeIdIn'   => 'Price_Type.PRT_ID',
            'priceTypeId'     => 'Price_Type.PRT_ID', // priority.
            'priceBaseType'   => 'Price_Type.PBT_ID',
            'priceBaseTypeIn' => 'Price_Type.PBT_ID',
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['in', 'ticket', 'ticketIn', 'priceType', 'priceTypeIn']
        );
    }
}
