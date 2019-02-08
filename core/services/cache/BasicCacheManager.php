<?php

namespace EventEspresso\core\services\cache;

use Closure;

/**
 * Class BasicCacheManager
 * Controls the creation and deletion of cached content
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.31
 */
class BasicCacheManager implements CacheManagerInterface
{

    /**
     * @type string
     */
    const CACHE_PREFIX = 'ee_cache_';


    /**
     * @var CacheStorageInterface $cache_storage
     */
    private $cache_storage;


    /**
     * BasicCacheManager constructor.
     *
     * @param CacheStorageInterface $cache_storage [required]
     */
    public function __construct(CacheStorageInterface $cache_storage)
    {
        $this->cache_storage = $cache_storage;
    }


    /**
     * returns a string that will be prepended to all cache identifiers
     *
     * @return string
     */
    public function cachePrefix()
    {
        return BasicCacheManager::CACHE_PREFIX;
    }


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
    public function get($id_prefix, $cache_id, Closure $callback, $expiration = HOUR_IN_SECONDS)
    {
        $content = '';
        $expiration = absint(
            apply_filters(
                'FHEE__CacheManager__get__cache_expiration',
                $expiration,
                $id_prefix,
                $cache_id
            )
        );
        $cache_id = $this->generateCacheIdentifier($id_prefix, $cache_id);
        // is caching enabled for this content ?
        if ($expiration) {
            $content = $this->cache_storage->get($cache_id);
        }
        // any existing content ?
        if (empty($content)) {
            // nope! let's generate some new stuff
            $content = $callback();
            // save the new content if caching is enabled
            if ($expiration) {
                $this->cache_storage->add($cache_id, $content, $expiration);
                if (EE_DEBUG) {
                    $content .= $this->displayCacheNotice($cache_id, 'REFRESH CACHE');
                }
            }
        } else {
            if (EE_DEBUG) {
                $content .= $this->displayCacheNotice($cache_id, 'CACHED CONTENT');
            }
        }
        return $content;
    }


    /**
     * Generates a unique identifier string for the cache
     *
     * @param string $id_prefix [required] see BasicCacheManager::get()
     * @param string $cache_id  [required] see BasicCacheManager::get()
     * @return string
     */
    private function generateCacheIdentifier($id_prefix, $cache_id)
    {
        // let's make the cached content unique for this "page"
        $cache_id .= filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL);
        // with these parameters
        $cache_id .= filter_input(INPUT_SERVER, 'QUERY_STRING', FILTER_SANITIZE_URL);
        // then md5 the above to control it's length, add all of our prefixes, and truncate
        return substr($this->cachePrefix() . $id_prefix . '-' . md5($cache_id), 0, 182);
    }


    /**
     * @param array|string $cache_id [required] Could be an ID prefix affecting many caches
     *                               or a specific ID targeting a single cache item
     * @return void
     */
    public function clear($cache_id)
    {
        // ensure incoming arg is in an array
        $cache_id = is_array($cache_id) ? $cache_id : array($cache_id);
        // delete corresponding transients for the supplied id prefix
        $this->cache_storage->deleteMany($cache_id);
    }


    /**
     * @param array|string $cache_id [required] Could be an ID prefix affecting many caches
     *                               or a specific ID targeting a single cache item
     * @param string       $type
     * @return string
     */
    private function displayCacheNotice($cache_id, $type)
    {
        return '
<div class="ee-cached-content-notice" style="position:fixed; bottom:0; left: 0;">
    <p style="font-size:9px;font-weight:normal;color:#666;line-height: 12px;margin:0 0 3px 5px">
        <b>' . $type . '</b><span style="color:#999"> : </span>
        <span>' . $cache_id . '</span>
        <span style="margin-left:2em;">' . __FILE__ . '</span>
    </p>
</div>';
    }
}
