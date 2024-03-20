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
    public string $taxonomy_slug;

    public string $term_slug;

    public array $custom_post_type_slugs;


    public function __construct(string $taxonomy_slug, string $term_slug, array $custom_post_type_slugs = [])
    {
        $this->taxonomy_slug          = $taxonomy_slug;
        $this->term_slug              = $term_slug;
        $this->custom_post_type_slugs = $custom_post_type_slugs;
    }


    public function taxonomySlug(): string
    {
        return $this->taxonomy_slug;
    }


    public function termSlug(): string
    {
        return $this->term_slug;
    }


    public function customPostTypeSlugs(): array
    {
        return $this->custom_post_type_slugs;
    }
}
