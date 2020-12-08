<?php

namespace EventEspresso\core\services\routing;

use DomainException;
use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface;
use EventEspresso\core\services\assets\AssetManagerInterface;
use EventEspresso\core\services\assets\BaristaFactory;
use EventEspresso\core\services\assets\BaristaInterface;
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
abstract class Route implements RouteInterface
{

    /**
     * @var AssetManagerInterface $asset_manager
     */
    protected $asset_manager;

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @var JsonDataNode $data_node
     */
    protected $data_node;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var RouteMatchSpecificationInterface $specification
     */
    protected $specification;

    /**
     * @var boolean $handled
     */
    private $handled = false;

    /**
     * @var array $default_dependencies
     */
    protected static $default_dependencies = [
        'EE_Dependency_Map'                           => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\loaders\Loader'  => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\request\Request' => EE_Dependency_Map::load_from_cache,
    ];

    /**
     * @var array $full_dependencies
     */
    protected static $full_dependencies = [
        'EE_Dependency_Map'                                                                          => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\loaders\Loader'                                                 => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\request\Request'                                                => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\services\json\JsonDataNode'                                              => EE_Dependency_Map::load_from_cache,
        'EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecificationInterface' => EE_Dependency_Map::load_from_cache,
    ];


    /**
     * Route constructor.
     *
     * @param EE_Dependency_Map                     $dependency_map
     * @param LoaderInterface                       $loader
     * @param RequestInterface                      $request
     * @param JsonDataNode|null                     $data_node
     * @param RouteMatchSpecificationInterface|null $specification
     */
    public function __construct(
        EE_Dependency_Map $dependency_map,
        LoaderInterface $loader,
        RequestInterface $request,
        JsonDataNode $data_node = null,
        RouteMatchSpecificationInterface $specification = null
    ) {
        $this->dependency_map = $dependency_map;
        $this->data_node      = $data_node;
        $this->loader         = $loader;
        $this->request        = $request;
        $this->specification  = $specification;
    }


    /**
     * @since $VID:$
     */
    abstract protected function registerDependencies();


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    abstract protected function requestHandler();


    /**
     * @return array
     */
    public static function getDefaultDependencies()
    {
        return self::$default_dependencies;
    }


    /**
     * @return array
     */
    public static function getFullDependencies()
    {
        return self::$full_dependencies;
    }


    /**
     * @param JsonDataNode $data_node
     */
    protected function setDataNode($data_node)
    {
        $this->data_node = $data_node;
    }


    /**
     * @param RouteMatchSpecificationInterface $specification
     */
    protected function setSpecification($specification)
    {
        $this->specification = $specification;
    }


    /**
     * @return JsonDataNode
     */
    public function dataNode()
    {
        return $this->data_node;
    }


    /**
     * runs route requestHandler() if
     *      - route has not previously been handled
     *      - route specification matches for current request
     * sets route handled property based on results returned by requestHandler()
     *
     * @return bool
     * @since   $VID:$
     */
    public function handleRequest()
    {
        if ($this->isNotHandled()) {
            $this->initialize();
            if ($this->matchesCurrentRequest()) {
                do_action('AHEE__EventEspresso_core_domain_entities_routes_handlers_Route__handleRequest', $this);
                $this->registerDependencies();
                $handled = $this->requestHandler();
                if (! is_bool($handled)) {
                    throw new DomainException(
                        esc_html__(
                            'Route::requestHandler() must return a boolean to indicate whether the request has been handled or not.',
                            'event_espresso'
                        )
                    );
                }
                $this->handled = filter_var($handled, FILTER_VALIDATE_BOOLEAN);
            }
        }
        return $this->handled;
    }


    /**
     * called just before matchesCurrentRequest()
     * and allows Route to perform any setup required such as calling setSpecification()
     *
     * @since $VID:$
     */
    public function initialize()
    {
        // do nothing by default
    }


    /**
     * @return bool
     */
    final public function isHandled()
    {
        return $this->handled;
    }


    /**
     * @return bool
     */
    final public function isNotHandled()
    {
        return ! $this->handled;
    }


    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        return $this->specification instanceof RouteMatchSpecificationInterface
            ? $this->specification->isMatchingRoute()
            : false;
    }


    /**
     * @param string $domain_fqcn
     * @since   $VID:$
     */
    public function initializeBaristaForDomain($domain_fqcn)
    {
        if (apply_filters('FHEE__load_Barista', true)) {
            /** @var BaristaFactory $factory */
            $factory = $this->loader->getShared(BaristaFactory::class);
            $barista = $factory->createFromDomainClass($domain_fqcn);
            if ($barista instanceof BaristaInterface) {
                $barista->initialize();
            }
        }
    }
}
