<?php

namespace EventEspresso\core\services\database;

global $wpdb;

use EventEspresso\core\services\orm\model_field\SchemaType;

class WpdbDataFormat
{
    /**
     * used for table/field names
     */
    const IDENTIFIER = '%i';

    const INTEGER    = '%d';

    const FLOAT      = '%f';

    const STRING     = '%s';


    /**
     * Return `%d`, `%s` or `%f` to indicate the data type for the field that should be indicated in wpdb queries.
     *
     * @param string $type Included if a specific type is requested.
     * @return string
     * @uses get_schema_type()
     */
    public static function getWpdbDataType(string $type = ''): string
    {
        switch ($type) {
            case SchemaType::BOOLEAN:
            case SchemaType::INTEGER:
                return WpdbDataFormat::INTEGER; // '%d'
            case SchemaType::DB_FIELD:
                return WpdbDataFormat::IDENTIFIER; // '%i'
            case SchemaType::NUMBER:
                return WpdbDataFormat::FLOAT; // '%f'
            case SchemaType::STRING:
            default:
                return WpdbDataFormat::STRING; // '%s'
        }
    }


    public static function getWpdbDataTypeForTypeArray(array $type): string
    {
        // first let's flip because then we can do a faster key check
        $type = array_flip($type);

        // check for things that mean '%s'
        if (isset($type[ SchemaType::STRING ], $type[ SchemaType::OBJECT ], $type[ SchemaType::ARRAY ])) {
            return WpdbDataFormat::STRING;
        }

        // if makes it past the above condition and there's float in the array
        // then the type is %f
        if (isset($type[ SchemaType::NUMBER ])) {
            return WpdbDataFormat::FLOAT;
        }

        // if it makes it past the above conditions and there is an integer in the array
        // then the type is %d
        if (isset($type[ SchemaType::INTEGER ])) {
            return WpdbDataFormat::INTEGER;
        }

        // anything else is a string
        return WpdbDataFormat::STRING;
    }
}
