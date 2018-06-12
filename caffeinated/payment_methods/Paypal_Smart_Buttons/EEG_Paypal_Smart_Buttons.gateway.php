<?php

/**
 * EEG_Paypal_Smart_Buttons
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * ------------------------------------------------------------------------
 */
class EEG_Paypal_Smart_Buttons extends EE_Onsite_Gateway
{

    /**
     * @var $_access_token string
     */
    protected $_access_token;

    /**
     * @var $_client_id
     */
    protected $_client_id;

    /**
     * @var $_secret
     */
    protected $_secret;

    /**
     * @var array
     */
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
        'RUB',
    );

    protected static function getPayPalServer($sandbox_mode)
    {
        if($sandbox_mode) {
            return 'https://api.sandbox.paypal.com';
        } else {
            return 'https://api.paypal.com';
        }
    }



    /**
     * @param EEI_Payment $payment
     * @param array       $billing_info {
     * @type string $credit_card
     * @type string $credit_card_type
     * @type string $exp_month always 2 characters
     * @type string $exp_year always 4 characters
     * @type string $cvv
     * }
     * @see      parent::do_direct_payment for more info
     * @return EE_Payment|EEI_Payment
     * @throws EE_Error
     */
    public function do_direct_payment($payment, $billing_info = null)
    {
        $transaction = $payment->transaction();
        if (! $transaction instanceof EEI_Transaction) {
            throw new EE_Error(
                esc_html__('No transaction for payment while paying with PayPal Pro.', 'event_espresso')
            );
        }
        $primary_registrant = $transaction->primary_registration();
        if (! $primary_registrant instanceof EEI_Registration) {
            throw new EE_Error(
                esc_html__(
                    'No primary registration on transaction while paying with PayPal Pro.',
                    'event_espresso'
                )
            );
        }
        $attendee = $primary_registrant->attendee();
        if (! $attendee instanceof EEI_Attendee) {
            throw new EE_Error(
                esc_html__(
                    'No attendee on primary registration while paying with PayPal Pro.',
                    'event_espresso'
                )
            );
        }
        // @todo setup the payment

        // @todo setup the items

        $response_data = self::executePayment(
            $this->_debug_mode,
            $this->_access_token,
            $this->_client_id,
            $this->_secret,
            isset($billing_info['payer_id']) ? $billing_info['payer_id'] : '',
            isset($billing_info['payment_id']) ? $billing_info['payment_id'] : ''
        );
        // key state should be approved
        // key transactions, first item, then amount, then total
        if (isset(
                $response_data['state'],
                $response_data['transactions'],
                $response_data['transactions'][0],
                $response_data['transactions'][0]['amount'],
                $response_data['transactions'][0]['amount']['total']
        )) {
            $payment->set_amount($response_data['transactions'][0]['amount']['total']);
            if ($response_data['state'] === 'approved') {
                $payment->set_status($this->_pay_model->approved_status());
            }
        }

        return $payment;
    }


    /**
     * @param      $sandbox_mode
     * @param      $access_token
     * @param      $client_id
     * @param      $secret
     * @param      $payer_id
     * @param      $payment_id
     * @param bool $retry
     * @return array
     * @throws EE_Error
     */
    protected static function executePayment($sandbox_mode, $access_token, $client_id, $secret,  $payer_id, $payment_id, $retry = false)
    {
        $post_body = array(
            'payer_id' => $payer_id
        );
        $url = self::getPayPalServer($sandbox_mode) . '/v1/payments/payment/' . $payment_id . '/execute/';
        $json = wp_json_encode($post_body);
        $response = wp_remote_post(
            $url,
            array(
                'headers' => array(
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $access_token
                ),
                'body' => $json
            )
        );
        try {
            return EEG_Paypal_Smart_Buttons::getPayPalResponseJson($response);
        } catch (EE_Error $e) {
            // if we're already in the middle of a retry, bubble up the error. We don't know how to deal with it
            if ($retry) {
                throw $e;
            }
            // ok we're going to get a new access token and try again, but only once...
            // and if we get an error, we're going to let it bubble up
            $access_token = self::getAccessToken($sandbox_mode, $client_id, $secret);
            // @todo we need to remember this access token in the future too
            return self::executePayment(
                $sandbox_mode,
                $access_token,
                $client_id,
                $secret,
                $payer_id,
                $payment_id,
                true
            );
        }
    }


    /**
     * Given the client ID and secret, retrieves the access token from PayPal
     * @param $sandbox_mode
     * @param $client_id
     * @param $secret
     * @return mixed
     * @throws EE_Error
     */
    public static function getAccessToken($sandbox_mode, $client_id, $secret)
    {
        $base_url = self::getPayPalServer($sandbox_mode);
        $response = wp_remote_post(
            $base_url . '/v1/oauth2/token',
            array(
                'headers' => array(
                    'Accept'        => 'application/json',
                    'Authorization' => 'Basic ' . base64_encode($client_id . ':' . $secret),
                ),
                'body'    => array(
                    'grant_type' => 'client_credentials',
                ),
            )
        );
       $response_json = self::getPayPalResponseJson($response);
        if (! isset($response_json['access_token'])) {
            throw new EE_Error(
                esc_html__('No access token provided in response from PayPal', 'event_espresso')
            );
        }
        return $response_json['access_token'];
    }


    /**
     * Verifies the response isn't a WP_Error, and that it contains valid JSON, and doesn't contain an error
     * in that JSON. You can trust this returns an array, and it doesn't have PayPal's error data in it, but
     * any further validation relating to your request must be done elsewhere.
     * @param array|WP_Error $response result of one of wp_remote_request or wp_remote_post function calls
     * @throws EE_Error if there are any problems returns an array from the response's JSON
     * @return array from the JSON
     */
    protected static function getPayPalResponseJson($response)
    {
        if (is_wp_error($response)) {
            /**
             * @var $response WP_Error
             */
            throw new EE_Error(
                $response->get_error_message()
            );
        }
        if (isset(
            $response['response'],
            $response['response']['code'],
            $response['response']['message']
            )
            && $response['response']['code'] === 500) {
            throw new EE_Error(
                $response['response']['message']
            );
        }
        $response_body = wp_remote_retrieve_body($response);
        if (! $response_body) {
            throw new EE_Error(
                esc_html__(
                    'No response was received from PayPal',
                    'event_espresso'
                )
            );
        }
        $response_data = json_decode($response_body, true);
        if (! is_array($response_data)) {
            throw new EE_Error(
                esc_html__('No JSON body was received.', 'event_espresso')
            );
        }
        if( isset($response_data['error'], $response_data['error_description'])) {
            throw new EE_Error(
                esc_html(
                    sprintf(
                        _x(
                            '%1$s (%2$s)',
                            'Error message (error_code)',
                            'event_espresso'
                        ),
                        $response_data['error_description'],
                        $response_data['error']
                    )
                )
            );
        }
        return $response_data;
    }
}
