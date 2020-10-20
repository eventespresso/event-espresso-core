<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Event;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use EventEspresso\core\domain\services\graphql\connection_resolvers\EventConnectionResolver;

class RootQueryEventsConnection extends AbstractRootQueryConnection
{

    /**
     * EventsConnection constructor.
     *
     * @param EEM_Event $model
     */
    public function __construct(EEM_Event $model)
    {
        $this->model = $model;
    }


    /**
     * @inheritDoc
     */
    public function config()
    {
        return [
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'Event',
            'fromFieldName'      => lcfirst($this->namespace . 'Events'),
            'connectionTypeName' => "{$this->namespace}RootQueryEventsConnection",
            'connectionArgs'     => self::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }

    /**
     * Given an optional array of args, this returns the args to be used in the connection
     *
     * @access public
     * @param array $args The args to modify the defaults
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public static function get_connection_args($args = [])
    {
        $newArgs = [
            'datetime'   => [
                'type'        => 'ID',
                'description' => esc_html__(
                    'Globally unique datetime ID to get the events for.',
                    'event_espresso'
                ),
            ],
            'datetimeIn' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Globally unique datetime IDs to get the events for.',
                    'event_espresso'
                ),
            ],
            'orderby'    => [
                'type'        => ['list_of' => 'EspressoEventsConnectionOrderbyInput'],
                'description' => esc_html__('What parameter to use to order the objects by.', 'event_espresso'),
            ],
            'search'     => [
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


    /**
     * @inheritDoc
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new EventConnectionResolver($entity, $args, $context, $info);
    }
}
