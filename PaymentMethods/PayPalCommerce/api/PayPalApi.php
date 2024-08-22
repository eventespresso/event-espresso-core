<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class PayPalApi
 *
 * Abstract parent class for all PayPal API implementations.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
abstract class PayPalApi
{
    /**
     * @var bool Debug mode enabled ?
     */
    protected bool $sandbox_mode;

    /**
     * API request/response validation helper.
     *
     * @var ResponseInspector
     */
    protected ResponseInspector $inspector;

    /**
     * @var string PayPal API endpoint.
     */
    protected string $api_endpoint = '';


    /**
     * @param bool $sandbox_mode
     */
    public function __construct(bool $sandbox_mode = true)
    {
        $this->sandbox_mode = $sandbox_mode;
        // Is this a sandbox request.
        $this->api_endpoint = $this->sandbox_mode
            ? 'https://api-m.sandbox.paypal.com/v2/'
            : 'https://api-m.paypal.com/v2/';
        $this->inspector    = new ResponseInspector();
    }


    /**
     * Send an API request.
     *
     * @param string $endpoint
     * @param array  $request_parameters
     * @return Object|array
     */
    public function request(string $endpoint, array $request_parameters)
    {
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
     * @return string
     */
    public function apiEndpoint(): string
    {
        return $this->api_endpoint;
    }
}
