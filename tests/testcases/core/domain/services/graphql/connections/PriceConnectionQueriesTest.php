<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Price;
use EEM_Ticket;
use GraphQLRelay\Relay;

class PriceConnectionQueriesTest extends BaseQueriesTest
{
    public function setUp()
    {
        $this->model_name = 'Price';
        parent::setUp();
        $this->model = EEM_Price::instance();
    }

    public function pricesQuery($variables)
    {
        $query = 'query pricesQuery($first:Int $last:Int $after:String $before:String $where:EspressoRootQueryPricesConnectionWhereArgs ){
            espressoPrices( first:$first last:$last after:$after before:$before where:$where ) {
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
                        amount
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

        return do_graphql_request($query, 'pricesQuery', $variables);
    }

    public function testFirstPrice()
    {
        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
        ];
        $results   = $this->pricesQuery($variables);

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
        $this->assertEquals(1, count($results['data']['espressoPrices']['edges']));

        $first_edge = $results['data']['espressoPrices']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->desc(), $first_edge['node']['description']);
        $this->assertEquals($first_entity->amount(), $first_edge['node']['amount']);
    }

    public function testPricesByTicketId()
    {
        $tickets = EEM_Ticket::instance()->get_all();
        $first_ticket = reset($tickets);

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
            'where' => [
                'ticketId' => $first_ticket->ID(),
            ]
        ];
        $results   = $this->pricesQuery($variables);

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
        $this->assertEquals(1, count($results['data']['espressoPrices']['edges']));

        $first_edge = $results['data']['espressoPrices']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->desc(), $first_edge['node']['description']);
        $this->assertEquals($first_entity->amount(), $first_edge['node']['amount']);
    }

    public function testPricesByTicketIn()
    {
        $tickets = EEM_Ticket::instance()->get_all();
        $first_ticket = reset($tickets);

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
            'where' => [
                'ticketIn' => [Relay::toGlobalId('Ticket', $first_ticket->ID())],
            ]
        ];
        $results   = $this->pricesQuery($variables);

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
        $this->assertEquals(1, count($results['data']['espressoPrices']['edges']));

        $first_edge = $results['data']['espressoPrices']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->desc(), $first_edge['node']['description']);
        $this->assertEquals($first_entity->amount(), $first_edge['node']['amount']);
    }
}
