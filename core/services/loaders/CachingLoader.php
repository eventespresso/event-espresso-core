<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\collections\CollectionInterface;
use InvalidArgumentException;

/**
 * Class CachingLoader
 * caches objects returned by the decorated loader
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class CachingLoader extends CachingLoaderDecorator
{
    /**
     * @var bool
     */
    protected $bypass;

    /**
     * @var CollectionInterface
     */
    protected $cache;

    /**
     * @var string
     */
    protected $identifier;

    /**
     * @var ObjectIdentifier
     */
    private $object_identifier;


    /**
     * CachingLoader constructor.
     *
     * @param LoaderDecoratorInterface $loader
     * @param CollectionInterface      $cache
     * @param ObjectIdentifier         $object_identifier
     * @param string                   $identifier
     * @throws InvalidDataTypeException
     */
    public function __construct(
        LoaderDecoratorInterface $loader,
        CollectionInterface $cache,
        ObjectIdentifier $object_identifier,
        string $identifier = ''
    ) {
        parent::__construct($loader);
        $this->cache             = $cache;
        $this->object_identifier = $object_identifier;
        $this->setIdentifier($identifier);
        if ($this->identifier !== '') {
            // to only clear this cache, and assuming an identifier has been set, simply do the following:
            // do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache__IDENTIFIER');
            // where "IDENTIFIER" = the string that was set during construction
            add_action(
                "AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache__$identifier",
                [$this, 'reset']
            );
        }
        // to clear ALL caches, simply do the following:
        // do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache');
        add_action(
            'AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache',
            [$this, 'reset']
        );
        // caching can be turned off via the following code:
        // add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_true');
        $this->bypass = filter_var(
            apply_filters(
                'FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache',
                false,
                $this
            ),
            FILTER_VALIDATE_BOOLEAN
        );
    }


    /**
     * @return string
     */
    public function identifier(): string
    {
        return $this->identifier;
    }


    /**
     * @param string|null $identifier
     * @throws InvalidDataTypeException
     */
    private function setIdentifier(?string $identifier)
    {
        if (! is_string($identifier)) {
            throw new InvalidDataTypeException('$identifier', $identifier, 'string');
        }
        $this->identifier = $identifier;
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param mixed                     $object
     * @param array                     $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object, array $arguments = []): bool
    {
        if ($object instanceof $fqcn) {
            return $this->cache->add(
                $object,
                $this->object_identifier->getIdentifier($fqcn, $arguments)
            );
        }
        throw new InvalidArgumentException(
            sprintf(
                esc_html__(
                    'The supplied class name "%1$s" must match the class of the supplied object.',
                    'event_espresso'
                ),
                $fqcn
            )
        );
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @param bool                      $shared
     * @param array                     $interfaces
     * @return mixed
     */
    public function load($fqcn, $arguments = [], $shared = true, array $interfaces = [])
    {
        $fqcn = ltrim($fqcn, '\\');
        // caching can be turned off via the following code:
        // add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_true');
        if ($this->bypass) {
            // even though $shared might be true, caching could be bypassed for whatever reason,
            // so we don't want the core loader to cache anything, therefore caching is turned off
            return $this->loader->load($fqcn, $arguments, false);
        }
        $object_identifier = $this->object_identifier->getIdentifier($fqcn, $arguments);
        if ($this->cache->has($object_identifier)) {
            return $this->cache->get($object_identifier);
        }
        $object = $this->loader->load($fqcn, $arguments, $shared);
        if ($object instanceof $fqcn) {
            $this->cache->add($object, $object_identifier);
        }
        return $object;
    }


    /**
     * empties cache and calls reset() on loader if method exists
     */
    public function reset()
    {
        $this->clearCache();
        $this->loader->reset();
    }


    /**
     * unsets and detaches ALL objects from the cache
     *
     * @since 4.9.62.p
     */
    public function clearCache()
    {
        $cache_class          = get_class($this->cache);
        $collection_interface = $this->cache->collectionInterface();
        $this->cache->trashAndDetachAll();
        $this->cache = new $cache_class($collection_interface);
        if (! $this->cache instanceof CollectionInterface) {
            throw new InvalidDataTypeException('CachingLoader::$cache', $this->cache, 'CollectionInterface');
        }
    }


    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn, array $arguments = []): bool
    {
        $fqcn              = ltrim($fqcn, '\\');
        $object_identifier = $this->object_identifier->getIdentifier($fqcn, $arguments);
        $object            = $this->cache->has($object_identifier)
            ? $this->cache->get($object_identifier)
            : $this->loader->load($fqcn, $arguments);
        return $this->cache->remove($object);
    }
}
