<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class EEH_Event_Query
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.3
 */
class EEH_Event_Query
{

    /**
     * Start Date
     *
     * @var $_event_query_month
     */
    protected static $_event_query_month;

    /**
     * Category
     *
     * @var $_event_query_category
     */
    protected static $_event_query_category;

    /**
     * whether to display expired events in the event list
     *
     * @var bool $_show_expired
     */
    protected static $_event_query_show_expired = false;

    /**
     * list of params for controlling how the query results are ordered
     *
     * @var array $_event_query_orderby
     */
    protected static $_event_query_orderby = array();

    /**
     * direction list is sorted
     *
     * @var string $_event_query_sort
     */
    protected static $_event_query_sort;

    /**
     * list of params used to build the query's various clauses
     *
     * @var $_query_params
     */
    protected static $_query_params = array();



    /**
     * @return void
     */
    public static function add_query_filters()
    {
        // add query filters
        add_action('pre_get_posts', array('EEH_Event_Query', 'filter_query_parts'), 10, 1);
    }



    /**
     * @param WP_Query $WP_Query
     * @return bool
     */
    public static function apply_query_filters(WP_Query $WP_Query)
    {
        return (
                   isset($WP_Query->query['post_type'])
                   && $WP_Query->query['post_type'] === 'espresso_events'
               )
               || apply_filters('FHEE__EEH_Event_Query__apply_query_filters', false);
    }


    /**
     * @param WP_Query $WP_Query
     */
    public static function filter_query_parts(WP_Query $WP_Query)
    {
        // ONLY add our filters if this isn't the main wp_query,
        // because if this is the main wp_query we already have
        // our cpt strategies take care of adding things in.
        if ($WP_Query instanceof WP_Query && ! $WP_Query->is_main_query()) {
            // build event list query
            add_filter('posts_fields', array('EEH_Event_Query', 'posts_fields'), 10, 2);
            add_filter('posts_join', array('EEH_Event_Query', 'posts_join'), 10, 2);
            add_filter('posts_where', array('EEH_Event_Query', 'posts_where'), 10, 2);
            add_filter('posts_orderby', array('EEH_Event_Query', 'posts_orderby'), 10, 2);
            add_filter('posts_clauses_request', array('EEH_Event_Query', 'posts_clauses'), 10, 2);
        }
    }



    /**
     * @param string $month
     * @param string $category
     * @param bool   $show_expired
     * @param string $orderby
     * @param string $sort
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function set_query_params(
        $month = '',
        $category = '',
        $show_expired = false,
        $orderby = 'start_date',
        $sort = 'ASC'
    ) {
        self::$_query_params                        = array();
        EEH_Event_Query::$_event_query_month        = EEH_Event_Query::_display_month($month);
        EEH_Event_Query::$_event_query_category     = EEH_Event_Query::_event_category_slug($category);
        EEH_Event_Query::$_event_query_show_expired = EEH_Event_Query::_show_expired($show_expired);
        EEH_Event_Query::$_event_query_orderby      = EEH_Event_Query::_orderby($orderby);
        EEH_Event_Query::$_event_query_sort         = EEH_Event_Query::_sort($sort);
    }



    /**
     * what month should the event list display events for?
     *
     * @param string $month
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _display_month($month = '')
    {
        return sanitize_text_field(EE_Registry::instance()->REQ->get('event_query_month', $month));
    }



    /**
     * @param string $category
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _event_category_slug($category = '')
    {
        return sanitize_text_field(EE_Registry::instance()->REQ->get('event_query_category', $category));
    }



    /**
     * @param bool $show_expired
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _show_expired($show_expired = false)
    {
        // override default expired option if set via filter
        return filter_var(
            EE_Registry::instance()->REQ->get('event_query_show_expired', $show_expired),
            FILTER_VALIDATE_BOOLEAN
        );
    }



    /**
     * @param    string $orderby
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _orderby($orderby = 'start_date')
    {
        $event_query_orderby = EE_Registry::instance()->REQ->get('event_query_orderby', $orderby);
        $event_query_orderby = is_array($event_query_orderby)
            ? $event_query_orderby
            : explode(',', $event_query_orderby);
        $event_query_orderby = array_map('trim', $event_query_orderby);
        $event_query_orderby = array_map('sanitize_text_field', $event_query_orderby);
        return $event_query_orderby;
    }



    /**
     * @param string $sort
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _sort($sort = 'ASC')
    {
        $sort = EE_Registry::instance()->REQ->get('event_query_sort', $sort);
        return in_array($sort, array('ASC', 'asc', 'DESC', 'desc'), true)
            ? strtoupper($sort)
            : 'ASC';
    }



    /**
     * Filters the clauses for the WP_Query object
     *
     * @param array    $clauses array of clauses
     * @param WP_Query $wp_query
     * @return array   array of clauses
     */
    public static function posts_clauses($clauses, WP_Query $wp_query)
    {
        if (EEH_Event_Query::apply_query_filters($wp_query)) {
            global $wpdb;
            $clauses['groupby'] = $wpdb->posts . '.ID ';
        }
        return $clauses;
    }



    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_fields($SQL, WP_Query $wp_query)
    {
        if (EEH_Event_Query::apply_query_filters($wp_query)) {
            // adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
            $SQL .= EEH_Event_Query::posts_fields_sql_for_orderby(EEH_Event_Query::$_event_query_orderby);
        }
        return $SQL;
    }



