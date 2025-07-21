<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\services\orm\model_field\SchemaType;
use InvalidArgumentException;

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


    private static array $valid_types = [
        DataType::ARRAY,
        DataType::BOOL,
        DataType::BOOLEAN,
        DataType::DOUBLE,
        DataType::FLOAT,
        DataType::EDITOR,
        DataType::EMAIL,
        DataType::FQCN,
        DataType::HTML,
        DataType::INT,
        DataType::INTEGER,
        DataType::KEY,
        DataType::OBJECT,
        DataType::NULL,
        DataType::TITLE,
        DataType::URL,
        DataType::STRING,
    ];


    /**
     * @param string $data_type
     * @param bool   $throw_exception
     * @return bool
     * @throws InvalidArgumentException
     * @since 5.0.42
     */
    public static function isValidDataType(string $data_type, bool $throw_exception = false): bool
    {
        if (in_array($data_type, DataType::$valid_types, true)) {
            return true;
        }
        if (! $throw_exception) {
            return false;
        }
        throw new InvalidArgumentException(
            sprintf(
                esc_html__(
                    'The incoming argument (%1$s) must be one of the allowable types: %2$s',
                    'event_espresso'
                ),
                $data_type,
                implode(',', DataType::$valid_types)
            )
        );
    }


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
                $data_type = DataType::convertModelFieldSchemaType($type);
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
