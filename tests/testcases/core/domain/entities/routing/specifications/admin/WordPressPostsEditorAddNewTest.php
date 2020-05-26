<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsEditorAddNew;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\RouteMatchSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * WordPressPostsEditorAddNewTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
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
     * @throws InvalidEntityException
     */
    public function getMultiRouteSpecification(array $request_params, array $server)
    {
        return new WordPressPostsEditorAddNew(
            $this->getRequest($request_params, array(), array(), $server)
        );
    }

    /**
     * @since 4.9.71.p
     * @throws AssertionFailedError
     * @throws InvalidEntityException
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
