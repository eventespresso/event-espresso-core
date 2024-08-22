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
    private static ?OpenSSLEncryption $encryptor = null;

    private static ?PayPalExtraMeta $pay_pal_extra_meta = null;


    /**
     * Get PayPal extra meta helper.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return PayPalExtraMeta
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function extraMeta(EE_Payment_Method $paypal_pm): PayPalExtraMeta
    {
        if (! PayPalExtraMetaManager::$pay_pal_extra_meta instanceof PayPalExtraMeta) {
            PayPalExtraMetaManager::$pay_pal_extra_meta = new PayPalExtraMeta($paypal_pm);
        }
        return PayPalExtraMetaManager::$pay_pal_extra_meta;
    }


    /**
     * Get OpenSSLEncryption instance.
     *
     * @return OpenSSLEncryption
     */
    public static function encryptor(): OpenSSLEncryption
    {
        if (! PayPalExtraMetaManager::$encryptor instanceof OpenSSLEncryption) {
            PayPalExtraMetaManager::$encryptor = LoaderFactory::getLoader()->getShared(
                OpenSSLEncryption::class,
                [new Base64Encoder()]
            );
        }
        return PayPalExtraMetaManager::$encryptor;
    }


    /**
     * Get payment method option/extra meta
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $option_name
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getPmOption(EE_Payment_Method $paypal_pm, string $option_name)
    {
        $option_value = PayPalExtraMetaManager::extraMeta($paypal_pm)->getOption($option_name);
        // Decrypt the encrypted options.
        if (
            $option_name === Domain::META_KEY_ACCESS_TOKEN
            || $option_name === Domain::META_KEY_PARTNER_MERCHANT_ID
            || $option_name === Domain::META_KEY_CLIENT_SECRET
        ) {
            $option_value = PayPalExtraMetaManager::decryptString($option_value, $paypal_pm);
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
     * @throws ReflectionException
     */
    public static function savePmOption(EE_Payment_Method $paypal_pm, string $option_name, $option_value): bool
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->saveOption($option_name, $option_value);
    }


    /**
     * Save a list of payment method options/extra meta.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $options_list
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function savePmOptions(EE_Payment_Method $paypal_pm, array $options_list): bool
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->saveBatch($options_list);
    }


    /**
     * Delete payment method option/extra meta
     *
     * @param EE_Payment_Method $paypal_pm
     * @param string            $option_name
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function deletePmOption(EE_Payment_Method $paypal_pm, string $option_name): bool
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->deleteOption($option_name);
    }


    /**
     * Get all options for payment method.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getAllData(EE_Payment_Method $paypal_pm): array
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->getMetaData();
    }


    /**
     * Delete payment method metadata.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function deleteData(EE_Payment_Method $paypal_pm): bool
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->deleteMetaData();
    }


    /**
     * Delete all payment method metadata.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function deleteAllData(EE_Payment_Method $paypal_pm): bool
    {
        return PayPalExtraMetaManager::extraMeta($paypal_pm)->deleteAllMetaData();
    }

    /**
     * Save the debug mode option if it changed.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $request_data
     * @return bool             Updated or not.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function updateDebugMode(EE_Payment_Method $paypal_pm, array $request_data): bool
    {
        if (
            isset($request_data['sandbox_mode'])
            && in_array($request_data['sandbox_mode'], ['0', '1'], true)
            && $paypal_pm->debug_mode() !== (bool) $request_data['sandbox_mode']
        ) {
            try {
                $paypal_pm->save(['PMD_debug_mode' => (bool) $request_data['sandbox_mode']]);
            } catch (EE_Error $e) {
                PayPalLogger::errorLog(
                    sprintf(
                        esc_html__('Note, debug mode not saved ! %1$s', 'event_espresso'),
                        $e->getMessage()
                    ),
                    ['request_data' => $request_data, 'trace' => $e->getTrace()],
                    $paypal_pm
                );
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
     * @throws ReflectionException
     */
    public static function savePartnerAccessToken(EE_Payment_Method $paypal_pm, array $response): bool
    {
        $paypal_data         = [];
        $expected_parameters = [
            Domain::META_KEY_ACCESS_TOKEN,
            Domain::META_KEY_TOKEN_EXPIRES_IN,
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
                        $paypal_data[ $api_key ] = PayPalExtraMetaManager::encryptString(
                            $response[ $api_key ],
                            $paypal_pm
                        );
                        break;
                    case Domain::META_KEY_TOKEN_EXPIRES_IN:
                        $paypal_data[ $api_key ] = time() + (int) sanitize_key($response[ $api_key ]);
                        break;
                    default:
                        $paypal_data[ $api_key ] = sanitize_text_field($response[ $api_key ]);
                }
            } catch (Exception $e) {
                PayPalLogger::errorLog(
                    $e->getMessage(),
                    ['response' => $response, 'trace' => $e->getTrace()],
                    $paypal_pm
                );
                return false;
            }
        }
        return PayPalExtraMetaManager::savePmOptions($paypal_pm, $paypal_data);
    }


    /**
     * Save merchant/seller API credentials.
     *
     * @param EE_Payment_Method $paypal_pm
     * @param array             $response
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function saveSellerApiCredentials(EE_Payment_Method $paypal_pm, array $response): bool
    {
        $api_credentials     = [];
        $expected_parameters = [Domain::META_KEY_SELLER_MERCHANT_ID];
        foreach ($expected_parameters as $api_key) {
            if (! isset($response[ $api_key ])) {
                // Don't want to try saving data that doesn't exist.
                continue;
            }
            $api_credentials[ $api_key ] = $response[ $api_key ];
        }
        return PayPalExtraMetaManager::savePmOptions($paypal_pm, $api_credentials);
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
        if (! empty($data['response']['products'][0]['name'])) {
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
        // Save the scopes that were authorized.
        if (! empty($data['response']['oauth_integrations'][0]['oauth_third_party'][0]['scopes'])) {
            $scopes = [];
            foreach ($data['response']['oauth_integrations'][0]['oauth_third_party'][0]['scopes'] as $scope) {
                // Scope will look like: 'https://uri.paypal.com/services/payments/partnerfee'
                $split       = explode('/', $scope);
                $split_count = count($split);
                // Get the scope itself.
                $scopes[] = $split[ $split_count - 1 ];
            }
            if (empty($scopes)) {
                // In case the there's a change in how scopes come in just save the list.
                $scopes = $data['response']['oauth_integrations'][0]['oauth_third_party'][0]['scopes'];
            }
            PayPalExtraMetaManager::savePmOption($paypal_pm, Domain::META_KEY_AUTHORIZED_SCOPES, $scopes);
        }
        return PayPalExtraMetaManager::savePmOption(
            $paypal_pm,
            Domain::META_KEY_ALLOWED_CHECKOUT_TYPE,
            $allowed_checkout_type
        );
    }


    /**
     * Encrypt a text field.
     *
     * @param string            $text
     * @param EE_Payment_Method $paypal_pm
     * @return string|null
     * @throws Exception
     */
    public static function encryptString(string $text, EE_Payment_Method $paypal_pm): ?string
    {
        // We sure we are getting something ?
        if (! $text) {
            return $text;
        }

        try {
            // Do encrypt.
            $sanitized_text = sanitize_text_field($text);
            $key_identifier = $paypal_pm->debug_mode()
                ? PPCommerceEncryptionKeyManager::SANDBOX_ENCRYPTION_KEY_ID
                : PPCommerceEncryptionKeyManager::PRODUCTION_ENCRYPTION_KEY_ID;
            $encrypted      = PayPalExtraMetaManager::encryptor()->encrypt($sanitized_text, $key_identifier);
        } catch (Exception $e) {
            PayPalLogger::errorLog(
                $e->getMessage(),
                ['trace' => $e->getTrace()],
                $paypal_pm
            );
        }
        return $encrypted ?? null;
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
            $key_identifier = $paypal_pm->debug_mode()
                ? PPCommerceEncryptionKeyManager::SANDBOX_ENCRYPTION_KEY_ID
                : PPCommerceEncryptionKeyManager::PRODUCTION_ENCRYPTION_KEY_ID;
            $decrypted      = PayPalExtraMetaManager::encryptor()->decrypt($text, $key_identifier);
        } catch (Exception $e) {
            PayPalLogger::errorLog(
                $e->getMessage(),
                ['trace' => $e->getTrace()],
                $paypal_pm
            );
            return $text;
        }
        return $decrypted ?? $text;
    }
}
