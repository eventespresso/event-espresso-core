<?php
namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Registry;
use EventEspresso\core\services\shortcodes\EspressoShortcode;
use WP_Post;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoThankYou
 * ESPRESSO_THANK_YOU shortcode
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EspressoThankYou extends EspressoShortcode
{

    /**
     * @var boolean $is_thank_you_page
     */
    private $is_thank_you_page = false;

    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_THANK_YOU';
    }



    /**
     * the time in seconds to cache the results of the processShortcode() method
     * 0 means the processShortcode() results will NOT be cached at all
     *
     * @return int
     */
    public function cacheExpiration()
    {
        return 0;
    }


    /**
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * @return void
     * @throws \EE_Error
     */
    public function initializeShortcode()
    {
        global $wp_query;
        if (empty($wp_query->posts) || count($wp_query->posts) > 1) {
            return;
        }
        $post = reset($wp_query->posts);
        if ( ! $post instanceof WP_Post || $post->ID !== EE_Registry::instance()->CFG->core->thank_you_page_id ) {
            return;
        }
        $this->is_thank_you_page = true;
        \EED_Thank_You_Page::instance()->load_resources();
        $this->shortcodeHasBeenInitialized();
    }



    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     */
    public function processShortcode($attributes = array())
    {
        return $this->is_thank_you_page
            ? \EED_Thank_You_Page::instance()->thank_you_page_results()
            : '';
    }



}
// End of file EspressoThankYou.php
// Location: EventEspresso\core\domain\entities\shortcodes/EspressoThankYou.php