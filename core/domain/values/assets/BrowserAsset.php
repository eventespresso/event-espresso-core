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
     * @throws InvalidDataTypeException
     */
    public function __construct($type, $handle, $source, array $dependencies, DomainInterface $domain)
    {
        parent::__construct($type, $handle, $domain);
        $this->setSource($source);
        $this->setDependencies($dependencies);
    }


    /**
     * @since 4.9.62.p
     */
    abstract public function enqueueAsset();


    /**
     * @return array
     */
    public function dependencies()
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
     * @since 4.9.62.p
     * @return bool
     */
    public function hasDependencies()
    {
        return count($this->dependencies) > 0;
    }


    /**
     * @return string
     */
    public function source()
    {
        return $this->source;
    }


    /**
     * @param string $source
     * @throws InvalidDataTypeException
     */
    private function setSource($source)
    {
        if (! is_string($source)) {
            throw new InvalidDataTypeException(
                '$source',
                $source,
                'string'
            );
        }
        $this->source = $source;
    }


    /**
     * @return string
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function version()
    {
        // if version is NOT set and this asset was NOT built for distribution,
        // then set the version equal to the EE core plugin version
        if ($this->version === null && ! $this->isBuiltDistributionSource()) {
            $this->setVersion();
        }
        return $this->version;
    }


    /**
     * @param string $version
     * @return BrowserAsset
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function setVersion($version = '')
    {
        if (! is_string($version)) {
            throw new InvalidDataTypeException(
                '$version',
                $version,
                'string'
            );
        }
        if ( $version === '' ) {
            $version = $this->domain->version();
        }
        $this->version = $version;
        return $this;
    }


    /**
     * @return bool
     */
    public function isBuiltDistributionSource() {
        return substr($this->source, -8) === Asset::FILE_EXTENSION_DISTRIBUTION_JS
               || substr($this->source, -9) === Asset::FILE_EXTENSION_DISTRIBUTION_CSS;
    }
}
