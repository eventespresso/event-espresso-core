<?php

namespace EventEspresso\core\services\routing;

use EE_Dependency_Map;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\modules\LegacyModulesManager;
use EventEspresso\core\services\widgets\LegacyWidgetsManager;
use Exception;
use Throwable;

/**
 * Class Router - a class for initializing "Plinko" routing
 * "WHAT IN TARNATIONS IS PLINKO ROUTING?!"
 * Routing in other applications is typically handled using a 1:1 relationship between a route and a controller,
 * where ALL routes are defined and loaded at the beginning of the request, OR the controller is inferred from a URL
 * parameter, then loaded and executed directly.
 * In WordPress however, due to how actions are used all over the place for loading functionality, we can not simply
 * connect a route to a single endpoint as we run the risk of missing other logic getting loaded at the appropriate
 * hook point. Typically WordPress plugins solve this by just loading up EVERYTHING they could possibly need at the
 * beginning of EVERY request and adding ALL the actions and filters that could possibly ever be required.
 * Event Espresso is too big for that.  We need to be able to load only the functionality that is required for the
 * current request. So Event Espresso Routes work like the classic "Price is Right" game "Plinko" where the request is
 * dropped in at the top of the board and then bounces around until it lands in the correct slot at the bottom.
 * Each point where the request bounces is a Route that can be loaded and used to handle the request up to that
 * point, including loading dependencies, registering actions, and even loading additional routes or route handlers.
 *
 * @package EventEspresso\core\services\routing
 * @since   5.0.0.p
 */
class Router
{
    protected EE_Dependency_Map $dependency_map;

    protected LoaderInterface $loader;

    protected RouteHandler $route_handler;

    protected string $route_request_type;

    protected array $routes_loaded;


    /**
     * RoutingSwitch constructor.
     *
     * @param EE_Dependency_Map $dependency_map
     * @param LoaderInterface   $loader
     * @param RouteHandler      $router
     */
    public function __construct(EE_Dependency_Map $dependency_map, LoaderInterface $loader, RouteHandler $router)
    {
        $this->dependency_map = $dependency_map;
        $this->loader         = $loader;
        $this->route_handler  = $router;
    }


    /**
     * @throws Exception|Throwable
     */
    public function loadPrimaryRoutes()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\admin\ActivationRequests',
            Route::getFullDependencies()
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\handlers\shared\RegularRequests',
            Route::getFullDependencies()
        );
        // now load and prep all primary Routes
        $this->route_handler->addRoute('EventEspresso\core\domain\entities\routing\handlers\admin\ActivationRequests');
        $this->route_handler->addRoute('EventEspresso\core\domain\entities\routing\handlers\shared\RegularRequests');
        $this->route_request_type = $this->route_handler->getRouteRequestType();
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__loadPrimaryRoutes',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     * @throws Exception|Throwable
     */
    public function registerShortcodesModulesAndWidgets()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__registerShortcodesModulesAndWidgets',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );

        /** @var LegacyModulesManager $legacy_modules_manager */
        $legacy_modules_manager = $this->loader->getShared(LegacyModulesManager::class);
        $legacy_modules_manager->setHooks();

        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests'
                );
                /** @var LegacyWidgetsManager $legacy_widgets_manager */
                $legacy_widgets_manager = $this->loader->getShared(LegacyWidgetsManager::class);
                $legacy_widgets_manager->setHooks();
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     * @throws Exception|Throwable
     */
    public function brewEspresso()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__brewEspresso',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     * @throws Exception|Throwable
     */
    public function loadControllers()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__loadControllers',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
        $this->route_handler->addRoute(
            'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute'
        );
        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage'
                );
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\FrontendRequests'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\RegistrationCheckoutRequests'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoLegacyAdmin'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventsAdmin'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventEditor'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\GutenbergEditor'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\NonEspressoAdminAjax'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressProfilePage'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPostsPage'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoBatchJob'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     * @throws Exception|Throwable
     */
    public function coreLoadedAndReady()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__coreLoadedAndReady',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\AssetRequests'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\SessionRequests'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     * @throws Exception|Throwable
     */
    public function initializeLast()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__initializeLast',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\PersonalDataRequests'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }
}
