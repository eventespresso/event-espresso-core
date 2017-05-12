<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Same as LoaderDecoratorInterface
 * but indicates that classes implementing this should be capable of some form of caching
 */
interface CachingLoaderDecoratorInterface extends LoaderDecoratorInterface
{


}
// End of file LoaderInterface.php
// Location: core/services/loaders/LoaderInterface.php