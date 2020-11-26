<?php

namespace EventEspresso\core\services\json;

use stdClass;

/**
 * Class JsonDataHandler
 * A class for handling serialization to and from JSON and tracking any errors that occur during that process
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\json
 * @since   $VID:$
 */
class JsonDataHandler
{
    const DATA_TYPE_ARRAY     = 'array';

    const DATA_TYPE_OBJECT    = 'object';

    const DATA_TYPE_USE_FLAGS = 'flags';

    /**
     * @var string
     */
    private $data_type;

    /**
     * @var array|stdClass
     */
    private $decoded_data;

    /**
     * JSON_BIGINT_AS_STRING,
     * JSON_INVALID_UTF8_IGNORE,
     * JSON_INVALID_UTF8_SUBSTITUTE,
     * JSON_OBJECT_AS_ARRAY,
     * JSON_THROW_ON_ERROR
     *
     * @var int
     */
    private $decode_flags;

    /**
     * @var int
     */
    private $depth;

    /**
     * @var string
     */
    private $encoded_data;

    /**
     * JSON_FORCE_OBJECT,
     * JSON_HEX_QUOT,
     * JSON_HEX_TAG,
     * JSON_HEX_AMP,
     * JSON_HEX_APOS,
     * JSON_INVALID_UTF8_IGNORE,
     * JSON_INVALID_UTF8_SUBSTITUTE,
     * JSON_NUMERIC_CHECK,
     * JSON_PARTIAL_OUTPUT_ON_ERROR,
     * JSON_PRESERVE_ZERO_FRACTION,
     * JSON_PRETTY_PRINT,
     * JSON_UNESCAPED_LINE_TERMINATORS,
     * JSON_UNESCAPED_SLASHES,
     * JSON_UNESCAPED_UNICODE,
     * JSON_THROW_ON_ERROR.
     *
     * @var int
     */
    private $encode_flags;

    /**
     * @var int
     */
    private $last_error_code;

    /**
     * @var string
     */
    private $last_error_msg;


    /**
     * JsonDataHandler constructor.
     */
    public function __construct()
    {
        if (!defined('JSON_INVALID_UTF8_IGNORE')) {
            define('JSON_INVALID_UTF8_IGNORE', 1048576);
        }
        if (!defined('JSON_INVALID_UTF8_SUBSTITUTE')) {
            define('JSON_INVALID_UTF8_SUBSTITUTE', 2097152);
        }
        if (!defined('JSON_THROW_ON_ERROR')) {
            define('JSON_THROW_ON_ERROR', 4194304);
        }
    }


    /**
     * set $data_type, $decode_flags, $encode_flags, and depth all in one shot
     *
     * @param string $data_type
     * @param int    $decode_flags
     * @param int    $encode_flags
     * @param int    $depth
     */
    public function configure(
        string $data_type = JsonDataHandler::DATA_TYPE_USE_FLAGS,
        int $decode_flags = 0,
        int $encode_flags = 0,
        int $depth = 512
    ) {
        $this->setDataType($data_type);
        $this->setDecodeFlags($decode_flags);
        $this->setDepth($depth);
        $this->setEncodeFlags($encode_flags);
    }


    /**
     * @param string $data_type
     */
    public function setDataType(string $data_type): void
    {
        $this->data_type = $data_type === JsonDataHandler::DATA_TYPE_ARRAY
                           || $data_type === JsonDataHandler::DATA_TYPE_OBJECT
                           || $data_type === JsonDataHandler::DATA_TYPE_USE_FLAGS
            ? $data_type
            : JsonDataHandler::DATA_TYPE_USE_FLAGS;
    }


    /**
     * One or more Bitmask values:
     * JSON_BIGINT_AS_STRING,
     * JSON_INVALID_UTF8_IGNORE,        PHP >= 7.2
     * JSON_INVALID_UTF8_SUBSTITUTE,    PHP >= 7.2
     * JSON_OBJECT_AS_ARRAY,
     * JSON_THROW_ON_ERROR              PHP >= 7.3
     *
     * pass multiple values separated with |
     * ex: JSON_BIGINT_AS_STRING | JSON_INVALID_UTF8_IGNORE | JSON_OBJECT_AS_ARRAY
     *
     * @param int $decode_flags
     */
    public function setDecodeFlags(int $decode_flags): void
    {
        $this->decode_flags = $decode_flags === JSON_BIGINT_AS_STRING
                              || $decode_flags === JSON_OBJECT_AS_ARRAY
                              || $decode_flags === JSON_INVALID_UTF8_IGNORE
                              || $decode_flags === JSON_INVALID_UTF8_SUBSTITUTE
                              || $decode_flags === JSON_THROW_ON_ERROR
            ? $decode_flags
            : 0;
    }