    /**
     * @param array $orderby_params
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_fields_sql_for_orderby(array $orderby_params = array())
    {
        $SQL = ', MIN( ' . EEM_Datetime::instance()->table() . '.DTT_EVT_start ) as event_start_date ';
        foreach ($orderby_params as $orderby) {
            switch ($orderby) {
                case 'ticket_start':
                    $SQL .= ', ' . EEM_Ticket::instance()->table() . '.TKT_start_date';
                    break;
                case 'ticket_end':
                    $SQL .= ', ' . EEM_Ticket::instance()->table() . '.TKT_end_date';
                    break;
                case 'venue_title':
                    $SQL .= ', Venue.post_title AS venue_title';
                    break;
                case 'city':
                    $SQL .= ', ' . EEM_Venue::instance()->second_table() . '.VNU_city';
                    break;
                case 'state':
                    $SQL .= ', ' . EEM_State::instance()->table() . '.STA_name';
                    break;
            }
        }
        return $SQL;
    }



    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_join($SQL = '', WP_Query $wp_query)
    {
        if (EEH_Event_Query::apply_query_filters($wp_query)) {
            // Category
            $SQL = EEH_Event_Query::posts_join_sql_for_show_expired($SQL, EEH_Event_Query::$_event_query_show_expired);
            $SQL = EEH_Event_Query::posts_join_sql_for_terms($SQL, EEH_Event_Query::$_event_query_category);
            $SQL = EEH_Event_Query::posts_join_for_orderby($SQL, EEH_Event_Query::$_event_query_orderby);
        }
        return $SQL;
    }



    /**
     * @param string  $SQL
     * @param boolean $show_expired if TRUE, then displayed past events
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_join_sql_for_show_expired($SQL = '', $show_expired = false)
    {
        if (! $show_expired) {
            $join = EEM_Event::instance()->table() . '.ID = ';
            $join .= EEM_Datetime::instance()->table() . '.' . EEM_Event::instance()->primary_key_name();
            // don't add if this is already in the SQL
            if (strpos($SQL, $join) === false) {
                $SQL .= ' INNER JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . $join . ' ) ';
            }
        }
        return $SQL;
    }



    /**
     * @param string $SQL
     * @param string $join_terms    pass TRUE or term string, doesn't really matter since this value doesn't really get
     *                              used for anything yet
     * @return string
     */
    public static function posts_join_sql_for_terms($SQL = '', $join_terms = '')
    {
        if (! empty($join_terms)) {
            global $wpdb;
            $SQL .= " LEFT JOIN $wpdb->term_relationships ON ($wpdb->posts.ID = $wpdb->term_relationships.object_id)";
            $SQL .= " LEFT JOIN $wpdb->term_taxonomy ON ($wpdb->term_relationships.term_taxonomy_id = $wpdb->term_taxonomy.term_taxonomy_id)";
            $SQL .= " LEFT JOIN $wpdb->terms ON ($wpdb->terms.term_id = $wpdb->term_taxonomy.term_id) ";
        }
        return $SQL;
    }



