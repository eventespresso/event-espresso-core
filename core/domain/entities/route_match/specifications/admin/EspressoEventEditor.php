<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EspressoEventEditor
 * Composite MatchAnyRouteSpecification using EspressoEventEditorEdit and EspressoEventEditorAddNew
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for the Espresso Event editor
 *      regardless of whether the user is editing or creating a new event
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class EspressoEventEditor extends MatchAnyRouteSpecification
{
    /**
     * EspressoEventEditor constructor.
     *
     * @param EspressoEventEditorEdit   $edit_event_route_match
     * @param EspressoEventEditorAddNew $create_event_route_match
     * @param RequestInterface          $request
     * @throws InvalidEntityException
     */
    public function __construct(
        EspressoEventEditorEdit $edit_event_route_match,
        EspressoEventEditorAddNew $create_event_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($edit_event_route_match, $create_event_route_match),
            $request
        );
    }
}
