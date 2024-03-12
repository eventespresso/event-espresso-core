<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 *EE_CPT_Event_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/CPTs/EE_CPT_Event_Strategy.core.php
 * @author      Brent Christensen
 */
class EE_CPT_Event_Strategy
{
    /**
     * the current page, if it utilizes CPTs
     *
     * @var object $CPT
     */
    protected $CPT;


    /**
     * @param array|WP_Query|null $wp_query
     * @param array               $CPT
     */
    public function __construct($wp_query, array $CPT = [])
    {
        if (is_array($wp_query) && $wp_query['WP_Query'] instanceof WP_Query) {
            $this->CPT = $wp_query['CPT'] ?? $CPT;
            $wp_query  = $wp_query['WP_Query'];
        } else {
            $this->CPT = $CPT;
        }

        // !!!!!!!!!!  IMPORTANT !!!!!!!!!!!!
        // here's the list of available filters in the WP_Query object
        // 'posts_where'
        // 'posts_where_paged'
        // 'posts_groupby'
        // 'posts_join_paged'
        // 'posts_orderby'
        // 'posts_distinct'
        // 'post_limits'
        // 'posts_fields'
        // 'posts_join'
        $this->_add_filters();
        if ($wp_query instanceof WP_Query) {
            $wp_query->is_espresso_event_single   = is_singular()
                && (
                    (isset($wp_query->query->post_type) && $wp_query->query->post_type === EspressoPostType::EVENTS)
                    || (isset($wp_query->query['post_type']) && $wp_query->query['post_type'] === EspressoPostType::EVENTS)
                );
            $wp_query->is_espresso_event_archive  = is_post_type_archive(EspressoPostType::EVENTS);
            $wp_query->is_espresso_event_taxonomy = is_tax('espresso_event_categories');
        }
    }


    /**
     * When an instance of this class is created, we add our filters
     * (which will get removed in case the next call to get_posts ISN'T
     * for event CPTs)
     */
    protected function _add_filters()
    {
        add_filter('posts_fields', [$this, 'posts_fields'], 1, 2);
        add_filter('posts_join', [$this, 'posts_join'], 1, 2);
        add_filter('posts_where', [$this, 'posts_where'], 10, 2);
        // add_filter( 'the_posts', array( $this, 'the_posts' ), 1, 2 );
        add_filter('posts_orderby', [$this, 'posts_orderby'], 1, 2);
        add_filter('posts_groupby', [$this, 'posts_groupby'], 1, 2);
    }


    /**
     * public access to _remove_filters()
     *
     * @since 4.9.63.p
     */
    public function remove_filters()
    {
    }


    /**
     * @param string        $SQL
     * @param WP_Query|null $wp_query
     * @return    string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function posts_fields(string $SQL, ?WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::EVENTS) {
            return $SQL;
        }

        if (
            $wp_query instanceof WP_Query
            && (
                $wp_query->is_espresso_event_single
                || $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
        ) {
            // adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
            $SQL .= ', ' . EEM_Datetime::instance()->table() . '.* ';
            if ($wp_query->is_espresso_event_archive || $wp_query->is_espresso_event_taxonomy) {
                // because we only want to retrieve the next upcoming datetime for each event:
                // add something like:
                // ", MIN( wp_esp_datetime.DTT_EVT_start ) as event_start_date "
                // to WP Query SELECT statement
                $SQL .= ', MIN( ' . EEM_Datetime::instance()->table() . '.DTT_EVT_start ) as event_start_date ';
            }
            remove_filter('posts_fields', [$this, 'posts_fields'], 1);
        }
        return $SQL;
    }


    /**
     * @param string        $SQL
     * @param WP_Query|null $wp_query
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function posts_join(string $SQL, ?WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::EVENTS) {
            return $SQL;
        }
        if (
            $wp_query instanceof WP_Query
            && (
                $wp_query->is_espresso_event_single
                || $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
        ) {
            // adds something like:
            // " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) "
            // to WP Query JOIN statement
            $SQL .= ' INNER JOIN ' . EEM_Datetime::instance()->table() . ' ON ( ' . EEM_Event::instance()->table()
                . '.ID = ' . EEM_Datetime::instance()->table() . '.'
                . EEM_Event::instance()->primary_key_name() . ' ) ';
            remove_filter('posts_join', [$this, 'posts_join'], 1);
        }
        return $SQL;
    }


    /**
     * @param string        $SQL
     * @param WP_Query|null $wp_query
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function posts_where(string $SQL, ?WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::EVENTS) {
            return $SQL;
        }
        if (
            $wp_query instanceof WP_Query
            && (
                $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
        ) {
            if (
                ! isset(EE_Registry::instance()->CFG->template_settings->EED_Events_Archive)
                || ! isset(EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_expired_events)
                || ! EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_expired_events
            ) {
                $SQL .= ' AND ' . EEM_Datetime::instance()->table() . ".DTT_EVT_end > '"
                    . current_time('mysql', true) . "' ";
            }
            // exclude trashed datetimes
            $SQL .= ' AND ' . EEM_Datetime::instance()->table() . '.DTT_deleted = 0';
            remove_filter('posts_where', [$this, 'posts_where']);
        }
        return $SQL;
    }


    /**
     * @param string        $SQL
     * @param WP_Query|null $wp_query
     * @return string
     */
    public function posts_orderby(string $SQL, ?WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::EVENTS) {
            return $SQL;
        }

        if (
            $wp_query instanceof WP_Query
            && (
                $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
        ) {
            $SQL = ' event_start_date ASC ';
            remove_filter('posts_orderby', [$this, 'posts_orderby'], 1);
        }
        return $SQL;
    }


    /**
     * @param string        $SQL
     * @param WP_Query|null $wp_query
     * @return string
     */
    public function posts_groupby(string $SQL, ?WP_Query $wp_query): string
    {
        if (EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) !== EspressoPostType::EVENTS) {
            return $SQL;
        }
        if (
            $wp_query instanceof WP_Query
            && (
                $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
        ) {
            // TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
            // we're joining to the datetimes table, where there can be MANY datetimes for a single event,
            // but we want to only show each event only once
            // (whereas if we didn't group them by the post's ID, then we would end up with many repeats)
            global $wpdb;
            $SQL = $wpdb->posts . '.ID ';
            remove_filter('posts_groupby', [$this, 'posts_groupby'], 1);
        }
        return $SQL;
    }


    /**
     * @param array         $posts
     * @param WP_Query|null $wp_query
     * @return array
     */
    public function the_posts(array $posts, ?WP_Query $wp_query): array
    {
        return $posts;
    }
}
