<?php

use EventEspresso\payment_methods\Paypal_Express\ItemizedOrder;
use EventEspresso\payment_methods\Paypal_Express\TokenRequest;

/**
 * Class  EEG_Paypal_Express
 *
 * @package            Event Espresso
 * @subpackage         eea-paypal-express
 * @author             Event Espresso
 */
class EEG_Paypal_Express extends EE_Offsite_Gateway
{

    /**
     * Merchant API Username.
     *
     * @var string
     */
    protected $_api_username;

    /**
     * Merchant API Password.
     *
     * @var string
     */
    protected $_api_password;

    /**
     * API Signature.
     *
     * @var string
     */
    protected $_api_signature;

    /**
     * Request Shipping address on PP checkout page.
     *
     * @var string
     */
    protected $_request_shipping_addr;

    /**
     * Business/personal logo.
     *
     * @var string
     */
    protected $_image_url = '';

    /**
     * gateway URL variable
     *
     * @var string
     */
    protected $_base_gateway_url = '';


    /**
     * number of decimal places to round numbers to when performing calculations
     *
     * @var integer
     */
    protected $decimal_precision = 6;

    /**
     * @var ItemizedOrder
     * @since $VID:$
     */
    protected $itemized_order;

    /**
     * @var TokenRequest
     * @since $VID:$
     */
    protected $token_request;


    /**
     * EEG_Paypal_Express constructor.
     */
    public function __construct()
    {
        require_once 'polyfills.php';
        $this->_currencies_supported = [
            'USD',
            'AUD',
            'BRL',
            'CAD',
            'CZK',
            'DKK',
            'EUR',
            'HKD',
            'HUF',
            'ILS',
            'JPY',
            'MYR',
            'MXN',
            'NOK',
            'NZD',
            'PHP',
            'PLN',
            'GBP',
            'RUB',
            'SGD',
            'SEK',
            'CHF',
            'TWD',
            'THB',
            'TRY',
            'INR',
        ];
        parent::__construct();
        $this->decimal_precision = EE_Registry::instance()->CFG->currency->dec_plc;
    }


    /**
     * Sets the gateway URL variable based on whether debug mode is enabled or not.
     *
     * @param array $settings_array
     */
    public function set_settings($settings_array)
    {
        parent::set_settings($settings_array);
        // Redirect URL.
        $this->_base_gateway_url = $this->_debug_mode
            ? 'https://api-3t.sandbox.paypal.com/nvp'
            : 'https://api-3t.paypal.com/nvp';
    }


    /**
     * @param EEI_Payment $payment
     * @param array       $billing_info
     * @param string      $return_url
     * @param string      $notify_url
     * @param string      $cancel_url
     * @return EE_Payment|EEI_Payment
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function set_redirection_info(
        $payment,
        $billing_info = [],
        $return_url = null,
        $notify_url = null,
        $cancel_url = null
    ) {
        if (! $this->validatePayment($payment)) {
            return $payment;
        }
        if (! $this->validateTransaction($payment)) {
            return $payment;
        }
        $this->token_request = new TokenRequest($this->_get_gateway_formatter());
        $token_request_details = apply_filters(
            'FHEE__EEG_Paypal_Express__set_redirection_info__arguments',
            $this->token_request->generateDetails(
                $payment,
                $this->getOrderItems($payment),
                $return_url ?? '',
                $cancel_url ?? '',
                $this->_image_url ?? '',
                $this->_request_shipping_addr ?? ''
            ),
            $this
        );
        // Request PayPal token.
        $token_request_response = $this->_ppExpress_request($token_request_details, 'Payment Token', $payment);
        $token_request_status   = $this->_ppExpress_check_response($token_request_response);
        $this->token_request->processResponse($payment, $token_request_status, $this->isInSandboxMode());

        return $payment;
    }


    /**
     * @param array           $update_info {
     * @type string           $gateway_txn_id
     * @type string           $status      an EEMI_Payment status
     *                                     }
     * @param EEI_Transaction $transaction
     * @return EEI_Payment
     * @throws Exception
     */
    public function handle_payment_update($update_info, $transaction): EEI_Payment
    {
        // if the supplied transaction is valid, we'll retrieve the actual payment object from it
        // but we'll use a temporary payment for now that we can return with errors if things go wrong
        $payment = EE_Payment::new_instance();
        if (! $this->validateTransaction($payment, $transaction)) {
            return $payment;
        }
        $payment = $transaction->last_payment();
        if (! $this->validatePayment($payment)) {
            return $payment;
        }
        // payment appears to be good... so far
        $this->log(['Return from Authorization' => $update_info], $payment);
        $payment_token = $this->getPaymentToken($payment);
        $customer_details = $this->requestCustomerDetails($payment, $payment_token);
        // We got the PayerID so now we can Complete the transaction.
        $this->processPayment($payment, $payment_token, $customer_details);

        return $payment;
    }


