<?php

namespace EventEspresso\core\services\loaders;

use InvalidArgumentException;

/**
 * Same as LoaderDecoratorInterface
 * but indicates that classes implementing this should be capable of some form of caching
 */
interface CachingLoaderDecoratorInterface extends LoaderDecoratorInterface
{
    /**
     * @param string $fqcn
     * @param mixed  $object
     * @param array  $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object, array $arguments = []);


    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return bool
     * @throws InvalidArgumentException
     */
    public function remove($fqcn, array $arguments = []);
}
