<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;
use WP_Post;
use WP_Screen;

/**
 * Class WordPressPageEditorEdit
 * Returns true when the current request is for the WordPress Page Editor admin page while editing an existing page
 *
 * @package EventEspresso\core\domain\entities\routing\specifications\admin
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
        global $pagenow;
        return $pagenow
               && $pagenow === 'plugins.php'
               && $this->request->getRequestParam('post_type', 'post') === 'page'
               && $this->request->getRequestParam('action') === 'edit';
    }
}
