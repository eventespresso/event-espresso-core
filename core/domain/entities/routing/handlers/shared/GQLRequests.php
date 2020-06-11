<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\Route;

/**
 * Class GQLRequests
 * loads for any type of request where GraphQL requests may occur
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GQLRequests extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return PHP_VERSION_ID > 70000
               && (
                   $this->request->isGQL()
                   || $this->request->isUnitTesting()
                   || (
                       $this->request->isAdmin()
                       && $this->request->getRequestParam('page') === 'espresso_events'
                       && (
                           $this->request->getRequestParam('action') === 'create_new'
                           || $this->request->getRequestParam('action') === 'edit'
                       )
                   )
               );
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\GraphQLManager',
            [
                'EventEspresso\core\services\graphql\ConnectionsManager' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\graphql\DataLoaderManager'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\graphql\EnumsManager'       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\graphql\InputsManager'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\graphql\TypesManager'       => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\TypesManager',
            [
                'EventEspresso\core\services\graphql\types\TypeCollection' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\InputsManager',
            [
                'EventEspresso\core\services\graphql\inputs\InputCollection' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\EnumsManager',
            [
                'EventEspresso\core\services\graphql\enums\EnumCollection' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\ConnectionsManager',
            [
                'EventEspresso\core\services\graphql\connections\ConnectionCollection' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\graphql\DataLoaderManager',
            [
                'EventEspresso\core\services\graphql\loaders\DataLoaderCollection' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Datetime',
            ['EEM_Datetime' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Attendee',
            ['EEM_Attendee' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Event',
            ['EEM_Event' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Ticket',
            ['EEM_Ticket' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Price',
            ['EEM_Price' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\PriceType',
            ['EEM_Price_Type' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Venue',
            ['EEM_Venue' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\State',
            ['EEM_State' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\types\Country',
            ['EEM_Country' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\EventDatetimesConnection',
            ['EEM_Datetime' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\RootQueryDatetimesConnection',
            ['EEM_Datetime' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\RootQueryAttendeesConnection',
            ['EEM_Attendee' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\DatetimeTicketsConnection',
            ['EEM_Ticket' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\RootQueryTicketsConnection',
            ['EEM_Ticket' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\TicketPricesConnection',
            ['EEM_Price' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\RootQueryPricesConnection',
            ['EEM_Price' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\RootQueryPriceTypesConnection',
            ['EEM_Price_Type' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\TicketDatetimesConnection',
            ['EEM_Datetime' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\graphql\connections\EventVenuesConnection',
            ['EEM_Venue' => EE_Dependency_Map::load_from_cache]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {

        if (! class_exists('WPGraphQL')) {
            require_once EE_THIRD_PARTY . 'wp-graphql/wp-graphql.php';
        }
        // load handler for EE GraphQL requests
        $graphQL_manager = $this->loader->getShared(
            'EventEspresso\core\services\graphql\GraphQLManager'
        );
        $graphQL_manager->init();
        return true;
    }
}
