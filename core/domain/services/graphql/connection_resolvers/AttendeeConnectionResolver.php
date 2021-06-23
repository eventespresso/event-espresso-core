<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Attendee;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use Throwable;

/**
 * Class DatetimeConnectionResolver
 */
class AttendeeConnectionResolver extends AbstractConnectionResolver
{
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_loader_name(): string
    {
        return 'espresso_attendee';
    }

    /**
     * @return EEM_Attendee
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query(): EEM_Attendee
    {
        return EEM_Attendee::instance();
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
        $query_args['group_by'] = 'ATT_ID';

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
            if (! empty($input_fields['Registration.Event.EVT_ID']) && is_array($input_fields['Registration.Event.EVT_ID'])) {
                $input_fields['Registration.Event.EVT_ID'] = ['IN', $input_fields['Registration.Event.EVT_ID']];
            }
            if (! empty($input_fields['Registration.Ticket.TKT_ID']) && is_array($input_fields['Registration.Ticket.TKT_ID'])) {
                $input_fields['Registration.Ticket.TKT_ID'] = ['IN', $input_fields['Registration.Ticket.TKT_ID']];
            }
            // If Ticket param is passed, it will have preference over Datetime param
            // So, use Datetime param only if a Ticket param is not passed
            if (! empty($input_fields['Datetime.DTT_ID']) && empty($input_fields['Registration.Ticket.TKT_ID'])) {
                $datetimeIds = $input_fields['Datetime.DTT_ID'];
                // Make sure it's an array, ready for "IN" operator
                $datetimeIds = is_array($datetimeIds) ? $datetimeIds : [$datetimeIds];

                try {
                    // Get related ticket IDs for the given dates
                    $ticketIds = EEM_Ticket::instance()->get_col([
                        [
                            'Datetime.DTT_ID' => ['IN', $datetimeIds],
                            'TKT_deleted'     => ['IN', [true, false]],
                        ],
                        'default_where_conditions' => 'minimum',
                    ]);
                } catch (Throwable $th) {
                    $ticketIds = [];
                }

                if (!empty($ticketIds)) {
                    $input_fields['Registration.Ticket.TKT_ID'] = ['IN', $ticketIds];
                }
            }
            // Since there is no relation between Attendee and Datetime, we need to remove it
            unset($input_fields['Datetime.DTT_ID']);
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $where_params = array_merge($where_params, $input_fields);
        }

        [$query_args, $where_params] = $this->mapOrderbyInputArgs($query_args, $where_params, 'ATT_ID');

        $search = $this->getSearchKeywords($this->args['where']);

        if (! empty($search)) {
            // use OR operator to search in any of the fields
            $where_params['OR'] = array(
                'ATT_full_name' => array('LIKE', '%' . $search . '%'),
                'ATT_bio'       => array('LIKE', '%' . $search . '%'),
                'ATT_short_bio' => array('LIKE', '%' . $search . '%'),
            );
        }

        $where_params = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__attendee_where_params',
            $where_params,
            $this->source,
            $this->args
        );

        $query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connection_resolvers__attendee_query_args',
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
            // There is no direct relation between Attendee and Datetime
            // But we will handle it via Tickets related to given dates
            'datetime'      => 'Datetime.DTT_ID',
            'datetimeIn'    => 'Datetime.DTT_ID',
            'event'         => 'Registration.Event.EVT_ID',
            'eventIn'       => 'Registration.Event.EVT_ID',
            'regTicket'     => 'Registration.Ticket.TKT_ID',
            'regTicketIn'   => 'Registration.Ticket.TKT_ID',
            'regTicketIdIn' => 'Registration.Ticket.TKT_ID',
            'regTicketId'   => 'Registration.Ticket.TKT_ID', // priority.
            'regStatus'     => 'Registration.Status.STS_ID',
        ];
        return $this->sanitizeWhereArgsForInputFields(
            $where_args,
            $arg_mapping,
            ['datetime', 'datetimeIn', 'event', 'eventIn', 'regTicket', 'regTicketIn']
        );
    }
}
