<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta;

use EE_Error;
use EE_Payment_Method;
use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption\OpenSSLEncryption;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption\PPCommerceEncryptionKeyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\logging\PayPalLogger;
use Exception;
use ReflectionException;

/**
 * Class PayPalExtraMetaManager
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class PayPalExtraMetaManager
{
    /**
     * Get payment method option/extra meta
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $option_name
     * @return mixed
     */
    public static function getPmOption(EE_Payment_Method $paypal_pm, string $option_name): mixed
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        $option_value = $pp_meta_data->getOption($option_name);
        // Decrypt the encrypted options.
        if (
            $option_name === Domain::META_KEY_ACCESS_TOKEN
            || $option_name === Domain::META_KEY_PARTNER_MERCHANT_ID
            || $option_name === Domain::META_KEY_CLIENT_SECRET
        ) {
            $option_value = self::decryptString($option_value, $paypal_pm);
        }
        return $option_value;
    }


    /**
     * Save payment method option/extra meta
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $option_name
     * @param                   $option_value
     * @return bool
     */
    public static function savePmOption(EE_Payment_Method $paypal_pm, string $option_name, $option_value): bool
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->saveOption($option_name, $option_value);
    }


    /**
     * Save a list of payment method options/extra meta.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $options_list
     * @return bool
     */
    public static function savePmOptions(EE_Payment_Method $paypal_pm, array $options_list): bool
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->saveBatch($options_list);
    }


    /**
     * Delete payment method option/extra meta
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $option_name
     * @return bool
     */
    public static function deletePmOption(EE_Payment_Method $paypal_pm, string $option_name): bool
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->deleteOption($option_name);
    }


    /**
     * Get all options for payment method.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return array|bool
     */
    public static function getAllData(EE_Payment_Method $paypal_pm)
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->getMetaData();
    }


    /**
     * Delete all options for this payment method.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     */
    public static function deleteAllData(EE_Payment_Method $paypal_pm): bool
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->deleteMetaData();
    }


    /**
     * Save the debug mode option if it changed.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $request_data
     * @return bool             Updated or not.
     */
    public static function updateDebugMode(EE_Payment_Method $paypal_pm, array $request_data): bool
    {
        if (
            isset($request_data['sandbox_mode'])
            && in_array($request_data['sandbox_mode'], ['0', '1'], true)
            && $paypal_pm->debug_mode() !== (bool) $request_data['sandbox_mode']
        ) {
            try {
                $paypal_pm->save(['PMD_debug_mode' => $request_data['sandbox_mode']]);
            } catch (EE_Error $e) {
                $err_msg = sprintf(
                    esc_html__('Note, debug mode not saved ! %1$s', 'event_espresso'),
                    $e->getMessage()
                );
                PayPalLogger::errorLog($err_msg, $request_data, $paypal_pm);
                return false;
            }
             return true;
        }
        return false;
    }


    /**
     * Save partner access token and parameters.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $response
     * @return bool
     */
    public static function savePartnerAccessToken(EE_Payment_Method $paypal_pm, array $response): bool
    {
        $paypal_data         = [];
        $expected_parameters = [
            Domain::META_KEY_ACCESS_TOKEN,
            Domain::META_KEY_EXPIRES_IN,
            Domain::META_KEY_APP_ID,
            Domain::META_KEY_PARTNER_CLIENT_ID,
            Domain::META_KEY_PARTNER_MERCHANT_ID,
            Domain::META_KEY_BN_CODE,
        ];
        foreach ($expected_parameters as $api_key) {
            if (! isset($response[ $api_key ])) {
                // Don't want to try saving data that doesn't exist.
                continue;
            }
            try {
                switch ($api_key) {
                    case Domain::META_KEY_ACCESS_TOKEN:
                    case Domain::META_KEY_PARTNER_MERCHANT_ID:
                        $paypal_data[ $api_key ] = self::encryptString($response[ $api_key ], $paypal_pm);
                        break;
                    case Domain::META_KEY_EXPIRES_IN:
                        $paypal_data[ $api_key ] = time() + (int) sanitize_key($response[ $api_key ]);
                        break;
                    default:
                        $paypal_data[ $api_key ] = sanitize_text_field($response[ $api_key ]);
                }
            } catch (Exception $exception) {
                PayPalLogger::errorLog($exception->getMessage(), $response, $paypal_pm);
                return false;
            }
        }
        return self::savePmOptions($paypal_pm, $paypal_data);
    }


    /**
     * Save merchant/seller API credentials.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $response
     * @return bool
     */
    public static function saveSellerApiCredentials(EE_Payment_Method $paypal_pm, array $response): bool
    {
        $api_credentials     = [];
        $expected_parameters = [
            Domain::META_KEY_SELLER_MERCHANT_ID,
        ];
        foreach ($expected_parameters as $api_key) {
            if (! isset($response[ $api_key ])) {
                // Don't want to try saving data that doesn't exist.
                continue;
            }
            try {
                $api_credentials[ $api_key ] = $response[ $api_key ];
            } catch (Exception $exception) {
                PayPalLogger::errorLog($exception->getMessage(), $response, $paypal_pm);
                return false;
            }
        }
        return self::savePmOptions($paypal_pm, $api_credentials);
    }


    /**
     * Save other payment method related settings from a data array.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $data
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function parseAndSaveOptions(EE_Payment_Method $paypal_pm, array $data): bool
    {
        $allowed_checkout_type = 'express_checkout';
        // Note, although PayPal shows that this should include PPCP_CUSTOM or EXPRESS_CHECKOUT only,
        // in reality, it will also include other products like MOBILE_PAYMENT_ACCEPTANCE etc.
        if (! empty($data['response']['products'][0]['name']) && is_array($data['response']['products'])) {
            foreach ($data['response']['products'] as $product) {
                if (str_contains($product['name'], 'PPCP')) {
                    // This merchant has PPCP in the products list, so we can enable both (all) checkout types.
                    $allowed_checkout_type = 'all';
                    break;
                }
            }
        }
        // Set the Checkout type (a PM option), just in case merchant doesn't save PM options manually.
        $checkout_type = $paypal_pm->get_extra_meta(Domain::META_KEY_CHECKOUT_TYPE, true, false);
        if (! $checkout_type) {
            $paypal_pm->update_extra_meta(Domain::META_KEY_CHECKOUT_TYPE, $allowed_checkout_type);
        }
        return PayPalExtraMetaManager::savePmOption(
            $paypal_pm,
            Domain::META_KEY_ALLOWED_CHECKOUT_TYPE,
            $allowed_checkout_type
        );
    }


    /**
     * Get PayPal extra meta helper.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return PayPalExtraMeta
     */
    public static function extraMeta(EE_Payment_Method $paypal_pm): PayPalExtraMeta
    {
        return LoaderFactory::getLoader()->getShared(PayPalExtraMeta::class, [$paypal_pm]);
    }


    /**
     * Encrypt a text field.
     *
     * @param string            $text
     * @param EE_Payment_Method $paypal_pm
     * @return string|null
     */
    public static function encryptString(string $text, EE_Payment_Method $paypal_pm): ?string
    {
        // We sure we are getting something ?
        if (! $text) {
            return $text;
        }
        // Do encrypt.
        $encryptor      = LoaderFactory::getLoader()->getShared(OpenSSLEncryption::class, [new Base64Encoder()]);
        $sanitized_text = sanitize_text_field($text);
        $key_identifier = $paypal_pm->debug_mode()
            ? PPCommerceEncryptionKeyManager::SANDBOX_ENCRYPTION_KEY_ID
            : PPCommerceEncryptionKeyManager::PRODUCTION_ENCRYPTION_KEY_ID;
        return $encryptor->encrypt($sanitized_text, $key_identifier);
    }


    /**
     * Decrypt a string.
     *
     * @param string            $text
     * @param EE_Payment_Method $paypal_pm
     * @return string
     */
    public static function decryptString(string $text, EE_Payment_Method $paypal_pm): string
    {
        // Are we even getting something ?
        if (! $text) {
            return $text;
        }
        // Try decrypting.
        try {
            $encryptor      = LoaderFactory::getLoader()->getShared(OpenSSLEncryption::class, [new Base64Encoder()]);
            $key_identifier = $paypal_pm->debug_mode()
                ? PPCommerceEncryptionKeyManager::SANDBOX_ENCRYPTION_KEY_ID
                : PPCommerceEncryptionKeyManager::PRODUCTION_ENCRYPTION_KEY_ID;
            $decrypted      = $encryptor->decrypt($text, $key_identifier);
        } catch (Exception) {
            return $text;
        }
        return $decrypted ?? $text;
    }
}
