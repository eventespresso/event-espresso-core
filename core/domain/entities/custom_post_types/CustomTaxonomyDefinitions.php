<?php

namespace EventEspresso\core\domain\entities\custom_post_types;

use EEH_URL;

/**
 * Class CustomTaxonomyDefinitions
 * Information about Event Espresso's Taxonomies
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Darren Ethier / Brent Christensen
 * @since   4.9.62.p
 */
class CustomTaxonomyDefinitions
{

    /**
     * @var array $taxonomies
     */
    private $taxonomies;


    /**
     * EspressoCustomPostTypeDefinitions constructor.
     */
    public function __construct()
    {
        $this->setTaxonomies();
        add_filter('pre_term_description', array($this, 'filterCustomTermDescription'), 1, 2);
    }


    private function setTaxonomies()
    {
        $this->taxonomies = array(
            'espresso_event_categories' => array(
                'singular_name' => esc_html__('Event Category', 'event_espresso'),
                'plural_name'   => esc_html__('Event Categories', 'event_espresso'),
                'args'          => array(
                    'public'            => true,
                    'show_in_nav_menus' => true,
                    'show_in_rest'      => true,
                    'capabilities'      => array(
                        'manage_terms' => 'ee_manage_event_categories',
                        'edit_terms'   => 'ee_edit_event_category',
                        'delete_terms' => 'ee_delete_event_category',
                        'assign_terms' => 'ee_assign_event_category',
                    ),
                    'rewrite'           => array(
                        'slug' => EEH_URL::slugify(
                            __('event-category', 'event_espresso'),
                            'event-category'
                        )
                    ),
                ),
            ),
            'espresso_venue_categories' => array(
                'singular_name' => esc_html__('Venue Category', 'event_espresso'),
                'plural_name'   => esc_html__('Venue Categories', 'event_espresso'),
                'args'          => array(
                    'public'            => true,
                    'show_in_nav_menus' => false, // by default this doesn't show for decaf
                    'show_in_rest'      => true,
                    'capabilities'      => array(
                        'manage_terms' => 'ee_manage_venue_categories',
                        'edit_terms'   => 'ee_edit_venue_category',
                        'delete_terms' => 'ee_delete_venue_category',
                        'assign_terms' => 'ee_assign_venue_category',
                    ),
                    'rewrite'           => array(
                        'slug' => EEH_URL::slugify(
                            __('venue-category', 'event_espresso'),
                            'venue-category'
                        )
                    ),
                ),
            ),
            'espresso_event_type'       => array(
                'singular_name' => esc_html__('Event Type', 'event_espresso'),
                'plural_name'   => esc_html__('Event Types', 'event_espresso'),
                'args'          => array(
                    'public'       => true,
                    'show_ui'      => false,
                    'show_in_rest' => true,
                    'capabilities' => array(
                        'manage_terms' => 'ee_read_event_type',
                        'edit_terms'   => 'ee_edit_event_type',
                        'delete_terms' => 'ee_delete_event_type',
                        'assign_terms' => 'ee_assign_event_type',
                    ),
                    'rewrite'      => array(
                        'slug' => EEH_URL::slugify(
                            __('event-type', 'event_espresso'),
                            'event-type'
                        )
                    ),
                    'hierarchical' => true,
                ),
            ),
        );
    }


    /**
     * @return array
     */
    public function getCustomTaxonomyDefinitions()
    {
        return (array) apply_filters(
            'FHEE__EventEspresso_core_domain_entities_custom_post_types_TaxonomyDefinitions__getTaxonomies',
            // legacy filter applied for now,
            // later on we'll run a has_filter($tag) check and throw a doing_it_wrong() notice
            apply_filters(
                'FHEE__EE_Register_CPTs__get_taxonomies__taxonomies',
                $this->taxonomies
            )
        );
    }


    /**
     * @return array
     */
    public function getCustomTaxonomySlugs()
    {
        return array_keys($this->getCustomTaxonomyDefinitions());
    }


    /**
     * By default, WordPress strips all html from term taxonomy description content.
     * The purpose of this method is to remove that restriction
     * and ensure that we still run ee term taxonomy descriptions
     * through some full html sanitization equivalent to the post content field.
     * So first we remove default filter for term description
     * but we have to do this earlier before wp sets their own filter
     * because they just set a global filter on all term descriptions
     * before the custom term description filter.
     * Really sux.
     *
     * @param string $description The description content.
     * @param string $taxonomy    The taxonomy name for the taxonomy being filtered.
     * @return string
     */
    public function filterCustomTermDescription($description, $taxonomy)
    {
        // get a list of EE taxonomies
        $custom_taxonomies = $this->getCustomTaxonomySlugs();
        // only do our own thing if the taxonomy listed is an ee taxonomy.
        if (in_array($taxonomy, $custom_taxonomies, true)) {
            // remove default wp filter
            remove_filter('pre_term_description', 'wp_filter_kses');
            // sanitize THIS content.
            $description = wp_kses($description, wp_kses_allowed_html('post'));
        }
        return $description;
    }
}
