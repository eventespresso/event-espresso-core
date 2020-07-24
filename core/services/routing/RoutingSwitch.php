<?php


namespace EventEspresso\core\services\routing;


use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\loaders\LoaderInterface;
use Exception;

/**
 * Class RoutingSwitch
 *
 * @package EventEspresso\core\services\routing
 * @since $VID:$

 */
class RoutingSwitch
{

    /**
     * @var LoaderInterface $loader
     */
    private $loader;

    /**
     * @var RouteHandler $router
     */
    private $router;


    /**
     * RoutingSwitch constructor.
     *
     * @param LoaderInterface $loader
     * @param RouteHandler    $router
     */
    public function __construct(LoaderInterface $loader, RouteHandler $router)
    {
        $this->loader = $loader;
        $this->router = $router;
    }


    /**
     * @throws Exception
     */
    public function handle()
    {
        try {
            // now load and prep all primary Routes
            $this->router->addRoute('EventEspresso\core\domain\entities\routing\handlers\admin\ActivationRequests');
            $this->router->addRoute('EventEspresso\core\domain\entities\routing\handlers\shared\RegularRequests');
            $route_request_type = $this->router->getRouteRequestType();
            switch($route_request_type) {
                case PrimaryRoute::ROUTE_REQUEST_TYPE_ACTIVATION:
                    $this->loadActivationRoutes();
                    break;
                case PrimaryRoute::ROUTE_REQUEST_TYPE_REGULAR:
                    $this->loadRegularRoutes();
                    break;
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     *
     */
    protected function loadActivationRoutes()
    {
        $system = $this;
        add_action(
            'AHEE__EE_System__brew_espresso__complete',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests'
                );
            }
        );
        add_action(
            'AHEE__EE_System__load_controllers__start',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage'
                );
            }
        );
    }


    /**
     *
     */
    protected function loadRegularRoutes()
    {
        $system = $this;
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\ShortcodeRequests'
                );
            }
        );
        add_action(
            'AHEE__EE_System__brew_espresso__complete',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\GQLRequests'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\PueRequests'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\RestApiRequests'
                );
            }
        );
        add_action(
            'AHEE__EE_System__load_controllers__start',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\frontend\FrontendRequests'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\AdminRoute'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoLegacyAdmin'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventsAdmin'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\EspressoEventEditor'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\GutenbergEditor'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\WordPressPluginsPage'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\WordPressHeartbeat'
                );
            }
        );
        add_action(
            'AHEE__EE_System__core_loaded_and_ready',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\AssetRequests'
                );
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\shared\SessionRequests'
                );
            }
        );
        add_action(
            'AHEE__EE_System__initialize_last',
            function() use($system) {
                $system->router->addRoute(
                    'EventEspresso\core\domain\entities\routing\handlers\admin\PersonalDataRequests'
                );
            }
        );
    }

}