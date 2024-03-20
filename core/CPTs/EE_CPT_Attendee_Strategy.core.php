<?php

/**
 * EE_CPT_Attendee_Strategy
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_CPT_Attendee_Strategy
{
    /**
     * $CPT - the current page, if it utilizes CPTs
     *
     * @var array
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
     *    the_posts
     *
     * @access    public
     * @param          $posts
     * @param WP_Query $wp_query
     * @return    void
     */
    public function the_posts($posts, WP_Query $wp_query)
    {
        return $posts;
    }
}
