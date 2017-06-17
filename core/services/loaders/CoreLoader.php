<?php

namespace EventEspresso\core\services\loaders;

use EE_Error;
use EE_Registry;
use EventEspresso\core\services\container\CoffeeShop;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use InvalidArgumentException;

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
     * @return mixed
     * @throws EE_Error
     * @throws ServiceNotFoundException
     */
    public function load($fqcn, $arguments = array())
    {
        return $this->generator instanceof EE_Registry
            ? $this->generator->create($fqcn, $arguments)
            : $this->generator->brew($fqcn, $arguments);
    }



    /**
     * calls reset() on generator if method exists
     */
    public function reset()
    {
        if (method_exists($this->generator, 'reset')) {
            $this->generator->reset();
        }
    }

}
// End of file CoreLoader.php
// Location: core/services/loaders/CoreLoader.php
