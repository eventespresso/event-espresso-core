<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditor;
use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditorAddNew;
use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditorEdit;
use EventEspresso\tests\testcases\core\domain\entities\route_match\MultiRouteSpecificationTestBase;

/**
 * WordPressPostsEditorTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
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
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
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
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'post_type' => 'post',
                'action' => 'edit',
            ),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'custom-post-type'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/telephone-post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
