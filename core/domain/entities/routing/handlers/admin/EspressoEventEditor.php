<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor;
use EventEspresso\core\services\graphql\GraphQLManager;

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
        global $pagenow;
        return parent::matchesCurrentRequest()
               && $pagenow
               && $pagenow === 'admin.php'
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
        /** @var EventEditor $data_node */
        $data_node = $this->loader->getShared('EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor');
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
        parent::requestHandler();
        /** @var GraphQLManager $graphQL_manager */
        $graphQL_manager = $this->loader->getShared('EventEspresso\core\services\graphql\GraphQLManager');
        $graphQL_manager->init();
        $this->asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\EspressoCoreAppAssetManager'
        );
        add_action('admin_enqueue_scripts', [$this->asset_manager, 'enqueueBrowserAssets'], 100);
        return true;
    }
}
