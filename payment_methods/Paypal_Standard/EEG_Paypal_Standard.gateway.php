<?php

use EventEspresso\core\exceptions\IpnException;
use EventEspresso\payment_methods\Paypal_Standard\ItemizedOrder;

/**
 * EEG_Paypal_Standard
 *
 * Note: one important feature of the Paypal Standard Gateway is that it can allow
 * Paypal itself to calculate taxes and shipping on an order, and then when the IPN
 * for the payment is received from Paypal, this class will update the line items
 * accordingly (also bearing in mind that this could be a payment re-attempt, in
 * which case Paypal shouldn't add shipping or taxes twice).
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Mike Nelson
 *
 */
class EEG_Paypal_Standard extends EE_Offsite_Gateway
{

    /**
     * Name for the wp option used to save the itemized payment
     */
    const itemized_payment_option_name = '_itemized_payment';

    protected $_paypal_id;

    protected $_image_url;

    protected $_shipping_details;

    protected $_paypal_shipping;

    protected $_paypal_taxes;

    protected $_gateway_url;

    protected $_currencies_supported = array(
        'USD',
        'GBP',
        'CAD',
        'AUD',
        'BRL',
        'CHF',
        'CZK',
        'DKK',
        'EUR',
        'HKD',
        'HUF',
        'ILS',
        'JPY',
        'MXN',
        'MYR',
        'NOK',
        'NZD',
        'PHP',
        'PLN',
        'SEK',
        'SGD',
        'THB',
        'TRY',
        'TWD',
        'RUB'
    );

    /**
     * @var ItemizedOrder
     * @since $VID:$
     */
    protected $itemized_order;


    /**
     * EEG_Paypal_Standard constructor.
     */
    public function __construct()
    {
        $this->set_uses_separate_IPN_request(true);
        parent::__construct();
    }


    /**
     * @return mixed
     */
    public function gatewayUrl()
    {
        return $this->_gateway_url;
    }


    /**
     * @return mixed
     */
    public function imageUrl()
    {
        return $this->_image_url;
    }


    /**
     * @return mixed
     */
    public function paypalId()
    {
        return $this->_paypal_id;
    }


    /**
     * @return mixed
     */
    public function paypalShipping()
    {
        return $this->_paypal_shipping;
    }



    /**
     * @return mixed
     */
    public function paypalTaxes()
    {
        return $this->_paypal_taxes;
    }


    /**
     * @return mixed
     */
    public function shippingDetails()
    {
        return $this->_shipping_details;
    }


    /**
     * Also sets the gateway url class variable based on whether debug mode is enabled or not.
     *
     * @param array $settings_array
     */
    public function set_settings($settings_array)
    {
        parent::set_settings($settings_array);
        $this->_gateway_url = $this->_debug_mode
            ? 'https://www.sandbox.paypal.com/cgi-bin/webscr'
            : 'https://www.paypal.com/cgi-bin/webscr';
    }


