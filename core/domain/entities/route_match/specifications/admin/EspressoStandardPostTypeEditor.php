<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\RouteMatchSpecification;

/**
 * Class EspressoStandardPostTypeEditor
 * Returns true when the current request is for a standard EE CPT Editor admin page while creating or editing an EE CPT
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoStandardPostTypeEditor extends RouteMatchSpecification
{

    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute()
    {
        return $this->request->getMatch('espresso_*') !== false
               && (
                   $this->request->getRequestParam('action') === 'edit'
                   || $this->request->getRequestParam('action') === 'create_new'
               );
    }
}
