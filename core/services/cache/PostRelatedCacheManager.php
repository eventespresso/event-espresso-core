<?php
namespace EventEspresso\core\services\cache;


defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class PostRelatedCacheManager
 * Tracks cached content for Posts and clears them when a post is updated
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.31
 */
class PostRelatedCacheManager extends BasicCacheManager
{

    /**
     * @type string
     */
    const POST_CACHE_PREFIX = 'ee_cache_post_';

    /**
     * wp-option option_name for tracking post related cache
     *
     * @type string
     */
    const POST_CACHE_OPTIONS_KEY = 'ee_post_cache';



    /**
     * PostRelatedCacheManager constructor.
     *
     * @param CacheStorageInterface      $cache_storage
     */
    public function __construct(CacheStorageInterface $cache_storage)
    {
        parent::__construct($cache_storage);
        add_action('save_post', array($this, 'clearPostRelatedCache'));
    }



    /**
     * returns a string that will be prepended to all cache identifiers
     *
     * @return string
     */
    public function cachePrefix()
    {
        return PostRelatedCacheManager::POST_CACHE_PREFIX;
    }


    /**
     * @return array
     */
    protected function getPostRelatedCache()
    {
        $post_related_cache = get_option(PostRelatedCacheManager::POST_CACHE_OPTIONS_KEY, array());
        // verify that cached data was not truncated or corrupted and no longer an array
        if (! is_array($post_related_cache))  {
            // uh-oh... let's get rid of any transients using our cache prefix
            $this->clear(PostRelatedCacheManager::CACHE_PREFIX);
            // then update the post related cache tracking option
            $post_related_cache = array();
            $this->updatePostRelatedCache($post_related_cache);
        }
        return $post_related_cache;
    }


    /**
     * @param array $post_related_cache
     */
    protected function updatePostRelatedCache(array $post_related_cache = array())
    {
        update_option(PostRelatedCacheManager::POST_CACHE_OPTIONS_KEY, $post_related_cache);
    }


    /**
     * If you are caching content that pertains to a Post of any type,
     * then it is recommended to pass the post id and cache id prefix to this method
     * so that it can be added to the post related cache tracking.
     * Then, whenever that post is updated, the cache will automatically be deleted,
     * which helps to ensure that outdated cache content will not be served
     *
     * @param int    $post_ID    [required]
     * @param string $id_prefix  [required] Appended to all cache IDs. Can be helpful in finding specific cache types.
     *                           May also be helpful to include an additional specific identifier,
     *                           such as a post ID as part of the $id_prefix so that individual caches
     *                           can be found and/or cleared. ex: "venue-28", or "shortcode-156".
     *                           BasicCacheManager::CACHE_PREFIX will also be prepended to the cache id.
     */
    public function clearPostRelatedCacheOnUpdate($post_ID, $id_prefix)
    {
        $post_related_cache = $this->getPostRelatedCache();
        // if post is not already being tracked
        if ( ! isset($post_related_cache[$post_ID])) {
            // add array to add cache ids to
            $post_related_cache[$post_ID] = array();
        }
        if( ! in_array($id_prefix, $post_related_cache[$post_ID], true)) {
            // add cache id to be tracked
            $post_related_cache[$post_ID][] = $id_prefix;
            $this->updatePostRelatedCache($post_related_cache);
        }
    }



    /**
     * callback hooked into the WordPress "save_post" action
     * deletes any cache content associated with the post
     *
     * @param int $post_ID [required]
     */
    public function clearPostRelatedCache($post_ID)
    {
        $post_related_cache = $this->getPostRelatedCache();
        // if post is not being tracked
        if ( ! isset($post_related_cache[$post_ID])) {
            // let's clean up some of the duplicate IDs that were getting added
            foreach ($post_related_cache as $other_post_ID => $cache_IDs) {
                //remove duplicates
                $post_related_cache[$other_post_ID] = array_unique($post_related_cache[$other_post_ID]);
            }
            $this->updatePostRelatedCache($post_related_cache);
            return;
        }
        // get cache id prefixes for post, and delete their corresponding transients
        $this->clear($post_related_cache[$post_ID]);
        unset($post_related_cache[$post_ID]);
        $this->updatePostRelatedCache($post_related_cache);
    }


}
// End of file PostRelatedCacheManager.php
// Location: EventEspresso\core\services\cache/PostRelatedCacheManager.php
