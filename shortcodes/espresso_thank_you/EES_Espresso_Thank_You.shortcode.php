<?php
/**
 * EES_Espresso_Thank_You
 *
 * @deprecated 4.9.27
 * @package     Event Espresso
 * @subpackage  /shortcodes/
 * @author      Brent Christensen
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Thank_You extends EES_Shortcode
{

    /**
     * time in seconds to wait for the IPN to arrive before telling the registrant to bugger off ( 1200s = 20 minutes )
     */
    const IPN_wait_time = 1200;




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
     * @return    void
     */
    public static function set_definitions()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @return    EE_Transaction
     */
    public function get_txn()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @param int $since
     * @return    mixed array of EE_Payment || FALSE
     */
    public function get_txn_payments($since = 0)
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @param    string $reg_url_link
     * @return void
     */
    public function set_reg_url_link($reg_url_link = null)
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @param    WP $WP
     * @return    void
     */
    public function run(WP $WP)
    {
    }



    /**
     * @deprecated 4.9.27
     * @return        void
     */
    protected function _translate_strings()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @return        void
     */
    public function load_js()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @return    void
     * @throws \EE_Error
     */
    public function init()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * @deprecated 4.9.27
     * @param    array $attributes
     * @return    string
     * @throws \EE_Error
     */
    public function process_shortcode($attributes = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }



    /**
     * @deprecated 4.9.27
     * @param array $response
     * @param array $data
     * @return    array
     * @throws \EE_Error
     */
    public static function thank_you_page_IPN_monitor($response = array(), $data = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }




    /**
     * @deprecated 4.9.27
     * @return    string
     * @throws \EE_Error
     */
    public function get_registration_details()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * resend_reg_confirmation_email
     *
     * @deprecated 4.9.27
     */
    public static function resend_reg_confirmation_email()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * get_ajax_content
     *
     * @deprecated 4.9.27
     * @return    void
     */
    public function get_ajax_content()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * display_details_for_events
     *
     * @deprecated 4.9.27
     * @param EE_Event[] $events
     * @return void
     */
    public function display_details_for_events($events = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * display_details_for_events_requiring_pre_approval
     *
     * @deprecated 4.9.27
     * @param EE_Event[] $events
     * @return void
     */
    public function display_details_for_events_requiring_pre_approval($events = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * get_transaction_details
     *
     * @deprecated 4.9.27
     * @return string
     * @throws \EE_Error
     */
    public function get_transaction_details()
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * get_payment_row_html
     *
     * @deprecated 4.9.27
     * @param    EE_Payment $payment
     * @return    string
     * @throws \EE_Error
     */
    public function get_payment_row_html($payment = null)
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * get_payment_details
     *
     * @deprecated 4.9.27
     * @param    array $payments
     * @return    string
     * @throws \EE_Error
     */
    public function get_payment_details($payments = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }



    /**
     * get_payment_details
     *
     * @deprecated 4.9.27
     * @param array $payments
     * @return    string
     * @throws \EE_Error
     */
    public function get_new_payments($payments = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoThankYou instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
    }
}
