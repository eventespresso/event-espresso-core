<?php
/**
 * ESPRESSO_EVENTS
 *
 * @deprecated  4.9.27
 * @package     Event Espresso
 * @subpackage  /shortcodes/
 * @author      Brent Christensen
 */
class EES_Espresso_Events extends EES_Shortcode
{

    /**
     * @deprecated 4.9.27
     *  @return     void
     */
    public static function set_hooks()
    {
    }

    /**
     * @deprecated 4.9.27
     *  @return     void
     */
    public static function set_hooks_admin()
    {
    }



    /**
     * @deprecated 4.9.27
     * @param WP $WP
     * @return    void
     */
    public function run(WP $WP)
    {
    }



    /**
     * @deprecated 4.9.27
     *  @param  array   $attributes
     *  @return     string
     */
    public function process_shortcode($attributes = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoEvents instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }
}
