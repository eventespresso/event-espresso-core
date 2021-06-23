<?php

namespace EventEspresso\core\domain\services\graphql;

use GraphQLRelay\Relay;

/**
 * Class Utilities
 *
 * @package EventEspresso\core\domain\services\graphql
 * @since   $VID:$
 */
class Utilities
{
    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @param array $arg_mapping        array where keys are GQL field names and values are EE modal field names
     * @param array $id_fields          The fields to convert from global IDs to DB IDs.
     * @param array $options            Additional parameters for modifying args: [
     *                                  'include_all_args' => bool, // will return ALL args in $where_args if true
     *                                  'use_IN_operator' => bool, // arrays of IDs will use SQL IN clause if true
     *                                  ]
     * @return array
     */
    public function sanitizeWhereArgs(
        array $where_args,
        array $arg_mapping,
        array $id_fields,
        array $options = []
    ): array {
        // if "include_all_args" is true, then the incoming $where_args array
        // will be copied to the outgoing $where_params prior to sanitizing the fields.
        // so ALL elements in the $where_args array will be present in the $where_params array
        $include_all_args = isset($options['include_all_args'])
            ? filter_var($options['include_all_args'], FILTER_VALIDATE_BOOLEAN)
            : false;
        // if "use_IN_operator" is true, then any ID args found in the $id_fields array
        // will have their values converted to use an SQL "IN" clause format
        // if the value returned from Relay::fromGlobalId() is an array of IDs
        $use_IN_operator = isset($options['use_IN_operator'])
                           && filter_var($options['use_IN_operator'], FILTER_VALIDATE_BOOLEAN);
        $where_params    = $include_all_args ? $where_args : [];
        foreach ($where_args as $arg => $value) {
            if (! array_key_exists($arg, $arg_mapping)) {
                continue;
            }
            if (is_array($value) && ! empty($value)) {
                $value = array_map(
                    static function ($value) {
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
            if (in_array($arg, $id_fields, true)) {
                $ID = $this->convertFromGlobalId($value);
                // Use the proper operator.
                $value = $use_IN_operator && is_array($ID) ? ['IN', $ID] : $ID;
            }
            $where_params[ $arg_mapping[ $arg ] ] = $value;
        }
        return $where_params;
    }


    /**
     * Converts global ID to DB ID.
     *
     * @param string|string[] $ID
     * @return mixed
     */
    public function convertFromGlobalId($ID)
    {
        if (is_array($ID)) {
            return array_map([$this, 'convertFromGlobalId'], $ID);
        }
        $parts = Relay::fromGlobalId($ID);
        return ! empty($parts['id']) ? $parts['id'] : null;
    }


    /**
     * Convert the DB ID into GID
     *
     * @param string    $type
     * @param int|int[] $ID
     * @return mixed
     */
    public function convertToGlobalId(string $type, $ID)
    {
        $convertToGlobalId = [$this, 'convertToGlobalId'];
        if (is_array($ID)) {
            return array_map(
                static function ($id) use ($convertToGlobalId, $type) {
                    return $convertToGlobalId($type, $id);
                },
                $ID
            );
        }
        return Relay::toGlobalId($type, $ID);
    }
}
