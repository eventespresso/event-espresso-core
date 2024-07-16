<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EE_Config;
use EE_Dependency_Map;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\services\shortcodes\ShortcodesManager;

/**
 * Class ShortcodeRequests
 * registers dependencies and loads resources for all requests where shortcodes may be present
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class ShortcodeRequests extends Route
{
    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isFrontend() || $this->request->isIframe() || $this->request->isAjax();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoCancelled',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoCheckout',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoEvents',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoThankYou',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoTicketSelector',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\shortcodes\EspressoTxnPage',
            ['EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        // load, register, and add shortcodes the new way
        /** @var ShortcodesManager $shortcodes_manager */
        $shortcodes_manager = $this->loader->getShared(
            ShortcodesManager::class,
            [
                // and the old way, but we'll put it under control of the new system
                EE_Config::getLegacyShortcodesManager(),
            ]
        );
        $shortcodes_manager->setHooks();
        return true;
    }
}
