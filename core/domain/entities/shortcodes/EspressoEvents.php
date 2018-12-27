<?php

namespace EventEspresso\core\domain\entities\shortcodes;

use EED_Events_Archive;
use EEH_Template;
use EventEspresso\core\domain\services\wp_queries\EventListQuery;
use EventEspresso\core\services\shortcodes\EspressoShortcode;

/**
 * Class EspressoEvents
 * processes the [ESPRESSO_EVENTS] shortcode and returns a list of events
 * usage:
 *    [ESPRESSO_EVENTS]
 *    [ESPRESSO_EVENTS title="My Super Event"]
 *    [ESPRESSO_EVENTS limit=5]
 *    [ESPRESSO_EVENTS css_class="my-custom-class"]
 *    [ESPRESSO_EVENTS month="April 2014"]
 *    [ESPRESSO_EVENTS show_expired=true]
 *    [ESPRESSO_EVENTS category_slug="free-events"]
 *    [ESPRESSO_EVENTS order_by="start_date,id"]
 *    [ESPRESSO_EVENTS sort="ASC"]
 *    [ESPRESSO_EVENTS show_title=true]
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.26
 */
class EspressoEvents extends EspressoShortcode
{


    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_EVENTS';
    }


    /**
     * the time in seconds to cache the results of the processShortcode() method
     * 0 means the processShortcode() results will NOT be cached at all
     *
     * @return int
     */
    public function cacheExpiration()
    {
        return 0;
    }


    /**
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * @return void
     */
    public function initializeShortcode()
    {
        EED_Events_Archive::instance()->event_list();
        $this->shortcodeHasBeenInitialized();
    }


    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     */
    public function processShortcode($attributes = array())
    {
        // grab attributes and merge with defaults
        $attributes = $this->getAttributes($attributes);
        // make sure we use the_excerpt()
        add_filter('FHEE__EES_Espresso_Events__process_shortcode__true', '__return_true');
        // apply query filters
        add_filter('FHEE__EEH_Event_Query__apply_query_filters', '__return_true');
        // run the query
        global $wp_query;
        // yes we have to overwrite the main wp query, but it's ok...
        // we're going to reset it again below, so everything will be Hunky Dory (amazing album)
        $wp_query = new EventListQuery($attributes);
        // check what template is loaded and load filters accordingly
        EED_Events_Archive::instance()->template_include('loop-espresso_events.php');
        // load our template
        $event_list = EEH_Template::locate_template(
            'loop-espresso_events.php',
            array(),
            true,
            true
        );
        // now reset the query and post data
        wp_reset_query();
        wp_reset_postdata();
        EED_Events_Archive::remove_all_events_archive_filters();
        // remove query filters
        remove_filter('FHEE__EEH_Event_Query__apply_query_filters', '__return_true');
        // pull our content from the output buffer and return it
        return $event_list;
    }


    /**
     * merge incoming attributes with filtered defaults
     *
     * @param array $attributes
     * @return array
     */
    private function getAttributes(array $attributes)
    {
        return array_merge(
            (array) apply_filters(
                'EES_Espresso_Events__process_shortcode__default_espresso_events_shortcode_atts',
                array(
                    'title'         => '',
                    'limit'         => 10,
                    'css_class'     => '',
                    'show_expired'  => false,
                    'month'         => '',
                    'category_slug' => '',
                    'order_by'      => 'start_date',
                    'sort'          => 'ASC',
                    'show_title'    => true,
                )
            ),
            $attributes
        );
    }


    /**
     * array for defining custom attribute sanitization callbacks,
     * where keys match keys in your attributes array,
     * and values represent the sanitization function you wish to be applied to that attribute.
     * So for example, if you had an integer attribute named "event_id"
     * that you wanted to be sanitized using absint(),
     * then you would pass the following for your $custom_sanitization array:
     *      array('event_id' => 'absint')
     *
     * @return array
     */
    protected function customAttributeSanitizationMap()
    {
        // the following get sanitized/whitelisted in EEH_Event_Query
        return array(
            'category_slug' => 'skip_sanitization',
            'show_expired'  => 'skip_sanitization',
            'order_by'      => 'skip_sanitization',
            'month'         => 'skip_sanitization',
            'sort'          => 'skip_sanitization',
        );
    }
}