    /**
     * @throws Exception
     */
    private function getOrderItems(EE_Payment $payment, array $request_response_args = []): array
    {
        $this->itemized_order = new ItemizedOrder($this->_get_gateway_formatter());
        try {
            $itemized_order = $this->itemized_order->getExistingItemizedOrder($request_response_args);
        } catch (Exception $exception) {
            if (WP_DEBUG) {
                throw $exception;
            }
            // Reset the list and log an error, maybe allow to try and generate a new list (below).
            $itemized_order = [];
            $this->log(
                [
                    esc_html__(
                        'Could not generate a proper item list with:',
                        'event_espresso'
                    ) => $request_response_args,
                ],
                $payment
            );
        }
        if (empty($itemized_order)) {
            $itemized_order = $this->itemized_order->generateItemizedOrder($payment);
        }
        return $itemized_order;
    }


    /**
     *  Make the Express checkout request.
     *
     * @param array       $request_params
     * @param string      $request_text
     * @param EEI_Payment $payment
     * @return array|WP_Error
     */
    public function _ppExpress_request(array $request_params, string $request_text, EEI_Payment $payment)
    {
        $request_dtls = [
            'VERSION'      => '204.0',
            'USER'         => $this->_api_username,
            'PWD'          => $this->_api_password,
            'SIGNATURE'    => $this->_api_signature,
            // EE will blow up if you change this
            'BUTTONSOURCE' => 'EventEspresso_SP',
        ];
        $dtls         = array_merge($request_dtls, $request_params);
        $this->_log_clean_request($dtls, $payment, $request_text . ' Request');
        // Request Customer Details.
        $request_response = wp_remote_post(
            $this->_base_gateway_url,
            [
                'method'      => 'POST',
                'timeout'     => 45,
                'httpversion' => '1.1',
                'cookies'     => [],
                'headers'     => [],
                'body'        => http_build_query($dtls),
            ]
        );
        // Log the response.
        $this->log([$request_text . ' Response' => $request_response], $payment);
        return $request_response;
    }


    /**
     *  Check the response status.
     *
     * @param mixed $request_response
     * @return array
     */
    public function _ppExpress_check_response($request_response): array
    {
        if (is_wp_error($request_response) || empty($request_response['body'])) {
            // If we got here then there was an error in this request.
            return ['status' => false, 'args' => $request_response];
        }
        $response_args = [];
        parse_str(urldecode($request_response['body']), $response_args);
        if (! isset($response_args['ACK'])) {
            return ['status' => false, 'args' => $request_response];
        }
        if (
            (
                isset($response_args['PAYERID'])
                || isset($response_args['TOKEN'])
                || isset($response_args['PAYMENTINFO_0_TRANSACTIONID'])
                || (isset($response_args['PAYMENTSTATUS']) && $response_args['PAYMENTSTATUS'] === 'Completed')
            )
            && in_array($response_args['ACK'], ['Success', 'SuccessWithWarning'], true)
        ) {
            // Response status OK, return response parameters for further processing.
            return ['status' => true, 'args' => $response_args];
        }
        $errors = $this->_get_errors($response_args);
        return ['status' => false, 'args' => $errors];
    }


