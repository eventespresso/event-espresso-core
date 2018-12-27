<?php

/**
 * Class EE_CPT_Default_Strategy
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 *
 */
class EE_CPT_Default_Strategy
{


    /**
     * $CPT - the current page, if it utilizes CPTs
     *
     * @var    object
     * @access    protected
     */
    protected $CPT = null;


    /**
     *    class constructor
     *
     * @access    private
     * @param    array $arguments
     * @return    \EE_CPT_Default_Strategy
     */
    public function __construct($arguments = array())
    {
        $this->CPT = isset($arguments['CPT']) ? $arguments['CPT'] : null;
    }


    /**
     *    pre_get_posts
     *
     * @access    public
     * @param    \WP_Query $WP_Query
     * @return    \WP_Query
     */
    public function pre_get_posts(WP_Query $WP_Query)
    {
        if (! $WP_Query->is_main_query() && ! $WP_Query->is_archive()) {
            return $WP_Query;
        }
        return $WP_Query;
    }


    /**
     *    wp
     *
     * @access    public
     * @param    \WP_Post[] $posts
     * @param    \WP_Query  $WP_Query
     * @return    \WP_Post[]
     */
    public function the_posts($posts, WP_Query $WP_Query)
    {
        return $posts;
    }


    /**
     *    get_EE_post_type_metadata
     *
     * @access    public
     * @param mixed     $meta_value
     * @param    int    $post_id
     * @param    string $meta_key
     * @param    string $single
     * @return    mixed
     */
    public function get_EE_post_type_metadata($meta_value = null, $post_id, $meta_key, $single)
    {
        return $meta_value;
    }
}
