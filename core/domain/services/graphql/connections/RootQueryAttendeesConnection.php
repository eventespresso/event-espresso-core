<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Attendee;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AttendeeConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryAttendeesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   5.0.0.p
 */
class RootQueryAttendeesConnection extends AbstractRootQueryConnection
{
    /**
     * AttendeeConnection constructor.
     *
     * @param EEM_Attendee               $model
     */
    public function __construct(EEM_Attendee $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'Attendee',
            'fromFieldName'      => lcfirst($this->namespace) . 'Attendees',
            'connectionTypeName' => "{$this->namespace}RootQueryAttendeesConnection",
            'connectionArgs'     => self::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return AttendeeConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new AttendeeConnectionResolver($entity, $args, $context, $info);
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
            'datetime' => [
                'type'        => 'ID',
                'description' => esc_html__(
                    'Globally unique datetime ID to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'datetimeIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Globally unique datetime IDs to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'event' => [
                'type'        => 'ID',
                'description' => esc_html__(
                    'Globally unique event ID to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'eventIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Globally unique event IDs to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'orderby'      => [
                'type'        => ['list_of' => 'EspressoAttendeesConnectionOrderbyInput'],
                'description' => esc_html__('What parameter to use to order the objects by.', 'event_espresso'),
            ],
            'regTicket' => [
                'type'        => 'ID',
                'description' => esc_html__(
                    'Globally unique registration ticket ID to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'regTicketIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Globally unique registration ticket IDs to get the attendees for.',
                    'event_espresso'
                ),
            ],
            'regTicketId' => [
                'type'        => 'Int',
                'description' => esc_html__('Registration ticket ID to get the attendees for.', 'event_espresso'),
            ],
            'regTicketIdIn' => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Registration ticket IDs to get the attendees for.', 'event_espresso'),
            ],
            'regStatus' => [
                'type'        => 'EspressoRegistrationStatusEnum',
                'description' => esc_html__('Limit attendees to registration status.', 'event_espresso'),
            ],
            'search' => [
                'type'        => 'String',
                'description' => esc_html__('The search keywords', 'event_espresso'),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__attendee_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
