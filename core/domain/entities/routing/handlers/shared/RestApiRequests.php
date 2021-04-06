<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EED_Core_Rest_Api;
use EventEspresso\core\services\routing\Route;

/**
 * Class RestApiRequests
 * registers dependencies and loads resources for REST API requests
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RestApiRequests extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isAdmin() || $this->request->isApi() || $this->request->isWordPressApi();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\libraries\rest_api\calculations\Datetime',
            [
                'EEM_Datetime'     => EE_Dependency_Map::load_from_cache,
                'EEM_Registration' => EE_Dependency_Map::load_from_cache
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\libraries\rest_api\calculations\Event',
            [
                'EEM_Event'        => EE_Dependency_Map::load_from_cache,
                'EEM_Registration' => EE_Dependency_Map::load_from_cache
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\libraries\rest_api\calculations\Registration',
            ['EEM_Registration' => EE_Dependency_Map::load_from_cache]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler(): bool
    {
        EED_Core_Rest_Api::set_hooks_both();
        return true;
    }
}
