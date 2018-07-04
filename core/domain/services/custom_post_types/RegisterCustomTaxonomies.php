<?php

namespace EventEspresso\core\domain\services\custom_post_types;

use DomainException;
use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use WP_Error;

/**
 * Class RegisterCustomTaxonomies
 * Handles the actual registration for each of Event Espresso's Taxonomies
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
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
     * @param string $taxonomy_name      , eg 'books'
     * @param string $singular_name      internationalized singular name
     * @param string $plural_name        internationalized plural name
     * @param array  $override_arguments like $args on http://codex.wordpress.org/Function_Reference/register_taxonomy
     * @throws DomainException
     */
    public function registerCustomTaxonomy($taxonomy_name, $singular_name, $plural_name, array $override_arguments)
    {
        $result = register_taxonomy(
            $taxonomy_name,
            null,
            $this->prepareArguments(
                $singular_name,
                $plural_name,
                $override_arguments
            )
        );
        if ($result instanceof WP_Error) {
            throw new DomainException($result->get_error_message());
        }
    }


    /**
     * @param string $singular_name
     * @param string $plural_name
     * @param array  $override_arguments
     * @since 4.9.62.p
     * @return array
     */
    protected function prepareArguments($singular_name, $plural_name, array $override_arguments)
    {
        $arguments = array(
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
            'map_meta_cap'      => true,
        );
        if ($override_arguments) {
            if (isset($override_args['labels'])) {
                $labels = array_merge($arguments['labels'], $override_arguments['labels']);
                $arguments['labels'] = $labels;
            }
            $arguments = array_merge($arguments, $override_arguments);
        }
        return $arguments;
    }
}
