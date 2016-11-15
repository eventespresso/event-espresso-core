<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EE_Encryption class
 * class for applying low-grade string encryption/decryption
 * really only good for hiding content from simple bots and script kiddies
 * but better for solving encoding issues with databases
 *
 * @package    Event Espresso
 * @subpackage includes/functions
 * @author     Brent Christensen
 */
class EE_Encryption
{

    // instance of the EE_Encryption object
    protected static $_instance;

    protected        $_encryption_key;

    protected        $_use_mcrypt = true;



    /**
     *    private constructor to prevent direct creation

     */
    private function __construct()
    {
        define('ESPRESSO_ENCRYPT', true);
        if ( ! function_exists('mcrypt_encrypt')) {
            $this->_use_mcrypt = false;
        }
    }



    /**
     *    singleton method used to instantiate class object
     *
     * @access public
     * @return \EE_Encryption
     */
    public static function instance()
    {
        // check if class object is instantiated
        if ( ! self::$_instance instanceof EE_Encryption) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    /**
     *        get encryption key
     *
     * @access public
     * @return string
     */
    public function get_encryption_key()
    {
        // if encryption key has not been set
        if (empty($this->_encryption_key)) {
            // retrieve encryption_key from db
            $this->_encryption_key = get_option('ee_encryption_key', '');
            // WHAT?? No encryption_key in the db ??
            if ($this->_encryption_key === '') {
                // let's make one. And md5 it to make it just the right size for a key
                $new_key = md5($this->generate_random_string());
                // now save it to the db for later
                add_option('ee_encryption_key', $new_key);
                // here's the key - FINALLY !
                $this->_encryption_key = $new_key;
            }
        }
        return $this->_encryption_key;
    }



    /**
     * encrypts data
     *
     * @access   public
     * @param string $text_string - the text to be encrypted
     * @return string
     */
    public function encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        if ($this->_use_mcrypt) {
            $encrypted_text = $this->m_encrypt($text_string);
        } else {
            $encrypted_text = $this->acme_encrypt($text_string);
        }
        return $encrypted_text;
    }



