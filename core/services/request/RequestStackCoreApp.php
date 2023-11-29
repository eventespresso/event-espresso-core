<?php

namespace EventEspresso\core\services\request;

use EE_Capabilities;
use EE_Cron_Tasks;
use EE_Error;
use EE_Maintenance_Mode;
use EE_System;
use EventEspresso\core\domain\services\capabilities\CapabilitiesChecker;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\deprecated\DeprecationManager;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;
use InvalidArgumentException;

/**
 * Class RequestStackCoreApp
 * This is the core application loader class at the center of the Middleware Request Stack.
 * Although not an instance of Middleware, it DOES implement the RequestDecoratorInterface, allowing it to communicate
 * with the other Middleware classes.
 * Performs all the basic class loading that used to be in the EE_System constructor.
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RequestStackCoreApp implements RequestDecoratorInterface, RequestStackCoreAppInterface
{
    protected RequestInterface $request;

    protected ResponseInterface $response;


    /**
     * handle
     * sets hooks for running rest of system
     * provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
     * starting EE Addons from any other point may lead to problems
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws InvalidClassException
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $this->request  = $request;
        $this->response = $response;
        espresso_load_required('EE_Base', EE_CORE . 'EE_Base.core.php');
        DeprecationManager::loadDeprecations();
        // workarounds for PHP < 5.3
        espresso_load_required('EEH_Class_Tools', EE_HELPERS . 'EEH_Class_Tools.helper.php');
        do_action(
            'EE_EventEspresso_core_services_request_RequestStackCoreApp__handle_request__initialize_core_loading'
        );
        // legacy action for backwards compatibility
        do_action('EE_Load_Espresso_Core__handle_request__initialize_core_loading');
        $this->setupFramework();
        $capabilities_checker = LoaderFactory::getShared(CapabilitiesChecker::class, [EE_Capabilities::instance()]);
        LoaderFactory::getShared(PersistentAdminNoticeManager::class, [$capabilities_checker, $request]);
        // needed
        LoaderFactory::getShared(EE_Maintenance_Mode::class);
        LoaderFactory::getShared(EE_Cron_Tasks::class);
        LoaderFactory::getShared(EE_System::class);
        return $this->response;
    }


    /**
     * set framework for the rest of EE to hook into when loading
     *
     * @throws EE_Error
     */
    private function setupFramework()
    {
        espresso_load_required('EE_Bootstrap', EE_CORE . 'EE_Bootstrap.core.php');
        add_action('plugins_loaded', ['EE_Bootstrap', 'load_espresso_addons'], 1);
        add_action('plugins_loaded', ['EE_Bootstrap', 'detect_activations_or_upgrades'], 3);
        add_action('plugins_loaded', ['EE_Bootstrap', 'load_core_configuration'], 5);
        add_action('plugins_loaded', ['EE_Bootstrap', 'register_shortcodes_modules_and_widgets'], 7);
        add_action('plugins_loaded', ['EE_Bootstrap', 'brew_espresso'], 9);
    }


    /**
     * called after the request stack has been fully processed
     * if any of the middleware apps has requested the plugin be deactivated, then we do that now
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     */
    public function handleResponse(RequestInterface $request, ResponseInterface $response)
    {
        if ($response->pluginDeactivated()) {
            espresso_deactivate_plugin(EE_PLUGIN_BASENAME);
        }
        $request_headers = $response->requestHeaders();
        if ($request_headers) {
            foreach ($request_headers as $request_header) {
                header($request_header);
            }
            // headers set AND request terminated? then kill the current request
            if ($response->requestTerminated()) {
                exit;
            }
        }
    }
}
