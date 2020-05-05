<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\connection_resolvers\TicketConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;

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
        $this->model = $model;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function config()
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
     * @return array
     * @throws Exception
     * @since $VID:$
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new TicketConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
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
            ],
            $args
        );
    }
}
