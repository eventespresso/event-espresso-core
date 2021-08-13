<?php

namespace EventEspresso\core\services\encryption;

use RuntimeException;

/**
 * Class Base64Encoder
 * for encoding and decoding strings and URLs using PHP's base64 functions
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\encryption
 * @since   $VID:$
 */
class Base64Encoder
{

    /**
     * @var boolean
     */
    protected $use_base64_encode;


    public function __construct()
    {
        $this->use_base64_encode = function_exists('base64_encode');
    }


    /**
     * encodes string with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $text_string the text to be encoded
     * @return string
     */
    public function encodeString($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! $this->use_base64_encode) {
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
     * @throws RuntimeException
     */
    public function decodeString($encoded_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encoded_string) || ! $this->isValidBase64($encoded_string)) {
            return $encoded_string;
        }
        // decode
        $decoded_string = base64_decode($encoded_string);
        if ($decoded_string === false) {
            throw new RuntimeException(
                esc_html__('Base 64 decoding failed.', 'event_espresso')
            );
        }
        return $decoded_string;
    }


    /**
     * encodes  url string with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $text_string the text to be encoded
     * @return string
     */
    public function encodeUrl($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! $this->use_base64_encode) {
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
     * @throws RuntimeException
     */
    public function decodeUrl($encoded_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encoded_string) || ! $this->isValidBase64($encoded_string)) {
            return $encoded_string;
        }
        // replace previously removed characters
        $encoded_string = strtr($encoded_string, '-_,', '+/=');
        // decode
        $decoded_string = base64_decode($encoded_string);
        if ($decoded_string === false) {
            throw new RuntimeException(
                esc_html__('Base 64 decoding failed.', 'event_espresso')
            );
        }
        return $decoded_string;
    }


    /**
     * @see http://stackoverflow.com/questions/2556345/detect-base64-encoding-in-php#30231906
     * @param $string
     * @return bool
     */
    protected function isValidBase64($string)
    {
        // ensure data is a string
        if (! is_string($string) || ! $this->use_base64_encode) {
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
}
