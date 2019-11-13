<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Datetime;
use EE_Error;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Data\Connection\AbstractConnectionResolver;

/**
 * Class DatetimeConnectionResolver
 */
class TicketConnectionResolver extends AbstractConnectionResolver
{

    /**
     * @return EEM_Ticket
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query()
    {
        return EEM_Ticket::instance();
    }


    /**
     * Return an array of items from the query
     *
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_items()
    {

        $results = $this->query->get_col($this->query_args);

        return ! empty($results) ? $results : [];
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

        if (false === $this->should_execute) {
            return false;
        }

        return $this->should_execute;
    }


    /**
     * Here, we map the args from the input, then we make sure that we're only querying
     * for IDs. The IDs are then passed down the resolve tree, and deferred resolvers
     * handle batch resolution of the posts.
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_args()
    {

		$where_params = [];
		$query_args   = [];
        /**
         * Prepare for later use
         */
        $last = ! empty($this->args['last']) ? $this->args['last'] : null;
        $first = ! empty($this->args['first']) ? $this->args['first'] : null;

        /**
         * Set limit the highest value of $first and $last, with a (filterable) max of 100
         */
        $query_args['limit'] = min(
            max(absint($first), absint($last), 10),
            $this->query_amount
        ) + 1;

        /**
         * Collect the input_fields and sanitize them to prepare them for sending to the Query
         */
        $input_fields = [];
        if (! empty($this->args['where'])) {
            $input_fields = $this->sanitizeInputFields($this->args['where']);
        }

        /**
         * Determine where we're at in the Graph and adjust the query context appropriately.
         */
        if ($this->source instanceof EE_Datetime) {
            $where_params['Datetime.DTT_ID'] = $this->source->ID();
        }

        /**
         * Merge the input_fields with the default query_args
         */
		if (! empty($input_fields)) {
			$where_params = array_merge($where_params, $input_fields);
		}

		// ID of the offset datetime.
		$offset = $this->get_offset();

		/**
		 * Map the orderby inputArgs to the WP_Query
		 */
		if (! empty( $this->args['where']['orderby']) && is_array( $this->args['where']['orderby'] ) ) {
			$query_args['order_by'] = [];
			foreach ( $this->args['where']['orderby'] as $orderby_input ) {
				$query_args['order_by'][ $orderby_input['field'] ] = $orderby_input['order'];
			}
		} elseif ($offset) {
			$compare = ! empty($last) ? '<' : '>';
			$where_params['TKT_ID'] = array($compare, $offset);
		}

		$query_args[] = $where_params;

        /**
         * Return the $query_args
         */
        return $query_args;
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to model
     * friendly keys.
     *
     * @param array $where_args
     * @return array
     */
	public function sanitizeInputFields(array $where_args)
	{

		$arg_mapping = [
			'datetimeId'  => 'Datetime.DTT_ID',
		];

		$query_args = [];

		foreach ($where_args as $arg => $value) {
			if (! array_key_exists($arg, $arg_mapping) ) {
				continue;
			}

			if (is_array($value) && ! empty($value)) {
				$value = array_map(
					function($value) {
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
