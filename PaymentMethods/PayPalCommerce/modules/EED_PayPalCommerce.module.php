<?php

use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
use EventEspresso\PaymentMethods\PayPalCommerce\api\clients\ClientToken;
use EventEspresso\PaymentMethods\PayPalCommerce\api\orders\CaptureOrder;
use EventEspresso\PaymentMethods\PayPalCommerce\api\orders\CreateOrder;
use EventEspresso\PaymentMethods\PayPalCommerce\api\orders\OrderDetails;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\api\FirstPartyPayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\api\ThirdPartyPayPalApi;
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
    public static function instance(): EED_Module
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
    }


    /**
     * For hooking into EE Core and other modules.
     *
     * @return void
     */
    public static function set_hooks(): void
    {
        if (DbStatus::isOnline()) {
            // Don't load PM on the front-end if not Connected.
            add_filter(
                'FHEE__EEM_Payment_Method__get_all_for_transaction__payment_methods',
                [__CLASS__, 'filterPaymentMethods'],
                100
            );
        }
    }


    /**
     * For hooking into EE Core and other modules Admin.
     *
     * @return void
     */
    public static function set_hooks_admin(): void
    {
        if (DbStatus::isOnline()) {
            // Create an Order.
            add_action('wp_ajax_eeaPPCCreateOrder', [__CLASS__, 'createOrderRequest']);
            add_action('wp_ajax_nopriv_eeaPPCCreateOrder', [__CLASS__, 'createOrderRequest']);
            // Log errors from the JS side.
            add_action('wp_ajax_eeaPPCommerceLogError', [__CLASS__, 'logJsError']);
            add_action('wp_ajax_nopriv_eeaPPCommerceLogError', [__CLASS__, 'logJsError']);
            // Don't load PM in the admin if not Connected.
            add_filter(
                'FHEE__EEM_Payment_Method__get_all_for_transaction__payment_methods',
                [__CLASS__, 'filterPaymentMethods'],
                100
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
    public static function createOrderRequest(): void
    {
        $paypal_pm   = EED_PayPalCommerce::getPaymentMethod();
        $post_params = EED_Module::getRequest()->postParams();
        if (! $paypal_pm instanceof EE_Payment_Method) {
            PayPalLogger::errorLogAndExit(
                esc_html__('Related payment method not found (create Order).', 'event_espresso'),
                $post_params
            );
        }
        $transaction  = EED_PayPalCommerce::getTransaction();
        $billing_info = $post_params['billing_info'] ?? [];
        if ($billing_info) {
            $billing_info_decoded = json_decode(stripslashes($billing_info), true);
            $billing_info         = is_array($billing_info_decoded) ? $billing_info_decoded : [];
        }
        if (! $transaction) {
            PayPalLogger::errorLogAndExit(
                esc_html__('Transaction info not found.', 'event_espresso'),
                $post_params,
                $paypal_pm
            );
        }
        $order_data = EED_PayPalCommerce::createOrder($transaction, $billing_info, $paypal_pm);
        wp_send_json($order_data);
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
     */
    public static function createOrder(
        EE_Transaction $transaction,
        array $billing_info,
        EE_Payment_Method $paypal_pm
    ): array {
        $create_order_api = EED_PayPalCommerce::getCreateOrderApi($transaction, $billing_info, $paypal_pm);
        if (! $create_order_api instanceof CreateOrder) {
            return [
                'error'   => 'CREATE_ORDER_API_FAULT',
                'message' => esc_html__('The Create Order API request fault.', 'event_espresso'),
            ];
        }
        $payment = EEG_PayPalCheckout::createPayment($transaction, $paypal_pm);
        $order   = $create_order_api->create();
        if (isset($order['error'])) {
            EEG_PayPalCheckout::updatePaymentStatus($payment, EEM_Payment::status_id_failed, $order, $order['error']);
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
     */
    public static function captureOrder(
        EE_Transaction    $transaction,
        EE_Payment_Method $paypal_pm,
        string            $order_id
    ): array {
        $capture_order_api = EED_PayPalCommerce::getCaptureOrderApi($transaction, $paypal_pm, $order_id);
        if (! $capture_order_api instanceof CaptureOrder) {
            return [
                'error'   => 'CAPTURE_ORDER_API_FAULT',
                'message' => esc_html__('A capture Order API request fault.', 'event_espresso'),
            ];
        }
        return $capture_order_api->capture();
    }


    /**
     * Get Order Details using the PP API.
     *
     * @param string            $order_id
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $paypal_pm
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getOrderDetails(
        string            $order_id,
        EE_Transaction    $transaction,
        EE_Payment_Method $paypal_pm
    ): array {
        $order_details = EED_PayPalCommerce::getOrderDetailsApi($order_id, $transaction, $paypal_pm);
        if (! $order_details instanceof OrderDetails) {
            return [
                'error'   => 'ORDER_DETAILS_API_FAULT',
                'message' => esc_html__('Get Order Details API request fault.', 'event_espresso'),
            ];
        }
        return $order_details->get();
    }


    /**
     * Initialize and return Create Order API.
     *
     * @param EE_Transaction    $transaction
     * @param array             $billing_info
     * @param EE_Payment_Method $paypal_pm
     * @return CreateOrder|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getCreateOrderApi(
        EE_Transaction $transaction,
        array $billing_info,
        EE_Payment_Method $paypal_pm
    ): ?CreateOrder {
        $paypal_api = EED_PayPalCommerce::getPayPalApi($paypal_pm);
        if (! $paypal_api instanceof PayPalApi) {
            return null;
        }
        return LoaderFactory::getNew(CreateOrder::class, [$paypal_api, $transaction, $billing_info]);
    }


    /**
     * Initialize and return Capture Order API.
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $paypal_pm
     * @param string            $order_id
     * @return CaptureOrder|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getCaptureOrderApi(
        EE_Transaction $transaction,
        EE_Payment_Method $paypal_pm,
        string $order_id
    ): ?CaptureOrder {
        $paypal_api = EED_PayPalCommerce::getPayPalApi($paypal_pm);
        if (! $paypal_api instanceof PayPalApi) {
            return null;
        }
        return LoaderFactory::getNew(CaptureOrder::class, [$paypal_api, $transaction, $order_id]);
    }


    /**
     * Initialize and return Order Details API.
     *
     * @param EE_Transaction    $transaction
     * @param EE_Payment_Method $paypal_pm
     * @param string            $order_id
     * @return OrderDetails|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getOrderDetailsApi(
        string $order_id,
        EE_Transaction $transaction,
        EE_Payment_Method $paypal_pm
    ): ?OrderDetails {
        $paypal_api = EED_PayPalCommerce::getPayPalApi($paypal_pm);
        if (! $paypal_api instanceof PayPalApi) {
            return null;
        }
        return LoaderFactory::getNew(OrderDetails::class, [$paypal_api, $order_id, $transaction]);
    }


    /**
     * Return a PayPal API object, or false on failure.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return PayPalApi|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getPayPalApi(EE_Payment_Method $paypal_pm): ?PayPalApi
    {
        // Try getting the first party credentials to determine if this is a first party integration that's active.
        $client_id     = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_CLIENT_ID);
        $client_secret = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_CLIENT_SECRET);
        $bn_code       = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        if ($client_id && $client_secret) {
            return new FirstPartyPayPalApi($client_id, $client_secret, $bn_code, $paypal_pm->debug_mode());
        }
        // Third party integration credentials:
        $access_token = EED_PayPalOnboard::getPartnerAccessToken($paypal_pm);
        if (! $access_token || ! $bn_code) {
            return null;
        }
        $partner_client_id = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_PARTNER_CLIENT_ID) ?: '';
        $payer_id          = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_SELLER_MERCHANT_ID) ?: '';
        return new ThirdPartyPayPalApi(
            $access_token,
            $bn_code,
            $partner_client_id,
            $payer_id,
            $paypal_pm->debug_mode()
        );
    }


    /**
     * Requests a client token.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function requestClientToken(EE_Payment_Method $paypal_pm): array
    {
        $error      = ['error' => 'GET_CLIENT_TOKEN_FAULT'];
        $paypal_api = EED_PayPalCommerce::getPayPalApi($paypal_pm);
        if (! $paypal_api instanceof PayPalApi) {
            $error['message'] = esc_html__('Got an error while trying to get the client token.', 'event_espresso');
            return $error;
        }
        $client_token_api = new ClientToken($paypal_api, $paypal_pm->debug_mode());
        $client_token     = $client_token_api->getToken();
        if (isset($client_token['error'])) {
            return $client_token;
        }
        if (empty($client_token)) {
            $error['message'] = esc_html__('Client token not valid.', 'event_espresso');
            return $error;
        }
        return $client_token;
    }


    /**
     * Retrieve the payment method from the provided data.
     *
     * @return EE_Transaction|null
     */
    public static function getTransaction(): ?EE_Transaction
    {
        try {
            $txn_id      = EED_Module::getRequest()->getRequestParam('txn_id', 0, DataType::INT);
            $transaction = EEM_Transaction::instance()->get_one_by_ID($txn_id);
            if (! $transaction instanceof EE_Transaction) {
                PayPalLogger::errorLog(
                    esc_html__('No transaction found by ID:', 'event_espresso'),
                    EED_Module::getRequest()->postParams()
                );
                return null;
            }
        } catch (Exception $e) {
            return null;
        }
        return $transaction;
    }


    /**
     * Return a PayPal API object, or false on failure.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function isThirdParty(EE_Payment_Method $paypal_pm): bool
    {
        $pp_meta_data = PayPalExtraMetaManager::getAllData($paypal_pm);
        return ! empty($pp_meta_data[ Domain::META_KEY_SELLER_MERCHANT_ID ])
            && ! empty($pp_meta_data[ Domain::META_KEY_ACCESS_TOKEN ]);
    }


    /**
     * Retrieve the payment method from the provided data.
     *
     * @return EE_Payment_Method|null
     */
    public static function getPaymentMethod(): ?EE_Payment_Method
    {
        try {
            // Check if all required parameters are present.
            $pm_slug        = EED_Module::getRequest()->getRequestParam('payment_method');
            $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($pm_slug);
            if ($payment_method instanceof EE_Payment_Method) {
                return $payment_method;
            }
        } catch (Exception $e) {
            return null;
        }
        return null;
    }


    /**
     * Log JS error.
     *
     * @return void
     */
    public static function logJsError(): void
    {
        // Default to the "first" PayPal checkout PM.
        $request        = EED_Module::getRequest();
        $pm_slug        = $request->getRequestParam('pm_slug', Domain::PM_SLUG);
        $payment_method = null;
        $txn_id         = 'unknown';
        try {
            $payment_method = EEM_Payment_Method::instance()->get_one_of_type($pm_slug);
            $txn_id         = sanitize_text_field($request->getRequestParam('txn_id', '-'));
        } catch (Exception $e) {
            // Don't throw out anything, log at least something.
        }
        $transaction = EED_PayPalCommerce::getTransaction();
        PayPalLogger::errorLog(
            "JS Error on transaction: $txn_id",
            $request->postParams(),
            $payment_method,
            false,
            $transaction
        );
    }


    /**
     * Filter the Payment Methods list.
     * if needed, this filter can also supply the $transaction and $scope parameters.
     *
     * @param EE_Payment_Method[] $payment_methods
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function filterPaymentMethods(array $payment_methods): array
    {
        // Don't allow this PM on the checkout page if not Connected.
        foreach ($payment_methods as $key => $pm) {
            // It is a PayPal Commerce payment method. Check if it's connected. If not - remove from the list.
            if (str_contains($pm->slug(), Domain::PM_SLUG) && ! EED_PayPalOnboard::isOnboard($pm)) {
                unset($payment_methods[ $key ]);
            }
        }
        return $payment_methods;
    }


    /**
     *  Get all active states.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getActiveStates(): array
    {
        $state_options = [];
        $states        = EEM_State::instance()->get_all_active_states();
        if (! empty($states)) {
            foreach ($states as $numeral => $state) {
                if ($state instanceof EE_State) {
                    $state_options[ $numeral ] = $state->abbrev();
                }
            }
        }
        return $state_options;
    }
}
