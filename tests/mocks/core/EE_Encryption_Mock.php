<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EE_Encryption_Mock
 * Mocks the EE_Encryption class because it's stupid and it's momma is fat
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */
class EE_Encryption_Mock extends EE_Encryption
{



    /**
     * instance of the EE_Encryption_Mock object
     */
    protected static $_instance;



    /**
     * singleton method used to instantiate class object
     *
     * @return EE_Encryption_Mock
     */
    public static function instance()
    {
        // check if class object is instantiated
        if (! EE_Encryption_Mock::$_instance instanceof EE_Encryption_Mock) {
            EE_Encryption_Mock::$_instance = new self();
        }
        return EE_Encryption_Mock::$_instance;
    }


    /**
     * encrypts data using PHP's openssl functions
     *
     * @param string $text_string the text to be encrypted
     * @param string $cipher_method
     * @param string $encryption_key
     * @return string
     * @throws RuntimeException
     */
    public function openssl_encrypt(
        $text_string = '',
        $cipher_method = EE_Encryption::OPENSSL_CIPHER_METHOD,
        $encryption_key = ''
    ) {
        return parent::openssl_encrypt($text_string, $cipher_method, $encryption_key);
    }


    /**
     * decrypts data that has been encrypted with PHP's openssl functions
     *
     * @param string $encrypted_text the text to be decrypted
     * @param string $cipher_method
     * @param string $encryption_key
     * @return string
     * @throws RuntimeException
     */
    public function openssl_decrypt(
        $encrypted_text = '',
        $cipher_method = EE_Encryption::OPENSSL_CIPHER_METHOD,
        $encryption_key = ''
    ) {
        return parent::openssl_decrypt($encrypted_text, $cipher_method, $encryption_key);
    }



    /**
     * encrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @see http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @param string $text_string the text to be decrypted
     * @return string
     */
    public function acme_encrypt($text_string = '')
    {
        return parent::acme_encrypt($text_string);
    }


    /**
     * decrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @see http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @param string $encrypted_text the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    public function acme_decrypt($encrypted_text = '')
    {
        return parent::acme_decrypt($encrypted_text);
    }



    /**
     * @see http://stackoverflow.com/questions/2556345/detect-base64-encoding-in-php#30231906
     * @param $string
     * @return bool
     */
    public function valid_base_64($string)
    {
        return parent::valid_base_64($string);
    }



    /**
     * encrypts data using PHP's mcrypt functions
     *
     * @deprecated 4.9.39
     * @param string $text_string
     * @internal   param $string - the text to be encrypted
     * @return string
     * @throws RuntimeException
     */
    public function m_encrypt($text_string = '')
    {
        return parent::m_encrypt($text_string);
    }



    /**
     * decrypts data that has been encrypted with PHP's mcrypt functions
     *
     * @deprecated 4.9.39
     * @param string $encrypted_text the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    public function m_decrypt($encrypted_text = '')
    {
        return parent::m_decrypt($encrypted_text);
    }


}
