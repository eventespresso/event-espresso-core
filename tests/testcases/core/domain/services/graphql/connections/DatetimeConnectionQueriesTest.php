<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Datetime;
use EEM_Event;
use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;

class DatetimeConnectionQueriesTest extends GraphQLUnitTestCase
{
    public $subscriber;
    public $datetime;

    public function setUp()
    {
        parent::setUp();
        if (PHP_VERSION_ID < 70000) {
            $this->markTestSkipped(
                'WP GraphQL compatible with PHP 7+ only'
            );
            return;
        }

        $this->model = EEM_Datetime::instance();

        $this->subscriber       = $this->factory()->user->create(
            [
                'role' => 'subscriber',
            ]
        );

        $this->datetime = $this->new_model_obj_with_dependencies('Datetime');

        $this->app_context = new \WPGraphQL\AppContext();

        $this->app_info = new \GraphQL\Type\Definition\ResolveInfo(array());
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    /**
     * Creates several entities for use in cursor query tests
     *
     * @param  int $count Number of entities to create.
     *
     * @return array
     */
    public function create_entities($count = 20)
    {

        // Create entities
        $created_entities = [];
        for ($i = 1; $i <= $count; $i ++) {
            $created_entities[ $i ] = $this->new_model_obj_with_dependencies('Datetime');
        }

        return $created_entities;
    }

    public function datetimesQuery($variables)
    {
        $query = 'query datetimesQuery($first:Int $last:Int $after:String $before:String $where:EspressoRootQueryDatetimesConnectionWhereArgs ){
            espressoDatetimes( first:$first last:$last after:$after before:$before where:$where ) {
                pageInfo {
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

        return do_graphql_request($query, 'datetimesQuery', $variables);
    }

    public function testFirstDatetime()
    {

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
        ];
        $results   = $this->datetimesQuery($variables);

        /**
         * Let's query the entities in our data set so we can test against it
         */
        $entities = $this->model->get_all(
            [
                'limit' => 1,
            ]
        );

        $first_entity    = reset($entities);
        $first_entity_id = $first_entity->ID();
        $expected_cursor = \GraphQLRelay\Connection\ArrayConnection::offsetToCursor($first_entity_id);
        $this->assertNotEmpty($results);
        $this->assertEquals(1, count($results['data']['espressoDatetimes']['edges']));

        $first_edge = $results['data']['espressoDatetimes']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->description(), $first_edge['node']['description']);

        // pagination
        $this->assertEquals($expected_cursor, $first_edge['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['endCursor']);
        $this->assertEquals($first_entity_id, $results['data']['espressoDatetimes']['nodes'][0]['dbId']);
    }

    public function testDatetimesByEventId()
    {
        $events = EEM_Event::instance()->get_all();

        $first_event = reset($events);

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
            'where' => [
                'eventId' => $first_event->ID(),
            ]
        ];

        $results   = $this->datetimesQuery($variables);

        /**
         * Let's query the entities in our data set so we can test against it
         */
        $entities = $this->model->get_all(
            [
                'limit' => 1,
            ]
        );

        $first_entity    = reset($entities);
        $first_entity_id = $first_entity->ID();
        $expected_cursor = \GraphQLRelay\Connection\ArrayConnection::offsetToCursor($first_entity_id);
        $this->assertNotEmpty($results);
        $this->assertEquals(1, count($results['data']['espressoDatetimes']['edges']));

        $first_edge = $results['data']['espressoDatetimes']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->description(), $first_edge['node']['description']);

        // pagination
        $this->assertEquals($expected_cursor, $first_edge['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['endCursor']);
        $this->assertEquals($first_entity_id, $results['data']['espressoDatetimes']['nodes'][0]['dbId']);
    }
}
