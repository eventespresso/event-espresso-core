<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption;

use EventEspresso\core\services\encryption\Base64Encoder;
use EventEspresso\core\services\encryption\EncryptionKeyManager;
use Exception;

/**
 * Class PPCommerceEncryptionKeyManager
 *
 * Encryption key manager class set for use in this add-on.
 *
 * @package EventEspresso\PaymentMethods\PayPalCommerce\tools\encryption
 * @author  Nazar Kolivoshka
 */
class PPCommerceEncryptionKeyManager extends EncryptionKeyManager
{
    /**
     * The name of the live encryption key.
     */
    public const PRODUCTION_ENCRYPTION_KEY_ID = 'eea-pp-commerce-encryption-key-production';

    /**
     * The name of the sandbox encryption key.
     */
    public const SANDBOX_ENCRYPTION_KEY_ID = 'ee-pp-commerce-encryption-key-sandbox';

    /**
     * The name of the sandbox encryption keys ID.
     */
    public const ENCRYPTION_KEYS_ID = 'eea-pp-commerce-encryption-keys';


    /**
     * Class constructor.
     * Setup two keys, for production and sandbox.
     *
     * @param Base64Encoder $base64_encoder
     * @throws Exception
     */
    public function __construct(Base64Encoder $base64_encoder)
    {
        // Register a production key.
        parent::__construct($base64_encoder, self::PRODUCTION_ENCRYPTION_KEY_ID, self::ENCRYPTION_KEYS_ID);

        // Now add the sandbox key if it doesn't exist.
        if (! $this->encryptionKeyExists(self::SANDBOX_ENCRYPTION_KEY_ID)) {
            $this->addEncryptionKey(self::SANDBOX_ENCRYPTION_KEY_ID);
        }
    }
}
