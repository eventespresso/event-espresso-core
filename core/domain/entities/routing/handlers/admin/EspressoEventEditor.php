<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Admin_Config;
use EE_Dependency_Map;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor;
use EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\domain\services\assets\EventEditorAssetManager;
use EventEspresso\core\services\graphql\GraphQLManager;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EspressoEventEditor
 * detects and executes logic for the Event Espresso Event Editor
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEventEditor extends EspressoEventsAdmin
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return parent::matchesCurrentRequest()
               && $this->admin_config->useAdvancedEditor()
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
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor',
            [
                'EventEspresso\core\domain\services\admin\events\editor\EventEditorGraphQLData' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\assets\EventEditorAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        /** @var EventEspressoData $primary_data_node */
        $primary_data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData'
        );
        $primary_data_node->setTargetScript(EventEditorAssetManager::JS_HANDLE_EVENT_EDITOR);
        /** @var EventEditor $data_node */
        $data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor'
        );
        $this->setDataNode($data_node);
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        /** @var GraphQLManager $graphQL_manager */
        $graphQL_manager = $this->loader->getShared('EventEspresso\core\services\graphql\GraphQLManager');
        $graphQL_manager->init();

        /** @var EventEditorAssetManager $asset_manager */
        $asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\EventEditorAssetManager'
        );
        add_action('admin_enqueue_scripts', [$asset_manager, 'enqueueEventEditor'], 100);
        return true;
    }
}
