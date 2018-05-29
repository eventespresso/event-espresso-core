<?php

namespace EventEspresso\core\domain\entities\custom_post_types;

/**
 * Class CustomTaxonomyTerm
 * Simple class for representing a custom taxonomy term
 *
 * @package EventEspresso\core\domain\entities\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class CustomTaxonomyTerm
{

    /**
     * @var string $taxonomy_slug
     */
    public $taxonomy_slug;

    /**
     * @var string $term_slug
     */
    public $term_slug;

    /**
     * @var array $custom_post_type_slugs
     */
    public $custom_post_type_slugs;


    /**
     * CustomTaxonomyTerm constructor.
     *
     * @param string $taxonomy_slug
     * @param string $term_slug
     * @param array  $custom_post_type_slugs
     */
    public function __construct($taxonomy_slug, $term_slug, array $custom_post_type_slugs = array())
    {
        $this->taxonomy_slug = $taxonomy_slug;
        $this->term_slug = $term_slug;
        $this->custom_post_type_slugs = $custom_post_type_slugs;
    }


    /**
     * @return string
     */
    public function taxonomySlug()
    {
        return $this->taxonomy_slug;
    }


    /**
     * @return string
     */
    public function termSlug()
    {
        return $this->term_slug;
    }


    /**
     * @return array
     */
    public function customPostTypeSlugs()
    {
        return $this->custom_post_type_slugs;
    }
}
