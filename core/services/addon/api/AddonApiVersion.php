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
        $slug,
        $name,
        $namespace,
        $version,
        $min_core_version,
        $main_file,
        $api_version
    ) {
        $slug = (string) $slug;
        $name = (string) $name;
        $namespace = (string) $namespace;
        $version = (string) $version;
        $min_core_version = (string) $min_core_version;
        $main_file = (string) $main_file;
        $api_version = (int) $api_version;
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
    public function initialize()
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
    private function validApiVersions()
    {
        return [
            AddonApiVersion::V1,
        ];
    }


    /**
     * @param int $api_version
     * @return void
     */
    private function setApiVersion($api_version)
    {
        $api_version = (int) $api_version;
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
     * @return void
     */
    public function setMainFile($main_file)
    {
        $this->main_file = new FilePath($main_file);
    }


    /**
     * @param string $min_core_version
     * @return void
     */
    private function setMinCoreVersion($min_core_version)
    {
        $min_core_version = (string) $min_core_version;
        $this->min_core_version = Version::fromString($min_core_version);
    }


    /**
     * @param string $name
     * @return void
     */
    public function setName($name)
    {
        $this->name = $name;
    }


    /**
     * @param string $namespace
     * @return void
     */
    private function setNamespace($namespace)
    {
        $namespace = (string) $namespace;
        $this->addon_namespace = $namespace;
    }


    /**
     * @param string $slug
     * @return void
     */
    private function setSlug($slug)
    {
        $slug = (string) $slug;
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
     * @return void
     */
    public function setVersion($version)
    {
        $this->version = Version::fromString($version);
    }


    /**
     * @return int
     */
    public function apiVersion()
    {
        return $this->api_version;
    }


    /**
     * @return DomainInterface
     */
    public function domain()
    {
        return $this->domain;
    }


    /**
     * @return Version|null
     */
    public function minCoreVersion()
    {
        return $this->min_core_version;
    }


    /**
     * @return Version|null
     */
    public function minWpVersion()
    {
        return $this->min_wp_version;
    }


    /**
     * @param string $min_wp_version
     * @return void
     */
    public function setMinWpVersion($min_wp_version = EE_MIN_WP_VER_REQUIRED)
    {
        $this->min_wp_version = Version::fromString($min_wp_version);
    }


    /**
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * FQCN for the domain's EE_Addon class
     *
     * @return string
     */
    public function fqcn()
    {
        return "{$this->addon_namespace}\\domain\\{$this->name}";
    }


    /**
     * @return string
     */
    public function getNamespace()
    {
        return $this->addon_namespace;
    }


    /**
     * @return FilePath
     */
    public function mainFile()
    {
        return $this->main_file;
    }


    /**
     * @return string
     */
    public function slug()
    {
        return $this->slug;
    }


    /**
     * @return Version
     */
    public function version()
    {
        return $this->version;
    }
}
