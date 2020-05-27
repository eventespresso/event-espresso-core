<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\Route;

/**
 * Class Shortcodes
 * registers dependencies and loads resources for requests where EE_Session may be required
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class SessionRequests extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->request->isAdmin() || $this->request->isEeAjax() || $this->request->isFrontend();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EE_Session',
            [
                'EventEspresso\core\services\cache\TransientCacheStorage'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\request\Request'              => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\session\SessionStartHandler'  => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                            => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\session\SessionStartHandler',
            ['EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache]
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
        $this->loader->getShared('EE_Session');
        return true;
    }
}
