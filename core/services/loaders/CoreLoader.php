<?php

namespace EventEspresso\core\services\loaders;

use EE_Error;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\container\CoffeeMaker;
use EventEspresso\core\services\container\CoffeeShop;
use EventEspresso\core\services\container\exceptions\InstantiationException;
use EventEspresso\core\services\container\exceptions\ServiceExistsException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use InvalidArgumentException;
use OutOfBoundsException;
use ReflectionException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CoreLoader
 * Currently uses EE_Registry for instantiating classes,
 * but will later be replaced by the CoffeeShop DI container
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CoreLoader implements LoaderDecoratorInterface
{

    /**
     * @var EE_Registry|CoffeeShop $generator
     */
    private $generator;



    /**
     * CoreLoader constructor.
     *
     * @param EE_Registry|CoffeeShop $generator
     * @throws InvalidArgumentException
     */
    public function __construct($generator)
    {
        if(!($generator instanceof EE_Registry || $generator instanceof CoffeeShop)) {
            throw new InvalidArgumentException(
                esc_html__(
                    'The CoreLoader class must receive an instance of EE_Registry or the CoffeeShop DI container.',
                    'event_espresso'
                )
            );
        }
        $this->generator = $generator;
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @param bool   $shared
     * @return mixed
     * @throws OutOfBoundsException
     * @throws ServiceExistsException
     * @throws InstantiationException
     * @throws InvalidIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     * @throws EE_Error
     * @throws ServiceNotFoundException
     * @throws ReflectionException
     */
    public function load($fqcn, $arguments = array(), $shared = true)
    {
        if($this->generator instanceof EE_Registry) {
            return $this->generator->create($fqcn, $arguments, $shared);
        }
        return $this->generator->brew(
            $fqcn,
            $arguments,
            $shared ? CoffeeMaker::BREW_SHARED : CoffeeMaker::BREW_NEW
        );

    }



    /**
     * calls reset() on generator if method exists
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function reset()
    {
        if ($this->generator instanceof ResettableInterface) {
            $this->generator->reset();
        }
    }

}
// End of file CoreLoader.php
// Location: core/services/loaders/CoreLoader.php
