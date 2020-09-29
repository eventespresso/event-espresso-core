<?php

namespace EventEspresso\core\domain\services\graphql;

use GraphQLRelay\Relay;

class Utilities
{
    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @param array $arg_mapping
     * @param array $id_fields The fields to convert from global IDs to DB IDs.
     * @return array
     */
    public function sanitizeWhereArgs(array $where_args, array $arg_mapping, array $id_fields)
    {
        $where_params = [];
        foreach ($where_args as $arg => $value) {
            if (! array_key_exists($arg, $arg_mapping)) {
                continue;
            }
            if (is_array($value) && ! empty($value)) {
                $value = array_map(
                    static function($value) {
                        if (is_string($value)) {
                            $value = sanitize_text_field($value);
                        }
                        return $value;
                    },
                    $value
                );
            } elseif (is_string($value)) {
                $value = sanitize_text_field($value);
            }
            $where_params[ $arg_mapping[ $arg ] ] = in_array($arg, $id_fields, true)
                ? $this->convertGlobalId($value)
                : $value;
        }
        return $where_params;
    }


    /**
     * Converts global ID to DB ID.
     *
     * @param string|string[] $ID
     * @return mixed
     */
    protected function convertGlobalId($ID)
    {
        if (is_array($ID)) {
            return array_map([$this, 'convertGlobalId'], $ID);
        }
        $parts = Relay::fromGlobalId($ID);
        return ! empty($parts['id']) ? $parts['id'] : null;
    }
}
