<?php

namespace EventEspresso\core\services\encryption\openssl;

use RuntimeException;

/**
 * Class CipherMethod
 * for managing available OpenSSL cipher method algorithms
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\encryption\openssl
 * @since   $VID:$
 */
class CipherMethod
{

    /**
     * @var string
     */
    private $cipher_method_option_name;

    /**
     * @var array
     */
    private $cipher_methods = [];

    /**
     * @var string
     */
    private $default_cipher_method;

    /**
     * the OpenSSL cipher method to use. default: AES-128-CBC
     *
     * @var string
     */
    private $validated_cipher_method;

    /**
     * as early as Aug 2016, Openssl declared the following weak: RC2, RC4, DES, 3DES, MD5 based
     * and ECB mode should be avoided
     *
     * @var array
     */
    private $weak_algorithms = [ 'des', 'ecb', 'md5', 'rc2', 'rc4' ];


    /**
     * @param string $default_cipher_method
     * @param string $cipher_method_option_name
     */
    public function __construct($default_cipher_method, $cipher_method_option_name)
    {
        $this->default_cipher_method = $default_cipher_method;
        $this->cipher_method_option_name = $cipher_method_option_name;
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
    public function getCipherMethod($cipher_method = null)
    {
        $cipher_method = $cipher_method ?: $this->default_cipher_method;
        if ($this->validated_cipher_method === null) {
            // verify that the default cipher method can produce an initialization vector
            if (openssl_cipher_iv_length($cipher_method) === false) {
                // nope? okay let's get what we found in the past to work
                $cipher_method = get_option($this->cipher_method_option_name, '');
                // oops... haven't tested available cipher methods yet
                if ($cipher_method === '' || openssl_cipher_iv_length($cipher_method) === false) {
                    $cipher_method = $this->getAvailableCipherMethod($cipher_method);
                }
            }
            $this->validated_cipher_method = $cipher_method;
        }
        return $this->validated_cipher_method;
    }


    /**
     * @param string $cipher_method
     * @return string
     * @throws RuntimeException
     */
    private function getAvailableCipherMethod($cipher_method)
    {
        // verify that the incoming cipher method can produce an initialization vector
        if (openssl_cipher_iv_length($cipher_method) === false) {
            // what? there's no list?
            if (empty($this->cipher_methods)) {
                // generate that list and cache it
                $this->cipher_methods = $this->getAvailableStrongCipherMethods();
                // then grab the first item from the list
                $cipher_method = reset($this->cipher_methods);
            } else {
                // check the next cipher in the list of available cipher methods
                $cipher_method = next($this->cipher_methods);
            }
            if ($cipher_method === false) {
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
        update_option($this->cipher_method_option_name, $cipher_method);
        return $cipher_method;
    }


    /**
     * @return array
     */
    private function getAvailableStrongCipherMethods()
    {
        $cipher_methods = openssl_get_cipher_methods();
        return array_filter($cipher_methods, [$this, 'weakAlgorithmFilter']);
    }


    /**
     * @see https://www.php.net/manual/en/function.openssl-get-cipher-methods.php#example-890
     * @param string $cipher_method
     */
    private function weakAlgorithmFilter($cipher_method)
    {
        foreach ($this->weak_algorithms as $weak_algorithm) {
            if (stripos($cipher_method, $weak_algorithm) !== false) {
                return false;
            }
        }
        return true;
    }
}
