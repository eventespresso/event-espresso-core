<?php

use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\PaymentMethods\Manager;
use EventEspresso\PaymentMethods\PayPalCommerce\api\partners\TrackSellerOnboarding;
use EventEspresso\PaymentMethods\PayPalCommerce\api\PayPalApi;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\api\OneTimeString;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;

/**
 * Class EED_PayPalOnboard
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class EED_PayPalOnboard extends EED_Module
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
     * For hooking into EE Admin Core and other modules.
     *
     * @return void
     */
    public static function set_hooks_admin(): void
    {
        // check for the most basic EE capability
        /** @var EE_Capabilities $capabilities */
        $capabilities = LoaderFactory::getLoader()->getShared(EE_Capabilities::class);
        if (
            DbStatus::isOffline()
            || ! $capabilities->current_user_can('ee_manage_gateways', 'manage-paypal-onboarding')
        ) {
            return;
        }
        // Get onboarding URL.
        add_action('wp_ajax_eeaPpGetOnboardingUrl', [__CLASS__, 'getOnboardingUrl']);
        // Catch the return/redirect from PayPal onboarding page.
        add_action('init', [__CLASS__, 'updateOnboardingStatus']);
        // Return the connection/onboard status.
        add_action('wp_ajax_eeaPpGetOnboardStatus', [__CLASS__, 'getOnboardStatus']);
        // Revoke access.
        add_action('wp_ajax_eeaPpOffboard', [__CLASS__, 'offboard']);
        // Clear all metadata.
        add_action('wp_ajax_eeaPpClearMetaData', [__CLASS__, 'clearMetaData']);
        // Admin notice.
        add_action('admin_init', [__CLASS__, 'adminNotice']);
    }


    /**
     * Get the onboarding URL.
     * (AJAX)
     *
     * @return void
     */
    public static function getOnboardingUrl(): void
    {
        $signup_link = '';
        try {
            $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
            if (! $paypal_pm instanceof EE_Payment_Method) {
                PayPalLogger::errorLogAndExit(
                    esc_html__('No payment method.', 'event_espresso'),
                    EED_Module::getRequest()->postParams(),
                    $paypal_pm
                );
            }
            PayPalExtraMetaManager::updateDebugMode($paypal_pm, EED_Module::getRequest()->postParams());
            // Just get a new onboarding URL every time.
            $signup_link = EED_PayPalOnboard::requestOnboardingUrl($paypal_pm);
            if (! $signup_link) {
                $err_msg = esc_html__('Error! Could not generate a sign-up link.', 'event_espresso');
                PayPalLogger::errorLogAndExit($err_msg, ['signup_link' => $signup_link], $paypal_pm);
            }
        } catch (Exception $e) {
            PayPalLogger::errorLogAndExit($e->getMessage(), ['trace' => $e->getTrace()]);
        }
        // Is it empty (can happen if we didn't get the URL through the API).
        $signup_link = $signup_link ? $signup_link . '?&displayMode=minibrowser' : '#';
        wp_send_json(
            [
                'signup_link' => $signup_link,
            ]
        );
    }


    /**
     * Request the sign-up link from PayPal.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param bool              $one_time_request
     * @return string
     * @throws EE_Error
     * @throws Exception
     */
    public static function requestOnboardingUrl(EE_Payment_Method $paypal_pm, bool $one_time_request = false): string
    {
        $signup_link = '';
        // Get the access token.
        $access_token = EED_PayPalOnboard::getPartnerAccessToken($paypal_pm);
        if (! $access_token) {
            $err_msg = esc_html__('Error! No access token.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, ['access_token' => $access_token], $paypal_pm);
            return '';
        }
        // Request the access token.
        $body_params = EED_PayPalOnboard::signupLinkRequestBody($paypal_pm);
        $bn_code     = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        $post_params = [
            'method'  => 'POST',
            'headers' => [
                'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
                'Content-Type'                  => 'application/json',
                'Authorization'                 => 'Bearer ' . $access_token,
                'PayPal-Partner-Attribution-Id' => $bn_code,
            ],
            'body'    => $body_params,
        ];
        $request_url = Domain::getPayPalApiUrl($paypal_pm) . '/v2/customer/partner-referrals';
        $response    = EED_PayPalOnboard::sendRequest($paypal_pm, $request_url, $post_params);
        // Check the data we received.
        if (isset($response['error']) || empty($response['links'])) {
            // Did the original access token get replaced by any chance ?
            if (
                ! $one_time_request
                && ! empty($response['message'])
                && $response['message'] === 'Access Token not found in cache'
            ) {
                // Clear all PM metadata and try getting the access token One more time.
                PayPalExtraMetaManager::deleteData($paypal_pm);
                PayPalLogger::errorLog(
                    esc_html__('Removing old metadata before new onboarding.', 'event_espresso'),
                    $response,
                    $paypal_pm
                );
                return EED_PayPalOnboard::requestOnboardingUrl($paypal_pm, true);
            }
            $err_msg = esc_html__('Incoming sign-up link parameter validation failed.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response, $paypal_pm);
            return '';
        }
        // Now retrieve that sign-up link.
        foreach ($response['links'] as $link) {
            if ($link['rel'] === 'action_url') {
                $signup_link = $link['href'] ?? '';
            }
        }
        return $signup_link;
    }


    /**
     * Get the return URL.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws Exception
     */
    public static function signupLinkRequestBody(EE_Payment_Method $paypal_pm): string
    {
        $identifier_string = new OneTimeString($paypal_pm->debug_mode());
        $tracking_id       = $identifier_string->value();
        $request           = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $checkout_type     = $request->getRequestParam('checkout_type', 'EXPRESS_CHECKOUT');
        // Save the identifier for future use.
        PayPalExtraMetaManager::savePmOption($paypal_pm, Domain::META_KEY_TRACKING_ID, $tracking_id);
        // Assemble the return URL.
        $return_url = EED_PayPalOnboard::getReturnUrl($paypal_pm);
        return json_encode(
            [
                'tracking_id'             => $tracking_id,
                'operations'              => [
                    [
                        'operation'                  => 'API_INTEGRATION',
                        'api_integration_preference' => [
                            'rest_api_integration' => [
                                'integration_method'  => 'PAYPAL',
                                'integration_type'    => 'THIRD_PARTY',
                                'third_party_details' => [
                                    'features' => ['PAYMENT', 'REFUND', 'PARTNER_FEE'],
                                ],
                            ],
                        ],
                    ],
                ],
                'products'                => [$checkout_type],
                'legal_consents'          => [
                    [
                        'type'    => 'SHARE_DATA_CONSENT',
                        'granted' => true,
                    ],
                ],
                'partner_config_override' => [
                    'return_url' => $return_url,
                ],
            ]
        );
    }


    /**
     * Get the return URL.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getReturnUrl(EE_Payment_Method $paypal_pm): string
    {
        $wp_nonce = EED_Module::getRequest()->getRequestParam('wp_nonce');
        $nonce    = wp_create_nonce(Domain::NONCE_NAME_ONBOARDING_RETURN);
        return add_query_arg(
            [
                'page'                        => 'espresso_payment_settings',
                'webhook_action'              => 'eepPpcMerchantOnboard',
                'payment_method'              => $paypal_pm->slug(),
                '_wpnonce'                    => $wp_nonce,
                'nonce'                       => $nonce,
                Domain::META_KEY_SANDBOX_MODE => $paypal_pm->debug_mode() ? '1' : '0',
            ],
            admin_url('admin.php')
        );
    }


    /**
     * Redirect to the payment method (PP) settings home page.
     *
     * @return void
     */
    public static function redirectToPmSettingsHome(): void
    {
        $get_params = EED_Module::getRequest()->getParams();
        if (empty($get_params['payment_method'])) {
            // Simply do not redirect.
            return;
        }
        $args_to_add = [
            'page'           => 'espresso_payment_settings',
            'payment_method' => $get_params['payment_method'],
        ];
        if (isset($get_params['sandbox_mode'])) {
            $args_to_add[ Domain::META_KEY_SANDBOX_MODE ] = $get_params['sandbox_mode'];
        }
        $home_url = add_query_arg($args_to_add, admin_url('admin.php'));
        wp_redirect($home_url);
        exit;
    }


    /**
     * Check user’s onboarding status.
     * This will handle the user return from the auth page and also check the status via the API.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function updateOnboardingStatus(): void
    {
        // Check if this is the webhook from PayPal.
        if (
            ! isset($_GET['webhook_action'], $_GET['nonce'])
            || $_GET['webhook_action'] !== 'eepPpcMerchantOnboard'
        ) {
            return;  // Ignore.
        }
        $get_params = EED_Module::getRequest()->getParams();
        // Get the payment method.
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        // Check the response (GET) parameters.
        if (! EED_PayPalOnboard::onboardingStatusResponseValid($get_params, $paypal_pm)) {
            // Missing parameters. Can't proceed.
            PayPalLogger::errorLog(
                esc_html__('Missing required onboarding parameters.', 'event_espresso'),
                $get_params,
                $paypal_pm
            );
            EED_PayPalOnboard::redirectToPmSettingsHome();
            return;
        }
        // Check on the onboarding status (recommended by PP).
        $onboarding_status = EED_PayPalOnboard::trackSellerOnboarding(
            $paypal_pm,
            $get_params[ Domain::META_KEY_SELLER_MERCHANT_ID ]
        );
        if (! isset($onboarding_status['valid']) || ! $onboarding_status['valid']) {
            PayPalLogger::errorLog(
                $onboarding_status['message'],
                array_merge($get_params, $onboarding_status),
                $paypal_pm
            );
            EED_PayPalOnboard::redirectToPmSettingsHome();
            return;
        }
        // Start saving the setup and info.
        PayPalExtraMetaManager::parseAndSaveOptions($paypal_pm, $onboarding_status);
        // Save the credentials.
        PayPalExtraMetaManager::saveSellerApiCredentials($paypal_pm, $get_params);
        // Also clen GET params by redirecting, because PP auto redirects to the return_url on closing the onboarding window.
        EED_PayPalOnboard::redirectToPmSettingsHome();
    }


    /**
     * Check if all required parameters for the onboarding status check are present.
     *
     * @param array $data
     * @param mixed $paypal_pm
     * @return bool
     */
    public static function onboardingStatusResponseValid(array $data, $paypal_pm): bool
    {
        // Check that we have all the required parameters and the nonce is ok.
        if (
            $paypal_pm instanceof EE_Payment_Method
            && wp_verify_nonce($data['nonce'], Domain::NONCE_NAME_ONBOARDING_RETURN)
            && ! empty($data[ Domain::API_PARAM_PARTNER_ID ])
            && ! empty($data[ Domain::META_KEY_SELLER_MERCHANT_ID ])
            && isset($data[ Domain::API_PARAM_EMAIL_CONFIRMED ])
        ) {
            return true;
        }
        return false;
    }


    /**
     * Get partner access token.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getPartnerAccessToken(EE_Payment_Method $paypal_pm): string
    {
        // Do we have it saved ?
        $access_token = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_ACCESS_TOKEN);
        // If we don't have it, request/update it.
        if (! $access_token) {
            return EED_PayPalOnboard::requestPartnerAccessToken($paypal_pm);
        }
        if (EED_PayPalOnboard::partnerAccessTokenExpired($paypal_pm)) {
            return EED_PayPalOnboard::requestPartnerAccessToken($paypal_pm);
        }
        // Access token is saved as encrypted, but return decrypted.
        return $access_token;
    }


    /**
     * Get partner access token.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function partnerAccessTokenExpired(EE_Payment_Method $paypal_pm): bool
    {
        $expires_at = (int) PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_TOKEN_EXPIRES_IN);
        if (! $expires_at) {
            return true;
        }
        // Validate the token expiration date.
        $minutes_left = round(($expires_at - time()) / 60);
        // Count as expired if less than 60 minutes till expiration left.
        if ($minutes_left <= 60) {
            return true;
        }
        return false;
    }


    /**
     * Request the partner access token from PayPal and save/update it.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function requestPartnerAccessToken(EE_Payment_Method $paypal_pm): string
    {
        $nonce = wp_create_nonce('eea_pp_commerce_get_access_token');
        // Request the access token.
        $post_args = [
            'method' => 'POST',
            'body'   => [
                'nonce'                       => $nonce,
                'api_version'                 => 'v1',
                Domain::META_KEY_SANDBOX_MODE => $paypal_pm->debug_mode() ? '1' : '0',
            ],
        ];
        if (defined('LOCAL_MIDDLEMAN_SERVER')) {
            $post_args['sslverify'] = Manager::verifySSL();
        }
        $post_url = EED_PayPalOnboard::getMiddlemanBaseUrl($paypal_pm) . 'get_token';
        $response = EED_PayPalOnboard::sendRequest($paypal_pm, $post_url, $post_args);
        if (isset($response['error'])) {
            return '';
        }
        // Check the data we received.
        if (! EED_PayPalOnboard::partnerTokenResponseValid($response, $paypal_pm)) {
            return '';
        }
        // If we are here all seems to be ok. Save the token and it's data.
        $saved = PayPalExtraMetaManager::savePartnerAccessToken($paypal_pm, $response);
        if (! $saved) {
            return '';
        }
        return $response['access_token'];
    }


    /**
     * Request seller onboarding status from PayPal.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $merchant_id
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function trackSellerOnboarding(EE_Payment_Method $paypal_pm, string $merchant_id): array
    {
        $track_onboarding = EED_PayPalOnboard::getTrackOnboardingApi($paypal_pm, $merchant_id);
        if (! $track_onboarding instanceof TrackSellerOnboarding) {
            return [
                'error'   => 'TRACK_ONBOARDING_FAILED',
                'message' => esc_html__('Failed to track seller onboarding.', 'event_espresso')
            ];
        }
        return $track_onboarding->isValid();
    }


    /**
     * Returns the Track Seller Onboarding API.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $merchant_id
     * @return TrackSellerOnboarding|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getTrackOnboardingApi(
        EE_Payment_Method $paypal_pm,
        string $merchant_id
    ): ?TrackSellerOnboarding {
        $partner_id = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_PARTNER_MERCHANT_ID);
        $paypal_api = EED_PayPalCommerce::getPayPalApi($paypal_pm);
        if (! $paypal_api instanceof PayPalApi || ! $partner_id) {
            return null;
        }
        return new TrackSellerOnboarding($paypal_api, $partner_id, $merchant_id, $paypal_pm->debug_mode());
    }


    /**
     * Check the onboard status and return the result.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getOnboardStatus(): void
    {
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        if (! $paypal_pm instanceof EE_Payment_Method) {
            $err_msg = esc_html__('Could not specify the payment method.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, EED_Module::getRequest()->postParams(), $paypal_pm);
            wp_send_json(['on_board' => false]);
        }
        try {
            $seller_id = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_SELLER_MERCHANT_ID) ?? '--';
        } catch (Exception $e) {
            $seller_id = '--';
            PayPalLogger::errorLog($e->getMessage(), ['trace' => $e->getTrace()]);
        }
        wp_send_json(
            [
                'on_board'  => EED_PayPalOnboard::isOnboard($paypal_pm),
                'seller_id' => $seller_id,
            ]
        );
    }


    /**
     * De-authorize the seller. Remove all API credentials.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function offboard(): void
    {
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        EED_PayPalOnboard::validatePmAjax($paypal_pm);
        PayPalExtraMetaManager::deleteData($paypal_pm);
        PayPalLogger::errorLog(
            esc_html__('Offboarding. Removing metadata.', 'event_espresso'),
            EED_Module::getRequest()->postParams(),
            $paypal_pm
        );
        wp_send_json(['success' => true]);
    }


    /**
     * Clear all credentials metadata.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function clearMetaData(): void
    {
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        EED_PayPalOnboard::validatePmAjax($paypal_pm);
        PayPalExtraMetaManager::deleteAllData($paypal_pm);
        PayPalLogger::errorLog(
            esc_html__('Doing a Reset. Removing all PM settings metadata.', 'event_espresso'),
            EED_Module::getRequest()->postParams(),
            $paypal_pm
        );
        wp_send_json(['success' => true]);
    }


    /**
     * Validate the PM instance, returning an ajax response on invalid.
     *
     * @param $paypal_pm
     * @return void
     */
    public static function validatePmAjax($paypal_pm): void
    {
        if (! $paypal_pm instanceof EE_Payment_Method) {
            wp_send_json(
                [
                    'error'   => 'INVALID_PM',
                    'message' => esc_html__(
                        'Invalid payment method. Please refresh the page and try again.',
                        'event_espresso'
                    ),
                ]
            );
        }
    }


    /**
     * Checks if already onboard.
     *
     * @param EE_Payment_Method $payment_method
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function isOnboard(EE_Payment_Method $payment_method): bool
    {
        $pp_meta_data = PayPalExtraMetaManager::getAllData($payment_method);
        return
            (
                // onborded with a third party integration ?
                ! empty($pp_meta_data[ Domain::META_KEY_SELLER_MERCHANT_ID ])
                && ! empty($pp_meta_data[ Domain::META_KEY_ACCESS_TOKEN ])
            ) || (
                // or with the first party integration ?
                ! empty($pp_meta_data[ Domain::META_KEY_CLIENT_ID ])
                && ! empty($pp_meta_data[ Domain::META_KEY_CLIENT_SECRET ])
                && ! empty($pp_meta_data[ Domain::META_KEY_PAYER_ID ])
            );
    }


    /**
     * Send a request and return a decoded response body.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $request_url
     * @param array             $request_args
     * @return array
     */
    public static function sendRequest(EE_Payment_Method $paypal_pm, string $request_url, array $request_args): array
    {
        $error_return = ['error' => true];
        $response     = wp_remote_request($request_url, $request_args);
        if (is_wp_error($response)) {
            $message = $response->get_error_message();
            PayPalLogger::errorLog($message, [$request_url, $request_args, $response], $paypal_pm);
            $error_return['message'] = $message;
            return $error_return;
        }
        $response_body = (isset($response['body']) && $response['body']) ? json_decode($response['body'], true) : [];
        if (empty($response_body) || isset($response_body['error'])) {
            $message = $response_body['error_description']
                ?? sprintf(
                    esc_html__('Unknown response received while sending a request to: %1$s', 'event_espresso'),
                    $request_url
                );
            PayPalLogger::errorLog($message, [$request_url, $request_args, $response], $paypal_pm);
            $error_return['message'] = $message;
            return $error_return;
        }
        return $response_body;
    }


    /**
     * Check the response for a partner token request.
     *
     * @param array             $response
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     */
    public static function partnerTokenResponseValid(array $response, EE_Payment_Method $paypal_pm): bool
    {
        // Check the data we received.
        if (
            empty($response['nonce'])
            || ! wp_verify_nonce($response['nonce'], 'eea_pp_commerce_get_access_token')
            || empty($response['access_token'])
            || empty($response['app_id'])
            || empty($response['expires_in'])
            || empty($response['partner_client_id'])
            || empty($response['partner_merchant_id'])
        ) {
            // This is an error.
            PayPalLogger::errorLog(
                esc_html__('Incoming parameter validation failed.', 'event_espresso'),
                $response,
                $paypal_pm
            );
            return false;
        }
        return true;
    }


    /**
     * Returns the base URL to the middleman server.
     * If LOCAL_MIDDLEMAN_SERVER is defined, requests will be sent to connect.eventespresso.test
     *
     * @param EE_Payment_Method $payment_method
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getMiddlemanBaseUrl(EE_Payment_Method $payment_method): string
    {
        $target = defined('LOCAL_MIDDLEMAN_SERVER') ? 'test' : 'com';
        // If this PM is used under different provider accounts, you might need an account indicator.
        $account = defined('EE_PAYPAL_COMMERCE_ACCOUNT_INDICATOR') ? EE_PAYPAL_COMMERCE_ACCOUNT_INDICATOR : '';
        $postfix = $payment_method->debug_mode() ? '_sandbox' : '';
        return "https://connect.eventespresso.$target/paypal_commerce$account$postfix/";
    }


    /**
     * This Payment Method admin notices.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function adminNotice()
    {
        // Show the notice if PayPal Commerce PM is active but merchant is not onboard.
        $pp_commerce = EEM_Payment_Method::instance()->get_one_by_slug('paypalcheckout');
        if (
            $pp_commerce instanceof EE_Payment_Method
            && $pp_commerce->active()
            && ! EED_PayPalOnboard::isOnboard($pp_commerce)
        ) {
            add_action('admin_notices', [EED_PayPalOnboard::class, 'notOnboardNotice']);
        }
    }


    /**
     * Contents of the not onboard admin notice.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function notOnboardNotice()
    {
        $open_anchor = $close_anchor = '';
        $pp_commerce = EEM_Payment_Method::instance()->get_one_by_slug('paypalcheckout');
        if ($pp_commerce instanceof EE_Payment_Method) {
            $pm_page      = add_query_arg(
                [
                    'page'           => 'espresso_payment_settings',
                    'webhook_action' => 'eepPpcMerchantOnboard',
                    'payment_method' => $pp_commerce->slug(),
                ],
                admin_url('admin.php')
            );
            $open_anchor  = "<a href='$pm_page'>";
            $close_anchor = "</a>";
        }
        $notice = sprintf(
            esc_html__(
                '%1$sPayPal Commerce%2$s payment method was activated but is not connected to PayPal. Please %3$sfinish setting up%4$s this payment method.',
                'event_espresso'
            ),
            '<strong>',
            '</strong>',
            $open_anchor,
            $close_anchor
        );
        echo "
        <div class='error'>
            <p>$notice</p>
        </div>";
    }
}
