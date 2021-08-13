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
 * @subpackage core\services\encryption\method
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
    const CIPHER_METHOD = 'AES-128-CBC';

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
        $encryption_key      = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        $this->cipher_method = $this->cipher_method->getCipherMethod();
        // get initialization vector size
        $iv_size = openssl_cipher_iv_length($this->cipher_method);
        // generate initialization vector.
        // The second parameter ("crypto_strong") is passed by reference,
        // and is used to determines if the algorithm used was "cryptographically strong"
        // openssl_random_pseudo_bytes() will toggle it to either true or false
        $iv = openssl_random_pseudo_bytes($iv_size, $is_strong);
        if ($iv === false || $is_strong === false) {
            throw new RuntimeException(
                esc_html__('Failed to generate OpenSSL initialization vector.', 'event_espresso')
            );
        }
        // encrypt it
        $encrypted_text = openssl_encrypt(
            $text_to_encrypt,
            $this->cipher_method,
            $this->getDigestHashValue($encryption_key),
            0,
            $iv
        );
        // append the initialization vector
        $encrypted_text .= OpenSSL::IV_DELIMITER . $iv;
        // trim and maybe encode
        return $this->base64_encoder->encodeString(trim($encrypted_text));
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
        $encryption_key = $this->encryption_key_manager->getEncryptionKey($encryption_key_identifier);
        // maybe decode
        $encrypted_text       = $this->base64_encoder->decodeString($encrypted_text);
        $encrypted_components = explode(
            OpenSSL::IV_DELIMITER,
            $encrypted_text,
            2
        );
        // decrypt it
        $decrypted_text = openssl_decrypt(
            $encrypted_components[0],
            $this->cipher_method->getCipherMethod(),
            $this->getDigestHashValue($encryption_key),
            0,
            $encrypted_components[1]
        );
        return trim($decrypted_text);
    }
}
