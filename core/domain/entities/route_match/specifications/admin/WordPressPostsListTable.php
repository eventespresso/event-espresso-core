<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class WordPressPostsListTable
 * Returns true when the current request is for the WordPress Posts List table admin page
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsListTable extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos($this->request->requestUri(), 'wp-admin/edit.php') !== false
            && $this->request->getRequestParam('post_type', 'post') === 'post';
    }
}
