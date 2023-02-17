<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class EspressoAttendeePostTypeEditor
 * Returns true when the current request is for the EE Attendee CPT Editor admin page
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoAttendeePostTypeEditor extends RouteMatchSpecification
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
               && $this->request->getRequestParam('page') === 'espresso_registrations'
               && $this->request->getRequestParam('action') === 'edit_attendee';
    }
}
