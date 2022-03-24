<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Admin_Config;
use EE_Dependency_Map;
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
 * @since   $VID:$
 */
class AdminRoute extends Route
{
    /**
     * @var EE_Admin_Config $admin_config
     */
    protected $admin_config;


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
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     */
    protected function requestHandler(): bool
    {
        do_action('AHEE__EE_System__load_controllers__load_admin_controllers');
        $this->loader->getShared('EE_Admin');
        return true;
    }
}
