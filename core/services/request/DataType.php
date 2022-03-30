<?php

namespace EventEspresso\core\services\request;

/**
 * Class DataType
 * Constants for defining data types used within EE's Request related classes
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\request
 * @since   4.10.29.p
 */
class DataType
{
    const ARRAY   = 'array';

    const BOOL    = 'bool';
    const BOOLEAN = 'bool';

    const DOUBLE  = 'float';
    const FLOAT   = 'float';

    const FQCN    = 'fqcn';

    const HTML    = 'html';

    const INT     = 'int';
    const INTEGER = 'int';

    const KEY     = 'key';

    const OBJECT  = 'object';

    const NULL    = 'null';

    const TITLE   = 'title';

    const URL     = 'url';

    const STRING  = 'string';


    /**
     * @param mixed  $param
     * @param string $type
     * @return mixed
     */
    public static function setDataType($param, string $type)
    {
        switch ($type) {
            case DataType::NULL:
                return null;
            case DataType::OBJECT:
                return $param;
            case DataType::FQCN:
            case DataType::HTML:
            case DataType::KEY:
            case DataType::STRING:
            case DataType::TITLE:
            case DataType::URL:
                settype($param, DataType::STRING);
                break;
            default:
                settype($param, $type);
        }
        return $param;
    }
}
