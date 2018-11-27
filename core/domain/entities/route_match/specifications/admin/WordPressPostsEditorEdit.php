<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;
use WP_Post;

/**
 * Class WordPressPostsEdit
 * Returns true when the current request is for the WordPress Post Editor admin page while editing an existing post
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorEdit extends RouteMatchSpecification
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
                $this->request->getRequestParam('post_type', 'post') === 'post'
                || (
                    $post instanceof WP_Post
                    && $post->post_type === 'post'
                )
            )
            && $this->request->getRequestParam('action') === 'edit';
    }
}
