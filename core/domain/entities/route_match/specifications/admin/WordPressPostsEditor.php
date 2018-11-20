<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class WordPressPostsEditor
 * Composite MatchAnyRouteSpecification using WordPressPostsEditorEdit and WordPressPostsEditorAddNew
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for the WordPress Posts editor
 *      regardless of whether the user is editing or creating a new post
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditor extends MatchAnyRouteSpecification
{
    /**
     * WordPressPostsEditor constructor.
     *
     * @param WordPressPostsEditorEdit $edit_post_route_match
     * @param WordPressPostsEditorAddNew $create_post_route_match
     * @param RequestInterface           $request
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function __construct(
        WordPressPostsEditorEdit $edit_post_route_match,
        WordPressPostsEditorAddNew $create_post_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($edit_post_route_match, $create_post_route_match),
            $request
        );
    }
}
