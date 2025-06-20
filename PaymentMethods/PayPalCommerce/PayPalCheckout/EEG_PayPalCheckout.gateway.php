<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class EEG_PayPalCheckout
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class EEG_PayPalCheckout extends EE_Onsite_Gateway
{
    /**
     * Currencies supported by this gateway.
     *
     * @var array
     */
    protected $_currencies_supported = [
        'AUD',
        'BRL',
        'CAD',
        'CNY',
        'CZK',
        'DKK',
        'EUR',
        'HKD',
        'HUF',
        'ILS',
        'JPY',
        'MYR',
        'MXN',
        'TWD',
        'NZD',
        'NOK',
        'PHP',
        'PLN',
        'GBP',
        'RUB',
        'SGD',
        'SEK',
        'CHF',
        'THB',
        'USD',
    ];


    /**
     * Override the parent.
     *
     * @param EE_Payment|null $payment
     * @param array|null      $billing_info
     * @return EE_Payment
     * @throws EE_Error|ReflectionException
     */
    public function do_direct_payment($payment, $billing_info = null)
    {
        $request         = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $post_parameters = $request->postParams();
        // Check the payment.
        $payment = $this->validatePayment($payment, $request);
        if ($payment->details() === 'error' && $payment->status() === EEM_Payment::status_id_failed) {
            return $payment;
        }
        $transaction    = $payment->transaction();
        $payment_method = $transaction->payment_method();
        // Get the order details.
        $order_id = $request->getRequestParam('pp_order_id');
        if (! $order_id) {
            return EEG_PayPalCheckout::updatePaymentStatus(
                $payment,
                EEM_Payment::status_id_declined,
                $post_parameters,
                esc_html__('Can\'t charge the Order. The Order ID is missing.', 'event_espresso')
            );
        }
        // Capture the order.
        $capture_status = EED_PayPalCommerce::captureOrder($transaction, $payment_method, $order_id);
        // Check the order status.
        $order_details  = EED_PayPalCommerce::getOrderDetails($order_id, $transaction, $payment_method);
        $order_status   = $this->isOrderCompleted($order_details);
        if (! $order_status['completed']) {
            return EEG_PayPalCheckout::updatePaymentStatus(
                $payment,
                EEM_Payment::status_id_declined,
                $order_details,
                $order_status['message'] ?? ''
            );
        }
        // Looks like all is good. Mark payment as a success.
        $this->saveBillingDetails($payment, $transaction, $order_details, $billing_info);
        return EEG_PayPalCheckout::updatePaymentStatus($payment, EEM_Payment::status_id_approved, $capture_status);
    }


    /**
     * Validate the Order.
     *
     * @param array|null $order_details
     * @return array ['completed' => {boolean}, 'message' => {string}]
     */
    public static function isOrderCompleted(?array $order_details): array
    {
        $conclusion = [
            'completed' => false,
            'details'   => $order_details,
        ];
        if (! $order_details) {
            $conclusion['message'] = esc_html__(
                'Could not validate this payment. The Order details were empty.',
                'event_espresso'
            );
        } elseif (! empty($order_details['error'])) {
            $conclusion['message'] = $order_details['message'] ?? $order_details['error'];
        } elseif (empty($order_details['status'])) {
            $conclusion['message'] = esc_html__(
                'There was an error with this payment. The status of the Order could not be determined.',
                'event_espresso'
            );
        } elseif ($order_details['purchase_units'][0]['payments']['captures'][0]['status'] !== 'COMPLETED') {
            $conclusion['message'] = esc_html__(
                'This payment was declined or failed validation. Please check the payment and billing information you provided.',
                'event_espresso'
            );
        } elseif ($order_details['status'] !== 'COMPLETED') {
            $conclusion['message'] = esc_html__(
                'There was an error with this payment. Order was not approved.',
                'event_espresso'
            );
        } else {
            // If we didn't fail on the above, the Order should be considered valid.
            $conclusion['completed'] = true;
            $conclusion['message']   = esc_html__('Order Valid.', 'event_espresso');
        }
        return $conclusion;
    }


    /**
     * Set a payment error and log the data.
     *
     * @param EE_Payment   $payment
     * @param string       $status
     * @param array|string $response_data
     * @param string       $update_message
     * @return EE_Payment
     * @throws EE_Error|ReflectionException
     */
    public static function updatePaymentStatus(
        EE_Payment $payment,
        string $status,
        $response_data,
        string $update_message = ''
    ): EE_Payment {
        $paypal_pm = ! empty($payment->payment_method())
            ? EEM_Payment_Method::instance()->get_one_by_slug($payment->payment_method()->name())
            : null;
        // Is this a successful payment ?
        if ($status === EEM_Payment::status_id_approved) {
            $default_message = esc_html__('Successful payment.', 'event_espresso');
            $amount          = $response_data['purchase_units'][0]['payments']['captures'][0]['amount']['value'] ?? 0;
            // Don't set the amount if there is no info on that with this order.
            if (! empty($amount)) {
                $payment->set_amount((float) $amount);
            }
            $payment->set_txn_id_chq_nmbr(
                $response_data['purchase_units'][0]['payments']['captures'][0]['id'] ?? $response_data['id']
            );
        } else {
            $default_message = sprintf(
                esc_html__(
                    'Your payment could not be processed successfully due to an error.%1$sPlease try again or contact %2$s for assistance.',
                    'event_espresso'
                ),
                '<br/>',
                EE_Registry::instance()->CFG->organization->get_pretty('email')
            );
        }
        // Try getting a better error message from the response.
        $response_message = EEG_PayPalCheckout::getResponseMessage($response_data, $update_message ?: $default_message);
        PayPalLogger::errorLog($response_message, $response_data, $paypal_pm, false, $payment->transaction());
        $payment->set_status($status);
        $payment->set_details($response_message);
        $payment->set_gateway_response($response_message);
        $payment->save();
        return $payment;
    }


    /**
     * Validate the payment.
     *
     * @param array|string $response_data
     * @param string|null  $message
     * @return string
     */
    public static function getResponseMessage($response_data, ?string $message): string
    {
        $new_message = $message;
        if (is_string($response_data)) {
            // Try to decode.
            $decoded_response = json_decode($response_data, true);
            if ($decoded_response && is_array($decoded_response)) {
                $response_data = $decoded_response;
            }
        }
        if (is_array($response_data)) {
            // Do we have a capture status ?
            if (! empty($response_data['purchase_units']['0']['payments']['captures'][0]['status'])) {
                $new_message .= sprintf(
                    /* translators: 1: <br/><br/>, 2: payment capture status */
                    esc_html__('%1$sPayment capture status: %2$s', 'event_espresso'),
                    '<br/><br/>',
                    $response_data['purchase_units']['0']['payments']['captures'][0]['status']
                );
            }
            if (
                ! empty($response_data['purchase_units']['0']['payments']['captures'][0]['processor_response'])
                && is_array($response_data['purchase_units']['0']['payments']['captures'][0]['processor_response'])
            ) {
                $new_message .= sprintf(
                    /* translators: 1: <br/><br/> */
                    esc_html__('%1$sProcessor responded: ', 'event_espresso'),
                    '<br/><br/>'
                );
                $processor_response = $response_data['purchase_units']['0']['payments']['captures'][0]['processor_response'];
                $iteration = 1;
                $foreach_count = count($processor_response);
                foreach ($processor_response as $key => $value) {
                    $new_message .= " $key: $value";
                    $new_message .= $iteration < $foreach_count ? ', ' : '.';
                    $iteration++;
                }
            }
            if (
                ! empty($response_data['details'][0]['description'])
                && ! empty($response_data['details'][0]['issue'])
            ) {
                $iteration = 1;
                $new_message .= sprintf(
                    /* translators: 1: <br/><br/> */
                    esc_html__('%1$sError details: ', 'event_espresso'),
                    '<br/><br/>'
                );
                $foreach_count = count($response_data['details'][0]);
                foreach ($response_data['details'][0] as $key => $value) {
                    $new_message .= "$key: $value";
                    $new_message .= $iteration < $foreach_count ? ', ' : '';
                    $iteration++;
                }
            }
        }
        return $new_message;
    }


    /**
     * Validate the payment.
     *
     * @param EE_Payment|null  $payment
     * @param RequestInterface $request
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validatePayment(?EE_Payment $payment, RequestInterface $request): EE_Payment
    {
        $failed_status = $this->_pay_model->failed_status();
        // Check the payment.
        if (! $payment instanceof EE_Payment) {
            $payment       = EE_Payment::new_instance();
            $error_message = esc_html__('Error. No associated payment was found.', 'event_espresso');
            return EEG_PayPalCheckout::updatePaymentStatus(
                $payment,
                $failed_status,
                $request->postParams(),
                $error_message
            );
        }
        // Check the transaction.
        $transaction = $payment->transaction();
        if (! $transaction instanceof EE_Transaction) {
            $error_message = esc_html__(
                'Could not process this payment because it has no associated transaction.',
                'event_espresso'
            );
            return EEG_PayPalCheckout::updatePaymentStatus(
                $payment,
                $failed_status,
                $request->postParams(),
                $error_message
            );
        }
        return $payment;
    }


    /**
     * Save some transaction details, like billing information.
     *
     * @param EE_Payment     $payment
     * @param EE_Transaction $transaction
     * @param array          $order
     * @param array          $billing
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function saveBillingDetails(
        EE_Payment $payment,
        EE_Transaction $transaction,
        array $order,
        array $billing
    ): void {
        $primary_reg = $transaction->primary_registration();
        $att    = $primary_reg instanceof EE_Registration ? $primary_reg->attendee() : null;
        if (! $att instanceof EE_Attendee) {
            // I guess we are done here then. Just save what we have.
            $payment->set_details($order);
            return;
        }
        // Defaults:
        $billing['credit_card'] = 'empty';
        $billing['first_name']  = empty($billing['first_name']) ? ($att->fname() ?: 'empty') : $billing['first_name'];
        $billing['last_name']   = empty($billing['last_name']) ? ($att->lname() ?: 'empty') : $billing['last_name'];
        $billing['email']       = empty($billing['email']) ? ($att->email() ?: 'empty') : $billing['email'];
        $billing['country']     = empty($billing['country']) ? ($att->country() ?: 'empty') : $billing['country'];
        $billing['city']        = empty($billing['city']) ? ($att->city() ?: 'empty') : $billing['city'];
        $billing['state']       = empty($billing['state']) ? ($att->state_name() ?: 'empty') : $billing['state'];
        $billing['address']     = empty($billing['address']) ? ($att->address() ?: 'empty') : $billing['address'];
        $billing['address2']    = empty($billing['address2']) ? ($att->address2() ?: 'empty') : $billing['address2'];
        $billing['zip']         = empty($billing['zip']) ? ($att->zip() ?: 'empty') : $billing['zip'];
        $billing['phone']       = empty($billing['phone']) ? ($att->phone() ?: 'empty') : $billing['phone'];

        // Try getting the payer information from the payment source (PayPal).
        if (! empty($order['payment_source'])) {
            // A card (ACDC) payment ?
            if (! empty($order['payment_source']['card'])) {
                $payer = $order['payment_source']['card'];
            // Or maybe a PayPal Express payment ?
            } elseif (! empty($order['payment_source']['paypal'])) {
                $payer = $order['payment_source']['paypal'];
            }
            if (! empty($payer)) {
                if (! empty($payer['name'])) {
                    // Yup, payment_source card vs PayPal have different info about the payer. So need to differentiate.
                    if (is_string($payer['name'])) {
                        $full_name                  = explode(' ', $payer['name']);
                        $billing['first_name'] = $full_name[0] ?? $billing['first_name'];
                        $billing['last_name']  = $full_name[1] ?? $billing['last_name'];
                    }
                    // PayPal info on the Payment:
                    if (is_array($payer['name'])) {
                        $billing['first_name'] = $payer['name']['given_name'] ?? $billing['first_name'];
                        $billing['last_name']  = $payer['name']['surname'] ?? $billing['last_name'];
                    }
                }
                // Possible info on the payer.
                $billing['credit_card'] = $payer['last_digits'] ?? $billing['credit_card'];
                $billing['email']       = $payer['email_address'] ?? $billing['email'];
                $billing['country']     = $payer['address']['country_code'] ?? $billing['country'];
                $billing['city']        = $payer['address']['city'] ?? $billing['city'];
                $billing['state']       = $payer['address']['state'] ?? $billing['state'];
                $billing['address']     = $payer['address']['address'] ?? $billing['address'];
                $billing['zip']         = $payer['address']['zip'] ?? $billing['zip'];
            }
        }
        // Update attendee billing info in the transaction details.
        $payment_method = $transaction->payment_method();
        $post_meta_name = $payment_method->type_obj() instanceof EE_PMT_Base
            ? 'billing_info_' . $payment_method->type_obj()->system_name()
            : '';
        update_post_meta($att->ID(), $post_meta_name, $billing);
    }
}
