<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\domain;

use EE_Error;
use EE_Payment_Method;
use ReflectionException;

/**
 * Class Domain
 *
 * Holds PayPal Commerce Add-on constants.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class Domain
{
    /**
     * Name of the extra meta key that stores this PM options as one meta.
     */
    public const META_KEY_PAYPAL_DATA = 'paypal_data';
    /**
     * Name of the extra meta key that stores this PM options as one meta.
     */
    public const META_KEY_PAYPAL_DATA_SANDBOX = 'paypal_data_sandbox';

    /**
     * Name of the extra meta that stores whether the credentials were for the sandbox or live mode.
     */
    public const META_KEY_SANDBOX_MODE = 'sandbox_mode';

    /**
     * Name of the extra meta that stores the Access Token that is used to auth in API requests to PayPal.
     */
    public const META_KEY_ACCESS_TOKEN = 'access_token';

    /**
     * Name of the extra meta that stores the last request tracking ID.
     */
    public const META_KEY_TRACKING_ID = 'tracking_id';

    /**
     * Name of the extra meta that stores the Event Espresso PayPal Account's merchant id.
     */
    public const META_KEY_APP_ID = 'app_id';

    /**
     * Name of the extra meta that holds the seller client ID.
     */
    public const META_KEY_CLIENT_ID = 'client_id';

    /**
     * Name of the extra meta that holds the seller secret.
     */
    public const META_KEY_CLIENT_SECRET = 'client_secret';

    /**
     * Name of the extra meta that stores the expiration date of the Access Token.
     */
    public const META_KEY_TOKEN_EXPIRES_IN = 'expires_in';

    /**
     * Name of the extra meta that holds the partner client ID.
     */
    public const META_KEY_PARTNER_CLIENT_ID = 'partner_client_id';

    /**
     * Name of the extra meta that holds the partner merchant ID.
     */
    public const META_KEY_PARTNER_MERCHANT_ID = 'partner_merchant_id';

    /**
     * Name of the extra meta that holds the seller merchant ID.
     */
    public const META_KEY_SELLER_MERCHANT_ID = 'merchantIdInPayPal';

    /**
     * Name of the extra meta that holds the BN / request tracking code.
     */
    public const META_KEY_BN_CODE = 'bn_code';

    /**
     * Name of the extra meta that stores the merchant authorized scopes for our app to work within.
     */
    public const META_KEY_AUTHORIZED_SCOPES = 'authorized_scopes';

    /**
     * Name of the extra meta that stores the PP checkout type selected by merchant after onboarding.
     */
    public const META_KEY_CHECKOUT_TYPE = 'checkout_type';

    /**
     * Name of the extra meta that stores the allowed PP checkout type selected by merchant while onboarding.
     */
    public const META_KEY_ALLOWED_CHECKOUT_TYPE = 'allowed_checkout_type';

    /**
     * Name of the extra meta that stores the selected PP function options.
     */
    public const META_KEY_FUNDING_OPTIONS = 'funding_options';

    /**
     * Name of the PayPal API parameter that holds the auth code.
     */
    public const API_KEY_AUTH_CODE = 'authCode';

    /**
     * Name of the PayPal API parameter that holds the client token.
     */
    public const API_KEY_CLIENT_TOKEN = 'client_token';

     /**
     * Name of the extra meta that holds the seller payer ID.
     */
    public const META_KEY_PAYER_ID = 'payer_id';

    /**
     * Name of the PayPal API parameter that holds the client token expiration time.
     */
    public const API_KEY_EXPIRES_IN = 'expires_in';

    /**
     * Name of the PayPal API parameter that holds the list of oAuth integrations related to the merchant.
     */
    public const API_PARAM_OAUTH_INTEGRATIONS = 'oauth_integrations';

    /**
     * Name of the PayPal API parameter that holds the list of third party permissions that were granted.
     */
    public const API_PARAM_PERMISSIONS_GRANTED = 'oauth_third_party';

    /**
     * Name of the PayPal API parameter that holds the bool of if the primary email was confirmed.
     */
    public const API_PARAM_PRIM_EMAIL_CONFIRMED = 'primary_email_confirmed';

    /**
     * Name of the PayPal API parameter that holds the bool of if email was confirmed.
     */
    public const API_PARAM_EMAIL_CONFIRMED = 'isEmailConfirmed';

    /**
     * Name of the PayPal API parameter that holds the partner ID.
     */
    public const API_PARAM_PARTNER_ID = 'merchantId';

    /**
     * Name of the PayPal API parameter that holds the merchant ID in the Track seller onboarding status request.
     */
    public const API_PARAM_TRACK_MERCHANT_ID = 'merchant_id';

    /**
     * Name of the PayPal API parameter that holds the payments_receivable status.
     */
    public const API_PARAM_PAYMENTS_RECEIVABLE = 'payments_receivable';

    /**
     * Name of the nonce used in the capture order request.
     */
    public const CAPTURE_ORDER_NONCE_NAME = 'eea_pp_commerce_capture_order_payment';

    /**
     * Name of the nonce used in the onboarding process.
     */
    public const NONCE_NAME_ONBOARDING_RETURN = 'eea_pp_commerce_onboarding_return';

    /**
     * Holds this payment method slug.
     */
    public const PM_SLUG = 'paypalcheckout';


    /**
     * Returns the base PayPal API URL.
     *
     * @param EE_Payment_Method $payment_method
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getPayPalApiUrl(EE_Payment_Method $payment_method): string
    {
        return $payment_method->debug_mode() ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
    }
}
