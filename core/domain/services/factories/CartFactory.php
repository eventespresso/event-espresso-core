<?php

namespace EventEspresso\core\domain\services\factories;

use EE_Cart;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CartFactory
 * Description
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class CartFactory
{

    /**
     * @return EE_Cart
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function getCart()
    {
        return LoaderFactory::getLoader()->getShared('EE_Cart');
    }
}
