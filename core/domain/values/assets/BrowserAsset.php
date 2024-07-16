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
    private array $attributes = [];

    /**
     * @var array $allowed_attributes
     */
    private static array $allowed_attributes = [
        Asset::TYPE_CSS => [
            'crossorigin',
            'media',
            'referrerpolicy',
            'sizes',
            'type',
        ],
        Asset::TYPE_JS  => [
            'async',
            'charset',
            'crossorigin',
            'defer',
            'type',
        ],
    ];

    /**
     * @var array $dependencies
     */
    private array $dependencies;

    /**
     * @var string $source
     */
    private string $source;

    /**
     * @var string $version
     */
    private string $version;


    /**
     * Asset constructor.
     *
     * @param string $type
     * @param string $handle
     * @param string $source
     * @param array $dependencies
     * @param DomainInterface $domain
     * @param string $version
     * @throws DomainException
     * @throws InvalidDataTypeException
     */
    public function __construct(
        string $type,
        string $handle,
        string $source,
        array $dependencies,
        DomainInterface $domain,
        string $version = ''
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
    public function getAttributes(): array
    {
        return $this->attributes;
    }


    /**
     * @param array $attributes
     * @throws DomainException
     * @since 5.0.0.p
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
            } else {
                if ($this->validateAttribute($key)) {
                    $this->attributes[ $key ] = $value;
                }
            }
        }
    }


    /**
     * @param string $attribute
     * @return bool
     * @throws DomainException
     * @since 5.0.0.p
     */
    private function validateAttribute(string $attribute): bool
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
    public function dependencies(): array
    {
        return $this->dependencies;
    }


    /**
     * @param array $dependencies
     */
    public function addDependencies(array $dependencies)
    {
        $this->dependencies = array_merge($this->dependencies, $dependencies);
    }


    /**
     * @param array $dependencies
     */
    protected function setDependencies(array $dependencies)
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
     * @throws InvalidDataTypeException
     */
    private function setSource(string $source)
    {
        $this->source = $source;
    }


    /**
     * @return string
     * @throws InvalidDataTypeException
     * @throws DomainException
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
