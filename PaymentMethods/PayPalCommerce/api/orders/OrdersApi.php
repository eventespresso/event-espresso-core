<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;

/**
 * Class OrdersApi
 *
 * Abstract parent class for Order related actions/objects.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
abstract class OrdersApi
{
    /**
     * @var PayPalApi
     */
    protected PayPalApi $api;

    /**
     * @var string
     */
    protected string $request_url;

    /**
     * @var string
     */
    protected string $order_id;


    /**
     * Orders API constructor.
     *
     * @param PayPalApi $api
     */
    public function __construct(PayPalApi $api)
    {
        $this->api         = $api;
        $this->request_url = $this->api->apiEndpoint() . 'checkout/orders/';
    }
}
