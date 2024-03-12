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
     * @var    array
     * @access    protected
     */
    protected $CPT = null;


    /**
     * @param array $arguments
     */
    public function __construct(array $arguments = [])
    {
        $this->CPT = $arguments['CPT'] ?? null;
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
