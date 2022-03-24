<?php

namespace EventEspresso\core\services\routing;

use EE_Dependency_Map;
use EventEspresso\core\services\loaders\LoaderInterface;
use Exception;

/**
 * Class RoutingSwitch
 *
 * @package EventEspresso\core\services\routing
 * @since   $VID:$
 */
class Router
{
    /**
     * @var EE_Dependency_Map
     */
    protected $dependency_map;

    /**
     * @var LoaderInterface
     */
    protected $loader;

    /**
     * @var RouteHandler
     */
    protected $route_handler;

    /**
     * @var string
     */
    protected $route_request_type;

    /**
     * @var array
     */
    protected $routes_loaded;


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
     * @throws Exception
     */
    public function loadPrimaryRoutes()
    {
        if (isset($this->routes_loaded[ __FUNCTION__ ])) {
            return;
        }
        do_action(
            'AHEE__EventEspresso_core_services_routing_Router__loadPrimaryRoutes',
            $this->route_handler,
            $this->route_request_type,
            $this->dependency_map
        );
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
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     *
     * @throws Exception
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
        switch ($this->route_request_type) {
            case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                break;
            case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     *
     * @throws Exception
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
        $this->route_handler->addRoute(
            'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests'
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
     *
     * @throws Exception
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
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage'
                );
                $this->route_handler->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat'
                );
                break;
        }
        $this->routes_loaded[ __FUNCTION__ ] = true;
    }


    /**
     *
     * @throws Exception
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
     *
     * @throws Exception
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
