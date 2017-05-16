<?php
namespace EventEspresso\core\services\cache;

use Closure;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * CacheManagerInterface
 * Controls the creation and deletion of cached content
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.31
 */
interface CacheManagerInterface
{

    /**
     * returns a string that will be prepended to all cache identifiers
     *
     * @return string
     */
    public function cachePrefix();



    /**
     * @param string  $id_prefix [required] Prepended to all cache IDs. Can be helpful in finding specific cache types.
     *                           May also be helpful to include an additional specific identifier,
     *                           such as a post ID as part of the $id_prefix so that individual caches
     *                           can be found and/or cleared. ex: "venue-28", or "shortcode-156".
     *                           BasicCacheManager::CACHE_PREFIX will also be prepended to the cache id.
     * @param string  $cache_id  [required] Additional identifying details that make this cache unique.
     *                           It is advisable to use some of the actual data
     *                           that is used to generate the content being cached,
     *                           in order to guarantee that the cache id is unique for that content.
     *                           The cache id will be md5'd before usage to make it more db friendly,
     *                           and the entire cache id string will be truncated to 190 characters.
     * @param Closure $callback  [required] since the point of caching is to avoid generating content when not
     *                           necessary,
     *                           we wrap our content creation in a Closure so that it is not executed until needed.
     * @param int     $expiration
     * @return Closure|mixed
     */
    public function get($id_prefix, $cache_id, Closure $callback, $expiration = HOUR_IN_SECONDS);



    /**
     * @param array|string $cache_id [required] Could be an ID prefix affecting many caches
     *                               or a specific ID targeting a single cache item
     * @return void
     */
    public function clear($cache_id);

}
// End of file CacheManagerInterface.php
// Location: core/services/cache/CacheManagerInterface.php
