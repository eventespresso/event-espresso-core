<?php

namespace EventEspresso\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\RouteMatchSpecification;

/**
 * Class EspressoEventsListTable
 * Returns true when the current request is for the Event List table admin page
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventsListTable extends RouteMatchSpecification
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
               && $this->request->getRequestParam('page') === 'espresso_events'
               && $this->request->getRequestParam('action', 'default') === 'default';
    }
}
