<?php

namespace EventEspresso\core\services\loaders;

use EE_Registry;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\LooseCollection;
use EventEspresso\core\services\container\CoffeeShop;
use InvalidArgumentException;

/**
 * Class LoaderFactory
 * All hard dependencies should be constructor injected wherever possible.
 * But other times, objects need to be created dynamically within another class
 * after some decision has been made, or relevant data has been collected.
 * If the constructors for the classes being generated have injected dependencies themselves,
 * then we want to use the Loader class for creating the classes as opposed to using the "new" keyword,
 * because using the Loader will ensure that all of the dependencies will get automatically injected.
 * So then the issue becomes HOW to get access to the Loader !?!?
 * First off, we do NOT  want  to be injecting the Loader all over the place,
 * because this is considered to be an anti pattern called "Service Location",
 * so instead we want to use Factory classes anywhere we would need to use the "new" keyword,
 * and then inject the factories we need into our other classes.
 * It is considered acceptable to inject the Loader into these factories.
 * But since the Loader would now be a hard dependency for these factories,
 * it too should be injected into the constructor just like any other hard dependency.
 * However, since our dependency tree is not yet complete at this moment,
 * at some point a class would need to use the "new" keyword to generate the Loader.
 * With most other classes this wouldn't be an issue, but since the Loader needs to be able to provide
 * shared instances of classes, we do NOT ever want more than one copy of the Loader floating around.
 * And that's the purpose of this class.
 * This class is a temporary measure for providing access to the ONE single instance of the Loader.
 * The Loader should still be injected into your factory class constructor
 * so that it can ultimately be provided via the dependency tree,
 * but it should not YET be required, and a class property should be created for holding the Loader.
 * ie:
 *      private $loader;
 *      public function __construct(LoaderInterface $loader = null)
 *      {
 *          $this->loader = $loader;
 *      }
 * The getter for the Loader should check the instance to see if injection was successful,
 * and if not, use THIS class to obtain the ONE single instance of the Loader.
 * ie:
 *      private function getLoader()
 *      {
 *          if (! $this->loader instanceof LoaderInterface) {
 *              $this->loader = LoaderFactory::getLoader();
 *          }
 *          return $this->loader;
 *      }
 * Then the methods in your factory class that generate their target classes,
 * can use this getter to obtain the Loader to use for generating objects.
 * ie:
 *      public function createSomeObject(array $arguments = array())
 *      {
 *          return $this->loader->getNew('fully/qualified/ClassName', $arguments);
 *      }
 * Eventually, when our dependency tree is complete
 * and ALL class construction can be traced back to the DI container,
 * then any injected factories can obtain their instance of the Loader via their constructor,
 * and this LoaderFactory (and the need to have getLoader() methods that use it)
 * will be completely unnecessary and can be removed.
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.44
 */
class LoaderFactory
{
    /**
     * @var LoaderInterface $loader ;
     */
    private static $loader;


    /**
     * @param EE_Registry|CoffeeShop   $generator   provided during very first instantiation in
     *                                              BootstrapDependencyInjectionContainer::buildLoader()
     *                                              otherwise can be left null
     * @param ClassInterfaceCache|null $class_cache also provided during first instantiation
     * @param ObjectIdentifier|null    $object_identifier
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getLoader(
        $generator = null,
        ClassInterfaceCache $class_cache = null,
        ObjectIdentifier $object_identifier = null
    ): LoaderInterface {
        if (
            ! LoaderFactory::$loader instanceof LoaderInterface
            && ($generator instanceof EE_Registry || $generator instanceof CoffeeShop)
            && $class_cache instanceof ClassInterfaceCache
            && $object_identifier instanceof ObjectIdentifier
        ) {
            $core_loader = new CoreLoader($generator);
            LoaderFactory::$loader = new Loader(
                $core_loader,
                new CachingLoader(
                    $core_loader,
                    new LooseCollection(''),
                    $object_identifier
                ),
                $class_cache
            );
        }
        return LoaderFactory::$loader;
    }


    /**
     * Used for instantiating a new instance of a class
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public static function getNew($fqcn, array $arguments = [])
    {
        return LoaderFactory::getLoader()->getNew($fqcn, $arguments);
    }


    /**
     * Used for getting a shared instance of a class
     *
     * @param FullyQualifiedName|string $fqcn
     * @param array                     $arguments
     * @return mixed
     */
    public static function getShared($fqcn, array $arguments = [])
    {
        return LoaderFactory::getLoader()->getShared($fqcn, $arguments);
    }
}
