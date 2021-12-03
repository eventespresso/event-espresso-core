<?php

namespace EventEspresso\payment_methods\Paypal_Express;

use EE_Attendee;
use EE_Error;
use EE_Payment;
use EE_Registration;
use EEM_Payment;
use EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatterInterface;
use ReflectionException;

class TokenRequest
{

    /**
     * @var GatewayDataFormatterInterface
     */
    protected $gateway_data_formatter;


    /**
     * @param GatewayDataFormatterInterface $gateway_data_formatter
     */
    public function __construct(GatewayDataFormatterInterface $gateway_data_formatter)
    {
        $this->gateway_data_formatter = $gateway_data_formatter;
    }


    /**
     * @param EE_Payment $payment
     * @param array      $itemized_order
     * @param string     $return_url
     * @param string     $cancel_url
     * @param string     $logo_image_url
     * @param bool       $request_shipping_address
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateDetails(
        EE_Payment $payment,
        array $itemized_order = [],
        string $return_url = '',
        string $cancel_url = '',
        string $logo_image_url = '',
        bool $request_shipping_address = false
    ): array {
        $locale = explode('-', get_bloginfo('language'));
        // Gather request parameters.
        $token_request_details = [
            'METHOD'                         => 'SetExpressCheckout',
            'PAYMENTREQUEST_0_AMT'           => $payment->amount(),
            'PAYMENTREQUEST_0_CURRENCYCODE'  => $payment->currency_code(),
            'PAYMENTREQUEST_0_DESC'          => mb_strcut(
                $this->gateway_data_formatter->formatOrderDescription($payment),
                0,
                127
            ),
            'RETURNURL'                      => $return_url,
            'CANCELURL'                      => $cancel_url,
            'PAYMENTREQUEST_0_PAYMENTACTION' => 'Sale',
            // Buyer does not need to create a PayPal account to check out.
            // This is referred to as PayPal Account Optional.
            'SOLUTIONTYPE'                   => 'Sole',
            // Locale of the pages displayed by PayPal during Express Checkout.
            'LOCALECODE'                     => $locale[1],
        ];
        $token_request_details = array_merge($token_request_details, $itemized_order);
        if (! $request_shipping_address) {
            // Do not request shipping details on the PP Checkout page.
            $token_request_details['NOSHIPPING']         = '1';
            $token_request_details['REQCONFIRMSHIPPING'] = '0';
        } else {
            // Automatically filling out shipping and contact information.
            $transaction          = $payment->transaction();
            $primary_registration = $transaction->primary_registration();
            $primary_attendee     = $primary_registration instanceof EE_Registration
                ? $primary_registration->attendee()
                : false;
            if ($primary_attendee instanceof EE_Attendee) {
                // If you do not pass the shipping address, PayPal obtains it from the buyer's account profile.
                $token_request_details['NOSHIPPING']                         = '2';
                $token_request_details['PAYMENTREQUEST_0_SHIPTOSTREET']      = $primary_attendee->address();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOSTREET2']     = $primary_attendee->address2();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOCITY']        = $primary_attendee->city();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOSTATE']       = $primary_attendee->state_abbrev();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE'] = $primary_attendee->country_ID();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOZIP']         = $primary_attendee->zip();
                $token_request_details['PAYMENTREQUEST_0_EMAIL']             = $primary_attendee->email();
                $token_request_details['PAYMENTREQUEST_0_SHIPTOPHONENUM']    = $primary_attendee->phone();
            }
        }
        // Used a business/personal logo on the PayPal page.
        if (! empty($logo_image_url)) {
            $token_request_details['LOGOIMG'] = $logo_image_url;
        }
        return $token_request_details;
    }


    /**
     * @param EE_Payment $payment
     * @param array      $token_request_status
     * @param bool       $is_in_sandbox_mode
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processResponse(EE_Payment $payment, array $token_request_status, bool $is_in_sandbox_mode)
    {
        $response_args = (isset($token_request_status['args']) && is_array($token_request_status['args']))
            ? $token_request_status['args']
            : [];
        if ($token_request_status['status']) {
            // We got the Token so we may continue with the payment and redirect the client.
            $payment->set_details($response_args);
            $gateway_url = $is_in_sandbox_mode ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com';
            $token       = $response_args['TOKEN'];
            $payment->set_redirect_url(
                "{$gateway_url}/checkoutnow?useraction=commit&cmd=_express-checkout&token={$token}"
            );
            return;
        }
        $gateway_response = isset($response_args['L_ERRORCODE'])
            ? $response_args['L_ERRORCODE'] . '; ' . $response_args['L_SHORTMESSAGE']
            : esc_html__(
                'Error occurred while trying to setup the Express Checkout.',
                'event_espresso'
            );

        $payment->set_gateway_response($gateway_response);
        $payment->set_details($response_args);
        $payment->set_status(EEM_Payment::instance()->failed_status());
    }
}
