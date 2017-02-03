<?php
namespace EventEspresso\core\services\shortcodes;

use EventEspresso\core\domain\EnqueueAssetsInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoShortcode
 * base class for all EE shortcode classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class EspressoShortcode implements ShortcodeInterface
{

    /**
     * transient prefix
     *
     * @type string
     */
    const CACHE_TRANSIENT_PREFIX = 'ee_sc_';



    /**
     * enqueues scripts then processes the shortcode
     *
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     */
    final public function processShortcodeCallback($attributes = array())
    {
        if ($this instanceof EnqueueAssetsInterface) {
            if (is_admin()) {
                $this->enqueueAdminScripts();
            } else {
                $this->enqueueScripts();
            }
        }
        return $this->shortcodeContent((array)$attributes);
    }



    /**
     * If shortcode caching is enabled for the shortcode,
     * and cached results exist, then that will be returned
     * else new content will be generated.
     * If caching is enabled, then the new content will be cached for later.
     *
     * @param array $attributes
     * @return mixed|string
     * @throws \EE_Error
     */
    private function shortcodeContent(array $attributes)
    {
        $content = '';
        $cache_id = '';
        // how long should we cache this shortcode's content for? 0 means no caching.
        $cache_expiration = absint(
            apply_filters(
                'FHEE__EventEspresso_core_services_shortcodes_EspressoShortcode__shortcodeContent__cache_expiration',
                $this->cacheExpiration(),
                $this->getTag(),
                $this
            )
        );
        // is caching enabled for this shortcode ?
        if ($cache_expiration) {
            $cache_id = $this->shortcodeCacheID($attributes);
            $content = get_transient($cache_id);
        }
        // any existing content ?
        if (empty($content)) {
            // nope! let's generate some new stuff
            $content = $this->processShortcode($attributes);
            // save the new content if caching is enabled
            if ($cache_expiration) {
                set_transient($cache_id, $content, $cache_expiration);
            }
        }
        return $content;
    }



    /**
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     */
    private function shortcodeCacheID(array $attributes)
    {
        // try to get EE_Event any way we can
        $event = \EEH_Event_View::get_event();
        // then get some kind of ID
        if ($event instanceof \EE_Event) {
            $ID = $event->ID();
        } else {
            global $post;
            $ID = $post->ID;
        }
        return EspressoShortcode::CACHE_TRANSIENT_PREFIX . $ID . md5(wp_json_encode($attributes));
    }





}
// End of file EspressoShortcode.php
// Location: EventEspresso\core\services\shortcodes/EspressoShortcode.php