<?php

namespace EventEspresso\core\services\bootstrap;

use EE_Dependency_Map;
use EE_Error;
use EE_Registry;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class BootstrapDependencyInjectionContainer
 * Builds the main DI container
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   $VID:$
 */
class BootstrapDependencyInjectionContainer
{

    /**
     * @var EE_Dependency_Map $dependency_map
     */
    protected $dependency_map;

    /**
     * @type LoaderInterface $loader
     */
    protected $loader;

    /**
     * @var EE_Registry $registry
     */
    protected $registry;


    /**
     * Can't use this just yet until we exorcise some more of our singleton usage from core
     */
    public function buildDependencyInjectionContainer()
    {
        // build DI container
        // $OpenCoffeeShop = new EventEspresso\core\services\container\OpenCoffeeShop();
        // $OpenCoffeeShop->addRecipes();
        // $CoffeeShop = $OpenCoffeeShop->CoffeeShop();
    }


    /**
     * Setups  EE_Registry and EE_Dependency_Map
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function buildLegacyDependencyInjectionContainer()
    {
        // EE_Dependency_Map: info about how to load classes required by other classes
        espresso_load_required(
            'EE_Dependency_Map',
            EE_CORE . 'EE_Dependency_Map.core.php'
        );
        $this->dependency_map = EE_Dependency_Map::instance();
        // EE_Registry: central repository for classes (legacy)
        espresso_load_required(
            'EE_Registry',
            EE_CORE . 'EE_Registry.core.php'
        );
        $this->registry = EE_Registry::instance($this->dependency_map);
    }


    /**
     * Performs initial setup for the generic Loader
     *
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function buildLoader()
    {
        $this->loader = LoaderFactory::getLoader($this->registry);
        $this->dependency_map->setLoader($this->loader);
    }


    /**
     * @return EE_Dependency_Map
     */
    public function getDependencyMap()
    {
        return $this->dependency_map;
    }


    /**
     * @return EE_Registry
     */
    public function getRegistry()
    {
        return $this->registry;
    }



    /**
     * @return LoaderInterface
     */
    public function getLoader()
    {
        return $this->loader;
    }




}
// Location: SetupLoaderAndDiContainer.php
