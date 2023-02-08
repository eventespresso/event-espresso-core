<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\domain;

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
    const META_KEY_PAYPAL_DATA = 'paypal_data';
    /**
     * Name of the extra meta key that stores this PM options as one meta.
     */
    const META_KEY_PAYPAL_DATA_SANDBOX = 'paypal_data_sandbox';

    /**
     * Name of the extra meta that stores whether the credentials were for the sandbox or live mode.
     */
    const META_KEY_SANDBOX_MODE = 'sandbox_mode';

    /**
     * Name of the extra meta that stores the PayPal Access Token that is used get onboarding URL.
     */
    const META_KEY_ACCESS_TOKEN = 'access_token';

    /**
     * Name of the extra meta that stores the seller nonce.
     */
    const META_KEY_SELLER_NONCE = 'seller_nonce';

    /**
     * Name of the extra meta that stores the Event Espresso PayPal Account's merchant id.
     */
    const META_KEY_APP_ID = 'app_id';

    /**
     * Name of the extra meta that holds the partner client ID.
     */
    const META_KEY_PARTNER_CLIENT_ID = 'partner_client_id';

    /**
     * Name of the extra meta that holds the seller client ID.
     */
    const META_KEY_CLIENT_ID = 'client_id';

    /**
     * Name of the extra meta that holds the seller secret.
     */
    const META_KEY_CLIENT_SECRET = 'client_secret';

    /**
     * Name of the extra meta that stores the expiration date of the client ID.
     */
    const META_KEY_EXPIRES_IN = 'expires_in';

    /**
     * Name of the extra meta that holds the seller payer ID.
     */
    const META_KEY_PAYER_ID = 'payer_id';

    /**
     * Name of the extra meta that holds the partner merchant ID.
     */
    const META_KEY_PARTNER_MERCHANT_ID = 'partner_merchant_id';

    /**
     * Name of the extra meta that holds the onboarding URL.
     */
    const META_KEY_ONBOARDING_URL = 'onboarding_url';

    /**
     * Name of the extra meta that holds the BN / request tracking code.
     */
    const META_KEY_BN_CODE = 'bn_code';

    /**
     * Name of the extra meta that holds the last order details.
     */
    const META_KEY_LAST_ORDER = 'last_order_details';

    /**
     * Name of the PayPal API parameter that holds the auth code.
     */
    const API_KEY_AUTH_CODE = 'authCode';

    /**
     * Name of the PayPal API parameter that holds the shared ID.
     */
    const API_KEY_SHARED_ID = 'sharedId';

    /**
     * Name of the nonce used in the capture order request.
     */
    const CAPTURE_ORDER_NONCE_NAME = 'eea_pp_commerce_capture_order_payment';

    /**
     * Holds this payment method slug.
     */
    const PM_SLUG = 'paypalcheckout';
}
