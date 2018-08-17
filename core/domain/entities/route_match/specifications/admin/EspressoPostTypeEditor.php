<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class EspressoPostTypeEditor
 * Returns true when the current request is for an EE CPT Editor admin page while creating a new event
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoPostTypeEditor extends RouteMatchSpecification
{
    /**
     * returns true if current request matches specification
     *
     * @since $VID:$
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return $this->request->getMatch('espresso_*' ) !== false
            && (
                $this->request->getRequestParam('action') === 'edit'
                || $this->request->getRequestParam('action') === 'create_new'
            );
    }
}
