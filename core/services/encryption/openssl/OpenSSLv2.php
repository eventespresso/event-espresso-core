<?php

namespace EventEspresso\core\services\encryption\openssl;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\EncryptionKeyManager;
use EventEspresso\core\services\encryption\EncryptionKeyManagerInterface;
use Exception;
use RuntimeException;

/**
 * Encryption Method using the OpenSSL library for use with PHP 7.1 or greater
 *
 * @package    Event Espresso
 * @subpackage core\services\encryption\openssl
 * @author     Brent Christensen
 * @since      $VID:$
 */
class OpenSSLv2 extends OpenSSL
{

    /**
     * name used for a default encryption key in case no others are set
     */
    const DEFAULT_ENCRYPTION_KEY_ID = 'default_openssl_v2_key';

    /**
     * name used for saving encryption keys to the wp_options table
     */
    const ENCRYPTION_KEYS_OPTION_NAME = 'ee_openssl_v2_encryption_keys';

    /**
     * the OPENSSL cipher method used
     */
    const CIPHER_METHOD = 'aes-256-gcm';

    /**
     * WP "options_name" used to store a verified available cipher method
     */
    const CIPHER_METHOD_OPTION_NAME = 'ee_openssl_v2_cipher_method';

    /**
     * The length of the authentication tag. Its value can be between 4 and 16 for GCM mode.
     */
    const AUTH_TAG_LENGTH = 16;


    /**
     * To use custom a cipher method and/or encryption keys and/or minimum PHP version:
     *  - extend this class
     *  - configure a new CipherMethod / EncryptionKeyManager in the constructor
     *  - pass those to this constructor, like so:
     *
     *      public function __construct(Base64Encoder $base64_encoder) {
     *          parent::__construct(
     *              $base64_encoder,
     *              new CipherMethod(CIPHER_METHOD, CIPHER_METHOD_OPTION_NAME),
     *              new EncryptionKeyManager(CUSTOM_KEY_ID, CUSTOM_KEYS_OPTION_NAME),
     *              '7.1.0'
     *          );
     *      }
     *
     * @param Base64Encoder                      $base64_encoder
     * @param CipherMethod|null                  $cipher_method
     * @param EncryptionKeyManagerInterface|null $encryption_key_manager
     * @param string                             $min_php_version defaults to 7.1.0
     *                                                            (when openssl auth tag and random_bytes() were added)
     */
    public function __construct(
        Base64Encoder                 $base64_encoder,
        CipherMethod                  $cipher_method = null,
        EncryptionKeyManagerInterface $encryption_key_manager = null,
                                      $min_php_version = '7.1.0'
    ) {
        parent::__construct(
            $base64_encoder,
            $cipher_method instanceof CipherMethod
                ? $cipher_method
                : new CipherMethod(
                OpenSSLv2::CIPHER_METHOD,
                OpenSSLv2::CIPHER_METHOD_OPTION_NAME
            ),
            $encryption_key_manager instanceof EncryptionKeyManager
                ? $encryption_key_manager
                : new EncryptionKeyManager(
                $base64_encoder,
                OpenSSLv2::DEFAULT_ENCRYPTION_KEY_ID,
                OpenSSLv2::ENCRYPTION_KEYS_OPTION_NAME
            ),
            $min_php_version
        );
    }


    /**
     * encrypts data
     *
     * @param string $text_to_encrypt           - the text to be encrypted
     * @param string $encryption_key_identifier - [optional] cryptographically secure passphrase. generated if not set
     * @param string $aad                       - [optional] additional authentication data
     * @return string
     * @throws Exception
     */
    public function encrypt($text_to_encrypt, $encryption_key_identifier = '', $aad = '')
    {
        $cipher_method  = $this->cipher_method->getCipherMethod();
        $encryption_key = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        // generate initialization vector for the cipher method.
        $iv = random_bytes(openssl_cipher_iv_length($cipher_method));
        // encrypt it
        return $this->cipher_method->usesAuthenticatedEncryptionMode()
            ? $this->authenticatedEncrypt($text_to_encrypt, $cipher_method, $encryption_key, $iv, $aad)
            : $this->nonAuthenticatedEncrypt($text_to_encrypt, $cipher_method, $encryption_key, $iv);
    }


