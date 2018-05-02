<?php

namespace EventEspresso\core\services\container;

use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;

/**
 * Class CoffeeMill
 * Factory class for creating new classes via the CoffeeShop Dependency Injection Container
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.27
 */
class CoffeeMill
{

    /**
     * @var CoffeeShop $coffee_shop
     */
    private static $coffee_shop;


    /**
     * @return mixed
     */
    public static function getCoffeeShop()
    {
        return self::$coffee_shop;
    }


    /**
     * @param CoffeeShop $coffee_shop
     */
    public static function setCoffeeShop(CoffeeShop $coffee_shop)
    {
        self::$coffee_shop = $coffee_shop;
    }


    /**
     * @param string $identifier
     * @param array  $arguments
     * @param string $type
     * @return mixed
     * @throws ServiceNotFoundException
     */
    public static function createNew($identifier, $arguments = array(), $type = CoffeeMaker::BREW_NEW)
    {
        return self::$coffee_shop->brew($identifier, $arguments, $type);
    }


    /**
     * IMPORTANT!!!
     * Usage of this method is discouraged as it promotes service location.
     * It's current use is only as a stop gap measure until the CoffeeShop
     * Dependency Injection Container can be implemented properly for all classes.
     * If it is at all possible, inject your dependencies via your class constructor.
     * This method WILL BE DEPRECATED at some point in the near future.
     *
     * @param string $identifier
     * @param array  $arguments
     * @param string $type
     * @return mixed
     * @throws ServiceNotFoundException
     */
    public static function getService($identifier, $arguments = array(), $type = CoffeeMaker::BREW_SHARED)
    {
        return self::$coffee_shop->brew($identifier, $arguments, $type);
    }
}
