<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use GraphQLRelay\Relay;

class PriceUpdateTest extends BaseMutationTest
{
    public function setUp()
    {
        $this->model_name = 'Price';
        // before
        parent::setUp();
    }

    /**
     * This processes a mutation to update an entity
     *
     * @return array
     */
    public function updateMutation($input)
    {
        $mutation = '
		mutation UpdatePrice($input: UpdateEspressoPriceInput!) {
            updateEspressoPrice(input: $input) {
                clientMutationId
                espressoPrice {
                    id
                    dbId
                    name
                    description
                }
            }
        }
        ';

        return $this->runCreateMutation($mutation, $input);
    }

    /**
     * This tests to make sure a user without proper capabilities cannot update an entity
     */
    public function testUpdateWithoutProperCapabilities()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Price', $dbId);

        $input = [
            'id'   => $guid,
            'name' => $this->name,
            'description' => $this->description,
        ];


        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        /**
         * The deletion should fail because we're a subscriber
         */
        $this->assertArrayHasKey('errors', $result);
    }

    /**
     * This tests to make sure an admin can update an entity
     */
    public function testUpdateWithAdmin()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Price', $dbId);

        /**
         * Set the user to an admin
         */
        wp_set_current_user($this->admin);

        $input = [
            'id'   => $guid,
            'name' => $this->name,
            'description' => $this->description,
        ];

        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        $updated = $result['data']['updateEspressoPrice']['espressoPrice'];
        $this->assertNotEmpty($updated);
        $this->assertEquals($dbId, $updated['dbId']);
        $this->assertEquals($this->name, $updated['name']);
        $this->assertEquals($this->description, $updated['description']);
    }

    /**
     * This tests updating an invalid/non-existent entity
     */
    public function testUpdateWithInValidId()
    {
        /**
         * Set the user to an admin
         */
        wp_set_current_user($this->admin);

        $input = [
            'id'   => 'fake-entity-id',
            'name' => $this->name,
            'description' => $this->description,
        ];

        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        /**
         * The request should fail
         */
        $this->assertArrayHasKey('errors', $result);
    }
}
