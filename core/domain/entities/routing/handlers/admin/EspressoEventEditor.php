<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\Route;

/**
 * Class EspressoEventEditor
 * detects and executes logic for the Event Espresso Event Editor
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEventEditor extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->request->isAdmin()
               && $this->request->getRequestParam('page') === 'espresso_events'
               && (
                   $this->request->getRequestParam('action') === 'create_new'
                   || $this->request->getRequestParam('action') === 'edit'
               );
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\assets\EspressoEditorAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\editor\EventEditor',
            [
                'EE_Admin_Config'                                                               => EE_Dependency_Map::load_from_cache,
                'EE_Event'                                                                      => EE_Dependency_Map::not_registered,
                'EventEspresso\core\domain\entities\admin\GraphQLData\CurrentUser'              =>
                    EE_Dependency_Map::not_registered,
                'EventEspresso\core\domain\services\admin\events\editor\EventEditorGraphQLData' =>
                    EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\admin\GraphQLData\GeneralSettings'          =>
                    EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\JedLocaleData'                              => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\default_settings\AdvancedEditorAdminFormSection',
            ['EE_Admin_Config' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\editor\EventEditorGraphQLData',
            [
                'EventEspresso\core\domain\entities\admin\GraphQLData\Datetimes'                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\admin\GraphQLData\Prices'                    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\admin\GraphQLData\PriceTypes'                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\admin\GraphQLData\Tickets'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\admin\events\editor\NewEventDefaultEntities' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\admin\events\editor\EventEntityRelations'    => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\editor\EventEntityRelations',
            [
                'EEM_Datetime'   => EE_Dependency_Map::load_from_cache,
                'EEM_Event'      => EE_Dependency_Map::load_from_cache,
                'EEM_Price'      => EE_Dependency_Map::load_from_cache,
                'EEM_Price_Type' => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'     => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\editor\NewEventDefaultEntities',
            [
                'EEM_Datetime'                                                       => EE_Dependency_Map::load_from_cache,
                'EEM_Event'                                                          => EE_Dependency_Map::load_from_cache,
                'EEM_Price'                                                          => EE_Dependency_Map::load_from_cache,
                'EEM_Price_Type'                                                     => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'                                                         => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\admin\entities\DefaultDatetimes' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\entities\DefaultDatetimes',
            [
                'EventEspresso\core\domain\services\admin\entities\DefaultTickets' => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'                                                     => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\entities\DefaultTickets',
            [
                'EventEspresso\core\domain\services\admin\entities\DefaultPrices' => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'                                                      => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\entities\DefaultPrices',
            [
                'EEM_Price'      => EE_Dependency_Map::load_from_cache,
                'EEM_Price_Type' => EE_Dependency_Map::load_from_cache,
            ]
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
        return false;
    }
}