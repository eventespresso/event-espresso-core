<?php

use EventEspresso\core\services\request\DataType;
use EventEspresso\PaymentMethods\PayPalCommerce\api\orders\CaptureOrder;
use EventEspresso\PaymentMethods\PayPalCommerce\api\orders\CreateOrder;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class EED_PayPalCommerce
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class EED_PayPalCommerce extends EED_Module
{
    /**
     * @return EED_Module
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * Run - initial module setup.
     *
     * @param WP $WP
     * @return void
     */
    public function run($WP)
    {
        // TODO: Implement run() method.
    }


    /**
     * For hooking into EE Core and other modules.
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * For hooking into EE Admin Core and other modules.
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        if (EE_Maintenance_Mode::instance()->models_can_query()) {
            // Create an Order.
            add_action('wp_ajax_eeaPpCreateOrder', [__CLASS__, 'createOrderRequest']);
            add_action('wp_ajax_nopriv_eeaPpCreateOrder', [__CLASS__, 'createOrderRequest']);
            // Capture the Order.
            add_action('wp_ajax_eeaPpCaptureOrder', [__CLASS__, 'captureOrderRequest']);
            add_action('wp_ajax_nopriv_eeaPpCaptureOrder', [__CLASS__, 'captureOrderRequest']);
            // Log errors from the JS side.
            add_action('wp_ajax_eeaPPCommerceLogError', [__CLASS__, 'logJsError']);
            add_action('wp_ajax_nopriv_eeaPPCommerceLogError', [__CLASS__, 'logJsError']);
            // Don't load PM on the front-end if not Connected.
            add_filter(
                'FHEE__EEM_Payment_Method__get_all_for_transaction__payment_methods',
                [__CLASS__, 'filterPaymentMethods'],
                10,
                3
            );
        }
    }


    /**
     * Create the order and return its data as JSON.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function createOrderRequest()
    {
        $paypal_pm   = self::getPaymentMethod();
        $request     = EED_Module::getRequest();
        $post_params = $request->postParams();
        if (! $paypal_pm instanceof EE_Payment_Method) {
            PayPalLogger::errorLogAndExit(
                esc_html__('Related payment method not found (create Order).', 'event_espresso'),
                $post_params
            );
        }
        $transaction  = self::getTransaction();
        $billing_info = isset($post_params['billing_info']) ? $post_params['billing_info'] : [];
        if ($billing_info) {
            $billing_info_decoded = json_decode(stripslashes($billing_info), true);
            if (is_array($billing_info_decoded)) {
                $billing_info = $billing_info_decoded;
            }
        }
        if (! $transaction || ! $billing_info || ! is_array($billing_info)) {
            PayPalLogger::errorLogAndExit(
                esc_html__('Transaction or billing info not found.', 'event_espresso'),
                $post_params,
                $paypal_pm
            );
        }
        $order_data = self::createOrder($transaction, $billing_info, $paypal_pm);
        echo json_encode($order_data);
        exit();
    }


    /**
     * Capture the order and return status in JSON.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function captureOrderRequest()
    {
        $error_message = false;
        $paypal_pm     = self::getPaymentMethod();
        if (! $paypal_pm instanceof EE_Payment_Method) {
            $error_message = esc_html__('Payment method not found (capture Order).', 'event_espresso');
        }
        $transaction = self::getTransaction();
        if (! $transaction) {
            $error_message = esc_html__('Transaction not found.', 'event_espresso');
        }
        $order_id = EED_Module::getRequest()->getRequestParam('order_id', '', DataType::STRING);
        if (! $order_id) {
            $error_message = esc_html__('Order ID missing.', 'event_espresso');
        }
        // We had an error. Log and EXIT.
        if ($error_message) {
            PayPalLogger::errorLogAndExit($error_message, EED_Module::getRequest()->postParams(), $paypal_pm);
        }
        $capture_response = self::captureOrder($transaction, $paypal_pm, $order_id);
        echo json_encode($capture_response);
        exit();
    }


    /**
     * Create a new Order using the PP API.
     *
     * @param EE_Transaction    $transaction
     * @param array             $billing_info
     * @param EE_Payment_Method $paypal_pm
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public static function createOrder(
        $transaction,
        $billing_info,
        $paypal_pm
    ) {
        $create_order_api = self::getCreateOrderApi($transaction, $billing_info, $paypal_pm);
        if (! $create_order_api instanceof CreateOrder) {
            return [
                'error'   => 'CREATE_ORDER_API_FAULT',
                'message' => esc_html__('The Create Order API request fault.', 'event_espresso'),
            ];
        }
        $order = $create_order_api->create();
        if (isset($order['error'])) {
            return [
                'error'   => 'CREATE_ORDER_API_RESPONSE_ERROR',
                'message' => $order['message'],
            ];
        }
        return [
            'pp_order_id' => $order['id'],
        ];
    }


    /**
     * Create a new Order using the PP API.
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $paypal_pm
     * @param string            $order_id
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public static function captureOrder(
        $transaction,
        $paypal_pm,
        $order_id
    ) {
        $capture_order_api = self::getCaptureOrderApi($transaction, $paypal_pm, $order_id);
        if (! $capture_order_api instanceof CaptureOrder) {
            return [
                'error'   => 'CAPTURE_ORDER_API_FAULT',
                'message' => esc_html__('A capture Order API request fault.', 'event_espresso'),
            ];
        }
        $order = $capture_order_api->capture();
        if (isset($order['error'])) {
            return $order;
        }
        // Attach the transaction ID to this order.
        $order['ee_txn_id'] = $transaction->ID();
        // Save this order details.
        PayPalExtraMetaManager::savePmOption($paypal_pm, Domain::META_KEY_LAST_ORDER, $order);
        $nonce = wp_create_nonce(Domain::CAPTURE_ORDER_NONCE_NAME);
        return [
            'pp_order_nonce'         => $nonce,
            'pp_order_id'            => $order['id'],
            'pp_order_status'        => $order['status'],
            'pp_order_amount'        => $order['purchase_units'][0]['payments']['captures'][0]['amount']['value'],
        ];
    }


    /**
     * Create an Order for this transaction.
     *
     * @param EE_Transaction    $transaction
     * @param array             $billing_info
     * @param EE_Payment_Method $paypal_pm
     * @return CreateOrder|null
     * @throws Exception
     */
    public static function getCreateOrderApi(
        $transaction,
        $billing_info,
        $paypal_pm
    ) {
        $paypal_api = self::getPayPalApi($paypal_pm);
        if (! $paypal_api) {
            return null;
        }
        return new CreateOrder($paypal_api, $transaction, $billing_info);
    }


    /**
     * Create an Order for this transaction.
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $paypal_pm
     * @param string            $order_id
     * @return CaptureOrder|null
     * @throws Exception
     */
    public static function getCaptureOrderApi(
        $transaction,
        $paypal_pm,
        $order_id
    ) {
        $paypal_api = self::getPayPalApi($paypal_pm);
        if (! $paypal_api) {
            return null;
        }
        return new CaptureOrder($paypal_api, $transaction, $order_id);
    }


    /**
     * Return a PayPal API object, or false on failure.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return PayPalApi|null
     * @throws Exception
     */
    public static function getPayPalApi($paypal_pm)
    {
        $client_id     = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_CLIENT_ID);
        $client_secret = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_CLIENT_SECRET);
        $bn_code       = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        if (! $client_id || ! $client_secret || ! $bn_code) {
            return null;
        }
        return new PayPalApi($client_id, $client_secret, $bn_code, $paypal_pm->debug_mode());
    }


    /**
     * Retrieve the payment method from the provided data.
     *
     * @return EE_Transaction|null
     * @throws EE_Error
     */
    public static function getTransaction()
    {
        $txn_id      = EED_Module::getRequest()->getRequestParam('txn_id', 0, DataType::INT);
        $transaction = EEM_Transaction::instance()->get_one_by_ID($txn_id);
        if (! $transaction instanceof EE_Transaction) {
            PayPalLogger::errorLog(
                esc_html__('No transaction found by ID:', 'event_espresso'),
                EED_Module::getRequest()->postParams()
            );
            return null;
        }
        return $transaction;
    }


    /**
     * Retrieve the payment method from the provided data.
     *
     * @return EE_Payment_Method|null
     */
    public static function getPaymentMethod()
    {
        try {
            // Check if all required parameters are present.
            $pm_slug        = EED_Module::getRequest()->getRequestParam('payment_method');
            $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($pm_slug);
            if ($payment_method instanceof EE_Payment_Method) {
                return $payment_method;
            }
        } catch (EE_Error $e) {
            return null;
        }
        return null;
    }


    /**
     * Log JS error.
     *
     * @return void
     * @throws EE_Error
     */
    public static function logJsError()
    {
        // Default to the "first" Paypal checkout PM.
        $request        = EED_Module::getRequest();
        $pm_slug        = $request->getRequestParam('pm_slug', Domain::PM_SLUG);
        $payment_method = EEM_Payment_Method::instance()->get_one_of_type($pm_slug);
        // Can't log without a pM object.
        if (! $payment_method) {
            return;
        }
        $txn_id      = sanitize_text_field($request->getRequestParam('txn_id', '-'));
        $transaction = EEM_Transaction::instance()->get_one_by_ID($txn_id) !== null ? EEM_Transaction::instance()->get_one_by_ID($txn_id) : 'Payment_Method';
        $payment_method->type_obj()->get_gateway()->log(
            ['JS Error (Transaction: ' . $txn_id . ')' => $request->getRequestParam('message')],
            $transaction
        );
    }


    /**
     * Filter the Payment Methods list.
     *
     * @param EE_Payment_Method[] $payment_methods
     * @param EE_Transaction      $transaction
     * @param string              $scope @see EEM_Payment_Method::get_all_for_events
     * @return array
     * @throws EE_Error
     */
    public static function filterPaymentMethods($payment_methods, $transaction, $scope)
    {
        // Don't allow this PM on the checkout page if not Connected.
        foreach ($payment_methods as $key => $pm) {
            // It is a PayPal Commerce payment method. Check if it's connected. If not - remove from the list.
            if (strpos($pm->slug(), Domain::PM_SLUG) !== false && ! EED_PayPalOnboard::isOnboard($pm)) {
                unset($payment_methods[ $key ]);
            }
        }
        return $payment_methods;
    }
}
