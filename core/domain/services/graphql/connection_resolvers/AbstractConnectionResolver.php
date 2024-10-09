<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Base_Class;
use EventEspresso\core\domain\services\graphql\Utilities;
use EventEspresso\core\services\loaders\LoaderFactory;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use WPGraphQL\Data\Connection\AbstractConnectionResolver as WPGraphQLConnectionResolver;

/**
 * Class AbstractConnectionResolver
 * Shared logic for ConnectionResolvers
 *
 * @package EventEspresso\core\services\graphql\connection_resolvers
 * @author  Manzoor Ahmad Wani
 * @since   5.0.0.p
 */
abstract class AbstractConnectionResolver extends WPGraphQLConnectionResolver
{
    public const MAX_QUERY_LIMIT = 250;

    private ?Utilities $utilities = null;


    public function __construct($source, array $args, AppContext $context, ResolveInfo $info)
    {
        add_filter(
            'graphql_connection_max_query_amount',
            static function ($max_query_amount) {
                return self::MAX_QUERY_LIMIT;
            }
        );
        parent::__construct($source, $args, $context, $info);
    }


    /**
     * @return Utilities
     */
    public function getUtilities(): Utilities
    {
        if (! $this->utilities instanceof Utilities) {
            $this->utilities = LoaderFactory::getLoader()->getShared(Utilities::class);
        }
        return $this->utilities;
    }


    /**
     * Set limit the highest value of first and last, with a (filterable) max of 500
     *
     * @return int
     */
    protected function getLimit(): int
    {
        $first = ! empty($this->args['first'])
            ? absint($this->args['first'])
            : null;
        $last  = ! empty($this->args['last'])
            ? absint($this->args['last'])
            : null;

        $limit = min(
            max($first, $last, self::MAX_QUERY_LIMIT),
            $this->query_amount
        );
        $limit++;
        return $limit;
    }

    // /**
    //  * Get_amount_requested
    //  *
    //  * This checks the $args to determine the amount requested
    //  *
    //  * @return int|null
    //  * @throws Exception
    //  */
    // // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    // public function get_amount_requested(): ?int
    // {
    //     $amount_requested = parent::get_amount_requested();
    //
    //     /**
    //      * If both first & last are used in the input args, throw an exception as that won't
    //      * work properly
    //      */
    //     if (empty($this->args['first']) && empty($this->args['last']) && $amount_requested === ConnectionsManager::MAX_AMOUNT_REQUESTED) {
    //         return ConnectionsManager::MAX_AMOUNT_REQUESTED; // default.
    //     }
    //
    //     return $amount_requested;
    // }

    /**
     * Determine whether the offset is valid, i.e the entity corresponding to the
     * offset exists. Offset is equivalent to entity ID. So this function is equivalent to
     * checking if the entity with the given ID exists.
     *
     * @param int $offset The ID of the node used for the cursor offset
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function is_valid_offset($offset): bool
    {
        $entity = $this->get_query()->get_one_by_ID($offset);

        return $entity instanceof EE_Base_Class;
    }

    /**
     * Validates Model.
     *
     * @param EE_Base_Class|null $model Entity node.
     * @return bool
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    protected function is_valid_model($model): bool
    {
        return $model instanceof EE_Base_Class;
    }


    /**
     * Map the orderby inputArgs to the WP_Query
     *
     * @param array  $query_args
     * @param array  $where_params
     * @param string $primary_key
     * @return array
     */
    protected function mapOrderbyInputArgs(array $query_args, array $where_params, string $primary_key): array
    {
        // ID of the current offset
        $cursor = $this->args['after'] ?? null;
        $cursor = $cursor ?: ($this->args['before'] ?? null);
        $offset = $this->get_offset_for_cursor($cursor);

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
     * @param array $arg_mapping Array where keys are GQL field names and values are EE model field names.
     * @param array $id_fields The fields to convert from global IDs to DB IDs.
     * @return array
     */
    protected function sanitizeWhereArgsForInputFields(array $where_args, array $arg_mapping, array $id_fields = []): array
    {
        return $this->getUtilities()->sanitizeWhereArgs($where_args, $arg_mapping, $id_fields);
    }


    /**
     * This returns the sanitized "search" keywords from where_args
     *
     * @param array $where_args
     * @return string
     */
    protected function getSearchKeywords(array $where_args): string
    {
        $search = '';
        if (! empty($where_args['search'])) {
            $search = sanitize_text_field($where_args['search']);
        }
        return esc_sql($search);
    }
}
