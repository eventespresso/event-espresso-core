<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Attendee;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AttendeeConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryAttendeesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
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
        $this->model = $model;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function config()
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
     * @since $VID:$
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new AttendeeConnectionResolver($entity, $args, $context, $info);
    }

    /**
     * Given an optional array of args, this returns the args to be used in the connection
     *
     * @access public
     * @param array $args The args to modify the defaults
     *
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public static function get_connection_args($args = [])
    {
        return array_merge(
            [
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
            ],
            $args
        );
    }
}
