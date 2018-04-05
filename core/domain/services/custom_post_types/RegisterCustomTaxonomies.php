<?php

namespace EventEspresso\core\domain\services\custom_post_types;

use DomainException;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use WP_Error;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RegisterCustomTaxonomies
 * Handles the actual registration for each of Event Espresso's Taxonomies
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RegisterCustomTaxonomies
{

    /**
     * @var CustomTaxonomyDefinitions $custom_taxonomies
     */
    public $custom_taxonomies;


    /**
     * RegisterCustomTaxonomies constructor.
     *
     * @param CustomTaxonomyDefinitions $custom_taxonomies
     */
    public function __construct(CustomTaxonomyDefinitions $custom_taxonomies)
    {
        $this->custom_taxonomies = $custom_taxonomies;
    }


    /**
     * @return void
     * @throws DomainException
     */
    public function registerCustomTaxonomies()
    {
        $custom_taxonomies = $this->custom_taxonomies->getCustomTaxonomyDefinitions();
        foreach ($custom_taxonomies as $taxonomy => $tax) {
            $this->registerCustomTaxonomy(
                $taxonomy,
                $tax['singular_name'],
                $tax['plural_name'],
                $tax['args']
            );
        }
    }


    /**
     * Registers a custom taxonomy. Should be called before registering custom post types,
     * otherwise you should link the taxonomy to the custom post type using 'register_taxonomy_for_object_type'.
     *
     * @param string $taxonomy_name , eg 'books'
     * @param string $singular_name internationalized singular name
     * @param string $plural_name   internationalized plural name
     * @param array  $override_args like $args on http://codex.wordpress.org/Function_Reference/register_taxonomy
     * @throws DomainException
     */
    public function registerCustomTaxonomy($taxonomy_name, $singular_name, $plural_name, array $override_args)
    {
        $args = array(
            'hierarchical'      => true,
            'labels'            => array(
                'name'          => $plural_name,
                'singular_name' => $singular_name,
            ),
            'show_ui'           => true,
            'show_ee_ui'        => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'show_in_nav_menus' => false,
            'map_meta_cap'      => true
        );
        if (! empty($override_args)) {
            $args = array_merge_recursive($args, $override_args);
        }
        $result = register_taxonomy($taxonomy_name, null, $args);
        if ($result instanceof WP_Error) {
            throw new DomainException($result->get_error_message());
        }
    }
}
