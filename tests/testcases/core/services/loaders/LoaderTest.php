<?php

use PHPUnit\Framework\AssertionFailedError;
use PHPUnit\Framework\Exception;

/**
 * Class LoaderTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @group         LoaderTest
 */
class LoaderTest extends EE_UnitTestCase
{

    /**
     * testNewLoader
     *
     * @throws AssertionFailedError
     * @throws Exception
     */
    public function testNewLoader()
    {
        // first turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $fqcn = 'EventEspresso\tests\mocks\core\services\loaders\NewClassToLoad';
        /** @var EventEspresso\tests\mocks\core\services\loaders\NewClassToLoad $object */
        $object = $this->loader->load($fqcn, array(), false);
        $this->assertInstanceOf(
            $fqcn,
            $object,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($object) ? get_class($object) : print_r($object, true),
                $fqcn
            )
        );
        // none of these objects are getting cached because it is turned off for unit testing
        $object2 = $this->loader->load($fqcn, array(), false);
        $this->assertFalse($object->sameInstance($object2));
    }


    /**
     * testSharedLoader
     *
     * @throws AssertionFailedError
     * @throws Exception
     */
    public function testSharedLoader()
    {
        // first turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $fqcn = 'EventEspresso\tests\mocks\core\services\loaders\SharedClassToLoad';
        /** @var EventEspresso\tests\mocks\core\services\loaders\SharedClassToLoad $object */
        $object = $this->loader->load($fqcn);
        $this->assertInstanceOf(
            $fqcn,
            $object,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($object) ? get_class($object) : print_r($object, true),
                $fqcn
            )
        );
        // caching is on and we want a shared instance, so we should get the same object again
        $object2 = $this->loader->load($fqcn);
        $this->assertTrue($object->sameInstance($object2));
    }


    /**
     * testSharedLoader
     *
     * @group loaderArgs
     * @throws AssertionFailedError
     * @throws Exception
     */
    public function testSharedLoaderWithArgs()
    {
        // first turn caching on
        add_filter('FHEE__EventEspresso_core_services_loaders_CachingLoader__load__bypass_cache', '__return_false');
        $fqcn = 'EventEspresso\tests\mocks\core\services\loaders\SharedClassToLoad';
        $original_args = array(1, 2, 3);
        /** @var EventEspresso\tests\mocks\core\services\loaders\SharedClassToLoad $object */
        $object = $this->loader->load($fqcn, array($original_args));
        $this->assertInstanceOf(
            $fqcn,
            $object,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($object) ? get_class($object) : print_r($object, true),
                $fqcn
            )
        );
        $this->assertEquals($original_args, $object->args());
        // caching is on and we want a shared instance,
        // but we are passing new args, so we should get a new object
        $object2 = $this->loader->load($fqcn, array(array(4, 5, 6)));
        $this->assertFalse($object->sameInstance($object2));
        $this->assertNotEquals($original_args, $object2->args());
        // now let's request another instance but  with no args, which *should* return the first instance
        $object3 = $this->loader->load($fqcn);
        $this->assertTrue($object->sameInstance($object3));
        $this->assertEquals($original_args, $object3->args());
    }
}
// End of file LoaderTest.php
// Location: testcases/core/services/loaders/LoaderTest.php
