<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

/**
 * Class ThirdPartyPayPalApi
 *
 * A base class for all PayPal API components used in this add-on.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class ThirdPartyPayPalApi extends PayPalApi
{
    /**
     * Partner access token used to process payments.
     *
     * @var string
     */
    protected string $access_token = '';

    /**
     * Partner Client ID.
     *
     * @var string
     */
    protected string $partner_client_id = '';

    /**
     * Merchant (seller) merchant ID.
     *
     * @var string
     */
    protected string $payer_id = '';

    /**
     * BN Code. Partner-Attribution-Id.
     *
     * @var string
     */
    protected string $bn_code = '';


    /**
     * @param string $access_token
     * @param string $bn_code
     * @param string $partner_client_id
     * @param string $payer_id
     * @param bool   $sandbox_mode
     */
    public function __construct(
        string $access_token,
        string $bn_code,
        string $partner_client_id = '',
        string $payer_id = '',
        bool $sandbox_mode = true
    ) {
        parent::__construct($sandbox_mode);
        $this->access_token      = $access_token;
        $this->partner_client_id = $partner_client_id;
        $this->payer_id          = $payer_id;
        $this->bn_code           = $bn_code;
    }


    /**
     * Send an API request.
     *
     * @param array  $body_parameters
     * @param string $endpoint
     * @param string $method
     * @param array  $headers
     * @return Object|array
     */
    public function sendRequest(array $body_parameters, string $endpoint, string $method = 'POST', array $headers = [])
    {
        $request_parameters = $this->getRequestParameters($body_parameters, $method, $headers);
        return $this->request($endpoint, $request_parameters);
    }


    /**
     * Build the request parameters.
     *
     * @param array  $body_parameters
     * @param string $method
     * @param array  $headers
     * @return array
     */
    private function getRequestParameters(array $body_parameters, string $method, array $headers): array
    {
        $request_parameters = ['method' => $method];
        $default_headers    = [
            'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
            'PayPal-Partner-Attribution-Id' => $this->bnCode(),
            'Content-Type'                  => 'application/json',
            'Authorization'                 => 'Bearer ' . $this->accessToken(),
        ];
        // If we have merchant credentials then we are onboard and can do requests on behalf of the seller.
        if ($this->partner_client_id && $this->payer_id) {
            $assertion1 = base64_encode(json_encode(['alg' => 'none'], JSON_HEX_APOS));
            $assertion2 = base64_encode(
                json_encode(
                    [
                        'iss'      => $this->partner_client_id,
                        'payer_id' => $this->payer_id,
                    ],
                    JSON_HEX_APOS
                )
            );
            // now concatenate the two assertions and add to the headers.
            $default_headers['PayPal-Auth-Assertion'] = "$assertion1.$assertion2.";
        }
        $request_parameters['headers'] = $headers + $default_headers;
        // Add body if this is a POST request.
        if ($body_parameters && ($method === 'POST' || $method === 'PUT')) {
            $request_parameters['body'] = json_encode($body_parameters);
        }
        return $request_parameters;
    }


    /**
     * @return string
     */
    public function accessToken(): string
    {
        return $this->access_token;
    }


    /**
     * @return string
     */
    public function bnCode(): string
    {
        return $this->bn_code;
    }
}
