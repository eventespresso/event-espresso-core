<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditorEdit;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * WordPressPostsEditorEditTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorEditTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $server
     * @since 4.9.71.p
     * @return WordPressPostsEditorEdit
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params, array $post_params, array $server)
    {
        return new WordPressPostsEditorEdit(
            $this->getRequest($request_params, $post_params, array(), $server)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        // with $_GET params
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'post_type' => 'post',
                'action' => 'edit',
            ),
            array(),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array(),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('action' => 'edit'),
            array(),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'post_type' => 'custom-post-type',
                'action' => 'edit',
            ),
            array(),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(
                'post_type' => 'post',
                'action' => 'edit',
            ),
            array(),
            array('REQUEST_URI' => 'wp-admin/telephone-post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        // with $_POST params
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array(
                'post_type' => 'post',
                'action' => 'edit',
            ),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array('action' => 'edit'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array(
                'post_type' => 'custom-post-type',
                'action' => 'edit',
            ),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array(
                'post_type' => 'post',
                'action' => 'edit',
            ),
            array('REQUEST_URI' => 'wp-admin/telephone-post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        // with $_GET && $_POST params
        $route_match_specification = $this->getMultiRouteSpecification(
            array('action' => 'edit'),
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('action' => 'edit'),
            array('post_type' => 'custom-post-type'),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('action' => 'edit'),
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/telephone-post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
// location: testcases/core/domain/entities/route_match/admin/WordPressPostsEditorEditTest.php
