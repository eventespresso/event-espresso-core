<?php

namespace EventEspresso\core\domain\services\wp_queries;

use EEH_Event_Query;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use WP_Query;

/**
 * Class EventListQuery
 * sets up a WordPress query
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.26
 */
class EventListQuery extends WP_Query
{
    private ?string $title = '';

    private int $limit = 10;

    private ?string $css_class = '';

    private bool $show_expired = false;

    private ?string $month = '';

    private ?string $category_slug = '';

    /**
     * @var array|string|null
     */
    private $order_by = [];

    private ?string $sort = '';

    private bool $show_title = true;


    /**
     * EE_Event_List_Query Constructor     *
     *
     * @param array $args
     */
    public function __construct($args = [])
    {
        $args = $this->parseArgs((array) $args);
        $this->setupEventQueryHelper();
        $this->setupFilters();
        $args = $this->getQueryArgs($args);
        // run the query
        parent::__construct($args);
    }


    /**
     * @param array $args
     * @return array
     */
    private function parseArgs(array $args): array
    {
        // incoming args could be a mix of WP query args + EE shortcode args
        foreach ($args as $property => $value) {
            // if the arg is a property of this class, then it's an EE shortcode arg
            if (property_exists($this, $property) && ! property_exists('WP_Query', $property)) {
                // get the property type
                $type = gettype($this->{$property});
                // set the property value
                switch ($type) {
                    case 'integer':
                        $this->{$property} = absint($value);
                        break;
                    case 'boolean':
                        $this->{$property} = filter_var($value, FILTER_VALIDATE_BOOLEAN);
                        break;
                    case 'string':
                        $this->{$property} = sanitize_text_field($value);
                        break;
                    default:
                        $this->{$property} = $value;
                        break;
                }
                // then remove it from the array of args that will later be passed to WP_Query()
                unset($args[ $property ]);
            }
        }
        return $args;
    }


    private function setupEventQueryHelper()
    {
        // add query filters
        EEH_Event_Query::add_query_filters();
        // set params that will get used by the filters
        EEH_Event_Query::set_query_params(
            $this->month,
            $this->category_slug,
            $this->show_expired,
            $this->order_by,
            $this->sort
        );
    }


    private function setupFilters()
    {
        // first off, let's remove any filters from previous queries
        remove_filter(
            'FHEE__archive_espresso_events_template__show_header',
            [$this, 'show_event_list_title']
        );
        remove_filter(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            [$this, 'event_list_title']
        );
        remove_all_filters('FHEE__content_espresso_events__event_class');
        // Event List Title ?
        add_filter(
            'FHEE__archive_espresso_events_template__show_header',
            [$this, 'show_event_list_title']
        );
        add_filter(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            [$this, 'event_list_title']
        );
        // add the css class
        add_filter(
            'FHEE__content_espresso_events__event_class',
            [$this, 'event_list_css']
        );
    }


    private function getQueryArgs(array $args): array
    {
        // the current "page" we are viewing
        $paged = max(1, get_query_var('paged'));
        // Force these args
        return array_merge(
            $args,
            [
                'post_type'              => EspressoPostType::EVENTS,
                'posts_per_page'         => $this->limit,
                'update_post_term_cache' => false,
                'update_post_meta_cache' => false,
                'paged'                  => $paged,
                'offset'                 => ($paged - 1) * $this->limit,
            ]
        );
    }

    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps


    /**
     * show_event_list_title
     *
     * @return boolean
     */
    public function show_event_list_title(): bool
    {
        return filter_var($this->show_title, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * callback for FHEE__archive_espresso_events_template__upcoming_events_h1 filter
     *
     * @param string $event_list_title
     * @return    string
     */
    public function event_list_title(string $event_list_title = ''): string
    {
        if (! empty($this->title)) {
            return $this->title;
        }
        return $event_list_title;
    }


    /**
     * callback for FHEE__content_espresso_events__event_class filter
     *
     * @param string $event_list_css
     * @return string
     */
    public function event_list_css(string $event_list_css = ''): string
    {
        $event_list_css .= ! empty($event_list_css) ? ' ' : '';
        $event_list_css .= ! empty($this->css_class) ? $this->css_class : '';
        $event_list_css .= ! empty($event_list_css) ? ' ' : '';
        $event_list_css .= ! empty($this->category_slug) ? $this->category_slug : '';
        return $event_list_css;
    }
    // phpcs:enable
}