    /**
     * decrypts data
     *
     * @access   public
     * @param string $encrypted_text - the text to be decrypted
     * @return string
     */
    public function decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // if PHP's mcrypt functions are installed then we'll use them
        if ($this->_use_mcrypt) {
            $decrypted_text = $this->m_decrypt($encrypted_text);
        } else {
            $decrypted_text = $this->acme_decrypt($encrypted_text);
        }
        return $decrypted_text;
    }



    /**
     * encodes string with PHP's base64 encoding
     * @source  http://php.net/manual/en/function.base64-encode.php
     *
     * @param string $text_string
     * @internal param $string - the text to be encoded
     * @return string
     */
    public function base64_string_encode($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! function_exists('base64_encode')) {
            return $text_string;
        }
        // encode
        return base64_encode($text_string);
    }



    /**
     * decodes string that has been encoded with PHP's base64 encoding
     * @source  http://php.net/manual/en/function.base64-encode.php
     *
     * @param string $encoded_string
     * @internal param $string - the text to be decoded
     * @return string
     */
    public function base64_string_decode($encoded_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encoded_string) || ! $this->valid_base_64($encoded_string)) {
            return $encoded_string;
        }
        // decode
        return base64_decode($encoded_string);
    }



    /**
     * encodes  url string with PHP's base64 encoding
     * @source  http://php.net/manual/en/function.base64-encode.php
     *
     * @access   public
     * @param string $text_string
     * @internal param $string - the text to be encoded
     * @return string
     */
    public function base64_url_encode($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! function_exists('base64_encode')) {
            return $text_string;
        }
        // encode
        $encoded_string = base64_encode($text_string);
        // remove chars to make encoding more URL friendly
        return strtr($encoded_string, '+/=', '-_,');
    }



    /**
     * decodes  url string that has been encoded with PHP's base64 encoding
     * @source  http://php.net/manual/en/function.base64-encode.php
     *
     * @access   public
     * @param string $encoded_string
     * @internal param $string - the text to be decoded
     * @return string
     */
    public function base64_url_decode($encoded_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encoded_string) || ! $this->valid_base_64($encoded_string)) {
            return $encoded_string;
        }
        // replace previously removed characters
        $encoded_string = strtr($encoded_string, '-_,', '+/=');
        // decode
        return base64_decode($encoded_string);
    }



    /**
     * encrypts data using PHP's mcrypt functions
     *
     * @access   private
     * @param string $text_string
     * @internal param $string - the text to be encrypted
     * @return string
     */
    private function m_encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        // get the initialization vector size
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        // initialization vector
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        // encrypt it
        $encrypted_text = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $this->get_encryption_key(), $text_string, MCRYPT_MODE_ECB, $iv);
        // trim and maybe encode
        return function_exists('base64_encode') ? trim(base64_encode($encrypted_text)) : trim($encrypted_text);
    }



    /**
     * decrypts data that has been encrypted with PHP's mcrypt functions
     *
     * @access   private
     * @param string $encrypted_text
     * @internal param $string - the text to be decrypted
     * @return string
     */
    private function m_decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // decode
        $encrypted_text = $this->valid_base_64($encrypted_text) ? base64_decode($encrypted_text) : $encrypted_text;
        // get the initialization vector size
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        // decrypt it
        $decrypted_text = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $this->get_encryption_key(), $encrypted_text, MCRYPT_MODE_ECB, $iv);
        $decrypted_text = trim($decrypted_text);
        return $decrypted_text;
    }



    /**
     * encrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @source   : http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @access   private
     * @param string $text_string
     * @internal param $string - the text to be decrypted
     * @return string
     */
    private function acme_encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        $key_bits = str_split(str_pad('', strlen($text_string), $this->get_encryption_key(), STR_PAD_RIGHT));
        $string_bits = str_split($text_string);
        foreach ($string_bits as $k => $v) {
            $temp = ord($v) + ord($key_bits[$k]);
            $string_bits[$k] = chr($temp > 255 ? ($temp - 256) : $temp);
        }
        return function_exists('base64_encode') ? base64_encode(implode('', $string_bits)) : implode('', $string_bits);
    }



    /**
     * decrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @source   : http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @param string $encrypted_text the text to be decrypted
     * @return string
     */
    private function acme_decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // decode the data ?
        $encrypted_text = $this->valid_base_64($encrypted_text) ? base64_decode($encrypted_text) : $encrypted_text;
        $key_bits = str_split(str_pad('', strlen($encrypted_text), $this->get_encryption_key(), STR_PAD_RIGHT));
        $string_bits = str_split($encrypted_text);
        foreach ($string_bits as $k => $v) {
            $temp = ord($v) - ord($key_bits[$k]);
            $string_bits[$k] = chr($temp < 0 ? ($temp + 256) : $temp);
        }
        return implode('', $string_bits);
    }



    /**
     * @see http://stackoverflow.com/questions/2556345/detect-base64-encoding-in-php#30231906
     * @param $string
     * @return bool
     */
    private function valid_base_64($string)
    {
        // ensure data is a string
        if ( ! is_string($string) || ! function_exists('base64_decode')) {
            return false;
        }
        $decoded = base64_decode($string, true);
        // Check if there is no invalid character in string
        if ( ! preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $string)) {
            return false;
        }
        // Decode the string in strict mode and send the response
        if ( ! base64_decode($string, true)) {
            return false;
        }
        // Encode and compare it to original one
        return base64_encode($decoded) === $string;
    }



    /**
     * generate random string
     *
     * @source   : http://stackoverflow.com/questions/637278/what-is-the-best-way-to-generate-a-random-key-within-php
     * @access   public
     * @param int $length
     * @internal param $string - number of characters for random string
     * @return string
     */
    public function generate_random_string($length = 40)
    {
        $iterations = ceil($length / 40);
        $random_string = '';
        for ($i = 0; $i < $iterations; $i++) {
            $random_string .= sha1(microtime(true) . mt_rand(10000, 90000));
        }
        $random_string = substr($random_string, 0, $length);
        return $random_string;
    }



}
/* End of file EE_Encryption.class.php */
/* Location: /includes/core/EE_Encryption.core.php */