    /**
     *  Log a "Cleared" request.
     *
     * @param array       $request
     * @param EEI_Payment $payment
     * @param string      $info
     * @return void
     */
    private function _log_clean_request(array $request, EEI_Payment $payment, string $info)
    {
        $cleaned_request_data = $request;
        unset($cleaned_request_data['PWD'], $cleaned_request_data['USER'], $cleaned_request_data['SIGNATURE']);
        $this->log([$info => $cleaned_request_data], $payment);
    }


    /**
     *  Get error from the response data.
     *
     * @param array $data_array
     * @return array
     */
    private function _get_errors(array $data_array): array
    {
        $errors = [];
        $n      = 0;
        while (isset($data_array[ "L_ERRORCODE{$n}" ])) {
            $l_error_code    = $data_array[ "L_ERRORCODE{$n}" ] ?? '';
            $l_severity_code = $data_array[ "L_SEVERITYCODE{$n}" ] ?? '';
            $l_short_message = $data_array[ "L_SHORTMESSAGE{$n}" ] ?? '';
            $l_long_message  = $data_array[ "L_LONGMESSAGE{$n}" ] ?? '';
            if ($n === 0) {
                $errors = [
                    'L_ERRORCODE'    => $l_error_code,
                    'L_SHORTMESSAGE' => $l_short_message,
                    'L_LONGMESSAGE'  => $l_long_message,
                    'L_SEVERITYCODE' => $l_severity_code,
                ];
            } else {
                $errors['L_ERRORCODE']    .= ', ' . $l_error_code;
                $errors['L_SHORTMESSAGE'] .= ', ' . $l_short_message;
                $errors['L_LONGMESSAGE']  .= ', ' . $l_long_message;
                $errors['L_SEVERITYCODE'] .= ', ' . $l_severity_code;
            }
            $n++;
        }
        return $errors;
    }


    /**
     * @param EE_Payment $payment
     * @return mixed|null
     * @throws EE_Error
     * @since   $VID:$
     */
    private function getPaymentToken(EE_Payment $payment)
    {
        $payment_details = $payment->details();
        // Check if we still have the token.
        if (! isset($payment_details['TOKEN']) || empty($payment_details['TOKEN'])) {
            $payment->set_status($this->_pay_model->failed_status());
            return null;
        }
        return $payment_details['TOKEN'];
    }

    /**
     * @param EE_Payment $payment
     * @param array      $checkout_response
     * @param array      $customer_data
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function paymentApproved(EE_Payment $payment, array $checkout_response, array $customer_data)
    {
        $primary_registrant = $payment->transaction()->primary_registration();
        $primary_registration_code = $primary_registrant instanceof EE_Registration ?
            $primary_registrant->reg_code()
            : '';
        $payment->set_extra_accntng($primary_registration_code);
        $payment_amount = $checkout_response['PAYMENTINFO_0_AMT'] ?? 0;
        $payment->set_amount((float) $payment_amount);
        $payment->set_txn_id_chq_nmbr($checkout_response['PAYMENTINFO_0_TRANSACTIONID'] ?? null);
        $payment->set_details($customer_data);
        $payment->set_gateway_response($checkout_response['PAYMENTINFO_0_ACK'] ?? '');
        $payment->set_status($this->_pay_model->approved_status());
    }


    /**
     * @param EE_Payment $payment
     * @param array      $checkout_response
     * @throws EE_Error
     * @since   $VID:$
     */
    private function paymentDeclined(EE_Payment $payment, array $checkout_response)
    {
        $gateway_response = isset($checkout_response['L_ERRORCODE'])
            ? $checkout_response['L_ERRORCODE'] . '; ' . $checkout_response['L_SHORTMESSAGE']
            : esc_html__('Error occurred while trying to Capture the funds.', 'event_espresso');

        $payment->set_gateway_response($gateway_response);
        $payment->set_details($checkout_response);
        $payment->set_status($this->_pay_model->declined_status());
    }


