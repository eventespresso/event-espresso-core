<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EE_Error;
use EE_Transaction;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use ReflectionException;

/**
 * Class CaptureOrder
 *
 * Generates and sends a Capture Order request using PayPal API.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class CaptureOrder extends OrdersApi
{
    /**
     * Currency.
     *
     * @var string
     */
    protected $currency_code;

    /**
     * Transaction this order is for.
     *
     * @var EE_Transaction
     */
    protected $transaction;


    /**
     * CaptureOrder constructor.
     *
     * @param PayPalApi      $api
     * @param EE_Transaction $transaction
     * @param string         $order_id
     */
    public function __construct(PayPalApi $api, EE_Transaction $transaction, $order_id)
    {
        $order_id = (string) $order_id;
        parent::__construct($api);
        $this->transaction   = $transaction;
        $this->currency_code = CurrencyManager::currencyCode();
        $this->request_url   = $this->request_url . $order_id . '/capture';
    }


    /**
     * Capture payment for PayPal Order.
     *
     * @return array
     * @throws EE_Error
     */
    public function capture()
    {
        // Create Order request.
        $capture_response = $this->api->sendRequest([], $this->request_url);
        return $this->validateOrder($capture_response);
    }


    /**
     * Makes sure that we have received an Order back from the API call.
     *
     * @param $response
     * @return array
     */
    public function validateOrder($response)
    {
        if (! empty($response['error'])) {
            return $response;
        }
        if (! isset($response['id'])) {
            $message = esc_html__('Unexpected response. No order returned.', 'event_espresso');
            try {
                PayPalLogger::errorLog($message, [$this->request_url, $response], $this->transaction->payment_method());
            } catch (EE_Error $e) {
                // Just continue.
            } catch (ReflectionException $e) {
                // Just continue.
            }
            return [
                'error'   => isset($response['error']) ? $response['error'] : 'missing_order',
                'message' => isset($response['message']) ? $response['message'] : $message,
                'name'    => isset($response['name']) ? $response['name'] : 'UNKNOWN_ERROR',
            ];
        }
        return $response;
    }
}