    /**
     * usage:  $SQL .= EEH_Event_Query::posts_join_for_orderby( $orderby_params );
     *
     * @param    string $SQL
     * @param    array  $orderby_params
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_join_for_orderby($SQL = '', array $orderby_params = array())
    {
        foreach ($orderby_params as $orderby) {
            switch ($orderby) {
                case 'ticket_start':
                case 'ticket_end':
                    $SQL .= EEH_Event_Query::_posts_join_for_datetime(
                        $SQL,
                        EEM_Datetime_Ticket::instance()->table() . '.' . EEM_Datetime::instance()->primary_key_name()
                    );
                    $SQL .= ' LEFT JOIN ' . EEM_Ticket::instance()->table();
                    $SQL .= ' ON (';
                    $SQL .= EEM_Datetime_Ticket::instance()->table() . '.' . EEM_Ticket::instance()->primary_key_name();
                    $SQL .= ' = ';
                    $SQL .= EEM_Ticket::instance()->table() . '.' . EEM_Ticket::instance()->primary_key_name();
                    $SQL .= ' )';
                    break;
                case 'venue_title':
                case 'city':
                    $SQL .= EEH_Event_Query::_posts_join_for_event_venue($SQL);
                    break;
                case 'state':
                    $SQL .= EEH_Event_Query::_posts_join_for_event_venue($SQL);
                    $SQL .= EEH_Event_Query::_posts_join_for_venue_state($SQL);
                    break;
                case 'start_date':
                default:
                    $SQL .= EEH_Event_Query::_posts_join_for_datetime($SQL, EEM_Event::instance()->table() . '.ID');
                    break;
            }
        }
        return $SQL;
    }



    /**
     * @param string $SQL
     * @param string $join
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected static function _posts_join_for_datetime($SQL = '', $join = '')
    {
        if (! empty($join)) {
            $join .= ' = ' . EEM_Datetime::instance()->table() . '.' . EEM_Event::instance()->primary_key_name();
            if (strpos($SQL, $join) === false) {
                return ' INNER JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . $join . ' )';
            }
        }
        return '';
    }


    /**
     * @param string $SQL
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected static function _posts_join_for_event_venue(string $SQL = ''): string
    {
        // grab venue table PK name & event_meta table name
        $VNU_ID = EEM_Venue::instance()->primary_key_name();
        $event_meta = EEM_Event::instance()->second_table();
        // generate conditions for:  Event <=> Venue  JOIN clause
        $event_venue_join = "Venue.ID = $event_meta.$VNU_ID";
        // don't add joins if they have already been added
        if (strpos($SQL, $event_venue_join) === false) {
            global $wpdb;
            // grab wp_posts (event), venue, and venue_meta table names
            $wp_posts = $wpdb->posts;
            $venue = EEM_Venue::instance()->table();
            $venue_meta = EEM_Venue::instance()->second_table();
            // generate JOIN clause for: Event <=> Event Meta
            $venue_SQL = " LEFT JOIN $event_meta ON ( $wp_posts.ID = $event_meta.EVT_ID )";
            // generate JOIN clause for: Event Meta <=> Venue
            $venue_SQL .= " LEFT JOIN $venue AS Venue ON ( $event_venue_join )";
            // generate JOIN clause for: Venue <=> Venue Meta
            $venue_SQL .= " LEFT JOIN $venue_meta ON ( Venue.ID = $venue_meta.$VNU_ID )";
            unset($venue, $VNU_ID, $event_meta, $venue_meta, $event_venue_join);
            return $venue_SQL;
        }
        unset($VNU_ID, $event_meta, $event_venue_join);
        return '';
    }



    /**
     * @param string $SQL
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected static function _posts_join_for_venue_state($SQL = '')
    {
        // Venue Meta table name
        $venue_meta_table = EEM_Venue::instance()->second_table();
        // State table name
        $state_table = EEM_State::instance()->table();
        // State table pk
        $state_table_pk = EEM_State::instance()->primary_key_name();
        // verify vars
        if ($venue_meta_table && $state_table && $state_table_pk) {
            // like: wp_esp_venue_meta.STA_ID = wp_esp_state.STA_ID
            $join = "$venue_meta_table.$state_table_pk = $state_table.$state_table_pk";
            // don't add join if it has already been added
            if (strpos($SQL, $join) === false) {
                unset($state_table_pk, $venue_meta_table, $venue_table_pk);
                return " LEFT JOIN $state_table ON ( $join )";
            }
        }
        unset($join, $state_table, $state_table_pk, $venue_meta_table, $venue_table_pk);
        return '';
    }



    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_where($SQL = '', WP_Query $wp_query)
    {
        if (EEH_Event_Query::apply_query_filters($wp_query)) {
            // Show Expired ?
            $SQL .= EEH_Event_Query::posts_where_sql_for_show_expired(EEH_Event_Query::$_event_query_show_expired);
            // Category
            $SQL .= EEH_Event_Query::posts_where_sql_for_event_category_slug(EEH_Event_Query::$_event_query_category);
            // Start Date
            $SQL .= EEH_Event_Query::posts_where_sql_for_event_list_month(EEH_Event_Query::$_event_query_month);
        }
        return $SQL;
    }



    /**
     * @param    boolean $show_expired if TRUE, then displayed past events
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_where_sql_for_show_expired($show_expired = false)
    {
        return ! $show_expired
            ? ' AND ' . EEM_Datetime::instance()->table() . '.DTT_EVT_end > \'' . current_time('mysql', true) . '\' '
            : '';
    }



    /**
     * @param boolean $event_category_slug
     * @return string
     */
    public static function posts_where_sql_for_event_category_slug($event_category_slug = null)
    {
        global $wpdb;
        if (! empty($event_category_slug)) {
            $event_category_slugs_array = array_map('trim', explode(',', $event_category_slug));
            $event_category_slugs_prepare = implode(', ', array_fill(0, count($event_category_slugs_array), '%s'));
            return $wpdb->prepare(" AND {$wpdb->terms}.slug IN ({$event_category_slugs_prepare}) ", $event_category_slugs_array);
        }
        return '';
    }



