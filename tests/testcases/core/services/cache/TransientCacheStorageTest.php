<?php
use EventEspresso\core\services\cache\TransientCacheStorage;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CacheStorageTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class TransientCacheStorageTest extends EE_UnitTestCase
{


    /**
     * @var TransientCacheStorage $cache_storage
     */
    protected $cache_storage;



    public function setUp()
    {
        $this->cache_storage = new \EventEspresso\core\services\cache\TransientCacheStorage();
        parent::setUp();
    }



    public function tearDown()
    {
        parent::tearDown();
        $this->cache_storage = null;
    }



    public function test_add() {
        $key = __FUNCTION__;
        $data = wp_json_encode($this);
        $this->cache_storage->add($key, $data);
        $transient = get_transient($key);
        $this->assertEquals($data, $transient);
        // now test expiration
        $key = __FUNCTION__ . '_expires_in_1_second';
        $this->cache_storage->add($key, $data, 1);
        // wait 2 seconds
        usleep(200000);
        $transient = get_transient($key);
        $this->assertFalse($data, $transient);
    }



    public function test_get()
    {
        $key = __FUNCTION__;
        $data = wp_json_encode($this);
        set_transient($key, $data);
        $transient = $this->cache_storage->get($key);
        $this->assertEquals($data, $transient);
        // now test expiration
        $key = __FUNCTION__ . '_expires_in_1_second';
        set_transient($key, $data, 1);
        // wait 2 seconds
        usleep(200000);
        $transient = $this->cache_storage->get($key);
        $this->assertFalse($data, $transient);
        // now test standard cache early expiration
        $key = __FUNCTION__ . '_expires_in_60_seconds';
        set_transient($key, $data, 60);
        // wait 2 seconds
        usleep(200000);
        $transient = $this->cache_storage->get($key);
        // should be false because this request should trigger cache regeneration
        // BEFORE the cache actually expires in roughly 58 seconds
        $this->assertFalse($data, $transient);
        // now attempt to retrieve the cache again
        $transient = $this->cache_storage->get($key);
        // second request should receive the cached content that still exists from before
        // therefore avoiding a cache stampede,
        // (assuming the previous get() can regenerate the content in time)
        $this->assertEquals($data, $transient);
        // now test with standard cache early expiration turned off
        $key = __FUNCTION__ . '_dont_delete_my_early';
        set_transient($key, $data, 60);
        // wait 2 seconds
        usleep(200000);
        $transient = $this->cache_storage->get($key);
        // cached content should be returned despite expiration being less than 60 seconds
        // therefore avoiding a cache stampede,
        // (assuming the previous get() can regenerate the content in time)
        $this->assertEquals($data, $transient);
    }



    public function test_delete()
    {
        $key = __FUNCTION__;
        $data = wp_json_encode($this);
        set_transient($key, $data);
        $this->cache_storage->delete($key);
        $transient = get_transient($key);
        $this->assertFalse($data, $transient);
    }



    public function test_deleteMany()
    {
        $data = wp_json_encode($this);
        $tests = array(
            '_no_expiration_'        => 0,
            '_expires_in_5_minutes_' => 5 * MINUTE_IN_SECONDS,
            '_expires_in_1_hour_'    => HOUR_IN_SECONDS,
        );
        foreach ($tests as $test => $expiration) {
            for ($x = 0; $x < 4; $x++) {
                $key = __FUNCTION__ . $test . $x;
                set_transient($key, $data, $expiration);
                // assert that all transients exist
                $transient = $this->cache_storage->get($key);
                $this->assertEquals($data, $transient);
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
        }
    }



}
// End of file CacheStorageTest.php
// Location:/tests/testcases/core/services/cache/TransientCacheStorageTest.php