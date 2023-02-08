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
     * @throws Exception
     */
    public static function getPmOption($paypal_pm, $option_name)
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
     * @throws EE_Error
     */
    public static function savePmOption($paypal_pm, $option_name, $option_value)
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
     * @throws EE_Error
     */
    public static function savePmOptions($paypal_pm, $options_list)
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
     * @throws EE_Error
     */
    public static function deletePmOption($paypal_pm, $option_name)
    {
        $pp_meta_data = self::extraMeta($paypal_pm);
        return $pp_meta_data->deleteOption($option_name);
    }


    /**
     * Get all options for payment method.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return array|bool
     * @throws EE_Error
     */
    public static function getAllData($paypal_pm)
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
    public static function deleteAllData($paypal_pm)
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
     * @throws EE_Error
     */
    public static function updateDebugMode($paypal_pm, $request_data)
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
     * @throws EE_Error
     */
    public static function savePartnerAccessToken($paypal_pm, $response)
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
     * @throws EE_Error
     */
    public static function saveSellerApiCredentials($paypal_pm, $response)
    {
        $api_credentials     = [];
        $expected_parameters = [
            Domain::META_KEY_CLIENT_ID,
            Domain::META_KEY_CLIENT_SECRET,
            Domain::META_KEY_PAYER_ID,
        ];
        foreach ($expected_parameters as $api_key) {
            if (! isset($response[ $api_key ])) {
                // Don't want to try saving data that doesn't exist.
                continue;
            }
            try {
                if ($api_key === Domain::META_KEY_CLIENT_SECRET) {
                    $api_credentials[ $api_key ] = self::encryptString($response[ $api_key ], $paypal_pm);
                } else {
                    $api_credentials[ $api_key ] = $response[ $api_key ];
                }
            } catch (Exception $exception) {
                PayPalLogger::errorLog($exception->getMessage(), $response, $paypal_pm);
                return false;
            }
        }
        return self::savePmOptions($paypal_pm, $api_credentials);
    }


    /**
     * Get PayPal extra meta helper.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return PayPalExtraMeta
     */
    public static function extraMeta($paypal_pm)
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
    public static function encryptString($text, $paypal_pm)
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
     * @throws Exception
     */
    public static function decryptString($text, $paypal_pm)
    {
        // Are we even getting something ?
        if (! $text) {
            return $text;
        }
        // Try decrypting.
        $encryptor      = LoaderFactory::getLoader()->getShared(OpenSSLEncryption::class, [new Base64Encoder()]);
        $key_identifier = $paypal_pm->debug_mode()
            ? PPCommerceEncryptionKeyManager::SANDBOX_ENCRYPTION_KEY_ID
            : PPCommerceEncryptionKeyManager::PRODUCTION_ENCRYPTION_KEY_ID;
        $decrypted      = $encryptor->decrypt($text, $key_identifier);
        return isset($decrypted) ? $decrypted : $text;
    }
}
