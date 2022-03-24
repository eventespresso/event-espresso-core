<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;
use WP_Post;

/**
 * Class WordPressPostsEdit
 * Returns true when the current request is for the WordPress Post Editor admin page while editing an existing post
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorEdit extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @return boolean
     * @since 4.9.71.p
     */
    public function isMatchingRoute()
    {
        global $pagenow;
        return $pagenow
               && $pagenow === 'post.php'
               && $this->request->getRequestParam('post_type', 'post') === 'post'
               && $this->request->getRequestParam('action') === 'edit';
    }
}
