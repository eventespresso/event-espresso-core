<?php

namespace EventEspresso\tests\testcases\core\domain\entities\routing\specifications\admin;

use EventEspresso\core\domain\entities\routing\specifications\admin\WordPressPostsListTable;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\tests\testcases\core\domain\entities\routing\specifications\RouteMatchSpecificationTestBase;
use PHPUnit\Framework\AssertionFailedError;

/**
 * WordPressPostsListTableTest
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class WordPressPostsListTableTest extends RouteMatchSpecificationTestBase
{

    /**
     * @param array $request_params
     * @param array $server
     * @return WordPressPostsListTable
     * @since 4.9.71.p
     */
    public function getMultiRouteSpecification(array $request_params, array $server)
    {
        return new WordPressPostsListTable(
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
        global $pagenow;
        $pagenow = 'edit.php';
        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'post'),
            array('REQUEST_URI' => 'wp-admin/edit.php')
        );
        $this->assertTrue($route_match_specification->isMatchingRoute());

        $route_match_specification = $this->getMultiRouteSpecification(
            array('post_type' => 'custom-post-type'),
            array('REQUEST_URI' => 'wp-admin/edit.php')
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());

        $pagenow = 'post.php';
        $route_match_specification = $this->getMultiRouteSpecification(
            ['post_type' => 'post'],
            ['REQUEST_URI' => 'wp-admin/post.php']
        );
        $this->assertFalse($route_match_specification->isMatchingRoute());
    }
}
