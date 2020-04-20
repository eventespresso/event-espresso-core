<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use GraphQLRelay\Relay;

class TicketDeleteTest extends GraphQLUnitTestCase
{
    public $client_mutation_id;
    public $admin;
    public $subscriber;
    public $entity;

    public function setUp()
    {
        // before
        parent::setUp();
        if (PHP_VERSION_ID < 70000) {
            $this->markTestSkipped(
                'WP GraphQL compatible with PHP 7+ only'
            );
            return;
        }

        $this->client_mutation_id = 'someUniqueId';

        $this->admin = $this->factory()->user->create([
            'role' => 'administrator',
        ]);

        $this->subscriber = $this->factory()->user->create([
            'role' => 'subscriber',
        ]);

        $this->entity = $this->new_model_obj_with_dependencies('Ticket');
    }

    /**
     * This processes a mutation to delete an entity
     *
     * @return array
     */
    public function deleteMutation($id, $deletePermanently = false)
    {
        $mutation = '
		mutation DeleteTicket($input: DeleteEspressoTicketInput!) {
            deleteEspressoTicket(input: $input) {
                clientMutationId
                espressoTicket {
                    id
                    dbId
                    name
                    isTrashed
                }
            }
        }
		';

        $variables = wp_json_encode([
            'input' => [
                'clientMutationId'  => $this->client_mutation_id,
                'id'                => $id,
                'deletePermanently' => $deletePermanently,
            ]
        ]);

        return do_graphql_request($mutation, 'deleteEntity', $variables);
    }

    /**
     * This tests to make sure a user without proper capabilities cannot delete an entity
     */
    public function testDeleteWithoutProperCapabilities()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Ticket', $dbId);


        /**
         * Execute the request
         */
        $result = $this->deleteMutation($guid);

        /**
         * The deletion should fail because we're a subscriber
         */
        $this->assertArrayHasKey('errors', $result);
    }

    /**
     * This tests to make sure an admin can delete an entity
     */
    public function testDeleteWithAdmin()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Ticket', $dbId);

        /**
         * Set the user to an admin and try again
         */
        wp_set_current_user($this->admin);

        /**
         * Execute the request
         */
        $result = $this->deleteMutation($guid);

        $deleted = $result['data']['deleteEspressoTicket']['espressoTicket'];

        $this->assertNotEmpty($deleted);
        $this->assertEquals($dbId, $deleted['dbId']);
        $this->assertTrue($deleted['isTrashed']);

        /**
         * Try to delete again, this time with forceDelete
         */
        $result = $this->deleteMutation($guid, true);

        /**
         * This time, we used forceDelete so the mutation should have succeeded
         */
        $this->assertArrayNotHasKey('errors', $result);
        $deleted = $result['data']['deleteEspressoTicket']['espressoTicket'];
        $this->assertEquals($dbId, $deleted['dbId']);

        /**
         * Try to delete one more time, and now there's nothing to delete, not even from the trash
         */
        $result = $this->deleteMutation($guid, true);

        /**
         * Now we should have errors again, because there's nothing to be deleted
         */
        $this->assertArrayHasKey('errors', $result);
    }
}
