<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * EES_Espresso_Cancelled
 *
 * @deprecated     4.9.26
 * @package        Event Espresso
 * @subpackage     /shortcodes/
 * @author         Brent Christensen
 */
class EES_Espresso_Cancelled extends EES_Shortcode
{

    /**
     * @deprecated 4.9.26
     * @return    void
     */
    public static function set_hooks()
    {
    }



    /**
     * @deprecated 4.9.26
     * @return    void
     */
    public static function set_hooks_admin()
    {
    }



    /**
     * @deprecated 4.9.26
     * @param WP $WP
     * @return    void
     */
    public function run(WP $WP)
    {
    }



    /**
     * process_shortcode - ESPRESSO_CANCELLED
     *
     * @deprecated 4.9.26
     * @param        array $attributes
     * @return    string
     * @throws \EE_Error
     */
    public function process_shortcode($attributes = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoCancelled::processShortcode() instead.',
                'event_espresso'
            ),
            '4.9.26'
        );
        $shortcode = new \EventEspresso\core\domain\entities\shortcodes\EspressoCancelled();
        return $shortcode->processShortcode($attributes);
    }

}
// End of file EES_Espresso_Cancelled.shortcode.php
// Location: /shortcodes/EES_Espresso_Cancelled.shortcode.php