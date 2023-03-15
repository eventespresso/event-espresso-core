<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\partners;

use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;

/**
 * Class PartnersApi
 *
 * Abstract parent class for Partner related actions/objects.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
abstract class PartnersApi
{
    /**
     * @var PayPalApi
     */
    protected $api;

    /**
     * @var string
     */
    protected $request_url;


    /**
     * PartnersApi constructor.
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
        $this->request_url = $api_endpoint . 'v1/customer/partners';
    }
}
