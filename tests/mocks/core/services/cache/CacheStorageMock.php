<?php

namespace EventEspresso\tests\mocks\core\services\cache;

use EventEspresso\core\services\cache\CacheStorageInterface;
use stdClass;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CacheStorageMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\cache
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CacheStorageMock implements CacheStorageInterface
{

    /**
     * @var stdClass[] $storage
     */
    private $storage = array();


    /**
     * Saves supplied data
     * if an expiration is set, then it automatically schedules the cache for deletion
     *
     * @param string $key        [required]
     * @param string $data       [required]
     * @param int    $expiration number of seconds until the cache expires
     * @return bool
     */
    public function add($key, $data, $expiration = 0)
    {
        $this->storage[$key] = new stdClass();
        $this->storage[$key]->data = $data;
        $this->storage[$key]->expiration = $expiration;
        return true;
    }


    /**
     * retrieves cache data
     * should automatically trigger early cache refresh for standard cache items
     * in order to avoid cache stampedes on busy sites.
     * For non-standard cache items like PHP Session data where early refreshing is not wanted,
     * the $standard_cache parameter should be set to false when retrieving data
     *
     * @param string $key [required]
     * @param bool   $standard_cache
     * @return mixed
     */
    public function get($key, $standard_cache = true)
    {
        return $this->storage[$key]->expiration > time()
            ? $this->storage[$key]->data
            : null;
    }


    /**
     * delete a single cached item
     *
     * @param string $key [required] full or partial cache key to be deleted
     */
    public function delete($key)
    {
        unset($this->storage[$key]);
    }


    /**
     * delete multiple cached items
     *
     * @param array $keys [required] array of full or partial cache keys to be deleted
     */
    public function deleteMany(array $keys)
    {
        foreach ($keys as $key) {
            $this->delete($key);
        }
    }


}
// Location: CacheStorageMock.php
