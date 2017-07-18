<?php use EventEspresso\core\interfaces\InterminableInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



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

    /**
     * key used for saving the encryption key to the wp_options table
     */
    const ENCRYPTION_OPTION_KEY = 'ee_encryption_key';

    /**
     * the OPENSSL cipher method used
     */
    const OPENSSL_CIPHER_METHOD = 'AES-128-CBC';

    /**
     * WP "options_name" used to store a verified available cipher method
     */
    const OPENSSL_CIPHER_METHOD_OPTION_NAME = 'ee_openssl_cipher_method';

    /**
     * the OPENSSL digest method used
     */
    const OPENSSL_DIGEST_METHOD = 'sha512';

    /**
     * separates the encrypted text from the initialization vector
     */
    const OPENSSL_IV_DELIMITER = ':iv:';

    /**
     * appended to text encrypted using the acme encryption
     */
    const ACME_ENCRYPTION_FLAG = '::ae';



    /**
     * instance of the EE_Encryption object
     */
    protected static $_instance;

    /**
     * @var string $_encryption_key
     */
    protected $_encryption_key;

    /**
     * @var string $cipher_method
     */
    private $cipher_method = '';

    /**
     * @var array $cipher_methods
     */
    private $cipher_methods = array();

    /**
     * @var array $digest_methods
     */
    private $digest_methods = array();

    /**
     * @var boolean $_use_openssl_encrypt
     */
    protected $_use_openssl_encrypt = false;

    /**
     * @var boolean $_use_mcrypt
     */
    protected $_use_mcrypt = false;

    /**
     * @var boolean $_use_base64_encode
     */
    protected $_use_base64_encode = false;



    /**
     * protected constructor to prevent direct creation
     */
    protected function __construct()
    {
        if (! defined('ESPRESSO_ENCRYPT')) {
            define('ESPRESSO_ENCRYPT', true);
        }
        if (extension_loaded('openssl')) {
            $this->_use_openssl_encrypt = true;
        } else if (extension_loaded('mcrypt')) {
            $this->_use_mcrypt = true;
        }
        if (function_exists('base64_encode')) {
            $this->_use_base64_encode = true;
        }
    }



    /**
     * singleton method used to instantiate class object
     *
     * @return EE_Encryption
     */
    public static function instance()
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Encryption) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    /**
     * get encryption key
     *
     * @return string
     */
    public function get_encryption_key()
    {
        // if encryption key has not been set
        if (empty($this->_encryption_key)) {
            // retrieve encryption_key from db
            $this->_encryption_key = get_option(EE_Encryption::ENCRYPTION_OPTION_KEY, '');
            // WHAT?? No encryption_key in the db ??
            if ($this->_encryption_key === '') {
                // let's make one. And md5 it to make it just the right size for a key
                $new_key = md5($this->generate_random_string());
                // now save it to the db for later
                add_option(EE_Encryption::ENCRYPTION_OPTION_KEY, $new_key);
                // here's the key - FINALLY !
                $this->_encryption_key = $new_key;
            }
        }
        return $this->_encryption_key;
    }



    /**
     * encrypts data
     *
     * @param string $text_string - the text to be encrypted
     * @return string
     * @throws RuntimeException
     */
    public function encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        if ($this->_use_openssl_encrypt) {
            $encrypted_text = $this->openssl_encrypt($text_string);
        } else {
            $encrypted_text = $this->acme_encrypt($text_string);
        }
        return $encrypted_text;
    }



    /**
     * decrypts data
     *
     * @param string $encrypted_text - the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    public function decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // if PHP's mcrypt functions are installed then we'll use them
        if ($this->_use_openssl_encrypt) {
            $decrypted_text = $this->openssl_decrypt($encrypted_text);
        } else {
            $decrypted_text = $this->acme_decrypt($encrypted_text);
        }
        return $decrypted_text;
    }



    /**
     * encodes string with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $text_string the text to be encoded
     * @return string
     */
    public function base64_string_encode($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! $this->_use_base64_encode) {
            return $text_string;
        }
        // encode
        return base64_encode($text_string);
    }



    /**
     * decodes string that has been encoded with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $encoded_string the text to be decoded
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
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $text_string the text to be encoded
     * @return string
     */
    public function base64_url_encode($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! $this->_use_base64_encode) {
            return $text_string;
        }
        // encode
        $encoded_string = base64_encode($text_string);
        // remove chars to make encoding more URL friendly
        return strtr($encoded_string, '+/=', '-_,');
    }



    /**
     * decodes  url string that has been encoded with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $encoded_string the text to be decoded
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
     * encrypts data using PHP's openssl functions
     *
     * @param string $text_string the text to be encrypted
     * @return string
     * @throws RuntimeException
     */
    protected function openssl_encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        $this->cipher_method = $this->getCipherMethod();
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
            $text_string,
            $this->cipher_method,
            $this->getDigestHashValue(),
            0,
            $iv
        );
        // append the initialization vector
        $encrypted_text .= EE_Encryption::OPENSSL_IV_DELIMITER . $iv;
        // trim and maybe encode
        return $this->_use_base64_encode
            ? trim(base64_encode($encrypted_text))
            : trim($encrypted_text);
    }



    /**
     * Returns a cipher method that has been verified to work.
     * First checks if the cached cipher has been set already and if so, returns that.
     * Then tests the incoming default and returns that if it's good.
     * If not, then it retrieves the previously tested and saved cipher method.
     * But if that doesn't exist, then calls getAvailableCipherMethod()
     * to see what is available on the server, and returns the results.
     *
     * @param string $cipher_method
     * @return string
     * @throws RuntimeException
     */
    protected function getCipherMethod($cipher_method = EE_Encryption::OPENSSL_CIPHER_METHOD)
    {
        if($this->cipher_method !== ''){
            return $this->cipher_method;
        }
        // verify that the default cipher method can produce an initialization vector
        if (openssl_cipher_iv_length($cipher_method) === false) {
            // nope? okay let's get what we found in the past to work
            $cipher_method = get_option(EE_Encryption::OPENSSL_CIPHER_METHOD_OPTION_NAME, '');
            // oops... haven't tested available cipher methods yet
            if($cipher_method === '' || openssl_cipher_iv_length($cipher_method) === false) {
                $cipher_method = $this->getAvailableCipherMethod($cipher_method);
            }
        }
        return $cipher_method;
    }



    /**
     * @param string $cipher_method
     * @return string
     * @throws \RuntimeException
     */
    protected function getAvailableCipherMethod($cipher_method)
    {
        // verify that the incoming cipher method can produce an initialization vector
        if (openssl_cipher_iv_length($cipher_method) === false) {
            // nope? then check the next cipher in the list of available cipher methods
            $cipher_method = next($this->cipher_methods);
            // what? there's no list? then generate that list and cache it,
            if (empty($this->cipher_methods)) {
                $this->cipher_methods = openssl_get_cipher_methods();
                // then grab the first item from the list
                $cipher_method = reset($this->cipher_methods);
            }
            if($cipher_method === false){
                throw new RuntimeException(
                    esc_html__(
                        'OpenSSL support appears to be enabled on the server, but no cipher methods are available. Please contact the server administrator.',
                        'event_espresso'
                    )
                );
            }
            // verify that the next cipher method works
            return $this->getAvailableCipherMethod($cipher_method);
        }
        // if we've gotten this far, then we found an available cipher method that works
        // so save that for next time
        update_option(
            EE_Encryption::OPENSSL_CIPHER_METHOD_OPTION_NAME,
            $cipher_method
        );
        return $cipher_method;
    }



    /**
     * decrypts data that has been encrypted with PHP's openssl functions
     *
     * @param string $encrypted_text the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    protected function openssl_decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // decode
        $encrypted_text = $this->valid_base_64($encrypted_text)
            ? base64_decode($encrypted_text)
            : $encrypted_text;
        $encrypted_components = explode(
            EE_Encryption::OPENSSL_IV_DELIMITER,
            $encrypted_text,
            2
        );
        // check that iv exists, and if not, maybe text was encoded using mcrypt?
        if ($this->_use_mcrypt && ! isset($encrypted_components[1])) {
            return $this->m_decrypt($encrypted_text);
        }
        // decrypt it
        $decrypted_text = openssl_decrypt(
            $encrypted_components[0],
            $this->getCipherMethod(),
            $this->getDigestHashValue(),
            0,
            $encrypted_components[1]
        );
        $decrypted_text = trim($decrypted_text);
        return $decrypted_text;
    }



    /**
     * Computes the digest hash value using the specified digest method.
     * If that digest method fails to produce a valid hash value,
     * then we'll grab the next digest method and recursively try again until something works.
     *
     * @param string $digest_method
     * @return string
     * @throws RuntimeException
     */
    protected function getDigestHashValue($digest_method = EE_Encryption::OPENSSL_DIGEST_METHOD){
        $digest_hash_value = openssl_digest($this->get_encryption_key(), $digest_method);
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
     * @throws \RuntimeException
     */
    protected function getDigestMethod(){
        $digest_method = prev($this->digest_methods);
        if (empty($this->digest_methods)) {
            $this->digest_methods = openssl_get_md_methods();
            $digest_method = end($this->digest_methods);
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


    /**
     * encrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @see http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @param string $text_string the text to be decrypted
     * @return string
     */
    protected function acme_encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        $key_bits = str_split(
            str_pad(
                '',
                strlen($text_string),
                $this->get_encryption_key(),
                STR_PAD_RIGHT
            )
        );
        $string_bits = str_split($text_string);
        foreach ($string_bits as $k => $v) {
            $temp = ord($v) + ord($key_bits[$k]);
            $string_bits[$k] = chr($temp > 255 ? ($temp - 256) : $temp);
        }
        $encrypted_text = implode('', $string_bits);
        $encrypted_text .= EE_Encryption::ACME_ENCRYPTION_FLAG;
        return $this->_use_base64_encode
            ? base64_encode($encrypted_text)
            : $encrypted_text;
    }



    /**
     * decrypts data for acme servers that didn't bother to install PHP mcrypt
     *
     * @see http://stackoverflow.com/questions/800922/how-to-encrypt-string-without-mcrypt-library-in-php
     * @param string $encrypted_text the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    protected function acme_decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // decode the data ?
        $encrypted_text = $this->valid_base_64($encrypted_text)
            ? base64_decode($encrypted_text)
            : $encrypted_text;
        if (
            $this->_use_mcrypt
            && strpos($encrypted_text, EE_Encryption::ACME_ENCRYPTION_FLAG) === false
        ){
            return $this->m_decrypt($encrypted_text);
        }
        $encrypted_text = substr($encrypted_text, 0, -4);
        $key_bits = str_split(
            str_pad(
                '',
                strlen($encrypted_text),
                $this->get_encryption_key(),
                STR_PAD_RIGHT
            )
        );
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
    protected function valid_base_64($string)
    {
        // ensure data is a string
        if (! is_string($string) || ! $this->_use_base64_encode) {
            return false;
        }
        $decoded = base64_decode($string, true);
        // Check if there is no invalid character in string
        if (! preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $string)) {
            return false;
        }
        // Decode the string in strict mode and send the response
        if (! base64_decode($string, true)) {
            return false;
        }
        // Encode and compare it to original one
        return base64_encode($decoded) === $string;
    }



    /**
     * generate random string
     *
     * @see http://stackoverflow.com/questions/637278/what-is-the-best-way-to-generate-a-random-key-within-php
     * @param int $length number of characters for random string
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



    /**
     * encrypts data using PHP's mcrypt functions
     *
     * @deprecated 4.9.39
     * @param string $text_string
     * @internal   param $string - the text to be encrypted
     * @return string
     * @throws RuntimeException
     */
    protected function m_encrypt($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string)) {
            return $text_string;
        }
        // get the initialization vector size
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        // initialization vector
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        if ($iv === false) {
            throw new RuntimeException(
                esc_html__('Failed to generate mcrypt initialization vector.', 'event_espresso')
            );
        }
        // encrypt it
        $encrypted_text = mcrypt_encrypt(
            MCRYPT_RIJNDAEL_256,
            $this->get_encryption_key(),
            $text_string,
            MCRYPT_MODE_ECB,
            $iv
        );
        // trim and maybe encode
        return $this->_use_base64_encode
            ? trim(base64_encode($encrypted_text))
            : trim($encrypted_text);
    }



    /**
     * decrypts data that has been encrypted with PHP's mcrypt functions
     *
     * @deprecated 4.9.39
     * @param string $encrypted_text the text to be decrypted
     * @return string
     * @throws RuntimeException
     */
    protected function m_decrypt($encrypted_text = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encrypted_text)) {
            return $encrypted_text;
        }
        // decode
        $encrypted_text = $this->valid_base_64($encrypted_text)
            ? base64_decode($encrypted_text)
            : $encrypted_text;
        // get the initialization vector size
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        if ($iv === false) {
            throw new RuntimeException(
                esc_html__('Failed to generate mcrypt initialization vector.', 'event_espresso')
            );
        }
        // decrypt it
        $decrypted_text = mcrypt_decrypt(
            MCRYPT_RIJNDAEL_256,
            $this->get_encryption_key(),
            $encrypted_text,
            MCRYPT_MODE_ECB,
            $iv
        );
        $decrypted_text = trim($decrypted_text);
        return $decrypted_text;
    }

}
/* End of file EE_Encryption.class.php */
/* Location: /includes/core/EE_Encryption.core.php */
