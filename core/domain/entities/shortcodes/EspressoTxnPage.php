<?php
namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Offsite_Gateway;
use EE_Payment_Method;
use EE_Payment_Processor;
use EE_Registry;
use EE_Transaction;
use EEM_Payment_Method;
use EEM_Transaction;
use EventEspresso\core\services\shortcodes\EspressoShortcode;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoTxnPage
 * ESPRESSO_TXN_PAGE shortcode
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EspressoTxnPage extends EspressoShortcode
{



    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_TXN_PAGE';
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
     * @throws \Exception
     * @throws \EE_Error
     */
    public function initializeShortcode()
    {
        $transaction = null;
        if (EE_Registry::instance()->REQ->is_set('e_reg_url_link')) {
            /** @var EEM_Transaction $EEM_Transaction */
            $EEM_Transaction = EE_Registry::instance()->load_model('Transaction');
            $transaction = $EEM_Transaction->get_transaction_from_reg_url_link();
        }
        if ($transaction instanceof EE_Transaction) {
            $payment_method = null;
            $payment_method_slug = EE_Registry::instance()->REQ->get('ee_payment_method', null);
            if ($payment_method_slug) {
                $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($payment_method_slug);
            }
            if ($payment_method instanceof EE_Payment_Method && $payment_method->is_off_site()) {
                $gateway = $payment_method->type_obj()->get_gateway();
                if (
                    $gateway instanceof EE_Offsite_Gateway
                    && $gateway->handle_IPN_in_this_request(
                        \EE_Registry::instance()->REQ->params(),
                        true
                    )
                ) {
                    /** @type EE_Payment_Processor $payment_processor */
                    $payment_processor = EE_Registry::instance()->load_core('Payment_Processor');
                    $payment_processor->process_ipn($_REQUEST, $transaction, $payment_method);
                }
            }
            //allow gateways to add a filter to stop rendering the page
            if (apply_filters('FHEE__EES_Espresso_Txn_Page__run__exit', false)) {
                exit;
            }
        }
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
        return esc_html__(
            'This is the Event Espresso Transactions page. This page receives instant payment notification (IPN) requests and should have a status of published, but should not be easily accessible by site visitors. Do not add it to your website\'s navigation menu or link to it from another page. Also, do not delete it or change its status to private.',
            'event_espresso'
        );
    }
}
// End of file EspressoTxnPage.php
// Location: EventEspresso\core\domain\entities\shortcodes/EspressoTxnPage.php