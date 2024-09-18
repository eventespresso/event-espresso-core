<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\domain\services\assets\JqueryAssetManager;
use EventEspresso\core\domain\services\assets\LegacyAccountingAssetManager;

/**
 * Class EspressoBatchJob
 * detects and executes logic needed for the batch job requests
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EspressoBatchJob extends AdminRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        global $pagenow;
        $page = $this->request->getRequestParam('page');
        return ($pagenow === 'admin.php' || $pagenow === 'admin-ajax.php')
               && $page === 'espresso_batch'
               && parent::matchesCurrentRequest();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'                            => EE_Dependency_Map::load_from_cache,
                null,
            ]
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
        return true;
    }
}
