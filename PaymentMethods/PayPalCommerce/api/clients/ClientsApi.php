<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\clients;

use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;

/**
 * Class ClientsApi
 *
 * Abstract parent class for Client related actions/objects.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 * @since       5.0.13.p
 */
abstract class ClientsApi
{
    protected PayPalApi $api;

    protected string $request_url;


    /**
     * ClientsApi constructor.
     *
     * @param PayPalApi $api
     * @param bool   $sandbox_mode
     */
    public function __construct(PayPalApi $api, bool $sandbox_mode = true)
    {
        $this->api         = $api;
        // Is this a sandbox request.
        $api_endpoint = $sandbox_mode
            ? 'https://api-m.sandbox.paypal.com/'
            : 'https://api-m.paypal.com/';
        $this->request_url = $api_endpoint . 'v1/identity';
    }
}
