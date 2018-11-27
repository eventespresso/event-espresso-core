<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EspressoEventEditor
 * Composite MatchAnyRouteSpecification using EspressoVenueEditorEdit and EspressoVenueEditorAddNew
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for the Espresso Venue editor
 *      regardless of whether the user is editing or creating a new venue
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoVenueEditor extends MatchAnyRouteSpecification
{
    /**
     * EspressoVenueEditor constructor.
     *
     * @param EspressoVenueEditorEdit $edit_venue_route_match
     * @param EspressoVenueEditorAddNew $create_venue_route_match
     * @param RequestInterface          $request
     * @throws InvalidEntityException
     */
    public function __construct(
        EspressoVenueEditorEdit $edit_venue_route_match,
        EspressoVenueEditorAddNew $create_venue_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($edit_venue_route_match, $create_venue_route_match),
            $request
        );
    }
}
