<?php

namespace EventEspresso\core\services\encryption;

use Exception;
use OutOfBoundsException;
use RuntimeException;

/**
 * Class EncryptionKeyManager
 * for storing and retrieving keys used by encryption methods
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\encryption
 * @since   $VID:$
 */
class EncryptionKeyManager implements EncryptionKeyManagerInterface
{
    /**
     * name used for a default encryption key in case no others are set
     *
     * @var string
     */
    private $default_encryption_key_id;

    /**
     * name used for saving encryption keys to the wp_options table
     *
     * @var string
     */
    private $encryption_keys_option_name;

    /**
     * @var array
     */
    private $encryption_keys = null;


    /**
     * @param string $default_encryption_key_id
     * @param string $encryption_keys_option_name
     */
    public function __construct($default_encryption_key_id, $encryption_keys_option_name)
    {
        $this->default_encryption_key_id   = $default_encryption_key_id;
        $this->encryption_keys_option_name = $encryption_keys_option_name;
    }


    /**
     * add an encryption key
     *
     * @param string $encryption_key_identifier - name of the encryption key to use
     * @param string $encryption_key            - cryptographically secure passphrase. will generate if necessary
     * @param bool   $overwrite                 - prevents accidental overwriting of an existing key which would be bad
     * @return bool
     * @throws Exception
     */
    public function addEncryptionKey($encryption_key_identifier, $encryption_key = '', $overwrite = false)
    {
        // ensure keys are loaded
        $this->retrieveEncryptionKeys();
        if (isset($this->encryption_keys[ $encryption_key_identifier ]) && ! $overwrite) {
            // WOAH!!! that key already exists and we don't want to overwrite it
            throw new RuntimeException (
                sprintf(
                    esc_html__(
                        'The "%1$s" encryption key already exists and can not be overwritten because previously encrypted values would no longer be capable of being decrypted.',
                        'event_espresso'
                    ),
                    $encryption_key_identifier
                )
            );
        }
        $this->encryption_keys[ $encryption_key_identifier ] = $encryption_key ?: $this->generateEncryptionKey();
        return $this->saveEncryptionKeys();
    }


    /**
     * returns cryptographically secure passphrase. will use default if necessary
     *
     * @param string $encryption_key_identifier - used for saving encryption key. will use default if necessary
     * @param string $generate                  - will generate a new key if the requested one does not exist
     * @return string
     * @throws Exception
     */
    public function getEncryptionKey($encryption_key_identifier = '', $generate = false)
    {
        $encryption_key_identifier = $encryption_key_identifier ?: $this->default_encryption_key_id;
        // ensure keys are loaded
        $this->retrieveEncryptionKeys();
        // if encryption key has not been set
        if (! isset($this->encryption_keys[ $encryption_key_identifier ])) {
            if ($generate) {
                $this->addEncryptionKey($encryption_key_identifier);
            } else {
                throw new OutOfBoundsException(
                    sprintf(
                        esc_html__('The "%1$s" encryption key was not found or is invalid.', 'event_espresso'),
                        $encryption_key_identifier
                    )
                );
            }
        }
        return $this->encryption_keys[ $encryption_key_identifier ];
    }


    /**
     * creates a new encryption key
     *
     * @param int $length number of characters for random string
     * @return string
     * @throws Exception
     */
    public function generateEncryptionKey($length = 64)
    {
        if (PHP_VERSION_ID >= 70100) {
            // default length is 64, which will get chopped down to 32 resulting in a 256 bit key
            // for a 128 byte key, just pass 32 for the length, which will get chopped down to 16
            $length = ceil($length / 2);
            // let's not let length go below 16 (128 bit key) or above 64 (512 bit key)
            $length = min(max($length, 16), 64);
            return random_bytes($length);
        }
        // @see http://stackoverflow.com/questions/637278/what-is-the-best-way-to-generate-a-random-key-within-php
        $iterations    = ceil($length / 40);
        $random_string = '';
        for ($i = 0; $i < $iterations; $i++) {
            $random_string .= sha1(microtime(true) . mt_rand(10000, 90000));
        }
        return substr($random_string, 0, $length);
    }


    /**
     * retrieves encryption keys from db
     *
     * @return string
     * @throws Exception
     */
    protected function retrieveEncryptionKeys()
    {
        // if encryption key has not been set
        if (! empty($this->encryption_keys)) {
            // retrieve encryption_key from db
            $this->encryption_keys = get_option($this->encryption_keys_option_name, null);
            // WHAT?? No encryption_key in the db ??
            if ($this->encryption_keys === null) {
                // let's make one. And md5 it to make it just the right size for a key
                $this->addEncryptionKey($this->default_encryption_key_id);
            }
        }
        return $this->encryption_keys;
    }


    /**
     * saves encryption keys from db
     *
     * @return bool
     */
    protected function saveEncryptionKeys()
    {
        return $this->encryption_keys === null
            ? add_option($this->encryption_keys_option_name, $this->encryption_keys)
            : update_option($this->encryption_keys_option_name, $this->encryption_keys);
    }
}
