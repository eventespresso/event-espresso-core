<?php

namespace EventEspresso\core\services\loaders;

use EE_Error;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\ResettableInterface;
use EventEspresso\core\services\container\CoffeeMaker;
use EventEspresso\core\services\container\CoffeeShop;
use EventEspresso\core\services\container\exceptions\InstantiationException;
use EventEspresso\core\services\container\exceptions\ServiceExistsException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use InvalidArgumentException;
use OutOfBoundsException;
use ReflectionException;

/**
 * Class CoreLoader
 * Currently uses EE_Registry for instantiating classes,
 * but will later be replaced by the CoffeeShop DI container
 *
 * @package       Event Espresso
 * @author        Brent Christensen
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
        if (! ($generator instanceof EE_Registry || $generator instanceof CoffeeShop)) {
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
     * Calls the appropriate loading method from the installed generator;
     * If EE_Registry is being used, then the additional parameters for the EE_Registry::create() method
     * can be added to the $arguments array and they will be extracted and passed to EE_Registry::create(),
     * but NOT to the class being instantiated.
     * This is done by adding the parameters to the $arguments array as follows:
     *  array(
     *      'EE_Registry::create(from_db)'   => true, // boolean value, default = false
     *      'EE_Registry::create(load_only)' => true, // boolean value, default = false
     *      'EE_Registry::create(addon)'     => true, // boolean value, default = false
     *  )
     *
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
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function load($fqcn, $arguments = array(), $shared = true)
    {
        $shared = filter_var($shared, FILTER_VALIDATE_BOOLEAN);
        if ($this->generator instanceof EE_Registry) {
            // check if additional EE_Registry::create() arguments have been passed
            // from_db
            $from_db = isset($arguments['EE_Registry::create(from_db)'])
                ? filter_var($arguments['EE_Registry::create(from_db)'], FILTER_VALIDATE_BOOLEAN)
                : false;
            // load_only
            $load_only = isset($arguments['EE_Registry::create(load_only)'])
                ? filter_var($arguments['EE_Registry::create(load_only)'], FILTER_VALIDATE_BOOLEAN)
                : false;
            // addon
            $addon = isset($arguments['EE_Registry::create(addon)'])
                ? filter_var($arguments['EE_Registry::create(addon)'], FILTER_VALIDATE_BOOLEAN)
                : false;
            unset(
                $arguments['EE_Registry::create(from_db)'],
                $arguments['EE_Registry::create(load_only)'],
                $arguments['EE_Registry::create(addon)']
            );
            // addons need to be cached on EE_Registry
            $shared = $addon ? true : $shared;
            return $this->generator->create(
                $fqcn,
                $arguments,
                $shared,
                $from_db,
                $load_only,
                $addon
            );
        }
        return $this->generator->brew(
            $fqcn,
            $arguments,
            $shared ? CoffeeMaker::BREW_SHARED : CoffeeMaker::BREW_NEW
        );
    }


    /**
     * calls reset() on generator if method exists
     */
    public function reset()
    {
        if ($this->generator instanceof ResettableInterface) {
            $this->generator->reset();
        }
    }
}
