<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Base_Class;
use WPGraphQL\Data\Connection\AbstractConnectionResolver as WPGraphQLConnectionResolver;
use GraphQLRelay\Relay;

/**
 * Class AbstractConnectionResolver
 * Shared logic for ConnectionResolvers
 *
 * @package EventEspresso\core\services\graphql\connection_resolvers
 * @author  Manzoor Ahmad Wani
 * @since   $VID:$
 */
abstract class AbstractConnectionResolver extends WPGraphQLConnectionResolver
{

    /**
     * Set limit the highest value of first and last, with a (filterable) max of 100
     *
     * @return array
     */
    protected function getLimit()
    {
        $first = ! empty($this->args['first']) ? absint($this->args['first']) : null;
        $last  = ! empty($this->args['last']) ? absint($this->args['last']) : null;

        $limit = min(
            max($first, $last, 100),
            $this->query_amount
        );
        $limit++;
        return $limit;
    }

    /**
     * Determine whether or not the the offset is valid, i.e the entity corresponding to the
     * offset exists. Offset is equivalent to entity ID. So this function is equivalent to
     * checking if the entity with the given ID exists.
     *
     * @access public
     *
     * @param int $offset The ID of the node used for the cursor offset
     *
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function is_valid_offset($offset)
    {
        $entity = $this->get_query()->get_one_by_ID($offset);
        
        return $entity instanceof EE_Base_Class;
    }

    /**
     * Validates Model.
     *
     * @param array $entity Entity node.
     *
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    protected function is_valid_model($entity)
    {
        return $entity instanceof EE_Base_Class;
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array  $query_args
     * @param array  $where_params
     * @param string $primary_key
     * @return array
     */
    protected function mapOrderbyInputArgs(array $query_args, array $where_params, $primary_key)
    {
        // ID of the current offset
        $offset = $this->get_offset();
        /**
         * Map the orderby inputArgs to the WP_Query
         */
        if (! empty($this->args['where']['orderby']) && is_array($this->args['where']['orderby'])) {
            $query_args['order_by'] = [];
            foreach ($this->args['where']['orderby'] as $orderby_input) {
                $query_args['order_by'][ $orderby_input['field'] ] = $orderby_input['order'];
            }
        } elseif ($offset) {
            $compare                      = $this->args['last'] ? '<' : '>';
            $where_params[ $primary_key ] = [ $compare, $offset ];
        }
        return [ $query_args, $where_params ];
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @param array $arg_mapping
     * @param array $id_fields   The fields to convert from global IDs to DB IDs.
     * @return array
     */
    protected function sanitizeWhereArgsForInputFields(
        array $where_args,
        array $arg_mapping,
        array $id_fields
    ) {
        $query_args = [];

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
            $query_args[ $arg_mapping[ $arg ] ] = in_array($arg, $id_fields, true)
                ? $this->convertGlobalId($value)
                : $value;
        }

        /**
         * Return the Query Args
         */
        return ! empty($query_args) && is_array($query_args) ? $query_args : [];
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
            return array_map([ $this, 'convertGlobalId' ], $ID);
        }
        $parts = Relay::fromGlobalId($ID);
        return ! empty($parts['id']) ? $parts['id'] : null;
    }
}
