<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;
use InvalidArgumentException;

/**
 * Class Loader
 * Provides a common interface for generating new or shared instantiations of classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class Loader implements LoaderInterface
{

    /**
     * @var LoaderDecoratorInterface $new_loader
     */
    private $new_loader;

    /**
     * @var LoaderDecoratorInterface $shared_loader
     */
    private $shared_loader;

    /**
     * @var ClassInterfaceCache $class_cache
     */
    private $class_cache;

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
    public function getNewLoader()
    {
        return $this->new_loader;
    }


    /**
     * @return CachingLoaderDecoratorInterface
     */
    public function getSharedLoader()
    {
        return $this->shared_loader;
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @param bool                      $shared
     * @return mixed
     */
    public function load($fqcn, array $arguments = array(), $shared = true)
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
    public function getNew($fqcn, array $arguments = array())
    {
        return $this->load($fqcn, $arguments, false);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getShared($fqcn, array $arguments = array())
    {
        return $this->load($fqcn, $arguments);
    }


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param mixed                     $object
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object)
    {
        $fqcn = $this->class_cache->getFqn($fqcn);
        return $this->getSharedLoader()->share($fqcn, $object);
    }


    /**
     * calls reset() on loaders if that method exists
     */
    public function reset()
    {
        $this->shared_loader->reset();
    }
}
