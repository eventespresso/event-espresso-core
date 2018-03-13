<?php

namespace EventEspresso\core\services\loaders;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CachingLoaderDecorator
 * abstract parent class for classes that add additional logic to the loading process
 * by wrapping \EventEspresso\core\services\loaders\CoreLoader
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class CachingLoaderDecorator extends LoaderDecorator implements CachingLoaderDecoratorInterface
{


}
// End of file LoaderDecorator.php
// Location: core/services/loaders/LoaderDecorator.php
