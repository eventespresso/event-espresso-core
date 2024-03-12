<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;

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
     * @param EE_Payment|null $payment
     * @param array|null      $billing_info
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function do_direct_payment($payment, $billing_info = null)
    {
        $failed_status = $this->_pay_model->failed_status();
        $request       = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        // Check the payment.
        $payment_valid = $this->validateThisPayment($payment, $request);
        if ($payment_valid->details() === 'error' && $payment_valid->status() === $failed_status) {
            return $payment_valid;
        }
        $transaction    = $payment->transaction();
        $payment_method = $transaction->payment_method();

        // Get saved order details.
        try {
            $order = PayPalExtraMetaManager::getPmOption($payment_method, Domain::META_KEY_LAST_ORDER);
        } catch (Exception $exception) {
            return $this->setPaymentFailure(
                $payment,
                $failed_status,
                $request->postParams(),
                $exception->getMessage()
            );
        }
        $order_id       = $request->getRequestParam('pp_order_id', '', DataType::STRING);
        $is_order_valid = $this->isOrderValid($order_id, $order);
        if (! $is_order_valid['valid']) {
            return $this->setPaymentFailure(
                $payment,
                $failed_status,
                [$order, $request->postParams()],
                $is_order_valid['message']
            );
        }

        // Remove the saved order data.
        PayPalExtraMetaManager::deletePmOption($payment_method, Domain::META_KEY_LAST_ORDER);
        // Looks like all is good. Do a payment success.
        return $this->setPaymentSuccess($payment, $transaction, $order);
    }


    /**
     * Validate the payment.
     *
     * @param mixed            $payment
     * @param RequestInterface $request
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validateThisPayment(?EE_Payment $payment, RequestInterface $request): EE_Payment
    {
        $failed_status = $this->_pay_model->failed_status();
        // Check the payment.
        if (! $payment instanceof EE_Payment) {
            $payment       = EE_Payment::new_instance();
            $error_message = esc_html__('Error. No associated payment was found.', 'event_espresso');
            return $this->setPaymentFailure($payment, $failed_status, $request->postParams(), $error_message);
        }
        // Check the transaction.
        $transaction = $payment->transaction();
        if (! $transaction instanceof EE_Transaction) {
            $error_message = esc_html__(
                'Could not process this payment because it has no associated transaction.',
                'event_espresso'
            );
            return $this->setPaymentFailure($payment, $failed_status, $request->postParams(), $error_message);
        }
        // Check for the payment nonce.
        // $order_nonce = $request->getRequestParam('pp_order_nonce');
        // if (empty($order_nonce) || ! wp_verify_nonce($order_nonce, Domain::CAPTURE_ORDER_NONCE_NAME)) {
        //     $error_message = esc_html__('No or incorrect order capture nonce provided !', 'event_espresso');
        //     return $this->setPaymentFailure($payment, $failed_status, $request->postParams(), $error_message);
        // }
        return $payment;
    }


    /**
     * Validate the Order.
     *
     * @param string $provided_order_id
     * @param        $order
     * @return array [valid => {boolean}, message => {string}]
     */
    public function isOrderValid(string $provided_order_id, $order): array
    {
        $conclusion = [
            'valid'   => false,
            'message' => esc_html__('Could not validate this Order.', 'event_espresso'),
        ];
        // Check the provided Order and order ID.
        if (! $provided_order_id) {
            $conclusion['message'] = esc_html__('Invalid Order ID provided !', 'event_espresso');
        } elseif (! $order || ! is_array($order)) {
            $conclusion['message'] = esc_html__('Order data in wrong format.', 'event_espresso');
        } elseif ($order['id'] !== $provided_order_id) {
            $conclusion['message'] = esc_html__('Order ID mismatch.', 'event_espresso');
        } elseif (empty($order['status'])
            || $order['status'] !== 'COMPLETED'
            || empty($order['purchase_units'][0]['payments']['captures'][0]['status'])
            || $order['purchase_units'][0]['payments']['captures'][0]['status'] !== 'COMPLETED'
        ) {
            $conclusion['message'] = esc_html__('Order not completed.', 'event_espresso');
        } else {
            // If we didn't fail on the above, the Order should be considered valid.
            $conclusion['valid'] = true;
        }
        return $conclusion;
    }


    /**
     * Set a payment error and log the data.
     *
     * @param EE_Payment   $payment
     * @param string       $status
     * @param array|string $response_data
     * @param string       $err_message
     * @return EE_Payment
     * @throws EE_Error|ReflectionException
     */
    public function setPaymentFailure(
        EE_Payment $payment,
        string     $status,
                   $response_data,
        string     $err_message = ''
    ): EE_Payment {
        $this->log(['Error request data:' => $response_data], $payment);
        $err_message = $err_message ?: sprintf(
            esc_html__(
                'Your payment could not be processed successfully due to a technical issue.%sPlease try again or contact %s for assistance.',
                'event_espresso'
            ),
            '<br/>',
            EE_Registry::instance()->CFG->organization->get_pretty('email')
        );
        $payment->set_status($status);
        $payment->set_details($err_message);
        $payment->set_gateway_response($err_message);
        return $payment;
    }


    /**
     * Set the payment success.
     *
     * @param EE_Payment     $payment
     * @param EE_Transaction $transaction
     * @param array          $order
     * @return EE_Payment
     * @throws EE_Error|ReflectionException
     */
    public function setPaymentSuccess(EE_Payment $payment, EE_Transaction $transaction, array $order): EE_Payment
    {
        $amount = $order['purchase_units'][0]['payments']['captures'][0]['amount']['value'] ?? 0;
        // Don't set the amount if there is no info on that with this order.
        if (! $amount) {
            $this->log(['Success order but amount is 0 !' => $order], $payment);
        } else {
            $payment->set_amount((float) $amount);
        }
        $payment->set_status(EEM_Payment::status_id_approved);
        $payment->set_txn_id_chq_nmbr($order['purchase_units'][0]['payments']['captures'][0]['id'] ?? $order['id']);
        $payment->set_gateway_response($order['status'] ?? 'success');
        $this->saveBillingDetails($payment, $transaction, $order);
        return $payment;
    }


    /**
     * Save some transaction details, like billing information.
     *
     * @param EE_Payment     $payment
     * @param EE_Transaction $transaction
     * @param array          $order
     * @return void
     * @throws EE_Error|ReflectionException
     */
    public function saveBillingDetails(EE_Payment $payment, EE_Transaction $transaction, array $order): void
    {
        $input_values   = [];
        $primary_reg    = $transaction->primary_registration();
        $attendee       = $primary_reg instanceof EE_Registration ? $primary_reg->attendee() : null;
        $transaction    = $payment->transaction();
        $payment_method = $transaction->payment_method();
        $postmeta_name  = $payment_method->type_obj() instanceof EE_PMT_Base
            ? 'billing_info_' . $payment_method->type_obj()->system_name()
            : '';
        if (empty($order['payment_source']) || ! $attendee instanceof EE_Attendee) {
            // I guess we are done here then. Just save what we have.
            $payment->set_details($order);
            return;
        }
        // Do we have order information from the express checkout (PayPal button) ?
        if (! empty($order['payment_source']['paypal'])) {
            $payer                      = $order['payment_source']['paypal'];
            $payer_name                 = $payer['name'] ?? '';
            $input_values['first_name'] = $payer_name['given_name'] ?? $attendee->fname();
            $input_values['last_name']  = $payer_name['surname'] ?? $attendee->lname();
            $input_values['email']      = $payer_name['email_address'] ?? $attendee->email();
            $input_values['address']    = $payer_name['address_line_1'] ?? $attendee->address();
            $input_values['address2']   = $payer_name['address_line_2'] ?? $attendee->address2();
            $input_values['city']       = $payer_name['admin_area_2'] ?? $attendee->city();
            $input_values['country']    = $payer_name['country_code'] ?? $attendee->country();
            $input_values['zip']        = $payer_name['postal_code'] ?? $attendee->zip();
        }
        // Or card information from ACDC ?
        if (! empty($order['payment_source']['card'])) {
            $payer_card = $order['payment_source']['card'];
            if (! empty($payer_card['name'])) {
                $full_name = explode(' ', $payer_card['name']);
                // Don't need to save each field because others should be populated from the billing form.
                $input_values['credit_card'] = $payer_card['last_digits'] ?? '';
                $input_values['first_name']  = $full_name[0] ?? $attendee->fname();
                $input_values['last_name']   = $full_name[1] ?? $attendee->lname();
            }
        }
        update_post_meta($attendee->ID(), $postmeta_name, $input_values);
        $attendee->save();
    }
}
