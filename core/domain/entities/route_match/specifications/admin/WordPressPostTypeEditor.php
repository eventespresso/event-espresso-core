<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class WordPressPostTypeEditor
 * Returns true when the current request is for the WordPress Post Editor admin page
 * regardless of the post type or action
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPostTypeEditor extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos($this->request->requestUri(), 'wp-admin/post.php') !== false
            || strpos($this->request->requestUri(), 'wp-admin/post-new.php') !== false;
    }
}
