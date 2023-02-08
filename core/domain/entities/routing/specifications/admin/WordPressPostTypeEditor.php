<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class WordPressPostTypeEditor
 * Returns true when the current request is for the WordPress Post Editor admin page
 * regardless of the post type or action
 *
 * @package EventEspresso\core\domain\entities\routing\specifications\admin
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostTypeEditor extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        global $pagenow;
        return $pagenow && ($pagenow === 'post.php' || $pagenow === 'post-new.php');
    }
}
