<?php

namespace EventEspresso\core\services\loaders;

use EE_Registry;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\LooseCollection;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Loader
 * Provides a common interface for generating new or shared instantiations of classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
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
     * @param LoaderDecoratorInterface|null $new_loader
     * @param LoaderDecoratorInterface|null $shared_loader
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    public function __construct(LoaderDecoratorInterface $new_loader = null, LoaderDecoratorInterface $shared_loader = null)
    {
        $this->new_loader = $this->setupNewLoader($new_loader);
        $this->shared_loader = $this->setupSharedLoader($shared_loader);
    }



    /**
     * @param LoaderDecoratorInterface|null $new_loader
     * @return CoreLoader|LoaderDecoratorInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function setupNewLoader(LoaderDecoratorInterface $new_loader = null)
    {
        // if not already generated, create a standard loader
        if (! $new_loader instanceof LoaderDecoratorInterface) {
            $new_loader = new CoreLoader(EE_Registry::instance());
        }
        return $new_loader;
    }



    /**
     * @param LoaderDecoratorInterface|null $shared_loader
     * @return CoreLoader|LoaderDecoratorInterface
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    private function setupSharedLoader(LoaderDecoratorInterface $shared_loader = null)
    {
        // if not already generated, create a caching loader
        if (! $shared_loader instanceof LoaderDecoratorInterface) {
            $shared_loader = new CachingLoader(
                new CoreLoader(EE_Registry::instance()),
                new LooseCollection('')
            );
        }
        return $shared_loader;
    }



    /**
     * @return LoaderDecoratorInterface
     */
    public function getNewLoader()
    {
        return $this->new_loader;
    }



    /**
     * @return LoaderDecoratorInterface
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
            ? $this->getSharedLoader()->load($fqcn, $arguments)
            : $this->getNewLoader()->load($fqcn, $arguments);
    }



    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return mixed
     */
    public function getNew($fqcn, $arguments = array())
    {
        return $this->getNewLoader()->load($fqcn, $arguments);
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
     * calls reset() on loaders if that method exists
     */
    public function reset()
    {
        $this->new_loader->reset();
        $this->shared_loader->reset();
    }

}
// End of file Loader.php
// Location: EventEspresso\core\services\loaders/Loader.php
