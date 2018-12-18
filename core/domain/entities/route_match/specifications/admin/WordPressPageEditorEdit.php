<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;
use WP_Post;

/**
 * Class WordPressPageEditorEdit
 * Returns true when the current request is for the WordPress Page Editor admin page while editing an existing page
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPageEditorEdit extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        global $post;
        return strpos($this->request->requestUri(), 'wp-admin/post.php') !== false
            && (
                $this->request->getRequestParam('post_type', 'post') === 'page'
                || (
                    $post instanceof WP_Post
                    && $post->post_type === 'page'
                )
            )
            && $this->request->getRequestParam('action') === 'edit';
    }
}
