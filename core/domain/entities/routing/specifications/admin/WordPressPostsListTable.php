<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class WordPressPostsListTable
 * Returns true when the current request is for the WordPress Posts List table admin page
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
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
        global $pagenow;
        return $pagenow
               && $pagenow === 'edit.php'
               && $this->request->getRequestParam('post_type', 'post') === 'post';
    }
}
