<?php

namespace EventEspresso\core\domain\services\custom_post_types;

use DomainException;
use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use WP_Error;
use WP_Post_Type;

/**
 * Class RegisterCustomPostTypes
 * Handles the actual registration for each of Event Espresso's Custom Post Types
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Darren Ethier / Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomPostTypes
{

    /**
     * @var CustomPostTypeDefinitions $custom_post_types
     */
    public $custom_post_types;

    /**
     * @var WP_Post_Type[] $wp_post_types
     */
    public $wp_post_types = array();


    /**
     * RegisterCustomPostTypes constructor.
     *
     * @param CustomPostTypeDefinitions $custom_post_types
     */
    public function __construct(CustomPostTypeDefinitions $custom_post_types)
    {
        $this->custom_post_types = $custom_post_types;
    }


    /**
     * @return WP_Post_Type[]
     */
    public function getRegisteredCustomPostTypes()
    {
        return $this->wp_post_types;
    }


    /**
     * @return void
     * @throws DomainException
     */
    public function registerCustomPostTypes()
    {
        $custom_post_types = $this->custom_post_types->getDefinitions();
        foreach ($custom_post_types as $custom_post_type => $CPT) {
            $this->wp_post_types[ $custom_post_type ] = $this->registerCustomPostType(
                $custom_post_type,
                $CPT['singular_name'],
                $CPT['plural_name'],
                $CPT['singular_slug'],
                $CPT['plural_slug'],
                $CPT['args']
            );
        }
    }


    /**
     * Registers a new custom post type. Sets default settings given only the following params.
     * Returns the registered post type object, or an error object.
     *
     * @param string $post_type          the actual post type name
     *                                   IMPORTANT:
     *                                   this must match what the slug is for admin pages related to this CPT
     *                                   Also any models must use this slug as well
     * @param string $singular_name      a pre-internationalized string for the singular name of the objects
     * @param string $plural_name        a pre-internationalized string for the plural name of the objects
     * @param string $singular_slug
     * @param string $plural_slug
     * @param array  $override_arguments exactly like $args as described in
     *                                   http://codex.wordpress.org/Function_Reference/register_post_type
     * @return WP_Post_Type|WP_Error
     * @throws DomainException
     */
    public function registerCustomPostType(
        $post_type,
        $singular_name,
        $plural_name,
        $singular_slug = '',
        $plural_slug = '',
        array $override_arguments = array()
    ) {
        $wp_post_type = register_post_type(
            $post_type,
            $this->prepareArguments(
                $post_type,
                $singular_name,
                $plural_name,
                $singular_slug,
                $plural_slug,
                $override_arguments
            )
        );
        if ($wp_post_type instanceof WP_Error) {
            throw new DomainException($wp_post_type->get_error_message());
        }
        return $wp_post_type;
    }


    /**
     * @param string $post_type          the actual post type name
     * @param string $singular_name      a pre-internationalized string for the singular name of the objects
     * @param string $plural_name        a pre-internationalized string for the plural name of the objects
     * @param string $singular_slug
     * @param string $plural_slug
     * @param array  $override_arguments The default values set in this function will be overridden
     *                                   by whatever you set in $override_arguments
     * @return array
     */
    protected function prepareArguments(
        $post_type,
        $singular_name,
        $plural_name,
        $singular_slug,
        $plural_slug,
        array $override_arguments = array()
    ) {
        // verify plural slug and singular slug, if they aren't we'll use $singular_name and $plural_name
        $singular_slug = ! empty($singular_slug) ? $singular_slug : $singular_name;
        $plural_slug = ! empty($plural_slug) ? $plural_slug : $plural_name;
        $labels = $this->getLabels(
            $singular_name,
            $plural_name,
            $singular_slug,
            $plural_slug
        );
        // note the page_templates arg in the supports index is something specific to EE.
        // WordPress doesn't actually have that in their register_post_type api.
        $arguments = $this->getDefaultArguments($labels, $post_type, $plural_slug);
        if ($override_arguments) {
            if (isset($override_arguments['labels'])) {
                $labels = array_merge($arguments['labels'], $override_arguments['labels']);
            }
            $arguments = array_merge($arguments, $override_arguments);
            $arguments['labels'] = $labels;
        }
        return $arguments;
    }


    /**
     * @param string $singular_name
     * @param string $plural_name
     * @param string $singular_slug
     * @param string $plural_slug
     * @return array
     */
    private function getLabels($singular_name, $plural_name, $singular_slug, $plural_slug)
    {
        return array(
            'name'               => $plural_name,
            'singular_name'      => $singular_name,
            'singular_slug'      => $singular_slug,
            'plural_slug'        => $plural_slug,
            'add_new'            => sprintf(
                esc_html_x('Add %s', 'Add Event', 'event_espresso'),
                $singular_name
            ),
            'add_new_item'       => sprintf(
                esc_html_x('Add New %s', 'Add New Event', 'event_espresso'),
                $singular_name
            ),
            'edit_item'          => sprintf(
                esc_html_x('Edit %s', 'Edit Event', 'event_espresso'),
                $singular_name
            ),
            'new_item'           => sprintf(
                esc_html_x('New %s', 'New Event', 'event_espresso'),
                $singular_name
            ),
            'all_items'          => sprintf(
                esc_html_x('All %s', 'All Events', 'event_espresso'),
                $plural_name
            ),
            'view_item'          => sprintf(
                esc_html_x('View %s', 'View Event', 'event_espresso'),
                $singular_name
            ),
            'search_items'       => sprintf(
                esc_html_x('Search %s', 'Search Events', 'event_espresso'),
                $plural_name
            ),
            'not_found'          => sprintf(
                esc_html_x('No %s found', 'No Events found', 'event_espresso'),
                $plural_name
            ),
            'not_found_in_trash' => sprintf(
                esc_html_x('No %s found in Trash', 'No Events found in Trash', 'event_espresso'),
                $plural_name
            ),
            'parent_item_colon'  => '',
            'menu_name'          => $plural_name,
        );
    }


    /**
     * @param array  $labels
     * @param string $post_type
     * @param string $plural_slug
     * @return array
     */
    private function getDefaultArguments(array $labels, $post_type, $plural_slug)
    {
        return array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => false,
            'show_ee_ui'         => true,
            'show_in_menu'       => false,
            'show_in_nav_menus'  => false,
            'query_var'          => true,
            'rewrite'            => apply_filters(
                'FHEE__EventEspresso_core_domain_entities_custom_post_types_RegisterCustomPostTypes__getDefaultArguments__rewrite',
                // legacy filter applied for now,
                // later on we'll run a has_filter($tag) check and throw a doing_it_wrong() notice
                apply_filters(
                    'FHEE__EE_Register_CPTs__register_CPT__rewrite',
                    array('slug' => $plural_slug),
                    $post_type
                ),
                $post_type,
                $plural_slug
            ),
            'capability_type'    => 'post',
            'map_meta_cap'       => true,
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => null,
            'supports'           => array(
                'title',
                'editor',
                'author',
                'thumbnail',
                'excerpt',
                'custom-fields',
                'comments',
            ),
        );
    }
}
