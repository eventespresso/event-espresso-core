<?php

namespace EventEspresso\core\domain\services\factories;

use EE_Cart;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class CartFactory
 * Description
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class CartFactory extends LoaderFactory
{
    /**
     * @return EE_Cart
     */
    public static function getCart(): EE_Cart
    {
        return CartFactory::getShared('EE_Cart');
    }
}
