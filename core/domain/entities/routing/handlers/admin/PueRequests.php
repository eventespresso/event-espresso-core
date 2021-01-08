<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\services\routing\Route;

/**
 * Class PueRequests
 * loads resources for PUE
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class PueRequests extends Route
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest(): bool
    {
        return ($this->request->isAdmin() || $this->request->isAdminAjax())
               && apply_filters('FHEE__EE_System__brew_espresso__load_pue', true);
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\licensing\LicenseService',
            [
                'EventEspresso\core\domain\services\pue\Stats'  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\pue\Config' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\pue\Stats',
            [
                'EventEspresso\core\domain\services\pue\Config'        => EE_Dependency_Map::load_from_cache,
                'EE_Maintenance_Mode'                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\pue\StatsGatherer' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\pue\Config',
            [
                'EE_Network_Config' => EE_Dependency_Map::load_from_cache,
                'EE_Config'         => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\pue\StatsGatherer',
            [
                'EEM_Payment_Method' => EE_Dependency_Map::load_from_cache,
                'EEM_Event'          => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'       => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'         => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'   => EE_Dependency_Map::load_from_cache,
                'EEM_Transaction'    => EE_Dependency_Map::load_from_cache,
                'EE_Config'          => EE_Dependency_Map::load_from_cache,
            ]
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
        // pew pew pew
        $this->loader->getShared('EventEspresso\core\services\licensing\LicenseService');
        do_action('AHEE__EE_System__brew_espresso__after_pue_init');
        return true;
    }
}
