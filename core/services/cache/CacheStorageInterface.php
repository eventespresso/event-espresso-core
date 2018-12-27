<?php
namespace EventEspresso\core\services\cache;

/**
 * Manages the creation and deletion of cached data
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.31
 */
interface CacheStorageInterface
{

    /**
     * Saves supplied data
     * if an expiration is set, then it automatically schedules the cache for deletion
     *
     * @param string $key        [required]
     * @param string $data       [required]
     * @param int    $expiration number of seconds until the cache expires
     * @return bool
     */
    public function add($key, $data, $expiration = 0);



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
    public function get($key, $standard_cache = true);



    /**
     * delete a single cached item
     *
     * @param string $key [required] full or partial cache key to be deleted
     */
    public function delete($key);



    /**
     * delete multiple cached items
     *
     * @param array $keys           [required] array of full or partial cache keys to be deleted
     * @param bool  $force_delete   [optional] if true, then will not check incoming keys against those being tracked
     *                              and proceed directly to deleting those entries from the cache storage
     * @return
     */
    public function deleteMany(array $keys, $force_delete = false);
}
