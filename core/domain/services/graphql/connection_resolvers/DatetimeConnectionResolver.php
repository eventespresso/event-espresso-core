<?php

namespace EventEspresso\core\domain\services\graphql\connection_resolvers;

use EE_Error;
use EEM_Datetime;
use EE_Event;
use EE_Ticket;
use EE_Checkin;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use WPGraphQL\Data\Connection\AbstractConnectionResolver;
use WPGraphQL\Model\Post;

/**
 * Class DatetimeConnectionResolver
 */
class DatetimeConnectionResolver extends AbstractConnectionResolver
{

    /**
     * @return EEM_Datetime
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query()
    {
        return EEM_Datetime::instance();
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
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_query_args()
    {

        $query_args = [];

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
            $input_fields = $this->sanitize_input_fields($this->args['where']);
        }

        /**
         * Determine where we're at in the Graph and adjust the query context appropriately.
         * For example, if we're querying for datetime as a field of event query, this will automatically
         * set the query to pull datetimes that belong to that event.
         * We can set more cases for other source types.
         */
        if (is_object($this->source)) {
            switch (true) {
                // It's surely an event
                case $this->source instanceof Post:
                    $query_args[] = ['EVT_ID' => $this->source->ID];
                    break;
                case $this->source instanceof EE_Event:
                    $query_args[] = ['EVT_ID' => $this->source->ID()];
                    break;
                case $this->source instanceof EE_Ticket:
                    $query_args[] = ['Ticket.TKT_ID' => $this->source->ID()];
                    break;
                case $this->source instanceof EE_Checkin:
                    $query_args[] = ['Checkin.CHK_ID' => $this->source->ID()];
                    break;
            }
        }

        /**
         * Merge the input_fields with the default query_args
         */
        if (! empty($input_fields)) {
            $query_args = array_merge($query_args, $input_fields);
        }

        /**
         * Return the $query_args
         */
        return $query_args;
    }


    /**
     * This sets up the "allowed" args, and translates the GraphQL-friendly keys to WP_Query
     * friendly keys. There's probably a cleaner/more dynamic way to approach this, but
     * this was quick. I'd be down to explore more dynamic ways to map this, but for
     * now this gets the job done.
     *
     * @param array $query_args
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function sanitize_input_fields(array $query_args)
    {

        $arg_mapping = [
            'orderBy' => 'order_by',
            'order'   => 'order',
        ];

        /**
         * Return the Query Args
         */
        return ! empty($query_args) && is_array($query_args) ? $query_args : [];
    }
}
