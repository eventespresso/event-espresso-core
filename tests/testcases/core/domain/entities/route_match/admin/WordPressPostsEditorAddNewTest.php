<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsEditorAddNew;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * WordPressPostsEditorAddNewTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsEditorAddNewTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $server
     * @since 4.9.71.p
     * @return WordPressPostsEditorAddNew
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params, array $server)
    {
        return new WordPressPostsEditorAddNew(
            $this->getRequest($request_params, array(), array(), $server)
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
