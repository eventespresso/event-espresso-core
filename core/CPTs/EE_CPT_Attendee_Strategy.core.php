<?php
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author            Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_CPT_Attendee_Strategy
 *
 * @package               Event Espresso
 * @subpackage            /core/
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
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
     *    class constructor
     *
     * @access    public
     * @param    array $arguments
     * @return \EE_CPT_Attendee_Strategy
     */
    public function __construct($arguments = array())
    {
        $this->CPT = isset($arguments['CPT']) ? $arguments['CPT'] : null;
        $WP_Query = isset($arguments['WP_Query']) ? $arguments['WP_Query'] : null;
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
