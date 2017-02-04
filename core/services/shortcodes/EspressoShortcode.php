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
        return $this->shortcodeContent(
            $this->sanitizeAttributes((array)$attributes)
        );
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



    /**
     * array for defining custom attribute sanitization callbacks,
     * where keys match keys in your attributes array,
     * and values represent the sanitization function you wish to be applied to that attribute.
     * So for example, if you had an integer attribute named "event_id"
     * that you wanted to be sanitized using absint(),
     * then you would return the following:
     *      array('event_id' => 'absint')
     * Entering 'skip_sanitization' for the callback value
     * means that no sanitization will be applied
     * on the assumption that the attribute
     * will be sanitized at some point... right?
     * You wouldn't pass around unsanitized attributes would you?
     * That would be very Tom Foolery of you!!!
     *
     * @return array
     */
    protected function customAttributeSanitizationMap()
    {
        return array();
    }



    /**
     * Performs basic sanitization on shortcode attributes
     * Since incoming attributes from the shortcode usage in the WP editor will all be strings,
     * most attributes will by default be sanitized using the sanitize_text_field() function.
     * This can be overridden using the customAttributeSanitizationMap() method (see above),
     * all other attributes would be sanitized using the defaults in the switch statement below
     *
     * @param array $attributes
     * @return array
     */
    private function sanitizeAttributes(array $attributes)
    {
        $custom_sanitization = $this->customAttributeSanitizationMap();
        foreach ($attributes as $key => $value) {
            // is a custom sanitization callback specified ?
            if (isset($custom_sanitization[$key])) {
                $callback = $custom_sanitization[$key];
                if ($callback === 'skip_sanitization') {
                    $attributes[$key] = $value;
                    continue;
                } else if (function_exists($callback)) {
                    $attributes[$key] = $callback($value);
                    continue;
                }
            }
            switch (true) {
                case $value === null :
                case is_int($value) :
                case is_float($value) :
                    // typical booleans
                case in_array($value, array(true, 'true', '1', 'on', 'yes', false, 'false', '0', 'off', 'no'), true) :
                    $attributes[$key] = $value;
                    break;
                case is_string($value) :
                    $attributes[$key] = sanitize_text_field($value);
                    break;
                case is_array($value) :
                    $attributes[$key] = $this->sanitizeAttributes($value);
                    break;
                default :
                    // only remaining data types are Object and Resource
                    // which are not allowed as shortcode attributes
                    $attributes[$key] = null;
                    break;
            }
        }
        return $attributes;
    }



}
// End of file EspressoShortcode.php
// Location: EventEspresso\core\services\shortcodes/EspressoShortcode.php