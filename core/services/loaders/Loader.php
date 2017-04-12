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
     * @var LoaderInterface $new_loader
     */
    private $new_loader;


    /**
     * @var LoaderInterface $shared_loader
     */
    private $shared_loader;



    /**
     * Loader constructor.
     *
     * @param LoaderInterface|null $new_loader
     * @param LoaderInterface|null $shared_loader
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    public function __construct(LoaderInterface $new_loader = null, LoaderInterface $shared_loader = null)
    {
        $this->new_loader = $this->setupNewLoader($new_loader);
        $this->shared_loader = $this->setupSharedLoader($shared_loader);
    }



    /**
     * @param LoaderInterface|null $new_loader
     * @return CoreLoader|LoaderInterface
     * @throws InvalidArgumentException
     */
    private function setupNewLoader(LoaderInterface $new_loader = null)
    {
        // if not already generated, create a standard loader
        if (! $new_loader instanceof LoaderInterface) {
            $new_loader = new CoreLoader(EE_Registry::instance());
        }
        return $new_loader;
    }



    /**
     * @param LoaderInterface|null $shared_loader
     * @return CoreLoader|LoaderInterface
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    private function setupSharedLoader(LoaderInterface $shared_loader = null)
    {
        // if not already generated, create a caching loader
        if (! $shared_loader instanceof LoaderInterface) {
            $shared_loader = new CachingLoader(
                new CoreLoader(EE_Registry::instance()),
                new LooseCollection('')
            );
        }
        return $shared_loader;
    }



    /**
     * @return LoaderInterface
     */
    public function getNewLoader()
    {
        return $this->new_loader;
    }



    /**
     * @return LoaderInterface
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