<?php

namespace EventEspresso\core\services\encryption\openssl;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\EncryptionKeyManager;
use EventEspresso\core\services\encryption\EncryptionKeyManagerInterface;
use RuntimeException;

/**
 * Encryption Method using the OpenSSL library for use with older PHP versions
 *
 * @package    Event Espresso
 * @subpackage core\services\encryption\openssl
 * @author     Brent Christensen
 * @since      $VID:$
 */
class OpenSSLv1 extends OpenSSL
{

    /**
     * name used for a default encryption key in case no others are set
     */
    const DEFAULT_ENCRYPTION_KEY_ID = 'default_openssl_v1_key';

    /**
     * name used for saving encryption keys to the wp_options table
     */
    const ENCRYPTION_KEYS_OPTION_NAME = 'ee_openssl_v1_encryption_keys';

    /**
     * the OPENSSL cipher method used
     */
    const CIPHER_METHOD = 'aes-128-cbc';

    /**
     * WP "options_name" used to store a verified available cipher method
     */
    const CIPHER_METHOD_OPTION_NAME = 'ee_openssl_v1_cipher_method';


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
     * @param string                             $min_php_version defaults to 5.3.0 (when openssl added)
     */
    public function __construct(
        Base64Encoder                 $base64_encoder,
        CipherMethod                  $cipher_method = null,
        EncryptionKeyManagerInterface $encryption_key_manager = null,
                                      $min_php_version = '5.3.0'
    ) {
        parent::__construct(
            $base64_encoder,
            $cipher_method instanceof CipherMethod
                ? $cipher_method
                : new CipherMethod(
                OpenSSLv1::CIPHER_METHOD,
                OpenSSLv1::CIPHER_METHOD_OPTION_NAME
            ),
            $encryption_key_manager instanceof EncryptionKeyManager
                ? $encryption_key_manager
                : new EncryptionKeyManager(
                $base64_encoder,
                OpenSSLv1::DEFAULT_ENCRYPTION_KEY_ID,
                OpenSSLv1::ENCRYPTION_KEYS_OPTION_NAME
            ),
            $min_php_version
        );
    }


    /**
     * encrypts data
     *
     * @param string $text_to_encrypt           - the text to be encrypted
     * @param string $encryption_key_identifier - cryptographically secure passphrase. will generate if necessary
     * @return string
     */
    public function encrypt($text_to_encrypt, $encryption_key_identifier = '')
    {
        $cipher_method  = $this->cipher_method->getCipherMethod();
        $encryption_key = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        // get initialization vector size
        $iv_length = openssl_cipher_iv_length($cipher_method);
        // generate initialization vector.
        // The second parameter ("crypto_strong") is passed by reference,
        // and is used to determines if the algorithm used was "cryptographically strong"
        // openssl_random_pseudo_bytes() will toggle it to either true or false
        $iv = openssl_random_pseudo_bytes($iv_length, $is_strong);
        if ($iv === false || $is_strong === false) {
            throw new RuntimeException(
                esc_html__('Failed to generate OpenSSL initialization vector.', 'event_espresso')
            );
        }
        $key = $this->getDigestHashValue($encryption_key);
        // encrypt it
        $encrypted_text = openssl_encrypt(
            $this->base64_encoder->encodeString($text_to_encrypt), // encode to remove special characters
            $cipher_method,
            $key,
            0,
            $iv
        );
        $this->validateEncryption($encrypted_text);
        $encrypted_text = trim($encrypted_text);
        // hash the raw encrypted text
        $hmac = hash_hmac($this->getHashAlgorithm(), $encrypted_text, $key, true);
        // concatenate everything into one big string and encode it again
        return $this->base64_encoder->encodeString($iv . $hmac . $encrypted_text);
    }


    /**
     * decrypts data
     *
     * @param string $encrypted_text            - the text to be decrypted
     * @param string $encryption_key_identifier - cryptographically secure passphrase. will use default if necessary
     * @return string
     */
    public function decrypt($encrypted_text, $encryption_key_identifier = '')
    {
        $cipher_method  = $this->cipher_method->getCipherMethod();
        $encryption_key = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        $key            = $this->getDigestHashValue($encryption_key);
        // decode our concatenated string
        $encrypted_text = $this->base64_encoder->decodeString($encrypted_text);
        // get the string lengths used for the hash and iv
        $hash_length = $this->calculateHashLength($encryption_key);
        $iv_length   = openssl_cipher_iv_length($cipher_method);
        // use the above lengths to snip the required values from the decoded string
        $iv                 = substr($encrypted_text, 0, $iv_length);
        $hmac               = substr($encrypted_text, $iv_length, $hash_length);
        $encrypted_text_raw = substr($encrypted_text, $iv_length + $hash_length);
        // rehash the original raw encrypted text
        $rehash_mac = hash_hmac($this->getHashAlgorithm(), $encrypted_text_raw, $key, true);
        // timing attack safe comparison to determine if anything has changed
        if (hash_equals($hmac, $rehash_mac)) {
            // looks good, decrypt it, trim it, and return it
            $decrypted_text = openssl_decrypt(
                $encrypted_text_raw,
                $this->cipher_method->getCipherMethod(),
                $key,
                0,
                $iv
            );
            $this->validateDecryption($decrypted_text);
            return trim($this->base64_encoder->decodeString($decrypted_text));
        }
        throw new RuntimeException(
            esc_html__(
                'Decryption failed because a hash comparison of the original text and the decrypted text was not the same, meaning something in the system or the encrypted data has changed.',
                'event_espresso'
            )
        );
    }
}
