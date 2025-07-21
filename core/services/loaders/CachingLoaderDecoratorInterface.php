<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;
use InvalidArgumentException;

/**
 * Same as LoaderDecoratorInterface
 * but indicates that classes implementing this should be capable of some form of caching
 */
interface CachingLoaderDecoratorInterface extends LoaderDecoratorInterface
{
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
     * @param array                     $arguments
     * @return bool
     */
    public function isShared($fqcn, array $arguments = []): bool;


    /**
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn, array $arguments = []): bool;
}
