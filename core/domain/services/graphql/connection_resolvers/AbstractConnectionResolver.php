<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Base_Class;
use EventEspresso\core\domain\services\graphql\Utilities;
use EventEspresso\core\services\loaders\LoaderFactory;
use Exception;
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
     * @var Utilities
     */
    private $utilities;


    /**
     * @return Utilities
     */
    public function getUtilities()
    {
        if (! $this->utilities instanceof Utilities) {
            $this->utilities = LoaderFactory::getLoader()->getShared(Utilities::class);
        }
        return $this->utilities;
    }

    /**
     * Determine whether the Query should execute. If it's determined that the query should
     * not be run based on context such as, but not limited to, who the user is, where in the
     * ResolveTree the Query is, the relation to the node the Query is connected to, etc
     * Return false to prevent the query from executing.
     *
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function should_execute()
    {
        return $this->should_execute;
    }

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
     * Get_amount_requested
     *
     * This checks the $args to determine the amount requested
     *
     * @return int|null
     * @throws Exception
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_amount_requested()
    {
        $amount_requested = parent::get_amount_requested();

        /**
         * If both first & last are used in the input args, throw an exception as that won't
         * work properly
         */
        if (empty($this->args['first']) && empty($this->args['last']) && $amount_requested === 10) {
            return 100; // default.
        }

        return $amount_requested;
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
    protected function sanitizeWhereArgsForInputFields(array $where_args, array $arg_mapping, array $id_fields)
    {
        $query_args = $this->getUtilities()->sanitizeWhereArgs($where_args, $arg_mapping, $id_fields);
        return ! empty($query_args) && is_array($query_args) ? $query_args : [];
    }


    /**
     * This returns the sanitized "search" keywords from where_args
     *
     * @param array $where_args
     * @return string
     */
    protected function getSearchKeywords(array $where_args)
    {
        $search = '';
        if (! empty($where_args['search'])) {
            $search = sanitize_text_field($where_args['search']);
        }
        return esc_sql($search);
    }
}
