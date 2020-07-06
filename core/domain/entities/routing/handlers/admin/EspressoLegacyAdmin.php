<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
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
     * @var LegacyAccountingAssetManager $asset_manager
     */
    protected $asset_manager;


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
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\assets\LegacyAccountingAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
                'EE_Currency_Config'                                 => EE_Dependency_Map::load_from_cache,
            ]
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
        do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
        $this->loader->getShared('EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager');
        $this->asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\services\assets\LegacyAccountingAssetManager'
        );
        parent::requestHandler();
        add_action('admin_enqueue_scripts', [$this, 'enqueueLegacyAccountingAssets'], 100);
        return true;
    }


    /**
     * enqueue_scripts - Load the scripts and css
     *
     * @return void
     */
    public function enqueueLegacyAccountingAssets()
    {
        $this->asset_manager->enqueueBrowserAssets();
        wp_enqueue_script('ee-accounting');
    }
}
