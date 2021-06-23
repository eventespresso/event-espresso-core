<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

/**
 * Class EventDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventDatetimesConnection extends ConnectionBase
{


    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Datetime               $model
     */
    public function __construct(EEM_Datetime $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => $this->namespace . 'Event',
            'toType'             => $this->namespace . 'Datetime',
            'fromFieldName'      => 'datetimes',
            'connectionTypeName' => "{$this->namespace}EventDatetimesConnection",
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
        $resolver = new DatetimeConnectionResolver($entity, $args, $context, $info);
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
                'type'        => ['list_of' => 'EspressoDatetimesConnectionOrderbyInput'],
                'description' => esc_html__('What parameter to use to order the objects by.', 'event_espresso'),
            ],
            'event'  => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique event ID to get the datetimes for.', 'event_espresso'),
            ],
            'eventIn'  => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique event IDs to get the datetimes for.', 'event_espresso'),
            ],
            'eventId'  => [
                'type'        => 'Int',
                'description' => esc_html__('Event ID to get the datetimes for.', 'event_espresso'),
            ],
            'eventIdIn'  => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Event IDs to get the datetimes for.', 'event_espresso'),
            ],
            'ticket' => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique ticket ID to get the datetimes for.', 'event_espresso'),
            ],
            'ticketIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique ticket IDs to get the datetimes for.', 'event_espresso'),
            ],
            'ticketId' => [
                'type'        => 'Int',
                'description' => esc_html__('Ticket ID to get the datetimes for.', 'event_espresso'),
            ],
            'ticketIdIn' => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Ticket IDs to get the datetimes for.', 'event_espresso'),
            ],
            'upcoming' => [
                'type'        => 'Boolean',
                'description' => esc_html__('Datetimes which are upcoming.', 'event_espresso'),
            ],
            'active'   => [
                'type'        => 'Boolean',
                'description' => esc_html__('Datetimes which are active.', 'event_espresso'),
            ],
            'expired'  => [
                'type'        => 'Boolean',
                'description' => esc_html__('Datetimes which are expired.', 'event_espresso'),
            ],
            'search' => [
                'type'        => 'String',
                'description' => esc_html__('The search keywords', 'event_espresso'),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__datetime_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
