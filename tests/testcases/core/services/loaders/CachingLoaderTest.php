<?php
use EventEspresso\core\services\collections\LooseCollection;
use EventEspresso\core\services\loaders\CoreLoader;
use EventEspresso\core\services\loaders\LoaderInterface;
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
     * @var LoaderInterface $loader
     */
    private static $loader;



    public function __construct()
    {
        parent::__construct();
        if(! self::$loader instanceof LoaderInterface) {
            self::$loader = new CachingLoaderMock(
                new CoreLoader(EE_Registry::instance()),
                new LooseCollection('')
            );
        }
    }



    /**
     * @group LoaderTest
     */
    public function testLoad()
    {
        $fqcn = '\EventEspresso\core\services\address\formatters\AddressFormatter';
        $object = self::$loader->load($fqcn);
        $this->assertInstanceOf(
            $fqcn,
            $object,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($object) ? get_class($object) : print_r($object, true),
                $fqcn
            )
        );
        $obj1ID = spl_object_hash($object);
        // none of these objects are getting cached because it is turned off for unit testing
        $object2 = self::$loader->load($fqcn);
        $this->assertNotEquals($obj1ID, spl_object_hash($object2));
        // now turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $object3 = self::$loader->load($fqcn);
        $obj3ID = spl_object_hash($object3);
        $object4 = self::$loader->load($fqcn);
        $this->assertEquals($obj3ID, spl_object_hash($object4));
        // we want to know if cached items persist between unit tests,
        // so let's return the ID for the last object to tests that depend on this one
        return $obj3ID;
    }



    /**
     * @depends testLoad
     * @group   LoaderTest
     * @param string $obj3ID
     */
    public function testPersistenceBetweenTests($obj3ID){
        global $wp_version;
        if (version_compare($wp_version, '4.1', '>')) {
            $fqcn = '\EventEspresso\core\services\address\formatters\AddressFormatter';
            $object5 = self::$loader->load($fqcn);
            $this->assertEquals($obj3ID, spl_object_hash($object5));
            // we don't want to mess up other tests, so turn caching off again by removing the filter we added
            remove_filter(
                'FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache',
                '__return_false'
            );
            // this time we should get a new object instead of the same one as before
            $object6 = self::$loader->load($fqcn);
            $this->assertNotEquals($obj3ID, spl_object_hash($object6));
        }
    }



    /**
     * @group LoaderTest
     */
    public function testResetCache(){
        // turn caching on again
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
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
// End of file CachingLoaderTest.php
// Location: /tests/testcases/core/services/loaders/CachingLoaderTest.php