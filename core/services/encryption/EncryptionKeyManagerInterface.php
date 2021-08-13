<?php

namespace EventEspresso\core\services\encryption;

/**
 * Class EncryptionKeyManager
 * for storing and retrieving keys used by encryption methods
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\encryption
 * @since   $VID:$
 */
interface EncryptionKeyManagerInterface
{
    /**
     * add an encryption key
     *
     * @param string $encryption_key_identifier - name of the encryption key to use
     * @param string $encryption_key            - cryptographically secure passphrase. will generate if necessary
     * @param bool   $overwrite                 - prevents accidental overwriting of an existing key which would be bad
     * @return bool
     */
    public function addEncryptionKey($encryption_key_identifier, $encryption_key = '', $overwrite = false);


    /**
     * returns cryptographically secure passphrase. will use default if necessary
     *
     * @param string $encryption_key_identifier - used for saving encryption key. will use default if necessary
     * @param string $generate                  - will generate a new key if the requested one does not exist
     * @return string
     */
    public function getEncryptionKey($encryption_key_identifier = '', $generate = false);


    /**
     * creates a new encryption key
     *
     * @return string
     */
    public function generateEncryptionKey();


    /**
     * @param int $bit_depth options are 128, 192, or 256
     */
    public function setBitDepth($bit_depth);


    /**
     * @param int $key_length
     */
    public function setKeyLength($key_length);
}
