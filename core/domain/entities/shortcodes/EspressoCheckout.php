<?php
namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Config;
use EE_Registry;
use EventEspresso\core\services\shortcodes\EspressoShortcode;
use WP_Post;
use WP_Query;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
     * Shortcodes constructor.
     */
    public function __construct()
    {
        add_action('parse_query', array($this, 'isCheckoutPage'));
    }


    public function isCheckoutPage(WP_Query $wp_query)
    {
        if (
            isset($wp_query->queried_object)
            && $wp_query->queried_object instanceof WP_Post
            && $wp_query->queried_object->ID === EE_Config::instance()->core->reg_page_id
        ) {
            // hook into the top of pre_get_posts to set the reg step routing, which gives other modules or plugins a chance to modify the reg steps, but just before the routes get called
            add_action('pre_get_posts', array('EED_Single_Page_Checkout', 'load_reg_steps'), 1);
            // this will trigger the EED_Single_Page_Checkout module's run() method during the pre_get_posts hook point,
            // this allows us to initialize things, enqueue assets, etc,
            add_action('pre_get_posts', array('EED_Single_Page_Checkout', 'init'), 10, 1);
        }
    }



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
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * @return void
     * @throws \EE_Error
     */
    public function initialize()
    {
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
// End of file EspressoCheckout.php
// Location: EventEspresso\core\domain\entities\shortcodes/EspressoCheckout.php