<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EE_Base_Class;
use EEM_Price;
use EventEspresso\core\domain\services\graphql\connection_resolvers\PriceConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;

/**
 * Class TicketPricesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class TicketPricesConnection extends ConnectionBase
{


    /**
     * TicketConnection constructor.
     *
     * @param EEM_Price $model
     */
    public function __construct(EEM_Price $model)
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
            'fromType'           => $this->namespace . 'Ticket',
            'toType'             => $this->namespace . 'Price',
            'fromFieldName'      => 'prices',
            'connectionTypeName' => "{$this->namespace}TicketPricesConnection",
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
        $resolver = new PriceConnectionResolver($entity, $args, $context, $info);
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
                'ticket' => [
                    'type'        => 'ID',
                    'description' => esc_html__('Globally unique ticket ID to get the prices for.', 'event_espresso'),
                ],
                'ticketIn' => [
                    'type'        => ['list_of' => 'ID'],
                    'description' => esc_html__('Globally unique ticket IDs to get the prices for.', 'event_espresso'),
                ],
                'ticketId' => [
                    'type'        => 'Int',
                    'description' => esc_html__('Ticket ID to get the prices for.', 'event_espresso'),
                ],
                'ticketIdIn' => [
                    'type'        => ['list_of' => 'Int'],
                    'description' => esc_html__('Ticket IDs to get the prices for.', 'event_espresso'),
                ],
                'priceType' => [
                    'type'        => 'ID',
                    'description' => esc_html__('Globally unique price type ID to get the prices for.', 'event_espresso'),
                ],
                'priceTypeIn' => [
                    'type'        => ['list_of' => 'ID'],
                    'description' => esc_html__('Globally unique price type IDs to get the prices for.', 'event_espresso'),
                ],
                'priceTypeId' => [
                    'type'        => 'Int',
                    'description' => esc_html__('Price type ID to get the prices for.', 'event_espresso'),
                ],
                'priceTypeIdIn' => [
                    'type'        => ['list_of' => 'Int'],
                    'description' => esc_html__('Price type IDs to get the prices for.', 'event_espresso'),
                ],
                'priceBaseType' => [
                    'type'        => 'PriceBaseTypeEnum',
                    'description' => esc_html__('Price Base type.', 'event_espresso'),
                ],
                'priceBaseTypeIn' => [
                    'type'        => ['list_of' => 'PriceBaseTypeEnum'],
                    'description' => esc_html__('Price Base types.', 'event_espresso'),
                ],
            ],
            $args
        );
    }
}
