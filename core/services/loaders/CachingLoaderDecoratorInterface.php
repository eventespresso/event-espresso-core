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
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object);
}
