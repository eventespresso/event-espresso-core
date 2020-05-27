<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsEditorEdit;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\RouteMatchSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * WordPressPostsEditorEditTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorEditTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $post_params
     * @param array $server
     * @return WordPressPostsEditorEdit
     * @since 4.9.71.p
     */
    public function getMultiRouteSpecification(array $request_params, array $post_params, array $server)
    {
        return new WordPressPostsEditorEdit(
            $this->getRequest($request_params, $post_params, array(), $server)
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
            [
                'post_type' => 'custom-post-type',
                'action'    => 'edit',
            ],
            [],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        // with $_POST params
        $route_match_specification = $this->getMultiRouteSpecification(
            [],
            [
                'post_type' => 'post',
                'action'    => 'edit',
            ],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            [],
            ['post_type' => 'post'],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            [],
            [
                'post_type' => 'custom-post-type',
                'action'    => 'edit',
            ],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        // with $_GET && $_POST params
        $route_match_specification = $this->getMultiRouteSpecification(
            ['action' => 'edit'],
            ['post_type' => 'post'],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            ['action' => 'edit'],
            ['post_type' => 'custom-post-type'],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $pagenow = 'post-new.php';
        $route_match_specification = $this->getMultiRouteSpecification(
            array('action' => 'edit'),
            array(),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            array(),
            array('action' => 'edit'),
            array('REQUEST_URI' => 'wp-admin/post-new.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $pagenow = 'telephone-post';
        $route_match_specification = $this->getMultiRouteSpecification(
            [
                'post_type' => 'post',
                'action'    => 'edit',
            ],
            [],
            ['REQUEST_URI' => 'wp-admin/telephone-post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            [],
            [
                'post_type' => 'post',
                'action'    => 'edit',
            ],
            ['REQUEST_URI' => 'wp-admin/telephone-post.php']
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
// location: testcases/core/domain/entities/routing/admin/WordPressPostsEditorEditTest.php
