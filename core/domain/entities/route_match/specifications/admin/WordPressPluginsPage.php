<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class WordPressPluginsPage
 * Returns true when the current request is for the WordPress Plugins Page in the admin
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPluginsPage extends RouteMatchSpecification
{

    /**
     * @inheritDoc
     */
    public function isMatchingRoute()
    {
        return strpos($this->request->requestUri(), 'wp-admin/plugins.php') !== false;
    }
}