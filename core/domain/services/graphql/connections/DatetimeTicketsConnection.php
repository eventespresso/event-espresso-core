<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\connection_resolvers\TicketConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

/**
 * Class DatetimeTicketsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DatetimeTicketsConnection extends ConnectionBase
{


    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Ticket $model
     */
    public function __construct(EEM_Ticket $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => $this->namespace . 'Datetime',
            'toType'             => $this->namespace . 'Ticket',
            'fromFieldName'      => 'tickets',
            'connectionTypeName' => "{$this->namespace}DatetimeTicketsConnection",
            'connectionArgs'     => self::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array|Deferred|mixed
     * @throws Exception
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new TicketConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }

    /**
     * Given an optional array of args, this returns the args to be used in the connection
     *
     * @param array $args The args to modify the defaults
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public static function get_connection_args(array $args = []): array
    {
        $newArgs = [
            'orderby'      => [
                'type'        => ['list_of' => 'EspressoTicketsConnectionOrderbyInput'],
                'description' => esc_html__('What parameter to use to order the objects by.', 'event_espresso'),
            ],
            'datetime' => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique datetime ID to get the tickets for.', 'event_espresso'),
            ],
            'datetimeIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique datetime IDs to get the tickets for.', 'event_espresso'),
            ],
            'datetimeId' => [
                'type'        => 'Int',
                'description' => esc_html__('Datetime ID to get the tickets for.', 'event_espresso'),
            ],
            'datetimeIdIn' => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Datetime IDs to get the tickets for.', 'event_espresso'),
            ],
            'event'  => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique event ID to get the tickets for.', 'event_espresso'),
            ],
            'eventIn'  => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique event IDs to get the tickets for.', 'event_espresso'),
            ],
            'eventId'  => [
                'type'        => 'Int',
                'description' => esc_html__('Event ID to get the tickets for.', 'event_espresso'),
            ],
            'eventIdIn'  => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Event IDs to get the tickets for.', 'event_espresso'),
            ],
            'includeDefaultTickets'  => [
                'type'        => 'Boolean',
                'description' => esc_html__('Whether to add default tickets to the list.', 'event_espresso'),
            ],
            'search' => [
                'type'        => 'String',
                'description' => esc_html__('The search keywords', 'event_espresso'),
            ],
            'isDefault' => [
                'type'        => 'Boolean',
                'description' => esc_html__('Filter the default tickets', 'event_espresso'),
            ],
            'isRequired'   => [
                'type'        => 'Boolean',
                'description' => esc_html__('Filter the required tickets', 'event_espresso'),
            ],
            'isTaxable'   => [
                'type'        => 'Boolean',
                'description' => esc_html__('Filter the taxable tickets', 'event_espresso'),
            ],
            'isTrashed'   => [
                'type'        => 'Boolean',
                'description' => esc_html__('Filter the trashed tickets', 'event_espresso'),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__ticket_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
