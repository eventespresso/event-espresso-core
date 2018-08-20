<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class WordPressPageEditorAddNew
 * Returns true when the current request is for the WordPress Page Editor admin page while creating a new page
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPageEditorAddNew extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return strpos($this->request->requestUri(), 'wp-admin/post-new.php') !== false
            && $this->request->getRequestParam('post_type', 'post') === 'page';
    }
}
