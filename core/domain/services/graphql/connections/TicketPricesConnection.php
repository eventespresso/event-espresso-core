<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Price;
use EventEspresso\core\domain\services\graphql\connection_resolvers\PriceConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

/**
 * Class TicketPricesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Wani
 * @since   5.0.0.p
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
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => $this->namespace . 'Ticket',
            'toType'             => $this->namespace . 'Price',
            'fromFieldName'      => 'prices',
            'connectionTypeName' => "{$this->namespace}TicketPricesConnection",
            'connectionArgs'     => TicketPricesConnection::get_connection_args(),
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
        $resolver = new PriceConnectionResolver($entity, $args, $context, $info);
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
            'in'              => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Limit prices to the given globally unique IDs', 'event_espresso'),
            ],
            'idIn'            => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Limit prices to the given IDs', 'event_espresso'),
            ],
            'event'  => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique event ID to get the prices for.', 'event_espresso'),
            ],
            'eventId'  => [
                'type'        => 'Int',
                'description' => esc_html__('Event ID to get the prices for.', 'event_espresso'),
            ],
            'includeDefaultPrices'  => [
                'type'        => 'Boolean',
                'description' => esc_html__('Whether to add default prices to the list.', 'event_espresso'),
            ],
            'includeDefaultTicketsPrices'  => [
                'type'        => 'Boolean',
                'description' => esc_html__('Whether to add default tickets prices to the list.', 'event_espresso'),
            ],
            'isDefault' => [
                'type'        => 'Boolean',
                'description' => esc_html__('Filter the default prices', 'event_espresso'),
            ],
            'ticket'          => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique ticket ID to get the prices for.', 'event_espresso'),
            ],
            'ticketIn'        => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique ticket IDs to get the prices for.', 'event_espresso'),
            ],
            'ticketId'        => [
                'type'        => 'Int',
                'description' => esc_html__('Ticket ID to get the prices for.', 'event_espresso'),
            ],
            'ticketIdIn'      => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Ticket IDs to get the prices for.', 'event_espresso'),
            ],
            'priceType'       => [
                'type'        => 'ID',
                'description' => esc_html__('Globally unique price type ID to get the prices for.', 'event_espresso'),
            ],
            'priceTypeIn'     => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__('Globally unique price type IDs to get the prices for.', 'event_espresso'),
            ],
            'priceTypeId'     => [
                'type'        => 'Int',
                'description' => esc_html__('Price type ID to get the prices for.', 'event_espresso'),
            ],
            'priceTypeIdIn'   => [
                'type'        => ['list_of' => 'Int'],
                'description' => esc_html__('Price type IDs to get the prices for.', 'event_espresso'),
            ],
            'priceBaseTypeIn' => [
                'type'        => ['list_of' => 'PriceBaseTypeEnum'],
                'description' => esc_html__('Price Base types.', 'event_espresso'),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__price_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
