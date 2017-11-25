<?php

namespace EventEspresso\core\services\loaders;

use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


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
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php
