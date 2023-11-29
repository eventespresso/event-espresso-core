<?php

use EventEspresso\core\domain\services\database\DbStatus;
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
        // TODO: Implement run() method.
    }


    /**
     * For hooking into EE Core, other modules, etc.
     *
     * @return void
     */
    public static function set_hooks()
    {
    }


    /**
     * For hooking into EE Admin Core, other modules, etc.
     *
     * @return void
     */
    public static function set_hooks_admin()
    {
        if (DbStatus::isOnline()) {
            // Get onboarding URL.
            add_action('wp_ajax_eeaPpGetOnboardingUrl', [__CLASS__, 'getOnboardingUrl']);
            // Get the seller access token.
            add_action('wp_ajax_eeaPpGetSellerAccessToken', [__CLASS__, 'getSellerAccessToken']);
            // Return the connection/onboard status.
            add_action('wp_ajax_eeaPpGetOnboardStatus', [__CLASS__, 'getOnboardStatus']);
            // Revoke access.
            add_action('wp_ajax_eeaPpOffboard', [__CLASS__, 'offboard']);
        }
    }


    /**
     * Get the onboarding URL.
     * (AJAX)
     *
     * @return void
     */
    public static function getOnboardingUrl()
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
            $signup_link = self::getSignUpLink($paypal_pm);
        } catch (Exception $exception) {
            self::exitWithError($exception->getMessage());
        }
        // Is it empty (can happen if we didn't get the URL through the API).
        $signup_link = $signup_link ? $signup_link . '?&displayMode=minibrowser' : '#';
        echo json_encode(
            [
                'signup_link' => $signup_link,
            ]
        );
        exit();
    }


    /**
     * Get the URL to redirect the seller to and start the onboarding.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws Exception
     */
    public static function getSignUpLink(EE_Payment_Method $paypal_pm): string
    {
        $signup_link   = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_ONBOARDING_URL);
        $token_expired = self::partnerAccessTokenExpired($paypal_pm);
        if (! $signup_link || $token_expired) {
            // Generate sign-up link and save.
            $signup_link = self::requestOnboardingUrl($paypal_pm);
            if (! $signup_link) {
                $err_msg = esc_html__('Error! Could not generate a sign-up link.', 'event_espresso');
                PayPalLogger::errorLog($err_msg, ['signup_link' => $signup_link], $paypal_pm);
                return '';
            }
            PayPalExtraMetaManager::savePmOption($paypal_pm, Domain::META_KEY_ONBOARDING_URL, $signup_link);
        }
        return $signup_link;
    }


    /**
     * Request the sign-up link from PayPal.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws Exception
     */
    public static function requestOnboardingUrl(EE_Payment_Method $paypal_pm): string
    {
        $signup_link = '';
        // Get the access token.
        $access_token = self::getPartnerAccessToken($paypal_pm);
        if (! $access_token) {
            $err_msg = esc_html__('Error! No access token.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, ['access_token' => $access_token], $paypal_pm);
            return $signup_link;
        }
        $identifier_string = new OneTimeString($paypal_pm->debug_mode());
        $seller_nonce      = $identifier_string->value();
        // Save the identifier for future use.
        PayPalExtraMetaManager::savePmOption($paypal_pm, Domain::META_KEY_SELLER_NONCE, $seller_nonce);
        // Request the access token.
        $body_params = json_encode(
            [
                'products'       => ['EXPRESS_CHECKOUT'],
                'legal_consents' => [
                    [
                        'type'    => 'SHARE_DATA_CONSENT',
                        'granted' => true,
                    ],
                ],
                'operations'     => [
                    [
                        'operation'                  => 'API_INTEGRATION',
                        'api_integration_preference' => [
                            'rest_api_integration' => [
                                'integration_method'  => 'PAYPAL',
                                'integration_type'    => 'FIRST_PARTY',
                                'first_party_details' => [
                                    'features'     => ['PAYMENT', 'REFUND', 'PARTNER_FEE'],
                                    'seller_nonce' => $seller_nonce,
                                ],
                            ],
                        ],
                    ],
                ],
            ]
        );
        $bn_code     = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        $post_args   = [
            'method'  => 'POST',
            'headers' => [
                'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
                'Content-Type'                  => 'application/json',
                'Authorization'                 => 'Bearer ' . $access_token,
                'PayPal-Partner-Attribution-Id' => $bn_code,
            ],
            'body'    => $body_params,
        ];
        $request_url = self::getPayPalApiUrl($paypal_pm) . '/v2/customer/partner-referrals';
        $response    = self::sendRequest($paypal_pm, $request_url, $post_args);
        if (isset($response['error'])) {
            return '';
        }
        // Check the data we received.
        if (empty($response['links'])) {
            $err_msg = esc_html__('Incoming sign-up link parameter validation failed.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, $response, $paypal_pm);
            return '';
        }
        // Now retrieve that sign-up link.
        foreach ($response['links'] as $link) {
            if ($link['rel'] === 'action_url') {
                return $link['href'] ?? '';
            }
        }
        return $signup_link;
    }


    /**
     * Get partner access token.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return string
     * @throws EE_Error
     * @throws Exception
     */
    public static function getPartnerAccessToken(EE_Payment_Method $paypal_pm): string
    {
        // Do we have it saved ?
        $access_token = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_ACCESS_TOKEN);
        $expired      = self::partnerAccessTokenExpired($paypal_pm);
        // If we don't have it, request/update it.
        if (! $access_token || $expired) {
            return self::requestPartnerAccessToken($paypal_pm);
        }
        // Access token is saved as encrypted, so return decrypted.
        return $access_token;
    }


    /**
     * Get partner access token.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws Exception
     */
    public static function partnerAccessTokenExpired(EE_Payment_Method $paypal_pm): bool
    {
        $expires_at = (int) PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_EXPIRES_IN);
        if (! $expires_at) {
            return true;
        }
        // Validate the token. Do a health check.
        $now          = time();
        $minutes_left = round(($expires_at - $now) / 60);
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
            $post_args['sslverify'] = false;
        }
        $post_url = self::getMiddlemanBaseUrl($paypal_pm) . 'get_token';
        $response = self::sendRequest($paypal_pm, $post_url, $post_args);
        if (isset($response['error'])) {
            return '';
        }
        // Check the data we received.
        if (! self::partnerTokenResponseValid($response, $paypal_pm)) {
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
     * Get the seller access token.
     * (AJAX)
     *
     * @return void
     * @throws Exception
     */
    public static function getSellerAccessToken()
    {
        $paypal_pm   = EED_PayPalCommerce::getPaymentMethod();
        $post_params = EED_Module::getRequest()->postParams();
        $bn_code     = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        if (! $paypal_pm instanceof EE_Payment_Method) {
            PayPalLogger::errorLogAndExit(
                esc_html__('No payment method.', 'event_espresso'),
                $post_params,
                $paypal_pm
            );
        }
        $seller_nonce = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_SELLER_NONCE);
        // Look for mandatory parameters.
        if (
            empty($post_params[ Domain::API_KEY_AUTH_CODE ])
            || empty($post_params[ Domain::API_KEY_SHARED_ID ])
            || ! $seller_nonce
            || ! $bn_code
        ) {
            $error_message = esc_html__('Missing authCode and sharedId.', 'event_espresso');
            PayPalLogger::errorLogAndExit($error_message, $post_params, $paypal_pm);
        }
        $nonce = wp_create_nonce('eea_pp_commerce_get_seller_access_token');
        // Request the access token.
        $post_args = [
            'method'  => 'POST',
            'headers' => [
                'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
                'Content-Type'                  => 'application/json',
                'Authorization'                 => 'Basic ' . base64_encode($post_params[ Domain::API_KEY_SHARED_ID ]),
                'PayPal-Partner-Attribution-Id' => $bn_code,
            ],
            'body'    => [
                'nonce'         => $nonce,
                'grant_type'    => 'authorization_code',
                'code'          => $post_params[ Domain::API_KEY_AUTH_CODE ],
                'code_verifier' => $seller_nonce,
            ],
        ];
        $post_url  = self::getPayPalApiUrl($paypal_pm) . '/v1/oauth2/token';
        $response  = self::sendRequest($paypal_pm, $post_url, $post_args);
        if (isset($response['error'])) {
            self::exitWithError($response['message']);
        }
        // Check the data we received.
        if (
            empty($response['access_token'])
            || empty($response['expires_in'])
            || empty($response['refresh_token'])
        ) {
            // This is an error.
            $err_msg = esc_html__('Incoming parameter validation failed.', 'event_espresso');
            PayPalLogger::errorLogAndExit($err_msg, $response, $paypal_pm);
        }
        // Now we can request the seller API credentials.
        $credentials_saved = self::requestApiCredentials($paypal_pm, $response['access_token']);
        if (isset($credentials_saved['error'])) {
            echo json_encode(
                [
                    'error'   => $credentials_saved['error'],
                    'message' => $credentials_saved['message'],
                ]
            );
        } else {
            echo json_encode(
                [
                    'success'  => true,
                    'on_board' => true,
                ]
            );
        }
        exit();
    }


    /**
     * Get the seller API credentials.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $seller_token
     * @return array
     * @throws EE_Error
     * @throws Exception
     */
    public static function requestApiCredentials(EE_Payment_Method $paypal_pm, string $seller_token): array
    {
        $partner_merchant_id = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_PARTNER_MERCHANT_ID);
        $bn_code             = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        $get_params          = [
            'method'  => 'GET',
            'headers' => [
                'User-Agent'                    => sanitize_text_field($_SERVER['HTTP_USER_AGENT']),
                'Content-Type'                  => 'application/json',
                'Authorization'                 => 'Bearer ' . $seller_token,
                'PayPal-Partner-Attribution-Id' => $bn_code,
            ],
        ];
        $request_url = self::getPayPalApiUrl($paypal_pm)
                        . '/v1/customer/partners/'
                        . $partner_merchant_id
                        . '/merchant-integrations/credentials/';
        $response = self::sendRequest($paypal_pm, $request_url, $get_params);
        // Check the data we received.
        if (empty($response['client_id']) || empty($response['client_secret'])) {
            // This is an error.
            if (isset($response['message'])) {
                $err_msg  = $response['message'];
                $err_name = $response['name'] ?? 'UNRECOGNIZED_ERROR';
            } else {
                $err_msg  = esc_html__('Incoming parameter validation failed.', 'event_espresso');
                $err_name = 'INCOMING_PARAMETER_INVALID';
            }
            PayPalLogger::errorLog($err_msg, $response, $paypal_pm);
            return ['error' => $err_name, 'message' => $err_msg];
        }
        // Finally, track seller onboarding status.
        $onboarding_status = self::trackSellerOnboarding(
            $paypal_pm,
            $partner_merchant_id,
            $response[ Domain::META_KEY_PAYER_ID ],
            $response[ Domain::META_KEY_CLIENT_ID ],
            $response[ Domain::META_KEY_CLIENT_SECRET ]
        );
        if (isset($onboarding_status['error'])) {
            return $onboarding_status;
        }
        // If onboarded successfully, remove the onetime onboarding URL.
        if (PayPalExtraMetaManager::saveSellerApiCredentials($paypal_pm, $response)) {
            PayPalExtraMetaManager::deletePmOption($paypal_pm, Domain::META_KEY_ONBOARDING_URL);
            return ['success' => true];
        } else {
            return [
                'error'   => 'SELLER_CREDENTIALS_NOT_SAVED',
                'message' => esc_html__('Seller credentials were not saved.', 'event_espresso'),
            ];
        }
    }


    /**
     * Request seller onboarding status from PayPal.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $partner_id
     * @param                   $seller_id
     * @param string            $client_id
     * @param string            $client_secret
     * @return array
     * @throws EE_Error
     * @throws Exception
     */
    public static function trackSellerOnboarding(
        EE_Payment_Method $paypal_pm,
        string $partner_id,
        $seller_id,
        string $client_id,
        string $client_secret
    ): array {
        $track_onboarding = self::getTrackOnboardingApi(
            $paypal_pm,
            $partner_id,
            $seller_id,
            $client_id,
            $client_secret
        );
        return $track_onboarding->isValid();
    }


    /**
     * Returns the Track Seller Onboarding API.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $partner_id
     * @param string            $seller_id
     * @param string            $client_id
     * @param string            $client_secret
     * @return TrackSellerOnboarding|null
     * @throws Exception
     */
    public static function getTrackOnboardingApi(
        EE_Payment_Method $paypal_pm,
        string $partner_id,
        string $seller_id,
        string $client_id,
        string $client_secret
    ): ?TrackSellerOnboarding {
        $paypal_api = self::getPayPalApi($paypal_pm, $client_id, $client_secret);
        if (! $paypal_api) {
            return null;
        }
        return new TrackSellerOnboarding($paypal_api, $partner_id, $seller_id, $paypal_pm->debug_mode());
    }


    /**
     * Return a PayPal API object, or false on failure.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $client_id
     * @param string            $client_secret
     * @return PayPalApi|null
     * @throws Exception
     */
    public static function getPayPalApi(
        EE_Payment_Method $paypal_pm,
        string $client_id,
        string $client_secret
    ): ?PayPalApi {
        $bn_code = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_BN_CODE);
        if (! $client_id || ! $client_secret || ! $bn_code) {
            return null;
        }
        return new PayPalApi($client_id, $client_secret, $bn_code, $paypal_pm->debug_mode());
    }


    /**
     * Check the onboard status and return the result.
     * (AJAX)
     *
     * @return void
     * @throws EE_Error
     */
    public static function getOnboardStatus()
    {
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        if (! $paypal_pm instanceof EE_Payment_Method) {
            $err_msg = esc_html__('Could not specify the payment method.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, EED_Module::getRequest()->postParams(), $paypal_pm);
            echo json_encode(['on_board' => false]);
            exit();
        }
        try {
            $seller_id = PayPalExtraMetaManager::getPmOption($paypal_pm, Domain::META_KEY_PAYER_ID) ?? '--';
        } catch (Exception $e) {
            $seller_id = '--';
        }
        echo json_encode(
            [
                'on_board'  => self::isOnboard($paypal_pm),
                'seller_id' => $seller_id,
            ]
        );
        exit();
    }


    /**
     * Deauthorize the seller. Remove all API credentials.
     * (AJAX)
     *
     * @return void
     */
    public static function offboard()
    {
        $paypal_pm = EED_PayPalCommerce::getPaymentMethod();
        PayPalExtraMetaManager::deleteAllData($paypal_pm);
        echo json_encode(
            [
                'success' => true,
            ]
        );
        exit();
    }


    /**
     * Send a request and return a decoded response body.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $request_url
     * @param array             $request_args
     * @return array
     * @throws EE_Error
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
     * @param                   $response
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws EE_Error
     */
    public static function partnerTokenResponseValid($response, EE_Payment_Method $paypal_pm): bool
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
            $err_msg = esc_html__('Incoming parameter validation failed.', 'event_espresso');
            PayPalLogger::errorLog($err_msg, (array) $response, $paypal_pm);
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
     */
    public static function getMiddlemanBaseUrl(EE_Payment_Method $payment_method): string
    {
        $target = defined('LOCAL_MIDDLEMAN_SERVER') ? 'test' : 'com';
        // If this PM is used under different provider accounts, you might need an account indicator.
        $account = defined('EE_PAYPAL_COMMERCE_ACCOUNT_INDICATOR') ? EE_PAYPAL_COMMERCE_ACCOUNT_INDICATOR : '';
        $postfix = $payment_method->debug_mode() ? '_sandbox' : '';
        $path    = 'paypal_commerce' . $account . $postfix;
        return 'https://connect.eventespresso.' . $target . '/' . $path . '/';
    }


    /**
     * Returns the base PayPal API URL.
     *
     * @param EE_Payment_Method $payment_method
     * @return string
     */
    public static function getPayPalApiUrl(EE_Payment_Method $payment_method): string
    {
        return $payment_method->debug_mode() ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
    }


    /**
     * Checks if already onboard.
     *
     * @param EE_Payment_Method $payment_method
     * @return boolean
     * @throws EE_Error
     */
    public static function isOnboard(EE_Payment_Method $payment_method): bool
    {
        $pp_meta_data = PayPalExtraMetaManager::getAllData($payment_method);
        if (
            $pp_meta_data
            && isset($pp_meta_data[ Domain::META_KEY_CLIENT_ID ])
            && $pp_meta_data[ Domain::META_KEY_CLIENT_ID ]
            && isset($pp_meta_data[ Domain::META_KEY_CLIENT_SECRET ])
            && $pp_meta_data[ Domain::META_KEY_CLIENT_SECRET ]
        ) {
            return true;
        }
        return false;
    }


    /**
     * Return error message as json allowing to show an alert on the front-end.
     *
     * @param string $error_message
     * @param bool   $show_alert
     * @return void
     */
    public static function exitWithError(string $error_message = '', bool $show_alert = false)
    {
        echo json_encode(
            [
                'error'   => $error_message,
                'message' => $error_message,
                'alert'   => $show_alert,
            ]
        );
        exit();
    }
}
