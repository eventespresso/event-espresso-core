<?php

namespace EventEspresso\core\services\loaders;

/**
 * Class LoaderDecorator
 * abstract parent class for classes that add additional logic to the loading process
 * by wrapping \EventEspresso\core\services\loaders\CoreLoader
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
abstract class LoaderDecorator implements LoaderDecoratorInterface
{


    /**
     * @var LoaderDecoratorInterface $loader
     */
    protected $loader;


    /**
     * LoaderDecorator constructor.
     *
     * @param LoaderDecoratorInterface $loader
     */
    public function __construct(LoaderDecoratorInterface $loader)
    {
        $this->loader = $loader;
    }
}
