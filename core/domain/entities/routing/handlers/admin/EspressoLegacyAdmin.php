<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\domain\services\assets\JqueryAssetManager;
use EventEspresso\core\domain\services\assets\LegacyAccountingAssetManager;
use EventEspresso\core\services\assets\AssetManagerInterface;
use EventEspresso\core\services\service_changes\ServiceChangesManager;

/**
 * Class EspressoLegacyAdmin
 * detects and executes logic that is common for all Event Espresso admin routes
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EspressoLegacyAdmin extends AdminRoute
{
    /**
     * @var LegacyAccountingAssetManager|null $asset_manager
     */
    protected ?AssetManagerInterface $asset_manager = null;


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
               && (
                   $page === 'pricing'
                   || strpos($page, 'espresso') !== false
                   || apply_filters(
                       'FHEE__EspressoLegacyAdmin__matchesCurrentRequest__page',
                       false,
                       $page
                   )
               )
               && parent::matchesCurrentRequest();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $asset_manger_dependencies = [
            'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
            'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_new_object,
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
                'EE_Registry'                                                  => EE_Dependency_Map::load_from_cache,
                'EE_Organization_Config'                                       => EE_Dependency_Map::load_from_cache,
                'EE_Core_Config'                                               => EE_Dependency_Map::load_from_cache,
                'EE_Network_Core_Config'                                       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\address\CountrySubRegionDao'      => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\services\capabilities\FeatureFlags' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\address\CountrySubRegionDao',
            [
                'EEM_State'                                            => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\validators\JsonValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
                'EEM_Registration'                            => EE_Dependency_Map::load_from_cache,
                null,
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
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\admin\AdminListTableFilters',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            ServiceChangesManager::class,
            [
                'EE_Dependency_Map'                                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\loaders\LoaderInterface' => EE_Dependency_Map::load_from_cache,
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
        add_filter(
            'admin_body_class',
            function ($classes) {
                if (strpos($classes, 'espresso-admin') === false) {
                    $classes .= ' espresso-admin';
                }
                return $classes;
            }
        );
        $this->loader->getShared(JqueryAssetManager::class);
        $this->loader->getShared(EspressoLegacyAdminAssetManager::class);
        $this->loader->getShared(LegacyAccountingAssetManager::class);
        $this->loader->getShared(ServiceChangesManager::class);
        return true;
    }
}
