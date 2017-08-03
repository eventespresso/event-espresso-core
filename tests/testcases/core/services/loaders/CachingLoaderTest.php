<?php
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\LooseCollection;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use EventEspresso\core\services\loaders\CoreLoader;
use EventEspresso\core\services\loaders\LoaderDecorator;
use EventEspresso\tests\mocks\core\services\loaders\CachingLoaderMock;

/**
 * CachingLoaderTest
 * Tests CachingLoader
 *
 * @package EventEspresso\tests
 * @subpackage \testcases
 * @author  Brent Christenson
 * @since   4.9.38.rc
 * @group LoaderTest
 * @group CachingLoaderTest
 */
class CachingLoaderTest extends EE_UnitTestCase
{


    /**
     * @var CachingLoaderMock $loader
     */
    private static $loader;



    public function setUp()
    {
        //caching is turned off by default in the parent test case.  For tests in here where we're doing a number of
        //different persistence tests
        if (! self::$loader instanceof LoaderDecorator) {
            self::$loader = new CachingLoaderMock(
                new CoreLoader(EE_Registry::instance()),
                new LooseCollection('')
            );
        }
        parent::setUp();
    }


    private function getFqcnForTest()
    {
        return '\EventEspresso\core\services\address\formatters\AddressFormatter';
    }



    /**
     * This ensures there is no persistence with caching off (caching is off by default in unit tests).
     */
    public function testLoadCachingOff()
    {
        $object = self::$loader->load($this->getFqcnForTest());
        $this->assertInstanceOf(
            $this->getFqcnForTest(),
            $object,
            sprintf(
                '%1$s is not an instance of %2$s',
                is_object($object) ? get_class($object) : print_r($object, true),
                $this->getFqcnForTest()
            )
        );
        $obj1ID = spl_object_hash($object);
        // none of these objects are getting cached because it is turned off for unit testing
        $object2 = self::$loader->load($this->getFqcnForTest());
        $obj2ID = spl_object_hash($object2);
        $this->assertNotEquals($obj1ID, $obj2ID);

        //this time let's load the object with caching turned on so it gets in the cache and we'll send that objects
        //hash along for the persistence test.
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false', 10);
        return spl_object_hash(self::$loader->load($this->getFqcnForTest()));
    }



    /**
     * This tests persistence with caching on.
     *
     * @throws InvalidEntityException
     * @throws ServiceNotFoundException
     */
    public function testLoadCachingOn()
    {
        //turn caching on.
        remove_all_filters('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache');
        $this->assertEquals(
            spl_object_hash(self::$loader->load($this->getFqcnForTest())),
            spl_object_hash(self::$loader->load($this->getFqcnForTest()))
        );
    }



    /**
     * This tests the resetting of cache
     */
    public function testResetCache()
    {
        // turn caching on again
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false', 10);
        // add a few different objects this time, but confirm that they are getting cached
        $fqcn7 = '\EventEspresso\core\services\address\formatters\AddressFormatter';
        $object7 = self::$loader->load($fqcn7);
        $this->assertInstanceOf($fqcn7, $object7);
        $this->assertEquals(spl_object_hash($object7), spl_object_hash(self::$loader->load($fqcn7)));
        $fqcn8 = '\EventEspresso\core\services\address\formatters\InlineAddressFormatter';
        $object8 = self::$loader->load($fqcn8);
        $this->assertInstanceOf($fqcn8, $object8);
        $this->assertEquals(spl_object_hash($object8), spl_object_hash(self::$loader->load($fqcn8)));
        $fqcn9 = '\EventEspresso\core\services\address\formatters\MultiLineAddressFormatter';
        $object9 = self::$loader->load($fqcn9);
        $this->assertInstanceOf($fqcn9, $object9);
        $this->assertEquals(spl_object_hash($object9), spl_object_hash(self::$loader->load($fqcn9)));
        $this->assertCount(3, self::$loader->getCache());
        // now reset the cache using the do_action()
        do_action('AHEE__EventEspresso_core_services_loaders_CachingLoader__resetCache');
        $this->assertCount(0, self::$loader->getCache());
        // confirm that reloading the same FCQNs as above results in new objects
        $this->assertNotEquals(spl_object_hash($object7), spl_object_hash(self::$loader->load($fqcn7)));
        $this->assertNotEquals(spl_object_hash($object8), spl_object_hash(self::$loader->load($fqcn8)));
        $this->assertNotEquals(spl_object_hash($object9), spl_object_hash(self::$loader->load($fqcn9)));
    }



}
// Location: testcases/core/services/loaders/CachingLoaderTest.php