    /**
     * @param EEI_Payment $payment      the payment to process
     * @param array       $billing_info but should be empty for this gateway
     * @param string      $return_url   URL to send the user to after payment on the payment provider's website
     * @param string      $notify_url   URL to send the instant payment notification
     * @param string      $cancel_url   URL to send the user to after a cancelled payment attempt
     *                                  on the payment provider's website
     * @return EEI_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_redirection_info(
        $payment,
        $billing_info = array(),
        $return_url = null,
        $notify_url = null,
        $cancel_url = null
    ) {
        $this->itemized_order = new ItemizedOrder($this->_get_gateway_formatter(), $this);
        $redirect_args = apply_filters(
            "FHEE__EEG_Paypal_Standard__set_redirection_info__arguments",
            $this->itemized_order->generateItemizedOrderForPayment(
                $payment,
                $return_url,
                $notify_url,
                $cancel_url
            ),
            $this
        );

        $payment->set_redirect_url($this->_gateway_url);
        $payment->set_redirect_args($redirect_args);
        // log the results
        $this->log(
            [
                'message'     => esc_html__('PayPal payment request initiated.', 'event_espresso'),
                'transaction' => $payment->transaction()->model_field_array(),
            ],
            $payment
        );
        return $payment;
    }


    /**
     * Often used for IPNs. But applies the info in $update_info to the payment.
     * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
     * the payment method passes in.
     *
     * @param array $update_info like $_POST
     * @param EEI_Transaction $transaction
     * @return EEI_Payment updated
     * @throws EE_Error, IpnException
     */
    public function handle_payment_update($update_info, $transaction)
    {
        // verify there's payment data that's been sent
        if (empty($update_info['payment_status']) || empty($update_info['txn_id'])) {
            // log the results
            $this->log(
                array(
                    'message'     => esc_html__(
                        'PayPal IPN response is missing critical payment data. This may indicate a PDT request and require your PayPal account settings to be corrected.',
                        'event_espresso'
                    ),
                    'update_info' => $update_info,
                ),
                $transaction
            );
            // waaaait... is this a PDT request? (see https://developer.paypal.com/docs/classic/products/payment-data-transfer/)
            // indicated by the "tx" argument? If so, we don't need it. We'll just use the IPN data when it comes
            if (isset($update_info['tx'])) {
                return $transaction->last_payment();
            } else {
                return null;
            }
        }
        $payment = $this->_pay_model->get_payment_by_txn_id_chq_nmbr($update_info['txn_id']);
        if (! $payment instanceof EEI_Payment) {
            $payment = $transaction->last_payment();
        }
        // ok, then validate the IPN. Even if we've already processed this payment,
        // let PayPal know we don't want to hear from them anymore!
        if (! $this->validate_ipn($update_info, $payment)) {
            return $payment;
        }
        // kill request here if this is a refund, we don't support them yet (we'd need to adjust the transaction,
        // registrations, ticket counts, etc)
        if (
            (
                $update_info['payment_status'] === 'Refunded'
                || $update_info['payment_status'] === 'Partially_Refunded'
            )
            && apply_filters('FHEE__EEG_Paypal_Standard__handle_payment_update__kill_refund_request', true)
        ) {
            throw new EventEspresso\core\exceptions\IpnException(
                sprintf(
                    esc_html__('Event Espresso does not yet support %1$s IPNs from PayPal', 'event_espresso'),
                    $update_info['payment_status']
                ),
                EventEspresso\core\exceptions\IpnException::UNSUPPORTED,
                null,
                $payment,
                $update_info
            );
        }
        // ok, well let's process this payment then!
        switch ($update_info['payment_status']) {
            case 'Completed':
                $status = $this->_pay_model->approved_status();
                $gateway_response = esc_html__('The payment is approved.', 'event_espresso');
                break;

            case 'Pending':
                $status = $this->_pay_model->pending_status();
                $gateway_response = esc_html__(
                    'The payment is in progress. Another message will be sent when payment is approved.',
                    'event_espresso'
                );
                break;

            case 'Denied':
                $status = $this->_pay_model->declined_status();
                $gateway_response = esc_html__('The payment has been declined.', 'event_espresso');
                break;

            case 'Expired':
            case 'Failed':
                $status = $this->_pay_model->failed_status();
                $gateway_response = esc_html__('The payment failed for technical reasons or expired.', 'event_espresso');
                break;

            case 'Refunded':
            case 'Partially_Refunded':
                // even though it's a refund, we consider the payment as approved, it just has a negative value
                $status = $this->_pay_model->approved_status();
                $gateway_response = esc_html__(
                    'The payment has been refunded. Please update registrations accordingly.',
                    'event_espresso'
                );
                break;

            case 'Voided':
            case 'Reversed':
            case 'Canceled_Reversal':
            default:
                $status = $this->_pay_model->cancelled_status();
                $gateway_response = esc_html__(
                    'The payment was cancelled, reversed, or voided. Please update registrations accordingly.',
                    'event_espresso'
                );
                break;
        }

        // check if we've already processed this payment
        if ($payment instanceof EEI_Payment) {
            // payment exists. if this has the exact same status and amount, don't bother updating. just return
            if ($payment->status() === $status && $payment->amount() === (float) $update_info['mc_gross']) {
                // DUPLICATED IPN! don't bother updating transaction
                throw new IpnException(
                    sprintf(
                        esc_html__(
                            'It appears we have received a duplicate IPN from PayPal for payment %d',
                            'event_espresso'
                        ),
                        $payment->ID()
                    ),
                    IpnException::DUPLICATE,
                    null,
                    $payment,
                    $update_info
                );
            } else {
                // new payment yippee !!!
                $payment->set_status($status);
                $payment->set_amount((float) $update_info['mc_gross']);
                $payment->set_gateway_response($gateway_response);
                $payment->set_details($update_info);
                $payment->set_txn_id_chq_nmbr($update_info['txn_id']);
                $this->log(
                    array(
                        'message'  => esc_html__(
                            'Updated payment either from IPN or as part of POST from PayPal',
                            'event_espresso'
                        ),
                        'url'      => $this->_process_response_url(),
                        'payment'  => $payment->model_field_array(),
                        'IPN_data' => $update_info
                    ),
                    $payment
                );
            }
        }
        do_action('FHEE__EEG_Paypal_Standard__handle_payment_update__payment_processed', $payment, $this);
        return $payment;
    }


