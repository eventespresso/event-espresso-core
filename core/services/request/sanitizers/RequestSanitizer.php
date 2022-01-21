<?php

namespace EventEspresso\core\services\request\sanitizers;

use EventEspresso\core\services\request\DataType;

class RequestSanitizer
{
    /**
     * Will sanitize the supplied request parameter based on the specified data type
     *
     * @param mixed  $param     the supplied request parameter
     * @param string $type      the specified data type (default: "string")
     *                          valid values: "bool", "float", "int", "key", "url", or "string"
     * @param bool   $is_array  if true, then $param will be treated as an array of $type
     * @param string $delimiter if $param is a CSV like value (ex: 1,2,3,4,5...) then this is the value separator
     * @return array|bool|float|int|string
     * @since 4.10.14.p
     */
    public function clean($param, $type = DataType::STRING, $is_array = false, $delimiter = '')
    {
        if ($delimiter !== '' && is_string($param)) {
            $param = explode($delimiter, $param);
            $is_array = is_array($param);
            // unset the delimiter else this function will recurse forever when we loop over the array of results
            $delimiter = '';
        }
        // check if we are getting an improperly typed array and correct
        $is_array = $is_array && is_array($param);
        if ($is_array) {
            $values = [];
            foreach ((array) $param as $key => $value) {
                $values[ $key ] = $this->clean($value, $type, is_array($value), $delimiter);
            }
            return $values;
        }
        return $this->sanitizeParam($param, $type);
    }


    /**
     * @param mixed  $param
     * @param string $type
     * @return array|float|int|mixed|string|string[]|null
     * @since   4.10.20.p
     */
    public function sanitizeParam($param, $type = DataType::STRING)
    {
        switch ($type) {
            case DataType::BOOL:
                return filter_var($param, FILTER_VALIDATE_BOOLEAN);
            case DataType::FLOAT:
                return (float) $param;
            case DataType::FQCN:
                return preg_replace('[^\\\w\d]', '', $param);
            case DataType::HTML:
                $allowed_tags = AllowedTags::getAllowedTags();
                return wp_kses($param, $allowed_tags);
            case DataType::INT:
                return (int) $param;
            case DataType::KEY:
                return sanitize_key($param);
            case DataType::TITLE:
                return sanitize_title($param);
            case DataType::URL:
                return esc_url_raw($param);
            case DataType::STRING:
            default:
                return sanitize_text_field($param);
        }
    }
}
