<?php

namespace EventEspresso\core\services\orm\model_field;

use InvalidArgumentException;

/**
 *
 */
class SchemaFormat
{
    const DATETIME = 'date-time';

    const EMAIL    = 'email';

    const HOSTNAME = 'hostname';

    const IPV4     = 'ipv4';

    const IPV6     = 'ipv6';

    const URI      = 'uri';

    const URIREF   = 'uriref';


    /**
     * @var array|string[]
     * @link http://json-schema.org/latest/json-schema-validation.html#rfc.section.7
     */
    private static array $allowable_formats = [
        SchemaFormat::DATETIME,
        SchemaFormat::EMAIL,
        SchemaFormat::HOSTNAME,
        SchemaFormat::IPV4,
        SchemaFormat::IPV6,
        SchemaFormat::URI,
        SchemaFormat::URIREF,
    ];


    /**
     * Validates that the incoming format is an allowable string to use for the _schema_format property
     *
     * @param string $schema_format
     * @throws InvalidArgumentException
     */
    public static function validateSchemaFormat(string $schema_format)
    {
        if (in_array($schema_format, SchemaFormat::$allowable_formats, true)) {
            return;
        }
        throw new InvalidArgumentException(
            sprintf(
                esc_html__(
                    'The incoming argument (%1$s) must be one of the allowable formats: %2$s',
                    'event_espresso'
                ),
                $schema_format,
                implode(',', SchemaFormat::$allowable_formats)
            )
        );
    }
}
