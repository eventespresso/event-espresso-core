<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;

/**
 * Class Loader
 * Provides a common interface for generating new or shared instantiations of classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class Loader implements LoaderInterface
{
    private LoaderDecoratorInterface $new_loader;

    private CachingLoaderDecoratorInterface $shared_loader;

    private ClassInterfaceCache $class_cache;


    /**
     * Loader constructor.
     *
     * @param LoaderDecoratorInterface        $new_loader
     * @param CachingLoaderDecoratorInterface $shared_loader
     * @param ClassInterfaceCache             $class_cache
     */
    public function __construct(
        LoaderDecoratorInterface $new_loader,
        CachingLoaderDecoratorInterface $shared_loader,
        ClassInterfaceCache $class_cache
    ) {
        $this->new_loader    = $new_loader;
        $this->shared_loader = $shared_loader;
        $this->class_cache   = $class_cache;
    }


    /**
     * @return LoaderDecoratorInterface
     */
    public function getNewLoader(): LoaderDecoratorInterface
    {
        return $this->new_loader;
    }


    /**
     * @return CachingLoaderDecoratorInterface
     */
    public function getSharedLoader(): CachingLoaderDecoratorInterface
    {
        return $this->shared_loader;
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @param bool                      $shared
     * @return mixed
     */
    public function load($fqcn, array $arguments = [], bool $shared = true)
    {
        $fqcn = $this->class_cache->getFqn($fqcn);
        if ($this->class_cache->hasInterface($fqcn, 'EventEspresso\core\interfaces\ReservedInstanceInterface')) {
            $shared = true;
        }
        return $shared
            ? $this->getSharedLoader()->load($fqcn, $arguments, $shared)
            : $this->getNewLoader()->load($fqcn, $arguments, $shared);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getNew($fqcn, array $arguments = [])
    {
        return $this->load($fqcn, $arguments, false);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getShared($fqcn, array $arguments = [])
    {
        return $this->load($fqcn, $arguments);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return bool
     */
    public function isShared($fqcn, array $arguments = []): bool
    {
        $fqcn = $this->class_cache->getFqn($fqcn);
        return $this->getSharedLoader()->isShared($fqcn, $arguments);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param mixed                     $object
     * @param array                     $arguments
     * @return bool
     */
    public function share($fqcn, $object, array $arguments = []): bool
    {
        $fqcn = $this->class_cache->getFqn($fqcn);
        return $this->getSharedLoader()->share($fqcn, $object, $arguments);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return bool
     */
    public function remove($fqcn, array $arguments = []): bool
    {
        $fqcn = $this->class_cache->getFqn($fqcn);
        return $this->getSharedLoader()->remove($fqcn, $arguments);
    }


    /**
     * calls reset() on loaders if that method exists
     */
    public function reset()
    {
        $this->shared_loader->reset();
    }
}
