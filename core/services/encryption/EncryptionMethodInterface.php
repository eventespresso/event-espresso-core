<?php

namespace EventEspresso\core\services\encryption;

/**
 * EncryptionMethodInterface
 *
 * @package    Event Espresso
 * @subpackage core\services\encryption\method
 * @author     Brent Christensen
 * @since      $VID:$
 */
interface EncryptionMethodInterface
{
    /**
     * returns true if the encryption method is cryptographically secure
     *
     * @return bool
     */
    public function isCryptographicallySecure();

    /**
     * returns true if the method can be used on the current server
     *
     * @return bool
     */
    public function canUse();


    /**
     * returns a message explaining why the encryption method in question can or can not be used
     *
     * @return string
     */
    public function canUseNotice();


    /**
     * encrypts data
     *
     * @param string $text_to_encrypt    - the text to be encrypted
     * @param string $encryption_key_identifier - name of the encryption key to use
     * @return string
     */
    public function encrypt($text_to_encrypt, $encryption_key_identifier = '');


    /**
     * decrypts data
     *
     * @param string $encrypted_text - the text to be decrypted
     * @param string $encryption_key_identifier - name of the encryption key to use
     * @return string
     */
    public function decrypt($encrypted_text, $encryption_key_identifier = '');
}
