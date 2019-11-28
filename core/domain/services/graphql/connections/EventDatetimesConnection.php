<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\connection_resolvers\DatetimeConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;
use WPGraphQL\Type\WPObjectType;

/**
 * Class EventDatetimesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventDatetimesConnection implements ConnectionInterface
{

    /**
     * @var EEM_Datetime $model
     */
    protected $model;


    /**
     * DatetimeConnection constructor.
     *
     * @param EEM_Datetime               $model
     */
    public function __construct(EEM_Datetime $model)
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
            'fromType'           => 'Event',
            'toType'             => 'Datetime',
            'fromFieldName'      => 'datetimes',
            'connectionTypeName' => 'EventDatetimesConnection',
            'connectionArgs'     => self::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
            'resolveNode'        => [$this, 'resolveNode']
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array
     * @throws Exception
     * @since $VID:$
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new DatetimeConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }


    /**
     * @param $id
     * @param $args
     * @param $context
     * @param $info
     * @return EE_Base_Class
     * @since $VID:$
     */
    public function resolveNode($id, $args, $context, $info)
    {
        return $this->model->get_one_by_ID($id);
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
                    'type'        => ['list_of' => 'DatetimesConnectionOrderbyInput'],
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
            ],
            $args
        );
    }
}
