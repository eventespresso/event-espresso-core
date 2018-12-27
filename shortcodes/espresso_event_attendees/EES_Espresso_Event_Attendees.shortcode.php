<?php
/**
 * Event Attendees shortcode class
 *
 * @deprecated 4.9.27
 * @package         Event Espresso
 * @subpackage      /shortcodes/
 * @author          Darren Ethier
 * @since           4.6.29
 */
class EES_Espresso_Event_Attendees extends EES_Shortcode
{


    /**
     * run - initial module setup
     *
     * @access    public
     * @param       WP $WP
     * @return    void
     */
    public function run(WP $WP)
    {
    }


    /**
     *  set_hooks - for hooking into EE Core, modules, etc
     *
     *  @access     public
     *  @return     void
     */
    public static function set_hooks()
    {
    }

    /**
     *  set_hooks_admin - for hooking into EE Admin Core, modules, etc
     *
     *  @access     public
     *  @return     void
     */
    public static function set_hooks_admin()
    {
    }



    /**
     * @deprecated 4.9.27
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     */
    public function process_shortcode($attributes = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendeesShortcode instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }
}
