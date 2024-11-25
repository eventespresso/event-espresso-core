<?php

namespace EventEspresso\core\services\addon\api;

use DomainException;
use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\Psr4Autoloader;
use EventEspresso\core\services\loaders\LoaderFactory;
use Exception;
use Throwable;

/**
 * Class AddonApiVersion
 * The minimum data required to bootstrap an EE add-on.
 * Additional data can be provided via specific API versions
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\addon
 * @since   5.0.0.p
 */
abstract class AddonApiVersion
{
    const V1 = 1;

    /**
     * @var int one of the V# API version constants from above
     */
    private int $api_version;

    private DomainInterface $domain;

    /**
     * @var Version|null minimum version of EE core that the add-on will work with
     */
    private ?Version $min_core_version = null;

    /**
     * @var Version|null minimum version of WP core that the add-on will work with
     */
    private ?Version $min_wp_version = null;

    private int $id;

    /**
     * @var string  PascalCase identifier for the add-on.
     *              IMPORTANT! there must be a class of the same name in the root of the add-ons /src/domain/ folder
     */
    private string $name;

    private string $display_name;

    private string $addon_namespace;

    private FilePath $main_file;

    private string $slug;

    /**
     * @var Version the current add-on version
     */
    private Version $version;

    private AddonRoutes $addon_routes;

    private DependencyHandlers $dependency_handlers;

    private Psr4Autoloader $psr4_loader;

    private bool $dependencies_registered = false;


    /**
     * Bootstrap constructor.
     *
     * @param AddonRoutes $addon_routes
     * @param DependencyHandlers $dependency_handlers
     * @param Psr4Autoloader $psr4_loader
     * @param int            $api_version
     */
    protected function __construct(AddonRoutes $addon_routes, DependencyHandlers $dependency_handlers, Psr4Autoloader $psr4_loader, int $api_version) {
        $this->addon_routes = LoaderFactory::getShared(AddonRoutes::class);
        $this->dependency_handlers = LoaderFactory::getShared(DependencyHandlers::class);
        $this->psr4_loader = LoaderFactory::getShared(Psr4Autoloader::class);
        $this->setApiVersion($api_version);
    }


    /**
     * @return void
     */
    public function initialize(): void
    {
        $this->domain = DomainFactory::create(
            "$this->addon_namespace\\domain\\Domain",
            $this->main_file,
            $this->version
        );
    }


    /**
     * @return int[]
     */
    private function validApiVersions(): array
    {
        return [
            AddonApiVersion::V1,
        ];
    }


    /**
     * @param int $api_version
     */
    private function setApiVersion(int $api_version): void
    {
        if (! in_array($api_version, $this->validApiVersions())) {
            throw new DomainException(
                esc_html__(
                    'Invalid Add-on API Version! Please use one of the EventEspresso\core\domain\entities\addon\Bootstrap class constants',
                    'event_espresso'
                )
            );
        }
        $this->api_version = $api_version;
    }


    public function setDisplayName(string $display_name): void
    {
        $this->display_name = $display_name;
    }


    public function setID(int $id = 0): void
    {
        $this->id = $id;
    }



    /**
     * @param string $main_file
     */
    public function setMainFile(string $main_file): void
    {
        $this->main_file = new FilePath($main_file);
    }


    /**
     * @param string $min_core_version
     */
    public function setMinCoreVersion(string $min_core_version): void
    {
        $this->min_core_version = Version::fromString($min_core_version);
    }


    /**
     * @param string $min_wp_version
     */
    public function setMinWpVersion(string $min_wp_version = EE_MIN_WP_VER_REQUIRED): void
    {
        $this->min_wp_version = Version::fromString($min_wp_version);
    }


    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }


    /**
     * @param string $namespace
     */
    public function setNamespace(string $namespace): void
    {
        $this->addon_namespace = $namespace;
        // register addon namespace immediately so that FQCNs resolve correctly
        $this->psr4_loader->addNamespace($namespace, dirname($this->main_file) . '/src/');
    }


    /**
     * @param string $slug
     */
    public function setSlug(string $slug): void
    {
        $valid_slug = sanitize_key($slug);
        if ($slug !== $valid_slug) {
            throw new DomainException(
                esc_html__(
                    'Invalid Add-on "slug"! Please ensure that slug only uses lowercase characters and dashes.',
                    'event_espresso'
                )
            );
        }
        $this->slug = $valid_slug;
    }


    /**
     * @param string $version
     */
    public function setVersion(string $version): void
    {
        $this->version = Version::fromString($version);
    }


    /**
     * @return int
     */
    public function apiVersion(): int
    {
        return $this->api_version;
    }


    public function displayName(): string
    {
        return $this->display_name;
    }


    /**
     * @return DomainInterface
     */
    public function domain(): DomainInterface
    {
        return $this->domain;
    }


    public function ID(): int
    {
        return $this->id;
    }



    /**
     * @return Version|null
     */
    public function minCoreVersion(): ?Version
    {
        return $this->min_core_version;
    }


    /**
     * @return Version|null
     */
    public function minWpVersion(): ?Version
    {
        return $this->min_wp_version;
    }


    /**
     * @return string
     */
    public function name(): string
    {
        return $this->name;
    }


    /**
     * FQCN for the domain's EE_Addon class
     *
     * @return string
     */
    public function fqcn(): string
    {
        return "$this->addon_namespace\\domain\\$this->name";
    }


    /**
     * @return string
     */
    public function getNamespace(): string
    {
        return $this->addon_namespace;
    }


    /**
     * @return FilePath
     */
    public function mainFile(): FilePath
    {
        return $this->main_file;
    }


    /**
     * @return string
     */
    public function slug(): string
    {
        return $this->slug;
    }


    /**
     * @return Version
     */
    public function version(): Version
    {
        return $this->version;
    }


    /**
     * @throws Exception
     */
    public function addRoute(string $route_fqcn, string $hook_name = 'AHEE__EE_System__core_loaded_and_ready'): void
    {
        $this->addon_routes->addRouteFor($route_fqcn, $this->slug());
        add_action($hook_name, [$this, 'loadRoutes']);
    }


    /**
     * @throws Exception|Throwable
     */
    public function loadRoutes()
    {
        $this->addon_routes->loadRoutesFor($this->slug());
    }


    /**
     * @param string $dependency_handler_fqcn FQCN of a DependencyHandler class
     * @return void
     * @since 5.0.30.p
     */
    public function addDependencyHandler(string $dependency_handler_fqcn): void
    {
        $this->dependency_handlers->addDependencyHandlerFor($dependency_handler_fqcn, $this->slug());
        if (! $this->dependencies_registered) {
            add_action('AHEE__EE_System__load_espresso_addons__complete', [$this, 'registerDependencies'], 999);
            $this->dependencies_registered = true;
        }
    }


    /**
     * @return void
     * @since 5.0.30.p
     */
    public function registerDependencies()
    {
        $this->dependency_handlers->registerDependenciesFor($this->slug());
    }
}
