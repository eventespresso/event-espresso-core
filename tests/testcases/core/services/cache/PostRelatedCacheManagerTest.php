<?php

use EventEspresso\core\services\cache\PostRelatedCacheManager;
use EventEspresso\tests\mocks\core\services\cache\CacheStorageMock;
use EventEspresso\tests\mocks\core\services\cache\PostRelatedCacheManagerMock;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class PostRelatedCacheManagerTest
 * Description
 *
 * @package EventEspresso\tests\testcases\core\services\cache
 * @author  Brent Christensen
 * 
 */
class PostRelatedCacheManagerTest extends EE_UnitTestCase
{


    /**
     * @var PostRelatedCacheManagerMock $cache_manager
     */
    protected $cache_manager;



    public function set_up()
    {
        parent::set_up();
        $this->cache_manager = new PostRelatedCacheManagerMock(
            new CacheStorageMock()
        );
    }


    private function getPostRelatedCache()
    {
        return (array)get_option(PostRelatedCacheManager::POST_CACHE_OPTIONS_KEY, array());
    }


    private function updatePostRelatedCache(array $mock_cache = array())
    {
        update_option(PostRelatedCacheManager::POST_CACHE_OPTIONS_KEY, $mock_cache);
    }


    public function testCachePrefix()
    {
        $this->assertEquals('ee_cache_post_', $this->cache_manager->cachePrefix());
    }


    public function testGetPostRelatedCache()
    {
        $this->updatePostRelatedCache(array(123 => array('MOCK_CACHE')));
        $mock_cache = $this->cache_manager->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
        // now test what happens if the cache is corrupted (need to update option directly)
        update_option(PostRelatedCacheManager::POST_CACHE_OPTIONS_KEY, 'i am not serialized data');
        $this->assertEmpty($this->cache_manager->getPostRelatedCache());
    }


    public function testUpdatePostRelatedCache()
    {
        // first save nothing to the cache
        $this->updatePostRelatedCache();
        $this->assertEmpty($this->getPostRelatedCache());
        //  then add our mock cache and verify
        $this->cache_manager->updatePostRelatedCache(array(123 => array('MOCK_CACHE')));
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
    }


    public function testClearPostRelatedCacheOnUpdate()
    {
        $this->updatePostRelatedCache();
        $this->assertEmpty($this->getPostRelatedCache());
        $this->cache_manager->clearPostRelatedCacheOnUpdate(123, 'MOCK_CACHE');
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
        // now try adding a duplicate, which should not happen
        $this->cache_manager->clearPostRelatedCacheOnUpdate(123, 'MOCK_CACHE');
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
    }


    public function testClearPostRelatedCache()
    {
        $this->updatePostRelatedCache(array(123 => array('MOCK_CACHE')));
        // first assert that the above exists as expected
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
        // now clear it
        $this->cache_manager->clearPostRelatedCache(123);
        $this->assertEmpty($this->getPostRelatedCache());
        // now add a bunch of duplicated garbage
        $this->updatePostRelatedCache(
            array(
                123 => array(
                    0 => 'MOCK_CACHE',
                    1 => 'MOCK_CACHE',
                    2 => 'MOCK_CACHE',
                    3 => 'MOCK_CACHE',
                    4 => 'MOCK_CACHE',
                    5 => 'MOCK_CACHE',
                )
            )
        );
        // and assert that the above exists as expected
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(6, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
        // now attempt to clear another post ID that doesn't exist, which should clear duplicates
        $this->cache_manager->clearPostRelatedCache(456);
        $mock_cache = $this->getPostRelatedCache();
        $this->assertCount(1, $mock_cache);
        $this->assertArrayHasKey(123, $mock_cache);
        $this->assertCount(1, $mock_cache[123]);
        $this->assertArrayContains('MOCK_CACHE', $mock_cache[123]);
    }

}
// Location: tests/testcases/core/services/cache/PostRelatedCacheManagerTest.php