    /**
     * @param boolean $month
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_where_sql_for_event_list_month($month = null)
    {
        $SQL = '';
        if (! empty($month)) {
            $datetime_table = EEM_Datetime::instance()->table();
            // event start date is LESS than the end of the month ( so nothing that doesn't start until next month )
            $SQL = " AND {$datetime_table}.DTT_EVT_start <= '";
            $SQL .= date('Y-m-t 23:59:59', \EEH_DTT_Helper::first_of_month_timestamp($month)) . "'";
            // event end date is GREATER than the start of the month ( so nothing that ended before this month )
            $SQL .= " AND {$datetime_table}.DTT_EVT_end >= '";
            $SQL .= date('Y-m-01 0:0:00', \EEH_DTT_Helper::first_of_month_timestamp($month)) . "' ";
        }
        return $SQL;
    }



    /**
     * @param string $SQL
     * @param WP_Query $wp_query
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_orderby($SQL = '', WP_Query $wp_query)
    {
        if (EEH_Event_Query::apply_query_filters($wp_query)) {
            $SQL = EEH_Event_Query::posts_orderby_sql(
                EEH_Event_Query::$_event_query_orderby,
                EEH_Event_Query::$_event_query_sort
            );
        }
        return $SQL;
    }



    /**
     *    posts_orderby_sql
     *    possible parameters:
     *    ID
     *    start_date
     *    end_date
     *    event_name
     *    category_slug
     *    ticket_start
     *    ticket_end
     *    venue_title
     *    city
     *    state
     *    **IMPORTANT**
     *    make sure to also send the $orderby_params array to the posts_join_for_orderby() method
     *    or else some of the table references below will result in MySQL errors
     *
     * @param array  $orderby_params
     * @param string $sort
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function posts_orderby_sql(array $orderby_params = array(), $sort = 'ASC')
    {
        global $wpdb;
        $SQL     = '';
        $counter = 0;
        $sort    = in_array($sort, array('ASC', 'asc', 'DESC', 'desc'), true)
            ? strtoupper($sort)
            : 'ASC';
        // make sure 'orderby' is set in query params
        if (! isset(self::$_query_params['orderby'])) {
            self::$_query_params['orderby'] = array();
        }
        // loop thru $orderby_params (type cast as array)
        foreach ($orderby_params as $orderby) {
            // check if we have already added this param
            if (isset(self::$_query_params['orderby'][ $orderby ])) {
                // if so then remove from the $orderby_params so that the count() method below is accurate
                unset($orderby_params[ $orderby ]);
                // then bump ahead to the next param
                continue;
            }
            // this will ad a comma depending on whether this is the first or last param
            $glue = $counter === 0 || $counter === count($orderby_params) ? ' ' : ', ';
            // ok what's we dealing with?
            switch ($orderby) {
                case 'id':
                case 'ID':
                    $SQL .= $glue . $wpdb->posts . '.ID ' . $sort;
                    break;
                case 'end_date':
                    $SQL .= $glue . EEM_Datetime::instance()->table() . '.DTT_EVT_end ' . $sort;
                    break;
                case 'event_name':
                    $SQL .= $glue . $wpdb->posts . '.post_title ' . $sort;
                    break;
                case 'category_slug':
                    $SQL .= $glue . $wpdb->terms . '.slug ' . $sort;
                    break;
                case 'ticket_start':
                    $SQL .= $glue . EEM_Ticket::instance()->table() . '.TKT_start_date ' . $sort;
                    break;
                case 'ticket_end':
                    $SQL .= $glue . EEM_Ticket::instance()->table() . '.TKT_end_date ' . $sort;
                    break;
                case 'venue_title':
                    $SQL .= $glue . 'venue_title ' . $sort;
                    break;
                case 'city':
                    $SQL .= $glue . EEM_Venue::instance()->second_table() . '.VNU_city ' . $sort;
                    break;
                case 'state':
                    $SQL .= $glue . EEM_State::instance()->table() . '.STA_name ' . $sort;
                    break;
                case 'start_date':
                default:
                    $SQL .= $glue . ' event_start_date ' . $sort;
                    break;
            }
            // add to array of orderby params that have been added
            self::$_query_params['orderby'][ $orderby ] = true;
            $counter++;
        }
        return $SQL;
    }
}
