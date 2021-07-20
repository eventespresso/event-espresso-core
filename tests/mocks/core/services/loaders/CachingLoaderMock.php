<?php

namespace EventEspresso\tests\mocks\core\services\loaders;

use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\loaders\CachingLoader;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CachingLoaderMock
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * 
 */
class CachingLoaderMock extends CachingLoader
{

    /**
     * @return CollectionInterface
     */
    public function getCache()
    {
        return $this->cache;
    }


    /**
     * @param bool $bypass
     */
    public function setBypass($bypass)
    {
        $this->bypass = $bypass;
    }
}
// End of file CachingLoaderMock.php
// Location: EventEspresso\tests\mocks\core\services\loaders/CachingLoaderMock.php