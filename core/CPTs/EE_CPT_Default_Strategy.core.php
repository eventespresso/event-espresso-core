<?php

/**
 * Class EE_CPT_Default_Strategy
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 */
class EE_CPT_Default_Strategy
{
    /**
     * CPT details from CustomPostTypeDefinitions for specific post type
     */
    protected array $CPT;


    /**
     * @param WP_Query $wp_query
     * @param array    $CPT
     */
    public function __construct(WP_Query $wp_query, array $CPT = [])
    {
        $this->CPT = $CPT;
    }


    /**
     *    pre_get_posts
     *
     * @param WP_Query $wp_query
     * @return    WP_Query
     */
    public function pre_get_posts(WP_Query $wp_query): WP_Query
    {
        return $wp_query;
    }


    /**
     *    wp
     *
     * @param WP_Post[] $posts
     * @param WP_Query  $wp_query
     * @return    WP_Post[]
     */
    public function the_posts(array $posts, WP_Query $wp_query): array
    {
        return $posts;
    }


    /**
     * @param mixed  $meta_value
     * @param int    $object_id
     * @param string $meta_key
     * @param bool   $single
     * @param string $meta_type
     * @return mixed
     */
    public function get_EE_post_type_metadata(
        $meta_value,
        int $object_id,
        string $meta_key,
        bool $single,
        string $meta_type
    ) {
        return $meta_value;
    }
}
