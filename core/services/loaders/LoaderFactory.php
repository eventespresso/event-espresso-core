<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class LoaderFactory
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.44
 */
class LoaderFactory
{

    /**
     * @var LoaderInterface $loader ;
     */
    private static $loader;



    /**
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function getLoader()
    {
        if (! LoaderFactory::$loader instanceof LoaderInterface) {
            LoaderFactory::$loader = new Loader();
        }
        return LoaderFactory::$loader;
    }


}
