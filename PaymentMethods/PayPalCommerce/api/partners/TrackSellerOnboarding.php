<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\partners;

use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
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
     * Partner ID.
     *
     * @var string
     */
    protected string $partner_id;

    /**
     * Seller ID.
     *
     * @var string
     */
    protected string $seller_id;


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
        string $partner_id,
        string $seller_id,
        bool $sandbox_mode
    ) {
        parent::__construct($api, $sandbox_mode);
        $this->partner_id  = $partner_id;
        $this->seller_id   = $seller_id;
        $this->request_url = $this->request_url . "/{$partner_id}/merchant-integrations/{$seller_id}";
    }


    /**
     * Get the onboarding status and validate it.
     *
     * @return array
     */
    public function isValid(): array
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
     */
    public function validateStatus(array $response): array
    {
        if (! empty($response['error'])) {
            return $response;
        }
        if (! empty($response['name']) && ! empty($response['message'])) {
            return ['error' => $response['name'], 'message' => $response['message']];
        }
        // Check the data we received.
        if (
            empty($response[ Domain::API_PARAM_TRACK_MERCHANT_ID ])
            || ! isset($response[ Domain::API_PARAM_PAYMENTS_RECEIVABLE ])
            || ! isset($response[ Domain::API_PARAM_PRIM_EMAIL_CONFIRMED ])
            || ! isset($response[ Domain::API_PARAM_OAUTH_INTEGRATIONS ])
        ) {
            $err_msg = esc_html__('Missing required data for validating the onboarding status.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_MISSING_REQUIRED_DATA', 'message' => $err_msg];
        }
        // Now validate the onboarding status.
        if (! $response[ Domain::API_PARAM_PAYMENTS_RECEIVABLE ]) {
            $err_msg = esc_html__(
                'Your Account has been limited by PayPal. Please check your PayPal account inbox for an email from PayPal to determine the next steps for this.',
                'event_espresso'
            );
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_LIMITED_BY_PAYPAL', 'message' => $err_msg];
        }
        if (! $response[ Domain::API_PARAM_PRIM_EMAIL_CONFIRMED ]) {
            $err_msg = esc_html__('Email address not confirmed. Please confirm your email address.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_CONFIRM_EMAIL', 'message' => $err_msg];
        }
        if (empty($response[ Domain::API_PARAM_OAUTH_INTEGRATIONS ])) {
            $permissions_valid = false;
            // Look for the granted permissions.
            foreach ($response[ Domain::API_PARAM_OAUTH_INTEGRATIONS ] as $integration_type) {
                if (! empty($integration_type[ Domain::API_PARAM_PERMISSIONS_GRANTED ])) {
                    $permissions_valid = true;
                }
            }
            // Did we find any ? If no - oauth not valid.
            if (! $permissions_valid) {
                $err_msg = esc_html__(
                    'Not all required permissions were granted. Please allow all permissions while onboarding.',
                    'event_espresso'
                );
                PayPalLogger::errorLog($err_msg, $response);
                return ['error' => 'ONBOARDING_PERMISSIONS_NOT_GRANTED', 'message' => $err_msg];
            }
        }
        return [
            'valid'    => true,
            'response' => $response,
        ];
    }
}
