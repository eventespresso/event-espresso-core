<?php
namespace EventEspresso\core\domain\services\wp_queries;

use EEH_Event_Query;
use WP_Query;

defined('EVENT_ESPRESSO_VERSION') || exit;



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

    /**
     * @var string $title
     */
    private $title;

    /**
     * @var integer $limit
     */
    private $limit        = 10;

    /**
     * @var string $css_class
     */
    private $css_class;

    /**
     * @var boolean $show_expired
     */
    private $show_expired = false;

    /**
     * @var string $month
     */
    private $month;

    /**
     * @var string $category_slug
     */
    private $category_slug;

    /**
     * @var string $order_by
     */
    private $order_by;

    /**
     * @var string $sort
     */
    private $sort;

    /**
     * @var boolean $show_title
     */
    private $show_title = true;



    /**
     * EE_Event_List_Query Constructor     *
     *
     * @param array $args
     */
    public function __construct($args = array())
    {
        $args = $this->parseArgs((array)$args);
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
    private function parseArgs(array $args)
    {
        // incoming args could be a mix of WP query args + EE shortcode args
        foreach ($args as $property => $value) {
            // if the arg is a property of this class, then it's an EE shortcode arg
            if (property_exists($this, $property) && ! property_exists('WP_Query', $property)) {
                // set the property value
                $this->{$property} = $value;
                // then remove it from the array of args that will later be passed to WP_Query()
                unset($args[$property]);
            }
        }
        return $args;
    }



    private function setupEventQueryHelper()
    {
        //add query filters
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
            array($this, 'show_event_list_title')
        );
        remove_filter(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            array($this, 'event_list_title')
        );
        remove_all_filters('FHEE__content_espresso_events__event_class');
        // Event List Title ?
        add_filter(
            'FHEE__archive_espresso_events_template__show_header',
            array($this, 'show_event_list_title')
        );
        add_filter(
            'FHEE__archive_espresso_events_template__upcoming_events_h1',
            array($this, 'event_list_title'),
            10,
            1
        );
        // add the css class
        add_filter(
            'FHEE__content_espresso_events__event_class',
            array($this, 'event_list_css'),
            10,
            1
        );
    }



    private function getQueryArgs(array $args)
    {
        // the current "page" we are viewing
        $paged = max(1, get_query_var('paged'));
        // Force these args
        return array_merge(
            $args,
            array(
                'post_type'              => 'espresso_events',
                'posts_per_page'         => $this->limit,
                'update_post_term_cache' => false,
                'update_post_meta_cache' => false,
                'paged'                  => $paged,
                'offset'                 => ($paged - 1) * $this->limit,
            )
        );
    }



    /**
     * show_event_list_title
     *
     * @return boolean
     */
    public function show_event_list_title()
    {
        return filter_var(
            $this->show_title,
            FILTER_VALIDATE_BOOLEAN
        );
    }



    /**
     * callback for FHEE__archive_espresso_events_template__upcoming_events_h1 filter
     *
     * @param string $event_list_title
     * @return    string
     */
    public function event_list_title($event_list_title = '')
    {
        if ( ! empty($this->title)) {
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
    public function event_list_css($event_list_css = '')
    {
        $event_list_css .= ! empty($event_list_css) ? ' ' : '';
        $event_list_css .= ! empty($this->css_class) ? $this->css_class : '';
        $event_list_css .= ! empty($event_list_css) ? ' ' : '';
        $event_list_css .= ! empty($this->category_slug) ? $this->category_slug : '';
        return $event_list_css;
    }

}
// End of file EventListQuery.php
// Location: EventEspresso\core\domain\services\wp_queries/EventListQuery.php
