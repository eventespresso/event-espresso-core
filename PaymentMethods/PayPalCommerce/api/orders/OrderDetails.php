<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api\orders;

use EE_Error;
use EE_Transaction;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use ReflectionException;

/**
 * Class OrderDetails
 *
 * Generates and sends a Get Order Details request using PayPal API.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class OrderDetails extends OrdersApi
{
    /**
     * Transaction this order is for.
     *
     * @var EE_Transaction
     */
    protected EE_Transaction $transaction;

    private FeatureFlags $feature;


    /**
     * OrderDetails constructor.
     *
     * @param PayPalApi      $api
     * @param string         $order_id
     * @param EE_Transaction $transaction
     */
    public function __construct(PayPalApi $api, string $order_id, EE_Transaction $transaction)
    {
        parent::__construct($api);
        $this->transaction = $transaction;
        $this->request_url = $this->request_url . $order_id;
    }


    /**
     * Create PayPal Order.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get(): array
    {
        $response = $this->api->sendRequest([], $this->request_url, 'GET');
        return $this->validateResponse($response);
    }


    /**
     * Makes sure that we have received the expected Order information back from the API call.
     *
     * @param $response
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function validateResponse($response): array
    {
        PayPalLogger::errorLog(
            esc_html__('Validating Order Information Response:', 'event_espresso'),
            [$this->request_url, $response],
            $this->transaction->payment_method(),
            false,
            $this->transaction
        );
        if (! empty($response['error'])) {
            return $response;
        }
        if (! isset($response['id']) || ! isset($response['status'])) {
            $message = esc_html__('No proper order information was found in this response.', 'event_espresso');
            try {
                PayPalLogger::errorLog(
                    $message,
                    [$this->request_url, $response],
                    $this->transaction->payment_method()
                );
            } catch (EE_Error | ReflectionException $e) {
                error_log("PayPalLogger Error: $message: " . json_encode($response));
            }
            return [
                'error'   => $response['error'] ?? 'missing_order_info',
                'message' => $response['message'] ?? $message,
            ];
        }
        return $response;
    }
}
