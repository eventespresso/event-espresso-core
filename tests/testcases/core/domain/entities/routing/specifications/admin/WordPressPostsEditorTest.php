<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsEditor;
use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsEditorAddNew;
use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsEditorEdit;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\MultiRouteSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * WordPressPostsEditorTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorTest extends MultiRouteSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $server
     * @since 4.9.71.p
     * @return WordPressPostsEditor
     * @throws InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params, array $server)
    {
        $request = $this->getRequest($request_params, array(), array(), $server);
        return new WordPressPostsEditor(
            new WordPressPostsEditorEdit($request),
            new WordPressPostsEditorAddNew($request),
            $request
        );
    }

    /**
     * @since 4.9.71.p
     * @throws AssertionFailedError
     * @throws InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        global $pagenow;

        $pagenow = 'post.php';
        $route_match_specification = $this->getMultiRouteSpecification(
            [
                'post_type' => 'post',
                'action'    => 'edit',
            ],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            ['post_type' => 'post'],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $pagenow = 'post-new.php';
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'custom-post-type'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $pagenow = 'telephone-post';
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/telephone-post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
