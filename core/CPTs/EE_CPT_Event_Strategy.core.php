<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * EE_CPT_Event_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/CPTs/EE_CPT_Event_Strategy.core.php
 * @author      Brent Christensen
 */
class EE_CPT_Event_Strategy
{
    /**
     * CPT details from CustomPostTypeDefinitions for specific post type
     */
    protected array $CPT;

    private string $current_time;

    private string $datetime_table;

    private string $datetime_table_pk;

    private string $event_table;

    private string $event_table_pk;

    public EE_Template_Config $template_settings;


    /**
     * @param WP_Query           $wp_query
     * @param array              $CPT
     * @param EE_Template_Config $template_settings
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(WP_Query $wp_query, array $CPT, EE_Template_Config $template_settings)
    {
        $this->CPT = $CPT;
        $this->current_time      = current_time('mysql', true);
        $this->datetime_table    = EEM_Datetime::instance()->table();
        $this->datetime_table_pk = EEM_Datetime::instance()->primary_key_name();
        $this->event_table       = EEM_Event::instance()->table();
        $this->event_table_pk    = EEM_Event::instance()->primary_key_name();
        $this->template_settings = $template_settings;

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
        $wp_query->is_espresso_event_single   = is_singular()
            && (
                (isset($wp_query->query->post_type) && $wp_query->query->post_type === EspressoPostType::EVENTS)
                || (isset($wp_query->query['post_type']) && $wp_query->query['post_type'] === EspressoPostType::EVENTS)
            );
        $wp_query->is_espresso_event_archive  = is_post_type_archive(EspressoPostType::EVENTS);
        $wp_query->is_espresso_event_taxonomy = is_tax('espresso_event_categories');
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
        add_action('the_post', [$this, 'the_post'], 1);
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
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return    string
     * @noinspection PhpUndefinedFieldInspection
     */
    public function posts_fields(string $SQL, WP_Query $wp_query): string
    {
        if (
            (
                $wp_query->is_espresso_event_single
                || $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
            && $this->isEspressoEvent($wp_query)
            && strpos($SQL, "$this->datetime_table.*") === false
        ) {
            // adds something like ", wp_esp_datetime.* " to WP Query SELECT statement
            $SQL .= ", $this->datetime_table.* ";
            if ($wp_query->is_espresso_event_archive || $wp_query->is_espresso_event_taxonomy) {
                // because we only want to retrieve the next upcoming datetime for each event:
                // add something like:
                // ", MIN( wp_esp_datetime.DTT_EVT_start ) as event_start_date "
                // to WP Query SELECT statement
                $SQL .= ", MIN( $this->datetime_table.DTT_EVT_start ) as event_start_date ";
            }
        }
        return $SQL;
    }


    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @noinspection PhpUndefinedFieldInspection
     */
    public function posts_join(string $SQL, WP_Query $wp_query): string
    {
        if (
            (
                $wp_query->is_espresso_event_single
                || $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
            && $this->isEspressoEvent($wp_query)
        ) {
            if (strpos($SQL, " INNER JOIN $this->datetime_table") === false) {
                // adds something like:
                // " LEFT JOIN wp_esp_datetime ON ( wp_esp_datetime.EVT_ID = wp_posts.ID ) "
                // to WP Query JOIN statement
                $SQL .= " INNER JOIN $this->datetime_table";
                $SQL .= " ON ( $this->event_table.ID = $this->datetime_table.$this->event_table_pk ) ";
            }
            // filter out events with expired tickets
            $date_tickets_table = EEM_Datetime_Ticket::instance()->table();
            if (
                (
                    ! isset($this->template_settings->EED_Events_Archive)
                    || ! isset($this->template_settings->EED_Events_Archive->display_events_with_expired_tickets)
                    || ! $this->template_settings->EED_Events_Archive->display_events_with_expired_tickets
                )
                && strpos($SQL, " INNER JOIN $date_tickets_table") === false
            ) {
                $tickets_table = EEM_Ticket::instance()->table();
                $tickets_table_pk = EEM_Ticket::instance()->primary_key_name();
                $SQL .= " INNER JOIN $date_tickets_table AS Datetime_Ticket";
                $SQL .= " ON ( Datetime_Ticket.$this->datetime_table_pk = $this->datetime_table.$this->datetime_table_pk )";
                $SQL .= " INNER JOIN $tickets_table AS Ticket";
                $SQL .= " ON ( Datetime_Ticket.TKT_ID=Ticket.$tickets_table_pk )";
            }
        }
        return $SQL;
    }


    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @noinspection PhpUndefinedFieldInspection
     */
    public function posts_where(string $SQL, WP_Query $wp_query): string
    {
        if (
            (
                $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
            && $this->isEspressoEvent($wp_query)
            && strpos($SQL, $this->datetime_table) === false
        ) {
            if (
                ! isset($this->template_settings->EED_Events_Archive)
                || ! isset($this->template_settings->EED_Events_Archive->display_expired_events)
                || ! $this->template_settings->EED_Events_Archive->display_expired_events
            ) {
                $SQL .= " AND $this->datetime_table.DTT_EVT_end > '$this->current_time' ";
            }
            if (
                ! isset($this->template_settings->EED_Events_Archive)
                || ! isset($this->template_settings->EED_Events_Archive->display_events_with_expired_tickets)
                || ! $this->template_settings->EED_Events_Archive->display_events_with_expired_tickets
            ) {
                $SQL .= ' AND Ticket.TKT_end_date > "' . current_time('mysql', true) . '" AND Ticket.TKT_deleted=0';
            }
            // exclude trashed datetimes
            $SQL .= " AND $this->datetime_table.DTT_deleted = 0";
        }
        return $SQL;
    }


    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @noinspection PhpUndefinedFieldInspection
     */
    public function posts_orderby(string $SQL, WP_Query $wp_query): string
    {
        if (
            (
                $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
            && $this->isEspressoEvent($wp_query)
            && strpos($SQL, 'event_start_date') === false
        ) {
            $SQL = ' event_start_date ASC ';
        }
        return $SQL;
    }


    /**
     * @param string   $SQL
     * @param WP_Query $wp_query
     * @return string
     * @noinspection PhpUndefinedFieldInspection
     */
    public function posts_groupby(string $SQL, WP_Query $wp_query): string
    {
        global $wpdb;
        if (
            (
                $wp_query->is_espresso_event_single
                || $wp_query->is_espresso_event_archive
                || $wp_query->is_espresso_event_taxonomy
            )
            && $this->isEspressoEvent($wp_query)
            && strpos($SQL, "$wpdb->posts.ID") === false
        ) {
            // TODO: add event list option for displaying ALL datetimes in event list or only primary datetime (default)
            // we're joining to the datetimes table, where there can be MANY datetimes for a single event,
            // but we want to only show each event only once
            // (whereas if we didn't group them by the post's ID, then we would end up with many repeats)
            $SQL = "$wpdb->posts.ID ";
        }
        return $SQL;
    }


    /**
     * @param array    $posts
     * @param WP_Query $wp_query
     * @return array
     */
    public function the_posts(array $posts, WP_Query $wp_query): array
    {
        return $posts;
    }


    /**
     * @param WP_Post $post The Post object (passed by reference).
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function the_post(WP_Post $post)
    {
        if ($post->post_type === EspressoPostType::EVENTS && ! isset($post->EE_Event)) {
            $post->EE_Event = EEM_Event::instance()->get_one_by_ID($post->ID);
        }
    }


    private function isEspressoEvent(WP_Query $wp_query): bool
    {
        return EE_CPT_Strategy::instance()->wpQueryPostType($wp_query) === EspressoPostType::EVENTS;
    }
}
