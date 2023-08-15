<?php

namespace EventEspresso\core\services\encryption;

use RuntimeException;

/**
 * Class Base64Encoder
 * for encoding and decoding strings and URLs using PHP's base64 functions
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\encryption
 * @since   4.10.14.p
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
    public function encodeString(string $text_string = ''): string
    {
        // you give me nothing??? GET OUT !
        if (! $this->use_base64_encode || empty($text_string)) {
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
     * @param bool $no_throw         whether to throw an exception if the string is not valid base64
     * @return string
     * @throws RuntimeException
     */
    public function decodeString(string $encoded_string = '', bool $no_throw = false): string
    {
        // you give me nothing??? GET OUT !
        if (
            ! $this->use_base64_encode
            || empty($encoded_string)
            || ($no_throw && ! $this->isValidBase64($encoded_string))
        ) {
            return $encoded_string;
        }
        $this->isValidBase64OrFail($encoded_string);
        return $this->decode($encoded_string);
    }


    /**
     * @param string $encoded_string the text to be decoded
     * @return string
     * @throws RuntimeException
     */
    private function decode(string $encoded_string): string
    {
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
    public function encodeUrl(string $text_string = ''): string
    {
        // you give me nothing??? GET OUT !
        if (! $this->use_base64_encode || empty($text_string)) {
            return $text_string;
        }
        // encode
        $encoded_string = base64_encode($text_string);
        // remove some chars to make encoding more URL friendly
        return rtrim(strtr($encoded_string, '+/', '-_'), '=');
    }


    /**
     * decodes  url string that has been encoded with PHP's base64 encoding
     *
     * @see http://php.net/manual/en/function.base64-encode.php
     * @param string $encoded_string the text to be decoded
     * @return string
     * @throws RuntimeException
     */
    public function decodeUrl(string $encoded_string = ''): string
    {
        // you give me nothing??? GET OUT !
        if (! $this->use_base64_encode || empty($encoded_string)) {
            return $encoded_string;
        }
        // replace previously removed characters
        $encoded_string = strtr($encoded_string, '-_', '+/');
        $encoded_string .= str_repeat('=', 3 - (3 + strlen($encoded_string)) % 4);
        $this->isValidBase64OrFail($encoded_string);
        return $this->decode($encoded_string);
    }


    /**
     * @param string $encoded_string the text to be decoded
     * @throws RuntimeException
     */
    public function isValidBase64OrFail(string $encoded_string)
    {
        if (! $this->isValidBase64($encoded_string)) {
            throw new RuntimeException(
                esc_html__(
                    'Base 64 decoding failed because the supplied string is not valid or was not base64 encoded.',
                    'event_espresso'
                )
            );
        }
    }


    /**
     * @see https://stackoverflow.com/a/51877882
     * @param string $string
     * @return bool
     */
    public function isValidBase64(string $string): bool
    {
        if (! $this->use_base64_encode) {
            return false;
        }
        // first check if we're dealing with an actual valid base64 encoded string
        $decoded = base64_decode($string, true);
        if ($decoded === false) {
            return false;
        }
        // finally, re-encode and compare it to original one
        return base64_encode($decoded) === $string;
    }
}
