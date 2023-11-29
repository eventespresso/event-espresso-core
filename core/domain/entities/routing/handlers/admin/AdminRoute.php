<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Admin_Config;
use EE_Dependency_Map;
use EventEspresso\core\domain\services\admin\AdminFontSize;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class AdminRoute
 * - class for detecting and matching with incoming admin requests
 * (this can be done by directly examining the incoming Request
 * or via a Route Match Specification class for better SRP and sharing)
 * - registers dependencies for any classes that are required from that point forwards in the request
 * - loads additional classes for handling the request
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class AdminRoute extends Route
{
    protected EE_Admin_Config $admin_config;

    /**
     * @var array $default_dependencies
     */
    protected static $default_dependencies = [
        'EE_Admin_Config'                             => EE_Dependency_Map::load_from_cache,
        'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
    ];


    /**
     * Route constructor.
     *
     * @param EE_Admin_Config                       $admin_config
     * @param EE_Dependency_Map                     $dependency_map
     * @param LoaderInterface                       $loader
     * @param RequestInterface                      $request
     * @param JsonDataNode|null                     $data_node
     * @param RouteMatchSpecificationInterface|null $specification
     */
    public function __construct(
        EE_Admin_Config $admin_config,
        EE_Dependency_Map $dependency_map,
        LoaderInterface $loader,
        RequestInterface $request,
        JsonDataNode $data_node = null,
        RouteMatchSpecificationInterface $specification = null
    ) {
        $this->admin_config = $admin_config;
        parent::__construct($dependency_map, $loader, $request, $data_node, $specification);
    }


    /**
     * @return CapCheckInterface
     */
    public function getCapCheck()
    {
        return new CapCheck('ee_read_events', 'access Event Espresso admin route');
    }


    /**
     * @return array
     */
    public static function getDefaultDependencies(): array
    {
        return self::$default_dependencies;
    }


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isAdmin() || $this->request->isAdminAjax() || $this->request->isActivation();
    }


    /**
     * @return void
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\services\admin\AdminListTableFilters',
            [
                'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
            ]
        );
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     */
    protected function requestHandler(): bool
    {
        // don't handle request more than once!!!
        if (did_action('AHEE__EE_System__load_controllers__load_admin_controllers')) {
            return true;
        }
        do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
        $this->loader->getShared('EE_Admin');
        do_action(
            'AHEE__EventEspresso_core_domain_entities_routing_handlers_admin_AdminRoute__requestHandler__admin_loaded'
        );

        AdminFontSize::setAdminFontSizeBodyClass();
        return true;
    }
}
