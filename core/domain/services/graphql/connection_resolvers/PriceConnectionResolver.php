<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Ticket;
use EEM_Datetime;
use EEM_Ticket;
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
            // if event ID is passed but not a ticket ID
            if (! isset($input_fields['Ticket.TKT_ID']) && isset($input_fields['Event.EVT_ID'])) {
                $event_id = $input_fields['Event.EVT_ID'];
                // Ensure that this doesn't go to the query.
                // After all there is no DB relation between event and price
                unset($input_fields['Event.EVT_ID']);
                // get all the datetimeIds of the event
                $event_datetime_ids = EEM_Datetime::instance()->get_col([
                    [
                        'EVT_ID'      => $event_id,
                    ],
                    'default_where_conditions' => 'minimum'
                ]);
                // get all the related ticket Ids
                $ticket_ids = EEM_Ticket::instance()->get_col([
                    [
                        'Datetime.DTT_ID' => ['IN', $event_datetime_ids],
                    ],
                    'default_where_conditions' => 'minimum'
                ]);

                // add tickets relation to the query
                $input_fields['Ticket.TKT_ID'] = ['IN', $ticket_ids];
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

        $default_prices_params = [];

        // If default ticket prices should be included.
        if (! empty($this->args['where']['includeDefaultTicketsPrices'])) {
            $default_ticket_ids = EEM_Ticket::instance()->get_col([
                [
                    'TKT_is_default' => 1,
                ],
                'default_where_conditions' => 'minimum'
            ]);

            // if we have default tickets
            if (! empty($default_ticket_ids)) {
                $default_prices_params['OR'] = [
                    'Ticket.TKT_ID' => ['IN', $default_ticket_ids],
                ];
            }
        }

        // If default prices should be included.
        if (! empty($this->args['where']['includeDefaultPrices'])) {
            $default_prices_params['AND'] = [
                'PRC_deleted'    => 0,
                'PRC_is_default' => 1,
            ];
        }

        if (! empty($default_prices_params)) {
            if (empty($where_params)) {
                $where_params['OR'] = $default_prices_params;
            } else {
                $where_params = [
                    'OR' => [
                        'OR'  => $default_prices_params,
                        'AND' => $where_params,
                    ],
                ];
            }
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__price_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__price_query_args',
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
            'in'              => 'PRC_ID',
            'idIn'            => 'PRC_ID',
            'isDefault'       => 'PRC_is_default',
            'event'           => 'Event.EVT_ID',
            'eventId'         => 'Event.EVT_ID', // priority.
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
            ['in', 'event', 'ticket', 'ticketIn', 'priceType', 'priceTypeIn']
        );
    }
}
