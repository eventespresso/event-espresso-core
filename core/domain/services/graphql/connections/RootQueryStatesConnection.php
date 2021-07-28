<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_State;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\StateConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryStatesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
class RootQueryStatesConnection extends AbstractRootQueryConnection
{


    /**
     * StateConnection constructor.
     *
     * @param EEM_State               $model
     */
    public function __construct(EEM_State $model)
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
            'toType'             => $this->namespace . 'State',
            'fromFieldName'      => lcfirst($this->namespace) . 'States',
            'connectionTypeName' => "{$this->namespace}RootQueryStatesConnection",
            'connectionArgs'     => self::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return StateConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new StateConnectionResolver($entity, $args, $context, $info);
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
                'type'        => ['list_of' => 'EspressoCountriesConnectionOrderbyInput'],
                'description' => esc_html__('What parameter to use to order the objects by.', 'event_espresso'),
            ],
            'in' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Limit the result to the set of given state IDs.',
                    'event_espresso'
                ),
            ],
            'countryIsoIn' => [
                'type'        => ['list_of' => 'String'],
                'description' => esc_html__(
                    'Limit the result to the set of given country ISOs.',
                    'event_espresso'
                ),
            ],
            'search' => [
                'type'        => 'String',
                'description' => esc_html__('The search keywords', 'event_espresso'),
            ],
            'activeOnly' => [
                'type'        => 'Boolean',
                'description' => esc_html__(
                    'Limit the result to the active states.',
                    'event_espresso'
                ),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__state_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
