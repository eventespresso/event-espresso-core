<?php

namespace EventEspresso\core\services\encryption\openssl;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\EncryptionKeyManagerInterface;
use EventEspresso\core\services\encryption\EncryptionMethodInterface;
use RuntimeException;

/**
 * Encryption Method using the OpenSSL library
 *
 * @package    Event Espresso
 * @subpackage core\services\encryption\method
 * @author     Brent Christensen
 * @since      $VID:$
 */
abstract class OpenSSL implements EncryptionMethodInterface
{

    /**
     * the default OPENSSL digest method to use
     */
    const DEFAULT_DIGEST_METHOD = 'sha512';

    /**
     * separates the encrypted text from the initialization vector
     */
    const IV_DELIMITER = ':iv:';

    /**
     * @var Base64Encoder
     */
    protected $base64_encoder;

    /**
     * @var CipherMethod
     */
    protected $cipher_method;

    /**
     * @var array $digest_methods
     */
    private $digest_methods = [];

    /**
     * @var EncryptionKeyManagerInterface
     */
    protected $encryption_key_manager;

    /**
     * @var boolean
     */
    private $openssl_installed;

    /**
     * @var string
     */
    private $min_php_version;


    /**
     * To use custom a cipher method and/or encryption keys:
     *  - extend this class
     *  - configure a new CipherMethod / EncryptionKeyManager in the constructor
     *  - pass those to this constructor, like so:
     *
     *      public function __construct(Base64Encoder $base64_encoder) {
     *          parent::__construct(
     *              $base64_encoder,
     *              new CipherMethod(CIPHER_METHOD, CIPHER_METHOD_OPTION_NAME)
     *              new EncryptionKeyManager(CUSTOM_KEY_ID, CUSTOM_KEYS_OPTION_NAME)
     *          );
     *      }
     *
     * @param Base64Encoder                      $base64_encoder
     * @param CipherMethod                       $cipher_method
     * @param EncryptionKeyManagerInterface|null $encryption_key_manager
     * @param string                             $min_php_version
     */
    public function __construct(
        Base64Encoder $base64_encoder,
        CipherMethod $cipher_method,
        EncryptionKeyManagerInterface $encryption_key_manager,
        $min_php_version
    ) {
        $this->base64_encoder         = $base64_encoder;
        $this->cipher_method          = $cipher_method;
        $this->encryption_key_manager = $encryption_key_manager;
        $this->min_php_version        = $min_php_version;
        $this->openssl_installed      = extension_loaded('openssl');
    }


    /**
     * @return bool
     */
    public function isCryptographicallySecure()
    {
        return true;
    }


    /**
     * @return bool
     */
    public function canUse()
    {
        return $this->openssl_installed && version_compare(PHP_VERSION, $this->min_php_version, '>=');
    }


    /**
     * @return string
     */
    public function canUseNotice()
    {
        if (! $this->openssl_installed) {
            return esc_html__(
                'The PHP openssl server extension is required to use Openssl encryption. Please contact your hosting provider regarding this issue.',
                'event_espresso'
            );
        }
        if (version_compare(PHP_VERSION, $this->min_php_version, '<')) {
            return sprintf(
                esc_html__(
                    'PHP version %1$s or greater is required to use Openssl encryption. Please contact your hosting provider regarding this issue.',
                    'event_espresso'
                ),
                $this->min_php_version
            );
        }
        return sprintf(
            esc_html__('OpenSSL v1 encryption using %1$S is available for use.', 'event_espresso'),
            OpenSSLv1::CIPHER_METHOD
        );
    }


    /**
     * Computes the digest hash value using the specified digest method.
     * If that digest method fails to produce a valid hash value,
     * then we'll grab the next digest method and recursively try again until something works.
     *
     * @param string $encryption_key
     * @param string $digest_method
     * @return string
     * @throws RuntimeException
     */
    protected function getDigestHashValue($encryption_key, $digest_method = OpenSSL::DEFAULT_DIGEST_METHOD)
    {
        $digest_hash_value = openssl_digest($encryption_key, $digest_method);
        if ($digest_hash_value === false) {
            return $this->getDigestHashValue($this->getDigestMethod());
        }
        return $digest_hash_value;
    }


    /**
     * Returns the NEXT element in the $digest_methods array.
     * If the $digest_methods array is empty, then we populate it
     * with the available values returned from openssl_get_md_methods().
     *
     * @return string
     * @throws RuntimeException
     */
    private function getDigestMethod()
    {
        $digest_method = prev($this->digest_methods);
        if (empty($this->digest_methods)) {
            $this->digest_methods = openssl_get_md_methods();
            $digest_method        = end($this->digest_methods);
        }
        if ($digest_method === false) {
            throw new RuntimeException(
                esc_html__(
                    'OpenSSL support appears to be enabled on the server, but no digest methods are available. Please contact the server administrator.',
                    'event_espresso'
                )
            );
        }
        return $digest_method;
    }
}
