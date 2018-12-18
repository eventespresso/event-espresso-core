<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EspressoPostTypeEditor
 * Composite MatchAnyRouteSpecification using EspressoStandardPostTypeEditor and EspressoAttendeePostTypeEditor
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for ANY EE CPT editor
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoPostTypeEditor extends MatchAnyRouteSpecification
{
    /**
     * EspressoEventEditor constructor.
     *
     * @param EspressoStandardPostTypeEditor $standard_route_match
     * @param EspressoAttendeePostTypeEditor $attendee_route_match
     * @param RequestInterface          $request
     * @throws InvalidEntityException
     */
    public function __construct(
        EspressoStandardPostTypeEditor $standard_route_match,
        EspressoAttendeePostTypeEditor $attendee_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($standard_route_match, $attendee_route_match),
            $request
        );
    }
}
