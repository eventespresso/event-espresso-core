<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class EspressoVenueEditorEdit
 * Returns true when the current request is for the Venue Editor admin page for an existing venue
 *
 * @package EventEspresso\core\domain\entities\routing\specifications\admin
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoVenueEditorEdit extends RouteMatchSpecification
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
               && $this->request->getRequestParam('page') === 'espresso_venues'
               && $this->request->getRequestParam('action') === 'edit';
    }
}
