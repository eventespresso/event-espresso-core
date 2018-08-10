<?php

namespace EventEspresso\tests\testcases\core\domain\entities\route_match\specifications\admin;

use EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostsListTable;
use EventEspresso\tests\testcases\core\domain\entities\route_match\RouteMatchSpecificationTestBase;

/**
 * WordPressPostsListTableTest
 *
 * @package EventEspresso\core\domain\entities\route_match\specifications
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPostsListTableTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $server
     * @return WordPressPostsListTable
     * @since $VID:$
     */
    public function getMultiRouteSpecification(array $request_params, array $server)
    {
        return new WordPressPostsListTable(
            $this->getRequest($request_params, array(), array(), $server)
        );
    }

    /**
     * @since $VID:$
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     */
    public function testIsMatchingRoute()
    {
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/edit.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/post.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'custom-post-type'),
            array('REQUEST_URI' => 'wp-admin/edit.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
