<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

use EE_Error;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class PayPalApi
 *
 * A base class for all PayPal API components used in this add-on.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class PayPalApi
{
    /**
     * Client ID. Used to process payments.
     *
     * @var string
     */
    protected $client_id = '';

    /**
     * Client secret. Used to process payments.
     *
     * @var string
     */
    protected $client_secret = '';

    /**
     * BN Code. Partner-Attribution-Id.
     *
     * @var string
     */
    protected $bn_code = '';

    /**
     * @var string PayPal API endpoint.
     */
    protected $api_endpoint = '';

    /**
     * @var bool Debug mode enabled ?
     */
    protected $sandbox_mode;

    /**
     * API request/response validation helper.
     *
     * @var ResponseInspector
     */
    protected $inspector;


    /**
     * @param string $client_id
     * @param string $client_secret
     * @param string $bn_code
     * @param bool   $sandbox_mode
     */
    public function __construct(string $client_id, string $client_secret, string $bn_code, bool $sandbox_mode = true)
    {
        $this->client_id     = $client_id;
        $this->client_secret = $client_secret;
        $this->sandbox_mode  = $sandbox_mode;
        $this->bn_code       = $bn_code;
        // Is this a sandbox request.
        $this->api_endpoint = $this->sandbox_mode
            ? 'https://api-m.sandbox.paypal.com/v2/'
            : 'https://api-m.paypal.com/v2/';
        $this->inspector    = new ResponseInspector();
    }


    /**
     * Send an API request.
     *
     * @param array  $body_parameters
     * @param string $endpoint
     * @param string $method
     * @param array  $headers
     * @return Object|array
     * @throws EE_Error
     */
    public function sendRequest(array $body_parameters, string $endpoint, string $method = 'POST', array $headers = [])
    {
        $request_parameters = $this->getRequestParameters($body_parameters, $method, $headers);
        // Sent the API request.
        $response = wp_remote_request($endpoint, $request_parameters);
        // Validate the response.
        $this->inspector->validateResponse($response);
        if (! $this->inspector->isValid()) {
            PayPalLogger::errorLog($this->inspector->error()['message'], [$endpoint, $request_parameters, $response]);
            return $this->inspector->error();
        }
        // Decode the parameters.
        $api_response = json_decode($response['body'], true);
        // Validate parameters.
        $this->inspector->validateParameters($api_response);
        if (! $this->inspector->isValid()) {
            PayPalLogger::errorLog($this->inspector->error()['message'], [$endpoint, $request_parameters, $response]);
            return $this->inspector->error();
        }
        // All seem ok, return the response.
        return $api_response;
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
        $default_headers = [
            'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
            'PayPal-Partner-Attribution-Id' => $this->bn_code,
            'Content-Type'                  => 'application/json',
            'Authorization'                 => 'Basic ' . base64_encode(
                $this->client_id . ':' . $this->client_secret
            ),
        ];
        $request_parameters['headers'] = array_merge($default_headers, $headers);
        // Add body if this is a POST request.
        if ($body_parameters && ($method === 'POST' || $method === 'PUT')) {
            $request_parameters['body'] = json_encode($body_parameters);
        }
        return $request_parameters;
    }


    /**
     * @return string
     */
    public function apiEndpoint(): string
    {
        return $this->api_endpoint;
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
