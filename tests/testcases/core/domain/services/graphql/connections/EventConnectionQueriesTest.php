<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Event;

class EventConnectionQueriesTest extends BaseQueriesTest
{
    public $current_time;
    public $current_date;
    public $current_date_gmt;
    public $created_event_ids;

    public function setUp()
    {
        $this->model_name = 'Event';
        parent::setUp();

        $this->model = EEM_Event::instance();

        $this->current_time     = strtotime('- 1 day');
        $this->current_date     = date('Y-m-d H:i:s', $this->current_time);
        $this->current_date_gmt = gmdate('Y-m-d H:i:s', $this->current_time);

        $this->created_event_ids = $this->create_events();
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
    public function create_events($count = 20)
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
                        description
                    }
                }
                nodes {
                    id
                    dbId
                }
            }
        }';
        
        /**
         * Set the current user as the subscriber so we can test
         */
        wp_set_current_user($this->subscriber);

        return do_graphql_request($query, 'eventsQuery', $variables);
    }

    public function eventByQuery($variables)
    {
        $query = 'query GET_EVENT($id: ID!) {
            espressoEvent(id: $id, idType: DATABASE_ID) {
                id
                dbId
                description
                name
            }
        }';
        
        /**
         * Set the current user as the subscriber so we can test
         */
        wp_set_current_user($this->subscriber);

        return do_graphql_request($query, 'GET_EVENT', $variables);
    }

    public function testFirstEvent()
    {

        /**
         * Here we're querying the first event in our dataset
         */
        $variables = [
            'first' => 1,
            'where' => [
                'orderby' => [
                    [
                        'field' => 'TITLE',
                        'order' => 'DESC'
                    ]
                ]
            ]
        ];
        $results = $this->eventsQuery($variables);

        $events = $this->model->get_all(
            [
                'limit'    => 1,
                'order_by' => 'EVT_name'
            ]
        );

        $first_event     = reset($events);
        $first_event_id  = $first_event->ID();
        $expected_cursor = \GraphQLRelay\Connection\ArrayConnection::offsetToCursor($first_event_id);
        $this->assertNotEmpty($results);
        $this->assertEquals(1, count($results['data']['espressoEvents']['edges']));

        $first_edge = $results['data']['espressoEvents']['edges'][0];

        // fields
        $this->assertEquals($first_event_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_event->name(), $first_edge['node']['name']);
        $this->assertEquals($first_event->description(), $first_edge['node']['description']);

        // pagination
        $this->assertEquals($expected_cursor, $first_edge['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoEvents']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoEvents']['pageInfo']['endCursor']);
        $this->assertEquals($first_event_id, $results['data']['espressoEvents']['nodes'][0]['dbId']);
        $this->assertEquals(false, $results['data']['espressoEvents']['pageInfo']['hasPreviousPage']);
        $this->assertEquals(true, $results['data']['espressoEvents']['pageInfo']['hasNextPage']);
    }

    public function testEventBy()
    {
        $randomEventId   = $this->created_event_ids[array_rand($this->created_event_ids)];

        $variables = [
            'id' => $randomEventId,
        ];
        $result   = $this->eventByQuery($variables);

        $event = $this->model->get_one_by_ID($randomEventId);

        $this->assertNotEmpty($result);

        // fields
        $this->assertEquals($randomEventId, $result['data']['espressoEvent']['dbId']);
        $this->assertEquals($event->name(), $result['data']['espressoEvent']['name']);
        $this->assertEquals($event->description(), $result['data']['espressoEvent']['description']);
    }
}
