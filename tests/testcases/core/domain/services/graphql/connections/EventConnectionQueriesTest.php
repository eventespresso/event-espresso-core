<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;

class EventConnectionQueriesTest extends GraphQLUnitTestCase
{
    public $current_time;
    public $current_date;
    public $current_date_gmt;
    public $created_post_ids;
    public $admin;
    public $subscriber;

    public function setUp()
    {
        parent::setUp();

        $this->current_time     = strtotime('- 1 day');
        $this->current_date     = date('Y-m-d H:i:s', $this->current_time);
        $this->current_date_gmt = gmdate('Y-m-d H:i:s', $this->current_time);
        $this->admin            = $this->factory()->user->create(
            [
                'role' => 'administrator',
            ]
        );
        $this->subscriber       = $this->factory()->user->create(
            [
                'role' => 'subscriber',
            ]
        );

        $this->created_post_ids = $this->create_posts();

        $this->app_context = new \WPGraphQL\AppContext();

        $this->app_info = new \GraphQL\Type\Definition\ResolveInfo(array());
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    public function createPostObject($args)
    {

        /**
         * Set up the $defaults
         */
        $defaults = [
            'post_author'   => $this->admin,
            'post_content'  => 'Test event content',
            'post_excerpt'  => 'Test excerpt',
            'post_status'   => 'publish',
            'post_title'    => 'Test Title',
            'post_type'     => 'espresso_events',
            'post_date'     => $this->current_date,
            'has_password'  => false,
            'post_password' => null,
        ];

        /**
         * Combine the defaults with the $args that were
         * passed through
         */
        $args = array_merge($defaults, $args);

        /**
         * Create the page
         */
        $post_id = $this->factory->post->create($args);

        /**
         * Update the _edit_last and _edit_lock fields to simulate a user editing the page to
         * test retrieving the fields
         *
         * @since 0.0.5
         */
        update_post_meta($post_id, '_edit_lock', $this->current_time . ':' . $this->admin);
        update_post_meta($post_id, '_edit_last', $this->admin);

        /**
         * Return the $id of the post_object that was created
         */
        return $post_id;
    }

    /**
     * Creates several posts (with different timestamps) for use in cursor query tests
     *
     * @param  int $count Number of posts to create.
     *
     * @return array
     */
    public function create_posts($count = 20)
    {

        // Create posts
        $created_posts = [];
        for ($i = 1; $i <= $count; $i ++) {
            // Set the date 1 minute apart for each post
            $date                = date('Y-m-d H:i:s', strtotime("-1 day +{$i} minutes"));
            $created_posts[ $i ] = $this->createPostObject(
                [
                    'post_type'   => 'espresso_events',
                    'post_date'   => $date,
                    'post_status' => 'publish',
                    'post_title'  => $i,
                ]
            );
        }

        return $created_posts;
    }

    public function eventsQuery($variables)
    {
        $query = 'query eventsQuery($first:Int $last:Int $after:String $before:String $where:RootQueryToEspressoEventConnectionWhereArgs ){
			espressoEvents( first:$first last:$last after:$after before:$before where:$where ) {
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
				edges {
					cursor
					node {
						id
						dbId
						name
						desc
					}
				}
				nodes {
				  id
				  dbId
				}
			}
		}';

        return do_graphql_request($query, 'eventsQuery', $variables);
    }

    public function testFirstEvent()
    {

        /**
         * Here we're querying the first post in our dataset
         */
        $variables = [
            'first' => 1,
        ];
        $results   = $this->eventsQuery($variables);

        /**
         * Let's query the first post in our data set so we can test against it
         */
        $first_post      = new \WP_Query(
            [
                'post_type'      => 'espresso_events',
                'posts_per_page' => 1,
            ]
        );
        $first_post_id   = $first_post->posts[0]->ID;
        $expected_cursor = \GraphQLRelay\Connection\ArrayConnection::offsetToCursor($first_post_id);
        $this->assertNotEmpty($results);
        $this->assertEquals(1, count($results['data']['espressoEvents']['edges']));
        $this->assertEquals($first_post_id, $results['data']['espressoEvents']['edges'][0]['node']['dbId']);
        $this->assertEquals($expected_cursor, $results['data']['espressoEvents']['edges'][0]['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoEvents']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoEvents']['pageInfo']['endCursor']);
        $this->assertEquals($first_post_id, $results['data']['espressoEvents']['nodes'][0]['dbId']);
        $this->assertEquals(false, $results['data']['espressoEvents']['pageInfo']['hasPreviousPage']);
        $this->assertEquals(true, $results['data']['espressoEvents']['pageInfo']['hasNextPage']);
    }
}
