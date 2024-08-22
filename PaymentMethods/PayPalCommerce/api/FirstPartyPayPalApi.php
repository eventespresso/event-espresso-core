<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

/**
 * Class FirstPartyPayPalApi
 *
 * A base class for all PayPal API components used in this add-on.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class FirstPartyPayPalApi extends PayPalApi
{
    /**
     * Client ID. Used to process payments.
     *
     * @var string
     */
    protected string $client_id = '';

    /**
     * Client secret. Used to process payments.
     *
     * @var string
     */
    protected string $client_secret = '';

    /**
     * BN Code. Partner-Attribution-Id.
     *
     * @var string
     */
    protected string $bn_code = '';


    /**
     * @param string $client_id
     * @param string $client_secret
     * @param string $bn_code
     * @param bool   $sandbox_mode
     */
    public function __construct(string $client_id, string $client_secret, string $bn_code, bool $sandbox_mode = true)
    {
        parent::__construct($sandbox_mode);
        $this->client_id     = $client_id;
        $this->client_secret = $client_secret;
        $this->bn_code       = $bn_code;
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
        $request_parameters = [
            'method'      => $method,
            'timeout'     => 60,
            'redirection' => 5,
            'blocking'    => true,
        ];
        // add default values to incoming headers.
        $request_parameters['headers'] = $headers + [
            'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
            'PayPal-Partner-Attribution-Id' => $this->bn_code,
            'Content-Type'                  => 'application/json',
            'Authorization'                 => 'Basic ' . base64_encode("$this->client_id:$this->client_secret"),
        ];
        // Add body if this is a POST request.
        if ($body_parameters && ($method === 'POST' || $method === 'PUT')) {
            $request_parameters['body'] = json_encode($body_parameters);
        }
        return $request_parameters;
    }


    /**
     * @return string
     */
    public function clientId(): string
    {
        return $this->client_id;
    }


    /**
     * @return string
     */
    public function clientSecret(): string
    {
        return $this->client_secret;
    }


    /**
     * @return string
     */
    public function bnCode(): string
    {
        return $this->bn_code;
    }
}
