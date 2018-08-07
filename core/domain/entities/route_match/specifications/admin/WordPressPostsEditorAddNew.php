<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class WordPressPostsAddNew
 * Returns true when the current request is for the WordPress Post Editor admin page while creating a new post
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPostsEditorAddNew extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos($this->request->requestUri(),'wp-admin/post-new.php' ) !== false
            && $this->request->getRequestParam('post_type', 'post') === 'post';
    }
}
