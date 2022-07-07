<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EEM_Ticket;

/**
 * @group wpGraphQL
 */
class TicketConnectionQueriesTest extends BaseQueriesTest
{
    public function set_up()
    {
        $this->model_name = 'Ticket';
        parent::set_up();

        $this->model = EEM_Ticket::instance();
    }

    public function ticketsQuery($variables)
    {
        $query = 'query ticketsQuery($first:Int $last:Int $after:String $before:String $where:EspressoRootQueryTicketsConnectionWhereArgs ){
            espressoTickets( first:$first last:$last after:$after before:$before where:$where ) {
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
                        prices {
                            nodes {
                                id
                                dbId
                                name
                            }
                        }
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

        return graphql(compact('query', 'variables'));
    }

    public function testFirstTicket()
    {

        /**
         * Here we're querying the first entity in our dataset
         */
        $variables = [
            'first' => 1,
        ];
        $results   = $this->ticketsQuery($variables);
        $this->assertNotEmpty($results);

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

        $this->assertCount(1, (array) $results['data']['espressoTickets']['edges']);

        $first_edge = $results['data']['espressoTickets']['edges'][0];

        // fields
        $this->assertEquals($first_entity_id, $first_edge['node']['dbId']);
        $this->assertEquals($first_entity->name(), $first_edge['node']['name']);
        $this->assertEquals($first_entity->description(), $first_edge['node']['description']);
        $this->assertNotEmpty($first_edge['node']['prices']);
        $this->assertNotEmpty($first_edge['node']['prices']['nodes'][0]['id']);
        $this->assertNotEmpty($first_edge['node']['prices']['nodes'][0]['dbId']);

        // pagination
        $this->assertEquals($expected_cursor, $first_edge['cursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoTickets']['pageInfo']['startCursor']);
        $this->assertEquals($expected_cursor, $results['data']['espressoTickets']['pageInfo']['endCursor']);
        $this->assertEquals($first_entity_id, $results['data']['espressoTickets']['nodes'][0]['dbId']);
    }
}