    /**
     * @param string $text_to_encrypt - the text to be encrypted
     * @param string $cipher_method   - the OpenSSL cipher method used during encryption
     * @param string $encryption_key  - cryptographically secure passphrase uses default if not set
     * @param string $iv              - the initialization vector
     * @param string $aad             - additional authentication data
     * @return string
     */
    private function authenticatedEncrypt($text_to_encrypt, $cipher_method, $encryption_key, $iv, $aad)
    {
        $encrypted_text = openssl_encrypt(
            $text_to_encrypt,
            $cipher_method,
            $this->getDigestHashValue($encryption_key, OpenSSL::DEFAULT_DIGEST_METHOD, OPENSSL_RAW_DATA),
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            $aad,
            OpenSSLv2::AUTH_TAG_LENGTH
        );
        // concatenate everything into one big string and encode it
        return $this->base64_encoder->encodeString($iv . $tag . $encrypted_text);
    }


    /**
     * @param string $text_to_encrypt - the text to be encrypted
     * @param string $cipher_method   - the OpenSSL cipher method used during encryption
     * @param string $encryption_key  - cryptographically secure passphrase uses default if not set
     * @param string $iv              - the initialization vector
     * @return string
     */
    private function nonAuthenticatedEncrypt($text_to_encrypt, $cipher_method, $encryption_key, $iv)
    {
        $encrypted_text = openssl_encrypt(
            $text_to_encrypt,
            $cipher_method,
            $this->getDigestHashValue($encryption_key),
            OPENSSL_RAW_DATA,
            $iv
        );
        // prepend the initialization vector and encode it
        return $this->base64_encoder->encodeString($iv . $encrypted_text);
    }


    /**
     * decrypts data
     *
     * @param string $encrypted_text            - the text to be decrypted
     * @param string $encryption_key_identifier - [optional] cryptographically secure passphrase uses default if not set
     * @param string $aad                       - [optional] additional authentication data
     * @return string
     */
    public function decrypt($encrypted_text, $encryption_key_identifier = '', $aad = '')
    {
        $cipher_method  = $this->cipher_method->getCipherMethod();
        $encryption_key = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        // maybe decode
        $encrypted_text = $this->base64_encoder->decodeString($encrypted_text);
        $iv_length      = openssl_cipher_iv_length($cipher_method);
        // use the iv length to snip it from the decoded string
        $iv = substr($encrypted_text, 0, $iv_length);
        // then remove it from the rest of the decoded string
        $encrypted_text = substr($encrypted_text, $iv_length);
        // decrypt it
        $decrypted_text = $this->cipher_method->usesAuthenticatedEncryptionMode()
            ? $this->authenticatedDecrypt($encrypted_text, $cipher_method, $encryption_key, $iv, $aad)
            : $this->nonAuthenticatedDecrypt($encrypted_text, $cipher_method, $encryption_key, $iv);

        if ($decrypted_text === false) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'The following error occurred during decryption: %1$s%2$s',
                        'event_espresso'
                    ),
                    '<br />',
                    openssl_error_string()
                )
            );
        }
        return trim($decrypted_text);
    }


    /**
     * @param string $encrypted_text - the text to be decrypted
     * @param string $cipher_method  - the OpenSSL cipher method used during encryption
     * @param string $encryption_key - cryptographically secure passphrase uses default if not set
     * @param string $iv             - the initialization vector
     * @param string $aad            - additional authentication data
     * @return string|false
     */
    private function authenticatedDecrypt($encrypted_text, $cipher_method, $encryption_key, $iv, $aad)
    {
        // use the tag length to snip it from the decoded string
        $tag = substr($encrypted_text, 0, OpenSSLv2::AUTH_TAG_LENGTH);
        // then remove it from the rest of the decoded string
        $encrypted_text = substr($encrypted_text, OpenSSLv2::AUTH_TAG_LENGTH);
        return openssl_decrypt(
            $encrypted_text,
            $cipher_method,
            $this->getDigestHashValue($encryption_key, OpenSSL::DEFAULT_DIGEST_METHOD, OPENSSL_RAW_DATA),
            OPENSSL_RAW_DATA,
            $iv,
            $tag,
            $aad
        );
    }


    /**
     * @param string $encrypted_text - the text to be decrypted
     * @param string $cipher_method  - the OpenSSL cipher method used during encryption
     * @param string $encryption_key - cryptographically secure passphrase uses default if not set
     * @param string $iv             - the initialization vector
     * @return string|false
     */
    private function nonAuthenticatedDecrypt($encrypted_text, $cipher_method, $encryption_key, $iv)
    {
        return openssl_decrypt(
            $encrypted_text,
            $cipher_method,
            $this->getDigestHashValue($encryption_key),
            OPENSSL_RAW_DATA,
            $iv
        );
    }
}
