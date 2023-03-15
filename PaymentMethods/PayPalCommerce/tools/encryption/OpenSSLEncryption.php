<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\openssl\CipherMethod;
use EventEspresso\core\services\encryption\openssl\OpenSSLv2;
use Exception;

/**
 * Class OpenSSLEncryption
 *
 * Encryption helper class set for use in this add-on.
 * Uses OpenSSL v2.
 *
 * @package EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption
 * @author  Nazar Kolivoshka
 */
class OpenSSLEncryption extends OpenSSLv2
{
    /**
     * Class constructor.
     * Setup OpenSSLv2 with PayPal Commerce specific encryption keys.
     *
     * @param Base64Encoder $base64_encoder
     * @throws Exception
     */
    public function __construct(Base64Encoder $base64_encoder)
    {
        // PayPal Commerce specific encryption keys with a default OpenSSLv2 cipher method.
        parent::__construct(
            $base64_encoder,
            new CipherMethod(OpenSSLv2::CIPHER_METHOD, OpenSSLv2::CIPHER_METHOD_OPTION_NAME),
            new PPCommerceEncryptionKeyManager($base64_encoder)
        );
    }
}
