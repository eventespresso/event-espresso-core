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
     * @var array $attributes
     */
    private $attributes = [];

    /**
     * @var array $allowed_attributes
     */
    private static $allowed_attributes = [
        Asset::TYPE_CSS => [
            'crossorigin',
            'media',
            'referrerpolicy',
            'sizes',
            'type',
        ],
        Asset::TYPE_JS => [
            'async',
            'charset',
            'crossorigin',
            'defer',
            'type',
        ]
    ];

    /**
     * @var array $dependencies
     */
    private $dependencies;

    /**
     * @var string $source
     */
    private $source;

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
    public function __construct($type, $handle, $source, array $dependencies, DomainInterface $domain, $version = '')
    {
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
    public function getAttributes()
    {
        return $this->attributes;
    }


    /**
     * @param array $attributes
     * @throws DomainException
     * @since $VID:$
     */
    public function addAttributes(array $attributes)
    {
        if (empty($attributes)) {
            throw new DomainException(
                esc_html__('The attributes array needs at least one value.', 'event_espresso')
            );
        }
        foreach ($attributes as $key => $value) {
            if (is_int($key) && $this->validateAttribute($value)) {
                $this->attributes[] = $value;
            } else if ($this->validateAttribute($key)) {
                $this->attributes[ $key ] = $value;
            }
        }
    }


    /**
     * @param string $attribute
     * @return bool
     * @throws DomainException
     * @since $VID:$
     */
    private function validateAttribute($attribute)
    {
        $allowed = BrowserAsset::$allowed_attributes[ $this->type() ];
        if (! in_array($attribute, $allowed, true)) {
            throw new DomainException(
                sprintf(
                    esc_html__('Invalid attribute! The only allowed attributes are: "%1$s"', 'event_espresso'),
                    implode('", "', $allowed)
                )
            );
        }
        return true;
    }


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
        return $this->version;
    }


    /**
     * @param string $version
     * @param bool   $fluent
     * @return BrowserAsset|null
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function setVersion($version, $fluent = true)
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
    public function isBuiltDistributionSource() {
        return substr($this->source, -8) === Asset::FILE_EXTENSION_DISTRIBUTION_JS
               || substr($this->source, -9) === Asset::FILE_EXTENSION_DISTRIBUTION_CSS;
    }
}
