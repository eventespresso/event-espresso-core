<?php

namespace EventEspresso\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\MatchAnyRouteSpecification;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class WordPressPageEditor
 * Composite MatchAnyRouteSpecification using WordPressPageEditorEdit and WordPressPageEditorAddNew
 * that will return true if either of the supplied Route Match Specifications returns true
 *  ie: returns true when the current request is for the WordPress Page editor
 *      regardless of whether the user is editing or creating a new page
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications\admin
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPageEditor extends MatchAnyRouteSpecification
{
    /**
     * WordPressPostsEditor constructor.
     *
     * @param WordPressPostsEditorEdit $edit_page_route_match
     * @param WordPressPostsEditorAddNew $create_page_route_match
     * @param RequestInterface           $request
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function __construct(
        WordPressPageEditorEdit $edit_page_route_match,
        WordPressPageEditorAddNew $create_page_route_match,
        RequestInterface $request
    ) {
        parent::__construct(
            array($edit_page_route_match, $create_page_route_match),
            $request
        );
    }
}