    /**
     * @param EE_Payment $payment
     * @param array $customer_data
     * @throws EE_Error
     * @since   $VID:$
     */
    private function paymentFailed(EE_Payment $payment, array $customer_data)
    {
        $gateway_response = isset($customer_data['L_ERRORCODE'])
            ? $customer_data['L_ERRORCODE'] . '; ' . $customer_data['L_SHORTMESSAGE']
            : esc_html__('Error occurred while trying to get payment Details from PayPal.', 'event_espresso');

        $payment->set_gateway_response($gateway_response);
        $payment->set_details($customer_data);
        $payment->set_status($this->_pay_model->failed_status());
    }


    /**
     * @param EE_Payment $payment
     * @param string     $payment_token
     * @param array      $customer_details
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     * @since   $VID:$
     */
    private function processPayment(EE_Payment $payment, string $payment_token, array $customer_details)
    {
        $checkout_request_dtls = [
            'METHOD'                         => 'DoExpressCheckoutPayment',
            'PAYERID'                        => $customer_details['PAYERID'],
            'TOKEN'                          => $payment_token,
            'PAYMENTREQUEST_0_PAYMENTACTION' => 'Sale',
            'PAYMENTREQUEST_0_AMT'           => $payment->amount(),
            'PAYMENTREQUEST_0_CURRENCYCODE'  => $payment->currency_code(),
        ];
        // Include itemized list.
        $itemized_list         = $this->getOrderItems($payment, $customer_details);
        $checkout_request_dtls = array_merge($checkout_request_dtls, $itemized_list);
        // Payment Checkout/Capture.
        $checkout_request_response = $this->_ppExpress_request(
            $checkout_request_dtls,
            'Do Payment',
            $payment
        );
        $checkout_request_status   = $this->_ppExpress_check_response($checkout_request_response);
        $checkout_response         =
            isset($checkout_request_status['args']) && is_array($checkout_request_status['args'])
                ? $checkout_request_status['args']
                : [];
        if ($checkout_request_status['status']) {
            // All is well, payment approved.
            $this->paymentApproved($payment, $checkout_response, $customer_details);
        } else {
            $this->paymentDeclined($payment, $checkout_response);
        }
    }


    /**
     * @param EE_Payment $payment
     * @param string $payment_token
     * @return array
     * @throws EE_Error
     * @since   $VID:$
     */
    private function requestCustomerDetails(EE_Payment $payment, string $payment_token): array
    {
        $customer_details_request_dtls = [
            'METHOD' => 'GetExpressCheckoutDetails',
            'TOKEN'  => $payment_token,
        ];
        // Request Customer Details.
        $customer_details_request_response = $this->_ppExpress_request(
            $customer_details_request_dtls,
            'Customer Details',
            $payment
        );
        $customer_details_rstatus          = $this->_ppExpress_check_response($customer_details_request_response);
        $customer_details = isset($customer_details_rstatus['args']) && is_array($customer_details_rstatus['args'])
            ? $customer_details_rstatus['args']
            : [];
        if (! $customer_details_rstatus['status']) {
            $this->paymentFailed($payment, $customer_details);
        }
        return $customer_details;
    }



    /**
     * @param EE_Payment|null $payment
     * @return bool
     * @throws EE_Error
     * @since   $VID:$
     */
    private function validatePayment(?EE_Payment $payment): bool
    {
        if (! $payment instanceof EE_Payment) {
            $payment = EE_Payment::new_instance();
            $payment->set_gateway_response(
                esc_html__(
                    'An error occurred while trying to process the payment.',
                    'event_espresso'
                )
            );
            $payment->set_status($this->_pay_model->failed_status());
            return false;
        }
        return true;
    }


    /**
     * @param EE_Payment          $payment
     * @param EE_Transaction|null $transaction
     * @return bool
     * @throws EE_Error
     * @since   $VID:$
     */
    private function validateTransaction(EE_Payment $payment, ?EE_Transaction $transaction = null): bool
    {
        $transaction = $transaction ?? $payment->transaction();
        if (! $transaction instanceof EE_Transaction) {
            $payment->set_gateway_response(
                esc_html__(
                    'Could not process this payment because it has no associated transaction.',
                    'event_espresso'
                )
            );
            $payment->set_status($this->_pay_model->failed_status());
            return false;
        }
        return true;
    }
}
