<?php
use EventEspresso\core\services\cache\TransientCacheStorage;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CacheStorageTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 * @group cache
 */
class TransientCacheStorageTest extends EE_UnitTestCase
{


    /**
     * @var TransientCacheStorage $cache_storage
     */
    protected $cache_storage;



    public function set_up()
    {
        // we only want our expirations to be 1 second in the future
        add_filter(
            'FHEE__TransientCacheStorage__roundTimestamp__timestamp',
            function($rounded_timestamp, $timestamp) {
                return $timestamp + 1;
            },
            10,
            2
        );
        $this->cache_storage = new \EventEspresso\core\services\cache\TransientCacheStorage();
        parent::set_up();
    }



    public function tear_down()
    {
        parent::tear_down();
        $this->cache_storage = null;
    }



    /**
     * @see http://stackoverflow.com/a/4356295
     * @param int $length
     * @return string
     */
    private function generateRandomString($length = 100)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    /**
     * @group CacheStorageInterface
     * @group slow_test
     */
    public function test_add()
    {
        // echo "\n\n** " . __LINE__ . ") " . __METHOD__ . '() **';
        $key = __FUNCTION__;
        $data = $this->generateRandomString();
        $added = $this->cache_storage->add($key, $data);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        $transient = get_transient($key);
        $this->assertEquals($data, $transient);
        // now test expiration
        $key = __FUNCTION__ . '_expires_in_1_second';
        $added = $this->cache_storage->add($key, $data, 1);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        // wait 2 seconds
        sleep(2);
        $transient = get_transient($key);
        $this->assertFalse($transient, __LINE__ . ") Transient {$key} returned data when it should not have");
    }



    /**
     * @group CacheStorageInterface
     * @group slow_test
     */
    public function test_get()
    {
        // echo "\n\n** " . __LINE__ . ") " . __METHOD__ . '() **';
        $key = __FUNCTION__;
        $data = $this->generateRandomString();
        $added = $this->cache_storage->add($key, $data);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        $transient = $this->cache_storage->get($key);
        $this->assertEquals($data, $transient);
        // now test expiration
        $key = __FUNCTION__ . '_expires_in_1_second';
        $added = $this->cache_storage->add($key, $data, 1);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        // wait 2 seconds
        sleep(2);
        $transient = $this->cache_storage->get($key);
        $this->assertNull($transient, __LINE__ . ") Transient {$key} returned data when it should not have");
        // now test standard cache early expiration
        $key = __FUNCTION__ . '_expires_in_60_seconds';
        $added = $this->cache_storage->add($key, $data, 60);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        // wait 2 seconds
        sleep(2);
        $transient = $this->cache_storage->get($key);
        // should be null because this request should trigger cache regeneration
        // BEFORE the cache actually expires in roughly 58 seconds
        $this->assertNull($transient, __LINE__ . ") Transient {$key} returned data when it should not have");
        // now attempt to retrieve the cache again,
        $transient = $this->cache_storage->get($key);
        // however, this second request should receive the cached content
        // that still exists from before, therefore avoiding a cache stampede,
        // (assuming the previous get() can regenerate the content in time)
        $this->assertEquals($data, $transient, __LINE__ . ") Transient {$key} returned incorrect data");
        // now test with standard cache early expiration turned off
        $key = __FUNCTION__ . '_not_standard_cache';
        $added = $this->cache_storage->add($key, $data, 60);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        // wait 2 seconds
        sleep(2);
        $transient = $this->cache_storage->get($key, false);
        // cached content should be returned despite expiration being less than 60 seconds
        // therefore avoiding a cache stampede,
        // (assuming the previous get() can regenerate the content in time)
        $this->assertEquals($data, $transient, __LINE__ . ") Transient {$key} returned incorrect data");
    }


    /**
     * @group CacheStorageInterface
     */
    public function test_delete()
    {
        // echo "\n\n** " . __LINE__ . ") " . __METHOD__ . '() **';
        $key = __FUNCTION__;
        $data = $this->generateRandomString();
        $added = $this->cache_storage->add($key, $data, 300);
        $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
        $transient = get_transient($key);
        $this->assertEquals($data, $transient, __LINE__ . ") Transient {$key} returned incorrect data");
        $this->cache_storage->delete($key);
        $transient = get_transient($key);
        $this->assertFalse($transient, __LINE__ . ") Transient {$key} returned data when it should not have");
    }



    /**
     * @group CacheStorageInterface
     */
    public function test_deleteMany()
    {
        // echo "\n\n** " . __LINE__ . ") " . __METHOD__ . '() **';
        $data = $this->generateRandomString();
        $tests = array(
            '_no_expiration_'        => 0,
            '_expires_in_5_minutes_' => 5 * MINUTE_IN_SECONDS,
            '_expires_in_1_hour_'    => HOUR_IN_SECONDS,
        );
        foreach ($tests as $test => $expiration) {
            // add transient with nearly identical name to confirm
            // that deletion does not target transients it shouldn't
            $added = set_transient($test, 'plz do not delete me', HOUR_IN_SECONDS);
            $this->assertTrue($added, __LINE__ . ") Transient {$test} was not added");
            for ($x = 0; $x < 4; $x++) {
                $key = __FUNCTION__ . $test . $x;
                $added = $this->cache_storage->add($key, $data, $expiration);
                $this->assertTrue($added, __LINE__ . ") Transient {$key} was not added");
                // assert that all transients exist
                $transient = $this->cache_storage->get($key);
                $this->assertEquals($data, $transient, __LINE__ . ") Transient {$key} returned incorrect data");
            }
        }
        // delete transients that expire in 5 minutes
        $this->cache_storage->deleteMany(array(__FUNCTION__ . '_expires_in_5_minutes_'));
        $results = array(
            '_no_expiration_'        => $data,
            '_expires_in_5_minutes_' => false,
            '_expires_in_1_hour_'    => $data,
        );
        foreach ($results as $test => $result) {
            for ($x = 0; $x < 4; $x++) {
                $key = __FUNCTION__ . $test . $x;
                $message = $result
                    ? "Transient {$key} does not exist when it should"
                    : "Transient {$key} exists when it should not";
                $this->assertEquals($result, get_transient($key), $message);
            }
            // now confirm our similarly named transients still exist
            $this->assertEquals(
                'plz do not delete me',
                get_transient($test),
                "Transient {$test} does not exist when it should"
            );
        }
    }



}
// End of file CacheStorageTest.php
// Location:/tests/testcases/core/services/cache/TransientCacheStorageTest.php