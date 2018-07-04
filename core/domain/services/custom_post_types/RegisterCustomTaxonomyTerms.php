<?php

namespace EventEspresso\core\domain\services\custom_post_types;

use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyTerm;
use WP_Post;

/**
 * Class RegisterCustomTaxonomyTerms
 * Handles the actual registration for each of Event Espresso's Taxonomy Terms
 *
 * @package EventEspresso\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomTaxonomyTerms
{

    /**
     * @var array[] $custom_taxonomy_terms
     */
    public $custom_taxonomy_terms = array();


    /**
     * RegisterCustomTaxonomyTerms constructor.
     */
    public function __construct()
    {
        // hook into save_post so that we can make sure that the default terms get saved on publish of registered cpts
        // IF they don't have a term for that taxonomy set.
        add_action('save_post', array($this, 'saveDefaultTerm'), 100, 2);
        do_action(
            'AHEE__EventEspresso_core_domain_services_custom_post_types_RegisterCustomTaxonomyTerms__construct_end',
            $this
        );
    }


    public function registerCustomTaxonomyTerms()
    {
        // setup default terms in any of our taxonomies (but only if we're in admin).
        // Why not added via register_activation_hook?
        // Because it's possible that in future iterations of EE we may add new defaults for specialized taxonomies
        // (think event_types) and register_activation_hook only reliably runs when a user manually activates the plugin.
        // Keep in mind that this will READ these terms if they are deleted by the user.  Hence MUST use terms.
        // if ( is_admin() ) {
        // $this->set_must_use_event_types();
        // }
        // set default terms
        $this->registerCustomTaxonomyTerm(
            'espresso_event_type',
            'single-event',
            array('espresso_events')
        );
    }


    /**
     * Allows us to set what the default will be for terms when a cpt is PUBLISHED.
     *
     * @param string $taxonomy  The taxonomy we're using for the default term
     * @param string $term_slug The slug of the term that will be the default.
     * @param array  $cpt_slugs An array of custom post types we want the default assigned to
     */
    public function registerCustomTaxonomyTerm($taxonomy, $term_slug, array $cpt_slugs = array())
    {
        $this->custom_taxonomy_terms[][ $term_slug ] = new CustomTaxonomyTerm(
            $taxonomy,
            $term_slug,
            $cpt_slugs
        );
    }


    /**
     * hooked into the wp 'save_post' action hook for setting our default terms found in the $_default_terms property
     *
     * @param  int     $post_id ID of CPT being saved
     * @param  WP_Post $post    Post object
     * @return void
     */
    public function saveDefaultTerm($post_id, WP_Post $post)
    {
        if (empty($this->custom_taxonomy_terms)) {
            return;
        }
        // no default terms set so lets just exit.
        foreach ($this->custom_taxonomy_terms as $custom_taxonomy_terms) {
            foreach ($custom_taxonomy_terms as $custom_taxonomy_term) {
                if ($post->post_status === 'publish'
                    && $custom_taxonomy_term instanceof CustomTaxonomyTerm
                    && in_array($post->post_type, $custom_taxonomy_term->customPostTypeSlugs(), true)
                ) {
                    // note some error proofing going on here to save unnecessary db queries
                    $taxonomies = get_object_taxonomies($post->post_type);
                    foreach ($taxonomies as $taxonomy) {
                        $terms = wp_get_post_terms($post_id, $taxonomy);
                        if (empty($terms) && $taxonomy === $custom_taxonomy_term->taxonomySlug()) {
                            wp_set_object_terms(
                                $post_id,
                                array($custom_taxonomy_term->termSlug()),
                                $taxonomy
                            );
                        }
                    }
                }
            }
        }
    }


    /**
     * @return void
     */
    public function setMustUseEventTypes()
    {
        $term_details = array(
            // Attendee's register for the first date-time only
            'single-event'    => array(
                'term' => esc_html__('Single Event', 'event_espresso'),
                'desc' => esc_html__(
                    'A single event that spans one or more consecutive days.',
                    'event_espresso'
                ),
            ),
            // example: a party or two-day long workshop
            // Attendee's can register for any of the date-times
            'multi-event'     => array(
                'term' => esc_html__('Multi Event', 'event_espresso'),
                'desc' => esc_html__(
                    'Multiple, separate, but related events that occur on consecutive days.',
                    'event_espresso'
                ),
            ),
            // example: a three day music festival or week long conference
            // Attendee's register for the first date-time only
            'event-series'    => array(
                'term' => esc_html__('Event Series', 'event_espresso'),
                'desc' => esc_html__(
                    ' Multiple events that occur over multiple non-consecutive days.',
                    'event_espresso'
                ),
            ),
            // example: an 8 week introduction to basket weaving course
            // Attendee's can register for any of the date-times.
            'recurring-event' => array(
                'term' => esc_html__('Recurring Event', 'event_espresso'),
                'desc' => esc_html__(
                    'Multiple events that occur over multiple non-consecutive days.',
                    'event_espresso'
                ),
            ),
            // example: a yoga class
            'ongoing'         => array(
                'term' => esc_html__('Ongoing Event', 'event_espresso'),
                'desc' => esc_html__(
                    'An "event" that people can purchase tickets to gain access for anytime for this event regardless of date times on the event',
                    'event_espresso'
                ),
            )
            // example: access to a museum
            // 'walk-in' => array( esc_html__('Walk In', 'event_espresso'), esc_html__('Single datetime and single entry recurring events. Attendees register for one or multiple datetimes individually.', 'event_espresso') ),
            // 'reservation' => array( esc_html__('Reservation', 'event_espresso'), esc_html__('Reservations are created by specifying available datetimes and quantities. Attendees choose from the available datetimes and specify the quantity available (if the maximum is greater than 1)') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
            // 'multiple-session' => array( esc_html__('Multiple Session', 'event_espresso'), esc_html__('Multiple event, multiple datetime, hierarchically organized, custom entry events. Attendees may be required to register for a parent event before being allowed to register for child events. Attendees can register for any combination of child events as long as the datetimes do not conflict. Parent and child events may have additional fees or registration questions.') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
            // 'appointment' => array( esc_html__('Appointments', 'event_espresso'), esc_html__('Time slotted events where datetimes are generally in hours or minutes. For example, attendees can register for a single 15 minute or 1 hour time slot and this type of availability frequently reoccurs.', 'event_espresso') )
        );
        $this->setMustUseTerms('espresso_event_type', $term_details);
    }


    /**
     * wrapper method for handling the setting up of initial terms in the db (if they don't already exist).
     * Note this should ONLY be used for terms that always must be present.  Be aware that if an initial term is
     * deleted then it WILL be recreated.
     *
     * @param string $taxonomy     The name of the taxonomy
     * @param array  $term_details An array of term details indexed by slug and containing Name of term, and
     *                             description as the elements in the array
     * @return void
     */
    public function setMustUseTerms($taxonomy, $term_details)
    {
        $term_details = (array) $term_details;
        foreach ($term_details as $slug => $details) {
            if (isset($details['term'], $details['desc']) && ! term_exists($slug, $taxonomy)) {
                $insert_arr = array(
                    'slug'        => $slug,
                    'description' => $details['desc'],
                );
                wp_insert_term($details['term'], $taxonomy, $insert_arr);
            }
        }
    }
}
