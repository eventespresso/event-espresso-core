<?php
use EventEspresso\core\services\loaders\Loader;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class LoaderTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group LoaderTest
 */
class LoaderTest extends EE_UnitTestCase
{

    /**
     * @var Loader $loader
     */
    private static $loader;



    /**
     * LoaderTest constructor.
     */
    public function __construct()
    {
        self::$loader = new Loader();
        parent::__construct();
    }



    /**
     * @group LoaderTest
     */
    public function testNewLoader()
    {
        // first turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $fqcn = '\EventEspresso\core\services\address\formatters\AddressFormatter';
        $object = self::$loader->load($fqcn, array(), false);
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
        $object2 = self::$loader->load($fqcn, array(), false);
        $this->assertNotEquals($obj1ID, spl_object_hash($object2));
        // we don't want to mess up other tests, so turn caching off again by removing the filter we added
        remove_filter(
            'FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache',
            '__return_false'
        );
    }



    /**
     * @group LoaderTest
     */
    public function testSharedLoader()
    {
        // first turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $fqcn = '\EventEspresso\core\services\address\formatters\AddressFormatter';
        $object3 = self::$loader->load($fqcn);
        $this->assertInstanceOf(
            $fqcn,
            $object3,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($object3) ? get_class($object3) : print_r($object3, true),
                $fqcn
            )
        );
        $obj3ID = spl_object_hash($object3);
        // these objects are getting cached so we should get the same one again
        $object4 = self::$loader->load($fqcn);
        $this->assertEquals($obj3ID, spl_object_hash($object4));
        // we don't want to mess up other tests, so turn caching off again by removing the filter we added
        remove_filter(
            'FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache',
            '__return_false'
        );
    }


}
// End of file LoaderTest.php
// Location: testcases/core/services/loaders/LoaderTest.php