<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EE_Dependency_Map;
use EE_Maintenance_Mode;
use EventEspresso\core\services\routing\Route;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class Route
 * - class for detecting and matching with incoming requests
 * (this can be done by directly examining the incoming Request
 * or via a Route Match Specification class for better SRP and sharing)
 * - registers dependencies for any classes that are required from that point forwards in the request
 * - loads additional classes for handling the request
 *
 * @package EventEspresso\core\services\routing
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class PublicRoute extends Route
{
    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    protected $maintenance_mode;


    /**
     * FrontendRequests constructor.
     *
     * @param EE_Maintenance_Mode $maintenance_mode
     * @param EE_Dependency_Map   $dependency_map
     * @param LoaderInterface     $loader
     * @param RequestInterface    $request
     * @param JsonDataNode        $data_node
     * @param RouteMatchSpecificationInterface $specification
     */
    public function __construct(
        EE_Maintenance_Mode $maintenance_mode,
        EE_Dependency_Map $dependency_map,
        LoaderInterface $loader,
        RequestInterface $request,
        JsonDataNode $data_node = null,
        RouteMatchSpecificationInterface $specification = null
    ) {
        $this->maintenance_mode = $maintenance_mode;
        parent::__construct($dependency_map, $loader, $request, $data_node, $specification);
    }
}
