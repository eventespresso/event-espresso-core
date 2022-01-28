<?php

namespace EventEspresso\tests\mocks\core\services\encryption;

use EventEspresso\core\services\encryption\openssl\CipherMethod;
use RuntimeException;

class CipherMethodMock extends CipherMethod
{


    /**
     * @param string $default_cipher_method
     * @param string $cipher_method_option_name
     */
    public function __construct($default_cipher_method, $cipher_method_option_name)
    {
        parent::__construct($default_cipher_method, $cipher_method_option_name);
    }


    /**
     * @return array
     */
    public function cipherMethods()
    {
        return $this->cipher_methods;
    }


    /**
     * @return string
     */
    public function cipherMethodOptionName()
    {
        return $this->cipher_method_option_name;
    }


    /**
     * @return string
     */
    public function defaultCipherMethod()
    {
        return $this->default_cipher_method;
    }


    /**
     * @return array
     */
    public function installedCipherMethods()
    {
        return $this->installed_cipher_methods;
    }


    /**
     * @return string|string[]
     */
    public function getAnInstalledCipherMethod($number = 1)
    {
        return array_rand(array_flip($this->installed_cipher_methods), $number);
    }


    /**
     * @return bool
     */
    public function isInstalledCipherMethod($cipher_method)
    {
        return in_array($cipher_method, $this->installed_cipher_methods);
    }


    /**
     * @param array $cipher_methods
     */
    public function setInstalledCipherMethods(array $cipher_methods)
    {
        $this->installed_cipher_methods = $cipher_methods;
    }


    /**
     * @param array $cipher_methods
     */
    public function setCipherMethods(array $cipher_methods)
    {
        $this->cipher_methods = $cipher_methods;
    }


    /**
     * @return string
     */
    public function validatedCipherMethod()
    {
        return $this->validated_cipher_method;
    }


    /**
     * @param string $validated_cipher_method
     */
    public function setValidatedCipherMethod($validated_cipher_method = null)
    {
        $this->validated_cipher_method = $validated_cipher_method;
    }


    /**
     * @param string $cipher_method
     * @return string
     * @throws RuntimeException
     */
    public function getAvailableCipherMethod($cipher_method = null)
    {
        return parent::getAvailableCipherMethod($cipher_method);
    }


    /**
     * @return array
     */
    public function getAvailableStrongCipherMethods()
    {
        return parent::getAvailableStrongCipherMethods();
    }


    /**
     * @param string $cipher_method
     */
    public function weakAlgorithmFilter($cipher_method)
    {
        return parent::weakAlgorithmFilter($cipher_method);
    }
}
