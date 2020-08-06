<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\assets\EspressoCoreAppAssetManager;
use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\domain\services\assets\JqueryAssetManager;
use EventEspresso\core\domain\services\assets\LegacyAccountingAssetManager;

/**
 * Class EspressoLegacyAdmin
 * detects and executes logic that is common for all Event Espresso admin routes
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoLegacyAdmin extends AdminRoute
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
        return $this->request->isAdminAjax() || (
            parent::matchesCurrentRequest() && $pagenow && $pagenow === 'admin.php'
        );
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $asset_manger_dependencies = [
            'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
        ];
        $this->dependency_map->registerDependencies(JqueryAssetManager::class, $asset_manger_dependencies);
        $this->dependency_map->registerDependencies(EspressoLegacyAdminAssetManager::class, $asset_manger_dependencies);
        $this->dependency_map->registerDependencies(
            LegacyAccountingAssetManager::class,
            ['EE_Currency_Config' => EE_Dependency_Map::load_from_cache] + $asset_manger_dependencies
        );
        $this->dependency_map->registerDependencies(
            'EE_Admin_Transactions_List_Table',
            [
                null,
                'EventEspresso\core\domain\values\session\SessionLifespan' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaAdminSettings',
            ['EE_Registration_Config' => EE_Dependency_Map::load_from_cache]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\admin_pages\general_settings\OrganizationSettings',
            [
                'EE_Registry'                                             => EE_Dependency_Map::load_from_cache,
                'EE_Organization_Config'                                  => EE_Dependency_Map::load_from_cache,
                'EE_Core_Config'                                          => EE_Dependency_Map::load_from_cache,
                'EE_Network_Core_Config'                                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\address\CountrySubRegionDao' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\address\CountrySubRegionDao',
            [
                'EEM_State'                                            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\validators\JsonValidator' => EE_Dependency_Map::load_from_cache
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder',
            [
                null,
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'                            => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\AttendeeFilterHeader',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Attendee'                                => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\DateFilterHeader',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Datetime'                                => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\EventFilterHeader',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Event'                                   => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\TicketFilterHeader',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Ticket'                                  => EE_Dependency_Map::load_from_cache,
            ]
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
        $this->loader->getShared(JqueryAssetManager::class);
        $this->loader->getShared(EspressoLegacyAdminAssetManager::class);
        $this->loader->getShared(LegacyAccountingAssetManager::class);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets']);
        return true;
    }


    /**
     * enqueue_scripts - Load the scripts and css
     *
     * @return void
     */
    public function enqueueAssets()
    {
        wp_enqueue_script(EspressoCoreAppAssetManager::JS_HANDLE_BARISTA);
    }
}
