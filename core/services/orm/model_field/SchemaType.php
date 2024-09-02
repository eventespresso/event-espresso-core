<?php

namespace EventEspresso\core\services\orm\model_field;

use InvalidArgumentException;

/**
 *  Constants for defining data types used within EE's Model Field Classes
 *
 * @since 5.0.25.p
 */
class SchemaType
{
    const ARRAY   = 'array';

    const BOOLEAN = 'boolean';

    const DB_FIELD = 'db_field';

    const FLOAT = 'number';

    const INTEGER = 'integer';

    const NULL    = 'null';

    const NUMBER  = 'number';

    const OBJECT  = 'object';

    const STRING  = 'string';


    /**
     * @link http://json-schema.org/latest/json-schema-core.html#rfc.section.4.2
     * @var array|string[]
     */
    private static array $allowable_types = [
        SchemaType::ARRAY,
        SchemaType::BOOLEAN,
        SchemaType::FLOAT,
        SchemaType::INTEGER,
        SchemaType::NULL,
        SchemaType::NUMBER,
        SchemaType::OBJECT,
        SchemaType::STRING,
    ];


    /**
     * Validates the incoming string|array to ensure its an allowable type.
     *
     * @param string $schema_type
     * @throws InvalidArgumentException
     */
    public static function validateSchemaType(string $schema_type)
    {
        if (in_array($schema_type, SchemaType::$allowable_types, true)) {
            return;
        }
        throw new InvalidArgumentException(
            sprintf(
                esc_html__(
                    'The incoming argument (%1$s) must be one of the allowable types: %2$s',
                    'event_espresso'
                ),
                $schema_type,
                implode(',', SchemaType::$allowable_types)
            )
        );
    }
}
