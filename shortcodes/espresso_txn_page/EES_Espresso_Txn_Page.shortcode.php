<?php
/**
 * EES_Espresso_Txn_Page
 *
 * @deprecated 4.9.27
 * @package     Event Espresso
 * @subpackage  /shortcodes/
 * @author      Brent Christensen
 */
class EES_Espresso_Txn_Page extends EES_Shortcode
{


    /**
     * @deprecated 4.9.27
     * @return  void
     */
    public static function set_hooks()
    {
    }

    /**
     * @deprecated 4.9.27
     * @return  void
     */
    public static function set_hooks_admin()
    {
    }



    /**
     * @deprecated 4.9.27
     * @return  void
     */
    public static function set_definitions()
    {
    }



    /**
     * @deprecated 4.9.27
     * @param  WP $WP
     * @return void
     * @throws \Exception
     * @throws \EE_Error
     */
    public function run(WP $WP)
    {
    }




    /**
     * @deprecated 4.9.27
     * @param array $attributes
     * @return string
     */
    public function process_shortcode($attributes = array())
    {
        return __('This is the Event Espresso Transactions page. This page receives instant payment notification (IPN) requests and should have a status of published, but should not be easily accessible by site visitors. Do not add it to your website\'s navigation menu or link to it from another page. Also, do not delete it or change its status to private.', 'event_espresso');
    }
}
