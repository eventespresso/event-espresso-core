<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class WordPressPluginsPage
 * Returns true when the current request is for the WordPress Plugins Page in the admin
 *
 * @package EventEspresso\core\domain\entities\routing\specifications\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class WordPressPluginsPage extends RouteMatchSpecification
{
    /**
     * @inheritDoc
     */
    public function isMatchingRoute()
    {
        return $this->request->isAdmin() && $this->request->currentPageIs('plugins.php');
    }
}
