<?php

namespace EventEspresso\core\services\addon\api;

use DomainException;
use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;

/**
 * Class AddonApiVersion
 * The minimum data required to bootstrap an EE add-on.
 * Additional data can be provided via specific API versions
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\addon
 * @since   $VID:$
 */
abstract class AddonApiVersion
{
    const V1 = 1;

    /**
     * @var int one of the API_VERSION_* constants from above
     */
    private $api_version;

    /**
     * @var DomainInterface
     */
    private $domain;

    /**
     * @var Version minimum version of EE core that the add-on will work with
     */
    private $min_core_version;

    /**
     * @var Version minimum version of WP core that the add-on will work with
     */
    private $min_wp_version;

    /**
     * @var string  PascalCase identifier for the add-on.
     *              IMPORTANT! there must be a class of the same name in the root of the add-ons /src/domain/ folder
     */
    private $name;

    /**
     * @var string
     */
    private $addon_namespace;

    /**
     * @var FilePath
     */
    private $main_file;

    /**
     * @var string
     */
    private $slug;

    /**
     * @var Version the current add-on version
     */
    private $version;


    /**
     * Bootstrap constructor.
     *
     * @param string $slug
     * @param string $name
     * @param string $namespace
     * @param string $version
     * @param string $min_core_version
     * @param string $main_file
     * @param int    $api_version
     */
    protected function __construct(
        string $slug,
        string $name,
        string $namespace,
        string $version,
        string $min_core_version,
        string $main_file,
        int $api_version
    ) {
        $this->setSlug($slug);
        $this->setName($name);
        $this->setNamespace($namespace);
        $this->setMinCoreVersion($min_core_version);
        $this->setMainFile($main_file);
        $this->setVersion($version);
        $this->setApiVersion($api_version);
    }


    /**
     * @return void
     */
    public function initialize(): void
    {
        $this->domain = DomainFactory::create(
            "{$this->addon_namespace}\\domain\\Domain",
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
    private function setMinCoreVersion(string $min_core_version): void
    {
        $this->min_core_version = Version::fromString($min_core_version);
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
    private function setNamespace(string $namespace): void
    {
        $this->addon_namespace = $namespace;
    }


    /**
     * @param string $slug
     */
    private function setSlug(string $slug): void
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


    /**
     * @return DomainInterface
     */
    public function domain(): DomainInterface
    {
        return $this->domain;
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
     * @param string $min_wp_version
     */
    public function setMinWpVersion(string $min_wp_version = EE_MIN_WP_VER_REQUIRED): void
    {
        $this->min_wp_version = Version::fromString($min_wp_version);
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
        return "{$this->addon_namespace}\\domain\\{$this->name}";
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
}
