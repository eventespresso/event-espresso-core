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
        if (empty($encoded_string)) {
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
    private function decode($encoded_string)
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
    public function encodeUrl($text_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($text_string) || ! $this->use_base64_encode) {
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
    public function decodeUrl($encoded_string = '')
    {
        // you give me nothing??? GET OUT !
        if (empty($encoded_string)) {
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
    public function isValidBase64OrFail($encoded_string)
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
     * @param $string
     * @param array $encodings
     * @return bool
     */
    public function isValidBase64($string, $encodings = [])
    {
        // ensure data is a string
        if (! is_string($string) || ! $this->use_base64_encode) {
            return false;
        }
        // first check if we're dealing with an actual valid base64 encoded string
        $decoded = base64_decode($string, true);
        // also re-encode and compare it to original one
        if ($decoded === false || base64_encode($decoded) !== $string) {
            return false;
        }
        // finally, check whether the decoded data is actual text
        $encodings = ! empty($encodings) ?: ['UTF-8', 'ASCII'];
        $encoding = mb_detect_encoding($decoded);
        return in_array($encoding, $encodings);
    }
}
