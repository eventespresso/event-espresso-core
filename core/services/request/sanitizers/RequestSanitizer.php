<?php

namespace EventEspresso\core\services\request\sanitizers;

class RequestSanitizer
{
    /**
     * Will sanitize the supplied request parameter based on the specified data type
     *
     * @param mixed  $param     the supplied request parameter
     * @param string $type      the specified data type (default: "string")
     *                          valid values: "bool", "float", "int", "key", "url", "string", or "arrayOf|*"
     *                          where * is any of the other valid values ex: "arrayOf|int", "arrayOf|string"
     * @param string $delimiter if $param is a CSV like value (ex: 1,2,3,4,5...) then this is the value separator
     *                          (default: ",")
     * @return array|bool|float|int|string
     * @since 4.10.14.p
     */
    public function clean($param, $type = 'string', $delimiter = ',')
    {
        switch ($type) {
            case 'bool':
                return filter_var($param, FILTER_VALIDATE_BOOLEAN);
            case 'float':
                return (float) $param;
            case 'fqcn':
                return preg_replace('[^\\\w\d]', '', $param);
            case 'int':
                return (int) $param;
            case 'key':
                return sanitize_key($param);
            case 'url':
                return esc_url_raw($param);
            case 'string':
                return sanitize_text_field($param);
            default:
                if (strpos($type, 'arrayOf|') === 0) {
                    $values        = [];
                    $array_of_type = substr($type, 8);
                    $list          = is_string($param) ? explode($delimiter, $param) : (array) $param;
                    foreach ($list as $key => $item) {
                        $values[ $key ] = is_array($item)
                            ? $this->clean($item, $type, $delimiter)
                            : $this->clean($item, $array_of_type, $delimiter);
                    }
                    return $values;
                }
                return sanitize_text_field($param);
        }
    }
}
