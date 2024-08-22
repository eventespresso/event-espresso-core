<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\clients;

use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class ClientToken
 *
 * Generates and sends a GET seller onboarding status request using PayPal API.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 * @since       5.0.13.p
 */
class ClientToken extends ClientsApi
{
    /**
     * ClientToken constructor.
     *
     * @param PayPalApi $api
     * @param bool      $sandbox_mode
     */
    public function __construct(PayPalApi $api, bool $sandbox_mode)
    {
        parent::__construct($api, $sandbox_mode);
        $this->request_url = $this->request_url . "/generate-token";
    }


    /**
     * Get the onboarding status and validate it.
     *
     * @return array
     */
    public function getToken(): array
    {
        // Send GET request.
        $response = $this->api->sendRequest([], $this->request_url);
        return $this->validateResponse($response);
    }


    /**
     * Makes sure that we have received the client token. Returns an error as array if not.
     *
     * @param array $response
     * @return array
     */
    public function validateResponse(array $response): array
    {
        // Could this be an error ?
        if (! empty($response['error'])) {
            return $response;
        }
        if (! empty($response['name']) && ! empty($response['message'])) {
            return ['error' => $response['name'], 'message' => $response['message']];
        }
        // Check the data we received.
        if (empty($response[ Domain::API_KEY_CLIENT_TOKEN ])) {
            $err_msg = esc_html__('No client token was found in the Client Token request response.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response);
            return ['error' => 'ONBOARDING_MISSING_CLIENT_TOKEN', 'message' => $err_msg];
        }
        return [
            'valid'        => true,
            'client_token' => $response[ Domain::API_KEY_CLIENT_TOKEN ],
            'expires_in'   => $response[ Domain::API_KEY_EXPIRES_IN ],
        ];
    }
}
