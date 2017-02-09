<?php
namespace EventEspresso\core\services\cache;

use Closure;
use EventEspresso\core\services\database\TransientManager;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CacheManager
 * Controls the creation and deletion of cached content
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CacheManager
{

    /**
     * transient prefix
     *
     * @type string
     */
    const CACHE_TRANSIENT_PREFIX = 'ee_cache_';

    /**
     * wp-option option_name for tracking post related cache
     *
     * @type string
     */
    const POST_CACHE_OPTIONS_KEY = 'ee_post_cache';

    /**
     * set to true to monitor when content is being served from cache or not
     *
     * @type boolean
     */
    const DEBUG = true;

    /**
     * @var TransientManager $transient_manager
     */
    private $transient_manager;



    /**
     * CacheManager constructor.
     *
     * @param TransientManager $expired_transient_manager [required]
     */
    public function __construct(TransientManager $expired_transient_manager)
    {
        $this->transient_manager = $expired_transient_manager;
        add_action('save_post', array($this, 'clearPostRelatedCache'));
    }



    /**
     * @param string  $id_prefix [required] Appended to all cache IDs. Can be helpful in finding specific cache types.
     *                           May also be helpful to include an additional specific identifier,
     *                           such as a post ID as part of the $id_prefix so that individual caches
     *                           can be found and/or cleared. ex: "venue-28", or "shortcode-156".
     *                           CacheManager::CACHE_TRANSIENT_PREFIX will also be appended to the cache id.
     * @param string  $cache_id  [required] Additional identifying details that make this cache unique.
     *                           It is advisable to use some of the actual data
     *                           that is used to generate the content being cached,
     *                           in order to guarantee that the cache id is unique for that content.
     *                           The cache id will be md5'd before usage to make it more db friendly,
     *                           and the entire cache id string will be truncated to 190 characters.
     * @param Closure $callback  [required] since the point of caching is to avoid generating content when not
     *                           necessary,
     *                           we wrap our content creation in a Closure so that it is not executed until needed.
     * @param int $expiration
     * @return Closure|mixed
     */
    public function getCachedContent($id_prefix, $cache_id, Closure $callback, $expiration = HOUR_IN_SECONDS)
    {
        $content = '';
        // how long should we cache this shortcode's content for? 0 means no caching.
        $expiration = absint(
            apply_filters(
                'FHEE__EventEspresso_core_services_shortcodes_EspressoShortcode__shortcodeContent__cache_expiration',
                $expiration,
                $id_prefix,
                $cache_id
            )
        );
        $cache_id = substr(CacheManager::CACHE_TRANSIENT_PREFIX . $id_prefix . '-' . md5($cache_id), 0, 182);
        // is caching enabled for this shortcode ?
        if ($expiration) {
            $content = $this->transient_manager->getTransient($cache_id);
        }
        // any existing content ?
        if (empty($content)) {
            // nope! let's generate some new stuff
            $content = $callback();
            // save the new content if caching is enabled
            if ($expiration) {
                if (CacheManager::DEBUG) {
                    \EEH_Debug_Tools::printr($cache_id, 'REFRESH CACHE', __FILE__, __LINE__);
                }
                $this->transient_manager->addTransient($cache_id, $content, $expiration);
            }
        } else {
            if (CacheManager::DEBUG) {
                \EEH_Debug_Tools::printr($cache_id, 'CACHED CONTENT', __FILE__, __LINE__);
            }
        }
        return $content;
    }



    /**
     * If you are caching content that pertains to a Post of any type,
     * then it is recommended to pass the post id and cache id prefix to this method
     * so that it can be added to the post related cache tracking.
     * Then, whenever that post is updated, the cache will automatically be deleted,
     * which helps to ensure that outdated cache content will not be served
     *
     * @param int $post_ID       [required]
     * @param string $id_prefix  [required] Appended to all cache IDs. Can be helpful in finding specific cache types.
     *                           May also be helpful to include an additional specific identifier,
     *                           such as a post ID as part of the $id_prefix so that individual caches
     *                           can be found and/or cleared. ex: "venue-28", or "shortcode-156".
     *                           CacheManager::CACHE_TRANSIENT_PREFIX will also be appended to the cache id.
     */
    public function clearPostRelatedCacheOnUpdate($post_ID, $id_prefix)
    {
        $post_related_cache = (array) get_option(CacheManager::POST_CACHE_OPTIONS_KEY, array());
        // if post is not already being tracked
        if( ! isset($post_related_cache[ $post_ID ])){
            // add array to add cache ids to
            $post_related_cache[ $post_ID ] = array();
        }
        // add cache id to be tracked
        $post_related_cache[ $post_ID ][] = $id_prefix;
        update_option(CacheManager::POST_CACHE_OPTIONS_KEY, $post_related_cache);
    }



    /**
     * callback hooked into the WordPress "save_post" action
     * deletes any cache content associated with the post
     *
     * @param int $post_ID [required]
     */
    public function clearPostRelatedCache($post_ID)
    {
        $post_related_cache = (array)get_option(CacheManager::POST_CACHE_OPTIONS_KEY, array());
        // if post is not being tracked
        if ( ! isset($post_related_cache[ $post_ID ])) {
            return;
        }
        // get cache id prefixes for post, and delete their corresponding transients
        $this->transient_manager->deleteTransients((array)$post_related_cache[ $post_ID ]);
        unset($post_related_cache[ $post_ID ]);
        update_option(CacheManager::POST_CACHE_OPTIONS_KEY, $post_related_cache);
    }

}
// End of file CacheManager.php
// Location: EventEspresso\core\services\cache/CacheManager.php