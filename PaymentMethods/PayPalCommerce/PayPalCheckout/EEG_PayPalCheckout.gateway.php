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
     * @param array|null $billing_info
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function do_direct_payment($payment, $billing_info = null)
    {
        $failed_status = $this->_pay_model->failed_status();
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        // Check the payment.
        $payment_valid = $this->validateThisPayment($payment, $request);
        if ($payment_valid->details() === 'error' && $payment_valid->status() === $failed_status) {
            return $payment_valid;
        }
        $payment_method = $payment->transaction()->payment_method();

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
        $order_id      = $request->getRequestParam('pp_order_id', '', DataType::STRING);
        $order_invalid = $this->orderInvalid($order_id, $order);
        if ($order_invalid) {
            return $this->setPaymentFailure($payment, $failed_status, [$order, $request->postParams()], $order_invalid);
        }

        // Remove the saved order data.
        PayPalExtraMetaManager::deletePmOption($payment_method, Domain::META_KEY_LAST_ORDER);
        // Looks like all is good. Do a payment success.
        return $this->setPaymentSuccess($payment, $order);
    }


    /**
     * Validate the payment.
     *
     * @param EE_Payment|null $payment
     * @param RequestInterface $request
     * @return EE_Payment
     * @throws EE_Error
     */
    public function validateThisPayment($payment, $request)
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
     * @param $order
     * @return string string if error and empty if valid.
     */
    public function orderInvalid($provided_order_id, $order)
    {
        // Check the provided order ID.
        if (! $provided_order_id) {
            return esc_html__('Invalid Order ID provided !', 'event_espresso');
        }
        if (! $order || ! is_array($order)) {
            return esc_html__('Order data in wrong format.', 'event_espresso');
        }
        if ($order['id'] !== $provided_order_id) {
            return esc_html__('Order ID mismatch.', 'event_espresso');
        }
        if ($order['status'] !== 'COMPLETED') {
            return esc_html__('Order not completed.', 'event_espresso');
        }
        return '';
    }


    /**
     * Set a payment error and log the data.
     *
     * @param EE_Payment   $payment
     * @param string       $status
     * @param array|string $response_data
     * @param string       $err_message
     * @return EE_Payment
     * @throws EE_Error
     */
    public function setPaymentFailure(
        $payment,
        $status,
        $response_data,
        $err_message = ''
    ) {
        $this->log(['Error request data:' => $response_data], $payment);
        $payment->set_status($status);
        $payment->set_details('error');
        $payment->set_gateway_response($err_message);
        return $payment;
    }


    /**
     * Set the payment success.
     *
     * @param EE_Payment $payment
     * @param array      $order
     * @return EE_Payment
     * @throws EE_Error
     */
    public function setPaymentSuccess($payment, $order)
    {
        $amount = $order['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
        $payment->set_status(EEM_Payment::status_id_approved);
        $payment->set_amount((float) $amount);
        $payment->set_txn_id_chq_nmbr($order['purchase_units'][0]['payments']['captures'][0]['id']);
        $payment->set_details($order['payer']);
        $payment->set_gateway_response($order['status']);
        return $payment;
    }
}
