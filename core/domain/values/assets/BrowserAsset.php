<?php

namespace EventEspresso\core\domain\values\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class BrowserAsset
 * An asset that gets sent to the browser such as a Javascript or CSS
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
abstract class BrowserAsset extends Asset
{

    /**
     * @var string $source
     */
    private $source;

    /**
     * @var array $dependencies
     */
    private $dependencies;

    /**
     * @var string $version
     */
    private $version;


    /**
     * Asset constructor.
     *
     * @param string          $type
     * @param string          $handle
     * @param string          $source
     * @param array           $dependencies
     * @param DomainInterface $domain
     * @param string          $version
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $type,
        $handle,
        $source,
        array $dependencies,
        DomainInterface $domain,
        string $version =
        ''
    ) {
        parent::__construct($type, $handle, $domain);
        $this->setSource($source);
        $this->setDependencies($dependencies);
        $this->setVersion($version, false);
    }


    /**
     * @since 4.9.62.p
     */
    abstract public function enqueueAsset();


    /**
     * @return array
     */
    public function dependencies(): array
    {
        return $this->dependencies;
    }


    /**
     * @param array $dependencies
     */
    private function setDependencies(array $dependencies)
    {
        $this->dependencies = $dependencies;
    }


    /**
     * @return bool
     * @since 4.9.62.p
     */
    public function hasDependencies(): bool
    {
        return count($this->dependencies) > 0;
    }


    /**
     * @return string
     */
    public function source(): string
    {
        return $this->source;
    }


    /**
     * @param string $source
     */
    private function setSource(string $source)
    {
        $this->source = $source;
    }


    /**
     * @return string
     */
    public function version(): string
    {
        return $this->version;
    }


    /**
     * @param string $version
     * @param bool   $fluent
     * @return BrowserAsset|null
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function setVersion(string $version, bool $fluent = true): ?BrowserAsset
    {
        // if version is NOT set and this asset was NOT built for distribution,
        // then set the version equal to the EE core plugin version
        if (empty($version) && ! $this->isBuiltDistributionSource()) {
            $version = $this->domain->version();
        }
        if (! is_string($version)) {
            throw new InvalidDataTypeException(
                '$version',
                $version,
                'string'
            );
        }
        $this->version = $version;
        if ($fluent) {
            return $this;
        }
        return null;
    }


    /**
     * @return bool
     */
    public function isBuiltDistributionSource(): bool
    {
        return substr($this->source, -8) === Asset::FILE_EXTENSION_DISTRIBUTION_JS
               || substr($this->source, -9) === Asset::FILE_EXTENSION_DISTRIBUTION_CSS;
    }
}
