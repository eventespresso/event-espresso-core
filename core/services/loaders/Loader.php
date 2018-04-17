<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Loader
 * Provides a common interface for generating new or shared instantiations of classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * 
 */
class Loader implements LoaderInterface
{


    /**
     * @var LoaderDecoratorInterface $new_loader
     */
    private $new_loader;


    /**
     * @var LoaderDecoratorInterface $shared_loader
     */
    private $shared_loader;



    /**
     * Loader constructor.
     *
     * @param LoaderDecoratorInterface $new_loader
     * @param CachingLoaderDecoratorInterface $shared_loader
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    public function __construct(LoaderDecoratorInterface $new_loader, CachingLoaderDecoratorInterface $shared_loader)
    {
        $this->new_loader = $new_loader;
        $this->shared_loader = $shared_loader;
    }



    /**
     * @return LoaderDecoratorInterface
     */
    public function getNewLoader()
    {
        return $this->new_loader;
    }



    /**
     * @return CachingLoaderDecoratorInterface
     */
    public function getSharedLoader()
    {
        return $this->shared_loader;
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @param bool   $shared
     * @return mixed
     */
    public function load($fqcn, $arguments = array(), $shared = true)
    {
        return $shared
            ? $this->getSharedLoader()->load($fqcn, $arguments, $shared)
            : $this->getNewLoader()->load($fqcn, $arguments, $shared);
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getNew($fqcn, $arguments = array())
    {
        return $this->getNewLoader()->load($fqcn, $arguments, false);
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getShared($fqcn, $arguments = array())
    {
        return $this->getSharedLoader()->load($fqcn, $arguments);
    }


    /**
     * @param string $fqcn
     * @param mixed  $object
     * @return bool
     * @throws InvalidArgumentException
     */
    public function share($fqcn, $object)
    {
        return $this->getSharedLoader()->share($fqcn, $object);
    }



    /**
     * calls reset() on loaders if that method exists
     */
    public function reset()
    {
        $this->shared_loader->reset();
    }

}
// End of file Loader.php
// Location: EventEspresso\core\services\loaders/Loader.php
