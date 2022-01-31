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
    public function load($fqcn, array $arguments = [], $shared = true);


    /**
     * Used for instantiating a new instance of a class
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public function getNew($fqcn, array $arguments = []);


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
    public function share($fqcn, $object, array $arguments = []);


    /**
     * @param FullyQualifiedName|string $fqcn
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn);


    /**
     * @param FullyQualifiedName|string $fqcn
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn);


    /**
     * calls reset() on loader if method exists
     */
    public function reset();
}
