<?php

namespace EventEspresso\core\services\request;

use EE_Error;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RequestStackCoreApp
 * This is the core application loader class at the center of the Middleware Request Stack.
 * Although not an instance of Middleware, it DOES implement the RequestDecoratorInterface, allowing it to communicate
 * with the other Middleware classes.
 * Performs all of the basic class loading that used to be in the EE_System constructor.
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RequestStackCoreApp implements RequestDecorator, RequestStackCoreAppInterface
{

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var ResponseInterface $response
     */
    protected $response;




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
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request  = $request;
        $this->response = $response;
        espresso_load_required('EE_Base', EE_CORE . 'EE_Base.core.php');
        espresso_load_required('EE_Deprecated', EE_CORE . 'EE_Deprecated.core.php');
        // workarounds for PHP < 5.3
        espresso_load_required('EEH_Class_Tools', EE_HELPERS . 'EEH_Class_Tools.helper.php');
        do_action('EE_Load_Espresso_Core__handle_request__initialize_core_loading');
        $loader = LoaderFactory::getLoader();
        // WP cron jobs
        $loader->getShared('EE_Cron_Tasks');
        $loader->getShared('EE_System');
        return $this->response;
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
    }

}
// Location: RequestStackCoreApp.php
