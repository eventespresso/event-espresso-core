<?php

namespace EventEspresso\core\domain\entities\routing\handlers\shared;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute;
use EventEspresso\core\domain\entities\routing\handlers\admin\EspressoBatchJob;
use EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventEditor;
use EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventsAdmin;
use EventEspresso\core\domain\entities\routing\handlers\admin\EspressoLegacyAdmin;
use EventEspresso\core\domain\entities\routing\handlers\admin\GutenbergEditor;
use EventEspresso\core\domain\entities\routing\handlers\admin\NonEspressoAdminAjax;
use EventEspresso\core\domain\entities\routing\handlers\admin\PersonalDataRequests;
use EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage;
use EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPostsPage;
use EventEspresso\core\domain\entities\routing\handlers\admin\WordPressProfilePage;
use EventEspresso\core\domain\entities\routing\handlers\frontend\FrontendRequests;
use EventEspresso\core\domain\entities\routing\handlers\frontend\RegistrationCheckoutRequests;
use EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests;
use EventEspresso\core\services\assets\AssetManifestFactory;
use EventEspresso\core\services\assets\BaristaFactory;
use EventEspresso\core\services\routing\PrimaryRoute;
use EventEspresso\core\services\routing\Route;

/**
 * Class RoutingRequests
 * registers dependencies for all other Routes as long as this is not an activation request
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\shared
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class RegularRequests extends PrimaryRoute
{
    /**
     * called just before matchesCurrentRequest()
     * and allows Route to perform any setup required such as calling setSpecification()
     *
     * @since 5.0.0.p
     */
    public function initialize()
    {
        $basic_nodes = [
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Api',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Capabilities',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Locale',
            'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteUrls',
        ];
        foreach ($basic_nodes as $basic_node) {
            $this->dependency_map->registerDependencies(
                $basic_node,
                ['EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache]
            );
        }
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\SitePermissions',
            [
                'EventEspresso\core\domain\services\capabilities\FeatureFlags' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'       => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\GeneralSettings',
            [
                'EventEspresso\core\services\json\JsonDataNodeValidator'                => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\converters\date_time_formats\PhpToUnicode' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData',
            [
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Api'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Config' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\JedLocaleData'                  => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'            => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\Config',
            [
                'EventEspresso\core\domain\entities\routing\data_nodes\core\CurrentUser'        => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\EspressoCoreDomain' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\GeneralSettings'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Locale'             => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteCurrency'       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\SitePermissions'    => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteUrls'           => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'                        => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\CurrentUser',
            [
                'EventEspresso\core\domain\entities\routing\data_nodes\core\Capabilities' => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator'                  => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\EspressoCoreDomain',
            [
                'EventEspresso\core\domain\Domain'                       => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\core\SiteCurrency',
            [
                'EE_Currency_Config'                                     => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->setDataNode(
            $this->loader->getShared('EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData')
        );
    }


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return ! $this->request->isActivation() || $this->request->isUnitTesting();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $public = ['EE_Maintenance_Mode' => EE_Dependency_Map::load_from_cache] + Route::getDefaultDependencies();

        $default_with_barista  = [BaristaFactory::class => EE_Dependency_Map::load_from_cache] +
                                 Route::getDefaultDependencies();
        $default_with_manifest = [AssetManifestFactory::class => EE_Dependency_Map::load_from_cache] +
                                 Route::getDefaultDependencies();

        $default_routes = [
            // default dependencies
            ShortcodeRequests::class            => Route::getDefaultDependencies(),
            RestApiRequests::class              => Route::getDefaultDependencies(),
            SessionRequests::class              => Route::getDefaultDependencies(),
            WordPressHeartbeat::class           => Route::getDefaultDependencies(),
            AssetRequests::class                => $default_with_barista,
            GQLRequests::class                  => $default_with_manifest,
            // admin dependencies
            AdminRoute::class           => AdminRoute::getDefaultDependencies(),
            EspressoBatchJob::class     => AdminRoute::getDefaultDependencies(),
            EspressoEventsAdmin::class  => AdminRoute::getDefaultDependencies(),
            EspressoEventEditor::class  => AdminRoute::getDefaultDependencies(),
            EspressoLegacyAdmin::class  => AdminRoute::getDefaultDependencies(),
            GutenbergEditor::class      => AdminRoute::getDefaultDependencies(),
            NonEspressoAdminAjax::class => AdminRoute::getDefaultDependencies(),
            WordPressPluginsPage::class => AdminRoute::getDefaultDependencies(),
            WordPressPostsPage::class   => AdminRoute::getDefaultDependencies(),
            WordPressProfilePage::class => AdminRoute::getDefaultDependencies(),
            // public dependencies
            PersonalDataRequests::class         => $public,
            FrontendRequests::class             => $public,
            RegistrationCheckoutRequests::class => $public,
        ];
        foreach ($default_routes as $route => $dependencies) {
            $this->dependency_map->registerDependencies($route, $dependencies);
        }
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        $this->setRouteRequestType(PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR);
        return true;
    }
}