    /**
     * Validate the IPN notification.
     *
     * @param array                  $update_info like $_REQUEST
     * @param EE_Payment|EEI_Payment $payment
     * @return boolean
     * @throws EE_Error
     */
    public function validate_ipn($update_info, $payment)
    {
        // allow us to skip validating IPNs with PayPal (useful for testing)
        if (apply_filters('FHEE__EEG_Paypal_Standard__validate_ipn__skip', false)) {
            return true;
        }
        // ...otherwise, we actually don't care what the $update_info is, we need to look
        // at the request directly because we can't use $update_info because it has issues with quotes
        // Reading POSTed data directly from $_POST causes serialization issues with array data in the POST.
        // Instead, read raw POST data from the input stream.
        // @see https://gist.github.com/xcommerce-gists/3440401
        $raw_post_data = file_get_contents('php://input');
        $raw_post_array = explode('&', $raw_post_data);
        $update_info = array();
        foreach ($raw_post_array as $keyval) {
            $keyval = explode('=', $keyval);
            if (count($keyval) === 2) {
                $update_info[ $keyval[0] ] = urldecode($keyval[1]);
            }
        }
        // read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
        $req = 'cmd=_notify-validate';
        $uses_get_magic_quotes = function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc() === 1;
        foreach ($update_info as $key => $value) {
            $value = $uses_get_magic_quotes ? urlencode(stripslashes($value)) : urlencode($value);
            $req .= "&$key=$value";
        }
        // HTTP POST the complete, unaltered IPN back to PayPal
        $response = wp_remote_post(
            $this->_gateway_url,
            array(
                'body'              => $req,
                'sslverify'         => false,
                'timeout'           => 60,
                // make sure to set a site specific unique "user-agent" string since the WordPres default gets declined by PayPal
                // plz see: https://github.com/websharks/s2member/issues/610
                'user-agent'        => 'Event Espresso v' . EVENT_ESPRESSO_VERSION . '; ' . home_url(),
                'httpversion'       => '1.1'
            )
        );
        // then check the response
        if (
            array_key_exists('body', $response)
            && ! is_wp_error($response)
            && strcmp($response['body'], "VERIFIED") === 0
        ) {
            return true;
        }
        // huh, something's wack... the IPN didn't validate. We must have replied to the IPN incorrectly,
        // or their API must have changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
        if ($response instanceof WP_Error) {
            $error_msg = sprintf(
                esc_html__('WP Error. Code: "%1$s", Message: "%2$s", Data: "%3$s"', 'event_espresso'),
                $response->get_error_code(),
                $response->get_error_message(),
                print_r($response->get_error_data(), true)
            );
        } elseif (is_array($response) && isset($response['body'])) {
            $error_msg = $response['body'];
        } else {
            $error_msg = print_r($response, true);
        }
        $payment->set_gateway_response(
            sprintf(
                esc_html__("IPN Validation failed! Paypal responded with '%s'", "event_espresso"),
                $error_msg
            )
        );
        $payment->set_details(array('REQUEST' => $update_info, 'VALIDATION_RESPONSE' => $response));
        $payment->set_status(EEM_Payment::status_id_failed);
        // log the results
        $this->log(
            array(
                'url'     => $this->_process_response_url(),
                'message' => $payment->gateway_response(),
                'details' => $payment->details(),
            ),
            $payment
        );
        return false;
    }


