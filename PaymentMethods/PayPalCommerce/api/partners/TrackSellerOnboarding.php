<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\partners;

use EE_Error;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class TrackSellerOnboarding
 *
 * Generates and sends a GET seller onboarding status request using PayPal API.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class TrackSellerOnboarding extends PartnersApi
{
    /**
     * Partner access token.
     *
     * @var int
     */
    protected $access_token;

    /**
     * Partner ID.
     *
     * @var int
     */
    protected $partner_id;

    /**
     * Seller ID.
     *
     * @var int
     */
    protected $seller_id;


    /**
     * TrackSellerOnboarding constructor.
     *
     * @param PayPalApi $api
     * @param string    $partner_id
     * @param string    $seller_id
     * @param bool      $sandbox_mode
     */
    public function __construct(
        PayPalApi $api,
        $partner_id,
        $seller_id,
        $sandbox_mode
    ) {
        $partner_id = (string) $partner_id;
        $seller_id = (string) $seller_id;
        $sandbox_mode = (bool) $sandbox_mode;
        parent::__construct($api, $sandbox_mode);
        $this->partner_id  = $partner_id;
        $this->seller_id   = $seller_id;
        $this->request_url = $this->request_url . "/{$partner_id}/merchant-integrations/{$seller_id}";
    }


    /**
     * Get the onboarding status and validate it.
     *
     * @return array
     * @throws EE_Error
     */
    public function isValid()
    {
        // Send GET request.
        $response = $this->api->sendRequest([], $this->request_url, 'GET');
        return $this->validateStatus($response);
    }


    /**
     * Makes sure that we have received proper parameters and the status is valid.
     *
     * @param array $response
     * @return array
     * @throws EE_Error
     */
    public function validateStatus($response)
    {
        if (! empty($response['error'])) {
            return $response;
        }
        // Check the data we received.
        if (
            empty($response['merchant_id'])
            || ! isset($response['payments_receivable'])
            || ! isset($response['primary_email_confirmed'])
        ) {
            $err_msg = esc_html__('Missing required data for validating the onboarding status.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_MISSING_REQUIRED_DATA', 'message' => $err_msg];
        }
        // Now validate the onboarding status.
        if (! $response['payments_receivable']) {
            $err_msg = esc_html__(
                'Your Account has been limited by PayPal. Please check your PayPal account inbox for an email from PayPal to determine the next steps for this.',
                'event_espresso'
            );
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_LIMITED_BY_PAYPAL', 'message' => $err_msg];
        }
        if (! $response['primary_email_confirmed']) {
            $err_msg = esc_html__('Email address not confirmed. Please confirm your email address.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_CONFIRM_EMAIL', 'message' => $err_msg];
        }
        return ['valid' => true];
    }
}
