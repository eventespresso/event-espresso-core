<?php

namespace EventEspresso\core\domain\services\event;

use EE_Error;
use EED_Events_Archive;
use EEH_Event_Query;
use EEH_Template;
use EventEspresso\core\domain\services\wp_queries\EventListQuery;
use ReflectionException;
use WP_Post;

/**
 * Renders EE's event list loop template for any caller (shortcode, block, page builder widget, template tag).
 * Restores the exact query and post that were active before the render, and detaches only the archive and event
 * query filters the render attached, so a host page or an outer list keeps its own state.
 * Outside a front-end request, the caller adds `__return_true` to
 * `FHEE__EED_Event_Archive__template_include__allow_custom_selected_template` around the call.
 *
 * @package EventEspresso\core\domain\services\event
 * @since   5.0.61
 */
class EventListRenderer
{
    public const DEFAULT_TEMPLATE = 'loop-espresso_events.php';

    /**
     * The [ESPRESSO_EVENTS] order: EE's list SQL joins the datetimes table and needs an order.
     */
    private const DEFAULT_ARGS = ['order_by' => 'start_date', 'sort' => 'ASC'];

    /**
     * Request-global switches the list render reads: details injection for list rows and EE's list query SQL.
     */
    private const FLAG_FILTERS = [
        'FHEE__EES_Espresso_Events__process_shortcode__true',
        'FHEE__EEH_Event_Query__apply_query_filters',
    ];


    /**
     * @param array  $args     EventListQuery args (title, limit, css_class, show_expired, expired_only, month,
     *                         category_slug, order_by, sort, show_title) plus any WP_Query args.
     * @param string $template Loop template located with EEH_Template::locate_template().
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function render(array $args = [], string $template = EventListRenderer::DEFAULT_TEMPLATE): string
    {
        global $wp_query;
        $saved_query         = $wp_query;
        $saved_post          = ($GLOBALS['post'] ?? null) instanceof WP_Post ? $GLOBALS['post'] : null;
        $had_archive_filters = has_filter('the_content', ['EED_Events_Archive', 'event_details']) !== false;
        $had_query_filters   = has_action('pre_get_posts', ['EEH_Event_Query', 'filter_query_parts']) !== false;
        $added_flags         = [];
        foreach (EventListRenderer::FLAG_FILTERS as $flag) {
            if (has_filter($flag, '__return_true') === false) {
                add_filter($flag, '__return_true');
                $added_flags[] = $flag;
            }
        }
        $archive    = EED_Events_Archive::instance();
        $list_query = null;
        try {
            $archive->event_list();
            $list_query = new EventListQuery($args + EventListRenderer::DEFAULT_ARGS);
            $wp_query   = $list_query;
            $archive->template_include($template);
            return (string) EEH_Template::locate_template($template);
        } finally {
            $wp_query = $saved_query;
            $this->restoreGlobalPost($saved_post);
            if ($list_query instanceof EventListQuery) {
                $list_query->removeFilters();
            }
            if (! $had_archive_filters) {
                EED_Events_Archive::remove_all_events_archive_filters();
            }
            if (! $had_query_filters) {
                EEH_Event_Query::remove_query_filters();
            }
            foreach ($added_flags as $flag) {
                remove_filter($flag, '__return_true');
            }
        }
    }


    private function restoreGlobalPost(?WP_Post $saved_post): void
    {
        if ($saved_post === null) {
            unset($GLOBALS['post']);
            return;
        }
        $GLOBALS['post'] = $saved_post;
        setup_postdata($saved_post);
    }
}
