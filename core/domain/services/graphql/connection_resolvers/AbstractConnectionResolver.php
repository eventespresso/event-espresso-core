<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use WPGraphQL\Data\Connection\AbstractConnectionResolver as WPGraphQLConnectionResolver;

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
        $this->args['first'] = ! empty($this->args['first']) ? absint($this->args['first']) : 0;
        $this->args['last'] = ! empty($this->args['last']) ? absint($this->args['last']) : 0;

        $limit = min(
            max($this->args['first'], $this->args['last'], 10),
            $this->query_amount
        );
        $limit++;
        return $limit;
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
            $compare = $this->args['last'] ? '<' : '>';
            $where_params[ $primary_key ] = [$compare, $offset];
        }
        return [$query_args, $where_params];
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @param array $arg_mapping
     * @return array
     */
    protected function sanitizeWhereArgsForInputFields(array $where_args, array $arg_mapping)
    {
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
            $query_args[ $arg_mapping[ $arg ] ] = $value;
        }

        /**
         * Return the Query Args
         */
        return ! empty($query_args) && is_array($query_args) ? $query_args : [];
    }
}
