<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class WordPressPostsEditor
 * Composite MatchAnyRouteSpecification using WordPressPostsEdit and WordPressPostsAddNew
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for the WordPress Posts editor
 *      regardless of whether the user is editing or creating a new post
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPostsEditor extends MatchAnyRouteSpecification
{
    /**
     * WordPressPostsEditor constructor.
     *
     * @param WordPressPostsEditorEdit   $edit_event_route_match
     * @param WordPressPostsEditorAddNew $create_event_route_match
     * @param RequestInterface           $request
     */
    public function __construct(
        WordPressPostsEditorEdit $edit_event_route_match,
        WordPressPostsEditorAddNew $create_event_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($edit_event_route_match, $create_event_route_match),
            $request
        );
    }
}
