<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Price_Type;

class PriceTypeConnectionQueriesTest extends BaseQueriesTest
{
    public function setUp()
    {
        $this->model_name = 'Price_Type';
        $this->skip_create_entities = true;
        parent::setUp();

        $this->model = EEM_Price_Type::instance();
    }

    public function priceTypesQuery($variables)
    {
        $query = 'query priceTypesQuery($first:Int $last:Int $after:String $before:String ){
            espressoPriceTypes( first:$first last:$last after:$after before:$before ) {
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

        return do_graphql_request($query, 'priceTypesQuery', $variables);
    }

    public function testFirstPriceType()
    {

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
        ];
        $results   = $this->priceTypesQuery($variables);

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
        $this->assertEquals(1, count($results['data']['espressoPriceTypes']['edges']));

        $first_edge = $results['data']['espressoPriceTypes']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);

        // pagination
        $this->assertEquals($expected_cursor, $first_edge['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoPriceTypes']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoPriceTypes']['pageInfo']['endCursor']);
        $this->assertEquals($first_entity_id, $results['data']['espressoPriceTypes']['nodes'][0]['dbId']);
    }
}
