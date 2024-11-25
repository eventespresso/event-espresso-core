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

    const EDITOR  = 'editor';

    const EMAIL   = 'email';

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
            case DataType::EDITOR:
            case DataType::EMAIL:
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


    public static function convertModelFieldSchemaType($schema_type): ?string
    {
        if (is_array($schema_type)) {
            foreach ($schema_type as $type) {
                $data_type = self::convertModelFieldSchemaType($type);
                if ($data_type) {
                    return $data_type;
                }
            }
            $schema_type = reset($schema_type);
        }
        switch ($schema_type) {
            case 'array':
                return DataType::ARRAY;
            case 'boolean':
                return DataType::BOOL;
            case 'integer':
                return DataType::INT;
            case 'null':
                return DataType::NULL;
            case 'number':
                return DataType::FLOAT;
            case 'object':
                return DataType::OBJECT;
            case 'string':
                return DataType::STRING;
            default:
                return null;
        }
    }
}
