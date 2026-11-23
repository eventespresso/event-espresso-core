<?php

namespace EventEspresso\core\CPTs;

use WP_Query;

/**
 * Opt-out switch for the SQL filters EE's CPT strategies add to WP_Query.
 * A query that sets the var to true gets none of the event-specific SQL (datetime joins, archive WHERE/ORDER BY/
 * GROUP BY, EEH_Event_Query list clauses) but keeps CptQueryModifier's post decoration (EE model objects on its
 * posts), term/taxonomy handling and maintenance-mode protection. Settable only by PHP code: never a public query var.
 *
 * @package    Event Espresso
 * @subpackage core
 * @author     Tony Warwick
 * @since      5.0.61
 */
class CptQueryFilters
{
    private const SUPPRESS_FILTERS_QUERY_VAR = 'espresso_suppress_query_filters';


    /**
     * Name of the WP_Query arg, ie: `[CptQueryFilters::suppressFiltersQueryVarName() => true]`.
     */
    public static function suppressFiltersQueryVarName(): string
    {
        return self::SUPPRESS_FILTERS_QUERY_VAR;
    }


    /**
     * Whether the query opted out. "false", "0" and "" are false.
     */
    public static function suppressFilters(?WP_Query $wp_query = null): bool
    {
        return $wp_query instanceof WP_Query
            && filter_var($wp_query->get(self::SUPPRESS_FILTERS_QUERY_VAR, false), FILTER_VALIDATE_BOOLEAN);
    }
}
