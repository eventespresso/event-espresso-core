<?php
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;


defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * EE_Load_Espresso_Core
 * This is the core application loader class at the center of the EE Middleware Request Stack.
 * Although not an instance of EE_Middleware, it DOES implement the EEI_Request_Decorator, allowing it to communicate
 * with the other EE_Middleware classes.
 * Performs all of the basic class loading that used to be in the EE_System constructor.
 *
 * @package        Event Espresso
 * @subpackage     core/
 * @author         Brent Christensen, Michael Nelson
 * ------------------------------------------------------------------------
 */
class EE_Load_Espresso_Core implements EEI_Request_Decorator, EEI_Request_Stack_Core_App
{

    /**
     * @var EE_Request $request
     */
    protected $request;

    /**
     * @var EE_Response $response
     */
    protected $response;

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @var EE_Registry $registry
     */
    protected $registry;



    /**
     * EE_Load_Espresso_Core constructor
     */
	public function __construct() {
        // deprecated functions
        espresso_load_required('EE_Base', EE_CORE . 'EE_Base.core.php');
        espresso_load_required('EE_Deprecated', EE_CORE . 'EE_Deprecated.core.php');
    }



    /**
     * handle
     * sets hooks for running rest of system
     * provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
     * starting EE Addons from any other point may lead to problems
     *
     * @param EE_Request  $request
     * @param EE_Response $response
     * @return EE_Response
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        $this->request = $request;
        $this->response = $response;
        // info about how to load classes required by other classes
        $this->dependency_map = $this->_load_dependency_map();
        // central repository for classes
        $this->registry = $this->_load_registry();
        do_action('EE_Load_Espresso_Core__handle_request__initialize_core_loading');
        $loader = LoaderFactory::getLoader($this->registry);
        $this->dependency_map->setLoader($loader);
        // build DI container
        // $OpenCoffeeShop = new EventEspresso\core\services\container\OpenCoffeeShop();
        // $OpenCoffeeShop->addRecipes();
        // $CoffeeShop = $OpenCoffeeShop->CoffeeShop();
        // workarounds for PHP < 5.3
        $this->_load_class_tools();
        // deprecated functions
        espresso_load_required('EE_Deprecated', EE_CORE . 'EE_Deprecated.core.php');
        // WP cron jobs
        $loader->getShared('EE_Cron_Tasks');
        $loader->getShared('EE_Request_Handler');
        $loader->getShared('EE_System');
        return $this->response;
    }



    /**
     * @return EE_Request
     */
    public function request()
    {
        return $this->request;
    }



    /**
     * @return EE_Response
     */
    public function response()
    {
        return $this->response;
    }



    /**
     * @return EE_Dependency_Map
     * @throws EE_Error
     */
    public function dependency_map()
    {
        if (! $this->dependency_map instanceof EE_Dependency_Map) {
            throw new EE_Error(
                sprintf(
                    __('Invalid EE_Dependency_Map: "%1$s"', 'event_espresso'),
                    print_r($this->dependency_map, true)
                )
            );
        }
        return $this->dependency_map;
    }



    /**
     * @return EE_Registry
     * @throws EE_Error
     */
    public function registry()
    {
        if (! $this->registry instanceof EE_Registry) {
            throw new EE_Error(
                sprintf(
                    __('Invalid EE_Registry: "%1$s"', 'event_espresso'),
                    print_r($this->registry, true)
                )
            );
        }
        return $this->registry;
    }



    /**
     * @return EE_Dependency_Map
     */
    private function _load_dependency_map()
    {
        if (! is_readable(EE_CORE . 'EE_Dependency_Map.core.php')) {
            EE_Error::add_error(
                __('The EE_Dependency_Map core class could not be loaded.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__
            );
            wp_die(EE_Error::get_notices());
        }
        require_once(EE_CORE . 'EE_Dependency_Map.core.php');
        return EE_Dependency_Map::instance($this->request, $this->response);
    }



    /**
     * @return EE_Registry
     */
    private function _load_registry()
    {
        if (! is_readable(EE_CORE . 'EE_Registry.core.php')) {
            EE_Error::add_error(
                __('The EE_Registry core class could not be loaded.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__
            );
            wp_die(EE_Error::get_notices());
        }
        require_once(EE_CORE . 'EE_Registry.core.php');
        return EE_Registry::instance($this->dependency_map);
    }



    /**
     * @return void
     */
    private function _load_class_tools()
    {
        if (! is_readable(EE_HELPERS . 'EEH_Class_Tools.helper.php')) {
            EE_Error::add_error(
                __('The EEH_Class_Tools helper could not be loaded.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__
            );
        }
        require_once(EE_HELPERS . 'EEH_Class_Tools.helper.php');
    }



    /**
     * called after the request stack has been fully processed
     * if any of the middleware apps has requested the plugin be deactivated, then we do that now
     *
     * @param EE_Request  $request
     * @param EE_Response $response
     */
    public function handle_response(EE_Request $request, EE_Response $response)
    {
        if ($response->plugin_deactivated()) {
            espresso_deactivate_plugin(EE_PLUGIN_BASENAME);
        }
    }



}
// End of file EE_Load_Espresso_Core.core.php
// Location: /core/EE_Load_Espresso_Core.core.php
