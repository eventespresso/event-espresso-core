<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\Route;

/**
 * Class RoutingRequests
 * registers dependencies for all other Routes as long as this is not an activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   \$VID:$
 */
class RoutingRequests extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return ! $this->request->isActivation();
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $default = [
            'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
        ];
        $admin = [
            'EE_Admin_Config'                             => EE_Dependency_Map::load_from_cache,
            'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
            'EE_Maintenance_Mode'                         => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
        ];
        $frontend = [
            'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
            'EE_Maintenance_Mode'                         => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
        ];
        $default_routes = [
            // admin dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventsAdmin' => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventEditor' => $admin,
            'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoLegacyAdmin' => $admin,
            // default dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\AssetRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\SessionRequests' => $default,
            'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat' => $default,
            // frontend dependencies
            'EventEspresso\core\domain\entities\routing\handlers\admin\PersonalDataRequests' => $frontend,
            'EventEspresso\core\domain\entities\routing\handlers\frontend\FrontendRequests' => $frontend,
        ];
        foreach ($default_routes as $route => $dependencies) {
            $this->dependency_map->registerDependencies($route, $dependencies);
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
        return true;
    }
}