    /**
     * _process_response_url
     * @return string
     */
    protected function _process_response_url(): string
    {
        if (isset($_SERVER['HTTP_HOST'], $_SERVER['REQUEST_URI'])) {
            $url = is_ssl() ? 'https://' : 'http://';
            $url .= EEH_URL::filter_input_server_url('HTTP_HOST');
            $url .= EEH_URL::filter_input_server_url();
        } else {
            $url = 'unknown';
        }
        return $url;
    }


    /**
     * Updates the transaction and line items based on the payment IPN data from PayPal,
     * like the taxes or shipping
     *
     * @param EEI_Payment $payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_txn_based_on_payment($payment)
    {
        $update_info = $payment->details();
        /** @var EE_Transaction $transaction */
        $transaction = $payment->transaction();
        $payment_was_itemized = $payment->get_extra_meta(EEG_Paypal_Standard::itemized_payment_option_name, true, false);
        if (! $transaction) {
            $this->log(
                esc_html__(
                    // @codingStandardsIgnoreStart
                    'Payment with ID %d has no related transaction, and so update_txn_based_on_payment couldn\'t be executed properly',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                $payment
            );
            return;
        }
        if (
            ! is_array($update_info)
            || ! isset($update_info['mc_shipping'])
            || ! isset($update_info['tax'])
        ) {
            $this->log(
                array(
                    'message' => esc_html__(
                        // @codingStandardsIgnoreStart
                        'Could not update transaction based on payment because the payment details have not yet been put on the payment. This normally happens during the IPN or returning from PayPal',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    'url'     => $this->_process_response_url(),
                    'payment' => $payment->model_field_array()
                ),
                $payment
            );
            return;
        }
        if ($payment->status() !== $this->_pay_model->approved_status()) {
            $this->log(
                array(
                    'message' => esc_html__(
                        'We shouldn\'t update transactions taxes or shipping data from non-approved payments',
                        'event_espresso'
                    ),
                    'url'     => $this->_process_response_url(),
                    'payment' => $payment->model_field_array()
                ),
                $payment
            );
            return;
        }
        $grand_total_needs_resaving = false;
        /** @var EE_Line_Item $transaction_total_line_item */
        $transaction_total_line_item = $transaction->total_line_item();

        // might paypal have changed the taxes?
        if ($this->_paypal_taxes && $payment_was_itemized) {
            // note that we're doing this BEFORE adding shipping;
            // we actually want PayPal's shipping to remain non-taxable
            $this->_line_item->set_line_items_taxable($transaction_total_line_item, true, 'paypal_shipping');
            $this->_line_item->set_total_tax_to(
                $transaction_total_line_item,
                (float) $update_info['tax'],
                esc_html__('Taxes', 'event_espresso'),
                esc_html__('Calculated by Paypal', 'event_espresso'),
                'paypal_tax'
            );
            $grand_total_needs_resaving = true;
        }

        $shipping_amount = (float) $update_info['mc_shipping'];
        // might paypal have added shipping?
        if ($this->_paypal_shipping && $shipping_amount && $payment_was_itemized) {
            $this->_line_item->add_unrelated_item(
                $transaction_total_line_item,
                sprintf(esc_html__('Shipping for transaction %1$s', 'event_espresso'), $transaction->ID()),
                $shipping_amount,
                esc_html__('Shipping charges calculated by Paypal', 'event_espresso'),
                1,
                false,
                'paypal_shipping_' . $transaction->ID()
            );
            $grand_total_needs_resaving = true;
        }

        if ($grand_total_needs_resaving) {
            $transaction_total_line_item->save_this_and_descendants_to_txn($transaction->ID());
            /** @var EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            $registration_processor->update_registration_final_prices($transaction);
        }
        $this->log(
            array(
                'message'                     => esc_html__('Updated transaction related to payment', 'event_espresso'),
                'url'                         => $this->_process_response_url(),
                'transaction (updated)'       => $transaction->model_field_array(),
                'payment (updated)'           => $payment->model_field_array(),
                'use_paypal_shipping'         => $this->_paypal_shipping,
                'use_paypal_tax'              => $this->_paypal_taxes,
                'grand_total_needed_resaving' => $grand_total_needs_resaving,
            ),
            $payment
        );
    }
}
