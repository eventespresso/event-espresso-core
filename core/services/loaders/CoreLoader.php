<?php

namespace EventEspresso\core\services\loaders;

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
     * @throws ServiceNotFoundException
     */
    public function load($fqcn, $arguments = array())
    {
        $object = $this->generator instanceof EE_Registry
            ? $this->generator->create($fqcn, $arguments)
            : $this->generator->brew($fqcn, $arguments);
        // if we did NOT receive an instance of the requested object from EE_Registry
        if(! $object instanceof $fqcn && $this->generator instanceof EE_Registry) {
            // then we need to try some of these other loading methods
            $alternate_loaders = array(
                'load_core',
                'load_class',
                'load_model',
                'load_helper',
                'load_lib',
                'load_model_class',
                'load_service',
                'load_dms',
            );
            foreach ($alternate_loaders as $alternate_loader) {
                $object = $this->generator->{$alternate_loader}($fqcn, $arguments);
                // but then break out of the loop as soon as we find what we are looking for
                if ($object instanceof $fqcn) {
                    break;
                }
            }
        }
        return $object;
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