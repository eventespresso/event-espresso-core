<?php

namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Registry;
use EED_Single_Page_Checkout;
use EventEspresso\core\services\shortcodes\EspressoShortcode;

/**
 * Class EspressoCheckout
 * ESPRESSO_CHECKOUT shortcode for connecting with SPCO
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.26
 */
class EspressoCheckout extends EspressoShortcode
{


    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_CHECKOUT';
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
        EED_Single_Page_Checkout::init($wp_query);
        $this->shortcodeHasBeenInitialized();
    }


    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     */
    public function processShortcode($attributes = array())
    {
        return EE_Registry::instance()->REQ->get_output();
    }
}
