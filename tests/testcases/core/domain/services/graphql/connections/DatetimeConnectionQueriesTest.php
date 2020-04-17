<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Datetime;
use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;

class DatetimeConnectionQueriesTest extends GraphQLUnitTestCase
{
    public $current_time;
    public $current_date;
    public $current_date_gmt;
    public $admin;
    public $subscriber;
    public $datetime;

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
        $entities = EEM_Datetime::instance()->get_all(
            [
                'limit' => 1,
            ]
        );
        $first_entity    = reset($entities);
        $first_entity_id = $first_entity->ID();
        $expected_cursor = \GraphQLRelay\Connection\ArrayConnection::offsetToCursor($first_entity_id);
        $this->assertNotEmpty($results);
        $this->assertEquals(1, count($results['data']['espressoDatetimes']['edges']));
        $this->assertEquals($first_entity_id, $results['data']['espressoDatetimes']['edges'][0]['node']['dbId']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['edges'][0]['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoDatetimes']['pageInfo']['endCursor']);
        $this->assertEquals($first_entity_id, $results['data']['espressoDatetimes']['nodes'][0]['dbId']);
    }
}
