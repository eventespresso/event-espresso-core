<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\services\assets\CoreAssetManager;
use EventEspresso\core\domain\services\assets\JqueryAssetManager;
use EventEspresso\core\domain\services\assets\ReactAssetManager;
use EventEspresso\core\services\assets\Barista;
use EventEspresso\core\services\assets\BaristaFactory;
use EventEspresso\core\services\assets\BaristaInterface;
use EventEspresso\core\services\routing\Route;

/**
 * Class AssetRequests
 * loads for any type of request where asset managers are required
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AssetRequests extends Route
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
               || $this->request->isFrontend()
               || $this->request->isIframe()
               || $this->request->isWordPressApi();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $default_dependencies = [
            'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_new_object,
            'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
        ];
        $this->dependency_map->registerDependencies(JqueryAssetManager::class, $default_dependencies);
        $this->dependency_map->registerDependencies(ReactAssetManager::class, $default_dependencies);
        $this->dependency_map->registerDependencies(
            CoreAssetManager::class,
            [
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_new_object,
                'EE_Currency_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EE_Template_Config'                                 => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\editor\BlockRegistrationManager',
            [
                'EventEspresso\core\services\assets\BlockAssetManagerCollection'     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\editor\BlockCollection'          => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\routing\RouteMatchSpecificationManager' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_new_object,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\blocks\EventAttendeesBlockRenderer',
            [
                'EventEspresso\core\domain\Domain' => EE_Dependency_Map::load_from_cache,
                'EEM_Attendee'                     => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\editor\blocks\EventAttendees',
            [
                'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'                           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\blocks\EventAttendeesBlockRenderer' => EE_Dependency_Map::load_from_cache,
            ]
        );
        if (apply_filters('FHEE__load_Barista', true)) {
            $this->dependency_map->registerDependencies(
                'EventEspresso\core\services\assets\Barista',
                ['EventEspresso\core\services\assets\AssetManifest' => EE_Dependency_Map::load_from_cache]
            );
        }
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        if (apply_filters('FHEE__load_Barista', true)) {
            $barista = BaristaFactory::create();
            if ($barista instanceof BaristaInterface) {
                $barista->initialize();
                $this->loader->getShared('EventEspresso\core\services\assets\Registry');
            }
        }
        $this->loader->getShared(JqueryAssetManager::class);
        $this->loader->getShared(CoreAssetManager::class);
        if ($this->canLoadBlocks()) {
            $this->loader->getShared(
                'EventEspresso\core\services\editor\BlockRegistrationManager'
            );
        }
        return true;
    }


    /**
     * Return whether blocks can be registered/loaded or not.
     *
     * @return bool
     * @since $VID:$
     */
    private function canLoadBlocks()
    {
        return apply_filters('FHEE__EE_System__canLoadBlocks', true)
               && function_exists('register_block_type')
               // don't load blocks if in the Divi page builder editor context
               // @see https://github.com/eventespresso/event-espresso-core/issues/814
               && ! $this->request->getRequestParam('et_fb', false);
    }
}
