<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EE_Config;
use EE_Dependency_Map;
use EventEspresso\core\services\routing\Route;

/**
 * Class ShortcodeRequests
 * registers dependencies and loads resources for all requests where shortcodes may be present
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ShortcodeRequests extends Route
{

    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->request->isFrontend() || $this->request->isIframe() || $this->request->isAjax();
    }


    /**
     * @since $VID:$
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
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        // load, register, and add shortcodes the new way
        $this->loader->getShared(
            'EventEspresso\core\services\shortcodes\ShortcodesManager',
            [
                // and the old way, but we'll put it under control of the new system
                EE_Config::getLegacyShortcodesManager(),
            ]
        );
        return true;
    }
}
