<?php
namespace EventEspresso\core\services\cache;

use Closure;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CacheManager
 * Description
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
     * @type boolean
     */
    const DEBUG = true;



    /**
     * CacheManager constructor.
     */
    public function __construct()
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        // only perform during regular admin requests
        if(( ! defined('DOING_AJAX') || ! DOING_AJAX) && is_admin()){
            add_action('shutdown', array($this, 'clearExpiredCache'));
        }
    }



    /**
     * @param string  $id_prefix Appended to all cache IDs. Can be helpful in finding specific cache types.
     *                           May also be helpful to include an additional specific identifier,
     *                           such as a post ID as part of the $id_prefix so that individual caches
     *                           can be found and/or cleared. ex: "venue-28", or "shortcode-156".
     *                           CacheManager::CACHE_TRANSIENT_PREFIX will also be appended to the cache id.
     * @param string  $cache_id  Additional identifying details that make this cache unique.
     *                           It is advisable to use some of the actual data
     *                           that is used to generate the content being cached,
     *                           in order to guarantee that the cache id is unique for that content.
     *                           The cache id will be md5'd before usage to make it more db friendly,
     *                           and the entire cache id string will be truncated to 190 characters.
     * @param Closure $callback
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
        $cache_id = substr(CacheManager::CACHE_TRANSIENT_PREFIX . $id_prefix . '-' . md5($cache_id), 0, 191);
        // is caching enabled for this shortcode ?
        if ($expiration) {
            $content = get_transient($cache_id);
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
                set_transient($cache_id, $content, $expiration);
            }
        } else {
            if (CacheManager::DEBUG) {
                \EEH_Debug_Tools::printr($cache_id, 'CACHED CONTENT', __FILE__, __LINE__);
            }
        }
        return $content;
    }




}
// End of file CacheManager.php
// Location: EventEspresso\core\services\cache/CacheManager.php