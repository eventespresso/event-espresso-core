<?php

namespace EventEspresso\core\services\factories;

use EventEspresso\core\services\loaders\LoaderInterface;

abstract class Factory implements FactoryInterface
{

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;


    /**
     * RouteFactory constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }
}
