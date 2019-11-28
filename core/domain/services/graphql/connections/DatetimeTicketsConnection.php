<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\connection_resolvers\TicketConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionInterface;
use Exception;

/**
 * Class DatetimeTicketsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DatetimeTicketsConnection implements ConnectionInterface
{

    /**
     * @var EEM_Ticket $model
     */
    protected $model;


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
            'fromType'           => 'Datetime',
            'toType'             => 'Ticket',
            'fromFieldName'      => 'tickets',
            'connectionTypeName' => 'DatetimeTicketsConnection',
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
        $resolver = new TicketConnectionResolver($entity, $args, $context, $info);
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
                    'type'        => ['list_of' => 'TicketsConnectionOrderbyInput'],
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
