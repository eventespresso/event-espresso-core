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
    protected $cipher_method_option_name;

    /**
     * list of cipher methods that we consider usable,
     * essentially all of the installed_cipher_methods minus weak_algorithms
     *
     * @var array
     */
    protected $cipher_methods = [];

    /**
     * @var string
     */
    protected $default_cipher_method;

    /**
     * list of ALL cipher methods available on the server
     *
     * @var array
     */
    protected $installed_cipher_methods;

    /**
     * the OpenSSL cipher method to use. default: AES-128-CBC
     *
     * @var string
     */
    protected $validated_cipher_method;

    /**
     * as early as Aug 2016, Openssl declared the following weak: RC2, RC4, DES, 3DES, MD5 based
     * and ECB mode should be avoided
     *
     * @var array
     */
    protected $weak_algorithms = ['des', 'ecb', 'md5', 'rc2', 'rc4'];


    /**
     * @param string $default_cipher_method
     * @param string $cipher_method_option_name
     */
    public function __construct($default_cipher_method, $cipher_method_option_name)
    {
        $this->default_cipher_method     = $default_cipher_method;
        $this->cipher_method_option_name = $cipher_method_option_name;
        $this->installed_cipher_methods  = openssl_get_cipher_methods();
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
     * @param bool   $load_alternate [optional] if TRUE, will load the default cipher method (or any strong algorithm)
     *                               if the requested cipher method is not installed or invalid.
     *                               if FALSE, will throw an exception if the requested cipher method is not valid.
     * @return string
     * @throws RuntimeException
     */
    public function getCipherMethod($cipher_method = null, $load_alternate = true)
    {
        if (empty($cipher_method) && $this->validated_cipher_method !== null) {
            return $this->validated_cipher_method;
        }
        // if nothing specific was requested and it's ok to load an alternate, then grab the system default
        if (empty($cipher_method) && $load_alternate) {
            $cipher_method = $this->default_cipher_method;
        }
        // verify that the cipher method can produce an initialization vector.
        // but if the requested is invalid and we don't want to load an alternate, then throw an exception
        $throw_exception = ! $load_alternate;
        if ($this->validateCipherMethod($cipher_method, $throw_exception) === false) {
            // nope? ... ok let's see what we can find
            $cipher_method = $this->getAvailableCipherMethod();
        }
        // if nothing has been previously validated, then save the currently requested cipher which appears to be good
        if ($this->validated_cipher_method === null) {
            $this->validated_cipher_method = $cipher_method;
        }
        return $cipher_method;
    }


    /**
     * returns true if the selected cipher method either uses Galois/Counter Mode (GCM)
     * or Counter with CBC-MAC (CCM) authenticated encryption modes
     * (also need to be using PHP 7.1 or greater to actually use authenticated encryption modes)
     *
     * @return bool
     */
    public function usesAuthenticatedEncryptionMode()
    {
        return PHP_VERSION_ID >= 70100
               && (
                   stripos($this->validated_cipher_method, 'gcm') !== false
                   || stripos($this->validated_cipher_method, 'ccm') !== false
               );
    }


    /**
     * @param string $cipher_method
     * @return string
     * @throws RuntimeException
     */
    protected function getAvailableCipherMethod($cipher_method = null)
    {
        // if nothing was supplied, the get what we found in the past to work
        $cipher_method_to_test = $cipher_method ?: get_option($this->cipher_method_option_name, '');
        // verify that the incoming cipher method exists and can produce an initialization vector
        if ($this->validateCipherMethod($cipher_method_to_test) === false) {
            // what? there's no list?
            if (empty($this->cipher_methods)) {
                // generate that list and cache it
                $this->cipher_methods = $this->getAvailableStrongCipherMethods();
            }
            // then grab the first item from the list (we'll add it back later if it is good)
            $cipher_method_to_test = array_shift($this->cipher_methods);
            if ($cipher_method_to_test === null) {
                throw new RuntimeException(
                    esc_html__(
                        'OpenSSL support appears to be enabled on the server, but no cipher methods are available. Please contact the server administrator.',
                        'event_espresso'
                    )
                );
            }
            // verify that the next cipher method works
            return $this->getAvailableCipherMethod($cipher_method_to_test);
        }
        // if we've gotten this far, then we found an available cipher method that works
        // so save that for next time, if it's not the same as what's there already
        if ($cipher_method_to_test !== $cipher_method) {
            update_option($this->cipher_method_option_name, $cipher_method_to_test);
        }
        // if we previously removed this cipher method from the list of valid ones, then let's put it back
        if (! in_array($cipher_method_to_test, $this->cipher_methods, true)) {
            array_unshift($this->cipher_methods, $cipher_method_to_test);
        }
        return $cipher_method_to_test;
    }


    /**
     * @return array
     */
    protected function getAvailableStrongCipherMethods()
    {
        return array_filter($this->installed_cipher_methods, [$this, 'weakAlgorithmFilter']);
    }


    /**
     * @param string $cipher_method
     * @param false  $throw_exception
     * @return bool
     */
    protected function validateCipherMethod($cipher_method, $throw_exception = false)
    {
        // verify that the requested cipher method is actually installed and can produce an initialization vector
        if (in_array($cipher_method, $this->installed_cipher_methods, true)
            && openssl_cipher_iv_length($cipher_method) !== false
        ) {
            return true;
        }
        if (! $throw_exception) {
            return false;
        }
        throw new RuntimeException(
            sprintf(
                esc_html__(
                    'The requested OpenSSL cipher method "%1$s" is invalid or not installed on the server. Please contact the server administrator.',
                    'event_espresso'
                ),
                $cipher_method
            )
        );
    }


    /**
     * @see https://www.php.net/manual/en/function.openssl-get-cipher-methods.php#example-890
     * @param string $cipher_method
     */
    protected function weakAlgorithmFilter($cipher_method)
    {
        foreach ($this->weak_algorithms as $weak_algorithm) {
            if (stripos($cipher_method, $weak_algorithm) !== false) {
                return false;
            }
        }
        return true;
    }
}
