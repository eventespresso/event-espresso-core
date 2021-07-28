<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Country;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\CountryConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryCountriesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
class RootQueryCountriesConnection extends AbstractRootQueryConnection
{


    /**
     * CountryConnection constructor.
     *
     * @param EEM_Country               $model
     */
    public function __construct(EEM_Country $model)
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
            'toType'             => $this->namespace . 'Country',
            'fromFieldName'      => lcfirst($this->namespace . 'Countries'),
            'connectionTypeName' => "{$this->namespace}RootQueryCountriesConnection",
            'connectionArgs'     => RootQueryCountriesConnection::get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return CountryConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new CountryConnectionResolver($entity, $args, $context, $info);
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
                    'Limit the result to the set of given country IDs.',
                    'event_espresso'
                ),
            ],
            'isoIn' => [
                'type'        => ['list_of' => 'String'],
                'description' => esc_html__(
                    'Limit the result to the set of given country ISOs.',
                    'event_espresso'
                ),
            ],
            'iso3In' => [
                'type'        => ['list_of' => 'String'],
                'description' => esc_html__(
                    'Limit the result to the set of given country ISO3s.',
                    'event_espresso'
                ),
            ],
            'search' => [
                'type'        => 'String',
                'description' => esc_html__(
                    'Limit the result to the given search query.',
                    'event_espresso'
                ),
            ],
            'activeOnly' => [
                'type'        => 'Boolean',
                'description' => esc_html__(
                    'Limit the result to the active countries.',
                    'event_espresso'
                ),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__country_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
