<?php

/**
 * EES_Espresso_Cancelled
 *
 * @deprecated     4.9.27
 * @package        Event Espresso
 * @subpackage     /shortcodes/
 * @author         Brent Christensen
 */
class EES_Espresso_Cancelled extends EES_Shortcode
{

    /**
     * @deprecated 4.9.27
     * @return    void
     */
    public static function set_hooks()
    {
    }



    /**
     * @deprecated 4.9.27
     * @return    void
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
     * process_shortcode - ESPRESSO_CANCELLED
     *
     * @deprecated 4.9.27
     * @param        array $attributes
     * @return    string
     * @throws \EE_Error
     */
    public function process_shortcode($attributes = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoCancelled instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }
}
