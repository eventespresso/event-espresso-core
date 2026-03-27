<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;
use InvalidArgumentException;

interface LoaderInterface
{
    /**
     * Can be for instantiating a new instance of a class,
     * or for getting a shared instance of a class (default)
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @param bool                      $shared
     * @return mixed
     */
    public function load($fqcn, array $arguments = [], bool $shared = true);


    /**
     * Used for instantiating a new instance of a class
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getNew($fqcn, array $arguments = []);


    /**
     * Returns true if a class matching the supplied FQCN (and arguements) has been previously shared.
     * This is only required when a shared class can not be automagically instantiated
     * because its dependencies require specific values that can only be set manually.
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return bool
     */
    public function isShared($fqcn, array $arguments = []): bool;


    /**
     * Used for getting a shared instance of a class
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getShared($fqcn, array $arguments = []);


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param mixed                     $object
     * @param array                     $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object, array $arguments = []): bool;


    /**
     * @param FullyQualifiedName|string $fqcn
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn): bool;


    /**
     * calls reset() on loader if method exists
     */
    public function reset();
}
