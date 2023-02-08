<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\api;

use Exception;

/**
 * Class OneTimeString
 * String identifier used by the PayPal Commerce API.
 *
 * @package     EventEspresso\PaymentMethods\PayPalCommerce\api
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class OneTimeString
{
    /**
     * @var string
     */
    private $value;


    /**
     *
     * @param bool $sandbox_mode
     * @throws Exception
     */
    public function __construct($sandbox_mode)
    {
        $sandbox_mode = (bool) $sandbox_mode;
        $key_prefix   = $sandbox_mode ? 'sandbox' : 'live';
        $random_bytes = $this->randomIdentifier();
        $this->value  = "$key_prefix-$random_bytes";
    }


    /**
     * Create a random string.
     *
     * @param int $length
     * @return string
     * @throws Exception
     */
    private function randomIdentifier($length = 50)
    {
        $length = (int) $length;
        return function_exists('random_bytes')
            ? bin2hex(random_bytes($length))
            : bin2hex(openssl_random_pseudo_bytes($length));
    }


    /**
     * @return string
     */
    public function value()
    {
        return $this->value;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->value;
    }
}
