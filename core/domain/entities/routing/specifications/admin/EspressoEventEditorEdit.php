<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class EspressoEventEditorEdit
 * Returns true when the current request is for the Event Editor admin page for an existing event
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditorEdit extends RouteMatchSpecification
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
               && $pagenow === 'admin.php'
               && $this->request->isAdmin()
               && $this->request->getRequestParam('page') === 'espresso_events'
               && $this->request->getRequestParam('action', 'edit') === 'edit';
    }
}
