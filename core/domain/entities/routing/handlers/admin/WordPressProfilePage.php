<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;

/**
 * Class WordPressProfilePage
 * detects and executes logic for the WordPress Profile (users) admin page
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.4.p
 */
class WordPressProfilePage extends AdminRoute
{
    /**
     * @return CapCheckInterface
     */
    public function getCapCheck()
    {
        return new CapCheck('read', 'access WordPress profile route');
    }


    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        global $pagenow;
        return $pagenow === 'profile.php' && ($this->request->isAdmin() || $this->request->isAdminAjax());
    }
}
