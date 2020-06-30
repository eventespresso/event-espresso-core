<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use GraphQLRelay\Relay;

/**
 * @group wpGraphQL
 */
class TicketDeleteTest extends BaseMutationTest
{
    public function setUp()
    {
        $this->model_name = 'Ticket';
        // before
        parent::setUp();
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

        return $this->runDeleteMutation($mutation, $id, $deletePermanently);
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
        $this->assertNotEmpty($result);

        if (! isset($result['data'])) {
            $this->markTestSkipped('WP GraphQL data results are empty');
            return;
        }

        $deleted = $result['data']['deleteEspressoTicket']['espressoTicket'];

        $this->assertNotEmpty($deleted);
        $this->assertEquals($dbId, $deleted['dbId']);
        $this->assertTrue($deleted['isTrashed']);

        /**
         * Try to delete again, this time with forceDelete
         */
        $result = $this->deleteMutation($guid, true);
        $this->assertNotEmpty($result);

        if (! isset($result['data'])) {
            $this->markTestSkipped('WP GraphQL data results are empty');
            return;
        }

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