    /**
     * @param int $depth
     */
    public function setDepth(int $depth): void
    {
        $depth = absint($depth);
        $this->depth = $depth ? $depth : 512;
    }


    /**
     * One or more Bitmask values:
     * JSON_FORCE_OBJECT,
     * JSON_HEX_QUOT,
     * JSON_HEX_TAG,
     * JSON_HEX_AMP,
     * JSON_HEX_APOS,
     * JSON_INVALID_UTF8_IGNORE,        PHP >= 7.2
     * JSON_INVALID_UTF8_SUBSTITUTE,    PHP >= 7.2
     * JSON_NUMERIC_CHECK,
     * JSON_PARTIAL_OUTPUT_ON_ERROR,
     * JSON_PRESERVE_ZERO_FRACTION,
     * JSON_PRETTY_PRINT,
     * JSON_UNESCAPED_LINE_TERMINATORS,
     * JSON_UNESCAPED_SLASHES,
     * JSON_UNESCAPED_UNICODE,
     * JSON_THROW_ON_ERROR.             PHP >= 7.3
     *
     * pass multiple values separated with |
     * ex: JSON_FORCE_OBJECT | JSON_INVALID_UTF8_IGNORE | JSON_THROW_ON_ERROR
     *
     * @param int $encode_flags
     */
    public function setEncodeFlags(int $encode_flags): void
    {
        $this->encode_flags = $encode_flags === JSON_FORCE_OBJECT
                              || $encode_flags === JSON_HEX_QUOT
                              || $encode_flags === JSON_HEX_TAG
                              || $encode_flags === JSON_HEX_AMP
                              || $encode_flags === JSON_HEX_APOS
                              || $encode_flags === JSON_NUMERIC_CHECK
                              || $encode_flags === JSON_PARTIAL_OUTPUT_ON_ERROR
                              || $encode_flags === JSON_PRESERVE_ZERO_FRACTION
                              || $encode_flags === JSON_PRETTY_PRINT
                              || $encode_flags === JSON_UNESCAPED_LINE_TERMINATORS
                              || $encode_flags === JSON_UNESCAPED_SLASHES
                              || $encode_flags === JSON_UNESCAPED_UNICODE
                              || $encode_flags === JSON_INVALID_UTF8_IGNORE
                              || $encode_flags === JSON_INVALID_UTF8_SUBSTITUTE
                              || $encode_flags === JSON_THROW_ON_ERROR
            ? $encode_flags
            : 0;
    }


    /**
     * @return bool|null
     */
    private function asAssociative()
    {
        switch ($this->data_type) {
            case JsonDataHandler::DATA_TYPE_ARRAY:
                return true;
            case JsonDataHandler::DATA_TYPE_OBJECT:
                return false;
            case JsonDataHandler::DATA_TYPE_USE_FLAGS:
                return null;
        }
        return null;
    }


    /**
     * @param string $json
     * @return array|mixed|stdClass
     */
    public function decodeJson(string $json)
    {
        $this->decoded_data    = json_decode($json, $this->asAssociative(), $this->depth, $this->decode_flags);
        $this->last_error_code = json_last_error();
        $this->last_error_msg  = json_last_error_msg();
        return $this->decoded_data;
    }


    /**
     * @param $data
     * @return false|string
     */
    public function encodeData($data)
    {
        $this->encoded_data    = json_encode($data, $this->encode_flags, $this->depth);
        $this->last_error_code = json_last_error();
        $this->last_error_msg  = json_last_error_msg();
        return $this->encoded_data;
    }


    /**
     * @return array|stdClass
     */
    public function getDecodedData()
    {
        return $this->decoded_data;
    }


    /**
     * @return string
     */
    public function getEncodedData(): string
    {
        return $this->encoded_data;
    }


    /**
     * @param false $reset
     * @return int
     */
    public function getLastErrorCode($reset = false)
    {
        $last_error = $this->last_error_code;
        if ($reset) {
            $this->last_error_code = JSON_ERROR_NONE;
        }
        return $last_error;
    }


    /**
     * @param false $reset
     * @return string
     */
    public function getLastErrorMessage($reset = false)
    {
        $last_error = $this->last_error_msg;
        if ($reset) {
            $this->last_error_msg = '';
        }
        return $last_error;
    }
}
